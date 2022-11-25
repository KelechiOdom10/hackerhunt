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
import { ContextUser } from "server/decorators/contextUser";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User], { nullable: "items" })
  async users(@Ctx() ctx: GraphQLContext) {
    return ctx.prisma.user.findMany();
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: string, @Ctx() ctx: GraphQLContext) {
    const user = await ctx.prisma.user.findFirst({
      where: { id },
    });

    if (!user)
      throw new GraphQLError("User not found", {
        extensions: { code: "NOT_FOUND", http: { status: 404 } },
      });

    delete user.password;
    return user;
  }

  @Query(() => User, { nullable: true })
  async me(@ContextUser() user: ContextUser) {
    return user;
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
