import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler, NextApiResponse } from "next";
import cors from "micro-cors";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { PrismaClient } from ".prisma/client";
import { schema } from "../../apollo/schema";
import { prisma } from "../../lib/db";

export interface GraphQLContext {
  prisma: PrismaClient;
  req: MicroRequest;
  res: NextApiResponse;
}

export function createContext(req: MicroRequest) {
  return {
    ...req,
    prisma,
  };
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ schema, context: createContext });

let apolloServerHandler: NextApiHandler;

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start();
    apolloServerHandler = apolloServer.createHandler({
      path: "/api/graphql",
    });
  }

  return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
  // eslint-disable-next-line no-shadow
  const apolloServerHandler = await getApolloServerHandler();

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};

export default cors()(handler);
