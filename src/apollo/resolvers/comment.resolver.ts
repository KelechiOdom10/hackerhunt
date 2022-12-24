import { gql } from "@apollo/client";
import { getUserId } from "server/utils/auth";
import { GraphQLContext } from "~/pages/api/graphql";
import { Comment } from "../generated/graphql";
import { CreateCommentInput } from "server/dtos";
import { customValidate } from "server/utils/errorHandler";
import { GraphQLError } from "graphql";
import prisma from "server/db";

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
    comments: async (_parent, { linkId }: { linkId: string }) => {
      return prisma.comment.findMany({ where: { linkId } });
    },
  },
  Mutation: {
    createComment: async (
      _parent,
      { input }: { input: CreateCommentInput },
      ctx: GraphQLContext
    ) => {
      await customValidate(CreateCommentInput, input);

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

      const { linkId, text } = input;
      const comment = await prisma.comment.create({
        data: {
          user: { connect: { id: userId } },
          link: { connect: { id: linkId } },
          text,
        },
      });

      return comment;
    },
  },
  Comment: {
    link: async (parent: Comment) => {
      return prisma.comment.findFirst({ where: { id: parent?.id } }).link();
    },
    user: async (parent: Comment) => {
      return prisma.comment.findFirst({ where: { id: parent?.id } }).user();
    },
  },
};
