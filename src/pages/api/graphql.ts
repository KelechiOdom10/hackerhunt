import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient, User } from "@prisma/client";
import prisma from "server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { schema } from "server/schema";
import { getUser } from "server/utils/auth";

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  user: User | null;
}

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
