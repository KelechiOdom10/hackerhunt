import { Flex, Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Flex flexDir="column" minH="100vh">
      <NavBar />
      <Box flex="1 0 auto" maxW="6xl" w="100%" mx="auto" py={2} px={4}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
