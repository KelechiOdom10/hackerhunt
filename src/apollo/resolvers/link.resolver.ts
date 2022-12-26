import { FeedArgs, Link } from "~/apollo/generated";
import { gql } from "graphql-tag";
import { GraphQLContext } from "~/pages/api/graphql";
import { getUserId } from "server/utils/auth";
import { getLinkPreview } from "link-preview-js";
import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { CreateLinkInput } from "server/dtos";
import { customValidate } from "server/utils/errorHandler";
import prisma from "server/db";
import { getRandomLinks } from "server/services/link.service";
import { isValidUrl } from "~/utils/isValidUrl";

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
    tags: [Tag!]!
    title: String!
    url: String!
    user: User!
    voteCount: Float!
    votes: [Vote!]!
  }

  type Query {
    feed(args: FeedArgs): Feed!
    link(id: ID!): Link!
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
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        });

      await customValidate(CreateLinkInput, input);

      if (!isValidUrl(input.url)) {
        throw new GraphQLError("Please enter a valid Website URL", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }

      const { title, url, tags } = input;
      const urlData = (await getLinkPreview(url)) as HTMLResponse;

      const link = await prisma.link.create({
        data: {
          title,
          description: urlData?.description,
          image: urlData?.images
            ? urlData?.images[0]
            : urlData?.favicons[0] || "",
          url,
          user: { connect: { id: userId } },
          tags: {
            connectOrCreate: tags.map(tag => {
              return {
                where: { name: tag },
                create: { name: tag },
              };
            }),
          },
        },
      });

      return link;
    },
  },
  Query: {
    totalLinks: async () => {
      return prisma.link.count();
    },

    feed: async (_parent, { args }: { args?: FeedArgs }) => {
      const where: Prisma.LinkWhereInput = args?.filter
        ? {
            OR: [
              {
                description: { contains: args.filter },
              },
              { title: { contains: args.filter } },
              { url: { contains: args.filter } },
            ],
          }
        : {};

      const orderBy: Prisma.Enumerable<Prisma.LinkOrderByWithAggregationInput> =
        {
          [args?.orderBy as string]:
            args?.orderBy === "votes"
              ? {
                  _count: "desc",
                }
              : "desc",
        };

      const links = await prisma.link.findMany({
        where,
        skip: args?.skip,
        take: args?.take,
        orderBy: args?.orderBy ? orderBy : {},
      });

      const count = await prisma.link.count({ where });
      const id = `main-feed:${JSON.stringify(args)}`;

      return {
        links,
        count,
        id,
      };
    },
    topLinks: async () => {
      const currentDate = new Date();
      const oneWeekAgo = new Date(
        currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
      );

      const links = await prisma.link.findMany({
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
    randomLinks: async () => {
      return getRandomLinks();
    },
    link: async (_parent, { id }: { id: string }) => {
      const link = await prisma.link.findFirst({
        where: { id },
      });

      if (!link) {
        throw new GraphQLError("Link doesn't exist or has been deleted", {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });
      }

      return link;
    },
  },
  Link: {
    user: async (parent: Link) => {
      return prisma.link.findFirst({ where: { id: parent.id } }).user();
    },
    comments: async (parent: Link) => {
      return (
        await prisma.link.findFirst({ where: { id: parent.id } }).comments()
      ).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    votes: async (parent: Link) => {
      return prisma.link.findFirst({ where: { id: parent.id } }).votes();
    },
    tags: async (parent: Link) => {
      return prisma.link.findFirst({ where: { id: parent.id } }).tags();
    },
    commentCount: async (parent: Link) => {
      return (
        (await prisma.link.findFirst({ where: { id: parent.id } }).comments())
          ?.length || 0
      );
    },
    voteCount: async (parent: Link) => {
      return (
        (await prisma.link.findFirst({ where: { id: parent.id } }).votes())
          ?.length || 0
      );
    },
  },
};

interface BaseType {
  mediaType: string;
  contentType: string;
  favicons: string[];
  url: string;
  error: unknown;
}

export interface HTMLResponse extends BaseType {
  title: string;
  siteName: string;
  description: string;
  images: string[];
  videos: string[];
  contentType: `text/html${string}`;
}
