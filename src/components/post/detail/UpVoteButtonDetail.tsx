import {
  Icon,
  Button,
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { BiUpArrow } from "react-icons/bi";
import { BsFillCaretUpFill } from "react-icons/bs";
import { useToggleVoteDetail } from "~/hooks/useToggleVoteDetail";

export default function UpVoteButtonDetail({
  id,
  upvoted,
  count,
  ...props
}: {
  id: string;
  upvoted: boolean;
  count: number;
}) {
  const toast = useToast();
  const toggleVote = useToggleVoteDetail();

  const onToggleVote = async () => {
    toggleVote({ linkId: id });
  };

  return (
    <Button
      variant="unstyled"
      onClick={onToggleVote}
      {...props}
      _focus={{ border: "none" }}
    >
      <HStack
        align="flex-start"
        fontSize={{
          base: upvoted ? "md" : "sm",
          md: upvoted ? "md" : "sm",
        }}
        {...(upvoted && { fontWeight: "bold" })}
        color={useColorModeValue("gray.900", "white")}
      >
        <span>{count}</span>
        <Icon
          fontSize={{ base: upvoted ? "xl" : "lg", md: upvoted ? "2xl" : "md" }}
          color="inherit"
          as={upvoted ? BsFillCaretUpFill : BiUpArrow}
          aria-label="Toggle Upvote"
        />
      </HStack>
    </Button>
  );
}
