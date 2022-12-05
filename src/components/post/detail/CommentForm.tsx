import { VStack, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";
import AddCommentSkeleton from "~/components/skeletons/AddCommentSkeleton";
import CustomLink from "~/components/utils/CustomLink";
import { useCreateComment } from "~/hooks/useCreateComment";
import { useMe } from "~/hooks/useMe";

const CommentForm = ({ linkId }: { linkId: string }) => {
  const { me, loading } = useMe();
  const [text, setText] = useState("");
  const createComment = useCreateComment();

  const handleSubmit = () => {
    createComment({
      variables: { input: { linkId, text } },
    });
    setText("");
  };

  return (
    <>
      {me ? (
        <VStack w="full" spacing={4}>
          <Textarea
            variant="primary"
            resize="none"
            height="100px"
            placeholder={`Say something nice to ${me?.username}...`}
            value={text}
            onChange={e => setText(e.currentTarget.value)}
          />
          <Button
            variant="primary"
            alignSelf="flex-start"
            onClick={handleSubmit}
          >
            Add comment
          </Button>
        </VStack>
      ) : loading ? (
        <AddCommentSkeleton />
      ) : (
        <CustomLink href="/signin" alignSelf="flex-start">
          <Button variant="primary">Login to Comment</Button>
        </CustomLink>
      )}
    </>
  );
};

export default CommentForm;
