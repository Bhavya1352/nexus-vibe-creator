import { Sparkles } from "lucide-react";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 pt-5">
      <nav className="glass flex items-center gap-6 rounded-full px-5 py-2.5">
        <div className="flex items-center gap-2">
          <div className="bg-brand glow-violet flex size-7 items-center justify-center rounded-lg">
            <Sparkles className="size-3.5 text-white" />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight">
            AutoVibe
          </span>
        </div>
        <div className="hidden items-center gap-5 text-xs text-muted-foreground md:flex">
          <a className="hover:text-foreground" href="#">Product</a>
          <a className="hover:text-foreground" href="#">Vibes</a>
          <a className="hover:text-foreground" href="#">Pricing</a>
          <a className="hover:text-foreground" href="#">Docs</a>
        </div>
        <button className="bg-brand rounded-full px-3.5 py-1.5 text-xs font-medium text-white">
          Sign in
        </button>
      </nav>
    </header>
  );
}
