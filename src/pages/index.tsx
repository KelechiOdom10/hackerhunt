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
  TopLinksDocument,
} from "~/apollo/generated/graphql";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import PostListContainer from "~/components/post/PostListContainer";
import PostsLastWeek from "~/components/post/PostsLastWeek";
import HiringNow from "~/components/sidebar/HiringNow";
import Tags from "~/components/sidebar/Tags";
import { PAGE_SIZE } from "~/config";

export default function Home() {
  return (
    <div>
      <Meta />
      <Layout>
        <Grid h="200px" templateColumns="repeat(6, 1fr)" gap={6} mt={6}>
          <GridItem colSpan={{ base: 6, md: 4 }}>
            <PostsLastWeek />
            <PostListContainer />
          </GridItem>
          <GridItem colSpan={2} display={{ base: "none", md: "block" }}>
            {/* <HiringNow /> */}
            <Tags />
          </GridItem>
        </Grid>
      </Layout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = initializeApollo({});
  const page = (query?.page as string) ?? "1";
  const variables: FeedQueryVariables = {
    args: {
      filter: (query?.filter as string) ?? "",
      tag: (query?.tag as string) ?? "",
      skip: (parseInt(page) - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: (query?.orderBy as string) ?? "votes",
    },
  };

  await Promise.all([
    client.query<FeedQuery, FeedQueryVariables>({
      query: FeedDocument,
      variables,
    }),
    client.query({
      query: TopLinksDocument,
    }),
    client.query({
      query: PopularTagsDocument,
    }),
    // client.query<JobsQuery, JobsQueryVariables>({
    //   query: JobsDocument,
    //   variables: {
    //     limit: 4,
    //   },
    // }),
  ]);

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
    },
  };
};
