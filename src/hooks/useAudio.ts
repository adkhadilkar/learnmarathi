import { useState, useCallback, useEffect } from 'react';
import { playClip, stopAudio } from '../lib/speak';

/**
 * Plays a bundled audio clip and tracks playback state. If the clip can't be
 * loaded it falls back to speaking `fallbackText` so the button is never silent.
 * Only one clip plays at a time across the app.
 */
export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback((src: string, fallbackText?: string) => {
    playClip(src, fallbackText ?? '', 0.85, {
      onPlay: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
    });
  }, []);

  const stop = useCallback(() => {
    stopAudio();
    setIsPlaying(false);
  }, []);

  // Stop playback when the component using this hook unmounts.
  useEffect(() => () => setIsPlaying(false), []);

  return { play, stop, isPlaying };
}
