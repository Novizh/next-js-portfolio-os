// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/libs/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ================= PRIMARY ================= */
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          DEFAULT: "var(--color-primary-500)",
        },

        /* ================= SECONDARY ================= */
        secondary: {
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
          400: "var(--color-secondary-400)",
          500: "var(--color-secondary-500)",
          600: "var(--color-secondary-600)",
          700: "var(--color-secondary-700)",
          800: "var(--color-secondary-800)",
          900: "var(--color-secondary-900)",
          DEFAULT: "var(--color-secondary-500)",
        },

        /* ================= SUCCESS ================= */
        success: {
          100: "var(--color-success-100)",
          200: "var(--color-success-200)",
          300: "var(--color-success-300)",
          400: "var(--color-success-400)",
          500: "var(--color-success-500)",
          600: "var(--color-success-600)",
          700: "var(--color-success-700)",
          800: "var(--color-success-800)",
          900: "var(--color-success-900)",
          DEFAULT: "var(--color-success-500)",
        },

        /* ================= WARNING ================= */
        warning: {
          100: "var(--color-warning-100)",
          200: "var(--color-warning-200)",
          300: "var(--color-warning-300)",
          400: "var(--color-warning-400)",
          500: "var(--color-warning-500)",
          600: "var(--color-warning-600)",
          700: "var(--color-warning-700)",
          800: "var(--color-warning-800)",
          900: "var(--color-warning-900)",
          DEFAULT: "var(--color-warning-500)",
        },

        /* ================= ERROR ================= */
        error: {
          100: "var(--color-error-100)",
          200: "var(--color-error-200)",
          300: "var(--color-error-300)",
          400: "var(--color-error-400)",
          500: "var(--color-error-500)",
          600: "var(--color-error-600)",
          700: "var(--color-error-700)",
          800: "var(--color-error-800)",
          900: "var(--color-error-900)",
          DEFAULT: "var(--color-error-500)",
        },

        /* ================= GREY ================= */
        grey: {
          100: "var(--color-grey-100)",
          200: "var(--color-grey-200)",
          300: "var(--color-grey-300)",
          400: "var(--color-grey-400)",
          500: "var(--color-grey-500)",
          600: "var(--color-grey-600)",
          700: "var(--color-grey-700)",
          800: "var(--color-grey-800)",
          900: "var(--color-grey-900)",
          DEFAULT: "var(--color-grey-500)",
        },

        /* ================= EXTRA ================= */
        extra: {
          main: "var(--color-extra-main)",

          action: {
            hover: "var(--color-extra-action-hover)",
            selected: "var(--color-extra-action-selected)",
          },

          divider: "var(--color-extra-divider)",

          disabled: {
            bg: "var(--color-extra-disabled-bg)",
          },

          outline: {
            border: "var(--color-extra-outline-border)",
          },

          input: {
            border: "var(--color-extra-input-border)",
          },

          backdrop: {
            overlay: "var(--color-extra-backdrop-overlay)",
          },
        },

        /* ================= CUSTOM ================= */
        custom: {
          body: {
            bg: "var(--color-custom-body-bg)",
          },
          paper: {
            bg: "var(--color-custom-paper-bg)",
          },
          chat: {
            bg: "var(--color-custom-chat-bg)",
          },
          track: {
            bg: "var(--color-custom-track-bg)",
          },
          grey: {
            light: "var(--color-custom-grey-light)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
