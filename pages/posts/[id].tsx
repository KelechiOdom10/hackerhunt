import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { initializeApollo } from "../../apollo/client";
import {
  FeedDocument,
  FeedQuery,
  // Link,
  LinkDocument,
  LinkQuery,
} from "../../apollo/generated/graphql";
import Layout from "../../components/layout/Layout";
import PostDetail from "../../components/post/detail/PostDetail";

export default function Story({ id }: { id: string }) {
  return (
    <Layout>
      <PostDetail id={id} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await initializeApollo({});

  const { data } = await client.query<FeedQuery>({ query: FeedDocument });
  const paths = data.feed.map(link => ({
    params: { id: link.id },
  }));

  return {
    paths: paths || [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = await initializeApollo({});

  await client.query<LinkQuery>({
    query: LinkDocument,
    variables: { linkId: params.id },
  });

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
      id: params.id,
    },
  };
};
