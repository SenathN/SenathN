"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

type Props = {
  models: string[]; // filenames under /public/art
};

export default function ArtViewerCanvas({ models }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const current = models[index];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const elMaybe = containerRef.current;
    if (!elMaybe || !visible) return;
    const el: HTMLDivElement = elMaybe;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 4);

    const rimLight = new THREE.DirectionalLight(0xa08dff, 1.2);
    rimLight.position.set(-2, 1, 2);
    scene.add(rimLight);
    scene.add(new THREE.AmbientLight(0x1d1650, 1.4));

    const duotoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x1d1650,
      emissive: 0x6b4dff,
      emissiveIntensity: 0.15,
      roughness: 0.4,
      metalness: 0.1,
    });

    const group = new THREE.Group();
    scene.add(group);

    let disposed = false;
    let activeGeometry: THREE.BufferGeometry[] = [];

    function clearGroup() {
      group.clear();
      activeGeometry.forEach((g) => g.dispose());
      activeGeometry = [];
    }

    function frameObject(object: THREE.Object3D) {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3()).length() || 1;
      const center = box.getCenter(new THREE.Vector3());
      object.position.sub(center);
      const scale = 1.6 / size;
      object.scale.setScalar(scale);
    }

    if (current) {
      const loader = new GLTFLoader();
      loader.load(
        `/art/${current}`,
        (gltf) => {
          if (disposed) return;
          clearGroup();
          gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = duotoneMaterial;
              activeGeometry.push(child.geometry);
            }
          });
          frameObject(gltf.scene);
          group.add(gltf.scene);
        },
        undefined,
        () => {
          // fall back to placeholder on load error
          if (disposed) return;
          const geo = new THREE.TorusKnotGeometry(0.8, 0.26, 150, 20);
          activeGeometry.push(geo);
          group.add(new THREE.Mesh(geo, duotoneMaterial));
        }
      );
    } else {
      const geo = new THREE.TorusKnotGeometry(0.8, 0.26, 150, 20);
      activeGeometry.push(geo);
      group.add(new THREE.Mesh(geo, duotoneMaterial));
    }

    function resize() {
      const { clientWidth, clientHeight } = el;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let dragging = false;
    let lastX = 0;
    let rotVelocity = 0;

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      rotVelocity = dx * 0.005;
      group.rotation.y += rotVelocity;
    }
    function onPointerUp() {
      dragging = false;
    }
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let raf = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animate() {
      raf = requestAnimationFrame(animate);
      if (!dragging) {
        rotVelocity *= 0.95;
        group.rotation.y += rotVelocity + (reducedMotion ? 0 : 0.0025);
      }
      renderer.render(scene, camera);
      if (reducedMotion && !dragging) {
        cancelAnimationFrame(raf);
      }
    }
    raf = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      clearGroup();
      duotoneMaterial.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [visible, current]);

  const name = current ? current.replace(/\.(glb|gltf)$/i, "").replace(/[-_]/g, " ") : "Procedural form";

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={containerRef}
        role="img"
        aria-label={`Interactive 3D viewer showing ${name}. Drag to rotate.`}
        className="w-full aspect-square md:aspect-[4/3] bg-[var(--line)] rounded-sm"
      />
      <div className="flex items-center justify-between text-sm text-[var(--muted)]">
        <span className="font-body">{name}</span>
        {models.length > 1 && (
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous model"
              onClick={() => setIndex((i) => (i - 1 + models.length) % models.length)}
              className="border border-[var(--line)] rounded-full px-3 py-1 hover:border-[var(--accent)]"
            >
              Prev
            </button>
            <button
              type="button"
              aria-label="Next model"
              onClick={() => setIndex((i) => (i + 1) % models.length)}
              className="border border-[var(--line)] rounded-full px-3 py-1 hover:border-[var(--accent)]"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
