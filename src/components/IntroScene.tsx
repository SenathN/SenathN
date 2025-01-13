'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

interface GLTFResult extends GLTF {
    nodes: Record<string, THREE.Object3D>;
    materials: Record<string, THREE.Material>;
}

const Model: React.FC = () => {
    const { scene, animations } = useGLTF('/model.glb') as unknown as GLTFResult;
    const modelRef = useRef<THREE.Group>(null);

    // Play animations if available
    useFrame((state, delta) => {
        if (modelRef.current) {
        modelRef.current.rotation.y += delta * 0.5; // Example rotation
        }
    });

    return <primitive ref={modelRef} object={scene} />;
};

const IntroScene: React.FC = () => {
    return (
      <div className="w-full h-screen">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Model />
          <OrbitControls />
        </Canvas>
      </div>
    );
  };

export default IntroScene;