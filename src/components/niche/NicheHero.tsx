"use client";

import React, { useRef, useEffect } from "react";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ChatWidgetContent } from "@/types/landing";
import { ShaderColors } from "./nicheData";

interface NicheHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  chatWidgetData: ChatWidgetContent;
  niche: string;
  integrations: string[];
  bgImage?: string;
  shaderColors: ShaderColors;
}

export default function NicheHero({
  badge,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  chatWidgetData,
  niche,
  integrations,
  bgImage,
  shaderColors,
}: NicheHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawGl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!rawGl) return;
    const gl = rawGl as WebGLRenderingContext;

    let frameId: number;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const [br, bgVal, bb] = shaderColors.base;
    const [p1r, p1g, p1b] = shaderColors.primary;
    const [p2r, p2g, p2b] = shaderColors.secondary;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
          vec2 uv = v_texCoord;
          vec2 p = (uv - 0.5) * 2.0;
          p.x *= u_resolution.x / u_resolution.y;

          float d = length(p);
          float noise = 0.0;
          
          for(float i = 1.0; i < 4.0; i++) {
              p.x += 0.3 / i * sin(i * p.y + u_time * 0.4 + i * 0.6) + 0.5;
              p.y += 0.3 / i * sin(i * p.x + u_time * 0.4 + i * 1.2) + 0.5;
              noise += sin(length(p) * 1.5);
          }

          vec3 color1 = vec3(${br.toFixed(4)}, ${bgVal.toFixed(4)}, ${bb.toFixed(4)});
          vec3 color2 = vec3(${p1r.toFixed(4)}, ${p1g.toFixed(4)}, ${p1b.toFixed(4)});
          vec3 color3 = vec3(${p2r.toFixed(4)}, ${p2g.toFixed(4)}, ${p2b.toFixed(4)});

          vec3 finalColor = mix(color1, color2, 0.5 + 0.5 * sin(noise * 0.15 + u_time * 0.1));
          finalColor = mix(finalColor, color3, 0.4 * (1.0 - d));
          
          finalColor *= smoothstep(1.8, 0.6, d);

          gl_FragColor = vec4(finalColor * 0.7, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const targetW = canvas.clientWidth || 1280;
      const targetH = canvas.clientHeight || 720;
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        w = targetW;
        h = targetH;
      }
    }

    resize();
    
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(canvas);
    }

    function render(t: number) {
      gl.viewport(0, 0, w, h);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, w, h);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId = requestAnimationFrame(render);
    }

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [shaderColors]);

  const [titleFirst, titleSecond] = title.split("\n");

  return (
    <section
      id="hero"
      className="w-full max-w-full relative overflow-hidden pt-[120px] pb-24 z-0 bg-bg"
    >
      {/* Dynamic WebGL Shader Background (Computational Luxury) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 opacity-15 dark:opacity-40 pointer-events-none transition-opacity duration-500"
      />

      {/* Decorative ambient glows underneath the chat */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 nebula-glow z-0" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-secondary/5 nebula-glow z-0" />

      {/* Grid container */}
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* Left: Copy & CTA */}
        <div className="flex flex-col gap-6 max-w-[620px]">
          <div className="flex flex-col gap-5">
            <Badge variant="primary" pulse>
              {badge}
            </Badge>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7.5xl font-bold text-heavy leading-[1.05] tracking-tight">
              {titleFirst}{" "}
              <span className="gradient-text block sm:inline">{titleSecond}</span>
            </h1>
            <div className="flex flex-col gap-4">
              <p className="font-body text-balance text-lg sm:text-xl text-text-muted leading-relaxed max-w-2xl">
                {subtitle}
              </p>

              <div className="flex items-center gap-4 text-[13px] font-semibold text-text-muted mt-2">
                <span>Работает 24/7 без выходных</span>
                <div className="w-px h-4 bg-border/40" />
                <span>0 пропущенных заявок</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button size="lg" asChild className="w-full sm:w-auto bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-heavy border-0 hover:brightness-110 shadow-lg transition-all duration-300 cursor-pointer rounded-full">
                <a href="#calculator" aria-label="Рассчитать стоимость">
                  {ctaPrimary}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto cursor-pointer rounded-full glass-card hover:bg-surface-container/50">
                <a href="#contact" aria-label="Связаться с нами">
                  {ctaSecondary}
                </a>
              </Button>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                Интегрируется с...
              </span>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {integrations.map((b) => (
                  <span key={b} className="font-display font-bold text-lg tracking-tight opacity-40 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 transition-all cursor-default text-heavy">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Chat Demo with glow effect */}
        <div className="relative group w-full max-w-[500px] lg:max-w-none mx-auto">
          <div className="absolute -inset-4 bg-primary/10 rounded-xl blur-3xl opacity-50 group-hover:opacity-75 transition duration-1000 -z-10" />
          <ChatWidget chatWidgetData={chatWidgetData} niche={niche} />
        </div>
      </div>
    </section>
  );
}
