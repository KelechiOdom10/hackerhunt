import { serialize, parse } from "cookie";
import { isBrowser } from "~/utils/isBrowser";

export const TOKEN_NAME = "token";
const isProduction = process.env.NODE_ENV === "production";

export function setTokenCookie(token: string) {
  document.cookie = serialize(TOKEN_NAME, token, {
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
}

export function removeTokenCookie() {
  document.cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict",
    expires: new Date(0),
  });
}

export function parseCookies(req?, options = {}): Record<string, string> {
  return parse(
    req ? req.headers.cookie : isBrowser ? document.cookie : "",
    options
  );
}
