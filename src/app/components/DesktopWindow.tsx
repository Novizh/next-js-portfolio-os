"use client";

import type { DesktopWindowProps } from "libs/interfaces/user";

import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { IconMinus, IconSquare, IconX } from "@tabler/icons-react";
import { Rnd } from "react-rnd";

import { APP_LOOKUP } from "libs/constants/user";

import AboutApp from "./AboutApp";
import ContactApp from "./ContactApp";
import HomeAppContent from "./InfoApp";
import ProjectsApp from "./ProjectsApp";

export default function DesktopWindow({
  isActive,
  onBringToFront,
  onClose,
  onMinimize,
  onToggleMaximize,
  onUpdateBounds,
  recipientEmail,
  windowItem,
}: DesktopWindowProps) {
  const app = APP_LOOKUP[windowItem.appId];
  const AppIcon = app.icon;

  return (
    <Rnd
      bounds="parent"
      disableDragging={windowItem.maximized}
      dragHandleClassName={`window-drag-handle-${windowItem.id}`}
      enableResizing={!windowItem.maximized}
      minHeight={windowItem.minSize.height}
      minWidth={windowItem.minSize.width}
      position={{ x: windowItem.bounds.x, y: windowItem.bounds.y }}
      size={{
        height: windowItem.bounds.height,
        width: windowItem.bounds.width,
      }}
      style={{ zIndex: windowItem.zIndex }}
      onDragStart={() => onBringToFront(windowItem.id)}
      onDragStop={(_, data) =>
        onUpdateBounds(windowItem.id, {
          ...windowItem.bounds,
          x: data.x,
          y: data.y,
        })
      }
      onMouseDown={() => onBringToFront(windowItem.id)}
      onResizeStart={() => onBringToFront(windowItem.id)}
      onResizeStop={(_, __, resizedRef, ___, position) => {
        onUpdateBounds(windowItem.id, {
          height: Number.parseFloat(resizedRef.style.height),
          width: Number.parseFloat(resizedRef.style.width),
          x: position.x,
          y: position.y,
        });
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.96)",
          border: "1px solid",
          borderColor: isActive
            ? "rgba(255, 255, 255, 0.82)"
            : "rgba(255, 255, 255, 0.48)",
          borderRadius: windowItem.maximized ? 0 : 2,
          boxShadow: isActive
            ? "0 28px 70px rgba(8, 24, 50, 0.30), 0 8px 24px rgba(8, 24, 50, 0.20)"
            : "0 16px 42px rgba(8, 24, 50, 0.18)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          transition: "border-color 160ms ease, box-shadow 160ms ease",
        }}
      >
        <Stack
          alignItems="center"
          className={`window-drag-handle-${windowItem.id}`}
          direction="row"
          justifyContent="space-between"
          sx={{
            backdropFilter: "blur(20px) saturate(150%)",
            backgroundColor: isActive
              ? "rgba(242, 248, 252, 0.94)"
              : "rgba(238, 241, 244, 0.90)",
            borderBottom: "1px solid rgba(18, 47, 72, 0.10)",
            cursor: windowItem.maximized ? "default" : "move",
            px: 1.5,
            py: 0.75,
            userSelect: "none",
          }}
          onDoubleClick={() => onToggleMaximize(windowItem.id)}
        >
          <Stack alignItems="center" direction="row" spacing={0.8}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: isActive
                  ? "rgba(5, 160, 192, 0.12)"
                  : "rgba(42, 45, 72, 0.06)",
                borderRadius: 1,
                display: "flex",
                height: 24,
                justifyContent: "center",
                width: 24,
              }}
            >
              <AppIcon
                color={isActive ? "#047890" : "#595B71"}
                size={15}
                stroke={1.9}
              />
            </Box>
            <Typography
              color={isActive ? "text.primary" : "text.secondary"}
              variant="subtitle2"
            >
              {windowItem.title}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.25}>
            <IconButton
              aria-label={`Minimize ${windowItem.title}`}
              size="small"
              sx={{ "&:hover": { backgroundColor: "rgba(42, 45, 72, 0.08)" } }}
              onClick={() => onMinimize(windowItem.id)}
            >
              <IconMinus size={14} />
            </IconButton>
            <IconButton
              aria-label={`${windowItem.maximized ? "Restore" : "Maximize"} ${windowItem.title}`}
              size="small"
              sx={{ "&:hover": { backgroundColor: "rgba(42, 45, 72, 0.08)" } }}
              onClick={() => onToggleMaximize(windowItem.id)}
            >
              <IconSquare size={14} />
            </IconButton>
            <IconButton
              aria-label={`Close ${windowItem.title}`}
              size="small"
              sx={{
                "&:hover": {
                  backgroundColor: "error.main",
                  color: "common.white",
                },
              }}
              onClick={() => onClose(windowItem.id)}
            >
              <IconX size={14} />
            </IconButton>
          </Stack>
        </Stack>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: windowItem.appId === "about" ? 0 : 2,
          }}
        >
          {windowItem.appId === "about" ? (
            <AboutApp />
          ) : windowItem.appId === "projects" ? (
            <ProjectsApp />
          ) : windowItem.appId === "contact" ? (
            <ContactApp recipientEmail={recipientEmail} />
          ) : (
            <Box>
              <HomeAppContent />
            </Box>
          )}
        </Box>
      </Paper>
    </Rnd>
  );
}
