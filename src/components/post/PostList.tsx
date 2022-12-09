import {
  VStack,
  HStack,
  Text,
  StackDivider,
  Button,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFeedQuery, Link, FeedArgs } from "~/apollo/generated/graphql";
import { PAGE_SIZE } from "~/config";
import PostSkeletonPreview from "../skeletons/PostPreviewSkeleton";
import CustomLink from "../utils/CustomLink";
import Pagination from "../utils/Pagination";
import PostPreview from "./preview/PostPreview";

export default function PostList() {
  const { query, pathname } = useRouter();
  const page = (query?.page as string) || "1";
  const args: FeedArgs = {
    filter: (query?.filter as string) ?? "",
    skip: (parseInt(page) - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: (query?.orderBy as string) ?? "votes",
  };
  const { data, loading } = useFeedQuery({
    variables: { args },
  });

  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <VStack spacing={4} align="start" w="full" mb={8}>
      <HStack justify="space-between" align="flex-end" w="full">
        <Text
          fontFamily="heading"
          fontSize={{ base: "md", md: "lg" }}
          textAlign="start"
        >
          Stories
        </Text>
        <HStack
          divider={<StackDivider borderColor="gray.200" />}
          align="flex-end"
        >
          <Button
            as={CustomLink}
            href={{
              pathname,
              query: { ...query, orderBy: "votes", page: "1" },
            }}
            variant="link"
            color={useColorModeValue(
              "brand.900",
              !query?.orderBy || query.orderBy === "votes"
                ? "white"
                : "whiteAlpha.600"
            )}
            _hover={{ textDecor: "none" }}
            fontSize="sm"
            fontWeight={
              !query?.orderBy || query.orderBy === "votes" ? "extrabold" : 500
            }
          >
            Popular
          </Button>
          <Button
            as={CustomLink}
            _hover={{ textDecor: "none" }}
            color={useColorModeValue(
              "brand.900",
              !query?.orderBy || query.orderBy === "createdAt"
                ? "white"
                : "whiteAlpha.600"
            )}
            href={{
              pathname,
              query: { ...query, orderBy: "createdAt", page: "1" },
            }}
            fontWeight={query?.orderBy === "createdAt" ? "extrabold" : 500}
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
        {data && data.feed.links.length === 0 ? (
          <Heading
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            fontFamily="Lato"
            alignSelf="start"
          >
            No posts yet
          </Heading>
        ) : (
          data.feed.links.map((link: Link) => (
            <PostPreview link={link} key={link.id} />
          ))
        )}
      </VStack>
      <Pagination currentPage={parseInt(page)} totalPosts={data.feed.count} />
    </VStack>
  );
}
