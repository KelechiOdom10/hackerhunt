import {
  Box,
  Flex,
  IconButton,
  Input,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  VStack,
  useColorModeValue,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { HiMenuAlt2, HiX, HiSearch } from "react-icons/hi";
import { ColorModeSwitcher } from "../utils/ColorModeSwitcher";
import Logo from "../Logo";
import CustomLink from "../utils/CustomLink";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      as="nav"
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex={4}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex
        minH="60px"
        maxW="6xl"
        mx="auto"
        py={2}
        px={4}
        justify="space-between"
        align="center"
      >
        <Flex ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <HiX /> : <HiMenuAlt2 />}
            variant="ghost"
            size="md"
            fontSize="2xl"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align="center"
        >
          <Logo />

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          justify="space-around"
          align="center"
          direction="row"
          spacing={{ base: 4, md: 6 }}
        >
          <ColorModeSwitcher mr={-2} />
          <Button as={CustomLink} fontSize="sm" variant="secondary" href="#">
            Sign In
          </Button>
          <Button
            as={CustomLink}
            display={{ base: "none", md: "inline-flex" }}
            fontSize="sm"
            variant="primary"
            href="#"
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction="row" spacing={3} align="center">
      {navItems.map(navItem => (
        <Box key={navItem.label}>
          <CustomLink
            underline
            p={2}
            href={navItem.href ?? "#"}
            fontSize="sm"
            fontWeight={500}
          >
            {navItem.label}
          </CustomLink>
        </Box>
      ))}
      <NavMenuInput />
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <VStack
      bg={useColorModeValue("white", "gray.800")}
      spacing={2}
      minH="100vh"
      position="fixed"
      top="60px"
      left={0}
      width="100%"
      p={4}
      display={{ md: "none" }}
    >
      <NavMenuInput />
      {navItems.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Button
        as={CustomLink}
        fontSize="sm"
        variant="secondary"
        href="#"
        w="full"
      >
        Sign In
      </Button>
      <Button as={CustomLink} fontSize="sm" variant="primary" w="full" href="#">
        Sign Up
      </Button>
    </VStack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  return (
    <Stack spacing={4}>
      <Link py={2} href={href} align="center" fontSize="sm">
        {label}
      </Link>
    </Stack>
  );
};

const NavMenuInput = () => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" mt={-1}>
        <Icon as={HiSearch} color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        size="sm"
        placeholder="Search Hacker Hunt..."
        variant="primary"
      />
    </InputGroup>
  );
};

interface NavItem {
  label: string;
  href: string;
}

const navItems: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Jobs",
    href: "/jobs",
  },
];