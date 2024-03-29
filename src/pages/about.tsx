/* eslint-disable react/no-unescaped-entities */
import { Heading, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";

export default function Home() {
  return (
    <div>
      <Meta
        meta={{
          title: "Discover the Story Behind Hacker Hunt",
        }}
      />
      <Layout>
        <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <Heading as="h1" fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            What is Hacker Hunt?
          </Heading>
          <Text fontSize="md" py={4}>
            Welcome to Hacker Hunt, a Hackernews inspired social news webapp
            with a modern design reminiscent of hacker culture. Our platform
            allows users to post links and have a generated preview post with an
            image and description. When creating a post, users can add tags and
            a title to make it easy for others to find.
          </Text>

          <Heading
            as="h2"
            pt={8}
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          >
            What makes us different?
          </Heading>
          <Text fontSize="md" py={4}>
            What makes us different is our focus on creating a tight-knit
            community of like-minded individuals who are passionate about
            technology and the latest developments in the field. In addition to
            the ability to post and comment on links, we also have a job board
            where users can find and apply for exciting opportunities in the
            tech industry.
          </Text>

          <Text fontSize="md">
            {`Our platform is built with a clean and intuitive interface, making it
          easy for users to navigate and interact with others. You can login or
          sign up to join our community and start participating in the
          conversation. Once you're logged in, you'll be able to view the feed
          of posts and sort them by most popular or newest. You can also view
          popular tags to see what's trending in the community.`}
          </Text>

          <Heading
            as="h3"
            pt={8}
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          >
            Community Guidelines
          </Heading>
          <Text fontSize="md" py={4}>
            We believe in fostering a positive and respectful community, so we
            have established some guidelines to ensure that everyone has a great
            experience on Hacker Hunt.
          </Text>
          <UnorderedList fontSize="md" py={2}>
            <ListItem>
              Be respectful of others: We encourage healthy debate and
              discussion, but personal attacks or inflammatory language will not
              be tolerated.
            </ListItem>
            <ListItem>
              Keep it relevant: Posts and comments should be relevant to the
              tech industry and the interests of our community. Off-topic
              content may be removed.
            </ListItem>
            <ListItem>
              No spam: Spamming the platform with low-quality or irrelevant
              content is not allowed.
            </ListItem>
            <ListItem>
              Follow the law: Posts and comments should not contain illegal or
              potentially harmful content.t
            </ListItem>
          </UnorderedList>
          <Text py={4}>
            By following these guidelines, you can help create a positive and
            engaging community on Hacker Hunt. We look forward to seeing your
            contributions and engaging with you on our platform.
          </Text>

          <Heading
            as="h4"
            pt={8}
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          >
            Open Source
          </Heading>
          <Text fontSize="md" py={4}>
            We believe in the power of open source software, and Hacker Hunt is
            released under the MIT License. This means that anyone is free to
            use, modify, and distribute the source code as long as they adhere
            to the terms of the license. We welcome contributions from the
            community.
          </Text>

          <Text fontSize="md">
            Whether you're a developer looking to help improve the code, or a
            user with ideas for new features, we would love to hear from you.
            <br />
            <i>
              You can find our source code{" "}
              <Link
                as={NextLink}
                fontWeight="bold"
                href="https://github.com/KelechiOdom10/hackerhunt"
                isExternal
              >
                here.
              </Link>
            </i>
          </Text>

          <Text fontSize="md" py={4}>
            If you're interested in contributing, feel free to open bug tickets
            and make feature requests.
          </Text>
          <Text></Text>
        </div>
      </Layout>
    </div>
  );
}
