"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const RibbonsCanvas = dynamic(() => import("./RibbonsCanvas"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reducedMotion || saveData || !supportsWebGL()) return;

    const load = () => setReady(true);
    if ("requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(load);
    } else {
      setTimeout(load, 200);
    }
  }, []);

  if (!ready) return null;
  return <RibbonsCanvas />;
}
