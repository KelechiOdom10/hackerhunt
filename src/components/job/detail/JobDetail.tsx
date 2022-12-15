import {
  Badge,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { JobDetailsFragment } from "~/apollo/generated/graphql";
import { ChakraNextImage } from "~/components/utils/CustomImage";
import JobModal from "../JobModal";

type Props = {
  job: JobDetailsFragment;
};

const JobDetail = ({ job }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack
      spacing={8}
      align="center"
      onClick={onOpen}
      cursor="pointer"
      w="full"
    >
      <ChakraNextImage
        src={job.company.image}
        alt={job.company.name}
        width={100}
        height={100}
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

      <JobModal isOpen={isOpen} onClose={onClose} job={job} />
    </HStack>
  );
};

export default JobDetail;
