import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "@apollo/client";
import { PrismaClient, User } from "@prisma/client";
import prisma from "server/db";
import { NextApiRequest, NextApiResponse } from "next";
// import { schema } from "server/schema";
import { getUser } from "server/utils/auth";
import { makeExecutableSchema } from "@graphql-tools/schema";

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  user: User | null;
}

export const resolvers = {
  Query: {
    viewer() {
      return { id: 1, name: "John Smith", status: "cached" };
    },
  },
};

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }
  type Query {
    viewer: User
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// async function createContext(req: NextApiRequest, res: NextApiResponse) {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   const user = await getUser(req.req);

//   return {
//     ...req,
//     res,
//     prisma,
//     user,
//   };
// }

const apolloServer = new ApolloServer<GraphQLContext>({
  schema,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma, user: await getUser(req) }),
});
