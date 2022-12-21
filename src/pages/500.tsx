/* eslint-disable react/no-unescaped-entities */
import { SimpleGrid, Heading, Button, Text } from "@chakra-ui/react";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import { ChakraNextImage } from "~/components/utils/CustomImage";
import CustomLink from "~/components/utils/CustomLink";

const NotFound = () => {
  return (
    <div>
      <Meta meta={{ title: "Server Error | Hacker Hunt" }} />{" "}
      <Layout>
        <SimpleGrid
          spacing="30px"
          flexDir={{ base: "row", md: "row-reverse" }}
          alignItems="center"
          mt={{ base: 10, md: 15 }}
          columns={{ base: 1, md: 2 }}
        >
          <ChakraNextImage
            src="/assets/500.png"
            width={900}
            height={900}
            chakraProps={{
              width: "full",
              height: "full",
            }}
            alt="404 Image"
          />
          <div>
            <Heading
              mt={{ base: 0, md: "4rem" }}
              fontSize={{ base: "3xl", md: "4xl" }}
            >
              Internal Server Error
            </Heading>
            <Text size="lg" my={6}>
              We're sorry, but something went wrong on our end while processing
              your request. We've been alerted of the issue and are working to
              resolve it as quickly as possible.
              <br />
              We apologize for the inconvenience and appreciate your patience.
              If you continue to experience problems, please try again later or
              contact us for assistance.
            </Text>
            <CustomLink variant="default" href="/" size="md" mt="xl">
              <Button variant="primary">Get back to home page</Button>
            </CustomLink>
          </div>
        </SimpleGrid>
      </Layout>
    </div>
  );
};

export default NotFound;
