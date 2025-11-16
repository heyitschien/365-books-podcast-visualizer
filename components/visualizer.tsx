"use client";

import Image from "next/image";
import { GL } from "./gl";
import { useAudioAnalyser } from "@/hooks/use-audio-analyser";
import { Waveform } from "./waveform";

const episode = {
  episodeNumber: "Episode 04",
  bookTitle: "Atomic Habits",
  author: "James Clear",
  hook: "Tiny changes. Remarkable results. Practical systems that compound.",
  takeaways: ["Habit architecture", "1% daily gains", "Identity-first goals"],
  coverSrc: "/visualizer/atomic-habits.jpg",
};

export function VisualizerHero() {
  const { levels, energy, isPlaying, ready, play, pause } = useAudioAnalyser(
    "/assets/audio/1-minute-syntesizer-test.wav"
  );

  const handleToggle = async () => {
    if (!ready && !isPlaying) {
      return;
    }
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  return (
    <section className="relative isolate h-svh w-full overflow-hidden text-white">
      <GL hovering={false} energy={energy} />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-1/4 h-64 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-6 pb-12 pt-10 sm:px-12 lg:px-20">

        <div className="mt-12 grid w-full flex-1 grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[1.05fr_0.85fr] lg:gap-12 xl:mx-auto xl:max-w-6xl">
          <div className="flex flex-col justify-center gap-6 xl:-ml-16">
            <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.65em]">
              <span className="text-primary/80">365 Books</span>
              <span className="text-foreground/50">Podcast</span>
            </div>

            <div className="space-y-5">
              <h1 className="font-sentient text-[clamp(2.8rem,5vw,4.9rem)] leading-[1.05]">
                {episode.bookTitle}
              </h1>
              <p className="font-sentient text-lg text-foreground/70">by {episode.author}</p>
              <p className="text-base text-foreground/80 sm:text-lg lg:max-w-xl">
                {episode.hook}
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggle}
              disabled={!ready && !isPlaying}
              className="inline-flex items-center gap-4 self-start rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-mono uppercase tracking-[0.35em] text-foreground/70 backdrop-blur transition disabled:opacity-60 disabled:cursor-not-allowed"
              aria-pressed={isPlaying}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white">
                {isPlaying ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="3" height="8" fill="currentColor" />
                    <rect x="7" y="2" width="3" height="8" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 2.5L11 7L3 11.5V2.5Z" fill="currentColor" />
                  </svg>
                )}
              </span>
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[0.7rem] tracking-[0.5em] text-foreground/60">
                  {ready || isPlaying ? (isPlaying ? "Pause" : "Play") : "Loading"}
                </span>
                <span className="text-base tracking-[0.4em] text-white">Episode 04</span>
              </div>
            </button>

            <div className="mt-6 space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-foreground/60">
                Key Ideas
              </p>
              <ul className="space-y-2 text-base text-foreground/80">
                {episode.takeaways.map((item) => (
                  <li key={item} className="list-inside list-disc text-white/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-[260px] sm:w-[340px] lg:w-[380px]">
              <div className="absolute inset-0 rounded-[2.25rem] bg-primary/20 blur-[140px]" aria-hidden />
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,_rgba(214,168,90,0.22)_0%,_rgba(0,0,0,0)_70%)] blur-[120px]" aria-hidden />
              <div className="relative border border-white/10 bg-black/20 p-4 shadow-[0_35px_120px_rgba(0,0,0,0.85)]">
                <Image
                  src={episode.coverSrc}
                  alt={`${episode.bookTitle} book cover`}
                  width={663}
                  height={1000}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <p className="pointer-events-none absolute inset-x-0 top-1/3 text-center text-[min(22vw,400px)] font-sentient uppercase leading-none text-white/5 blur-sm">
          Podcast
        </p>

        <Waveform levels={levels} />
      </div>
    </section>
  );
}
