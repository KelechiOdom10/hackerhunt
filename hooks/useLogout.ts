import { useApolloClient } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { removeTokenCookie } from "../lib/auth-cookies";

export const useLogout = (redirectPath?: string) => {
  const client = useApolloClient();
  const router = useRouter();
  const toast = useToast();
  const handleLogout = async (lazyPath?: string) => {
    removeTokenCookie();
    await router.replace(lazyPath || redirectPath || "/");
    client.resetStore();
    toast({
      status: "success",
      description: "Successfully logged out!",
      position: "top-right",
      isClosable: true,
      duration: 4000,
    });
  };
  return handleLogout;
};
