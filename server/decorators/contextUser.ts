import { User } from "@prisma/client";
import { createParamDecorator } from "type-graphql";
import { GraphQLContext } from "~/pages/api/graphql";

export function ContextUser() {
  return createParamDecorator<GraphQLContext>(async ({ context }) => {
    if (context.user) {
      const user = await context.prisma.user.findUnique({
        where: { id: context.user.id },
      });
      return user;
    } else {
      return null;
    }
  });
}
export type ContextUser = User | null;
