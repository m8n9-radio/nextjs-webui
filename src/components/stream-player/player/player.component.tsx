"use client";

import { Button } from "@heroui/button";
import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Slider } from "@heroui/slider";
import { useEffect } from "react";
import { usePlayerHook } from "@/components/stream-player/player/player.hook";
import { PlayerSkeletonComponent } from "@/components/stream-player/player/player-skeleton.component";
import { ThemeSwitchComponent } from "@/components/theme-switch/theme-switch.component";
import { PauseIcon, PlayIcon } from "@/icons/player.icon";

const DEFAULT_TITLE = process.env.NEXT_PUBLIC_RADIO_NAME || "Radio Station";

export const PlayerComponent = () => {
  const {
    isPlaying,
    volume,
    isLoading,
    error,
    toggle,
    handleVolumeChange,
    icyMetadata,
  } = usePlayerHook();

  useEffect(() => {
    if (icyMetadata?.StreamTitle) {
      document.title = `${icyMetadata.StreamTitle} - ${DEFAULT_TITLE}`;
    } else {
      document.title = DEFAULT_TITLE;
    }
  }, [icyMetadata?.StreamTitle]);

  if (error && !isLoading) {
    return (
      <div className="z-0 w-xs h-xs flex flex-col items-center justify-center bg-default-100 gap-4 p-4">
        <p className="text-danger text-center">{error}</p>
        <Button color="primary" onPress={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <PlayerSkeletonComponent />;
  }

  return (
    <Card isFooterBlurred radius="sm" className="relative w-full h-full">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <ThemeSwitchComponent />
      </CardHeader>
      <Image
        removeWrapper
        width={320}
        height={320}
        radius="sm"
        alt={icyMetadata?.StreamTitle || "Radio player cover"}
        className="z-0 w-full object-cover h-auto p-1"
        src={icyMetadata?.StreamUrl || "/vinil.png"}
      />
      <CardFooter className="bg-blend-darken/80 bottom-0 z-10 flex-col items-start gap-2">
        <output
          className="text-tiny text-shadow-black text-center font-bold w-full"
          aria-live="polite"
        >
          {icyMetadata?.StreamTitle || "No track information"}
        </output>
        <div className="flex w-full items-center gap-3">
          <Slider
            size="sm"
            color="foreground"
            step={25}
            maxValue={100}
            minValue={0}
            value={volume}
            onChange={(value) => handleVolumeChange(value as number)}
            className="flex-1"
            aria-label="Volume control"
            aria-valuetext={`Volume ${volume}%`}
            isDisabled={isLoading}
          />
          <Button
            isIconOnly
            onPress={toggle}
            color="default"
            size="md"
            variant="solid"
            isDisabled={isLoading || !!error}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
