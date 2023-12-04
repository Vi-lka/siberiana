"use client";

import { useEffect } from "react";

interface PersistForm<TData> {
  value: {
    data: TData;
  };
  localStorageKey: string;
  isLoading: boolean;
}

interface SavedData<TData> {
  key: string;
  data: TData[];
}

export function usePersistForm<TData>({
  value,
  localStorageKey,
  isLoading,
}: PersistForm<TData>) {
  useEffect(() => {
    if (!isLoading)
      localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey, isLoading]);

  return;
}

export function getSavedData<TData>({ data, key }: SavedData<TData>) {
  const storageData = localStorage.getItem(key);
  if (storageData) {
    const savedData = JSON.parse(storageData) as SavedData<TData>;
    return { data: savedData.data, restored: true };
  }

  return { data, restored: false };
}
