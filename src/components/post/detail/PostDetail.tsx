import {
  Box,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  AspectRatio,
  StackDivider,
} from "@chakra-ui/react";
import { useLinkQuery } from "~/apollo/generated/graphql";
import { ChakraNextImage } from "~/components/utils/CustomImage";
import CustomLink from "~/components/utils/CustomLink";
import { useMe } from "~/hooks/useMe";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import UpVoteButtonDetail from "./UpVoteButtonDetail";

export default function PostDetail({ id }: { id: string }) {
  const { me } = useMe();
  const { data } = useLinkQuery({ variables: { linkId: id } });
  const subTextColor = useColorModeValue("gray.600", "whiteAlpha.700");
  return (
    <Box maxW="xl" mx="auto" my={4}>
      {data && (
        <VStack spacing={4} divider={<StackDivider />}>
          <>
            <CustomLink
              variant="primary"
              isExternal
              fontSize={{ base: "xl", md: "2xl" }}
              mb={4}
              fontWeight="bold"
              href={data.link.url}
              alignSelf="flex-start"
            >
              {data.link.title}
            </CustomLink>
            <AspectRatio maxW="xl" width="100%" ratio={6 / 3}>
              <ChakraNextImage
                src={data.link.image as string}
                width={600}
                height={300}
                alt={data.link.title}
                chakraProps={{
                  borderRadius: "sm",
                }}
                style={{ objectFit: "cover" }}
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
                  noOfLines={1}
                  fontWeight={500}
                  href={`/user/${data.link.user?.id}`}
                >
                  By {data.link.user.username.toLowerCase()}
                </CustomLink>
                <Text fontSize={{ base: "xs", md: "sm" }} color={subTextColor}>
                  - {new Date(data.link.createdAt).toLocaleString()}
                </Text>
              </HStack>
              <UpVoteButtonDetail
                count={data.link.voteCount}
                upvoted={data.link.votes.some(vote => vote.user.id === me?.id)}
                id={data.link.id}
              />
            </HStack>
          </>
          {data.link.description && (
            <>
              <Text alignSelf="flex-start">{data.link.description}</Text>
            </>
          )}
          <CommentForm linkId={id} />
          <VStack spacing={8} align="stretch" w="full">
            {data.link.comments.length === 0 ? (
              <Text alignSelf="flex-start" fontWeight="bold">
                No Comments. Post comment to get started!
              </Text>
            ) : (
              data.link.comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))
            )}
          </VStack>
        </VStack>
      )}
    </Box>
  );
}
