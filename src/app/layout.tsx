import type { Metadata } from "next";

import "./globals.css";

import AppThemeProvider from "components/providers/AppThemeProvider";
import LanguageProvider from "components/providers/LanguageProvider";
import StoreProvider from "components/providers/StoreProvider";

export const metadata: Metadata = {
  title: "Naufal Ardhi",
  description: "My Portfolio App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppThemeProvider>
          <LanguageProvider>
            <StoreProvider>{children}</StoreProvider>
          </LanguageProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
