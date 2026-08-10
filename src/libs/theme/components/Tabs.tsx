import type { Theme } from "@mui/material/styles";

const tabs: Theme["components"] = {
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          "& .Mui-selected": {
            borderRadius: 5,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.primary.main,
            height: "3px",
          },
        };
      },
    },
  },
};

export default tabs;
