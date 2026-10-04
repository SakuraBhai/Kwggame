import { useCallback, useRef, useState, type PointerEvent } from "react";

const SIZE = 58;

export function RedOrb({ onOpen }: { onOpen: () => void }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const origin = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const onPointerDown = useCallback((e: PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    moved.current = false;
    const rect = e.currentTarget.getBoundingClientRect();
    origin.current = { x: rect.left, y: rect.top, px: e.clientX, py: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - origin.current.px;
    const dy = e.clientY - origin.current.py;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true;
    const x = Math.min(window.innerWidth - SIZE - 8, Math.max(8, origin.current.x + dx));
    const y = Math.min(window.innerHeight - SIZE - 8, Math.max(8, origin.current.y + dy));
    setPos({ x, y });
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
    if (!moved.current) onOpen();
  }, [onOpen]);

  return (
    <button
      type="button"
      aria-label="KWG PANNEL"
      className="orb-glow pointer-events-auto fixed z-[80] size-[58px] rounded-full border-2 border-danger-fg/90 transition-transform duration-150 ease-out active:scale-95"
      style={{
        ...(pos
          ? { left: pos.x, top: pos.y }
          : { right: 18, bottom: 22 }),
        animation: "orb-glow 1.6s ease-in-out infinite",
        background:
          "radial-gradient(circle at 35% 30%, #ff7a90 0%, var(--color-danger) 42%, #7f1028 100%)",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span className="pointer-events-none absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-danger-fg" />
    </button>
  );
}
