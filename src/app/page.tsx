"use client";

import type {
  AppId,
  DesktopApp,
  DesktopWindowState,
  WindowBounds,
  WindowPosition,
  WindowSize,
} from "libs/interfaces/user";
import type { RefObject } from "react";

import {
  APP_LOOKUP,
  DEFAULT_DESKTOP_SIZE,
  DESKTOP_ICON_HEIGHT,
  DESKTOP_ICON_WIDTH,
  DESKTOP_APPS,
  ICON_LAYER_Z_INDEX,
  ICON_GRID,
  INITIAL_HOME_WINDOW,
  INITIAL_ICON_POSITIONS,
  TOP_BAR_HEIGHT,
  WINDOW_BASE_Z_INDEX,
  WINDOW_FRAME_MARGIN,
} from "libs/constants/user";
import DesktopWindow from "app/components/DesktopWindow";
import MobileLauncher from "app/components/MobileLauncher";
import {
  Box,
  ButtonBase,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Draggable from "react-draggable";
import { IconBattery4, IconWifi } from "@tabler/icons-react";
import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const DESKTOP_DOCK_SAFE_AREA = 92;
const OPEN_WINDOW_SCREEN_RATIO = 0.75;
const OPEN_WINDOW_WIDTH_SCALE = 0.75;
const CONTENT_SIZED_APP_IDS = new Set<AppId>(["contact", "info"]);

const getOpeningWindowBounds = (
  app: DesktopApp,
  desktopSize: WindowSize,
  offset = 0,
): WindowBounds => {
  const availableWidth = Math.max(
    desktopSize.width - WINDOW_FRAME_MARGIN * 2,
    app.minSize.width,
  );
  const availableHeight = Math.max(
    desktopSize.height - TOP_BAR_HEIGHT - WINDOW_FRAME_MARGIN * 2,
    app.minSize.height,
  );
  const currentOpeningWidth = Math.max(
    app.defaultSize.width,
    app.minSize.width,
    desktopSize.width * OPEN_WINDOW_SCREEN_RATIO,
  );
  const width = Math.min(
    Math.max(currentOpeningWidth * OPEN_WINDOW_WIDTH_SCALE, app.minSize.width),
    availableWidth,
  );
  const contentHeight = Math.max(app.defaultSize.height, app.minSize.height);
  const height = Math.min(
    CONTENT_SIZED_APP_IDS.has(app.id)
      ? contentHeight
      : Math.max(contentHeight, desktopSize.height * OPEN_WINDOW_SCREEN_RATIO),
    availableHeight,
  );
  const centeredX = (desktopSize.width - width) / 2;
  const targetY = TOP_BAR_HEIGHT + WINDOW_FRAME_MARGIN + offset;

  return {
    height,
    width,
    x: Math.min(
      Math.max(centeredX + offset, WINDOW_FRAME_MARGIN),
      Math.max(
        WINDOW_FRAME_MARGIN,
        desktopSize.width - width - WINDOW_FRAME_MARGIN,
      ),
    ),
    y: Math.min(
      targetY,
      Math.max(
        TOP_BAR_HEIGHT + WINDOW_FRAME_MARGIN,
        desktopSize.height - height - WINDOW_FRAME_MARGIN,
      ),
    ),
  };
};

const getIconPositionKey = (position: WindowPosition) =>
  `${position.x}:${position.y}`;

const findAvailableIconPosition = ({
  appId,
  maxX,
  maxY,
  positions,
  targetPosition,
}: {
  appId: AppId;
  maxX: number;
  maxY: number;
  positions: Record<AppId, WindowPosition>;
  targetPosition: WindowPosition;
}) => {
  const occupiedPositions = new Set(
    Object.entries(positions)
      .filter(([positionAppId]) => positionAppId !== appId)
      .map(([, position]) => getIconPositionKey(position)),
  );

  if (!occupiedPositions.has(getIconPositionKey(targetPosition))) {
    return targetPosition;
  }

  const columnCount = Math.max(
    1,
    Math.floor((maxX - ICON_GRID.originX) / ICON_GRID.columnGap) + 1,
  );
  const rowCount = Math.max(
    1,
    Math.floor((maxY - ICON_GRID.originY) / ICON_GRID.rowGap) + 1,
  );
  const targetColumn = Math.min(
    Math.max(
      Math.round((targetPosition.x - ICON_GRID.originX) / ICON_GRID.columnGap),
      0,
    ),
    columnCount - 1,
  );
  const targetRow = Math.min(
    Math.max(
      Math.round((targetPosition.y - ICON_GRID.originY) / ICON_GRID.rowGap),
      0,
    ),
    rowCount - 1,
  );
  const targetIndex = targetRow * columnCount + targetColumn;
  const totalSlots = columnCount * rowCount;

  for (let slotOffset = 1; slotOffset < totalSlots; slotOffset += 1) {
    const slotIndex = (targetIndex + slotOffset) % totalSlots;
    const position = {
      x: Math.min(
        ICON_GRID.originX + (slotIndex % columnCount) * ICON_GRID.columnGap,
        maxX,
      ),
      y: Math.min(
        ICON_GRID.originY +
          Math.floor(slotIndex / columnCount) * ICON_GRID.rowGap,
        maxY,
      ),
    };

    if (!occupiedPositions.has(getIconPositionKey(position))) {
      return position;
    }
  }

  return targetPosition;
};

export default function Landing() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const desktopRef = useRef<HTMLDivElement>(null);
  const hasSizedInitialWindowRef = useRef(false);
  const zIndexRef = useRef(WINDOW_BASE_Z_INDEX);
  const [desktopSize, setDesktopSize] =
    useState<WindowSize>(DEFAULT_DESKTOP_SIZE);
  const [iconPositions, setIconPositions] = useState<
    Record<AppId, WindowPosition>
  >(INITIAL_ICON_POSITIONS);
  const [windows, setWindows] = useState<DesktopWindowState[]>([
    {
      ...INITIAL_HOME_WINDOW,
      bounds: getOpeningWindowBounds(
        APP_LOOKUP[INITIAL_HOME_WINDOW.appId],
        DEFAULT_DESKTOP_SIZE,
      ),
    },
  ]);
  const [selectedAppId, setSelectedAppId] = useState<AppId | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const iconRefs = useMemo(
    () =>
      DESKTOP_APPS.reduce(
        (refs, app) => {
          refs[app.id] = createRef<HTMLDivElement>();

          return refs;
        },
        {} as Record<AppId, RefObject<HTMLDivElement | null>>,
      ),
    [],
  );
  const recipientEmail = "naufalhrd@hotmail.com";

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const desktopNode = desktopRef.current;

    if (!desktopNode) {
      return;
    }

    const updateDesktopSize = () => {
      const nextDesktopSize = {
        height: desktopNode.clientHeight,
        width: desktopNode.clientWidth,
      };

      setDesktopSize(nextDesktopSize);

      if (!hasSizedInitialWindowRef.current) {
        hasSizedInitialWindowRef.current = true;
        setWindows((prev) =>
          prev.map((windowItem) =>
            windowItem.id === INITIAL_HOME_WINDOW.id
              ? {
                  ...windowItem,
                  bounds: getOpeningWindowBounds(
                    APP_LOOKUP[windowItem.appId],
                    nextDesktopSize,
                  ),
                }
              : windowItem,
          ),
        );
      }
    };

    updateDesktopSize();

    const observer = new ResizeObserver(updateDesktopSize);

    observer.observe(desktopNode);

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = window.setInterval(() => setCurrentTime(new Date()), 30_000);

    return () => window.clearInterval(timer);
  }, []);

  const bringWindowToFront = useCallback((windowId: string) => {
    setWindows((prev) => {
      if (!prev.some((windowItem) => windowItem.id === windowId)) {
        return prev;
      }

      const nextZIndex = zIndexRef.current + 1;

      zIndexRef.current = nextZIndex;

      return prev.map((windowItem) =>
        windowItem.id === windowId
          ? {
              ...windowItem,
              zIndex: nextZIndex,
            }
          : windowItem,
      );
    });
  }, []);

  const openWindow = useCallback(
    (appId: AppId) => {
      const app = APP_LOOKUP[appId];

      setWindows((prev) => {
        const nextZIndex = zIndexRef.current + 1;

        zIndexRef.current = nextZIndex;

        const existingWindow = prev.find(
          (windowItem) => windowItem.appId === appId,
        );

        if (existingWindow) {
          return prev.map((windowItem) =>
            windowItem.id === existingWindow.id
              ? {
                  ...windowItem,
                  minimized: false,
                  zIndex: nextZIndex,
                }
              : windowItem,
          );
        }

        const offset = Math.min(prev.length * 26, 140);

        return [
          ...prev,
          {
            appId,
            bounds: getOpeningWindowBounds(app, desktopSize, offset),
            id: `window-${appId}`,
            maximized: false,
            minSize: app.minSize,
            minimized: false,
            title: app.title,
            zIndex: nextZIndex,
          },
        ];
      });
    },
    [desktopSize],
  );

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.filter((windowItem) => windowItem.id !== windowId),
    );
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((windowItem) =>
        windowItem.id === windowId
          ? {
              ...windowItem,
              minimized: true,
            }
          : windowItem,
      ),
    );
  }, []);

  const restoreWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      if (!prev.some((windowItem) => windowItem.id === windowId)) {
        return prev;
      }

      const nextZIndex = zIndexRef.current + 1;

      zIndexRef.current = nextZIndex;

      return prev.map((windowItem) =>
        windowItem.id === windowId
          ? {
              ...windowItem,
              minimized: false,
              zIndex: nextZIndex,
            }
          : windowItem,
      );
    });
  }, []);

  const toggleWindowMaximize = useCallback(
    (windowId: string) => {
      setWindows((prev) =>
        prev.map((windowItem) => {
          if (windowItem.id !== windowId) {
            return windowItem;
          }

          const nextZIndex = zIndexRef.current + 1;

          zIndexRef.current = nextZIndex;

          if (windowItem.maximized) {
            return {
              ...windowItem,
              bounds: windowItem.restoreBounds ?? windowItem.bounds,
              maximized: false,
              restoreBounds: undefined,
              zIndex: nextZIndex,
            };
          }

          return {
            ...windowItem,
            bounds: {
              height: Math.max(desktopSize.height - TOP_BAR_HEIGHT, 360),
              width: Math.max(desktopSize.width, 540),
              x: 0,
              y: TOP_BAR_HEIGHT,
            },
            maximized: true,
            restoreBounds: windowItem.bounds,
            zIndex: nextZIndex,
          };
        }),
      );
    },
    [desktopSize.height, desktopSize.width],
  );

  const updateWindowBounds = useCallback(
    (windowId: string, bounds: WindowBounds) => {
      setWindows((prev) =>
        prev.map((windowItem) =>
          windowItem.id === windowId
            ? {
                ...windowItem,
                bounds,
              }
            : windowItem,
        ),
      );
    },
    [],
  );

  const activeWindow = windows
    .filter((windowItem) => !windowItem.minimized)
    .reduce<DesktopWindowState | null>(
      (frontWindow, windowItem) =>
        !frontWindow || windowItem.zIndex > frontWindow.zIndex
          ? windowItem
          : frontWindow,
      null,
    );

  const handleDockClick = useCallback(
    (appId: AppId) => {
      const windowItem = windows.find((item) => item.appId === appId);

      if (!windowItem) {
        openWindow(appId);

        return;
      }

      if (windowItem.minimized) {
        restoreWindow(windowItem.id);

        return;
      }

      if (activeWindow?.id === windowItem.id) {
        minimizeWindow(windowItem.id);

        return;
      }

      bringWindowToFront(windowItem.id);
    },
    [
      activeWindow?.id,
      bringWindowToFront,
      minimizeWindow,
      openWindow,
      restoreWindow,
      windows,
    ],
  );

  if (isMobile) {
    return <MobileLauncher recipientEmail={recipientEmail} />;
  }

  return (
    <Box
      ref={desktopRef}
      sx={{
        "&::after": {
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          content: '\"\"',
          inset: 0,
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          pointerEvents: "none",
          position: "absolute",
        },
        background:
          "radial-gradient(circle at 78% 20%, rgba(78, 226, 231, 0.48), transparent 31%), radial-gradient(circle at 20% 88%, rgba(105, 118, 255, 0.38), transparent 35%), linear-gradient(135deg, #0b1f3a 0%, #14536b 48%, #4eafb8 100%)",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) {
          setSelectedAppId(null);
        }
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{
          backdropFilter: "blur(24px) saturate(170%)",
          backgroundColor: "rgba(7, 25, 45, 0.38)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          color: "common.white",
          height: TOP_BAR_HEIGHT,
          left: 0,
          px: 2,
          position: "absolute",
          right: 0,
          top: 0,
          userSelect: "none",
          zIndex: 1600,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={1.25}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #5ae0dd, #8ca8ff)",
              borderRadius: "50%",
              boxShadow: "0 0 14px rgba(90, 224, 221, 0.5)",
              height: 10,
              width: 10,
            }}
          />
          <Typography
            fontWeight={600}
            sx={{ letterSpacing: "0.01em" }}
            variant="body2"
          >
            Portfolio OS
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.62)" }}
            variant="caption"
          >
            Naufal Ardhi
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1.25}>
          <IconWifi size={17} stroke={1.8} />
          <IconBattery4 size={18} stroke={1.8} />
          <Typography
            sx={{ minWidth: 62, textAlign: "right" }}
            variant="caption"
          >
            {currentTime
              ? currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "--:--"}
          </Typography>
        </Stack>
      </Stack>

      {DESKTOP_APPS.map((app) => {
        const Icon = app.icon;

        return (
          <Draggable
            key={app.id}
            bounds="parent"
            nodeRef={iconRefs[app.id]}
            position={iconPositions[app.id]}
            onStop={(_, data) => {
              const snappedX =
                ICON_GRID.originX +
                Math.round((data.x - ICON_GRID.originX) / ICON_GRID.columnGap) *
                  ICON_GRID.columnGap;
              const snappedY =
                ICON_GRID.originY +
                Math.round((data.y - ICON_GRID.originY) / ICON_GRID.rowGap) *
                  ICON_GRID.rowGap;
              const maxX = Math.max(0, desktopSize.width - DESKTOP_ICON_WIDTH);
              const maxY = Math.max(
                8,
                desktopSize.height -
                  DESKTOP_ICON_HEIGHT -
                  DESKTOP_DOCK_SAFE_AREA,
              );

              setIconPositions((prev) => {
                const targetPosition = {
                  x: Math.min(Math.max(snappedX, 0), maxX),
                  y: Math.min(Math.max(snappedY, 8), maxY),
                };

                return {
                  ...prev,
                  [app.id]: findAvailableIconPosition({
                    appId: app.id,
                    maxX,
                    maxY,
                    positions: prev,
                    targetPosition,
                  }),
                };
              });
            }}
          >
            <Box
              ref={iconRefs[app.id]}
              sx={{
                cursor: "grab",
                height: DESKTOP_ICON_HEIGHT,
                left: 0,
                position: "absolute",
                top: 0,
                width: DESKTOP_ICON_WIDTH,
                zIndex: ICON_LAYER_Z_INDEX,
              }}
            >
              <ButtonBase
                className="desktop-icon-handle"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.13)",
                  },
                  alignItems: "center",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  height: "100%",
                  justifyContent: "flex-start",
                  p: 0.75,
                  textAlign: "center",
                  userSelect: "none",
                  width: "100%",
                  ...(selectedAppId === app.id && {
                    backgroundColor: "rgba(255,255,255,0.18)",
                    outline: "1px solid rgba(255,255,255,0.28)",
                  }),
                }}
                onClick={() => setSelectedAppId(app.id)}
                onDoubleClick={() => openWindow(app.id)}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    filter: "drop-shadow(0 7px 8px rgba(2, 18, 38, 0.34))",
                    height: 68,
                    justifyContent: "center",
                    width: 72,
                  }}
                >
                  <Icon color="#FFFFFF" size={52} stroke={1.6} />
                </Box>
                <Typography
                  sx={{
                    color: "common.white",
                    display: "-webkit-box",
                    fontWeight: 500,
                    lineHeight: 1.2,
                    minHeight: 34,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textShadow: "0 1px 4px rgba(0, 18, 38, 0.9)",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    wordBreak: "break-word",
                  }}
                  variant="caption"
                >
                  {app.title}
                </Typography>
              </ButtonBase>
            </Box>
          </Draggable>
        );
      })}

      {windows
        .filter((windowItem) => !windowItem.minimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((windowItem) => (
          <DesktopWindow
            key={windowItem.id}
            isActive={activeWindow?.id === windowItem.id}
            recipientEmail={recipientEmail}
            windowItem={windowItem}
            onBringToFront={bringWindowToFront}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onToggleMaximize={toggleWindowMaximize}
            onUpdateBounds={updateWindowBounds}
          />
        ))}

      {windows.length > 0 ? (
        <Stack
          alignItems="center"
          direction="row"
          spacing={0.625}
          sx={{
            backdropFilter: "blur(28px) saturate(180%)",
            backgroundColor: "rgba(240, 249, 252, 0.34)",
            border: "1px solid rgba(255,255,255,0.48)",
            borderRadius: 3,
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
            boxShadow: [
              "0 18px 50px rgba(5, 21, 45, 0.30)",
              "0 3px 10px rgba(5, 21, 45, 0.16)",
              "inset 0 1px 0 rgba(255,255,255,0.58)",
            ].join(", "),
            left: "50%",
            maxWidth: "calc(100vw - 32px)",
            p: 0.75,
            position: "absolute",
            transform: "translateX(-50%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            zIndex: 1600,
          }}
        >
          {windows.map((windowItem) => {
            const app = APP_LOOKUP[windowItem.appId];
            const Icon = app.icon;
            const isActive = activeWindow?.id === windowItem.id;

            return (
              <Tooltip key={`dock-${windowItem.id}`} title={app.title}>
                <Box sx={{ position: "relative" }}>
                  <IconButton
                    aria-label={`Show ${app.title}`}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.42)",
                        transform: "translateY(-4px) scale(1.04)",
                      },
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.48)"
                        : "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: 2,
                      height: 48,
                      transition:
                        "transform 160ms ease, background-color 160ms ease",
                      width: 48,
                    }}
                    onClick={() => handleDockClick(app.id)}
                  >
                    <Icon color="#FFFFFF" size={25} stroke={1.8} />
                  </IconButton>
                  <Box
                    sx={{
                      backgroundColor: isActive
                        ? "#8ff5ef"
                        : "rgba(255,255,255,0.72)",
                      borderRadius: 99,
                      bottom: -3,
                      boxShadow: isActive
                        ? "0 0 8px rgba(143,245,239,0.9)"
                        : "none",
                      height: 4,
                      left: "50%",
                      position: "absolute",
                      transform: "translateX(-50%)",
                      width: isActive ? 14 : 5,
                    }}
                  />
                </Box>
              </Tooltip>
            );
          })}
        </Stack>
      ) : null}
    </Box>
  );
}
