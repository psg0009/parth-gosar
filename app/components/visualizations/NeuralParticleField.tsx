"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
  type: "neuron" | "synapse" | "data" | "energy";
  energy: number;
  trail: { x: number; y: number; opacity: number }[];
}

interface DataStream {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  color: string;
}

interface WaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

interface NeuralPath {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  color: string;
  width: number;
}

export default function NeuralParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const dataStreamsRef = useRef<DataStream[]>([]);
  const waveRingsRef = useRef<WaveRing[]>([]);
  const neuralPathsRef = useRef<NeuralPath[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const numParticles = Math.min(100, Math.floor((width * height) / 15000));

    const colors = {
      neuron: ["#22d3ee", "#06b6d4", "#0891b2"],
      synapse: ["#34d399", "#10b981", "#059669"],
      data: ["#f472b6", "#ec4899", "#a855f7"],
      energy: ["#fbbf24", "#f59e0b", "#fb923c"],
    };

    for (let i = 0; i < numParticles; i++) {
      const rand = Math.random();
      const type = rand < 0.2 ? "neuron" : rand < 0.45 ? "synapse" : rand < 0.8 ? "data" : "energy";
      const colorSet = colors[type];

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: type === "neuron" ? 5 + Math.random() * 4 : type === "energy" ? 3 + Math.random() * 2 : 2 + Math.random() * 2,
        color: colorSet[Math.floor(Math.random() * colorSet.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.04 + Math.random() * 0.05,
        type,
        energy: 0.5 + Math.random() * 0.5,
        trail: [],
      });
    }
    return particles;
  }, []);

  const initNeuralPaths = useCallback((width: number, height: number) => {
    const paths: NeuralPath[] = [];
    const pathColors = ["#22d3ee", "#34d399", "#a855f7", "#f472b6"];

    for (let i = 0; i < 8; i++) {
      const points: { x: number; y: number }[] = [];
      let x = Math.random() < 0.5 ? -50 : width + 50;
      let y = height * 0.2 + Math.random() * height * 0.6;
      const targetX = x < 0 ? width + 50 : -50;

      points.push({ x, y });

      // Create bezier-like path
      const numSegments = 4 + Math.floor(Math.random() * 3);
      for (let j = 1; j <= numSegments; j++) {
        const progress = j / numSegments;
        x = x + (targetX - x) * (1 / numSegments) + (Math.random() - 0.5) * 100;
        y = y + (Math.random() - 0.5) * 150;
        y = Math.max(50, Math.min(height - 50, y));
        points.push({ x, y });
      }

      paths.push({
        points,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        color: pathColors[Math.floor(Math.random() * pathColors.length)],
        width: 1 + Math.random() * 2,
      });
    }
    return paths;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (particlesRef.current.length === 0) {
        particlesRef.current = initParticles(rect.width, rect.height);
        neuralPathsRef.current = initNeuralPaths(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const energyColors = ["#fbbf24", "#f59e0b", "#ef4444", "#22d3ee"];

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear with fade effect for trails
      ctx.fillStyle = "rgba(2, 6, 23, 0.12)";
      ctx.fillRect(0, 0, width, height);

      timeRef.current += 0.016;
      const time = timeRef.current;
      const particles = particlesRef.current;
      const dataStreams = dataStreamsRef.current;
      const waveRings = waveRingsRef.current;
      const neuralPaths = neuralPathsRef.current;
      const mouse = mouseRef.current;

      // Draw flowing background grid
      ctx.strokeStyle = "rgba(34, 211, 238, 0.03)";
      ctx.lineWidth = 1;
      const gridSpacing = 60;
      const gridOffset = (time * 20) % gridSpacing;

      for (let x = -gridOffset; x < width + gridSpacing; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        for (let y = 0; y < height; y += 20) {
          const wave = Math.sin(y * 0.01 + time * 2) * 15;
          ctx.lineTo(x + wave, y);
        }
        ctx.stroke();
      }

      // Draw neural paths (flowing streams across screen)
      for (const path of neuralPaths) {
        path.progress += path.speed;
        if (path.progress > 1.5) {
          path.progress = -0.5;
        }

        const pathLength = path.points.length - 1;

        // Draw the path trail
        ctx.beginPath();
        ctx.strokeStyle = path.color + "15";
        ctx.lineWidth = path.width * 3;
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.stroke();

        // Draw flowing pulse
        const pulsePos = path.progress * pathLength;
        const segmentIndex = Math.floor(pulsePos);
        const segmentProgress = pulsePos - segmentIndex;

        if (segmentIndex >= 0 && segmentIndex < pathLength) {
          const p1 = path.points[segmentIndex];
          const p2 = path.points[segmentIndex + 1];
          const px = p1.x + (p2.x - p1.x) * segmentProgress;
          const py = p1.y + (p2.y - p1.y) * segmentProgress;

          // Glowing pulse
          const pulseGlow = ctx.createRadialGradient(px, py, 0, px, py, 40);
          pulseGlow.addColorStop(0, path.color + "cc");
          pulseGlow.addColorStop(0.3, path.color + "44");
          pulseGlow.addColorStop(1, path.color + "00");
          ctx.beginPath();
          ctx.arc(px, py, 40, 0, Math.PI * 2);
          ctx.fillStyle = pulseGlow;
          ctx.fill();

          // Core pulse
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fillStyle = path.color;
          ctx.fill();
        }
      }

      // Update and draw wave rings
      for (let i = waveRings.length - 1; i >= 0; i--) {
        const ring = waveRings[i];
        ring.radius += 3;
        ring.opacity -= 0.015;

        if (ring.opacity <= 0 || ring.radius > ring.maxRadius) {
          waveRings.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color + Math.floor(ring.opacity * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Spawn wave rings occasionally
      if (Math.random() < 0.015 && waveRings.length < 8) {
        waveRings.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 5,
          maxRadius: 150 + Math.random() * 100,
          opacity: 0.4,
          color: energyColors[Math.floor(Math.random() * energyColors.length)],
        });
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update pulse
        p.pulse += p.pulseSpeed;
        const pulseScale = 1 + Math.sin(p.pulse) * 0.5;

        // Store trail position
        if (p.type === "energy" || p.type === "neuron") {
          p.trail.unshift({ x: p.x, y: p.y, opacity: 1 });
          if (p.trail.length > 15) p.trail.pop();
          p.trail.forEach((t, idx) => {
            t.opacity = 1 - idx / p.trail.length;
          });
        }

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < 200 && distToMouse > 0) {
          const force = (200 - distToMouse) / 200;
          if (p.type === "neuron") {
            p.vx += (dx / distToMouse) * force * 0.12;
            p.vy += (dy / distToMouse) * force * 0.12;
          } else if (p.type === "energy") {
            // Energy particles burst away
            p.vx -= (dx / distToMouse) * force * 0.2;
            p.vy -= (dy / distToMouse) * force * 0.2;
          } else {
            p.vx += (-dy / distToMouse) * force * 0.06;
            p.vy += (dx / distToMouse) * force * 0.06;
          }
          p.energy = Math.min(1, p.energy + 0.03);

          // Spawn wave ring on strong interaction
          if (force > 0.7 && Math.random() < 0.02 && waveRings.length < 10) {
            waveRings.push({
              x: p.x,
              y: p.y,
              radius: 5,
              maxRadius: 80,
              opacity: 0.6,
              color: p.color,
            });
          }
        } else {
          p.energy = Math.max(0.3, p.energy - 0.008);
        }

        // Flowing wave motion with multiple frequencies
        p.vx += Math.sin(time * 1.5 + p.y * 0.006) * 0.02;
        p.vy += Math.cos(time * 1.5 + p.x * 0.006) * 0.02;
        p.vx += Math.sin(time * 3 + p.y * 0.012) * 0.01;
        p.vy += Math.cos(time * 3 + p.x * 0.012) * 0.01;

        // Random wandering
        p.vx += (Math.random() - 0.5) * 0.03;
        p.vy += (Math.random() - 0.5) * 0.03;

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 4) {
          p.vx = (p.vx / speed) * 4;
          p.vy = (p.vy / speed) * 4;
        }

        // Boundary wrapping with padding
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Draw particle trails
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          const trailGradient = ctx.createLinearGradient(
            p.x, p.y,
            p.trail[p.trail.length - 1].x, p.trail[p.trail.length - 1].y
          );
          trailGradient.addColorStop(0, p.color + "80");
          trailGradient.addColorStop(1, p.color + "00");
          ctx.strokeStyle = trailGradient;
          ctx.lineWidth = p.radius * 0.8;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Draw connections
        const connectionDist = p.type === "neuron" ? 160 : p.type === "energy" ? 100 : 100;
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const distX = p.x - other.x;
          const distY = p.y - other.y;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.6 * p.energy;

            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = p.color + Math.floor(opacity * 255).toString(16).padStart(2, "0");
            ctx.lineWidth = opacity * 3;
            ctx.stroke();

            // Create data streams randomly
            if (Math.random() < 0.003 && dataStreams.length < 40) {
              dataStreams.push({
                fromIdx: i,
                toIdx: j,
                progress: 0,
                speed: 0.02 + Math.random() * 0.03,
                color: energyColors[Math.floor(Math.random() * energyColors.length)],
              });
            }
          }
        }

        // Draw particle glow
        const glowRadius = p.radius * pulseScale * 6 * p.energy;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glow.addColorStop(0, p.color + "70");
        glow.addColorStop(0.3, p.color + "30");
        glow.addColorStop(1, p.color + "00");
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Inner highlight for neurons
        if (p.type === "neuron") {
          ctx.beginPath();
          ctx.arc(
            p.x - p.radius * 0.3,
            p.y - p.radius * 0.3,
            p.radius * 0.4 * pulseScale,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.fill();

          // Rotating ring for neurons
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5 * pulseScale, time * 2 + i, time * 2 + i + Math.PI * 1.2);
          ctx.strokeStyle = p.color + "60";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Energy particles have extra sparkle
        if (p.type === "energy") {
          const sparkleSize = p.radius * 0.5 * pulseScale;
          ctx.beginPath();
          ctx.moveTo(p.x - sparkleSize * 2, p.y);
          ctx.lineTo(p.x + sparkleSize * 2, p.y);
          ctx.moveTo(p.x, p.y - sparkleSize * 2);
          ctx.lineTo(p.x, p.y + sparkleSize * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Update and draw data streams
      for (let i = dataStreams.length - 1; i >= 0; i--) {
        const stream = dataStreams[i];
        stream.progress += stream.speed;

        if (stream.progress >= 1) {
          dataStreams.splice(i, 1);
          continue;
        }

        const from = particles[stream.fromIdx];
        const to = particles[stream.toIdx];

        if (!from || !to) {
          dataStreams.splice(i, 1);
          continue;
        }

        const x = from.x + (to.x - from.x) * stream.progress;
        const y = from.y + (to.y - from.y) * stream.progress;

        // Draw trail
        for (let t = 0; t < 8; t++) {
          const trailProgress = stream.progress - t * 0.025;
          if (trailProgress < 0) continue;

          const tx = from.x + (to.x - from.x) * trailProgress;
          const ty = from.y + (to.y - from.y) * trailProgress;
          const trailOpacity = (1 - t / 8) * 0.9;

          ctx.beginPath();
          ctx.arc(tx, ty, 5 - t * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = stream.color + Math.floor(trailOpacity * 255).toString(16).padStart(2, "0");
          ctx.fill();
        }

        // Draw main pulse with glow
        const pulseGlow = ctx.createRadialGradient(x, y, 0, x, y, 20);
        pulseGlow.addColorStop(0, stream.color);
        pulseGlow.addColorStop(0.4, stream.color + "88");
        pulseGlow.addColorStop(1, stream.color + "00");
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = pulseGlow;
        ctx.fill();
      }

      // Draw animated DNA double helix in background (right side)
      const helixX = width * 0.9;
      const helixY = height * 0.5;

      for (let i = 0; i < 30; i++) {
        const y = helixY - 220 + i * 15;
        const phase = time * 2.5 + i * 0.3;
        const x1 = helixX + Math.sin(phase) * 40;
        const x2 = helixX - Math.sin(phase) * 40;
        const z = Math.cos(phase);
        const opacity = 0.08 + Math.abs(z) * 0.15;

        // Base pair connection
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Strand 1 node with glow
        const glow1 = ctx.createRadialGradient(x1, y, 0, x1, y, 12);
        glow1.addColorStop(0, `rgba(34, 211, 238, ${opacity})`);
        glow1.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.beginPath();
        ctx.arc(x1, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = glow1;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x1, y, 4 + z * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 1.2})`;
        ctx.fill();

        // Strand 2 node with glow
        const glow2 = ctx.createRadialGradient(x2, y, 0, x2, y, 12);
        glow2.addColorStop(0, `rgba(244, 114, 182, ${opacity})`);
        glow2.addColorStop(1, "rgba(244, 114, 182, 0)");
        ctx.beginPath();
        ctx.arc(x2, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = glow2;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2, y, 4 - z * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 114, 182, ${opacity * 1.2})`;
        ctx.fill();
      }

      // Draw rotating neural arcs (left side)
      for (let i = 0; i < 5; i++) {
        const arcAngle = time * 0.5 + i * (Math.PI / 2.5);
        const arcRadius = 60 + i * 45;
        const arcX = width * 0.1;
        const arcY = height * 0.3;

        ctx.beginPath();
        ctx.arc(arcX, arcY, arcRadius, arcAngle, arcAngle + Math.PI * 0.5);
        const arcGradient = ctx.createLinearGradient(
          arcX - arcRadius, arcY,
          arcX + arcRadius, arcY
        );
        arcGradient.addColorStop(0, `rgba(34, 211, 238, 0)`);
        arcGradient.addColorStop(0.5, `rgba(34, 211, 238, ${0.12 - i * 0.02})`);
        arcGradient.addColorStop(1, `rgba(34, 211, 238, 0)`);
        ctx.strokeStyle = arcGradient;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Arc endpoint dots
        const endX = arcX + Math.cos(arcAngle + Math.PI * 0.5) * arcRadius;
        const endY = arcY + Math.sin(arcAngle + Math.PI * 0.5) * arcRadius;
        ctx.beginPath();
        ctx.arc(endX, endY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${0.4 - i * 0.05})`;
        ctx.fill();
      }

      // Floating hexagons (molecules) - bottom left
      for (let i = 0; i < 8; i++) {
        const hx = width * 0.12 + Math.sin(time * 0.4 + i * 1.0) * 100 + i * 30;
        const hy = height * 0.7 + Math.cos(time * 0.3 + i * 0.7) * 70;
        const hSize = 15 + Math.sin(time + i * 0.5) * 5;
        const hOpacity = 0.06 + Math.sin(time * 0.5 + i) * 0.04;
        const rotation = time * 0.25 + i * 0.5;

        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = rotation + (j / 6) * Math.PI * 2;
          const px = hx + Math.cos(angle) * hSize;
          const py = hy + Math.sin(angle) * hSize;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(52, 211, 153, ${hOpacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glow effect for hexagons
        const hexGlow = ctx.createRadialGradient(hx, hy, 0, hx, hy, hSize * 2);
        hexGlow.addColorStop(0, `rgba(52, 211, 153, ${hOpacity * 0.3})`);
        hexGlow.addColorStop(1, "rgba(52, 211, 153, 0)");
        ctx.beginPath();
        ctx.arc(hx, hy, hSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = hexGlow;
        ctx.fill();
      }

      // Pulsing center orb effect
      const centerX = width * 0.5;
      const centerY = height * 0.45;
      const centerPulse = 0.5 + Math.sin(time * 2) * 0.3;

      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      centerGlow.addColorStop(0, `rgba(34, 211, 238, ${0.05 * centerPulse})`);
      centerGlow.addColorStop(0.5, `rgba(139, 92, 246, ${0.03 * centerPulse})`);
      centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fillStyle = centerGlow;
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles, initNeuralPaths]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />
      {/* Depth overlay gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(2, 6, 23, 0.4) 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to bottom, rgba(2, 6, 23, 0.8), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to top, rgba(2, 6, 23, 0.8), transparent)",
          }}
        />
      </div>
      {/* Animated floating orbs */}
      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "10%",
          left: "50%",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 100, 0],
          scale: [1, 1.4, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244, 114, 182, 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
          top: "50%",
          left: "60%",
        }}
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.12) 0%, transparent 70%)",
          filter: "blur(55px)",
          top: "30%",
          right: "0%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 90, -60, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(45px)",
          bottom: "20%",
          left: "20%",
        }}
        animate={{
          x: [0, -40, 60, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
