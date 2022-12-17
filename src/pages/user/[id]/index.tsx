import { GetServerSideProps, NextPage } from "next";
import { initializeApollo } from "~/apollo/client";
import {
  UserDocument,
  UserQuery,
  UserQueryVariables,
} from "~/apollo/generated/graphql";
import Layout from "~/components/layout/Layout";
import UserProfile from "~/components/user/UserProfile";

type Props = {
  userId: string;
};

const UserDetail: NextPage = ({ userId }: Props) => {
  return (
    <Layout>
      <UserProfile userId={userId} />
    </Layout>
  );
};

export default UserDetail;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const userId = (query?.id as string) || "";
  const client = initializeApollo({});

  await client.query<UserQuery, UserQueryVariables>({
    query: UserDocument,
    variables: {
      userId,
    },
  });

  return {
    props: {
      userId,
    },
  };
};
