import "reflect-metadata";
import Cors from "cors";
import { PrismaClient, User } from "@prisma/client";
import { createYoga } from "graphql-yoga";
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

// const cors = Cors({
//   allowMethods: ["POST", "OPTIONS"],
//   allowHeaders: [
//     "Access-Control-Allow-Origin",
//     "Origin, X-Requested-With, Content-Type, Accept",
//     "X-HTTP-Method-Override, Authorization",
//   ],
// });

const cors = Cors({
  methods: ["GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    "access-control-allow-origin",
    "https://studio.apollographql.com/",
    "access-control-allow-credentials",
    "*",
    // "Access-Control-Allow-Origin",
    // "X-HTTP-Method-Override, Authorization",
    // "Origin, X-Requested-With, Content-Type, Accept",
  ],
  origin: [
    "https://studio.apollographql.com",
    "http://localhost:3000",
    `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  ],
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

// Next.js API route config
// https://nextjs.org/docs/api-routes/api-middlewares
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const apiHandler: NextApiHandler = async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  const context = await createContext(req, res);
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Create new handler.
  return createYoga({
    graphqlEndpoint: "/api/graphql",
    schema,
    context,
  })(req, res);
};

export default apiHandler;
