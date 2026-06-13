import { motion } from "motion/react";
import {
  Copy,
  Share2,
  Download,
  Sparkles,
  Megaphone,
  Rocket,
  Brain,
  TrendingUp,
  Users,
  Heart,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

interface ResultsProps {
  prompt: string;
  onReset: () => void;
}

const VIBE = {
  name: "Poetic Resonance",
  confidence: 92,
  reasoning:
    "Your product sits at the intersection of quiet ambition and Gen-Z self-mythology. We're seeing strong cultural signal in slow-living, journaling rituals, and 'soft launch' aesthetics on TikTok.",
};

const PERSONA = {
  name: "The Quiet Builder",
  age: "22–31",
  traits: ["Introspective", "Aesthetic-driven", "Anti-hustle", "Ritualistic"],
};

const EMOTIONS = [
  { label: "Belonging", value: 88 },
  { label: "Self-discovery", value: 81 },
  { label: "Calm", value: 74 },
  { label: "Aspiration", value: 69 },
];

const SIGNALS = [
  "#softlaunch — 2.1B views",
  "Phoebe Bridgers ambient resurgence",
  "'Romanticize your life' microtrend",
  "Rise of journaling-as-aesthetic",
];

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1400);
      }}
      className="glass inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <Copy className="size-3" />
      {done ? "Copied" : "Copy"}
    </button>
  );
}

function ConfidenceRing({ value }: { value: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative size-28">
      <svg className="-rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={r}
          stroke="oklch(1 0 0 / 0.08)"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          stroke="url(#grad)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.68 0.22 295)" />
            <stop offset="50%" stopColor="oklch(0.72 0.2 230)" />
            <stop offset="100%" stopColor="oklch(0.78 0.18 165)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-semibold">{value}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          match
        </span>
      </div>
    </div>
  );
}

