import { gql } from "@apollo/client";
import { Tag } from "@prisma/client";
import { GraphQLError } from "graphql";
import { GraphQLContext } from "~/pages/api/graphql";

export const tagTypeDef = gql`
  type Tag {
    id: ID!
    name: String!
    links: [Link!]!
  }

  type Query {
    popularTags: [Tag!]!
    tag(name: String!): Tag!
  }
`;

export const tagResolver = {
  Query: {
    popularTags: async (_parent, _args, ctx: GraphQLContext) => {
      const tags = await ctx.prisma.tag.findMany({
        orderBy: { links: { _count: "desc" } },
      });

      const popularTags = tags.slice(0, 5);

      return popularTags;
    },
    tag: async (_parent, { name }: { name: string }, ctx: GraphQLContext) => {
      const tag = await ctx.prisma.tag.findFirst({
        where: { name },
      });

      if (!tag) {
        throw new GraphQLError("Tag doesn't exist or has been deleted", {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });
      }

      return tag;
    },
  },
  Tag: {
    links: async (parent: Tag, _args, ctx: GraphQLContext) => {
      return ctx.prisma.tag.findFirst({ where: { id: parent.id } }).links();
    },
  },
};
