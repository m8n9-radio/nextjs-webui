"use client";

import type { FC } from "react";
import { Image } from "@heroui/image";

interface Props {
  streamTitle?: string | undefined;
  streamUrl?: string | undefined;
}

export const StreamUrl: FC<Readonly<Props>> = ({ streamTitle, streamUrl }) => {
  let src: string = streamUrl || "default.png";
  if (streamTitle === "Jingle - Thanks for listening") {
    src = "jingle.png";
  }

  return (
    <Image
      removeWrapper
      alt={streamTitle || "default"}
      className="z-0 w-full h-full object-cover rounded-none"
      src={src}
    />
  );
};
