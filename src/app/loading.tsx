import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen bg-white items-center justify-center">
      <CircularProgress color="primary" />
    </div>
  );
}
