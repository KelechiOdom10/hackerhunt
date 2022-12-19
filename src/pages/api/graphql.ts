/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import Cors from "micro-cors";
// import { ApolloServer } from "@apollo/server";
// import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
// import { startServerAndCreateNextHandler } from "@as-integrations/next";
// import { gql } from "@apollo/client";
import { PrismaClient, User } from "@prisma/client";
import prisma from "server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "server/utils/auth";
import {
  AuthResolver,
  CommentResolver,
  JobResolver,
  LinkResolver,
  UserResolver,
  VoteResolver,
} from "server/resolvers";
import { GraphQLError } from "graphql";
import { validate } from "class-validator";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "server/schema";
// import { makeExecutableSchema } from "@graphql-tools/schema";

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

// Setup cors
// const cors = Cors({
//   methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

//   credentials: true,
//   origin: [
//     "https://studio.apollographql.com",
//     "http://localhost:3000",
//     `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
//   ],
// });

// Middleware to run the cors configuration
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const typeSchema = await schema();

const apolloServer = new ApolloServer({
  schema: typeSchema,
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
  allowMethods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: [
    "Access-Control-Allow-Origin",
    "access-control-allow-origin",
    "Origin, X-Requested-With, Content-Type, Accept",
    "X-HTTP-Method-Override, Authorization",
  ],
  // origin: [
  //   "https://studio.apollographql.com",
  //   "http://localhost:3000",
  //   `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  // ],
});

const handler = cors(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export default handler;
