import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

interface Props {
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  value?: string | number;
}

export default function CustomTextField(props: Props) {
  return (
    <div className="w-full">
      <Typography
        color="secondary"
        fontSize={{ xs: 12, md: 16 }}
        sx={{
          mb: 0.5,
        }}
      >
        {props.label}
      </Typography>
      <TextField
        disabled={props.disabled}
        fullWidth={props.fullWidth}
        value={props.value}
      />
    </div>
  );
}
