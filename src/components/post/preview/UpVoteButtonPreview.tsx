import {
  Icon,
  Button,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { BiUpArrow } from "react-icons/bi";
import { BsFillCaretUpFill } from "react-icons/bs";
import { useToggleVotePreview } from "~/hooks/useToggleVotePreview";

export default function UpVoteButton({
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
  const toggleVote = useToggleVotePreview(id);

  const onToggleVote = async () => {
    try {
      await toggleVote({ variables: { linkId: id } });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    }
  };
  return (
    <Button
      variant="unstyled"
      onClick={onToggleVote}
      {...props}
      _focus={{ border: "none" }}
    >
      <VStack
        align="center"
        fontSize={{
          base: upvoted ? "sm" : "xs",
          md: upvoted ? "md" : "sm",
        }}
        fontWeight={upvoted && "extrabold"}
        color={useColorModeValue("gray.900", "white")}
      >
        <Icon
          fontSize={{ base: upvoted ? "xl" : "lg", md: upvoted && "2xl" }}
          color="inherit"
          as={upvoted ? BsFillCaretUpFill : BiUpArrow}
          aria-label="Toggle Upvote"
        />
        <span>{count}</span>
      </VStack>
    </Button>
  );
}
