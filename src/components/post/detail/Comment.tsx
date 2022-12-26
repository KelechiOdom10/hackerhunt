import {
  Avatar,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { CommentDetailsFragment } from "~/apollo/generated";
import { timeDifferenceForDate } from "~/utils/timeDifference";

type Props = {
  comment: CommentDetailsFragment;
};

function Comment({ comment }: Props) {
  return (
    <VStack align="stretch">
      <HStack spacing={2}>
        <Avatar size="sm" name={comment.user.username} />
        <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold">
          {comment.user.username} ∙
        </Text>
        <Text
          fontSize={{ base: "0.8rem", md: "sm" }}
          color={useColorModeValue("gray.600", "whiteAlpha.700")}
        >
          {timeDifferenceForDate(comment.createdAt)}
        </Text>
      </HStack>
      <Text fontSize={{ base: "sm", md: "md" }}>{comment.text}</Text>
    </VStack>
  );
}

export default Comment;
