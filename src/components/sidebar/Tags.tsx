import {
  VStack,
  useColorModeValue,
  Text,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { darken } from "@chakra-ui/theme-tools";
import CustomLink from "../utils/CustomLink";
import { TagPreviewFragment, usePopularTagsQuery } from "~/apollo/generated";

export const TagLink = ({ tag }: { tag: TagPreviewFragment }) => {
  return (
    <Box
      _hover={{
        bg: useColorModeValue(darken("brand.50", 0.8), "gray.700"),
      }}
      py={2}
      px={3}
      rounded="md"
      w="full"
    >
      <CustomLink href={`/tags/${tag.name}`} fontWeight="semibold">
        <Text w="full">#{tag.name}</Text>
      </CustomLink>
    </Box>
  );
};

export default function Tags() {
  const { data, isLoading } = usePopularTagsQuery();
  const tags = data?.popularTags || [];

  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box mb={12}>
      <Text
        fontFamily="heading"
        fontSize={{ base: "md", md: "lg" }}
        py={2}
        textAlign="start"
      >
        Popular tags
      </Text>
      <VStack
        spacing={1}
        bg={bgColor}
        p={3}
        rounded="md"
        align="start"
        borderWidth={useColorModeValue(1, 0)}
      >
        {isLoading &&
          [...Array(5).keys()].map(key => (
            <Skeleton key={key} w="full" h={10} rounded="md" />
          ))}
        {tags.map(tag => (
          <TagLink key={tag.id} tag={tag} />
        ))}
      </VStack>
    </Box>
  );
}
