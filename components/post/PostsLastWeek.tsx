/* eslint-disable camelcase */
import {
  HStack,
  VStack,
  Image,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import CustomLink from "../utils/CustomLink";
import { links } from "./PostList";

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
        <Image
          src={link.image}
          onError={addDefaultSrc}
          alt={link.title}
          width={{ base: "35px", md: "50px" }}
          height={{ base: "35px", md: "50px" }}
          borderRadius="md"
          objectFit="cover"
        />
        <VStack align="flex-start" spacing={0}>
          <CustomLink
            variant="primary"
            wordBreak="break"
            isExternal
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="bold"
            href={link.url}
          >
            {link.title}
          </CustomLink>
          <Text
            w="90%"
            noOfLines={2}
            fontSize={{ base: "xs", md: "xs" }}
            color={useColorModeValue("brand.500", "whiteAlpha.800")}
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

export interface Link {
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
