import { Button, Skeleton } from "@chakra-ui/react";

function AddCommentSkeleton() {
  return (
    <>
      <Skeleton height="100px" w="full" />
      <Skeleton w="100px" rounded="md" mt={4} alignSelf="flex-start">
        <Button />
      </Skeleton>
    </>
  );
}

export default AddCommentSkeleton;
