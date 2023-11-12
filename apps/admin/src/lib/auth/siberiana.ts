"use client";

import { useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

export const siberiana = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SIBERIANA_API_URL,
});

siberiana.interceptors.request.use(async (config) => {
  const session = await getSession();
  config.headers.Authorization = `Bearer ${session?.access_token}`;
  return config;
});

export const putObjects = ({
  bucket,
  files,
  folder,
}: {
  bucket?: string;
  files: File[];
  folder?: string;
}) => {
  const formData = new FormData();

  files.map((file) => formData.append("file", file));

  return siberiana.post<{ urls: Array<string> }>("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      bucket,
      folder,
    },
  });
};

export const usePutObjects = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const upload = async ({
    bucket,
    files,
    folder,
  }: {
    bucket?: string;
    files: File[];
    folder?: string;
  }) => {
    setIsLoading(true);
    const formData = new FormData();

    files.map((file) => formData.append("file", file));

    return siberiana.post<{ urls: Array<string> }>("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        bucket,
        folder,
      },
      onUploadProgress: (progressEvent) => {
        const progress = !!progressEvent.total
          ? (progressEvent.loaded / progressEvent.total) * 100
          : 0;
        setProgress(progress);
      },
    });
  };

  return { upload, progress, isLoading };
};
