import { HStack, VStack, Skeleton, Flex } from "@chakra-ui/react";

export default function PostSkeletonPreview() {
  return (
    <Flex
      align="center"
      justify="space-between"
      px={4}
      py={2}
      rounded="md"
      w="100%"
    >
      <HStack spacing={4}>
        <Skeleton
          width={{ base: "65px", md: "85px" }}
          height={{ base: "65px", md: "85px" }}
          borderRadius="md"
        />
        <VStack align="flex-start" spacing={4}>
          <Skeleton height="15px" w="120px" />
          <Skeleton height="10px" w="60%" />
          <HStack spacing={4} align="start">
            <Skeleton height="15px" w="15px" />
            <HStack>
              <Skeleton height="15px" w="30px" />
              <Skeleton height="15px" w="30px" />
              <Skeleton height="15px" w="30px" />
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Flex>
  );
}
