"use client";

import type { IListen } from "@/types/radio.types";
import { listenAction } from "@/action/listen/listen.action";
import useSWR from "swr";

export const useListenHook = ({ current, peak }: IListen) => {
  const { data } = useSWR("/radio/listen", listenAction, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    refreshInterval: 10000,
  });

  return {
    current: data?.current || current,
    peak: data?.peak || peak,
  };
};
