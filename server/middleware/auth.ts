import { AuthenticationError } from "apollo-server-micro";
import { getUserId } from "server/utils/auth";
import { AuthChecker, MiddlewareFn } from "type-graphql";
import { GraphQLContext } from "~/pages/api/graphql";

// create auth checker function
export const authChecker: AuthChecker<GraphQLContext> = (
  { context },
  roles: string[]
) => {
  const userId = getUserId(context.req);
  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return userId !== null;
  }
  // there are some roles defined now
  if (!userId) {
    // and if no userId, restrict access
    return false;
  }
  // no roles matched, restrict access
  return false;
};

export const isAuth: MiddlewareFn<GraphQLContext> = ({ context }, next) => {
  const userId = getUserId(context.req);
  if (!userId) {
    throw new AuthenticationError("Not authenticated");
  }
  return next();
};
