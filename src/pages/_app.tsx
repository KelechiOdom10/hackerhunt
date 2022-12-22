import { AppProps } from "next/app";
import { ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import theme from "../utils/theme";
import { useApollo } from "../apollo/client";
import NextNProgress from "nextjs-progressbar";
import Meta from "~/components/layout/Meta";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  const color = useColorModeValue("#0a0a0a", "#FFFFFF");

  return (
    <>
      <Meta />
      <ApolloProvider client={client}>
        <ChakraProvider resetCSS theme={theme}>
          <NextNProgress
            color={color}
            height={4}
            options={{ showSpinner: false }}
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
