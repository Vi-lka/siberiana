"use client"

import { useEffect } from "react";

interface PersistForm<TContent> {
    value: {
        data: TContent
    },
    localStorageKey: string,
    isLoading: boolean,
}

interface SavedData<TContent, TData> {
    key: string
    data: TContent[] & TData[]
}

export function usePersistForm<TContent> ({
    value,
    localStorageKey,
    isLoading,
}: PersistForm<TContent>) {
    useEffect(() => {
      if (!isLoading) localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value, localStorageKey, isLoading]);
  
    return;
}

export function getSavedData<TContent, TData>({
    data, 
    key
}:  SavedData<TContent, TData>) {
    const storageData = localStorage.getItem(key);
    if (storageData) {
        const savedData = JSON.parse(storageData) as SavedData<TContent, TData>
        return { data: savedData.data, restored: true };
    }

    return { data, restored: false };
}