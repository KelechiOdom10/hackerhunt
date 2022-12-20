export const maskApolloError = (apolloError: string, genericError: string) => {
  return process.env.NODE_ENV != "production" ? apolloError : genericError;
};

export const formatError = (error: any) => {
  return error?.networkError?.result?.errors[0] || error;
};
