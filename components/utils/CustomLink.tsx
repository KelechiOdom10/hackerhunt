import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { ReactChild, ReactNode } from "react";
// import { useRouter } from "next/router";

type Props = {
  href: string;
  children: ReactChild | ReactNode;
  underline?: boolean;
  [x: string]: unknown;
};

export default function CustomLink({
  href,
  children,
  underline,
  ...props
}: Props) {
  // const router = useRouter();
  // const isActive = router.pathname === "/";

  return (
    <NextLink href={href} passHref>
      <Link
        {...props}
        _hover={{
          textDecor: `${underline ? "underline" : "none"}`,
        }}
      >
        {children}
      </Link>
    </NextLink>
  );
}