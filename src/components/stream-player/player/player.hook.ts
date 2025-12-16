"use client";

import IcecastMetadataPlayer, {
  type IcyMetadata,
} from "icecast-metadata-player";
import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYER_DEFAULTS, PLAYER_MESSAGES } from "@/constants/player.constants";

const STREAM_URL = process.env.NEXT_PUBLIC_STREAM_DNS;

export const usePlayerHook = () => {
  const playerRef = useRef<IcecastMetadataPlayer | null>(null);
  const isInitialized = useRef<boolean>(false);
  const isMountedRef = useRef<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(PLAYER_DEFAULTS.VOLUME);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [icyMetadata, setIcyMetadata] = useState<IcyMetadata | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!STREAM_URL || STREAM_URL === "") {
      setError(PLAYER_MESSAGES.ERROR_CONFIG);
      setIsLoading(false);
      return;
    }

    isMountedRef.current = true;
    if (isInitialized.current) {
      return;
    }
    isInitialized.current = true;

    const handleMetadata = (metadata: IcyMetadata) => {
      if (isMountedRef.current) {
        console.log(metadata);
        setIcyMetadata(metadata);
        setIsLoading(false);
        setError(null);
      }
    };

    const handleError = () => {
      if (isMountedRef.current) {
        setError(PLAYER_MESSAGES.ERROR_STREAM_LOAD);
        setIsLoading(false);
      }
    };

    const handleAbort = () => {
      console.warn("Audio loading aborted");
    };

    const handleStalled = () => {
      console.warn("Audio loading stalled");
    };

    playerRef.current = new IcecastMetadataPlayer(STREAM_URL, {
      onMetadata: handleMetadata,
      metadataTypes: ["icy"],
    });

    const audioElement = playerRef.current.audioElement;
    if (audioElement) {
      audioElement.addEventListener("error", handleError);
      audioElement.addEventListener("abort", handleAbort);
      audioElement.addEventListener("stalled", handleStalled);
    }

    const startPlaying = async () => {
      try {
        if (playerRef.current && isMountedRef.current) {
          // Start muted to bypass autoplay restrictions
          playerRef.current.audioElement.muted = true;
          playerRef.current.audioElement.volume = PLAYER_DEFAULTS.VOLUME / 100;
          await playerRef.current.play();
          if (isMountedRef.current) {
            setIsPlaying(false); // User needs to click play to unmute
          }
        }
      } catch {
        if (isMountedRef.current) {
          setError(PLAYER_MESSAGES.ERROR_PLAYBACK);
          setIsLoading(false);
        }
      }
    };

    startPlaying();

    return () => {
      isMountedRef.current = false;
      const audioEl = playerRef.current?.audioElement;
      if (audioEl) {
        audioEl.removeEventListener("error", handleError);
        audioEl.removeEventListener("abort", handleAbort);
        audioEl.removeEventListener("stalled", handleStalled);
      }
      if (playerRef.current) {
        try {
          playerRef.current.stop();
          playerRef.current.detachAudioElement();
        } catch (e) {
          console.error("Error cleaning up player:", e);
        }
      }
      isInitialized.current = false;
    };
  }, []);

  const toggle = useCallback(() => {
    if (!playerRef.current?.audioElement) return;

    const audioElement = playerRef.current.audioElement;
    const newPlayingState = !isPlaying;

    // Toggle mute instead of play/pause to bypass autoplay restrictions
    audioElement.muted = !newPlayingState;
    setIsPlaying(newPlayingState);
  }, [isPlaying]);

  const handleVolumeChange = useCallback(
    (value: number) => {
      if (!playerRef.current?.audioElement) return;

      const volumeValue = value / 100;
      playerRef.current.audioElement.volume = volumeValue;
      setVolume(value);

      // Unmute when user adjusts volume
      if (value > 0 && !isPlaying) {
        playerRef.current.audioElement.muted = false;
        setIsPlaying(true);
      }
    },
    [isPlaying],
  );

  return {
    isPlaying,
    volume,
    isLoading,
    error,
    icyMetadata,
    toggle,
    handleVolumeChange,
  };
};
