import {
  Badge,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { JobDetailsFragment } from "~/apollo/generated/graphql";
import { ChakraNextImage } from "~/components/utils/CustomImage";
import JobModal from "../JobModal";
import Meta from "~/components/layout/Meta";
import CustomLink from "~/components/utils/CustomLink";

type Props = {
  job: JobDetailsFragment;
};

const JobDetail = ({ job }: Props) => {
  const router = useRouter();

  const onModalClose = () => {
    router.query?.id &&
      router.replace(router.pathname, undefined, { shallow: true });
  };

  return (
    <HStack
      as={CustomLink}
      href={`/jobs?id=${job.id}`}
      _hover={{
        cursor: "pointer",
      }}
      spacing={8}
      align="center"
      cursor="pointer"
      w="full"
    >
      <Meta
        meta={{
          title: router.query.id
            ? `${job.name} - ${job.company.name} | Hacker Hunt`
            : "Job Board | Hacker Hunt",
          image: router.query.id
            ? job.company.image
            : "https://hackerhunt-livid.vercel.app/assets/hacker-hunt.jpeg",
        }}
      />
      <ChakraNextImage
        src={job.company.image}
        alt={job.company.name}
        width={100}
        height={100}
        placeholder="empty"
        chakraProps={{
          borderRadius: "sm",
          display: "flex",
          bg: "white",
          maxW: { base: "70px", md: "100px" },
          minH: { base: "70px", md: "100px" },
        }}
        style={{ objectFit: "contain", padding: "8px" }}
      />
      <VStack align="flex-start">
        <Heading
          fontFamily="body"
          fontWeight={800}
          cursor="pointer"
          fontSize={{ base: "md", md: "lg" }}
        >
          {job.company.name}
        </Heading>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="semibold"
          color={useColorModeValue("brand.500", "white")}
        >
          {job.name}
        </Text>
        <Text
          fontSize={{ base: "sm", md: "0.9rem" }}
          color={useColorModeValue("gray.600", "whiteAlpha.800")}
        >
          {job.location}
        </Text>
        {job.categories.map(category => (
          <Badge
            key={category}
            fontSize="0.7rem"
            size="sm"
            p={1}
            textTransform="lowercase"
          >
            {`${category}`}
          </Badge>
        ))}
      </VStack>

      <JobModal
        isOpen={router.query?.id === job.id}
        onClose={onModalClose}
        job={job}
      />
    </HStack>
  );
};

export default JobDetail;
