import { Box, BoxProps } from "@chakra-ui/react";
import NextImage, { ImageProps, ImageLoaderProps } from "next/image";
import { useEffect, useState } from "react";

const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality}`;
};

type Props = ImageProps & {
  chakraProps?: BoxProps;
};

export const ChakraNextImage = ({ chakraProps, ...props }: Props) => {
  const { src, alt, quality, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Box pos="relative" cursor="pointer" className="group" {...chakraProps}>
      <NextImage
        loader={myLoader}
        quality={quality}
        className={loaded ? "onblur" : ""}
        src={imgSrc}
        alt={alt}
        onLoadingComplete={result => {
          setLoaded(true);
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
      <style jsx global>{`
        .onblur {
          animation: onblur 0.8s linear;
        }

        @keyframes onblur {
          from {
            filter: blur(0.6px);
          }
          to {
            filter: blur(0);
          }
        }
      `}</style>
    </Box>
  );
};
