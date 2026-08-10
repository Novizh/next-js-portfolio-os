export const loadTranslations = async (lang: string) => {
  const index = await import(`./${lang}/index.json`);
  const dashboard = await import(`./${lang}/dashboard.json`);

  return {
    ...index.default,
    ...dashboard.default,
  };
};

export const loadLanguages = async () => {
  const languages = ["en", "id"];
  const resources: Record<string, any> = {};

  for (const lang of languages) {
    resources[lang] = { translation: await loadTranslations(lang) };
  }

  return resources;
};
