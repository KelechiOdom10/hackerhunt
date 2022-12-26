import {
  HStack,
  VStack,
  useColorModeValue,
  Flex,
  Badge,
  Icon,
  Text,
} from "@chakra-ui/react";
import { IoMdChatboxes } from "react-icons/io";
import { LinkDetailsFragment } from "~/apollo/generated";
import { ChakraNextImage } from "~/components/utils/CustomImage";
import CustomLink from "~/components/utils/CustomLink";
import { useMe } from "~/hooks/useMe";
import { timeDifferenceForDate } from "~/utils/timeDifference";
import UpVoteButtonPreview from "./UpVoteButtonPreview";
import { motion } from "framer-motion";

type Props = {
  link: LinkDetailsFragment;
};

export default function PostPreview({ link }: Props) {
  const { me } = useMe();
  const MotionFlex = motion(Flex);

  return (
    <MotionFlex
      layout
      animate
      align="center"
      justify="space-between"
      py={1}
      rounded="md"
      w="full"
      transitionDuration="3"
      transitionTimingFunction="ease-in-out"
    >
      <HStack spacing={4}>
        <ChakraNextImage
          src={link.image as string}
          alt={link.title}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          chakraProps={{
            width: { base: "60px", md: "70px" },
            height: { base: "60px", md: "70px" },
            minWidth: "60px",
            borderRadius: "md",
          }}
          style={{ objectFit: "cover" }}
        />
        <VStack align="flex-start" spacing={1}>
          <CustomLink
            variant="primary"
            isExternal
            fontSize="md"
            noOfLines={2}
            fontWeight="bold"
            href={link.url}
          >
            {link.title}
          </CustomLink>
          <CustomLink
            fontSize={{ base: "0.85rem", md: "sm" }}
            underline
            variant="link"
            noOfLines={1}
            fontWeight={500}
            href={`/user/${link.user?.id}`}
            color={useColorModeValue("gray.600", "whiteAlpha.700")}
          >
            by {link.user.username.toLowerCase()} -
            {` ${timeDifferenceForDate(link.createdAt)}`}
          </CustomLink>
          <HStack spacing={4} align="center">
            <CustomLink href={`/posts/${link.id}`} underline>
              <HStack
                fontSize={{ base: "xs", md: "sm" }}
                align="flex-end"
                spacing={1}
                color={useColorModeValue("gray.500", "whiteAlpha.800")}
                mb={-2}
              >
                <Icon
                  w={4}
                  h={4}
                  mr={0.8}
                  as={IoMdChatboxes}
                  aria-label="Toggle Like"
                />
                <Text fontSize="sm">{link.commentCount}</Text>
              </HStack>
            </CustomLink>

            <HStack
              spacing={2}
              align="center"
              justify="space-between"
              pt={1}
              w={{ base: "30%", md: "full" }}
              overflowX="hidden"
              display={{ base: "none", md: "flex" }}
            >
              {link.tags.map(tag => (
                <CustomLink
                  href={`/tags/${tag.name.toLowerCase()}`}
                  key={tag.id}
                >
                  <Badge
                    fontSize="0.7rem"
                    size="sm"
                    p={1}
                    textTransform="lowercase"
                  >
                    {`#${tag.name}`}
                  </Badge>
                </CustomLink>
              ))}
            </HStack>
          </HStack>
        </VStack>
      </HStack>
      <UpVoteButtonPreview
        count={link.voteCount}
        upvoted={link.votes.some(vote => vote.user.id === me?.id)}
        id={link.id}
        h="auto"
      />
    </MotionFlex>
  );
}
