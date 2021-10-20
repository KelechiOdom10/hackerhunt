import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "micro-cors";
import { schema } from "../../apollo/schema";

export interface GraphQLContext {
  req: NextApiRequest;
  res: NextApiResponse;
}

export function createContext(req: NextApiRequest, res: NextApiResponse) {
  return {
    ...req,
    res,
  };
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const apolloServer = new ApolloServer({ schema, context: createContext });

const startServer = apolloServer.start();

const cors = Cors({
  allowMethods: ["POST", "OPTIONS"],
  allowHeaders: [
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept",
    "X-HTTP-Method-Override, Authorization",
  ],
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
