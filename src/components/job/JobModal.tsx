import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  VStack,
  Text,
  Icon,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiExternalLink } from "react-icons/hi";
import { JobDetailsFragment } from "~/apollo/generated/graphql";
import { timeDifferenceForDate } from "~/utils/timeDifference";
import { ChakraNextImage } from "../utils/CustomImage";
import CustomLink from "../utils/CustomLink";

type Props = {
  job: JobDetailsFragment;
  isOpen: boolean;
  onClose: () => void;
};

const JobModal = ({ isOpen, onClose, job }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{job.company.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack justify="space-between">
            <VStack align="start" spacing={0}>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                w="90%"
                color={useColorModeValue("brand.700", "white")}
              >
                {job.name}{" "}
                <span>
                  <CustomLink
                    mt={2}
                    ml={1}
                    variant="link"
                    isExternal
                    href={job.landingPage}
                  >
                    <Icon as={HiExternalLink} fontSize="sm" />
                  </CustomLink>
                </span>
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={useColorModeValue("gray.600", "whiteAlpha.800")}
              >
                {timeDifferenceForDate(job.publicationDate)}
              </Text>
            </VStack>
            <ChakraNextImage
              src={job.company.image ?? "/assets/fallback.jpeg"}
              alt={`${job.name} Image`}
              width={100}
              height={100}
              chakraProps={{
                maxW: { base: "70px", md: "90px" },
                minH: { base: "70px", md: "90px" },
                display: "flex",
                bg: "white",
                borderRadius: "sm",
              }}
              style={{
                objectFit: "contain",
                padding: "4px",
              }}
            />
          </HStack>
          <Divider my={6} />
          <div
            dangerouslySetInnerHTML={{ __html: job.description }}
            style={{ padding: "4px" }}
          />
        </ModalBody>

        <ModalFooter borderTopWidth={1}>
          <CustomLink href={job.landingPage} isExternal>
            <Button variant="primary">Apply for this position</Button>
          </CustomLink>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JobModal;
