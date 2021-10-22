import {
  Box,
  Flex,
  IconButton,
  Input,
  Stack,
  Collapse,
  Icon,
  VStack,
  useColorModeValue,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { HiMenuAlt2, HiX, HiSearch } from "react-icons/hi";
import { ColorModeSwitcher } from "../utils/ColorModeSwitcher";
import Logo from "../Logo";
import CustomLink from "../utils/CustomLink";
import CustomButton from "../utils/CustomButton";
import { useMe } from "../../hooks/useMe";
import { useLogout } from "../../hooks/useLogout";
import { RegularUserFragment } from "../../apollo/generated/graphql";
import CustomAvatar from "../utils/CustomAvatar";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const { me, loading } = useMe();
  const logout = useLogout();

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
        <Flex ml={{ base: -2 }} mr={1} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <HiX /> : <HiMenuAlt2 />}
            variant="ghost"
            size="sm"
            fontSize="2xl"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Logo />
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align="center"
        >
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {loading ? null : (
          <Stack
            justify="space-around"
            align="center"
            direction="row"
            spacing={{ base: 4, md: 6 }}
          >
            <ColorModeSwitcher mr={-2} />
            {me ? (
              <>
                <CustomLink href="/new">
                  <CustomButton variant="primary">Add New Story</CustomButton>
                </CustomLink>
                <Menu>
                  <CustomAvatar as={MenuButton} name={me?.username} />
                  <MenuList>
                    <MenuGroup title="Profile">
                      <CustomLink href="/profile">
                        <MenuItem
                          as={HStack}
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          <CustomAvatar name={me?.username} />{" "}
                          <span>My Account</span>
                        </MenuItem>
                      </CustomLink>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Help">
                      <CustomLink href="/new">
                        <MenuItem fontSize={{ base: "sm", md: "md" }}>
                          Create Story
                        </MenuItem>
                      </CustomLink>
                      <CustomLink href="/about">
                        <MenuItem fontSize={{ base: "sm", md: "md" }}>
                          About
                        </MenuItem>
                      </CustomLink>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuItem
                      fontSize={{ base: "sm", md: "md" }}
                      onClick={() => logout()}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <CustomLink
                  href="/signin"
                  display={{ base: "none", md: "inline-flex" }}
                >
                  <CustomButton variant="secondary">Sign In</CustomButton>
                </CustomLink>

                <CustomLink href="/signup">
                  <CustomButton variant="primary">Sign Up</CustomButton>
                </CustomLink>
              </>
            )}
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav logout={logout} me={me} />
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
            href={navItem.href}
            fontSize="sm"
            fontWeight={600}
          >
            {navItem.label}
          </CustomLink>
        </Box>
      ))}
      <NavMenuInput />
    </Stack>
  );
};

type Props = {
  me: RegularUserFragment;
  logout: () => Promise<void>;
};

const MobileNav = ({ me, logout }: Props) => {
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
      {me ? (
        <CustomButton w="full" variant="primary" onClick={logout}>
          Logout
        </CustomButton>
      ) : (
        <>
          <CustomLink href="/signin">
            <CustomButton w="full" variant="secondary">
              Sign In
            </CustomButton>
          </CustomLink>

          <CustomLink href="/signin" display="block">
            <CustomButton w="full" variant="primary">
              Sign Up
            </CustomButton>
          </CustomLink>
        </>
      )}
    </VStack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  return (
    <Stack spacing={4}>
      <CustomLink
        py={2}
        href={href}
        underline
        fontSize="sm"
        fontWeight="semibold"
      >
        {label}
      </CustomLink>
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
