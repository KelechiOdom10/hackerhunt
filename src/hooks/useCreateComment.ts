import { useToast } from "@chakra-ui/react";
import {
  useCreateCommentMutation,
  LinkQuery,
  LinkDocument,
} from "~/apollo/generated/graphql";
import { formatError, maskApolloError } from "~/utils/errorUtils";

export const useCreateComment = () => {
  const toast = useToast();
  const [createComment] = useCreateCommentMutation({
    onCompleted: () => {
      toast({
        status: "success",
        description: "New comment added",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    },
    update(cache, { data: { createComment } }) {
      const queryResult = cache.readQuery<LinkQuery>({
        query: LinkDocument,
        variables: { linkId: createComment.link.id },
      });
      queryResult &&
        cache.writeQuery<LinkQuery>({
          query: LinkDocument,
          data: {
            link: {
              ...queryResult.link,
              comments: [createComment, ...queryResult.link.comments],
              commentCount: queryResult.link.commentCount + 1,
            },
          },
        });
    },
    onError: e => {
      const formattedError = formatError(e);
      toast({
        status: "error",
        description: maskApolloError(
          formattedError.message,
          "Failed to add comment. Please try again."
        ),
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    },
  });

  return createComment;
};
