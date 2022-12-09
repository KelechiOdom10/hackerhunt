import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { Link, LinkProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  href: NextLinkProps["href"];
  children: ReactNode;
  underline?: boolean;
}

export default function CustomLink({
  href,
  children,
  underline,
  ...props
}: Props & Omit<LinkProps, "href">) {
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
