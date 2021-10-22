/* eslint-disable camelcase */
import {
  HStack,
  VStack,
  Image,
  useColorModeValue,
  Flex,
  Badge,
  Icon,
  Text,
} from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import { IoMdChatboxes } from "react-icons/io";
import { Link } from "../../apollo/generated/graphql";
import CustomLink from "../utils/CustomLink";
import UpVoteButton from "./UpVoteButton";

type Props = {
  link: Link;
};

export default function PostPreview({ link }: Props) {
  const addDefaultSrc = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/assets/fallback.jpeg";
  };

  return (
    <Flex align="center" justify="space-between" py={1} rounded="md" w="full">
      <HStack spacing={4}>
        <Image
          src={link.image}
          onError={addDefaultSrc}
          alt={link.title}
          width={{ base: "60px", md: "75px" }}
          height={{ base: "60px", md: "75px" }}
          borderRadius="md"
          objectFit="cover"
        />
        <VStack align="flex-start" spacing={1}>
          <CustomLink
            variant="primary"
            isExternal
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            fontWeight="bold"
            href={link.url}
          >
            {link.title}
          </CustomLink>
          <CustomLink
            fontSize={{ base: "0.7rem", md: "xs" }}
            underline
            variant="link"
            isTruncated
            fontWeight={500}
            href="/"
            color={useColorModeValue("gray.600", "whiteAlpha.700")}
          >
            by {link.user.username.toLowerCase()} (3 hours ago)
          </CustomLink>
          <HStack spacing={4} align="center">
            <CustomLink href="#" underline>
              <HStack
                fontSize={{ base: "xs", md: "sm" }}
                spacing={1}
                color={useColorModeValue("gray.500", "whiteAlpha.800")}
                mb={-2}
              >
                <Icon
                  w={4}
                  h={4}
                  mr={0.8}
                  as={IoMdChatboxes}
                  aria-label="Toggle Like"
                />
                <Text fontSize={{ base: "0.7rem", md: "xs" }}>
                  {link.commentCount}
                </Text>
              </HStack>
            </CustomLink>

            <HStack
              spacing={2}
              align="center"
              justify="space-between"
              pt={1}
              w={{ base: "30%", md: "full" }}
              overflowX="hidden"
              display={{ base: "none", md: "flex" }}
            >
              {link.tags.map(tag => (
                <CustomLink href={`/tags/${tag.toLowerCase()}`} key={tag}>
                  <Badge
                    fontSize="0.7rem"
                    size="sm"
                    p={1}
                    textTransform="lowercase"
                  >
                    {`#${tag}`}
                  </Badge>
                </CustomLink>
              ))}
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      <UpVoteButton count={link.voteCount} isFavorited={link.upVoted} />
    </Flex>
  );
}

interface BaseType {
  mediaType: string;
  contentType: string;
  favicons: string[];
  url: string;
  error: unknown;
}

export interface HTMLResponse extends BaseType {
  title: string;
  siteName: string;
  description: string;
  images: string[];
  videos: string[];
  contentType: `text/html${string}`;
}

// export interface Link {
//   id: string;
//   url: string;
//   image: string;
//   title: string;
//   description: string;
//   user: {
//     name: string;
//   };
//   comments_count: number;
//   likes_count: number;
//   isFavorited: boolean;
//   tags: string[];
// }
