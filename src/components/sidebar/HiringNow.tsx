import {
  VStack,
  useColorModeValue,
  Text,
  Box,
  StackDivider,
} from "@chakra-ui/react";
import JobPreview from "../job/JobPreview";
import CustomButton from "../utils/CustomButton";
import CustomLink from "../utils/CustomLink";
import { useJobsQuery } from "~/apollo/generated";

export default function HiringNow() {
  const { data } = useJobsQuery({ limit: 4 });
  const bgColor = useColorModeValue("white", "gray.800");
  const borderWidth = useColorModeValue(1, 0);

  return (
    data && (
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
          borderWidth={borderWidth}
        >
          {data.jobs.map(job => (
            <JobPreview key={job.id} job={job} />
          ))}
          <CustomLink href="/jobs" w="full">
            <CustomButton variant="primary" w="full">
              View all jobs
            </CustomButton>
          </CustomLink>
        </VStack>
      </Box>
    )
  );
}
