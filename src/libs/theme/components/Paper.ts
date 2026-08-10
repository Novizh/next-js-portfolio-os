import type { Theme } from "@mui/material/styles";

import { Colors } from "theme/Colors";

const paper: Theme["components"] = {
  MuiPaper: {
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        if (ownerState.variant == "outlined") {
          return {
            backgroundImage: "none",
            border: `1px solid ${Colors.extra.divider}`,
          };
        }
        if (ownerState.elevation) {
          return {
            boxShadow: theme.shadows[ownerState.elevation],
            borderRadius: "8px",
          };
        }

        return {};
      },
    },
  },
};

export default paper;
