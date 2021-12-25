import {
  Box,
  VStack,
  HStack,
  Image,
  Text,
  useColorModeValue,
  AspectRatio,
  Textarea,
  Button,
  StackDivider,
} from "@chakra-ui/react";
import React from "react";
import { useLinkQuery } from "../../../apollo/generated/graphql";
import { useMe } from "../../../hooks/useMe";
import AddCommentSkeleton from "../../skeletons/AddCommentSkeleton";
import CustomLink from "../../utils/CustomLink";
import UpVoteButtonDetail from "./UpVoteButtonDetail";

export default function PostDetail({ id }: { id: string }) {
  const { me, loading } = useMe();
  const { data } = useLinkQuery({ variables: { linkId: id } });
  const { link } = data;
  return (
    <Box maxW="xl" mx="auto" my={4}>
      {data && (
        <VStack spacing={4} divider={<StackDivider />}>
          <>
            <CustomLink
              variant="primary"
              isExternal
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              href={link.url}
              alignSelf="flex-start"
            >
              {link.title}
            </CustomLink>
            <AspectRatio maxW="xl" width="100%" ratio={6 / 3}>
              <Image
                src={link.image}
                fallbackSrc="/assets/fallback.jpeg"
                alt={link.title}
                height=""
                borderRadius="md"
                objectFit="cover"
              />
            </AspectRatio>

            <HStack
              pt={4}
              spacing={2}
              align="center"
              justify="space-between"
              w="100%"
            >
              <HStack align="flex-end">
                <CustomLink
                  fontSize={{ base: "md", md: "lg" }}
                  underline
                  variant="link"
                  isTruncated
                  fontWeight={500}
                  href={`/${link.user?.id}`}
                >
                  By {link.user.username.toLowerCase()}
                </CustomLink>
                <Text
                  fontSize={{ base: "0.7rem", md: "xs" }}
                  color={useColorModeValue("gray.600", "whiteAlpha.700")}
                >
                  - {new Date(link.createdAt).toLocaleString()}
                </Text>
              </HStack>
              <UpVoteButtonDetail
                count={link.voteCount}
                upvoted={link.votes.some(vote => vote.user.id === me?.id)}
                id={link.id}
              />
            </HStack>
          </>
          {link.description && (
            <>
              <Text alignSelf="flex-start">{link.description}</Text>
            </>
          )}
          {me ? (
            <VStack w="full" spacing={4}>
              <Textarea
                variant="primary"
                resize="none"
                height="100px"
                placeholder={`Say something nice to ${me?.username}...`}
              />
              <Button variant="primary" alignSelf="flex-start">
                Add comment
              </Button>
            </VStack>
          ) : loading ? (
            <AddCommentSkeleton />
          ) : (
            <CustomLink href="/signin" alignSelf="flex-start">
              <Button variant="primary">Login to Comment</Button>
            </CustomLink>
          )}
          <>
            {data.link.comments.length === 0 ? (
              <Text alignSelf="flex-start" fontWeight="bold">
                No Comments. Post comment to get started!
              </Text>
            ) : (
              data.link.comments.map(comment => <p>{comment.id}</p>)
            )}
          </>
        </VStack>
      )}
    </Box>
  );
}
