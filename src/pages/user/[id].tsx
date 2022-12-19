import { GetStaticPaths, GetStaticProps } from "next";
import { initializeApollo } from "~/apollo/client";
import {
  UserDocument,
  UserQuery,
  UserQueryVariables,
  UsersDocument,
  UsersQuery,
} from "~/apollo/generated/graphql";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import UserProfile from "~/components/user/UserProfile";

type Props = {
  userId: string;
  username: string;
};

const UserDetail = ({ userId, username }: Props) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo({});

  const result = await client.query<UsersQuery>({
    query: UsersDocument,
  });

  const paths = result.data.users.map(user => ({
    params: { id: user?.id || "" },
  }));

  return {
    paths: paths || [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo({});
  const userId = params?.id as string;

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
      username: result.data.user?.username || "",
    },
    revalidate: 60 * 60 * 2,
  };
};
