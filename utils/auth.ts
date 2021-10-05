import { AuthenticationError } from "apollo-server-micro";
import { GraphQLContext } from "../pages/api/graphql";
import { verifyToken } from "./jwtGenerator";

export interface Decoded {
  id: string;
  exp: number;
}

export const getUserId = (ctx: GraphQLContext) => {
  const authHeader = ctx.req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new AuthenticationError("No token found");
  }

  const { id } = verifyToken(token) as Decoded;
  return id;
};
