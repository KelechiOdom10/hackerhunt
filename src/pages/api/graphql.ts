import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import Cors from "micro-cors";
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
// import { makeExecutableSchema } from "@graphql-tools/schema";

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  user: User | null;
}

// // Setup cors
// const cors = Cors({
//   allowMethods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowCredentials: true,
//   origin: "*",
//   allowHeaders: [
//     "X-Requested-With",
//     "Access-Control-Allow-Origin",
//     "X-HTTP-Method-Override",
//     "Content-Type",
//     "Authorization",
//     "Accept",
//   ],
// });

const schema = await buildSchema({
  emitSchemaFile: {
    path: "../../apollo/schema.graphql",
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolvers: [
    UserResolver,
    AuthResolver,
    CommentResolver,
    VoteResolver,
    LinkResolver,
    JobResolver,
  ],
  validate: async argValue => {
    const errors = await validate(argValue);
    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new GraphQLError(message || "Argument Validation Error", {
        extensions: {
          code: "BAD_USER_INPUT",
          validationErrors: errors,
          message: "One or more fields are invalid",
          http: {
            status: 400,
          },
        },
      });
    }
  },
});

const apolloServer = new ApolloServer<GraphQLContext>({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  introspection: true,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await getUser(req.req);

    return { req, res, prisma, user };
  },
});
