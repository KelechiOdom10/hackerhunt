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

const typeSchema = await schema();

const apolloServer = new ApolloServer({
  schema: typeSchema,
  context: createContext,
});

const startServer = apolloServer.start();

const cors = Cors({
  origin: "https://studio.apollographql.com",
  allowCredentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: [
    "access-control-allow-credentials",
    "access-control-allow-methods: POST",
    "access-control-allow-origin",
    "content-type",
  ],
  // origin: [
  //   "https://studio.apollographql.com",
  //   "http://localhost:3000",
  //   `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  // ],
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader(
    "access-control-allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "access-control-allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-Methods, access-control-allow-Origin, access-control-allow-credentials, access-control-allow-Headers"
  );
  res.setHeader(
    "access-control-allow-Methods",
    "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
  );

  if (req.method == "OPTIONS") {
    res.setHeader(
      "access-control-allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return res.status(200).send("ok");
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
