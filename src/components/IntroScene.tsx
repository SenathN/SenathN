"use client";

import { Camera } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';


const IntroScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene, Renderer
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    // Set renderer size and append to DOM
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Load GLTF/GLB Model
    const loader = new GLTFLoader();
    loader.load(
      'disabled', // Path to your model
      // 'models/main.glb', // Path to your model
      (gltf) => {
        const camera :THREE.Camera = gltf.cameras[0];
        const model = gltf.scene;

        gltf.scene.children
        scene.add(model);

        // If the model has animations
        const mixer = new THREE.AnimationMixer(model);

        if (gltf.animations.length > 0) {
          const animations :THREE.AnimationAction[] = gltf.animations.map((anim, index) => {
            const action = mixer.clipAction(anim); 
            action.play();

            return action;
          });
        }

        // Animation Loop (with model animations)
        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);

          const delta = clock.getDelta(); // Get time difference for smooth animation
          mixer.update(delta); // Update animations

          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Position Camera
    // camera.position.z = 5;

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;

      // Update camera aspect ratio and projection matrix
      // camera.aspect = window.innerWidth / window.innerHeight;
      // camera.updateProjectionMatrix();

      // Resize renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    // const animate = () => {
    //   requestAnimationFrame(animate);
    //   cube.rotation.z += 0.01;
    //   cube.rotation.y += 0.01;
    //   renderer.render(scene, camera);
    // };
    // animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      while (mountRef.current?.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default IntroScene;