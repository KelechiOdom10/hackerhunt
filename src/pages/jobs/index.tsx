import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import { useJobsQuery } from "~/apollo/generated";
import JobList from "~/components/job/JobList";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";

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

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: useJobsQuery.getKey(),
    queryFn: useJobsQuery.fetcher(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
