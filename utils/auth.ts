import { GraphQLContext } from "../pages/api/graphql";
import { verifyToken } from "./jwtGenerator";

export interface Decoded {
  id: string;
  exp: number;
}

export const getUserId = (ctx: GraphQLContext): string | null => {
  try {
    const authHeader = ctx.req.headers.authorization;
    const token = authHeader.replace("Bearer ", "");
    const { id } = verifyToken(token) as Decoded;
    return id;
  } catch (error) {
    return null;
  }
};
