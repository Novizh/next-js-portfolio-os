import { Colors } from "./Colors";

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
    tertiary: Palette["primary"];
  }
  interface PaletteOptions {
    white?: PaletteOptions["primary"];
    tertiary?: PaletteOptions["primary"];
  }
}

const colorSchemes = () => {
  return {
    primary: {
      light: Colors.primary[400],
      main: Colors.primary[500],
      dark: Colors.primary[600],
    },
    secondary: {
      light: Colors.secondary[400],
      main: Colors.secondary[500],
      dark: Colors.secondary[600],
      lighter: `${Colors.secondary[400]}08`,
    },
    error: {
      light: Colors.error[400],
      main: Colors.error[500],
      dark: Colors.error[600],
    },
    warning: {
      light: Colors.warning[400],
      main: Colors.warning[500],
      dark: Colors.warning[600],
    },
    success: {
      light: Colors.success[400],
      main: Colors.success[500],
      dark: Colors.success[600],
    },
    text: {
      disabled: Colors.grey[400],
      secondary: Colors.grey[700],
      primary: Colors.grey[900],
    },
    background: {
      default: Colors.custom.body.bg,
      paper: Colors.custom.paper.bg,
    },
    action: {
      active: Colors.grey[600],
      hover: Colors.extra.action.hover,
      selected: Colors.extra.action.selected,
      disabled: Colors.grey[300],
      disabledBackground: Colors.extra.disabled.bg,
      focus: Colors.grey[100],
    },
  };
};

export default colorSchemes;
