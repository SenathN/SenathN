"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Vertex shader: displaces each strand with layered sine fields.
// uTime drives idle drift, uVelocity adds scroll-driven speed, uPointer
// shifts the phase slightly toward the cursor position.
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uVelocity;
  uniform float uPointer;
  attribute float aStrand; // which strand (0..N-1), encodes phase + alpha
  attribute float aU; // 0..1 position along the strand
  varying float vStrand;
  varying float vU;

  void main() {
    vStrand = aStrand;
    vU = aU;

    float k = aStrand;
    float envelope = sin(aU * 3.14159265);
    float phase = k * 0.11 + uPointer * 0.6;
    float speed = uTime * (0.4 + uVelocity * 2.0);

    float y = position.y
      + sin(aU * 6.2831 * 1.3 + speed + phase) * envelope * 0.24
      + sin(aU * 6.2831 * 2.7 + speed * 1.6 + phase * 1.7) * envelope * 0.06;

    vec3 pos = vec3(position.x, y, position.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader: single colour ramp across x, alpha fades by strand index
// so far strands read as softer / more distant.
const fragmentShader = /* glsl */ `
  precision mediump float;
  varying float vStrand;
  varying float vU;
  uniform float uStrandCount;

  vec3 ramp(float t) {
    vec3 c0 = vec3(0.275, 0.188, 0.816); // #4630D0
    vec3 c1 = vec3(0.420, 0.302, 1.0);   // #6B4DFF
    vec3 c2 = vec3(0.627, 0.553, 1.0);   // #A08DFF
    vec3 c3 = vec3(0.863, 0.835, 1.0);   // #DCD5FF
    if (t < 0.4) return mix(c0, c1, t / 0.4);
    if (t < 0.75) return mix(c1, c2, (t - 0.4) / 0.35);
    return mix(c2, c3, (t - 0.75) / 0.25);
  }

  void main() {
    vec3 color = ramp(vU);
    float alpha = mix(0.66, 0.16, vStrand / uStrandCount);
    gl_FragColor = vec4(color, alpha);
  }
`;

function buildGeometry(strandCount: number, segments: number) {
  const positions: number[] = [];
  const strandAttr: number[] = [];
  const uAttr: number[] = [];
  const indices: number[] = [];

  let vertOffset = 0;
  for (let s = 0; s < strandCount; s++) {
    const yBase = 0; // displaced in shader; baseline handled by instance y offset below
    const spread = (s - strandCount / 2) * 0.01;
    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      const x = u * 2 - 1; // -1..1 plane space
      positions.push(x, yBase + spread, 0);
      strandAttr.push(s);
      uAttr.push(u);
    }
    for (let i = 0; i < segments; i++) {
      indices.push(vertOffset + i, vertOffset + i + 1);
    }
    vertOffset += segments + 1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aStrand", new THREE.Float32BufferAttribute(strandAttr, 1));
  geometry.setAttribute("aU", new THREE.Float32BufferAttribute(uAttr, 1));
  geometry.setIndex(indices);
  return geometry;
}

type Quality = { strands: number; segments: number; dpr: number };

export default function RibbonsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  // A ref (not state) so visibility changes pause/resume the render loop
  // without tearing down and rebuilding the scene — rebuilding on every
  // IntersectionObserver flip was resetting uTime and snapping the
  // animation back to its start on every scroll.
  const visibleRef = useRef(false);

  useEffect(() => {
    const elMaybe = containerRef.current;
    if (!elMaybe) return;
    const el: HTMLDivElement = elMaybe;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // no WebGL — poster stays visible underneath
    }

    const quality: Quality = { strands: 34, segments: 220, dpr: Math.min(window.devicePixelRatio, 2) };

    renderer.setPixelRatio(quality.dpr);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const geometry = buildGeometry(quality.strands, quality.segments);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uVelocity: { value: 0 },
        uPointer: { value: 0.5 },
        uStrandCount: { value: quality.strands },
      },
      transparent: true,
      depthTest: false,
    });

    const lines = new THREE.LineSegments(geometry, material);
    scene.add(lines);

    function resize() {
      const { clientWidth, clientHeight } = el;
      renderer.setSize(clientWidth, clientHeight, false);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let pointerX = 0.5;
    let targetPointer = 0.5;
    function onPointerMove(e: PointerEvent) {
      const rect = el.getBoundingClientRect();
      targetPointer = (e.clientX - rect.left) / rect.width;
    }
    window.addEventListener("pointermove", onPointerMove);

    let velocity = 0;
    let lastScrollY = window.scrollY;
    function onScroll() {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      velocity = Math.min(Math.abs(dy) / 40, 1);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let frames = 0;
    let frameTimeSum = 0;
    let lastTime = performance.now();
    let hidden = document.hidden;

    function onVisibility() {
      hidden = document.hidden;
    }
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(el);

    function animate(t: number) {
      raf = requestAnimationFrame(animate);
      if (hidden || !visibleRef.current) return;
      const dt = t - lastTime;
      lastTime = t;

      // Adaptive quality: sample first second of frame times.
      if (frames < 60) {
        frameTimeSum += dt;
        frames++;
        if (frames === 60 && frameTimeSum / 60 > 24) {
          renderer.setPixelRatio(Math.min(quality.dpr, 1));
        }
      }

      pointerX += (targetPointer - pointerX) * 0.05;
      velocity *= 0.92;

      material.uniforms.uTime.value = reducedMotion ? 0 : t * 0.0005;
      material.uniforms.uVelocity.value = velocity;
      material.uniforms.uPointer.value = pointerX;

      renderer.render(scene, camera);
      if (reducedMotion) {
        cancelAnimationFrame(raf);
      }
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
