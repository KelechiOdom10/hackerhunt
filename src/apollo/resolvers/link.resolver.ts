import { FeedArgs, Link } from "~/apollo/generated/graphql";
import { gql } from "apollo-server-micro";
import { GraphQLContext } from "~/pages/api/graphql";
import { getUserId } from "server/utils/auth";
import { HTMLResponse } from "server/models";
import { cache } from "server/services/jobs.service";
import { getLinkPreview } from "link-preview-js";
import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { CreateLinkInput } from "server/dtos";
import { customValidate } from "server/utils/errorHandler";

export const linkTypeDef = gql`
  type Feed {
    count: Float!
    id: ID!
    links: [Link!]!
  }

  input FeedArgs {
    filter: String
    orderBy: String = "votes"
    skip: Int = 0
    tag: String
    take: Int = 10
  }

  input CreateLinkInput {
    tags: [String!]!
    title: String!
    url: String!
  }

  type Link {
    commentCount: Float!
    comments: [Comment!]!
    createdAt: DateTime!
    description: String
    id: ID!
    image: String
    tags: [String!]!
    title: String!
    url: String!
    user: User!
    voteCount: Float!
    votes: [Vote!]!
  }

  type Query {
    feed(args: FeedArgs): Feed!
    link(id: ID!): Link!
    popularTags: [String!]!
    topLinks: [Link!]!
    randomLinks: [Link!]!
    totalLinks: Float!
  }

  type Mutation {
    createLink(input: CreateLinkInput!): Link!
  }
`;

export const linkResolver = {
  Mutation: {
    createLink: async (
      _parent,
      { input }: { input: CreateLinkInput },
      ctx: GraphQLContext
    ) => {
      const userId = getUserId(ctx.req);
      if (!userId)
        throw new GraphQLError("Not authenticated", {
          extensions: {
            extensions: {
              code: "UNAUTHORIZED",
              http: { status: 401 },
            },
          },
        });

      await customValidate(CreateLinkInput, input);

      const { title, url, tags } = input;
      const urlData = (await getLinkPreview(url)) as HTMLResponse;

      const link = await ctx.prisma.link.create({
        data: {
          title,
          description: urlData?.description,
          tags,
          image: urlData?.images
            ? urlData?.images[0]
            : urlData?.favicons[0] || "",
          url,
          user: { connect: { id: userId } },
        },
      });

      return link;
    },
  },
  Query: {
    totalLinks: async (_parent, _args, ctx: GraphQLContext) => {
      return ctx.prisma.link.count();
    },

    feed: async (
      _parent,
      { args }: { args?: FeedArgs },
      ctx: GraphQLContext
    ) => {
      const where: Prisma.LinkWhereInput = args?.filter
        ? {
            OR: [
              {
                description: { contains: args.filter, mode: "insensitive" },
              },
              { title: { contains: args.filter, mode: "insensitive" } },
              { url: { contains: args.filter, mode: "insensitive" } },
            ],
          }
        : args?.tag
        ? {
            tags: {
              has: args.tag,
            },
          }
        : {};

      const orderBy: Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput> = {
        [args?.orderBy as string]:
          args?.orderBy === "votes"
            ? {
                _count: "desc",
              }
            : "desc",
      };

      const links = await ctx.prisma.link.findMany({
        where,
        skip: args?.skip,
        take: args?.take,
        orderBy: args?.orderBy ? orderBy : {},
      });

      const count = await ctx.prisma.link.count({ where });
      const id = `main-feed:${JSON.stringify(args)}`;

      return {
        links,
        count,
        id,
      };
    },
    topLinks: async (_parent, _args, ctx: GraphQLContext) => {
      const currentDate = new Date();
      const oneWeekAgo = new Date(
        currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
      );

      const links = await ctx.prisma.link.findMany({
        where: {
          createdAt: {
            gte: oneWeekAgo,
            lt: currentDate,
          },
        },
        orderBy: [
          {
            votes: {
              _count: "desc",
            },
          },
          {
            comments: {
              _count: "desc",
            },
          },
        ],
        take: 4,
      });

      return links;
    },
    randomLinks: async (_parent, _args, ctx: GraphQLContext) => {
      const cachedData = cache.get("randomLinks");
      if (cachedData) {
        return cachedData;
      } else {
        const links = await ctx.prisma.$queryRawUnsafe(
          // DO NOT pass in or accept user input here
          `SELECT * FROM "links" ORDER BY RANDOM() LIMIT 4;`
        );
        cache.set("randomLinks", links);
        return links;
      }
    },
    link: async (_parent, { id }: { id: string }, ctx: GraphQLContext) => {
      const link = await ctx.prisma.link.findFirst({
        where: { id },
      });

      if (!link) {
        throw new GraphQLError("Link doesn't exist or has been deleted", {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });
      }

      return link;
    },
    popularTags: async (_parent, _args, ctx: GraphQLContext) => {
      const links = await ctx.prisma.link.findMany();
      const tags = links.map(link => link.tags).flat();

      // Use a Map object to count the number of occurrences of each word in the array of tags
      const wordCounts = new Map();
      for (const word of tags) {
        const count = wordCounts.get(word) || 0;
        wordCounts.set(word, count + 1);
      }

      // Use Array.from() to convert the Map object to an array of [key, value] pairs
      const wordCountPairs = Array.from(wordCounts);

      // Use Array.sort() to sort the array of [key, value] pairs by the number of occurrences in descending order
      // Use Array.map() to get an array of the keys (words) from the sorted array of [key, value] pairs
      const sortedWords = wordCountPairs
        .sort((a, b) => b[1] - a[1])
        .map(pair => pair[0]);

      const popularTags = sortedWords.slice(0, 5);

      return popularTags;
    },
  },
  Link: {
    user: async (parent: Link, _args, ctx: GraphQLContext) => {
      return ctx.prisma.link.findFirst({ where: { id: parent.id } }).user();
    },
    comments: async (parent: Link, _args, ctx: GraphQLContext) => {
      return ctx.prisma.link
        .findFirst({ where: { id: parent.id }, orderBy: { createdAt: "desc" } })
        .comments();
    },
    votes: async (parent: Link, _args, ctx: GraphQLContext) => {
      return ctx.prisma.link
        .findFirst({ where: { id: parent.id }, orderBy: { createdAt: "desc" } })
        .votes();
    },
    commentCount: async (parent: Link, _args, ctx: GraphQLContext) => {
      return (
        (
          await ctx.prisma.link
            .findFirst({ where: { id: parent.id } })
            .comments()
        )?.length || 0
      );
    },
    voteCount: async (parent: Link, _args, ctx: GraphQLContext) => {
      return (
        (await ctx.prisma.link.findFirst({ where: { id: parent.id } }).votes())
          ?.length || 0
      );
    },
  },
};
