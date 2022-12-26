import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import theme from "../utils/theme";
import NextNProgress from "nextjs-progressbar";
import Meta from "~/components/layout/Meta";
import { QUERY_OPTIONS_DEFAULT } from "~/config";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: QUERY_OPTIONS_DEFAULT })
  );
  const color = useColorModeValue("#0a0a0a", "#FFFFFF");

  return (
    <>
      <Meta />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider resetCSS theme={theme}>
            <NextNProgress
              color={color}
              height={4}
              options={{ showSpinner: false }}
            />
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
