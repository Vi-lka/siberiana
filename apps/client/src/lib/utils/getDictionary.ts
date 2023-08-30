import "server-only";

import type { Dictionary } from "@siberiana/schemas";

const dictionary = () => import("../static/dictionaries/ru.json").then(
  (module) => module.default,
) as Promise<Dictionary>

export const getDictionary = async () =>
dictionary();
