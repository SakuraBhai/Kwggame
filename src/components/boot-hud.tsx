import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Check } from "lucide-react";

const DURATION_MS = 3500;

const CHECKS = [
  { label: "Identity Verification", at: 0.14 },
  { label: "Server Handshake", at: 0.34 },
  { label: "Encryption Layer", at: 0.58 },
  { label: "Device Trust", at: 0.8 },
] as const;

const TRACE = [38, 52, 44, 70, 48, 62, 40, 78, 55, 68, 42, 72];

function formatClock(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-md border border-border/80 bg-panel/80 ${className}`}>
      {children}
    </div>
  );
}

export function BootHud() {
  const [now, setNow] = useState<Date | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const started = performance.now();
    let frame = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - started) / DURATION_MS);
      setProgress(p);
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    setNow(new Date());
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(clock);
    };
  }, []);

  const pct = Math.min(100, Math.round(progress * 100));
  const lock = Math.min(4, 1 + Math.floor(progress * 4));
  const signal = (98.4 + progress * 0.5).toFixed(1);
  const temp = (42.4 + progress * 0.5).toFixed(1);

  const bars = useMemo(
    () =>
      TRACE.map((h, i) => ({
        h,
        delay: `${(i * 0.11).toFixed(2)}s`,
      })),
    [],
  );

  return (
    <div className="relative flex h-dvh w-full justify-center overflow-hidden bg-bg text-fg">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 28%, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 52%)",
        }}
        aria-hidden
      />
      <div className="hud-scanlines pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col px-4 pb-5 pt-3">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-[1.35rem] font-bold leading-none tracking-wide text-primary">
              KWG PANNEL
            </h1>
            <p className="mt-1.5 text-[10px] tracking-[0.28em] text-muted">
              KWG PANNEL
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] tracking-[0.18em] text-muted">
            <span className="pulse-dot size-1.5 rounded-full bg-primary" style={{ animation: "pulse-dot 1.1s ease-in-out infinite" }} />
            CONNECTING
          </div>
        </header>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <Stat label="LOCAL TIME" value={now ? formatClock(now) : "--:--:--"} unit="UTC+5:30" />
          <Stat label="SIGNAL INTEGRITY" value={signal} unit="%" />
          <Stat label="CORE TEMP" value={temp} unit="°C" />
        </div>

        <div className="relative mx-auto mt-2 grid size-[220px] place-items-center">
          <Radar progress={progress} />
        </div>

        <Panel className="px-3 pb-2 pt-2">
          <div className="mb-1 flex items-center justify-between text-[10px] tracking-[0.22em] text-muted">
            <span>NEURAL TRACE</span>
            <span className="text-primary">LIVE</span>
          </div>
          <div className="flex h-14 items-end gap-1">
            {bars.map((b, i) => (
              <div
                key={i}
                className="bar-live w-full origin-bottom rounded-[1px] bg-primary"
                style={{
                  height: `${b.h}%`,
                  animation: `bar-live ${1.2 + (i % 4) * 0.15}s ease-in-out ${b.delay} infinite`,
                }}
              />
            ))}
          </div>
        </Panel>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <Panel className="px-3 py-2">
            <div className="mb-2 flex items-center justify-between text-[10px] tracking-[0.2em] text-muted">
              <span>UPLINK</span>
              <span className="text-primary">STABLE</span>
            </div>
            <div className="flex h-10 items-end gap-1.5">
              {[32, 48, 62, 78, 94].map((h, i) => (
                <div
                  key={h}
                  className="w-4 rounded-[1px] bg-primary"
                  style={{
                    height: `${Math.min(h, 20 + progress * 90)}%`,
                    opacity: 0.45 + i * 0.12,
                  }}
                />
              ))}
            </div>
          </Panel>
          <Panel className="flex flex-col items-center justify-center px-3 py-2">
            <div className="mb-1 flex w-full items-center justify-between text-[10px] tracking-[0.2em] text-muted">
              <span>TARGET LOCK</span>
              <span className="text-primary">
                {String(lock).padStart(2, "0")} / 04
              </span>
            </div>
            <Crosshair />
          </Panel>
        </div>

        <div className="mt-3 flex items-center justify-between px-1 text-[10px] tracking-[0.24em] text-muted">
          <span className="flex gap-1.5">
            <i className="size-1.5 rounded-full bg-primary" />
            <i className="size-1.5 rounded-full bg-border" />
            <i className="size-1.5 rounded-full bg-border" />
            <i className="size-1.5 rounded-full bg-border" />
          </span>
          <span>SYSTEM_CHECK</span>
        </div>

        <ul className="mt-2 space-y-1.5">
          {CHECKS.map((c) => {
            const ok = progress >= c.at;
            return (
              <li
                key={c.label}
                className={`flex min-h-10 items-center justify-between rounded-lg border px-3 text-sm ${
                  ok
                    ? "border-primary/40 bg-primary/15 text-fg"
                    : "border-border bg-surface/60 text-muted"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`grid size-5 place-items-center rounded-full border ${
                      ok ? "border-primary bg-primary text-bg" : "border-muted"
                    }`}
                  >
                    {ok ? <Check className="size-3" strokeWidth={3} /> : null}
                  </span>
                  {c.label}
                </span>
                <span className="text-[10px] tracking-[0.18em]">
                  {ok ? "OK" : "PENDING"}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-3">
          <div className="mb-1.5 flex items-end justify-between text-[10px] tracking-[0.22em]">
            <span className="text-muted">INITIALIZING CORE</span>
            <span className="text-xl font-bold leading-none text-primary">{pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <Panel className="px-2 py-2">
      <p className="text-[9px] tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-1 text-[15px] font-bold leading-none text-primary">
        {value}
        <span className="ml-1 text-[9px] font-normal text-muted">{unit}</span>
      </p>
    </Panel>
  );
}

function Radar({ progress }: { progress: number }) {
  return (
    <div className="relative size-full">
      <div className="absolute inset-0 rounded-full border border-primary/25" />
      <div className="absolute inset-[12%] rounded-full border border-dashed border-primary/30" />
      <div className="absolute inset-[28%] rounded-full border border-primary/20" />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, rgb(125 255 42 / 0.12) 0 6deg, transparent 6deg 12deg)",
          maskImage: "radial-gradient(circle, transparent 54%, black 55%, black 57%, transparent 58%)",
        }}
      />
      <div
        className="radar-sweep absolute inset-[8%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgb(125 255 42 / 0.0) 240deg, rgb(125 255 42 / 0.55) 300deg, rgb(125 255 42 / 0.85) 360deg)",
          animation: "radar-sweep 3.2s linear infinite",
        }}
      />
      <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_18px_var(--color-primary)]" />
      <span
        className="absolute left-[62%] top-[28%] size-1.5 rounded-full bg-primary"
        style={{ opacity: 0.4 + progress * 0.6 }}
      />
    </div>
  );
}

function Crosshair() {
  return (
    <div className="relative size-12">
      <div className="absolute inset-0 rounded-full border border-primary/50" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/70" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-primary/70" />
      <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
    </div>
  );
}
