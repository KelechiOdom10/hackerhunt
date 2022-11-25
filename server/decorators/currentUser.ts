import { GraphQLContext } from "~/pages/api/graphql";
import { createParamDecorator } from "type-graphql";
import { AuthenticationError } from "apollo-server-micro";

export function CurrentUser() {
  return createParamDecorator<GraphQLContext>(async ({ context }) => {
    if (context.user) {
      const user = await context.prisma.user.findUnique({
        where: { id: context.user.id },
      });
      if (!user) throw new AuthenticationError("Not authenticated");
      return user;
    } else {
      throw new AuthenticationError("Not authenticated");
    }
  });
}
