"use client";

import dynamic from "next/dynamic";

export const DynamicComponent = dynamic(
  () =>
    import("@/components/stream-player/player/player.component").then(
      (m) => m.PlayerComponent,
    ),
  {
    ssr: false,
  },
);

export const StreamPlayerComponent = () => {
  return <DynamicComponent />;
};
