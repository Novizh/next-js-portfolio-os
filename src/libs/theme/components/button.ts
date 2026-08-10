import type { Theme } from "@mui/material/styles";

import { Colors } from "theme/Colors";

// Add new color here
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    white: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    tonal: true;
  }
}

const button: Theme["components"] = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: false,
    },
  },

  MuiButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        const buttonColor =
          ownerState.color === "secondary"
            ? theme.palette.secondary.main
            : ownerState.color === "primary"
              ? theme.palette.primary.main
              : ownerState.color === "success"
                ? theme.palette.success.main
                : ownerState.color === "warning"
                  ? theme.palette.warning.main
                  : ownerState.color === "error"
                    ? theme.palette.error.main
                    : theme.palette.grey[500];

        return {
          transform: "scale(1.001)",
          transition: theme.transitions.create("all", {
            duration: theme.transitions.duration.short,
          }),

          "&:not(.Mui-disabled):active": {
            transform: "scale(0.98)",
          },

          "& .MuiLoadingButton-loadingIndicator": {
            color:
              ownerState.variant === "outlined" || ownerState.variant === "text"
                ? buttonColor
                : "white",
          },

          // =========================
          // DISABLED STATE
          // =========================
          "&.Mui-disabled": {
            opacity: 0.5,

            ...(ownerState.variant === "contained" && {
              backgroundColor: buttonColor,
              color: "white",
            }),

            ...(ownerState.variant === "outlined" && {
              backgroundColor: "transparent",
              borderColor: theme.palette.action.disabled,
              color: theme.palette.action.disabled,
            }),

            ...(ownerState.variant === "text" && {
              backgroundColor: "transparent",
              color: theme.palette.action.disabled,
            }),

            ...(ownerState.variant === "tonal" && {
              backgroundColor: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
            }),
          },

          // =========================
          // SHADOW
          // =========================
          ...(ownerState.variant !== "text" &&
            ownerState.variant !== "outlined" && {
              boxShadow: `0px 4px 12px ${buttonColor}33`,

              "&:hover": {
                boxShadow: `0px 6px 12px ${buttonColor}66`,
              },
            }),

          // =========================
          // SIZE
          // =========================
          ...(ownerState.size === "small" && {
            height: "30px",
            fontSize: 12,
          }),

          ...(ownerState.size === "medium" && {
            height: "36px",
            fontSize: 14,
          }),

          ...(ownerState.size === "large" && {
            height: "40px",
          }),

          // =========================
          // OUTLINED INHERIT
          // =========================
          ...(ownerState.variant === "outlined" &&
            ownerState.color === "inherit" && {
              color: Colors.custom.paper.bg,
              borderColor: Colors.custom.paper.bg,

              "&:hover": {
                backgroundColor: `${Colors.custom.paper.bg}0A`,
              },
            }),
        };
      },
    },

    variants: [
      {
        props: { variant: "tonal" },

        style: ({ theme, ownerState }: any) => {
          const buttonColor =
            ownerState.color === "secondary"
              ? theme.palette.secondary.main
              : ownerState.color === "primary"
                ? theme.palette.primary.main
                : ownerState.color === "success"
                  ? theme.palette.success.main
                  : ownerState.color === "warning"
                    ? theme.palette.warning.main
                    : ownerState.color === "error"
                      ? theme.palette.error.main
                      : theme.palette.grey[500];

          return {
            backgroundColor: `${buttonColor}33`,
            color: buttonColor,
            boxShadow: `0px 4px 8px ${buttonColor}20`,

            "&:hover": {
              backgroundColor: `${buttonColor}66`,
              boxShadow: `0px 6px 12px ${buttonColor}33`,
            },

            "&.Mui-disabled": {
              backgroundColor: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled,
              boxShadow: "none",
            },
          };
        },
      },
    ],
  },

  MuiIconButton: {
    styleOverrides: {
      root: {
        "&:hover": {
          backgroundColor: "inherit",
        },
      },
    },
  },
};

export default button;
