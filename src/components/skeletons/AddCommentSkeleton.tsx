import { Button } from "@chakra-ui/button";
import { Skeleton } from "@chakra-ui/skeleton";

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
