"use client";

import Image from "next/image";
import { GL } from "./gl";

const episode = {
  episodeNumber: "Episode 04",
  bookTitle: "Atomic Habits",
  author: "James Clear",
  hook: "Tiny changes. Remarkable results. Practical systems that compound.",
  takeaways: ["Habit architecture", "1% daily gains", "Identity-first goals"],
  coverSrc: "/visualizer/atomic-habits.jpg",
};

export function VisualizerHero() {
  return (
    <section className="relative isolate h-svh w-full overflow-hidden text-white">
      <GL hovering={false} />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-1/4 h-64 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-6 pb-12 pt-10 sm:px-12 lg:px-20">

        <div className="mt-12 grid w-full flex-1 grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[1.05fr_0.85fr] lg:gap-12 xl:mx-auto xl:max-w-6xl">
          <div className="flex flex-col justify-center gap-6">
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

            <div className="flex flex-wrap gap-6 font-mono text-[0.75rem] uppercase tracking-[0.5em] text-foreground/70">
              <div>
                <p className="text-xl tracking-[0.35em] text-white">{episode.episodeNumber}</p>
              </div>
            </div>

            <div className="inline-flex flex-col self-start rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] text-foreground/70 backdrop-blur">
              <p className="text-white/80">KEY IDEAS</p>
              <div className="mt-3 flex flex-wrap gap-3 text-[0.65rem] normal-case tracking-[0.2em]">
                {episode.takeaways.map((item) => (
                  <span key={item} className="rounded-full border border-white/20 px-3 py-1 text-foreground/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-[260px] sm:w-[340px] lg:w-[380px]">
              <div className="absolute inset-0 rounded-[2.25rem] bg-primary/20 blur-[110px]" aria-hidden />
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

      </div>
    </section>
  );
}
