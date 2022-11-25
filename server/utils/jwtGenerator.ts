import * as jwt from "jsonwebtoken";

export function jwtGenerator(userId: string) {
  const payload = {
    id: userId,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "2d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.SECRET);
}
