"use client";

import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export const PlayerSkeletonComponent = () => {
  return (
    <Card isFooterBlurred radius="sm" className="relative w-full h-full">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <Skeleton className="w-14 h-8 rounded-full" />
      </CardHeader>

      <Skeleton className="z-0 w-full h-[320px] rounded-sm m-1" />

      <CardFooter className="bg-blend-darken/80 bottom-0 z-10 flex-col items-start gap-2">
        <Skeleton className="w-3/4 h-4 rounded-lg mx-auto" />

        <div className="flex w-full items-center gap-3">
          <Skeleton className="flex-1 h-6 rounded-lg" />
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>
      </CardFooter>
    </Card>
  );
};
