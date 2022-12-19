import { Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import { ChakraNextImage } from "~/components/utils/CustomImage";
import CustomLink from "~/components/utils/CustomLink";

const ServerError = () => {
  return (
    <>
      <Meta meta={{ title: "Server Error | Hacker Hunt" }} />
      <Layout>
        <SimpleGrid
          spacing={80}
          flexDir={{ base: "row", md: "row-reverse" }}
          columns={{ base: 1, md: 2 }}
        >
          <ChakraNextImage
            src="/assets/404.webp"
            width={100}
            height={100}
            chakraProps={
              {
                // display: {base:"block", md:"none"}
              }
            }
            alt="404 Image"
          />
          <div>
            <Heading>Something is not right...</Heading>
            <Text size="lg" my={12}>
              Page you are trying to open does not exist. You may have mistyped
              the address, or the page has been moved to another URL. If you
              think this is an error contact support.
            </Text>
            <CustomLink variant="default" href="/" size="md" mt="xl">
              <Button variant="primary">Get back to home page</Button>
            </CustomLink>
          </div>
          {/* <Image
            src="/assets/404.webp"
            className={classes.desktopImage}
            alt="404 Image"
          /> */}
        </SimpleGrid>
      </Layout>
    </>
  );
};

export default ServerError;
