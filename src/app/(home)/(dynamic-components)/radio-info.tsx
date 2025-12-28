import "server-only";

import type { FC } from "react";
import { cache } from "react";
import { PlayerWrapper } from "@/components/player/PlayerWrapper";
import type { IRadio } from "@/types/radio.types";

export const fetchRadioInfo = cache(async (): Promise<IRadio> => {
  const response = await fetch(`${process.env.APP_BACKEND_HOST}/radio/info`, {
    cache: "force-cache",
    next: { tags: ["/radio/info"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch radio info: ${response.status}`);
  }

  return await response.json();
});

export const DynamicRadioInfo: FC = async () => {
  const radioInfo = await fetchRadioInfo();

  return <PlayerWrapper radioInfo={radioInfo} />;
};
