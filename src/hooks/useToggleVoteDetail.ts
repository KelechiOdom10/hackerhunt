import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useToggleVoteMutation,
  LinkQuery,
  useLinkQuery,
} from "~/apollo/generated";
import { formatError } from "~/utils/errorUtils";

export const useToggleVoteDetail = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate: toggleVote } = useToggleVoteMutation({
    onSuccess({ toggleVote }, { linkId }) {
      const queryKey = useLinkQuery.getKey({ linkId });
      queryClient.setQueryData<LinkQuery>(queryKey, oldData => ({
        ...oldData,
        link: toggleVote,
      }));
    },
    onError(error) {
      const formattedError = formatError(error);
      toast({
        description: formattedError.message,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    },
  });
  return toggleVote;
};
