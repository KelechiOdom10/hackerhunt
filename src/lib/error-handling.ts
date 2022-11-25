import { ApolloError } from "@apollo/client";

export function getErrorMessage(error: ApolloError) {
  if (error.graphQLErrors) {
    // eslint-disable-next-line no-restricted-syntax
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        (graphQLError.extensions.code === "BAD_USER_INPUT" ||
          graphQLError.extensions.code === "GRAPHQL_VALIDATION_FAILED")
      ) {
        return graphQLError.message;
      }
    }
  }
  return error.message;
}
