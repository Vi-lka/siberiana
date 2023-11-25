"use client";

import React, { Suspense } from "react";
import { CameraControls, Center, Environment, Gltf } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Loader2 } from "lucide-react";

type Scene = {
  fileSrc: string;
  environmentPreset?:
    | "apartment"
    | "city"
    | "dawn"
    | "forest"
    | "lobby"
    | "night"
    | "park"
    | "studio"
    | "sunset"
    | "warehouse"
    | undefined;
};

export default function Scene(props: Scene) {
  return (
    <div className="z-50 flex items-center justify-center">
      <Suspense
        fallback={
          <div className="font-Inter flex flex-col items-center justify-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin" />
            <p>Загрузка...</p>
          </div>
        }
      >
        <Canvas>
          {/* <Bounds fit clip damping={6} margin={1.2}> */}
          <Center>
            <Gltf src={props.fileSrc} receiveShadow castShadow />
          </Center>
          {/* </Bounds> */}

          <CameraControls />
          <Environment preset={props.environmentPreset} blur={1} />
        </Canvas>
      </Suspense>
    </div>
  );
}
