import { Button, ButtonProps, useBreakpointValue } from "@chakra-ui/react";
import React, { ReactChild, ReactNode } from "react";

type Props = {
  children: ReactNode | ReactChild;
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
