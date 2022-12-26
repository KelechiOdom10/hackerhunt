import { useMeQuery } from "~/apollo/generated";

export function useMe() {
  const res = useMeQuery();
  return { me: res.data?.me, loading: res.isLoading, ...res };
}
