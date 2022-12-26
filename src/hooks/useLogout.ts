import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { removeTokenCookie } from "server/utils/auth-cookies";
import { MeQuery, useMeQuery } from "~/apollo/generated";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const handleLogout = () => {
    removeTokenCookie();
    queryClient.setQueryData<MeQuery>(useMeQuery.getKey(), oldData => ({
      ...oldData,
      me: null,
    }));
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
