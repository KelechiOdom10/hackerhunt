import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import {
  useCreateLinkMutation,
  FeedQuery,
  useFeedQuery,
} from "~/apollo/generated";
import { formatError, maskApolloError } from "~/utils/errorUtils";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "~/config";

export const useCreateLink = () => {
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutationInfo = useCreateLinkMutation({
    onSuccess({ createLink }) {
      const defaultNewVariables = {
        args: {
          filter: "",
          orderBy: "createdAt",
          skip: 0,
          take: PAGE_SIZE,
        },
      };
      const queryKey = useFeedQuery.getKey(defaultNewVariables);
      const queryResult = queryClient.getQueryData<FeedQuery>(queryKey);
      queryResult &&
        queryClient.setQueryData<FeedQuery>(queryKey, oldData => ({
          ...oldData,
          feed: {
            ...oldData.feed,
            count: oldData.feed.count + 1,
            links: [createLink, ...oldData.feed.links],
          },
        }));
      toast({
        status: "success",
        description: "New story created",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });

      router.push({ pathname: "/", query: { orderBy: "createdAt" } });
    },
    onError: e => {
      const formattedError = formatError(e);

      toast({
        description: maskApolloError(
          formattedError.message,
          "Failed to add Link. Please try again. "
        ),
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    },
  });

  return mutationInfo;
};
