# Portfolio OS

A responsive, operating-system-inspired portfolio for software engineer Naufal
Ardhi. The desktop experience presents portfolio sections as draggable,
resizable application windows, while the mobile experience adapts the same
visual identity into a touch-first app launcher.

## Highlights

### Desktop experience

- Draggable desktop shortcuts with grid snapping and selection states
- Independent, resizable application windows constrained below the status bar
- Familiar minimize, maximize, restore, focus, and close interactions
- High-contrast dock for open apps
- Active-window and running-app indicators
- Dark-red grid wallpaper, glass status bar, and live clock

### Mobile experience

- Touch-friendly home-screen launcher
- Consistent status chrome and icon styling
- Focused, scrollable app views with in-app back navigation
- Responsive content designed specifically for smaller screens

### Portfolio apps

- **About** — LinkedIn-inspired profile header, professional summary,
  experience timeline, and services
- **Projects** — Selected work, responsibilities, technology stacks, and
  external project links
- **Talk to Me** — Contact form that prepares an email in the visitor's mail
  client
- **Info** — Context-aware guidance for the desktop and mobile experiences

## Technology stack

- [Next.js 15](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI 7](https://mui.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [react-rnd](https://github.com/bokuweb/react-rnd) for resizable windows
- [react-draggable](https://github.com/react-grid-layout/react-draggable) for
  desktop shortcuts
- [Tabler Icons](https://tabler.io/icons)

## Getting started

### Requirements

- Node.js 24 or later
- [pnpm](https://pnpm.io/)

This repository uses `pnpm-lock.yaml` as its dependency lockfile. Use pnpm for
installation and scripts to keep dependency resolution consistent.

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
pnpm build
```

The project uses `output: "export"` in `next.config.ts`, so the production build
is emitted as a static site in the `out/` directory.

## Available scripts

| Command                  | Description                                            |
| ------------------------ | ------------------------------------------------------ |
| `pnpm dev`               | Start the local development server                     |
| `pnpm dev:staging`       | Start development using the staging app environment    |
| `pnpm dev:production`    | Start development using the production app environment |
| `pnpm build`             | Create the static production build                     |
| `pnpm build:development` | Build using the development app environment            |
| `pnpm build:staging`     | Build using the staging app environment                |
| `pnpm build:production`  | Build using the production app environment             |
| `pnpm lint`              | Run ESLint and apply automatic fixes                   |

## Project structure

```text
public/
  fonts/                 Local Poppins font files
  stack-icons/           Technology icons
  banner.jpeg            About profile banner
  naufal.jpeg            Profile photo
src/
  app/
    components/          Portfolio apps, windows, and mobile launcher
    globals.css          Global styles, fonts, and design tokens
    layout.tsx           Root application layout
    page.tsx             Desktop shell and window state management
  components/providers/  Theme, language, and store providers
  libs/
    constants/user.ts    Portfolio content and desktop configuration
    interfaces/          Shared TypeScript interfaces
    theme/               Material UI theme configuration
```

## Updating portfolio content

Most portfolio data is centralized in
[`src/libs/constants/user.ts`](src/libs/constants/user.ts):

- `DESKTOP_APPS` controls the available applications and default window sizes.
- `PROJECTS` contains project descriptions, links, periods, and technology
  stacks.
- `EXPERIENCES` contains the professional experience timeline.
- Desktop shortcut positions and window constants are maintained in the same
  file.

Profile and company images are stored in `public/`. App-specific presentation
is located in `src/app/components/`.

## Deployment

### Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Keep the framework preset set to **Next.js**.
4. Configure `pnpm install --frozen-lockfile` as the install command and
   `pnpm build` as the build command.

Vercel will create preview deployments for branches and a production deployment
for the configured production branch.

### Other static hosts

Run `pnpm build`, then deploy the generated `out/` directory to any static
hosting provider, such as Cloudflare Pages, Netlify, GitHub Pages, or an Nginx
server.

## Contact behavior

The Talk to Me app uses a `mailto:` link. Submitting the form opens the
visitor's configured email application with a prepared subject and message. No
server, database, or environment secret is required for the current contact
workflow.
