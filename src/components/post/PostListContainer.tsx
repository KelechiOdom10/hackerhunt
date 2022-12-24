import {
  VStack,
  HStack,
  Text,
  StackDivider,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFeedQuery, FeedQueryVariables } from "~/apollo/generated/graphql";
import { PAGE_SIZE } from "~/config";
import Pagination from "../utils/Pagination";
import PostList from "./PostList";

export default function PostListContainer({
  title = "Stories",
}: {
  title?: string;
}) {
  const { query, pathname, push } = useRouter();
  const page = (query?.page as string) || "1";
  const variables: FeedQueryVariables = {
    args: {
      filter: (query?.filter as string) || "",
      skip: (parseInt(page) - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: (query?.orderBy as string) || "votes",
    },
  };
  const { data, loading } = useFeedQuery({
    variables,
    initialFetchPolicy: "cache-first",
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
          {title}
        </Text>
        <HStack
          divider={<StackDivider borderColor="gray.200" />}
          align="flex-end"
        >
          <Button
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
            onClick={() =>
              push({
                pathname,
                query: { ...query, orderBy: "votes", page: "1" },
              })
            }
          >
            Popular
          </Button>
          <Button
            _hover={{ textDecor: "none" }}
            color={useColorModeValue(
              "brand.900",
              !query?.orderBy || query.orderBy === "createdAt"
                ? "white"
                : "whiteAlpha.600"
            )}
            fontWeight={query?.orderBy === "createdAt" ? "extrabold" : 500}
            variant="link"
            fontSize="sm"
            onClick={() =>
              push({
                pathname,
                query: { ...query, orderBy: "createdAt", page: "1" },
              })
            }
          >
            Newest
          </Button>
        </HStack>
      </HStack>
      {data && (
        <>
          <PostList loading={loading} links={data.feed?.links} />
          <Pagination
            currentPage={parseInt(page)}
            totalPosts={data.feed.count}
          />
        </>
      )}
    </VStack>
  );
}
