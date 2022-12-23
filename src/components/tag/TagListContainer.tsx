import { VStack, HStack, Text, Heading } from "@chakra-ui/react";
import PostList from "../post/PostList";
import { useTagQuery } from "~/apollo/generated/graphql";

export default function TagListContainer({ name }: { name?: string }) {
  const { loading, data } = useTagQuery({
    variables: {
      name,
    },
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
      {!data && (
        <Heading fontSize="md" fontFamily="Lato" alignSelf="start">
          No posts with tag {`"#${name}"`}
        </Heading>
      )}
      {data && data.tag && (
        <>
          <PostList loading={loading} links={data.tag?.links} />
        </>
      )}
    </VStack>
  );
}
