import "reflect-metadata";
import Cors from "cors";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { schema } from "~/apollo/schema";

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
}

const apolloServer = new ApolloServer({
  schema: schema,
  csrfPrevention: true,
  introspection: true,
  plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: "my-graph-id@my-graph-variant",
          footer: false,
          embed: true,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

const cors = Cors({
  origin: [
    "https://studio.apollographql.com",
    "http://localhost:3000/",
    /.*hacker-hunt.*/,
    `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 204,
  preflightContinue: true,
  allowedHeaders: [
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "X-HTTP-Method-Override",
    "Content-Type",
    "Authorization",
    "Accept",
  ],
  exposedHeaders: ["Content-Length"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
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

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => {
    runMiddleware(req, res, cors);
    return {
      req,
      res,
      prisma,
    };
  },
});
