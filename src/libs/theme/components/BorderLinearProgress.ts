import { LinearProgress, linearProgressClasses, styled } from "@mui/material";
import { Colors } from "theme/Colors";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: Colors.success,
    ...theme.applyStyles("dark", {
      backgroundColor: Colors.success[500],
    }),
  },
}));

export default BorderLinearProgress;
