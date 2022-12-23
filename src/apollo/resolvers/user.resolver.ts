import { GraphQLError } from "graphql";
import { getUser } from "server/utils/auth";
import { GraphQLContext } from "~/pages/api/graphql";
import { User } from "../generated/graphql";
import { gql } from "@apollo/client";

export const userTypeDef = gql`
  type User {
    comments: [Comment]!
    createdAt: DateTime!
    email: String!
    id: ID!
    links: [Link]!
    updatedAt: DateTime!
    username: String!
    votes: [Vote]!
  }

  type Query {
    me: User
    user(id: ID!): User
    users: [User]!
  }
`;

export const userResolver = {
  Query: {
    me: async (_parent, _args, ctx: GraphQLContext) => {
      try {
        const user = await getUser(ctx.req);
        return user;
      } catch (error) {
        return null;
      }
    },

    users: async (__parent, _args, ctx: GraphQLContext) => {
      return ctx.prisma.user.findMany();
    },

    user: async (_parent, { id }: { id: string }, ctx: GraphQLContext) => {
      const existingUser = await ctx.prisma.user.findFirst({
        where: { id },
      });

      if (!existingUser)
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });

      const { password: _, ...user } = existingUser;

      return user;
    },
  },

  User: {
    links: async (parent: User, _args, ctx: GraphQLContext) => {
      return ctx.prisma.user.findFirst({ where: { id: parent?.id } }).links();
    },

    comments: async (parent: User, _args, ctx: GraphQLContext) => {
      return ctx.prisma.user
        .findFirst({ where: { id: parent?.id } })
        .comments();
    },

    votes: async (parent: User, _args, ctx: GraphQLContext) => {
      return ctx.prisma.user.findFirst({ where: { id: parent?.id } }).votes();
    },
  },
};
