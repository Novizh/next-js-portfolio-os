"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";

import i18n from "libs/locales/i18n";
import Loading from "app/loading";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setReady(true);
    } else {
      const handleInitialized = () => setReady(true);

      i18n.on("initialized", handleInitialized);

      return () => {
        i18n.off("initialized", handleInitialized);
      };
    }
  }, []);

  if (!ready) return <Loading />;

  return (
    <I18nextProvider key={i18n.language} i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
