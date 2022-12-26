import Head from "next/head";
import { useRouter } from "next/router";
import { MetaSeo } from "~/types";

export const metaDefaults = {
  title: "Hacker Hunt",
  description:
    "Hackernews inspired social news webapp with a modern design reminiscent of hacker culture.",
  image: `${URL}/assets/hacker-hunt.jpeg`,
  feed: `${URL}/search`,
  keywords: [
    "technology",
    "social",
    "social media",
    "news",
    "hackernews",
    "software",
    "web",
    "development",
    "product",
    "product hunt",
    "startup",
  ],
  author: {
    name: "Kelechi Odom",
  },
  social: {
    twitter: "Kelechi_odom",
    github: "KelechiOdom10",
  },
};

const Meta = ({ meta: pageMeta }: { meta?: Partial<MetaSeo> }) => {
  const router = useRouter();
  const URL = "https://hacker-hunt.vercel.app";
  const meta = {
    ...metaDefaults,
    ...pageMeta,
  };

  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta content={meta.keywords.join(", ")} name="keywords" />
      {/** OpenGraph Metadata */}
      <meta property="og:url" content={`${URL}${router.asPath}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Hacker Hunt" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      {/** End OpenGraph Metadata */}
      {/** Twitter Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Kelechi_odom" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {/** End Twitter Metadata */}
    </Head>
  );
};

export default Meta;
