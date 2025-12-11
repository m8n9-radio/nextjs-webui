import type { Metadata } from "next";

import { getEnvVar } from "./env.lib";

export const metadata = (): Metadata => {
  const radioName = getEnvVar("NEXT_PUBLIC_RADIO_NAME", "Radio Station");
  const description = `Listen to ${radioName} - Live streaming radio`;

  return {
    title: radioName,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title: radioName,
      description,
      type: "website",
      siteName: radioName,
    },
    twitter: {
      card: "summary",
      title: radioName,
      description,
    },
  };
};
