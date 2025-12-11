import type { IcyMetadata } from "icecast-metadata-player";

export interface PlayerState {
  isPlaying: boolean;
  volume: number;
  isLoading: boolean;
  error: string | null;
  icyMetadata?: IcyMetadata;
}

export interface PlayerControls {
  toggle: () => void;
  handleVolumeChange: (value: number) => void;
}

export type UsePlayerHook = PlayerState & PlayerControls;
