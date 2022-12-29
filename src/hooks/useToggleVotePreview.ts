import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  useToggleVoteMutation,
  FeedQueryVariables,
  useFeedQuery,
  FeedQuery,
  useUserQuery,
  UserQuery,
} from "~/apollo/generated";
import { PAGE_SIZE } from "~/config";
import { formatError } from "~/utils/errorUtils";

export const useToggleVotePreview = () => {
  const { pathname, query } = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();
  const userId = query?.id as string;
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
      if (pathname === "/user/[id]") {
        const queryKey = useUserQuery.getKey({ userId });
        const queryResult = queryClient.getQueryData(queryKey);

        queryResult &&
          queryClient.setQueryData<UserQuery>(queryKey, oldData => ({
            ...oldData,
            user: {
              ...oldData.user,
              links: oldData.user.links.map(link =>
                link.id === linkId ? toggleVote : link
              ),
              votes: oldData.user.votes.map(vote => ({
                ...vote,
                link: vote.link.id === linkId ? toggleVote : vote.link,
              })),
            },
          }));
      }

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
