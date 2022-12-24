import { gql } from "@apollo/client";
import { getUserId } from "server/utils/auth";
import { GraphQLContext } from "~/pages/api/graphql";
import { Vote } from "../generated/graphql";
import { GraphQLError } from "graphql";
import prisma from "server/db";

export const voteTypeDef = gql`
  type Vote {
    createdAt: DateTime!
    id: ID!
    link: Link!
    user: User!
  }

  type Mutation {
    toggleVote(linkId: String!): Link
  }
`;

export const voteResolver = {
  Mutation: {
    toggleVote: async (
      _parent,
      { linkId }: { linkId: string },
      ctx: GraphQLContext
    ) => {
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

      const link = await prisma.link.findFirst({ where: { id: linkId } });

      // check if the like already exists, if exists remove it
      const vote = await prisma.vote.findFirst({
        where: {
          AND: [{ linkId }, { userId }],
        },
      });

      if (vote) {
        await prisma.vote.delete({ where: { id: vote.id } });
        return link;
      }

      if (!vote) {
        await prisma.vote.create({
          data: {
            linkId,
            userId,
          },
        });

        return link;
      }

      return null;
    },
  },
  Vote: {
    link: async (parent: Vote) => {
      return prisma.vote.findFirst({ where: { id: parent?.id } }).link();
    },
    user: async (parent: Vote) => {
      return prisma.vote.findFirst({ where: { id: parent?.id } }).user();
    },
  },
};
