import type { Theme } from "@mui/material/styles";

import { alpha } from "@mui/material/styles";

// (Optional) extend colors like you did for Button
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    tertiary: true;
    white: true;
  }
}

// Add tonal variant
declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    tonal: true;
  }
}

const chip: Theme["components"] = {
  MuiChip: {
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        const chipColor =
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
          borderRadius: theme.shape.borderRadius,
          fontWeight: 500,
          transition: theme.transitions.create("all", {
            duration: theme.transitions.duration.short,
          }),

          // subtle elevation like Button (only for non-filled variants)
          ...(ownerState.variant !== "outlined" && {
            boxShadow: `0px 2px 6px ${chipColor}20`,
            "&:hover": {
              boxShadow: `0px 4px 10px ${chipColor}33`,
            },
          }),

          "&.Mui-disabled": {
            opacity: 0.5,
          },

          // size consistency with Button
          ...(ownerState.size === "small" && {
            height: 24,
            fontSize: 11,
          }),
          ...(ownerState.size === "medium" && {
            height: 28,
            fontSize: 12,
          }),
        };
      },
    },

    variants: [
      {
        props: { variant: "tonal" },
        style: ({ theme, ownerState }: any) => {
          const chipColor =
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
            backgroundColor: alpha(chipColor, 0.2),
            color: chipColor,
            border: "none",
            boxShadow: `0px 2px 6px ${chipColor}20`,
          };
        },
      },
    ],
  },
};

export default chip;
