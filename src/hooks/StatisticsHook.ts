"use client";

import useSWR from "swr";
import type { IStatistic } from "@/types/statistic.types";
import { statisticsAction } from "@/action/statistics/statistics.action";

export const useStatisticsHook = (initialData: readonly IStatistic[]) => {
  const { data } = useSWR("/statistics", statisticsAction, {
    fallbackData: initialData,
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    refreshInterval: 60000,
  });

  return data || initialData;
};
