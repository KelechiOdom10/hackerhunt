import {
  VStack,
  StackDivider,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import PostSkeletonPreview from "../skeletons/PostPreviewSkeleton";
import PostPreview from "./preview/PostPreview";
import { LinkDetailsFragment } from "~/apollo/generated";
import { AnimatePresence } from "framer-motion";

type Props = {
  loading: boolean;
  links: LinkDetailsFragment[];
  fallbackText?: string;
};

const PostList = ({
  links,
  loading,
  fallbackText = "No stories yet. Add new story to get started",
}: Props) => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <AnimatePresence>
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
          [...Array(3).keys()].map(key => <PostSkeletonPreview key={key} />)}
        {links.length === 0 ? (
          <Heading fontSize="md" fontFamily="Lato" alignSelf="start">
            {fallbackText}
          </Heading>
        ) : (
          links && links.map(link => <PostPreview link={link} key={link.id} />)
        )}
      </VStack>
    </AnimatePresence>
  );
};

export default PostList;
