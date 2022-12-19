import "reflect-metadata";
import Cors from "cors";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import prisma from "server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { schema } from "server/schema";

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
}

const apolloServer = new ApolloServer({
  schema: await schema(),
  context: ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => ({
    req,
    res,
    prisma,
  }),
  csrfPrevention: true,
  introspection: true,
  debug: true,
});

const cors = Cors({
  origin: [
    "https://studio.apollographql.com",
    "http://localhost:3000/",
    `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 204,
  allowedHeaders: [""],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/ban-types
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}
