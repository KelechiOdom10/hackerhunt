import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import {
  useCreateLinkMutation,
  FeedQuery,
  FeedDocument,
} from "~/apollo/generated/graphql";
import { maskApolloError } from "~/utils/errorUtils";

export const useCreateLink = () => {
  const toast = useToast();
  const router = useRouter();
  const [createLink] = useCreateLinkMutation({
    onCompleted: () => {
      toast({
        status: "success",
        description: "New story created",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
      router.push("/");
    },
    update(cache, { data: { createLink } }) {
      const queryResult = cache.readQuery<FeedQuery>({
        query: FeedDocument,
      });
      queryResult &&
        cache.writeQuery<FeedQuery>({
          query: FeedDocument,
          data: { feed: [createLink, ...queryResult.feed] },
        });
    },
    onError: e => {
      toast({
        description: maskApolloError(
          e.message,
          "Failed to add Link. Please try again. "
        ),
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    },
  });

  return createLink;
};
