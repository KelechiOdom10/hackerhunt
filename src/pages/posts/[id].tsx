import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import {
  useLinkQuery,
  LinkQuery,
  LinkDetailsFragment,
} from "~/apollo/generated";
import Layout from "~/components/layout/Layout";
import Meta, { metaDefaults } from "~/components/layout/Meta";
import PostDetail from "~/components/post/detail/PostDetail";

export default function Post({
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
          keywords:
            link && link.tags.length > 0
              ? link.tags.map(tag => tag.name)
              : metaDefaults.keywords,
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
  const queryClient = new QueryClient();
  const linkId = query?.id as string;

  await queryClient.prefetchQuery({
    queryKey: useLinkQuery.getKey({ linkId }),
    queryFn: useLinkQuery.fetcher({ linkId }),
  });

  const data = queryClient.getQueryData<LinkQuery>(
    useLinkQuery.getKey({ linkId })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id: query?.id,
      link: data?.link,
    },
  };
};
