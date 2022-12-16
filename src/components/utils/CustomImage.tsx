import { Box, BoxProps } from "@chakra-ui/react";
import NextImage, { ImageProps, ImageLoaderProps } from "next/image";
import { useEffect, useState } from "react";

const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality}`;
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

type Props = ImageProps & {
  chakraProps?: BoxProps;
};

export const ChakraNextImage = ({ chakraProps, ...props }: Props) => {
  const { src, alt, quality, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Box pos="relative" cursor="pointer" className="group" {...chakraProps}>
      <NextImage
        loader={myLoader}
        quality={quality}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        src={imgSrc}
        alt={alt}
        onLoadingComplete={result => {
          if (result.naturalWidth === 0) {
            // Broken image
            setImgSrc("/assets/fallback.webp");
          }
        }}
        onError={() => {
          setImgSrc("/assets/fallback.webp");
        }}
        {...rest}
      />
    </Box>
  );
};
