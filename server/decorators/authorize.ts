import { AuthenticationError } from "apollo-server-micro";
import { createMethodDecorator } from "type-graphql";
import { GraphQLContext } from "~/pages/api/graphql";

export function Authorize() {
  return createMethodDecorator<GraphQLContext>(async ({ context }, next) => {
    if (!context.user) {
      throw new AuthenticationError("Not Authenticated");
    }

    return next();
  });
}
