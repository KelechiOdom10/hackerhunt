import { GetServerSideProps, NextPage } from "next";
import { initializeApollo } from "~/apollo/client";
import {
  UserDocument,
  UserQuery,
  UserQueryVariables,
} from "~/apollo/generated/graphql";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import UserProfile from "~/components/user/UserProfile";

type Props = {
  userId: string;
  username;
  string;
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
    "public, s-maxage=60, stale-while-revalidate=59"
  );
  const client = initializeApollo({});
  const userId = query?.id as string;

  const result = await client.query<UserQuery, UserQueryVariables>({
    query: UserDocument,
    variables: {
      userId,
    },
  });

  return {
    props: {
      initialApolloState: JSON.parse(JSON.stringify(client.cache.extract())),
      userId,
      username: result.data.user.username,
    },
    revalidate: 60 * 60 * 2,
  };
};
