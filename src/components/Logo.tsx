import { Text, TextProps } from "@chakra-ui/react";
import CustomLink from "./utils/CustomLink";

export default function Logo({ ...props }: TextProps) {
  return (
    <CustomLink href="/">
      <Text
        fontFamily="heading"
        fontSize="xl"
        display={{ base: "none", md: "block" }}
        {...props}
      >
        Hacker Hunt
      </Text>
      <Text
        fontFamily="heading"
        fontSize="lg"
        display={{ base: "block", md: "none" }}
        {...props}
      >
        HH
      </Text>
    </CustomLink>
  );
}
