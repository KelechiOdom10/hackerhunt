import { useMeQuery } from "~/apollo/generated/graphql";

export function useMe() {
  const res = useMeQuery();
  return { me: res.data?.me, ...res };
}
