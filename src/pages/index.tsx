import { Grid, GridItem } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { initializeApollo } from "~/apollo/client";
import {
  FeedDocument,
  FeedQuery,
  FeedQueryVariables,
  JobsDocument,
  JobsQuery,
  JobsQueryVariables,
  PopularTagsDocument,
  RandomLinksDocument,
} from "~/apollo/generated/graphql";
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
  const client = initializeApollo({});
  const page = query?.page || "1";
  const variables: FeedQueryVariables = {
    args: {
      filter: (query?.filter as string) || "",
      skip: (parseInt(page as string) - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: (query?.orderBy as string) || "votes",
    },
  };

  await client.query({
    query: RandomLinksDocument,
  });
  await client.query({
    query: PopularTagsDocument,
  });
  await client.query<JobsQuery, JobsQueryVariables>({
    query: JobsDocument,
    variables: {
      limit: 4,
    },
  });
  await client.query<FeedQuery, FeedQueryVariables>({
    query: FeedDocument,
    variables,
  });

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
    },
  };
};
