import { GetServerSideProps } from "next";
import { initializeApollo } from "~/apollo/client";
import { JobsDocument } from "~/apollo/generated/graphql";
import JobList from "~/components/job/JobList";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";

const client = initializeApollo({});

function Jobs() {
  return (
    <>
      <Meta meta={{ title: "Job Board | Hacker Hunt" }} />
      <Layout>
        <JobList />
      </Layout>
    </>
  );
}

export default Jobs;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=31536000, stale-while-revalidate"
  );

  await client.query({
    query: JobsDocument,
  });

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
    },
  };
};
