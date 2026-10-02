"use client";

import { useState } from "react";
import { site } from "../../content/site";

const colorMap: Record<string, { bg: string; text: string }> = {
  violet: { bg: "#6B4DFF", text: "#F5F3FF" },
  inkTint: { bg: "#1D1650", text: "#F5F3FF" },
  lilac: { bg: "#C4BAFF", text: "#0F0C24" },
  deepViolet: { bg: "#4630D0", text: "#F5F3FF" },
};

export default function RangeAccordion() {
  const [openId, setOpenId] = useState<string>(site.range[0].id);

  return (
    <div
      className="flex flex-col md:flex-row w-full h-auto md:h-[520px] border border-[var(--line)] overflow-hidden rounded-sm"
      role="list"
    >
      {site.range.map((panel) => {
        const isOpen = openId === panel.id;
        const colors = colorMap[panel.color];
        return (
          <div
            key={panel.id}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-controls={`panel-${panel.id}`}
            onClick={() => setOpenId(panel.id)}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) setOpenId(panel.id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenId(panel.id);
              }
            }}
            className="relative flex-1 cursor-pointer transition-[flex-grow] duration-500 ease-out flex md:items-end items-start p-6 min-h-[88px] md:min-h-0"
            style={{
              flexGrow: isOpen ? 6 : 1,
              backgroundColor: colors.bg,
              color: colors.text,
            }}
          >
            <div
              id={`panel-${panel.id}`}
              className="w-full flex flex-col justify-end h-full"
            >
              <span
                className={`font-display text-2xl md:text-3xl transition-[writing-mode] ${
                  isOpen ? "" : "md:[writing-mode:vertical-rl] md:rotate-180"
                }`}
              >
                {panel.title}
              </span>
              {isOpen && (
                <div className="mt-4 max-w-sm">
                  <p className="font-display text-xl md:text-2xl italic mb-4">
                    {panel.statement}
                  </p>
                  <ul className="flex flex-wrap gap-2 text-sm">
                    {panel.tools.map((tool) => (
                      <li
                        key={tool}
                        className="border rounded-full px-3 py-1"
                        style={{ borderColor: colors.text + "55" }}
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
