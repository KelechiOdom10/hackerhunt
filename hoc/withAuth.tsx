import { useRouter } from "next/router";
import { NextPage } from "next";
import { useEffect } from "react";
import LoadingScreen from "../components/utils/LoadingScreen";
import { useMe } from "../hooks/useMe";

export const withAuth = (WrappedComponent: NextPage, location?: string) => {
  function AuthComponent(props) {
    const router = useRouter();
    const { me, loading } = useMe();

    useEffect(() => {
      if (loading) return;
      if (!me) {
        router.replace(location || "/signin");
      }
    }, [loading, me, router, location]);

    if (loading || !me) {
      return <LoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  }

  return AuthComponent;
};
