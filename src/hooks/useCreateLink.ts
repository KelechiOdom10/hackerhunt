import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import {
  useCreateLinkMutation,
  FeedQuery,
  FeedDocument,
} from "~/apollo/generated/graphql";

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
      const { feed } = cache.readQuery<FeedQuery>({
        query: FeedDocument,
      });
      cache.writeQuery<FeedQuery>({
        query: FeedDocument,
        data: { feed: [createLink, ...feed] },
      });
    },
  });

  return createLink;
};
