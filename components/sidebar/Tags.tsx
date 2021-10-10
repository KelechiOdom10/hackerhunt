import {
  VStack,
  useColorModeValue,
  Text,
  Box,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { links } from "../post/PostList";
import CustomButton from "../utils/CustomButton";
import CustomLink from "../utils/CustomLink";

export const TagLink = ({ tag }: { tag: string }) => {
  return (
    <Box
      _hover={{
        bg: useColorModeValue("gray.100", "gray.700"),
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
          <CustomButton
            variant="secondary"
            w="full"
            rightIcon={<Icon as={FiArrowRight} mt={1} />}
          >
            View all tags
          </CustomButton>
        </CustomLink>
      </VStack>
    </Box>
  );
}
