import { GraphQLError } from "graphql";
import type { GraphQLContext } from "~/pages/api/graphql";
import {
  Resolver,
  Query,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  ID,
} from "type-graphql";
import { User, Link, Vote } from "server/models";
import { getUser } from "server/utils/auth";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User], { nullable: "items" })
  async users(@Ctx() ctx: GraphQLContext) {
    return ctx.prisma.user.findMany();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: string, @Ctx() ctx: GraphQLContext) {
    const existingUser = await ctx.prisma.user.findFirst({
      where: { id },
    });

    if (!existingUser)
      throw new GraphQLError("User not found", {
        extensions: { code: "NOT_FOUND", http: { status: 404 } },
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = existingUser;

    return user;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: GraphQLContext) {
    try {
      const user = await getUser(ctx.req);
      return user;
    } catch (error) {
      return null;
    }
  }

  @FieldResolver(() => [Link])
  async links(@Root() user: User, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.user.findFirst({ where: { id: user.id } }).links();
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() user: User, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.user.findFirst({ where: { id: user.id } }).comments();
  }

  @FieldResolver(() => [Vote])
  async votes(@Root() user: User, @Ctx() ctx: GraphQLContext) {
    return ctx.prisma.user.findFirst({ where: { id: user.id } }).votes();
  }
}
