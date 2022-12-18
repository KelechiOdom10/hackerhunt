import { GraphQLError } from "graphql";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  FieldResolver,
  Root,
  ID,
} from "type-graphql";
import { getLinkPreview } from "link-preview-js";
import { Prisma } from "@prisma/client";
import type { GraphQLContext } from "~/pages/api/graphql";
import { Authorize } from "server/decorators/authorize";
import { User, Vote, Comment, Link, HTMLResponse, Feed } from "server/models";
import { CreateLinkInput, FeedArgs } from "../dtos";

@Resolver(Link)
export class LinkResolver {
  @Query(() => Number)
  async totalLinks(@Ctx() { prisma }: GraphQLContext) {
    return prisma.link.count();
  }

  @Query(() => Feed)
  async feed(
    @Arg("args", () => FeedArgs, { nullable: true }) args: FeedArgs,
    @Ctx() ctx: GraphQLContext
  ) {
    const where: Prisma.LinkWhereInput = args?.filter
      ? {
          OR: [
            { description: { contains: args.filter, mode: "insensitive" } },
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
      [args?.orderBy]:
        args?.orderBy === "votes"
          ? {
              _count: "desc",
            }
          : "desc",
    };

    const links = ctx.prisma.link.findMany({
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
  }

  @Query(() => [Link])
  async topLinks(@Ctx() ctx: GraphQLContext) {
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
  }

  @Query(() => Link)
  async link(@Arg("id", () => ID) id: string, @Ctx() ctx: GraphQLContext) {
    const link = await ctx.prisma.link.findFirst({
      where: { id },
    });

    if (!link) {
      throw new GraphQLError("Link doesn't exist or has been deleted", {
        extensions: { code: "NOT_FOUND", http: { status: 404 } },
      });
    }

    return link;
  }

  @Query(() => [String])
  async popularTags(@Ctx() ctx: GraphQLContext) {
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
  }

  @Mutation(() => Link)
  @Authorize()
  async createLink(
    @Arg("input", () => CreateLinkInput) input: CreateLinkInput,
    @Ctx() ctx: GraphQLContext
  ) {
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
        user: { connect: { id: ctx.user.id } },
      },
    });

    return link;
  }

  @FieldResolver(() => User)
  async user(@Root() link: Link, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.link.findFirst({ where: { id: link.id } }).user();
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() link: Link, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.link
      .findFirst({ where: { id: link.id }, orderBy: { createdAt: "desc" } })
      .comments();
  }

  @FieldResolver(() => [Vote])
  async votes(@Root() link: Link, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.link
      .findFirst({ where: { id: link.id }, orderBy: { createdAt: "desc" } })
      .votes();
  }

  @FieldResolver(() => Number)
  async commentCount(@Root() link: Link, @Ctx() ctx: GraphQLContext) {
    return (
      await ctx.prisma.link.findFirst({ where: { id: link.id } }).comments()
    ).length;
  }

  @FieldResolver(() => Number)
  async voteCount(@Root() link: Link, @Ctx() ctx: GraphQLContext) {
    return (await ctx.prisma.link.findFirst({ where: { id: link.id } }).votes())
      .length;
  }
}
