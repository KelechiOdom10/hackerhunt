import "reflect-metadata";
import { PrismaClient, User } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import prisma from "server/db";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { schema } from "server/schema";
import { getUser } from "server/utils/auth";
import NextCors from "nextjs-cors";

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  user: User | null;
}

// Next.js API route config
// https://nextjs.org/docs/api-routes/api-middlewares
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// Check environment.

// Cache route handler.
let handler: NextApiHandler;

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

const apiHandler: NextApiHandler = async (req, res) => {
  // Run the cors middleware
  await NextCors(req, res, {
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Origin, X-Requested-With, Content-Type, Accept",
      "X-HTTP-Method-Override, Authorization",
      "Accept",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  });

  // Use cached handler.
  if (handler) {
    return handler(req, res);
  }

  // Create Apollo server.
  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
  });

  const startServer = apolloServer.start();

  await startServer;

  // Create new handler.
  handler = apolloServer.createHandler({
    path: "/api/graphql",
  });

  return handler(req, res);
};

export default apiHandler;
