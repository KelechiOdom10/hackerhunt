/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
// import { ApolloServer } from "@apollo/server";
// import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
// import { startServerAndCreateNextHandler } from "@as-integrations/next";
import Cors from "cors";
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
const cors = Cors({
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  origin: [
    "https://studio.apollographql.com",
    "http://localhost:3000",
    `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  ],
});

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

// const schema = await buildSchema({
//   emitSchemaFile: {
//     path: "../../apollo/schema.graphql",
//   },
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   resolvers: [
//     UserResolver,
//     AuthResolver,
//     CommentResolver,
//     VoteResolver,
//     LinkResolver,
//     JobResolver,
//   ],
//   validate: async argValue => {
//     const errors = await validate(argValue);
//     if (errors.length > 0) {
//       const message = Object.values(errors[0].constraints)[0];
//       throw new GraphQLError(message || "Argument Validation Error", {
//         extensions: {
//           code: "BAD_USER_INPUT",
//           validationErrors: errors,
//           message: "One or more fields are invalid",
//           http: {
//             status: 400,
//           },
//         },
//       });
//     }
//   },
// });

const typeSchema = await schema();

const server = new ApolloServer({
  schema: typeSchema,
  context: createContext,
  introspection: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

// const apolloServer = new ApolloServer<GraphQLContext>({
//   schema,
//   plugins: [ApolloServerPluginLandingPageLocalDefault()],
//   introspection: true,
// });

// export default startServerAndCreateNextHandler(apolloServer, {
//   context: async (req, res) => ({ req, res, prisma, user: await getUser(req) }),
// });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
