import "reflect-metadata";
import Cors from "cors";
import { PrismaClient, User } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import prisma from "server/db";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { schema } from "server/schema";
// import { getUser } from "server/utils/auth";

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  // user: User | null;
}

async function createContext(req: NextApiRequest, res: NextApiResponse) {
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore
  // const user = await getUser(req);

  // console.log({ user });

  return {
    req,
    res,
    prisma,
    // user,
  };
}

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
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

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // if (req.method === "OPTIONS") {
  //   return res.status(200).send("ok");
  // }
  await runMiddleware(req, res, cors);
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export default handler;
