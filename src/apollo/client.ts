/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { mergeDeep } from "@apollo/client/utilities";
import { parseCookies, TOKEN_NAME } from "../../server/utils/auth-cookies";
// import { schema } from "server/schema";

export const isBrowser = typeof window !== "undefined";

type Callback = () => string;
type Options = {
  getToken: Callback;
};

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

// Log server errors.
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function createApolloClient(
  initialState: null | Record<string, any>,
  options?: Options
) {
  const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_URL.replace(/\/$/, "")}/api/graphql`,
    credentials: "same-origin",
  });

  let authLink;

  if (options) {
    const { getToken } = options;
    authLink = setContext((_, { headers }) => {
      const token = getToken();
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });
  }

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: options
      ? authLink.concat(errorLink.concat(link))
      : errorLink.concat(link),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export function initializeApollo(
  initialState: null | Record<string, any> = null,
  options?: Options
) {
  const _apolloClient =
    apolloClient ?? createApolloClient(initialState, options);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = mergeDeep(initialState, existingCache);
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (!isBrowser) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any = null) {
  const store = useMemo(
    () =>
      initializeApollo(initialState, {
        getToken: () => parseCookies()[TOKEN_NAME],
      }),
    [initialState]
  );
  return store;
}
