import { Skeleton, Button, Stack } from "@chakra-ui/react";

export default function NavSkeleton() {
  return (
    <Stack
      justify="space-around"
      align="center"
      direction="row"
      spacing={{ base: 4, md: 6 }}
    >
      <Skeleton w="80px" rounded="md">
        <Button />
      </Skeleton>
      <Skeleton w="80px" rounded="md">
        <Button />
      </Skeleton>
    </Stack>
  );
}
