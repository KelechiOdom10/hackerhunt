import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  FieldResolver,
  Root,
} from "type-graphql";
import type { GraphQLContext } from "~/pages/api/graphql";
import { Authorize } from "server/decorators/authorize";
import { CreateCommentInput } from "../dtos";
import { User, Comment } from "server/models";

@Resolver(Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async comments(
    @Arg("linkId", () => String) linkId: string,
    @Ctx() ctx: GraphQLContext
  ) {
    return ctx.prisma.comment.findMany({ where: { linkId } });
  }

  @Mutation(() => Comment)
  @Authorize()
  async createComment(
    @Arg("input", () => CreateCommentInput) input: CreateCommentInput,
    @Ctx() ctx: GraphQLContext
  ) {
    const { linkId, text } = input;
    const comment = await ctx.prisma.comment.create({
      data: {
        user: { connect: { id: ctx.user.id } },
        link: { connect: { id: linkId } },
        text,
      },
    });

    return comment;
  }

  @FieldResolver(() => User)
  async user(@Root() comment: Comment, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.comment.findFirst({ where: { id: comment.id } }).user();
  }

  @FieldResolver(() => User)
  async link(@Root() comment: Comment, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.comment.findFirst({ where: { id: comment.id } }).link();
  }
}
