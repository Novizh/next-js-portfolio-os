import type { Theme } from "@mui/material/styles";

const TextField: Theme["components"] = {
  MuiTextField: {
    styleOverrides: {
      root: ({ ownerState }) => {
        const multiline = Boolean(ownerState.multiline);

        return {
          "& .MuiInputBase-root": multiline
            ? {
                alignItems: "flex-start",
                height: "auto",
                minHeight: ownerState.size === "small" ? 32 : 38,
              }
            : {
                height: 38,
                ...(ownerState.size === "small" && {
                  height: 32,
                }),
              },
        };
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ ownerState }) => {
        if (ownerState.multiline) {
          return {
            alignItems: "flex-start",
            height: "auto",
            minHeight: ownerState.size === "small" ? 30 : 38,
            ...(ownerState.size === "small" && { fontSize: 12 }),
            ...(ownerState.size === "medium" && { fontSize: 14 }),
          };
        }

        return {
          height: 38,
          ...(ownerState.size === "small" && {
            height: 30,
            fontSize: 12,
          }),
          ...(ownerState.size === "medium" && {
            height: 38,
            fontSize: 14,
          }),
        };
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        border: "1px solid #c5c4c3",
        "&:before": {
          borderBottom: "none !important",
        },
        "&:after": {
          borderBottom: "none !important",
        },
        "&:hover:not(.Mui-disabled, .Mui-error):before": {
          borderBottom: "none !important",
        },
        input: {
          paddingBottom: "25px",
        },
      },
    },
  },
};

export default TextField;
