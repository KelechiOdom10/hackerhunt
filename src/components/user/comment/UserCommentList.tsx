import { CommentDetailsFragment } from "~/apollo/generated";
import UserComment from "./UserComment";
import {
  Heading,
  StackDivider,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {
  comments: CommentDetailsFragment[];
};

const UserCommentList = ({ comments }: Props) => {
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
      {comments.length === 0 ? (
        <Heading fontSize="md" fontFamily="Lato" alignSelf="start">
          No comments yet
        </Heading>
      ) : (
        comments.map(comment => (
          <UserComment comment={comment} key={comment.id} />
        ))
      )}
    </VStack>
  );
};

export default UserCommentList;
