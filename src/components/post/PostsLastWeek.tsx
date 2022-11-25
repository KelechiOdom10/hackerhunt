import {
  HStack,
  VStack,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { ChakraNextImage } from "../utils/CustomImage";
import CustomLink from "../utils/CustomLink";

type Props = {
  link: Link;
};

const LastWeekPost = ({ link }: Props) => {
  const addDefaultSrc = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/assets/fallback.jpeg";
  };

  return (
    <Flex align="center" justify="space-between" rounded="md" w="full">
      <HStack spacing={4}>
        <ChakraNextImage
          src={link.image}
          onError={addDefaultSrc}
          alt={link.title}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          chakraProps={{ minWidth: "50px", height: "50px", borderRadius: "md" }}
          style={{ objectFit: "cover" }}
        />
        <VStack align="flex-start" spacing={0}>
          <CustomLink
            variant="primary"
            isExternal
            fontSize={{ md: "sm", lg: "md" }}
            fontWeight="bold"
            href={link.url}
          >
            {link.title}
          </CustomLink>
          <Text
            w="90%"
            noOfLines={2}
            fontSize="sm"
            color={useColorModeValue("gray.600", "whiteAlpha.800")}
          >
            {link.description}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default function PostsLastWeek() {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Box mb={12}>
      <Text
        fontFamily="heading"
        fontSize={{ base: "md", md: "lg" }}
        py={4}
        textAlign="start"
      >
        Best Stories from last week
      </Text>
      <Box bg={bgColor} rounded="md" p={4}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          {links &&
            links.map(link => <LastWeekPost key={link.id} link={link} />)}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

interface Link {
  id: string;
  url: string;
  image: string;
  title: string;
  description: string;
  user: {
    name: string;
  };
  comments_count: number;
  likes_count: number;
  isFavorited: boolean;
  tags: string[];
}

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
