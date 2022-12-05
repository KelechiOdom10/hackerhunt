export const maskApolloError = (apolloError: string, genericError: string) => {
  return process.env.NODE_ENV != "production" ? apolloError : genericError;
};
