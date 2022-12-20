import { AuthenticationError, ForbiddenError } from "apollo-server-micro";
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

    if (!id) throw new AuthenticationError("Invalid access token");

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new ForbiddenError(
        "The user belonging to this token no logger exist"
      );
    }

    return user;
  } catch (error) {
    throw new Error("Server Error");
  }
};

// export async function getUser(request: NextApiRequest) {
//   const userId = getUserId(request);
//   if (typeof userId !== "string") {
//     return null;
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });
//     delete user.password;
//     return user;
//   } catch {
//     return null;
//   }
// }
