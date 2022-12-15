import {
  VStack,
  StackDivider,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { useJobsQuery } from "~/apollo/generated/graphql";
import JobDetail from "./detail/JobDetail";

const JobList = () => {
  const { data } = useJobsQuery();
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <VStack spacing={4} align="start" w="full" mb={8} pt={8}>
      <Heading fontSize={{ base: "lg", md: "xl" }} textAlign="start">
        Jobs
      </Heading>
      <VStack
        spacing={3}
        bg={bgColor}
        w="full"
        align="flex-start"
        rounded="md"
        p={4}
        divider={<StackDivider />}
        borderWidth={useColorModeValue(1, 0)}
      >
        {/* {loading &&
          [...Array(5).keys()].map(key => <PostSkeletonPreview key={key} />)} */}
        {data && data.jobs.length === 0 ? (
          <Heading
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            fontFamily="Lato"
            alignSelf="start"
          >
            No Jobs yet
          </Heading>
        ) : (
          data.jobs.map(job => <JobDetail job={job} key={job.id} />)
        )}
      </VStack>
    </VStack>
  );
};

export default JobList;
