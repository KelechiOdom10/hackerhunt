import { useColorModeValue, Flex, Box } from "@chakra-ui/react";
import SignupForm from "~/components/forms/SignupForm";
import Logo from "~/components/Logo";
import Meta from "~/components/layout/Meta";
import { ChakraNextImage } from "~/components/utils/CustomImage";
import withoutAuth from "~/hoc/withoutAuth";

export default withoutAuth(function SignUp() {
  const textColor = useColorModeValue("white", "brand.800");

  return (
    <div>
      <Meta
        meta={{
          title: "Get Started with Hacker Hunt",
        }}
      />
      <Flex
        h="100vh"
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
      >
        <Flex
          direction="column"
          px={4}
          align={{ base: "center", md: "start" }}
          w={{ base: "100%", md: "50vw" }}
          bg={useColorModeValue("gray.900", "white")}
          py={4}
        >
          <Logo color={textColor} />
          <ChakraNextImage
            src="https://www.pinclipart.com/picdir/big/420-4206452_think-tech-illustration-clipart.png"
            width={800}
            height={800}
            placeholder="empty"
            chakraProps={{
              alignSelf: "center",
              justifySelf: "center",
              mt: "25vh",
              display: { base: "none", md: "block" },
            }}
            alt="Tech illustration"
          />
        </Flex>
        <Flex
          w={{ base: "100%", md: "50vw" }}
          align={{ base: "start", md: "center" }}
          justify="center"
          bg={useColorModeValue("white", "gray.900")}
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
});
