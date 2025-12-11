export const PLAYER_DEFAULTS = {
  VOLUME: 50,
  VOLUME_STEP: 25,
  MIN_VOLUME: 0,
  MAX_VOLUME: 100,
} as const;

export const PLAYER_MESSAGES = {
  ERROR_STREAM_LOAD: "Failed to load audio stream",
  ERROR_PLAYBACK: "Failed to start playback. Click play to try again.",
  ERROR_CONFIG: "Stream URL not configured",
  NO_TRACK_INFO: "No track information",
  LOADING: "Loading...",
} as const;
