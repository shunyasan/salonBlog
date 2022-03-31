import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "originWhite",
        color: "originBlack",
      },
      th: {
        border: "1px",
        textAlign: "center !important",
        fontSize: "0.6rem",
        backgroundColor: "originLiteGray",
      },
      td: {
        border: "1px",
        textAlign: "center  !important",
        fontSize: "0.6rem",
      },
    },
  },
  fonts: {
    body: "Noto Serif JP, serif",
  },
  colors: {
    transparent: "transparent",
    originWhite: "#f7fafc",
    originBlack: "#111",
    originGray: "#b7b7b7",
    originLiteGray: "#e1e1e1",
    originGold: "#a59968",
  },
  components: {
    Button: {
      baseStyle: {
        color: "originWhite",
        backgroundColor: "originBlack",
        borderRadius: "1px",
        _hover: {
          backgroundColor: "originGray",
        },
        _focus: {
          boxShadow: "none",
          backgroundColor: "originGray",
          outline: "none",
        },
      },
      sizes: {
        lg: {
          fontSize: "lg",
        },
      },
      variants: {
        base: {},
        secBase: {
          color: "originBlack",
          backgroundColor: "originWhite",
          border: "2px",
          borderColor: "originBlack",
        },
        gold: {
          backgroundColor: "originGold",
        },
        parts: {
          color: "originBlack",
          backgroundColor: "originWhite",
          borderBottom: "2px",
          borderColor: "originBlack",
        },
      },
    },
    Select: {
      baseStyle: {
        border: "1px",
        borderColor: "originBlack",
        display: "inline-block",
        // _focus: {
        // 	outlineColor: "originBlack",
        // },
      },
      sizes: {
        sm: {
          w: "10rem",
          fontSize: "0.8rem",
        },
      },
      variants: {
        base: {},
      },
    },
  },
});

export default theme;
