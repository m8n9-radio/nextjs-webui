"use server";

import type { IStatistic } from "@/types/statistic.types";

export async function statisticsAction(): Promise<IStatistic[]> {
  try {
    const response = await fetch(`${process.env.APP_BACKEND_HOST}/statistics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      console.error("Failed to fetch statistics:", response.status);
      return [];
    }

    const data = await response.json();
    const statistics = data.statistics || [];

    return statistics.map((stat: IStatistic) => ({
      ...stat,
      tracks: stat.tracks || [],
    }));
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return [];
  }
}
