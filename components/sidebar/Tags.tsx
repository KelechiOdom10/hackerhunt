import {
  VStack,
  useColorModeValue,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import { darken } from "@chakra-ui/theme-tools";
import { links } from "../post/PostList";
import CustomButton from "../utils/CustomButton";
import CustomLink from "../utils/CustomLink";

export const TagLink = ({ tag }: { tag: string }) => {
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
      <CustomLink href={`/tags/${tag}`} fontWeight="semibold">
        <Text w="full">#{tag}</Text>
      </CustomLink>
    </Box>
  );
};

export default function Tags() {
  let tags = [];
  links.forEach(link => {
    tags = tags.concat(link.tags);
  });
  tags = [...new Set(tags.map(tag => tag.toLowerCase()))];
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
        {tags.map(tag => (
          <TagLink key={tag} tag={tag} />
        ))}
        <Divider />
        <CustomLink href="/tags" w="full" px={3}>
          <CustomButton variant="primary" w="full">
            View all tags
          </CustomButton>
        </CustomLink>
      </VStack>
    </Box>
  );
}
