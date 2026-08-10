import type {
  AppId,
  DesktopApp,
  DesktopWindowState,
  WindowPosition,
  WindowSize,
  Experience,
  Project,
} from "libs/interfaces/user";

import {
  IconCode,
  IconInfoCircle,
  IconMail,
  IconUserCircle,
} from "@tabler/icons-react";

export const DESKTOP_APPS: DesktopApp[] = [
  {
    defaultSize: { height: 620, width: 900 },
    description: "About me and experience summary",
    icon: IconUserCircle,
    id: "about",
    minSize: { height: 420, width: 560 },
    title: "About",
  },
  {
    defaultSize: { height: 560, width: 820 },
    description: "Projects, stack, and achievements",
    icon: IconCode,
    id: "projects",
    minSize: { height: 380, width: 540 },
    title: "Projects",
  },
  {
    defaultSize: { height: 705, width: 700 },
    description: "Send email and collaboration inquiry",
    icon: IconMail,
    id: "contact",
    minSize: { height: 380, width: 520 },
    title: "Talk to Me",
  },
  {
    defaultSize: { height: 200, width: 760 },
    description: "Landing content and quick links",
    icon: IconInfoCircle,
    id: "info",
    minSize: { height: 380, width: 520 },
    title: "Info",
  },
];

export const APP_LOOKUP = DESKTOP_APPS.reduce(
  (lookup, app) => {
    lookup[app.id] = app;

    return lookup;
  },
  {} as Record<AppId, DesktopApp>,
);

export const INITIAL_ICON_POSITIONS: Record<AppId, WindowPosition> = {
  about: { x: 20, y: 50 },
  projects: { x: 20, y: 174 },
  contact: { x: 20, y: 295 },
  info: { x: 20, y: 416 },
};

export const DEFAULT_DESKTOP_SIZE: WindowSize = {
  height: 768,
  width: 1366,
};

export const ICON_LAYER_Z_INDEX = 300;
export const DESKTOP_ICON_WIDTH = 112;
export const DESKTOP_ICON_HEIGHT = 120;
export const ICON_GRID = {
  columnGap: 128,
  originX: 20,
  originY: 50,
  rowGap: 121,
};
export const TOP_BAR_HEIGHT = 42;
export const WINDOW_BASE_Z_INDEX = 600;
export const WINDOW_FRAME_MARGIN = 12;

export const INITIAL_HOME_WINDOW: DesktopWindowState = {
  appId: "about",
  bounds: {
    height: APP_LOOKUP.about.defaultSize.height,
    width: APP_LOOKUP.about.defaultSize.width,
    x: 140,
    y: 84,
  },
  id: "about",
  maximized: false,
  minSize: APP_LOOKUP.about.minSize,
  minimized: false,
  title: APP_LOOKUP.about.title,
  zIndex: WINDOW_BASE_Z_INDEX,
};

export const COMPANY_LOGO_SIZE = 56;
export const PROJECT_ASSOCIATION_LOGO_SIZE = 24;
export const TIMELINE_DOT_SIZE = 12;
export const TIMELINE_LINE_WIDTH = 2;
export const TIMELINE_TOP_OFFSET = 6;

