"use client";

import type { FC } from "react";
import { useListenHook } from "@/hooks/ListenHook";

interface Props {
  current: number;
  peak: number;
}

export const Listen: FC<Props> = (props) => {
  const { current, peak } = useListenHook(props);

  return (
    <div className="absolute p-1.5 z-1 right-4 top-4 bg-foreground-400/60 rounded-2xl backdrop-blur">
      <div>
        <p className="text-sm font-thin">
          {current} / {peak}
        </p>
      </div>
    </div>
  );
};
