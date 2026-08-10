// MUI Imports
import type { Theme } from "@mui/material/styles";

const sliderOverrides: Theme["components"] = {
  MuiSlider: {
    styleOverrides: {
      rail: ({ theme }) => ({
        backgroundColor: theme.palette.text.secondary,
        height: 10,
      }),
      track: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        height: 10,
      }),
    },
  },
};

export default sliderOverrides;
