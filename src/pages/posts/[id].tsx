import { GetServerSideProps } from "next";
import { initializeApollo } from "~/apollo/client";
import {
  LinkQuery,
  LinkDocument,
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
          keywords: link ? link.tags.map(tag => tag.name) : [],
        }}
      />
      <Layout>
        <PostDetail id={id} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=180, stale-while-revalidate=59"
  );
  const client = initializeApollo({});

  const result = await client.query<LinkQuery>({
    query: LinkDocument,
    variables: { linkId: query?.id },
  });

  if (!result.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
      id: query?.id,
      link: result.data.link,
    },
  };
};
