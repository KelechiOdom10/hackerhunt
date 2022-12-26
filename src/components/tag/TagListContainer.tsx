import { VStack, HStack, Text, Heading } from "@chakra-ui/react";
import PostList from "../post/PostList";
import { useTagQuery } from "~/apollo/generated";
import PostSkeletonPreview from "../skeletons/PostPreviewSkeleton";

export default function TagListContainer({ name }: { name: string }) {
  const { isLoading, data } = useTagQuery({
    name,
  });

  return (
    <VStack spacing={4} align="start" w="full" mb={8}>
      <HStack justify="space-between" align="center" w="full">
        <Text
          fontFamily="heading"
          w="50%"
          fontSize={{ base: "md", md: "lg" }}
          textAlign="start"
        >
          {`Results for "#${name}"`}
        </Text>
      </HStack>
      {isLoading &&
        [...Array(3).keys()].map(key => <PostSkeletonPreview key={key} />)}
      {!data && (
        <Heading fontSize="md" fontFamily="Lato" alignSelf="start">
          No posts with tag {`"#${name}"`}
        </Heading>
      )}
      {data && data.tag && (
        <>
          <PostList loading={isLoading} links={data.tag?.links} />
        </>
      )}
    </VStack>
  );
}
