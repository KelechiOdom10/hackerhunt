import { Button, ButtonProps, useBreakpointValue } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function CustomButton({
  children,
  ...props
}: Props & ButtonProps) {
  const size = useBreakpointValue({ base: "sm", md: "md" });
  return (
    <Button size={size} {...props}>
      {children}
    </Button>
  );
}
