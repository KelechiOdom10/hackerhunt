import {
  Button,
  Container,
  HStack,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { initializeApollo } from "~/apollo/client";
import {
  FeedDocument,
  FeedQuery,
  FeedQueryVariables,
} from "~/apollo/generated/graphql";
import Layout from "~/components/layout/Layout";
import PostListContainer from "~/components/post/PostListContainer";
import { PAGE_SIZE } from "~/config";

const Search = ({ filter }: { filter: string }) => {
  const router = useRouter();
  const [query, setQuery] = useState(filter);
  const size = useBreakpointValue({ base: "sm", md: "md" }, { fallback: "md" });

  const handleSearchButtonClick = () => {
    if (query.length >= 2) {
      router.push({
        pathname: "/search",
        query: { filter: query },
      });
    }
  };

  return (
    <Layout>
      <Container maxW="4xl" py={12}>
        <HStack mb={8}>
          {" "}
          <Input
            type="text"
            size={size}
            placeholder="Search Hacker Hunt..."
            variant="primary"
            min={2}
            value={query}
            onChange={e => setQuery(e.currentTarget.value)}
            onKeyDown={event => {
              if (event.key === "Enter") {
                handleSearchButtonClick();
              }
            }}
          />
          <Button
            size={size}
            variant="primary"
            px={6}
            onClick={handleSearchButtonClick}
          >
            Search
          </Button>
        </HStack>
        <PostListContainer
          title={filter.length === 0 ? "Stories" : `Results for "${filter}"`}
        />
      </Container>
    </Layout>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = initializeApollo({});
  const page = (query?.page as string) ?? "1";
  const filter = (query?.filter as string) ?? "";

  const variables: FeedQueryVariables = {
    args: {
      filter,
      tag: (query?.tag as string) ?? "",
      skip: (parseInt(page) - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: (query?.orderBy as string) ?? "votes",
    },
  };

  await client.query<FeedQuery, FeedQueryVariables>({
    query: FeedDocument,
    variables,
  });

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
      filter,
    },
  };
};
