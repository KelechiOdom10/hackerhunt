import { TOKEN_NAME, parseCookies } from "server/utils/auth-cookies";
import { API_URL } from "~/config";

export function customFetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"] | undefined
) {
  return async (): Promise<TData> => {
    const token = parseCookies()[TOKEN_NAME];
    const res = await fetch(API_URL, {
      method: "POST",
      ...{
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
          "Apollo-Require-Preflight": "true",
          "Content-Type": "application/json",
        },
        credentials: "include",
      },

      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      console.log({ e: json.errors[0] });

      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