function Radar({ values }: { values: number[] }) {
  const cx = 100;
  const cy = 100;
  const max = 85;
  const points = values
    .map((v, i) => {
      const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
      const r = (v / 100) * max;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 200 200" className="size-full">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <circle
          key={s}
          cx={cx}
          cy={cy}
          r={max * s}
          fill="none"
          stroke="oklch(1 0 0 / 0.06)"
        />
      ))}
      {values.map((_, i) => {
        const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + max * Math.cos(angle)}
            y2={cy + max * Math.sin(angle)}
            stroke="oklch(1 0 0 / 0.06)"
          />
        );
      })}
      <motion.polygon
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        points={points}
        fill="url(#radarGrad)"
        stroke="oklch(0.72 0.2 230)"
        strokeWidth="1.5"
      />
      <defs>
        <radialGradient id="radarGrad">
          <stop offset="0%" stopColor="oklch(0.68 0.22 295 / 0.6)" />
          <stop offset="100%" stopColor="oklch(0.72 0.2 230 / 0.1)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Results({ prompt, onReset }: ResultsProps) {
  const headline = "Write the life you want to read about.";
  const subtitle =
    "A pocket-sized journaling ritual that turns ordinary days into your own quiet mythology.";
  const adHook =
    "POV: it's 11:47pm, you open your journal, and your AI co-author already knows the shape of today.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto max-w-7xl px-6 py-24"
    >
      {/* Header */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Campaign · Generated for
          </div>
          <h2 className="font-display max-w-2xl text-2xl text-foreground/90 md:text-3xl">
            &ldquo;{prompt}&rdquo;
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="glass inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3.5" /> New campaign
          </button>
          <button className="glass inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
            <Share2 className="size-3.5" /> Share
          </button>
          <button className="bg-brand glow-violet inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium text-white">
            <Download className="size-3.5" /> Export PDF
          </button>
        </div>
      </div>

      {/* Vibe hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-10"
      >
        <div className="bg-brand pointer-events-none absolute -top-32 right-0 size-96 rounded-full opacity-30 blur-3xl" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-xs text-violet">
              <Sparkles className="size-3" /> Detected Vibe
            </div>
            <h3 className="font-display text-5xl font-semibold leading-none md:text-6xl">
              <span className="text-brand">{VIBE.name}</span>
            </h3>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              <Brain className="mr-2 inline size-4 text-violet" />
              {VIBE.reasoning}
            </p>
          </div>
          <ConfidenceRing value={VIBE.confidence} />
        </div>
      </motion.div>

      {/* Bento */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Landing copy */}
        <BentoCard
          icon={<Sparkles className="size-4" />}
          label="Landing Page Copy"
          delay={0.15}
        >
          <div className="font-display text-xl leading-tight">{headline}</div>
          <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-5">
            <CopyBtn text={`${headline}\n\n${subtitle}`} />
          </div>
        </BentoCard>

        {/* Ad creative */}
        <BentoCard
          icon={<Megaphone className="size-4" />}
          label="Ad Creative"
          delay={0.22}
        >
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Hook Script
          </div>
          <p className="font-display mt-2 text-base leading-snug">{adHook}</p>
          <div className="mt-4 rounded-xl border border-border/60 bg-black/30 p-3 text-xs text-muted-foreground">
            <span className="text-foreground">Visual:</span> Dim bedside lamp,
            handwritten page filling itself in soft cursive, lo-fi piano fade.
          </div>
          <div className="mt-4">
            <CopyBtn text={adHook} />
          </div>
        </BentoCard>

        {/* Launch strategy */}
        <BentoCard
          icon={<Rocket className="size-4" />}
          label="Launch Strategy"
          delay={0.29}
        >
          <div className="text-sm">
            Seed 12 micro-creators in the &ldquo;soft launch&rdquo; niche with
            pre-filled journals. Let the artifact spread before the brand does.
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <Stat label="Expected reach" value="1.4M" />
            <Stat label="Viral angle" value="Artifact > ad" />
          </div>
        </BentoCard>
      </div>

      {/* Insights row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        {/* Persona */}
        <BentoCard
          icon={<Users className="size-4" />}
          label="Audience Persona"
          delay={0.35}
        >
          <div className="font-display text-xl">{PERSONA.name}</div>
          <div className="text-xs text-muted-foreground">
            Age {PERSONA.age}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {PERSONA.traits.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">
            Cultural Signals
          </div>
          <ul className="mt-2 space-y-1.5 text-sm">
            {SIGNALS.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="bg-emerald-glow size-1.5 rounded-full" />
                {s}
              </li>
            ))}
          </ul>
        </BentoCard>

        {/* Emotions */}
        <BentoCard
          icon={<Heart className="size-4" />}
          label="Emotional Drivers"
          delay={0.42}
        >
          <ul className="mt-1 space-y-3">
            {EMOTIONS.map((e, i) => (
              <li key={e.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span>{e.label}</span>
                  <span className="text-muted-foreground">{e.value}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${e.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="bg-brand h-full"
                  />
                </div>
              </li>
            ))}
          </ul>
        </BentoCard>

        {/* Radar */}
        <BentoCard
          icon={<TrendingUp className="size-4" />}
          label="Trend Alignment"
          delay={0.49}
        >
          <div className="-mt-2 aspect-square">
            <Radar values={EMOTIONS.map((e) => e.value)} />
          </div>
          <div className="mt-2 text-center text-xs text-muted-foreground">
            Cross-platform cultural fit
          </div>
        </BentoCard>
      </div>
    </motion.section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="font-display mt-1 text-base">{value}</div>
    </div>
  );
}

function BentoCard({
  icon,
  label,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="glass group relative overflow-hidden rounded-2xl p-6 transition-shadow hover:shadow-[0_30px_80px_-20px_oklch(0.68_0.22_295_/_0.35)]"
    >
      <div className="bg-brand pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity group-hover:opacity-20" />
      <div className="relative">
        <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <span className="text-violet">{icon}</span>
          {label}
        </div>
        {children}
      </div>
    </motion.div>
  );
}
