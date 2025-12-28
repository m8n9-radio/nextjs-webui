"use client";

import type { FC } from "react";

interface Props {
  isLoading: boolean;
  streamTitle?: string | undefined;
}

export const StreamTitile: FC<Readonly<Props>> = ({
  isLoading,
  streamTitle,
}) => {
  if (isLoading) {
    return (
      <div className="w-48 h-5 rounded-lg bg-default-200 dark:bg-default-100 animate-pulse" />
    );
  }

  return <h4 className="font-medium w-full truncate">{streamTitle || "_"}</h4>;
};
