import type { Theme } from "@mui/material/styles";

import { Colors } from "theme/Colors";

const listItemButton: Theme["components"] = {
  MuiListItemButton: {
    styleOverrides: {
      root: {
        "&.Mui-selected": {
          "& .MuiTypography-root": {
            color: Colors.primary[500],
          },
        },
        "&:hover": {
          color: Colors.primary[500],
          backgroundColor: `${Colors.primary[400]}16 !important`,
        },
        height: 36,
      },
    },
  },
};

export default listItemButton;
