"use client";

import { useEffect, useRef, useState } from "react";

const BUCKETS = 48;

const createEmptyBuckets = () => Array.from({ length: BUCKETS }, () => 0);

type AudioAnalyserState = {
  levels: number[];
  energy: number;
  isPlaying: boolean;
  ready: boolean;
  play: () => Promise<void>;
  pause: () => void;
};

export function useAudioAnalyser(src: string): AudioAnalyserState {
  const [levels, setLevels] = useState<number[]>(createEmptyBuckets);
  const [energy, setEnergy] = useState(0);
  const [ready, setReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !src) {
      return;
    }

    const setup = async () => {
      if (audioRef.current) {
        return;
      }

      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audio = new Audio(src);
      audio.loop = true;
      audio.crossOrigin = "anonymous";
      audio.preload = "auto";

      const source = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyser.connect(context.destination);
      analyserRef.current = analyser;
      audioRef.current = audio;
      contextRef.current = context;
      sourceRef.current = source;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const bucketSize = Math.max(1, Math.floor(bufferLength / BUCKETS));

      const update = () => {
        if (!analyserRef.current) {
          return;
        }

        analyserRef.current.getByteFrequencyData(dataArray);

        const buckets = createEmptyBuckets();
        let sumAll = 0;

        for (let i = 0; i < BUCKETS; i++) {
          let bucketSum = 0;
          const start = i * bucketSize;
          for (let j = 0; j < bucketSize; j++) {
            const index = start + j;
            if (index < dataArray.length) {
              bucketSum += dataArray[index];
            }
          }
          const bucketAverage = bucketSum / bucketSize / 255;
          buckets[i] = bucketAverage;
          sumAll += bucketAverage;
        }

        setLevels(buckets);
        setEnergy(sumAll / BUCKETS);
        rafRef.current = window.requestAnimationFrame(update);
      };

      rafRef.current = window.requestAnimationFrame(update);
      setReady(true);
    };

    setup();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      analyserRef.current?.disconnect();
      sourceRef.current?.disconnect();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (contextRef.current?.state !== "closed") {
        contextRef.current?.close();
      }
      audioRef.current = null;
      contextRef.current = null;
      sourceRef.current = null;
      setReady(false);
      setIsPlaying(false);
    };
  }, [src]);

  const play = async () => {
    try {
      if (!audioRef.current || !contextRef.current) return;
      if (contextRef.current.state === "suspended") {
        await contextRef.current.resume();
      }
      audioRef.current.muted = false;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn("Unable to start audio", error);
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return { levels, energy, isPlaying, ready, play, pause };
}
