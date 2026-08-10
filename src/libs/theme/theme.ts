import { createTheme } from "@mui/material/styles";

import components from "./components";
import colorSchemes from "./colorSchemes";
import typography from "./typography";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    "2xl": true;
    "3xl": true;
  }
}

// A custom theme for this app
const theme = createTheme({
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1400,
      "2xl": 1920,
      "3xl": 2560,
    },
  },
  components: components(),
  typography: typography("Poppins"),
  palette: colorSchemes(),
});

export default theme;
