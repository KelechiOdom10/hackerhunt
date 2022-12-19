import "reflect-metadata";
import Cors from "micro-cors";
import { PrismaClient, User } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import prisma from "server/db";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { schema } from "server/schema";
import { getUser } from "server/utils/auth";

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  user: User | null;
}

async function createContext(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const user = await getUser(req.req);

  return {
    ...req,
    res,
    prisma,
    user,
  };
}

const apolloServer = new ApolloServer({
  schema: await schema(),
  context: createContext,
});

const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const cors = Cors({
  allowMethods: [
    "POST",
    "OPTIONS",
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ],
  origin: "*",
  allowCredentials: true,
  allowHeaders: [
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept",
    "X-HTTP-Method-Override, Authorization",
  ],
});

const handler: NextApiHandler = cors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "OPTIONS") {
      return res.status(200).send("ok");
    }

    await startServer;

    await apolloServer.createHandler({
      path: "/api/graphql",
    })(req, res);
  }
);

export default handler;
