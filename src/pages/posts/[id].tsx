import { GetStaticPaths, GetStaticProps } from "next";
import { initializeApollo } from "~/apollo/client";
import {
  FeedQuery,
  FeedDocument,
  LinkQuery,
  LinkDocument,
  FeedQueryVariables,
  TotalLinksQuery,
  TotalLinksDocument,
  LinkDetailsFragment,
} from "~/apollo/generated/graphql";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import PostDetail from "~/components/post/detail/PostDetail";

export default function Story({
  id,
  link,
}: {
  id: string;
  link: LinkDetailsFragment;
}) {
  return (
    <>
      <Meta
        meta={{
          title: `${link.title} | Hacker Hunt`,
          image: `${link.image}`,
          keywords: link.tags,
        }}
      />
      <Layout>
        <PostDetail id={id} />
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo({});

  const {
    data: { totalLinks },
  } = await client.query<TotalLinksQuery>({
    query: TotalLinksDocument,
  });

  const { data } = await client.query<FeedQuery, FeedQueryVariables>({
    query: FeedDocument,
    variables: { args: { take: totalLinks ?? 100 } },
  });
  const paths = data.feed.links.map(link => ({
    params: { id: link.id },
  }));

  return {
    paths: paths || [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo({});

  const result = await client.query<LinkQuery>({
    query: LinkDocument,
    variables: { linkId: params?.id },
  });

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
      id: params?.id,
      link: result.data.link,
    },
    revalidate: 60 * 60 * 2,
  };
};
