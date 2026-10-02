"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DotWave = dynamic(() => import("./DotWave"), { ssr: false });

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saveData = (navigator as { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || !supportsWebGL()) return;
    const load = () => setReady(true);
    if ("requestIdleCallback" in window) window.requestIdleCallback(load, { timeout: 1200 });
    else setTimeout(load, 200);
  }, []);

  return ready ? <DotWave /> : null;
}
