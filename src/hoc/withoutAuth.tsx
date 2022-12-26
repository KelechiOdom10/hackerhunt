import { NextPage } from "next";
import withAuthRedirect from "./withAuthRedirect";

export default function withoutAuth<P = {}, IP = P>(
  WrappedComponent: NextPage<P, IP>,
  redirectPath = "/",
  expectedAuth = false
): NextPage<P, IP> {
  return withAuthRedirect({
    WrappedComponent,
    redirectPath,
    expectedAuth,
  });
}
