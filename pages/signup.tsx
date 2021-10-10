import { Flex, Box, useColorModeValue, Image } from "@chakra-ui/react";
import Head from "next/head";
import SignupForm from "../components/forms/SignupForm";
import Logo from "../components/Logo";

export default function SignUp() {
  const textColor = useColorModeValue("white", "brand.800");

  return (
    <div>
      <Head>
        <title>Hacker Hunt</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        h="100vh"
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "brand.800")}
      >
        <Flex
          direction="column"
          px={4}
          align={{ base: "center", md: "start" }}
          w={{ base: "100%", md: "50vw" }}
          bg={useColorModeValue("brand.800", "white")}
          py={4}
        >
          <Logo color={textColor} />
          <Image
            src="https://www.pinclipart.com/picdir/big/420-4206452_think-tech-illustration-clipart.png"
            alignSelf="center"
            justifySelf="center"
            mt="25vh"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
        <Flex
          w={{ base: "100%", md: "50vw" }}
          align={{ base: "start", md: "center" }}
          justify="center"
          bg={useColorModeValue("white", "brand.800")}
        >
          <Box
            w={{ base: "80%", md: "70%" }}
            mx="auto"
            mt={{ base: 10, md: 0 }}
          >
            <SignupForm />
          </Box>
        </Flex>
      </Flex>
    </div>
  );
}
