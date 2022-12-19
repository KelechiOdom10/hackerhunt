import { getUser } from "server/utils/auth";
import { User } from "@prisma/client";
import { createParamDecorator } from "type-graphql";
import { GraphQLContext } from "~/pages/api/graphql";

export function ContextUser() {
  return createParamDecorator<GraphQLContext>(async ({ context }) => {
    const user = await getUser(context.req);
    return user ?? null;
  });
}
export type ContextUser = User | null;
