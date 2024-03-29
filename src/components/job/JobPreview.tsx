import {
  Flex,
  VStack,
  HStack,
  Heading,
  Icon,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { JobDetailsFragment } from "~/apollo/generated";
import { ChakraNextImage } from "../utils/CustomImage";
import CustomLink from "../utils/CustomLink";

type Props = {
  job: JobDetailsFragment;
};

const JobPreview = ({ job }: Props) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Flex
      as={CustomLink}
      href={`/jobs?id=${job.id}`}
      _hover={{
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      align="center"
      justify="space-between"
      rounded="md"
      w="full"
    >
      <VStack align="flex-start" spacing={0}>
        <HStack align="center">
          <Heading fontFamily="body" fontSize={{ base: "sm", md: "md" }}>
            {job.company?.name}
          </Heading>
          <Icon
            display={isShown ? "inline-block" : "none"}
            fontSize="lg"
            ml={1}
            as={FiArrowRight}
          />
        </HStack>
        <Text
          fontSize="sm"
          color={useColorModeValue("gray.600", "whiteAlpha.800")}
          noOfLines={1}
        >
          {job.name}
        </Text>
        <Text
          fontSize="sm"
          color={useColorModeValue("gray.600", "whiteAlpha.800")}
        >
          {job.location}
        </Text>
      </VStack>
      <ChakraNextImage
        src={job.company?.image ?? "/assets/fallback.jpeg"}
        alt={`${job.name} Image`}
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        chakraProps={{
          minW: { base: "35px", md: "50px" },
          height: { base: "35px", md: "50px" },
          bg: "white",
          borderRadius: "sm",
        }}
        style={{
          objectFit: "contain",
          padding: "4px",
        }}
      />
    </Flex>
  );
};

export default JobPreview;
