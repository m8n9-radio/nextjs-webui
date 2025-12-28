import type { FC } from "react";
import { Statistics } from "@/components/statistics/Statistics";
import { statisticsAction } from "@/action/statistics/statistics.action";

export const DynamicStatistics: FC = async () => {
  const statistics = await statisticsAction();

  return <Statistics statistics={statistics} />;
};
