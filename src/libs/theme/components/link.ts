import type { Theme } from "@mui/material/styles";

import { Colors } from "theme/Colors";

const link: Theme["components"] = {
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
        color: Colors.secondary[500],
        "&:hover": {
          color: Colors.primary[500],
          textDecoration: "none",
        },
      },
    },
  },
};

export default link;
