import type { Theme } from "@mui/material/styles";

import { Colors } from "theme/Colors";

const MenuItem: Theme["components"] = {
  MuiMenuItem: {
    styleOverrides: {
      root: {
        backgroundColor: "#fff !important",
        "&:hover": {
          backgroundColor: `${Colors.primary[400]}16 !important`,
          color: Colors.primary[500],
          borderRadius: 4,
        },
      },
    },
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        maxWidth: "40px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
  },
};

export default MenuItem;
