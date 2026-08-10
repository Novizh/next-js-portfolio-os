import type { Theme } from "@mui/material/styles";

const Card: Theme["components"] = {
  MuiCard: {
    styleOverrides: {
      root: ({ ownerState }) => {
        return {
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          ...(ownerState.variant != "outlined" && {
            border: "1px outset rgba(0, 0, 0, 0.1)",
          }),
        };
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      title: {
        fontSize: 18,
        fontWeight: 600,
      },
      subheader: {
        fontSize: 14,
        marginTop: 10,
      },
    },
  },
};

export default Card;
