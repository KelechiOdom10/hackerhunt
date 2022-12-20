import { getUser } from "server/utils/auth";
import { User } from "@prisma/client";
import { createParamDecorator } from "type-graphql";
import { GraphQLContext } from "~/pages/api/graphql";

export function ContextUser() {
  return createParamDecorator<GraphQLContext>(async ({ context }) => {
    const contextUser = await getUser(context.req);
    if (contextUser) {
      const user = await context.prisma.user.findUnique({
        where: { id: contextUser.id },
      });
      return user;
    } else {
      return null;
    }
  });
}
export type ContextUser = User | null;
