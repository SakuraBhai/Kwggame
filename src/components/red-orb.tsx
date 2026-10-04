import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

const SIZE = 56;

export function RedOrb({ onOpen }: { onOpen: () => void }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const moved = useRef(false);
  const origin = useRef({ x: 0, y: 0, px: 0, py: 0 });

  useEffect(() => {
    const place = () => {
      setPos({
        x: Math.max(12, window.innerWidth - SIZE - 28),
        y: Math.max(12, window.innerHeight - SIZE - 36),
      });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  const onPointerDown = useCallback((e: PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    moved.current = false;
    origin.current = { x: pos.x, y: pos.y, px: e.clientX, py: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [pos.x, pos.y]);

  const onPointerMove = useCallback((e: PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - origin.current.px;
    const dy = e.clientY - origin.current.py;
    if (Math.abs(dx) + Math.abs(dy) > 6) moved.current = true;
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
      aria-label="Open KWG panel"
      className="orb-glow fixed z-40 size-14 rounded-full border-2 border-danger-fg/80 bg-danger transition-transform duration-150 ease-out active:scale-95"
      style={{
        left: pos.x,
        top: pos.y,
        animation: "orb-glow 1.6s ease-in-out infinite",
        background:
          "radial-gradient(circle at 35% 30%, #ff7a90 0%, var(--color-danger) 42%, #7f1028 100%)",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-danger-fg" />
    </button>
  );
}
