'use client'

import { VisualizerHero } from "@/components/visualizer";
import { Leva } from "leva";

export default function Home() {
  return (
    <>
      <VisualizerHero />
      <Leva hidden />
    </>
  );
}
