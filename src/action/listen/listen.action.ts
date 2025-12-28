"use server";

import type { IListen } from "@/types/radio.types";

export async function listenAction(): Promise<IListen> {
  try {
    const response = await fetch(
      `${process.env.APP_BACKEND_HOST}/radio/listen`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      return { current: -1, peak: -1 };
    }

    return await response.json();
  } catch {
    return { current: 0, peak: -1 };
  }
}
