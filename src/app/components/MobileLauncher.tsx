"use client";

import type { AppId } from "libs/interfaces/user";

import { Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import { IconArrowLeft, IconBattery4, IconWifi } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { APP_LOOKUP, DESKTOP_APPS } from "libs/constants/user";

import AboutApp from "./AboutApp";
import ContactApp from "./ContactApp";
import HomeApp from "./InfoApp";
import ProjectsApp from "./ProjectsApp";

interface MobileLauncherProps {
  recipientEmail: string;
}

const MOBILE_SHELL_STYLES = {
  "&::after": {
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "38px 38px",
    content: '\"\"',
    inset: 0,
    maskImage: "linear-gradient(to bottom, black, transparent 88%)",
    pointerEvents: "none",
    position: "absolute",
  },
  background:
    "radial-gradient(circle at 84% 16%, rgba(78, 226, 231, 0.48), transparent 30%), radial-gradient(circle at 12% 84%, rgba(105, 118, 255, 0.42), transparent 36%), linear-gradient(150deg, #0b1f3a 0%, #14536b 52%, #4eafb8 100%)",
  display: "flex",
  flexDirection: "column",
  minHeight: "100dvh",
  overflow: "hidden",
  position: "relative",
} as const;

const MobileStatusBar = ({ currentTime }: { currentTime: Date | null }) => (
  <Stack
    alignItems="center"
    direction="row"
    justifyContent="space-between"
    sx={{
      color: "common.white",
      minHeight: 38,
      pt: "env(safe-area-inset-top, 0px)",
      px: 2,
      position: "relative",
      userSelect: "none",
      zIndex: 1,
    }}
  >
    <Stack alignItems="center" direction="row" spacing={0.8}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #5ae0dd, #8ca8ff)",
          borderRadius: "50%",
          boxShadow: "0 0 12px rgba(90, 224, 221, 0.55)",
          height: 8,
          width: 8,
        }}
      />
      <Typography fontWeight={600} variant="caption">
        Portfolio OS
      </Typography>
    </Stack>
    <Stack alignItems="center" direction="row" spacing={0.9}>
      <IconWifi size={15} stroke={1.9} />
      <IconBattery4 size={16} stroke={1.9} />
      <Typography sx={{ minWidth: 48, textAlign: "right" }} variant="caption">
        {currentTime
          ? currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "--:--"}
      </Typography>
    </Stack>
  </Stack>
);

const renderAppContent = (appId: AppId, recipientEmail: string) => {
  switch (appId) {
    case "about":
      return <AboutApp />;
    case "projects":
      return <ProjectsApp />;
    case "contact":
      return <ContactApp recipientEmail={recipientEmail} />;
    case "info":
      return <HomeApp experience="mobile" />;
    default:
      return null;
  }
};

export default function MobileLauncher({
  recipientEmail,
}: MobileLauncherProps) {
  const [activeAppId, setActiveAppId] = useState<AppId | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = window.setInterval(() => setCurrentTime(new Date()), 30_000);

    return () => window.clearInterval(timer);
  }, []);

  if (activeAppId) {
    const activeApp = APP_LOOKUP[activeAppId];
    const ActiveAppIcon = activeApp.icon;

    return (
      <Box sx={MOBILE_SHELL_STYLES}>
        <Stack
          sx={{
            backdropFilter: "blur(24px) saturate(170%)",
            backgroundColor: "rgba(7, 25, 45, 0.42)",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <MobileStatusBar currentTime={currentTime} />
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            sx={{ color: "common.white", px: 1, py: 0.75 }}
          >
            <IconButton
              aria-label="Back to home"
              size="medium"
              sx={{
                "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
                color: "inherit",
              }}
              onClick={() => setActiveAppId(null)}
            >
              <IconArrowLeft size={22} />
            </IconButton>
            <ActiveAppIcon size={21} stroke={1.8} />
            <Typography fontWeight={600} variant="body2">
              {activeApp.title}
            </Typography>
          </Stack>
        </Stack>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 1.25,
            pb: "calc(env(safe-area-inset-bottom, 0px) + 10px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(250, 252, 253, 0.96)",
              border: "1px solid rgba(255,255,255,0.64)",
              borderRadius: 3,
              boxShadow: "0 24px 60px rgba(5, 21, 45, 0.28)",
              minHeight: "calc(100dvh - 112px)",
              overflow: "hidden",
              p: activeAppId === "about" ? 0 : 2,
            }}
          >
            {renderAppContent(activeAppId, recipientEmail)}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={MOBILE_SHELL_STYLES}>
      <MobileStatusBar currentTime={currentTime} />

      <Stack
        sx={{
          color: "common.white",
          pb: 2,
          pt: 4,
          px: 2.5,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          fontWeight={700}
          sx={{ letterSpacing: "0.08em", opacity: 0.66 }}
          variant="overline"
        >
          Naufal Ardhi
        </Typography>
        <Typography fontWeight={700} sx={{ mt: 0.5 }} variant="h4">
          Portfolio OS
        </Typography>
        <Typography
          sx={{ color: "rgba(255,255,255,0.68)", mt: 0.75 }}
          variant="body2"
        >
          Tap an app to explore my work.
        </Typography>
      </Stack>

      <Box
        sx={{
          alignContent: "start",
          display: "grid",
          flex: 1,
          gap: 0.5,
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          pb: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
          pt: 2,
          px: 1.5,
          position: "relative",
          zIndex: 1,
        }}
      >
        {DESKTOP_APPS.map((app) => {
          const Icon = app.icon;

          return (
            <ButtonBase
              key={app.id}
              sx={{
                "&:active": {
                  backgroundColor: "rgba(255,255,255,0.16)",
                  transform: "scale(0.96)",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.10)",
                },
                alignItems: "center",
                borderRadius: 2,
                color: "common.white",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                minWidth: 0,
                p: 0.5,
                transition: "background-color 150ms ease, transform 150ms ease",
              }}
              onClick={() => setActiveAppId(app.id)}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  filter: "drop-shadow(0 7px 8px rgba(2, 18, 38, 0.36))",
                  height: 58,
                  justifyContent: "center",
                  width: 58,
                }}
              >
                <Icon color="#FFFFFF" size={46} stroke={1.6} />
              </Box>
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textAlign: "center",
                  textOverflow: "ellipsis",
                  textShadow: "0 1px 4px rgba(0, 18, 38, 0.9)",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
                variant="caption"
              >
                {app.title}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
