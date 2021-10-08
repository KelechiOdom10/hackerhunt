import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";
import { HiSun } from "react-icons/hi";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const color = useColorModeValue("brand.900", "white");
  const SwitchIcon = useColorModeValue(FaMoon, HiSun);

  return (
    <IconButton
      size="sm"
      variant="ghost"
      color={color}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
