import { motion } from "motion/react";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";

const EXAMPLES = [
  "An AI journaling app for Gen Z",
  "Sustainable sneakers from ocean plastic",
  "A productivity tool for indie hackers",
  "Cold brew for late-night creatives",
];

export function Hero({ onLaunch }: { onLaunch: (prompt: string) => void }) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (value.trim().length < 3) return;
    onLaunch(value.trim());
  };

  return (
    <section className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 pt-28 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-wide text-muted-foreground"
      >
        <span className="bg-emerald-glow size-1.5 rounded-full" />
        AI GTM Agent · Live
        <Sparkles className="size-3.5 text-violet" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05 }}
        className="font-display text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
      >
        Turn Any Product Into a{" "}
        <span className="text-gradient">Cultural Movement</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
      >
        AutoVibe discovers the perfect cultural hook and launches your brand
        with AI-powered storytelling — in under 30 seconds.
      </motion.p>

      {/* Console */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="relative mt-14 w-full max-w-3xl"
      >
        {/* glow ring */}
        <div className="absolute -inset-px rounded-3xl bg-brand opacity-60 blur-2xl" />
        <div className="glass-strong relative rounded-3xl p-2">
          <div className="flex items-center gap-3 rounded-2xl bg-black/40 px-5 py-4">
            <Wand2 className="size-5 shrink-0 text-violet" />
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Describe your product..."
              className="font-display flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground/60 md:text-xl"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={submit}
              className="bg-brand glow-violet group relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white"
            >
              Launch
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">Try:</span>
          {EXAMPLES.map((ex) => (
            <motion.button
              key={ex}
              whileHover={{ y: -2 }}
              onClick={() => setValue(ex)}
              className="glass rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {ex}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-20 grid w-full max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/60"
      >
        {[
          ["12.4k", "Campaigns shipped"],
          ["92%", "Avg vibe match"],
          ["27s", "Time to launch"],
        ].map(([n, l]) => (
          <div key={l} className="bg-card/40 px-6 py-5 backdrop-blur">
            <div className="font-display text-2xl">{n}</div>
            <div className="mt-1 text-xs text-muted-foreground">{l}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
