"use client";

import { Paper, Stack, Typography } from "@mui/material";

interface InfoAppProps {
  experience?: "desktop" | "mobile";
}

const EXPERIENCE_COPY = {
  desktop: {
    description:
      "This portfolio behaves like a familiar desktop OS, with draggable icons, independent windows, and app-like workflows. Open the other icons to explore each section.",
    highlights: [
      "Drag icons around the desktop.",
      "Open multiple windows and arrange them freely.",
      "Minimize, maximize, and close windows like an OS shell.",
      "Use the Contact window to send an email-ready message.",
    ],
    title: "The desktop portfolio experience",
  },
  mobile: {
    description:
      "The mobile experience carries the same Portfolio OS identity into a touch-first layout. Its atmospheric wallpaper, glass status chrome, white app icons, and elevated content surfaces mirror the desktop without forcing desktop window controls onto a smaller screen.",
    highlights: [
      "Tap a home-screen icon to open an app.",
      "Use the app header to navigate back to the launcher.",
      "Explore every portfolio section in a focused, scrollable view.",
      "Enjoy the same visual theme and content across desktop and mobile.",
    ],
    title: "The mobile portfolio experience",
  },
} as const;

export default function InfoApp({ experience = "desktop" }: InfoAppProps) {
  const content = EXPERIENCE_COPY[experience];

  return (
    <Stack spacing={2.5}>
      <Typography color="text.primary" variant="h4">
        {content.title}
      </Typography>
      <Typography color="text.secondary" variant="body1">
        {content.description}
      </Typography>
      <Paper sx={{ borderRadius: 2, p: 2.5 }} variant="outlined">
        <Typography color="text.primary" variant="subtitle1">
          Interaction Highlights
        </Typography>
        <Stack spacing={0.5} sx={{ mt: 1 }}>
          {content.highlights.map((highlight) => (
            <Typography key={highlight} color="text.secondary" variant="body2">
              • {highlight}
            </Typography>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
