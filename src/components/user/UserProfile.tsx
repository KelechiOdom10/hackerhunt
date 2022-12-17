import {
  Box,
  HStack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChakraNextImage } from "../utils/CustomImage";
import { useUserQuery } from "~/apollo/generated/graphql";
import { timeDifferenceForDate } from "~/utils/timeDifference";
import PostList from "../post/PostList";
import UserTab from "./UserTab";
import { useRouter } from "next/router";
import UserCommentList from "./comment/UserCommentList";

type Props = {
  userId: string;
};

const tabs = ["posts", "comments", "votes"];

const UserProfile = ({ userId }: Props) => {
  const { query } = useRouter();
  const { data, loading } = useUserQuery({
    variables: {
      userId,
    },
  });

  return (
    <>
      {data && (
        <Box py={8}>
          <HStack align="center">
            <ChakraNextImage
              src={`https://avatars.dicebear.com/api/open-peeps/${data.user.username}.svg`}
              alt={`Generated avatar for ${data.user.username}`}
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
            <VStack align="flex-start" spacing={0} h="auto">
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="semibold"
                color={useColorModeValue("brand.500", "white")}
              >
                @{data.user.username}
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={useColorModeValue("gray.600", "whiteAlpha.800")}
              >
                {`Joined ${timeDifferenceForDate(data.user.createdAt)}`}
              </Text>
            </VStack>
          </HStack>

          <Tabs
            isLazy
            index={tabs.indexOf((query?.tab as string) || "posts")}
            colorScheme="brand"
            size="md"
            mt={4}
          >
            <TabList>
              <UserTab name="posts">Posts</UserTab>
              <UserTab name="comments">Comments</UserTab>
              <UserTab name="votes">Votes</UserTab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PostList loading={loading} links={data.user.links} />
              </TabPanel>
              <TabPanel>
                <UserCommentList comments={data.user.comments} />
              </TabPanel>
              <TabPanel>
                <PostList
                  loading={loading}
                  links={data.user.votes.map(vote => vote.link)}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
};

export default UserProfile;
