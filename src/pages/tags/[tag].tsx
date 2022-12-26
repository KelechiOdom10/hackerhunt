import { Grid, GridItem } from "@chakra-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { usePopularTagsQuery, useTagQuery } from "~/apollo/generated";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import Tags from "~/components/sidebar/Tags";
import TagListContainer from "~/components/tag/TagListContainer";

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
            <TagListContainer name={tag} />
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
  const queryClient = new QueryClient();
  const name = query?.tag as string;

  try {
    await Promise.allSettled([
      queryClient.prefetchQuery({
        queryKey: useTagQuery.getKey({ name }),
        queryFn: useTagQuery.fetcher({ name }),
      }),
      queryClient.prefetchQuery({
        queryKey: usePopularTagsQuery.getKey(),
        queryFn: usePopularTagsQuery.fetcher(),
      }),
    ]);
  } catch (error) {
    console.log({ error });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      tag: name,
    },
  };
};
