import {
  HStack,
  VStack,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Text,
  Box,
  Heading,
} from "@chakra-ui/react";
import { LinkDetailsFragment, useRandomLinksQuery } from "~/apollo/generated";
import { ChakraNextImage } from "../utils/CustomImage";
import CustomLink from "../utils/CustomLink";

type Props = {
  link: LinkDetailsFragment;
};

const PostYouMightLike = ({ link }: Props) => {
  return (
    <Flex align="center" justify="space-between" rounded="md" w="full">
      <HStack spacing={4}>
        <CustomLink href={link.url} variant="primary" isExternal>
          <ChakraNextImage
            src={link.image as string}
            alt={link.title}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            chakraProps={{
              minWidth: "50px",
              height: "50px",
            }}
            style={{ objectFit: "cover" }}
          />
        </CustomLink>
        <VStack align="flex-start" spacing={0}>
          <CustomLink
            variant="primary"
            isExternal
            fontSize={{ md: "sm", lg: "md" }}
            fontWeight="bold"
            noOfLines={1}
            href={link.url}
          >
            {link.title}
          </CustomLink>
          <CustomLink
            href={`/posts/${link.id}`}
            w="90%"
            noOfLines={2}
            fontSize="sm"
            color={useColorModeValue("gray.600", "whiteAlpha.800")}
          >
            {link.description}
          </CustomLink>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default function PostsYouMightLike() {
  const { data } = useRandomLinksQuery();
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Box mb={12}>
      <Text
        fontFamily="heading"
        fontSize={{ base: "md", md: "lg" }}
        py={4}
        textAlign="start"
      >
        Stories you might like
      </Text>
      <Box bg={bgColor} rounded="md" p={4}>
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
          {data && data.randomLinks.length === 0 ? (
            <Heading fontSize="md" fontFamily="Lato" alignSelf="start">
              No stories yet
            </Heading>
          ) : (
            data &&
            data.randomLinks.map(link => (
              <PostYouMightLike key={link.id} link={link} />
            ))
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
