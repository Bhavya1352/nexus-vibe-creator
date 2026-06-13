import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

const STEPS = [
  "Product Analysis",
  "Audience Detection",
  "Cultural Trend Mapping",
  "Emotional Hook Discovery",
  "Vibe Selection",
  "Campaign Generation",
];

export function Processing({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 750);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <section className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 py-20">
      {/* Neural orb */}
      <div className="relative mb-12 size-64">
        <div className="bg-brand absolute inset-0 rounded-full opacity-40 blur-3xl" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-violet/40"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-neon/40"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="border-emerald-glow/40 absolute inset-8 rounded-full border"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-brand glow-violet size-16 rounded-full"
          />
        </div>
        {/* Orbiting nodes */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 size-2 rounded-full bg-white shadow-[0_0_12px_white]"
            style={{
              transform: `rotate(${deg}deg) translateX(120px)`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <h2 className="font-display mb-2 text-3xl font-medium md:text-4xl">
        <span className="text-gradient">AutoVibe is thinking</span>
      </h2>
      <p className="mb-12 text-sm text-muted-foreground">
        Synthesizing cultural intelligence in real time
      </p>

      <div className="glass-strong w-full max-w-xl rounded-2xl p-2">
        <ul className="divide-y divide-border/40">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li
                key={label}
                className="flex items-center gap-4 px-5 py-3.5 text-sm"
              >
                <div
                  className={`flex size-7 items-center justify-center rounded-full border transition-all ${
                    done
                      ? "border-emerald-glow/60 bg-emerald-glow/10 text-emerald-glow"
                      : active
                        ? "border-violet/60 bg-violet/10 text-violet"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : active ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <span className="text-[10px]">{i + 1}</span>
                  )}
                </div>
                <span
                  className={`flex-1 transition-colors ${
                    done
                      ? "text-foreground"
                      : active
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {active && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 0.7 }}
                    className="bg-brand h-0.5 rounded-full"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
