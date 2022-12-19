import {
  Resolver,
  Arg,
  Mutation,
  Ctx,
  FieldResolver,
  Root,
} from "type-graphql";
import type { GraphQLContext } from "~/pages/api/graphql";
import { Vote, Link, User } from "server/models";
import { getUser } from "server/utils/auth";

@Resolver(Vote)
export class VoteResolver {
  @Mutation(() => Link, { nullable: true })
  async toggleVote(
    @Arg("linkId", () => String) linkId: string,
    @Ctx() ctx: GraphQLContext
  ) {
    const user = await getUser(ctx.req);

    const link = await ctx.prisma.link.findFirst({ where: { id: linkId } });

    // check if the like already exists, if exists remove it
    const vote = await ctx.prisma.vote.findFirst({
      where: {
        AND: [{ linkId }, { userId: user.id }],
      },
    });

    if (vote) {
      await ctx.prisma.vote.delete({ where: { id: vote.id } });
      return link;
    }

    if (!vote) {
      await ctx.prisma.vote.create({
        data: {
          linkId,
          userId: user.id,
        },
      });

      return link;
    }

    return null;
  }

  @FieldResolver(() => User)
  async user(@Root() vote: Vote, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.vote.findFirst({ where: { id: vote.id } }).user();
  }

  @FieldResolver(() => User)
  async link(@Root() vote: Vote, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.vote.findFirst({ where: { id: vote.id } }).link();
  }
}
