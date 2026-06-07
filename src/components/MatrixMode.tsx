"use client";

import { useState, useEffect, useRef } from "react";

export default function MatrixMode() {
  const [active, setActive] = useState(false);
  const [buffer, setBuffer] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keyboard and Custom Event listeners for activation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(false);
        return;
      }
      if (e.key.length === 1) {
        setBuffer((prev) => {
          const next = (prev + e.key.toLowerCase()).slice(-10);
          if (next.endsWith("alex") || next.endsWith("n8n")) {
            setActive(true);
          }
          return next;
        });
      }
    };

    const handleToggle = () => {
      setActive((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-matrix-mode", handleToggle);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-matrix-mode", handleToggle);
    };
  }, []);

  // Sync state with global html class
  useEffect(() => {
    if (active) {
      document.documentElement.classList.add("matrix-active");
    } else {
      document.documentElement.classList.remove("matrix-active");
    }
    // Cleanup if unmounted abruptly
    return () => {
      document.documentElement.classList.remove("matrix-active");
    };
  }, [active]);

  // Rain Canvas Animation Loop
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const fontSize = 14;
    const columns = Math.ceil(canvas.width / fontSize);
    const rainDrops: number[] = Array(columns)
      .fill(1)
      .map(() => Math.floor(Math.random() * -50)); // Start drops scattered above viewport

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* Canvas background for falling binary digits */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[-1] opacity-40"
        style={{ mixBlendMode: "screen" }}
      />
      
      {/* Floating control bar to exit developer mode */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-black/85 border border-primary text-primary px-5 py-2.5 rounded-md font-mono text-xs flex items-center gap-6 shadow-[0_0_20px_rgba(0,255,102,0.3)] animate-fade-in-up">
        <span>📟 [РЕЖИМ РАЗРАБОТЧИКА АКТИВЕН]</span>
        <button
          onClick={() => setActive(false)}
          className="bg-primary text-black px-3 py-1 rounded font-bold hover:bg-primary-hover transition-colors cursor-pointer"
        >
          Выйти (ESC)
        </button>
      </div>
    </>
  );
}
