import { ButtonProps, chakra, Flex, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PAGE_SIZE } from "~/config";
import CustomLink from "./CustomLink";

type PagButtonProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
};

const PagButton = ({
  children,
  disabled,
  active,
  ...props
}: PagButtonProps & ButtonProps) => {
  const activeStyle = {
    bg: "brand.600",
    _dark: {
      bg: "white",
      color: "brand.600",
    },
    color: "white",
  };

  return (
    <chakra.button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg="white"
      color="gray.700"
      borderWidth={useColorModeValue(1, 0)}
      _dark={{
        color: "white",
        bg: "gray.800",
      }}
      _hover={activeStyle}
      opacity={disabled && 0.6}
      cursor={disabled && "not-allowed"}
      {...(active && activeStyle)}
      {...props}
    >
      {children}
    </chakra.button>
  );
};

type PaginationProps = {
  totalPosts: number;
  currentPage: number;
};

const Pagination = (props: PaginationProps) => {
  const { query, pathname, push } = useRouter();
  const { totalPosts, currentPage } = props;
  const length = Math.ceil(totalPosts / PAGE_SIZE);
  const pages = Array.from({ length }, (_, index) => index + 1);

  return (
    <Flex py={8} w="full" alignItems="center" justifyContent="center">
      <Flex>
        <PagButton
          disabled={currentPage === 1}
          onClick={() =>
            !(currentPage === 1) &&
            push({ pathname, query: { ...query, page: currentPage - 1 } })
          }
        >
          previous
        </PagButton>
        {pages.map(page => (
          <CustomLink
            key={page}
            href={{
              pathname,
              query: { ...query, page },
            }}
          >
            <PagButton active={page === currentPage}>{page}</PagButton>
          </CustomLink>
        ))}
        <PagButton
          disabled={currentPage === length}
          onClick={() =>
            !(currentPage === length) &&
            push({ pathname, query: { ...query, page: currentPage + 1 } })
          }
        >
          Next
        </PagButton>
      </Flex>
    </Flex>
  );
};

export default Pagination;
