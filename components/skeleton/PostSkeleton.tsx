import { HStack, VStack, Skeleton, Flex } from "@chakra-ui/react";

export default function PostSkeleton() {
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
        <VStack align="flex-start" spacing={1}>
          <Skeleton height="15px" />
          <Skeleton height="10px" w="60%" />
          <HStack spacing={4} align="start">
            <Skeleton height="10px" />
            <Skeleton height="10px" />
          </HStack>
        </VStack>
      </HStack>
    </Flex>
  );
}
