import { gql } from "@apollo/client";
import { AuthenticationError } from "apollo-server-micro";
import { getUser } from "server/utils/auth";
import { GraphQLContext } from "~/pages/api/graphql";
import { Vote } from "../generated/graphql";

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
      const user = await getUser(ctx.req);
      if (!user) throw new AuthenticationError("Not authenticated");

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
    },
  },
  Vote: {
    link: async (parent: Vote, _args, ctx: GraphQLContext) => {
      return ctx.prisma.vote.findFirst({ where: { id: parent?.id } }).link();
    },
    user: async (parent: Vote, _args, ctx: GraphQLContext) => {
      return ctx.prisma.vote.findFirst({ where: { id: parent?.id } }).user();
    },
  },
};
