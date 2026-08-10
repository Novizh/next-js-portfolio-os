import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { loadLanguages } from "./i18nLoader";

const initializeI18n = async () => {
  const resources = await loadLanguages();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "en",
    lng: "en",
    defaultNS: "translation",
    interpolation: { escapeValue: false },
  });
};

initializeI18n();

export default i18n;
