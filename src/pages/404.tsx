import { SimpleGrid, Heading, Button, Text } from "@chakra-ui/react";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/layout/Meta";
import { ChakraNextImage } from "~/components/utils/CustomImage";
import CustomLink from "~/components/utils/CustomLink";

const NotFound = () => {
  return (
    <div>
      <Meta meta={{ title: "Not Found | Hacker Hunt" }} />{" "}
      <Layout>
        <SimpleGrid
          spacing="30px"
          flexDir={{ base: "row", md: "row-reverse" }}
          alignItems="center"
          mt={{ base: 10, md: 15 }}
          columns={{ base: 1, md: 2 }}
        >
          <ChakraNextImage
            src="/assets/404.webp"
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
              Something is not right...
            </Heading>
            <Text size="lg" my={6}>
              Page you are trying to open does not exist. You may have mistyped
              the address, or the page has been moved to another URL. If you
              think this is an error contact support.
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
