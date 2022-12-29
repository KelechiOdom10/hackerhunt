import { Grid, GridItem } from "@chakra-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import {
  FeedQueryVariables,
  useFeedQuery,
  useJobsQuery,
  usePopularTagsQuery,
  useRandomLinksQuery,
} from "~/apollo/generated";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import PostListContainer from "~/components/post/PostListContainer";
import PostsLastWeek from "~/components/post/PostsYouMightLike";
import HiringNow from "~/components/sidebar/HiringNow";
import Tags from "~/components/sidebar/Tags";
import { PAGE_SIZE } from "~/config";

export default function Home() {
  return (
    <>
      <Meta />
      <Layout>
        <Grid templateColumns="repeat(6, 1fr)" gap={6} mt={6}>
          <GridItem colSpan={{ base: 6, md: 4 }}>
            <PostsLastWeek />
            <PostListContainer />
          </GridItem>
          <GridItem colSpan={2} display={{ base: "none", md: "block" }}>
            <HiringNow />
            <Tags />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();
  const page = (query?.page as string) || "1";
  const variables: FeedQueryVariables = {
    args: {
      filter: (query?.filter as string) || "",
      skip: (parseInt(page) - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: (query?.orderBy as string) ?? "votes",
    },
  };

  try {
    await Promise.allSettled([
      queryClient.prefetchQuery({
        queryKey: useFeedQuery.getKey(variables),
        queryFn: useFeedQuery.fetcher(variables),
      }),
      queryClient.prefetchQuery({
        queryKey: useRandomLinksQuery.getKey(),
        queryFn: useRandomLinksQuery.fetcher(),
      }),
      queryClient.prefetchQuery({
        queryKey: usePopularTagsQuery.getKey(),
        queryFn: usePopularTagsQuery.fetcher(),
      }),
      queryClient.prefetchQuery({
        queryKey: useJobsQuery.getKey({ limit: 4 }),
        queryFn: useJobsQuery.fetcher({ limit: 4 }),
      }),
    ]);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
