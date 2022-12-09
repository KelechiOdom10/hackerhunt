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
import {
  LinkDetailsFragment,
  useTopLinksQuery,
} from "~/apollo/generated/graphql";
import { ChakraNextImage } from "../utils/CustomImage";
import CustomLink from "../utils/CustomLink";

type Props = {
  link: LinkDetailsFragment;
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
  const { data } = useTopLinksQuery();
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
          {data &&
            data.topLinks.map(link => (
              <LastWeekPost key={link.id} link={link} />
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
