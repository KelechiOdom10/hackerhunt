import { Avatar, useColorModeValue, AvatarProps } from "@chakra-ui/react";

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
      bg={useColorModeValue("gray.900", "white")}
      color={useColorModeValue("white", "gray.900")}
      fontWeight="extrabold"
      size="sm"
      cursor="pointer"
      {...props}
    />
  );
}
