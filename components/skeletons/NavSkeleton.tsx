import { Skeleton, Button } from "@chakra-ui/react";
import React from "react";

export default function NavSkeleton() {
  return (
    <>
      <Skeleton w="80px" rounded="md">
        <Button />
      </Skeleton>
      <Skeleton w="80px" rounded="md">
        <Button />
      </Skeleton>
    </>
  );
}
