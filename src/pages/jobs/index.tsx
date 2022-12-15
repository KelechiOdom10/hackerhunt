import { GetStaticProps } from "next";
import { initializeApollo } from "~/apollo/client";
import { JobsDocument } from "~/apollo/generated/graphql";
import JobList from "~/components/job/JobList";
import Layout from "~/components/layout/Layout";

function Jobs() {
  return (
    <Layout>
      <JobList />
    </Layout>
  );
}

export default Jobs;

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo({});

  await client.query({
    query: JobsDocument,
  });

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
    },
  };
};
