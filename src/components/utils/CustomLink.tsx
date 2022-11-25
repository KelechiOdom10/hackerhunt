import NextLink from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";
import { ReactNode } from "react";
// import { useRouter } from "next/router";

type Props = {
  href: string;
  children: ReactNode;
  underline?: boolean;
};

export default function CustomLink({
  href,
  children,
  underline,
  ...props
}: Props & LinkProps) {
  // const router = useRouter();
  // const isActive = router.pathname === "/";

  return (
    <NextLink href={href} legacyBehavior passHref>
      <Link
        {...props}
        _hover={{
          textDecor: `${underline ? "underline" : "none"}`,
        }}
        _focus={{ border: "none" }}
      >
        {children}
      </Link>
    </NextLink>
  );
}
