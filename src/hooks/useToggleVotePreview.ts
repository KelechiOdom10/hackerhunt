import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  useToggleVoteMutation,
  FeedQueryVariables,
  useFeedQuery,
  FeedQuery,
} from "~/apollo/generated";
import { PAGE_SIZE } from "~/config";
import { formatError } from "~/utils/errorUtils";

export const useToggleVotePreview = (id: string) => {
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();
  const page = (query?.page as string) || "1";
  const variables: FeedQueryVariables = {
    args: {
      filter: (query?.filter as string) || "",
      skip: (parseInt(page) - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: (query?.orderBy as string) || "votes",
    },
  };

  const { mutate: toggleVote } = useToggleVoteMutation({
    onSuccess({ toggleVote }, { linkId }) {
      const queryKey = useFeedQuery.getKey(variables);
      const queryResult = queryClient.getQueryData(queryKey);

      queryResult &&
        queryClient.setQueryData<FeedQuery>(queryKey, oldData => ({
          ...oldData,
          feed: {
            ...oldData.feed,
            links: oldData.feed.links.map(link =>
              link.id === linkId ? toggleVote : link
            ),
          },
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
