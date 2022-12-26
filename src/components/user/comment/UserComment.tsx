import { Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { CommentDetailsFragment } from "~/apollo/generated";
import CustomLink from "~/components/utils/CustomLink";
import { timeDifferenceForDate } from "~/utils/timeDifference";

type Props = {
  comment: CommentDetailsFragment;
};

const UserComment = ({ comment }: Props) => {
  return (
    <VStack align="flex-start" w="full" spacing={4}>
      <VStack align="flex-start" spacing={0}>
        <Text fontSize={{ base: "xs", md: "sm" }}>
          Replied to{" "}
          <CustomLink
            variant="link"
            underline
            href={`/posts/${comment.link.id}`}
            textDecoration="underline"
          >
            {comment.link.title}
          </CustomLink>
        </Text>
        <Text
          fontSize={{ base: "xs", md: "0.8rem" }}
          color={useColorModeValue("gray.600", "whiteAlpha.700")}
        >
          Posted {timeDifferenceForDate(comment.createdAt)}
        </Text>
      </VStack>
      <Text as="i" fontSize={{ base: "sm", md: "md" }} fontWeight="normal">
        {comment.text}
      </Text>
    </VStack>
  );
};

export default UserComment;
