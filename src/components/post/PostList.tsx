import {
  VStack,
  StackDivider,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import PostSkeletonPreview from "../skeletons/PostPreviewSkeleton";
import PostPreview from "./preview/PostPreview";
import { Link, LinkDetailsFragment } from "~/apollo/generated/graphql";

type Props = {
  loading: boolean;
  links: LinkDetailsFragment[];
};

const PostList = ({ links, loading }: Props) => {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
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
      {links.length === 0 ? (
        <Heading
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          fontFamily="Lato"
          alignSelf="start"
        >
          No posts yet
        </Heading>
      ) : (
        links.map((link: Link) => <PostPreview link={link} key={link.id} />)
      )}
    </VStack>
  );
};

export default PostList;
