"use client";

import React from "react";

import { Button, Dialog, DialogContent, DialogTrigger } from "@siberiana/ui";

import Scene from "../3d-model/Scene";

export default function Open3DModel({
  data,
}: {
  data: {
    id: string;
    displayName: string;
    fileURL: string;
  } | null;
}) {
  if (data === null) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={data.fileURL.length === 0}
          className="font-Inter hover:bg-beaver hover:text-beaverLight dark:bg-accent dark:text-beaverLight dark:hover:text-darkBlue dark:hover:bg-beaverLight rounded-3xl px-4 py-6 font-normal uppercase"
        >
          <p>
            <span className="hidden lg:inline">Посмотреть в</span> 3D
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80vh] max-w-7xl md:w-[80vw]">
        <Scene fileSrc={data.fileURL} environmentPreset="warehouse" />
      </DialogContent>
    </Dialog>
  );
}