export const PROJECTS: Project[] = [
  {
    company: "Elefin Indonesia",
    description: [
      "Enterprise B2B procurement platform built with React, Node.js, MongoDB, and PostgreSQL.",
      "Contributed to the platform's growth, delivering AI-powered search, procurement workflow automation, multilingual support (i18n), BirchStreet (Marriott Group) integration, PO Financing payment solution, reporting and analytics features, and AI-assisted Purchase Order processing.",
      "Participated in architecture planning, front-end modernization, and scalable platform development supporting enterprise procurement operations.",
    ],
    id: "elefin-2",
    logo: "/elefin.jpeg",
    name: "Elefin Buyer",
    period: "Aug 2021 - Present",
    projectUrl: "https://elefin.id",
    stacks: [
      "React",
      "TypeScript",
      "Vite",
      "Material UI",
      "MUI X Data Grid",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Router",
      "React Hook Form",
      "i18next",
      "Axios",
      "Socket.IO",
      "Chart.js",
      "Sentry",
      "Google Maps API",
      "Google OAuth",
      "CryptoJS",
      "ExcelJS",
      "PDFMake",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Sequelize",
      "Redis",
      "Elasticsearch",
      "RabbitMQ",
      "JWT",
      "Joi",
      "bcryptjs",
      "Cloudinary",
      "Mailgun",
    ],
  },
  {
    company: "Elefin Indonesia",
    description: [
      "Modernized Elefin's supplier-facing procurement platform, giving vendors a faster and more intuitive way to manage products, pricing, buyer coverage, orders, deliveries, payments, and company settings in one place.",
      "Expanded the platform with bulk catalog tools, managed-buyer checkout, PO Financing payment solution, performance analytics, and real-time notifications, helping suppliers handle high-volume daily operations with less manual work.",
      "Contributed across front-end and back-end development to deliver a scalable, reliable platform and a more consistent experience between suppliers and enterprise buyers.",
    ],
    id: "elefin-2-supplier",
    logo: "/elefin.jpeg",
    name: "Elefin Supplier",
    period: "Aug 2021 - Present",
    projectUrl: "https://supplier.elefin.id",
    stacks: [
      "React",
      "TypeScript",
      "Vite",
      "Material UI",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Router",
      "i18next",
      "Axios",
      "Pusher",
      "Chart.js",
      "Google Maps API",
      "Google OAuth",
      "CryptoJS",
      "XLSX",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Knex.js",
      "Objection.js",
      "MongoDB",
      "Mongoose",
      "Redis",
      "RabbitMQ",
      "Elasticsearch",
      "PostHog",
      "JWT",
      "Joi",
      "ExcelJS",
      "PDFMake",
      "Google Cloud Storage",
      "Rate Limiting",
    ],
  },
  {
    company: "Elefin Indonesia",
    description: [
      "Developed internal operational tools supporting procurement, transaction management, reporting, and platform administration.",
      "Delivered scalable features that improved operational visibility, streamlined business processes, and supported the growth of the Elefin procurement ecosystem.",
    ],
    id: "elefin-2-backoffice",
    logo: "/elefin.jpeg",
    name: "Elefin Backoffice",
    period: "Aug 2021 - Present",
    stacks: [
      "React",
      "Create React App",
      "JavaScript",
      "Bootstrap",
      "Redux Thunk",
      "Redux Persist",
      "React Router",
      "Socket.IO",
      "Chart.js",
      "Algolia",
      "React InstantSearch",
      "Google Maps API",
      "Google OAuth",
      "Axios",
      "CryptoJS",
      "ExcelJS",
      "XLSX",
      "PDF-lib",
      "React DnD",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "Redis",
      "JWT",
      "bcryptjs",
      "Mailgun",
      "Node Cron",
      "Rate Limiting",
      "Sentry",
    ],
  },
  {
    company: "Elefin Indonesia",
    description: [
      "Designed and developed an AI-powered Purchase Order upload feature that automates procurement workflows by converting scanned and digital PO documents into structured product suggestions for buyers.",
      "Engineered the service around Google Gemini with Joi and Zod-validated prompts, Sequelize-managed document storage, Bull-backed asynchronous processing, and scheduled cleanup of expired documents.",
      "Reduced manual data entry, shortened the time from PO receipt to a confirmed cart, and exposed internal and protected APIs consumed by Elefin clients to surface AI-driven product matches, delivery insights, and prompt orchestration.",
    ],
    id: "elefin-ai",
    logo: "/elefin.jpeg",
    name: "Elefin AI",
    period: "Jan 2025 - Present",
    stacks: [
      "Node.js",
      "TypeScript",
      "Express",
      "Google Gemini",
      "PostgreSQL",
      "Sequelize",
      "Redis",
      "Joi",
      "Nodemailer",
      "Node Cron",
      "PM2",
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Elefin Indonesia",
    employmentType: "Full-time",
    location: "Jakarta, Indonesia",
    logoSrc: "/elefin.jpeg",
    roles: [
      {
        bullets: [
          "Currently working in the development initiatives for the Elefin 3.0 UI revamp using modern front-end technologies and scalable architecture principles.",
          "Implemented internationalization (i18n) support to enable multilingual capabilities for broader market reach.",
          "Integrated third-party procurement systems, including BirchStreet Systems used by Marriott Group, to streamline enterprise procurement workflows.",
          "Developed in-house approval workflow features to simplify and accelerate procurement processes.",
          "Developed an AI-powered Purchase Order upload feature that generated intelligent product suggestions to improve procurement efficiency and reduce manual input during purchasing workflows.",
          "Collaborating with cross-functional teams and contributing to software development initiatives for sister company Pohon Dana Indonesia.",
        ],
        period: "Aug 2024 - Present",
        title: "Senior Software Engineer",
      },
      {
        bullets: [
          "Led early research and development initiatives for the Elefin 2.0 project, including software architecture planning and evaluation of modern technologies to support long-term scalability and maintainability.",
          "Contributed to the continued development and maintenance of Elefin 2.0, primarily focusing on front-end engineering using React.",
          "Integrated PayLater payment solutions with Pohon Dana Indonesia to improve transaction speed and enhance customer purchasing flexibility.",
          "Developed reporting and analytics features, including interactive graphs and transaction data export functionality.",
          "Implemented AI-powered search and discovery features to improve usability and support platform scalability.",
          "Worked closely with product and engineering teams to enhance user experience and support evolving business requirements.",
        ],
        period: "Aug 2021 - Jul 2024",
        title: "Software Engineer",
      },
    ],
  },
  {
    company: "Konvergen.AI",
    employmentType: "Internship",
    location: "Jakarta, Indonesia",
    logoSrc: "/konvergen_ai.jpeg",
    roles: [
      {
        bullets: [
          "Developed scalable front-end applications using React, Redux, and TypeScript.",
          "Contributed to back-end development using AdonisJS.",
          "Collaborated with senior engineers to debug, optimize, and improve application performance during development cycles.",
        ],
        period: "Oct 2019 - Jan 2020",
        title: "Software Engineer",
      },
    ],
  },
  {
    company: "Universitas Islam Negeri Syarif Hidayatullah Jakarta",
    location: "Tangerang Selatan",
    logoSrc: "/uin.jpeg",
    roles: [
      {
        bullets: [
          "Assisted in teaching the Data Structures and Algorithms course for undergraduate students.",
          "Supported students in understanding core programming concepts, algorithms, and problem-solving techniques.",
          "Selected for the role based on outstanding academic performance and recommendation from the previous assistant lecturer after achieving top results in the course.",
        ],
        period: "Jan 2018 - Jun 2018",
        title: "Assistant Lecturer",
      },
    ],
  },
];
