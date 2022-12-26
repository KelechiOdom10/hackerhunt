import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateCommentMutation,
  LinkQuery,
  useLinkQuery,
} from "~/apollo/generated";
import { formatError, maskApolloError } from "~/utils/errorUtils";

export const useCreateComment = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: createComment } = useCreateCommentMutation({
    onSuccess: ({ createComment }, { input }) => {
      const queryKey = useLinkQuery.getKey({ linkId: input.linkId });
      const queryResult = queryClient.getQueryData(queryKey);
      queryResult &&
        queryClient.setQueryData<LinkQuery>(queryKey, oldData => ({
          ...oldData,
          link: {
            ...oldData.link,
            comments: [createComment, ...oldData.link.comments],
            commentCount: oldData.link.commentCount + 1,
          },
        }));
      toast({
        status: "success",
        description: "New comment added",
        position: "top-right",
        isClosable: true,
        duration: 4000,
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
