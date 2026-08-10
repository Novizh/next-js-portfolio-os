import type { ElementType } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface UserState {
  profile: UserProfile | null;
}

export type AppId = "about" | "projects" | "contact" | "info";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  height: number;
  width: number;
}

export interface WindowBounds extends WindowPosition, WindowSize {}

export interface DesktopApp {
  defaultSize: WindowSize;
  description: string;
  icon: ElementType;
  id: AppId;
  minSize: WindowSize;
  title: string;
}

export interface DesktopWindowState {
  appId: AppId;
  bounds: WindowBounds;
  id: string;
  maximized: boolean;
  minSize: WindowSize;
  minimized: boolean;
  restoreBounds?: WindowBounds;
  title: string;
  zIndex: number;
}

export interface DesktopWindowProps {
  isActive: boolean;
  onBringToFront: (windowId: string) => void;
  onClose: (windowId: string) => void;
  onMinimize: (windowId: string) => void;
  onToggleMaximize: (windowId: string) => void;
  onUpdateBounds: (windowId: string, bounds: WindowBounds) => void;
  recipientEmail: string;
  windowItem: DesktopWindowState;
}

export interface ContactAppProps {
  recipientEmail: string;
}

export interface ExperienceRole {
  bullets: string[];
  period: string;
  title: string;
}

export interface Experience {
  company: string;
  employmentType?: string;
  location: string;
  logoBgColor?: string;
  logoSrc: string;
  roles: ExperienceRole[];
}

export interface Project {
  company: string;
  logo?: string;
  description: string[];
  id: string;
  name: string;
  period: string;
  projectUrl?: string;
  stacks: string[];
}
