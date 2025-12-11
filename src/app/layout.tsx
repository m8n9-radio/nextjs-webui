import "@/assets/globals.css";

import type { ReactNode } from "react";
import { cn } from "@/libs/cn.lib";
import { fontOnest } from "@/libs/font.lib";
import { Providers } from "@/provider";

interface Props {
  children: Readonly<ReactNode>;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen">
      <body className={cn("antialiased h-screen", fontOnest.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
