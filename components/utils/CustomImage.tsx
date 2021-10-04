import Image from "next/image";
import { chakra, Box } from "@chakra-ui/react";

const ChakraNextImage = chakra(Image, {
  baseStyle: { maxH: 200, maxW: 200 },
  shouldForwardProp: prop =>
    [
      "width",
      "height",
      "src",
      "alt",
      "priority",
      "placeholder",
      "objectFit",
      "objectPosition",
      "loading",
      "layout",
      "blurDataURL",
      "title",
    ].includes(prop),
});

type Props = {
  src: string;
  alt: string;
  [x: string]: unknown;
};

export const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality}`;
};

export default function CustomImage(props: Props) {
  const { src, alt, ...rest } = props;

  return (
    <Box pos="relative" cursor="pointer" {...rest}>
      <ChakraNextImage
        loader={myLoader}
        placeholder="blur"
        src={src}
        alt={alt}
        quality={50}
        layout="fill"
        objectFit="cover"
        borderRadius="md"
      />
    </Box>
  );
}
