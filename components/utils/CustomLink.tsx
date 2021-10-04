import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { ReactChild, ReactNode } from "react";
// import { useRouter } from "next/router";

type Props = {
  href: string;
  children: ReactChild | ReactNode;
  // All other props
  [x: string]: any;
};

export default function CustomLink({ href, children, ...props }: Props) {
  // const router = useRouter();
  // const isActive = router.pathname === "/";

  return (
    <NextLink href={href} passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  );
}
