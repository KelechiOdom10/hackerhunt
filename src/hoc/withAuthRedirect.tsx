import { isBrowser } from "~/utils/isBrowser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingScreen from "~/components/utils/LoadingScreen";
import { useMe } from "~/hooks/useMe";

export default function withAuthRedirect<P = {}, IP = P>({
  WrappedComponent,
  LoadingComponent = LoadingScreen,
  expectedAuth,
  redirectPath,
}: {
  WrappedComponent: NextPage<P, IP>;
  LoadingComponent?: React.FC;
  expectedAuth: boolean;
  redirectPath: string;
}): NextPage<P, IP> {
  const WithAuthRedirectWrapper: NextPage<P, IP> = props => {
    const { replace, query } = useRouter();
    const { isLoading, me } = useMe();

    useEffect(() => {
      if (isBrowser && expectedAuth !== !!me)
        replace((query?.redirectTo as string) || redirectPath);
    }, [me, query?.redirectTo, replace]);

    if (isLoading) {
      return <LoadingComponent />;
    }

    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirectWrapper;
}
