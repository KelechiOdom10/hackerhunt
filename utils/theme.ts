import {
  extendTheme,
  ThemeConfig,
  theme as chakraTheme,
} from "@chakra-ui/react";
import { darken, mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  colors: {
    brand: {
      50: "#fafafa",
      100: "#d2d2d2",
      200: "#a2a2a2",
      300: "#858585",
      400: "#434343",
      500: "#1b1b1b",
      600: "#121212",
      700: "#0d0d0d",
      800: "#0a0a0a",
      900: "#050505",
    },
  },
  fonts: {
    ...chakraTheme.fonts,
    heading: `Bowlby One, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, cursive, sans-serif`,
    body: `Lato, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, serif, sans-serif`,
  },
  styles: {
    global: props => ({
      body: {
        color: mode("gray.800", "white")(props),
        bg: mode("brand.50", "gray.900")(props),
        fontSize: "1em",

        ".deleted": {
          color: "#ff8383 !important",
          fontStyle: "normal !important",
        },
        ".inserted": {
          color: "#b5f4a5 !important",
          fontStyle: "normal !important",
        },
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
      },
      html: {
        scrollBehavior: "smooth",
      },
    }),
  },
  components: {
    Link: {
      baseStyle: props => ({
        color: mode("gray.800", "white")(props),
      }),
      variants: {
        primary: {
          _hover: {
            textDecoration: "none",
          },
        },
      },
    },
    Text: {
      baseStyle: props => ({
        color: mode("gray.900", "white")(props),
      }),
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        primary: props => ({
          color: mode("white", "gray.800")(props),
          bg: mode("gray.900", "white")(props),
          fontSize: ["xs", "sm", "md", "md"],
          _disabled: {
            color: mode("white", "brand.900")(props),
            bg: mode("gray.700", "blackalpha.300")(props),
          },
          _hover: {
            _disabled: {
              color: mode("white", "brand.900")(props),
              bg: mode("gray.700", "blackalpha.300")(props),
            },
          },
        }),
        secondary: props => ({
          color: mode("gray.800", "white")(props),
          fontSize: ["xs", "sm", "md", "md"],
          bg: "transparent",
          borderWidth: 3,
          borderColor: mode("gray.900", "white")(props),
        }),
      },
    },
    Icon: {
      baseStyle: props => ({
        color: mode("gray.900", "white")(props),
      }),
    },
    Input: {
      variants: {
        primary: props => ({
          field: {
            fontWeight: "bold",
            color: mode("gray.900", "gray.50")(props),
            bg: mode(darken("brand.50", 4), "gray.700")(props),
            _placeholder: {
              color: mode("gray.500", "gray.400")(props),
              fontSize: "0.8rem",
              fontWeight: "normal",
            },
            _focus: {
              boxShadow: `0px 0px 1px 1px ${
                props.colorMode === "dark" ? "#fff" : "#0a0a0a"
              }`,
            },
            _hover: {
              borderColor: mode("gray.900", "white")(props),
            },
            _invalid: {
              borderColor: `#FF0000`,
              boxShadow: "none",
            },
          },
        }),
      },
    },
  },
  config,
});

export default theme;
