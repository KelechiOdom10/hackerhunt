// else {
//   const hostname = typeof window !== "undefined" && window?.location?.hostname;
//   if (hostname) {
//     if (hostname.includes("hostname")) {
//       env = "production";
//     } else {
//       env = "development";
//     }
//   } else {
//     env = "development";
//   }
// }

import { DefaultOptions } from "@tanstack/react-query";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEV = !IS_PRODUCTION;

export const API_URL = IS_PRODUCTION
  ? `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`
  : "http://localhost:3000/api/graphql";

export const PAGE_SIZE = 10;

export const QUERY_OPTIONS_DEFAULT: DefaultOptions = {
  queries: {
    retry: false,
    staleTime: 15 * 60 * 1000, // 15 minutes
    enabled: true,
    refetchInterval: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  },
};
