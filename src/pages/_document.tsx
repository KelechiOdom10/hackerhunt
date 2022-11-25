import { ColorModeScript, theme } from "@chakra-ui/react";
import NextDocument, {
  Html,
  Main,
  Head,
  NextScript,
  DocumentContext,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import emotionCache from "~/lib/emotion-cache";

const { extractCritical } = createEmotionServer(emotionCache);

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <style
          key="emotion-css"
          dangerouslySetInnerHTML={{ __html: styles.css }}
          data-emotion-css={styles.ids.join(" ")}
        />,
      ],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bowlby+One&family=Roboto:wght@300;400;500;700&family=Lato:wght@300;400;700;900&family=Poly&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
