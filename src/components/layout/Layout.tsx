import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Flex flexDir="column" minH="100vh">
      <NavBar />
      <Box bg={useColorModeValue("brand.50", "gray.900")}>
        <Box
          as={motion.main}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition="1s ease-in-out .1s"
          flex="1 0 auto"
          maxW="6xl"
          w="100%"
          mx="auto"
          py={2}
          px={4}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
}
