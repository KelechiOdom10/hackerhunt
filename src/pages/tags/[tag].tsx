import { Grid, GridItem } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { initializeApollo } from "~/apollo/client";
import {
  FeedQueryVariables,
  FeedQuery,
  FeedDocument,
  PopularTagsDocument,
} from "~/apollo/generated/graphql";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import PostListContainer from "~/components/post/PostListContainer";
import Tags from "~/components/sidebar/Tags";
import { PAGE_SIZE } from "~/config";

const TagPage = ({ tag }: { tag: string }) => {
  return (
    <>
      <Meta
        meta={{
          title: `#${tag} - Tag | Hacker Hunt`,
        }}
      />
      <Layout>
        <Grid h="200px" templateColumns="repeat(6, 1fr)" gap={6} my={12}>
          <GridItem colSpan={{ base: 6, md: 4 }}>
            <PostListContainer title={`Results for "#${tag}"`} />
          </GridItem>
          <GridItem colSpan={2} display={{ base: "none", md: "block" }}>
            <Tags />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default TagPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = initializeApollo({});
  const page = (query?.page as string) ?? "1";
  const tag = (query?.tag as string) ?? "";

  const variables: FeedQueryVariables = {
    args: {
      filter: "",
      tag,
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
      query: PopularTagsDocument,
    }),
  ]);

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
      tag,
    },
  };
};
