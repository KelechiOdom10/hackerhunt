import prisma from "server/db";
import { cache } from "server/utils/cache";

export const getRandomLinks = async () => {
  const cachedData = cache.get("randomLinks");
  if (cachedData) {
    return cachedData;
  }

  const links =
    await prisma.$queryRaw`SELECT * FROM links ORDER BY RAND() LIMIT 4`;
  cache.set("randomLinks", links);

  return links;
};
