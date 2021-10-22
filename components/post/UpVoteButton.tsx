import { Icon, Button, VStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { BiUpArrow } from "react-icons/bi";
import { BsFillCaretUpFill } from "react-icons/bs";

export default function UpVoteButton({
  isFavorited,
  count,
  ...props
}: {
  isFavorited: boolean;
  count: number;
}) {
  return (
    <VStack
      as={Button}
      variant="unstyled"
      align="center"
      fontSize={{
        base: isFavorited ? "sm" : "xs",
        md: isFavorited ? "md" : "sm",
      }}
      fontWeight={isFavorited && "extrabold"}
      color={useColorModeValue("gray.900", "white")}
      {...props}
    >
      <Icon
        fontSize={{ base: isFavorited ? "xl" : "lg", md: isFavorited && "2xl" }}
        color="inherit"
        as={isFavorited ? BsFillCaretUpFill : BiUpArrow}
        aria-label="Toggle Upvote"
      />
      <span>{count}</span>
    </VStack>
  );
}
