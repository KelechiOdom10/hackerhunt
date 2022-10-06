import {
  VStack,
  HStack,
  Text,
  StackDivider,
  Button,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { Link, useFeedQuery } from "../../apollo/generated/graphql";
import PostSkeletonPreview from "../skeletons/PostPreviewSkeleton";
import PostPreview from "./preview/PostPreview";

export const links = [
  {
    id: "link-0",
    url: "https://www.howtographql.com/",
    title: "How to GraphQL - The Fullstack Tutorial for GraphQL",
    description:
      "Fullstack GraphQL Tutorial to go from zero to production covering all basics and advanced concepts. Includes tutorials for Apollo, Relay, React and NodeJS.",
    image: "https://i.ytimg.com/vi/Y0lDGjwRYKw/maxresdefault.jpg",
    user: {
      name: "Kelechi",
    },
    comments_count: 20,
    likes_count: 12345,
    isFavorited: false,
    tags: ["Programming", "Tech", "GraphQL", "React"],
  },
  {
    id: "link-1",
    url: "https://theathletic.co.uk/",
    description:
      "Unrivaled sports coverage across every team you care about and every league you follow. Get breaking news, powerful stories and smart analysis, all ad-free.",

    image:
      "https://theathletic.com/app/themes/athletic/assets/img/open-graph-asset.png",

    title: "Footy Level",
    user: {
      name: "Ife",
    },
    comments_count: 210,
    likes_count: 145,
    isFavorited: true,
    tags: ["Tech", "Ball", "React"],
  },
  {
    id: "link-4",
    url: "https://chakra-ui.com/docs/layout/simple-grid",
    description: "Component Library",

    image: "https://chakra-ui.com/og-image.png",

    title: "React Component Lib",
    user: {
      name: "Segun",
    },
    comments_count: 60,
    likes_count: 185,
    isFavorited: true,
    tags: ["Tech", "Ball", "React"],
  },
  {
    id: "link-2",
    url: "https://www.gq-magazine.co.uk/",
    description:
      "Men's fashion & style brought to you by industry experts at British GQ. GQ magazine provides entertainment, sport and culture news, reviews and comment.",

    image: "https://1000logos.net/wp-content/uploads/2021/05/GQ-logo.png",
    title: "British GQ - Men’s Style & Fashion",
    user: {
      name: "Teddy",
    },
    comments_count: 1,
    likes_count: 15,
    isFavorited: false,
    tags: ["Programming", "Tech", "GraphQL", "React"],
  },
];

export default function PostList() {
  const { data, loading } = useFeedQuery();

  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <VStack spacing={4} align="start" w="full" mb={8}>
      <HStack justify="space-between" align="flex-end" w="full">
        <Text
          fontFamily="heading"
          fontSize={{ base: "md", md: "lg" }}
          textAlign="start"
        >
          Top Stories
        </Text>
        <HStack
          divider={<StackDivider borderColor="gray.200" />}
          align="flex-end"
        >
          <Button
            variant="link"
            color={useColorModeValue("gray.900", "white")}
            _hover={{ textDecor: "none" }}
            fontSize="sm"
            fontWeight="extrabold"
          >
            Popular
          </Button>
          <Button
            _hover={{ textDecor: "none" }}
            color={useColorModeValue("brand.400", "whiteAlpha.600")}
            fontWeight="normal"
            variant="link"
            fontSize="sm"
          >
            Newest
          </Button>
        </HStack>
      </HStack>
      <VStack
        spacing={3}
        bg={bgColor}
        w="full"
        rounded="md"
        p={4}
        divider={<StackDivider />}
        borderWidth={useColorModeValue(1, 0)}
      >
        {loading &&
          [...Array(5).keys()].map(key => <PostSkeletonPreview key={key} />)}
        {data && data.feed.length === 0 ? (
          <Heading
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            fontFamily="Lato"
            alignSelf="start"
          >
            No posts yet
          </Heading>
        ) : (
          data.feed.map((link: Link) => (
            <PostPreview link={link} key={link.id} />
          ))
        )}
      </VStack>
    </VStack>
  );
}
