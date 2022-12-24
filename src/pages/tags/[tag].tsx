import { Grid, GridItem } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { initializeApollo } from "~/apollo/client";
import {
  FeedDocument,
  PopularTagsDocument,
  TagQuery,
  TagQueryVariables,
} from "~/apollo/generated/graphql";
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
  const client = initializeApollo({});
  const tag = query?.tag as string;

  try {
    await Promise.allSettled([
      client.query<TagQuery, TagQueryVariables>({
        query: FeedDocument,
        variables: {
          name: tag,
        },
      }),
      client.query({
        query: PopularTagsDocument,
      }),
    ]);
  } catch (error) {
    console.log({ error });
  }

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
      tag,
    },
  };
};
