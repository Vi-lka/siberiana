import type { LocationEnum } from "@siberiana/schemas";

export function getIds(values: { id: string; displayName: string }[]) {
  const ids = values.map((value) => value.id);
  return ids;
}

export function getLocation(
  location: {
    id: string;
    type: LocationEnum;
    displayName: string;
  } | null,
  target: LocationEnum,
) {
  if (!location) return undefined;

  switch (location.type) {
    case "country":
      if (target === "country") return location.id;
      return undefined;

    case "region":
      if (target === "region") return location.id;
      return undefined;

    case "district":
      if (target === "district") return location.id;
      return undefined;

    case "settlement":
      if (target === "settlement") return location.id;
      return undefined;

    case "location":
      if (target === "location") return location.id;
      return undefined;

    default:
      return undefined;
  }
}

export function clearLocation(
  location: {
    id: string;
    type: LocationEnum;
    displayName: string;
  } | null,
  target: LocationEnum,
) {
  if (!location) return true;

  switch (location.type) {
    case "country":
      if (target === "country") return undefined;
      return true;

    case "region":
      if (target === "region") return undefined;
      return true;

    case "district":
      if (target === "district") return undefined;
      return true;

    case "settlement":
      if (target === "settlement") return undefined;
      return true;

    case "location":
      if (target === "location") return undefined;
      return true;

    default:
      return undefined;
  }
}

export function clearObject(
  object: {
    id: string;
    displayName: string;
  } | null,
) {
  if (!object || !object.id || object.id.length === 0) return true;
  else false;
}

export function clearDate(date: Date | string | null | undefined) {
  if (!date || new Date(date).toISOString().length === 0) return true;
  else false;
}

export function handleArrays(
  newValues: {
    id: string;
    displayName: string;
  }[],
  oldValues: {
    id: string;
    displayName: string;
  }[],
) {
  const addValues = newValues
    .map((item) => {
      return item.id;
    })
    .filter((id) => {
      // includes() doesn't work with object, so we do this:
      const contains = oldValues.some((elem) => elem.id === id);
      if (!contains) {
        return id;
      }
    });
  const removeValues = oldValues
    .map((item) => {
      return item.id;
    })
    .filter((id) => {
      // includes() doesn't work with object, so we do this:
      const contains = newValues.some((elem) => elem.id === id);
      if (!contains) {
        return id;
      }
    });
  return { addValues, removeValues };
}
