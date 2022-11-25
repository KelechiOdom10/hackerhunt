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
import { CreateLinkInput } from "../dtos/create-link.input";
import type { GraphQLContext } from "~/pages/api/graphql";
import { Authorize } from "server/decorators/authorize";
import { User, Vote, Comment, Link, HTMLResponse } from "server/models";

@Resolver(Link)
export class LinkResolver {
  @Query(() => [Link])
  async feed(@Ctx() ctx: GraphQLContext) {
    return ctx.prisma.link.findMany();
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
        image: urlData?.images ? urlData?.images[0] : "",
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
    return ctx.prisma.link.findFirst({ where: { id: link.id } }).comments();
  }

  @FieldResolver(() => [Vote])
  async votes(@Root() link: Link, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.link.findFirst({ where: { id: link.id } }).votes();
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
