"use client";

import { Switch } from "@heroui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/icons/theme.icon";
import { cn } from "@/libs/cn.lib";

export const ThemeSwitchComponent = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-14 h-8 bg-default-200 rounded-full animate-pulse"
        aria-hidden="true"
      />
    );
  }

  return (
    <Switch
      defaultSelected
      color="default"
      size="lg"
      isSelected={theme === "light"}
      onValueChange={(isSelected) => setTheme(isSelected ? "light" : "dark")}
      endContent={<SunIcon className="w-4 h-4" />}
      startContent={<MoonIcon className="w-4 h-4" />}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={cn("w-4 h-4", className)} />
        ) : (
          <MoonIcon className={cn("w-4 h-4", className)} />
        )
      }
      aria-label="Toggle theme"
    />
  );
};
