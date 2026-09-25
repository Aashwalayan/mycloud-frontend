import { useRef, useMemo, useCallback } from "react";

const SHAPES = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "40% 60% 70% 30% / 50% 60% 40% 50%",
  "70% 30% 50% 50% / 30% 60% 40% 70%",
  "30% 70% 60% 40% / 50% 50% 70% 30%",
];

const COLORS = ["#B98D3E", "#5C7A73", "#8B95A1", "#C1443C", "#7A6A9E"];

// fixed positions (percent of container) so the layout stays stable across renders
const POSITIONS = Array.from({ length: 18 }, () => [
  Math.random() * 90 + 5,
  Math.random() * 90 + 5,
]);

function buildBlobs() {
  return POSITIONS.map(([x, y], i) => ({
    id: i,
    x,
    y,
    size: 34 + Math.random() * 64,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    duration: 6 + Math.random() * 8,
    delay: Math.random() * -8,
    floatX: -20 + Math.random() * 40,
    floatY: -20 + Math.random() * 40,
  }));
}

/**
 * A field of soft organic shapes covering the whole panel. Move the
 * mouse over it — nearby shapes grow, shift form and brighten. Purely
 * decorative, no dependencies beyond React.
 */
export default function HoverField() {
  const containerRef = useRef(null);
  const blobRefs = useRef([]);
  const blobs = useMemo(buildBlobs, []);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;

      blobs.forEach((blob, i) => {
        const el = blobRefs.current[i];
        if (!el) return;
        const dx = blob.x - mx;
        const dy = blob.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 26);
        const scale = 1 + influence * 1.1;
        const rotate = influence * 45 * (i % 2 === 0 ? 1 : -1);
        const shape = influence > 0.35 ? SHAPES[(i + 1) % SHAPES.length] : blob.shape;

        el.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`;
        el.style.borderRadius = shape;
        el.style.opacity = String(0.4 + influence * 0.6);
      });
    },
    [blobs]
  );

  const handleMouseLeave = useCallback(() => {
    blobs.forEach((blob, i) => {
      const el = blobRefs.current[i];
      if (!el) return;
      el.style.transform = "translate(-50%, -50%) scale(1) rotate(0deg)";
      el.style.borderRadius = blob.shape;
      el.style.opacity = "0.5";
    });
  }, [blobs]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 overflow-hidden z-0"
    >
      {blobs.map((blob, i) => (
        <div
          key={blob.id}
          ref={(el) => (blobRefs.current[i] = el)}
          style={{
            position: "absolute",
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: blob.size,
            height: blob.size,
            backgroundColor: blob.color,
            borderRadius: blob.shape,
            opacity: 0.5,
            transform: "translate(-50%, -50%) scale(1) rotate(0deg)",
            "--float-x": `${blob.floatX}px`,
            "--float-y": `${blob.floatY}px`,
            animation: `float ${blob.duration}s ease-in-out infinite`,
            animationDelay: `${blob.delay}s`,
            transition:
              "transform 0.35s ease-out, border-radius 0.45s ease-out, opacity 0.35s ease-out",
          }}
        />
      ))}
    </div>
  );
}