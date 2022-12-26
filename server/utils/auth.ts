import { GraphQLError } from "graphql";
import { NextApiRequest } from "next";
import prisma from "server/db";
import { verifyToken } from "server/utils/jwtGenerator";

export interface Decoded {
  id: string;
  exp: number;
}

export const getUserId = (req: NextApiRequest): string | null => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.replace("Bearer ", "");
    const { id } = verifyToken(token) as Decoded;
    return id;
  } catch (error) {
    return null;
  }
};

export const getUser = async (req: NextApiRequest) => {
  try {
    const id = getUserId(req);

    if (!id)
      throw new GraphQLError("Invalid access token", {
        extensions: {
          extensions: {
            code: "UNAUTHORIZED",
            http: { status: 401 },
          },
        },
      });

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new GraphQLError(
        "The user belonging to this token no logger exist",
        {
          extensions: {
            extensions: {
              code: "FORBIDDEN",
              http: { status: 403 },
            },
          },
        }
      );
    }

    return user;
  } catch (error) {
    throw new Error("Server Error");
  }
};
