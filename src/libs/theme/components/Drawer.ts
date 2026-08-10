import type { Components } from "@mui/material/styles";

const Drawer: Components["MuiDrawer"] = {
  styleOverrides: {
    paperAnchorBottom: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: "16px",
      boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
      minHeight: "200px",
      backgroundColor: "#fff",
    },
    root: {
      zIndex: 1300,
    },
  },
};

export default Drawer;
