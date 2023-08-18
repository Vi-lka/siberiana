import "server-only";

import type { DictionaryType } from "@siberiana/schemas";

const dictionary = () => import("../static/dictionaries/ru.json").then(
  (module) => module.default,
) as Promise<DictionaryType>

export const getDictionary = async () =>
dictionary();
