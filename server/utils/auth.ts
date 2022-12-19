import { AuthenticationError, ForbiddenError } from "apollo-server-micro";
import { NextApiRequest } from "next";
import prisma from "server/db";
import { verifyToken } from "server/utils/jwtGenerator";

export interface Decoded {
  id: string;
  exp: number;
}

export const getUser = async (req: NextApiRequest) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const request = req.req as NextApiRequest;

  try {
    const authHeader = request.headers.authorization;
    const token = authHeader.replace("Bearer ", "");

    if (!token) throw new AuthenticationError("No access token found");

    const decoded = verifyToken(token) as Decoded;

    if (!decoded) throw new AuthenticationError("Invalid access token");

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
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
