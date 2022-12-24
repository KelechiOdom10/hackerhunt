import { gql } from "@apollo/client";
import { Tag } from "@prisma/client";
import { GraphQLError } from "graphql";
import prisma from "server/db";

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
    popularTags: async () => {
      const tags = await prisma.tag.findMany({
        orderBy: { links: { _count: "desc" } },
        take: 5,
      });

      return tags;
    },
    tag: async (_parent, { name }: { name: string }) => {
      const tag = await prisma.tag.findFirst({
        where: { name },
        distinct: ["name"],
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
    links: async (parent: Tag) => {
      return prisma.tag.findFirst({ where: { id: parent.id } }).links();
    },
  },
};
