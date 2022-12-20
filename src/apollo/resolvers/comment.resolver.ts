import { gql } from "@apollo/client";
import { AuthenticationError } from "apollo-server-micro";
import { getUser } from "server/utils/auth";
import { GraphQLContext } from "~/pages/api/graphql";
import { Comment, CreateCommentInput } from "../generated/graphql";

export const commentTypeDef = gql`
  type Comment {
    createdAt: DateTime!
    id: ID!
    link: Link!
    text: String!
    updatedAt: DateTime!
    user: User!
  }

  input CreateCommentInput {
    linkId: String!
    text: String!
  }

  type Query {
    comments(linkId: String!): [Comment!]!
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment!
  }
`;

export const commentResolver = {
  Query: {
    comments: async (
      _parent,
      { linkId }: { linkId: string },
      ctx: GraphQLContext
    ) => {
      return ctx.prisma.comment.findMany({ where: { linkId } });
    },
  },
  Mutation: {
    createComment: async (
      _parent,
      { input }: { input: CreateCommentInput },
      ctx: GraphQLContext
    ) => {
      const user = await getUser(ctx.req);
      if (!user) throw new AuthenticationError("Not authenticated");

      const { linkId, text } = input;
      const comment = await ctx.prisma.comment.create({
        data: {
          user: { connect: { id: user.id } },
          link: { connect: { id: linkId } },
          text,
        },
      });

      return comment;
    },
  },
  Comment: {
    link: async (parent: Comment, _args, ctx: GraphQLContext) => {
      return ctx.prisma.comment.findFirst({ where: { id: parent?.id } }).link();
    },
    user: async (parent: Comment, _args, ctx: GraphQLContext) => {
      return ctx.prisma.comment.findFirst({ where: { id: parent?.id } }).user();
    },
  },
};
