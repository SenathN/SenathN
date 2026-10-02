"use client";

import dynamic from "next/dynamic";

const ArtViewerCanvas = dynamic(() => import("./ArtViewerCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square md:aspect-[4/3] bg-[var(--line)] rounded-sm animate-pulse" />
  ),
});

export default function ArtViewer({ models }: { models: string[] }) {
  return <ArtViewerCanvas models={models} />;
}
