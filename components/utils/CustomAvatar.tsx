import { Avatar, useColorModeValue, AvatarProps } from "@chakra-ui/react";
import React from "react";

type Props = {
  name: string;
  src?: string;
};
export default function CustomAvatar({
  name,
  src,
  ...props
}: Props & AvatarProps) {
  return (
    <Avatar
      src={src}
      name={name}
      bg={useColorModeValue("brand.900", "white")}
      color={useColorModeValue("white", "brand.900")}
      fontWeight="extrabold"
      size="sm"
      cursor="pointer"
      {...props}
    />
  );
}
