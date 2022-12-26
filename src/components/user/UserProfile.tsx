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
import { useUserQuery } from "~/apollo/generated";
import { timeDifferenceForDate } from "~/utils/timeDifference";
import PostList from "../post/PostList";
import UserTab from "./UserTab";
import { useRouter } from "next/router";
import UserCommentList from "./comment/UserCommentList";
import { AnimateSharedLayout } from "framer-motion";

type Props = {
  userId: string;
};

const tabs = ["posts", "comments", "votes"];

const UserProfile = ({ userId }: Props) => {
  const { query } = useRouter();
  const { data, isLoading } = useUserQuery({ userId });
  const textColor = useColorModeValue("brand.500", "white");
  const subTextColor = useColorModeValue("gray.600", "whiteAlpha.800");

  return (
    <>
      {data && (
        <Box py={8}>
          <HStack align="center">
            <ChakraNextImage
              src={`https://avatars.dicebear.com/api/open-peeps/${data.user?.username}.svg`}
              alt={`Generated avatar for ${data.user?.username}`}
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
            <VStack align="flex-start" spacing={0} h="auto">
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="semibold"
                color={textColor}
              >
                @{data.user?.username}
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }} color={subTextColor}>
                {`Joined ${timeDifferenceForDate(data.user?.createdAt)}`}
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
            <AnimateSharedLayout>
              <TabList>
                {tabs.map(tab => (
                  <UserTab
                    name={tab}
                    active={tab === (query?.tab || "posts")}
                    key={tab}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </UserTab>
                ))}
              </TabList>
            </AnimateSharedLayout>

            <TabPanels>
              <TabPanel>
                <PostList loading={isLoading} links={data.user?.links || []} />
              </TabPanel>
              <TabPanel>
                <UserCommentList comments={data.user?.comments || []} />
              </TabPanel>
              <TabPanel>
                <PostList
                  loading={isLoading}
                  links={data.user?.votes.map(vote => vote.link)}
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
