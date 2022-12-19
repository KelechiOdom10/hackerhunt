import CreatePostForm from "~/components/forms/CreatePostForm";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import { withAuth } from "~/hoc/withAuth";

export default withAuth(function New() {
  return (
    <div>
      <Meta
        meta={{
          title: "Create new story | Hacker Hunt",
        }}
      />
      <Layout>
        <CreatePostForm />
      </Layout>
    </div>
  );
});
