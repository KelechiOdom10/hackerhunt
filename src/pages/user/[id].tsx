import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { useUserQuery, UserQuery } from "~/apollo/generated";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import UserProfile from "~/components/user/UserProfile";

type Props = {
  userId: string;
  username: string;
};

const UserDetail: NextPage = ({ userId, username }: Props) => {
  return (
    <>
      <Meta
        meta={{
          title: `@${username} | Hacker Hunt Profile`,
          image: `https://avatars.dicebear.com/api/open-peeps/${username}.svg`,
        }}
      />
      <Layout>
        <UserProfile userId={userId} />
      </Layout>
    </>
  );
};

export default UserDetail;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=59"
  );

  const queryClient = new QueryClient();
  const userId = query?.id as string;

  await queryClient.prefetchQuery({
    queryKey: useUserQuery.getKey({ userId }),
    queryFn: useUserQuery.fetcher({ userId }),
  });

  const data = queryClient.getQueryData<UserQuery>(
    useUserQuery.getKey({ userId })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      userId,
      username: data.user.username,
    },
  };
};
