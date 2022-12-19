import React from "react";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import { ChakraNextImage } from "~/components/utils/CustomImage";

const NotFound = () => {
  return (
    <div>
      <Meta meta={{ title: "Not Found | Hacker Hunt" }} />{" "}
      <Layout>
        <ChakraNextImage
          src="/assets/404.webp"
          alt="404 Image"
          width={800}
          height={400}
        />
      </Layout>
    </div>
  );
};

export default NotFound;
