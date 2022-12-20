import { useRouter } from "next/router";
import { NextPage } from "next";
import { useEffect } from "react";
import LoadingScreen from "../components/utils/LoadingScreen";
import { useMe } from "../hooks/useMe";

export default function withoutAuth(
  WrappedComponent: NextPage,
  location?: string
) {
  function NoAuthComponent(props) {
    const router = useRouter();
    const { me, loading } = useMe();

    useEffect(() => {
      if (loading || !me) return;
      router.replace(location || "/");
    }, [loading, me, router]);

    if (loading || me) {
      return <LoadingScreen />;
    }

    return <WrappedComponent {...props} />;
  }

  return NoAuthComponent;
}
