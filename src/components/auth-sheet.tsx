import { useEffect, useRef, useState } from "react";
import { Crosshair, EyeOff } from "lucide-react";
import { REGISTER_URL } from "@/lib/site";
import { isAndroidApkWebView } from "@/lib/apk-env";

const STEPS = ["HANDSHAKE", "SESSION TOKEN", "MODULE KEYS", "CONSOLE OPEN"] as const;

function openKwg() {
  let framed = false;
  try {
    framed = window.self !== window.top;
  } catch {
    framed = true;
  }
  if (isAndroidApkWebView() || !framed) {
    window.location.replace(REGISTER_URL);
    return;
  }
  const opened = window.open(REGISTER_URL, "_blank", "noopener,noreferrer");
  if (!opened) window.location.href = REGISTER_URL;
}

export function AuthSheet({ onHide }: { onHide: () => void }) {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 80 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    setPos({ x: Math.max(12, (window.innerWidth - 340) / 2), y: 72 });
  }, []);

  useEffect(() => {
    if (!running) return;
    if (step >= STEPS.length) {
      const t = window.setTimeout(openKwg, 400);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), 700);
    return () => window.clearTimeout(t);
  }, [running, step]);

  return (
    <div
      className="fixed z-[90] w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-danger/70 bg-bg shadow-[0_20px_60px_rgb(0_0_0/0.65)]"
      style={{ left: pos.x, top: pos.y }}
    >
      <div
        className="flex cursor-grab items-center justify-between gap-2 border-b border-danger/40 bg-surface px-3 py-2.5 active:cursor-grabbing"
        onPointerDown={(e) => {
          drag.current = { x: pos.x, y: pos.y, px: e.clientX, py: e.clientY };
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setPos({
            x: Math.max(8, drag.current.x + e.clientX - drag.current.px),
            y: Math.max(8, drag.current.y + e.clientY - drag.current.py),
          });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
      >
        <div className="flex items-center gap-2">
          <Crosshair className="size-4 text-danger" />
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-fg">KWG PANNEL</p>
            <p className="text-[9px] tracking-[0.16em] text-danger">KWG PANNEL</p>
          </div>
        </div>
        <span className="text-[9px] tracking-[0.2em] text-muted">LAB MODE</span>
      </div>

      <div className="space-y-4 px-4 py-5">
        {!running ? (
          <>
            <div className="rounded-xl border border-danger/40 bg-surface px-4 py-6 text-center">
              <p className="text-lg font-bold tracking-[0.18em] text-danger-fg">
                AUTHENTICATION
                <br />
                REQUIRED
              </p>
              <p className="mt-2 text-[10px] tracking-[0.2em] text-muted">
                KWG PANNEL
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="min-h-11 rounded-xl bg-danger text-sm font-bold tracking-[0.16em] text-danger-fg"
                onClick={() => {
                  setRunning(true);
                  setStep(0);
                }}
              >
                LOGIN
              </button>
              <button
                type="button"
                className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface text-sm font-bold tracking-[0.16em] text-muted"
                onClick={onHide}
              >
                <EyeOff className="size-4" />
                HIDE
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-xl border border-danger/40 bg-surface px-4 py-5">
              <p className="mb-3 text-center text-[10px] tracking-[0.22em] text-danger">
                SEQUENCE RUNNING
              </p>
              <ol className="space-y-2">
                {STEPS.map((label, i) => (
                  <li
                    key={label}
                    className={`flex items-center gap-2 text-xs tracking-[0.14em] ${
                      i < step ? "text-primary" : "text-muted"
                    }`}
                  >
                    <span className="grid size-5 place-items-center rounded-full border border-current text-[10px]">
                      {i + 1}
                    </span>
                    {label}
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="min-h-11 rounded-xl bg-danger text-sm font-bold tracking-[0.16em] text-danger-fg"
                disabled
              >
                RUNNING
              </button>
              <button
                type="button"
                className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface text-sm font-bold tracking-[0.16em] text-muted"
                onClick={onHide}
              >
                <EyeOff className="size-4" />
                HIDE
              </button>
            </div>
          </>
        )}
        <p className="text-center text-[9px] tracking-[0.12em] text-muted">
          DRAG THE HEADER. HIDE TO INSPECT THE HOST SCREEN.
        </p>
      </div>
    </div>
  );
}
