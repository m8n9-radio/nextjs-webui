"use client";

import type { FC } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { User } from "@heroui/user";
import type { IStatistic } from "@/types/statistic.types";
import { useStatisticsHook } from "@/hooks/StatisticsHook";
import { getIconComponent } from "@/icons/statistic.icon";

interface Props {
  statistics: Readonly<IStatistic[]>;
}

export const Statistics: FC<Readonly<Props>> = ({ statistics: initialData }) => {
  const statistics = useStatisticsHook(initialData);

  return (
    <Tabs
      aria-label="statistics"
      color="primary"
      variant="bordered"
      fullWidth
      className="pt-4"
      items={statistics.concat()}
    >
      {(statistic) => {
        const Icon = getIconComponent(statistic.icon);
        return (
          <Tab
            key={statistic.key}
            isDisabled={statistic.tracks.length === 0}
            title={<Icon className="w-4 h-4" />}
          >
            <Table
              aria-label="Tracks"
              classNames={{ wrapper: "p-0", base: "h-80" }}
              fullWidth
              hideHeader
            >
              <TableHeader>
                <TableColumn>Track</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody items={statistic.tracks.concat()}>
                {(track) => (
                  <TableRow key={track.id}>
                    <TableCell>
                      <User
                        avatarProps={{
                          radius: "lg",
                          src: track.cover,
                          size: "md",
                          alt: track.title,
                        }}
                        name={track.title}
                      />
                    </TableCell>
                    <TableCell align="right">123</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Tab>
        );
      }}
    </Tabs>
  );
};
