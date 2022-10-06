import {
  Heading,
  VStack,
  Image,
  useColorModeValue,
  Flex,
  Text,
  Box,
  Icon,
  StackDivider,
  HStack,
} from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import CustomButton from "../utils/CustomButton";
import CustomLink from "../utils/CustomLink";

type Props = {
  job: Job;
};

const JobPost = ({ job }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const addDefaultSrc = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/assets/fallback.jpeg";
  };

  return (
    <Flex
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
            {job.name}
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
        >
          {job.role}
        </Text>
        <Text
          fontSize="sm"
          color={useColorModeValue("gray.600", "whiteAlpha.800")}
        >
          {job.location}
        </Text>
      </VStack>
      <Image
        src={job.image ?? "/assets/fallback.jpeg"}
        onError={addDefaultSrc}
        alt={`${job.name} Image`}
        width={{ base: "35px", md: "50px" }}
        height={{ base: "35px", md: "50px" }}
        borderRadius="md"
        objectFit="cover"
      />
    </Flex>
  );
};

export default function HiringNow() {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box mb={8}>
      <Text
        fontFamily="heading"
        fontSize={{ base: "md", md: "lg" }}
        py={4}
        textAlign="start"
      >
        Hiring Now
      </Text>
      <VStack
        spacing={4}
        bg={bgColor}
        p={6}
        rounded="md"
        divider={<StackDivider />}
        borderWidth={useColorModeValue(1, 0)}
      >
        {jobs.map(job => (
          <JobPost key={job.id} job={job} />
        ))}
        <CustomLink href="/jobs" w="full">
          <CustomButton variant="primary" w="full">
            View all jobs
          </CustomButton>
        </CustomLink>
      </VStack>
    </Box>
  );
}

const jobs: Array<Job> = [
  {
    id: "0",
    name: "HYPER",
    role: "Content Lead",
    location: "San Fransisco",
    image:
      "https://ph-files.imgix.net/931e7d44-41ac-4c20-ac2b-9a9eeb49513b.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=40&h=40&fit=max&dpr=1",
  },
  {
    id: "1",
    name: "Squarespace",
    role: "Senior Software Engineer - Full Stack (Unfold)",
    location: "Dublin",
    image: "https://avatars.githubusercontent.com/squarespace",
  },
  {
    id: "2",
    name: "Twilio",
    role: "Software Engineer",
    location: "India",
    image: "https://avatars.githubusercontent.com/twilio",
  },
];

interface Job {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
}
