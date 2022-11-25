import {
  VStack,
  HStack,
  Text,
  StackDivider,
  Button,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useFeedQuery, Link } from "~/apollo/generated/graphql";
import PostSkeletonPreview from "../skeletons/PostPreviewSkeleton";
import PostPreview from "./preview/PostPreview";

export default function PostList() {
  const { data, loading } = useFeedQuery();

  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <VStack spacing={4} align="start" w="full" mb={8}>
      <HStack justify="space-between" align="flex-end" w="full">
        <Text
          fontFamily="heading"
          fontSize={{ base: "md", md: "lg" }}
          textAlign="start"
        >
          Top Stories
        </Text>
        <HStack
          divider={<StackDivider borderColor="gray.200" />}
          align="flex-end"
        >
          <Button
            variant="link"
            color={useColorModeValue("gray.900", "white")}
            _hover={{ textDecor: "none" }}
            fontSize="sm"
            fontWeight="extrabold"
          >
            Popular
          </Button>
          <Button
            _hover={{ textDecor: "none" }}
            color={useColorModeValue("brand.400", "whiteAlpha.600")}
            fontWeight="normal"
            variant="link"
            fontSize="sm"
          >
            Newest
          </Button>
        </HStack>
      </HStack>
      <VStack
        spacing={3}
        bg={bgColor}
        w="full"
        rounded="md"
        p={4}
        divider={<StackDivider />}
        borderWidth={useColorModeValue(1, 0)}
      >
        {loading &&
          [...Array(5).keys()].map(key => <PostSkeletonPreview key={key} />)}
        {data && data.feed.length === 0 ? (
          <Heading
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            fontFamily="Lato"
            alignSelf="start"
          >
            No posts yet
          </Heading>
        ) : (
          data.feed.map((link: Link) => (
            <PostPreview link={link} key={link.id} />
          ))
        )}
      </VStack>
    </VStack>
  );
}
