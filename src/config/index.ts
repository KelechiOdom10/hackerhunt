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

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEV = !IS_PRODUCTION;

export const API_URL = IS_PRODUCTION
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`
  : "https://localhost:3000/api/graphql";

export const PAGE_SIZE = 10;
