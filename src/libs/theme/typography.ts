// MUI Imports
import type { Theme } from "@mui/material/styles";

const typography = (fontFamily: string): Theme["typography"] =>
  ({
    fontFamily:
      typeof fontFamily === "undefined" || fontFamily === ""
        ? [
            '"Public Sans"',
            "sans-serif",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(",")
        : fontFamily,
    fontSize: 13.125,
    h1: {
      fontSize: "46px",
      lineHeight: "52px",
    },
    h2: {
      fontSize: "38px",
      lineHeight: "44px",
    },
    h3: {
      fontSize: "28px",
      lineHeight: "34px",
    },
    h4: {
      fontSize: "24px",
      lineHeight: "30px",
    },
    h5: {
      fontSize: "20px",
      lineHeight: "26px",
    },
    h6: {
      fontSize: "18px",
      lineHeight: "24px",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "20px",
    },
    body2: {
      fontSize: "14px",
      lineHeight: "18px",
    },
    subtitle1: {
      fontSize: "12px",
      lineHeight: "16px",
    },
    subtitle2: {
      fontSize: "10px",
      lineHeight: "14px",
    },
    button: {
      fontSize: "0.9375rem",
      lineHeight: 1.46667,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.8125rem",
      lineHeight: 1.3846154,
      letterSpacing: "0.4px",
    },
    overline: {
      fontSize: "0.75rem",
      lineHeight: 1.16667,
      letterSpacing: "0.8px",
    },
  }) as Theme["typography"];

export default typography;
