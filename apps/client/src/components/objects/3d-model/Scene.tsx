"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Center, Environment, Gltf } from '@react-three/drei'
import { Loader2 } from 'lucide-react'

type Scene = {
  fileSrc: string;
  environmentPreset?: "apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse" | undefined
}

export default function Scene(props: Scene) {
  return (
    <div className='flex items-center justify-center z-50'>
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center font-Inter">
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          <p>Загрузка...</p>
        </div>
      }>
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
  )
}
