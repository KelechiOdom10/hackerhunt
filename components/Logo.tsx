import { Text, Link } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Link href="/">
      <Text
        fontFamily="heading"
        fontSize={{ md: "xl" }}
        display={{ base: "none", md: "block" }}
      >
        Hacker Hunt
      </Text>
      <Text
        fontFamily="heading"
        fontSize={{ base: "lg" }}
        display={{ base: "block", md: "none" }}
      >
        HH
      </Text>
    </Link>
  );
}
