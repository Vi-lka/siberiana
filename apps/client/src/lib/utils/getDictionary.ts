import "server-only";

import type { DictionaryType } from "@siberiana/schemas";

interface DictionariesType {
  ru: () => Promise<DictionaryType>;
  en: () => Promise<DictionaryType>;
}

const dictionaries = {
  ru: () =>
    import("../static/dictionaries/ru.json").then(
      (module) => module.default,
    ) as Promise<DictionaryType>,
  en: () =>
    import("../static/dictionaries/en.json").then(
      (module) => module.default,
    ) as Promise<DictionaryType>,
} as DictionariesType;

export const getDictionary = async (locale: string) =>
  dictionaries[locale as keyof DictionariesType]();
