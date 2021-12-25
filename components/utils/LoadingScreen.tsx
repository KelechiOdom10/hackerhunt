import { Center, Spinner } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Center minH="100vh">
      <Spinner />
    </Center>
  );
};

export default LoadingScreen;
