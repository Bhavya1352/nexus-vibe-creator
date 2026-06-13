import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Hero } from "@/components/autovibe/Hero";
import { Processing } from "@/components/autovibe/Processing";
import { Results } from "@/components/autovibe/Results";
import { Nav } from "@/components/autovibe/Nav";
import { Particles } from "@/components/autovibe/Particles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoVibe — AI GTM Agent" },
      {
        name: "description",
        content:
          "AutoVibe turns any product into a cultural movement with AI-powered storytelling, vibe detection, and instant launch campaigns.",
      },
      { property: "og:title", content: "AutoVibe — AI GTM Agent" },
      {
        property: "og:description",
        content:
          "Turn any product into a cultural movement. AI-powered campaigns in under 30 seconds.",
      },
    ],
  }),
  component: Index,
});

type View = "hero" | "processing" | "results";

function Index() {
  const [view, setView] = useState<View>("hero");
  const [prompt, setPrompt] = useState("");

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="ring-grid pointer-events-none absolute inset-0" />
      <Particles />
      <Nav />

      <AnimatePresence mode="wait">
        {view === "hero" && (
          <motion.div
            key="hero"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Hero
              onLaunch={(p) => {
                setPrompt(p);
                setView("processing");
              }}
            />
          </motion.div>
        )}
        {view === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Processing onDone={() => setView("results")} />
          </motion.div>
        )}
        {view === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Results
              prompt={prompt}
              onReset={() => {
                setPrompt("");
                setView("hero");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
