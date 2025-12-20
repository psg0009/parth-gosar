"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export default function BioMeshField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return null;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    return { ctx, canvas, cleanup: () => window.removeEventListener("resize", resize) };
  }, []);

  useEffect(() => {
    const result = initCanvas();
    if (!result) return;

    const { ctx, canvas, cleanup } = result;

    // Hexagonal grid nodes
    interface HexNode {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      phase: number;
      energy: number;
      type: "core" | "outer" | "data";
    }

    // Data packets flowing through the network
    interface DataPacket {
      fromNode: number;
      toNode: number;
      progress: number;
      speed: number;
      color: string;
      size: number;
    }

    // Floating organisms
    interface Organism {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: "cell" | "molecule" | "antibody";
      color: string;
      pulsePhase: number;
    }

    const nodes: HexNode[] = [];
    const packets: DataPacket[] = [];
    const organisms: Organism[] = [];

    // Initialize hexagonal grid
    const initNodes = () => {
      const rect = canvas.getBoundingClientRect();
      const spacing = 80;
      const rows = Math.ceil(rect.height / (spacing * 0.866)) + 2;
      const cols = Math.ceil(rect.width / spacing) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + (row % 2) * (spacing / 2);
          const y = row * spacing * 0.866;
          const distFromCenter = Math.sqrt(
            Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2)
          );

          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            phase: Math.random() * Math.PI * 2,
            energy: Math.random(),
            type: distFromCenter < 200 ? "core" : distFromCenter < 400 ? "outer" : "data",
          });
        }
      }
    };

    // Initialize floating organisms
    const initOrganisms = () => {
      const rect = canvas.getBoundingClientRect();
      const types: ("cell" | "molecule" | "antibody")[] = ["cell", "molecule", "antibody"];
      const colors = ["#22d3ee", "#34d399", "#f472b6", "#a855f7", "#fbbf24"];

      for (let i = 0; i < 15; i++) {
        organisms.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 20 + Math.random() * 30,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initNodes();
    initOrganisms();

    const colors = {
      core: "#22d3ee",
      outer: "#34d399",
      data: "#a855f7",
    };

    const packetColors = ["#fbbf24", "#f472b6", "#22d3ee", "#34d399"];

    // Draw a cell organism
    const drawCell = (ctx: CanvasRenderingContext2D, o: Organism, time: number) => {
      const pulse = 1 + Math.sin(o.pulsePhase + time * 2) * 0.1;
      const size = o.size * pulse;

      ctx.save();
      ctx.translate(o.x, o.y);
      ctx.rotate(o.rotation);

      // Outer membrane
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * 0.8, 0, 0, Math.PI * 2);
      ctx.strokeStyle = o.color + "40";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner membrane
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.85, size * 0.65, 0, 0, Math.PI * 2);
      ctx.strokeStyle = o.color + "30";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Nucleus
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = o.color + "20";
      ctx.fill();
      ctx.strokeStyle = o.color + "50";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Organelles
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + time * 0.5;
        const dist = size * 0.5;
        const ox = Math.cos(angle) * dist;
        const oy = Math.sin(angle) * dist * 0.7;

        ctx.beginPath();
        ctx.arc(ox, oy, 3, 0, Math.PI * 2);
        ctx.fillStyle = o.color + "60";
        ctx.fill();
      }

      ctx.restore();
    };

    // Draw a molecule
    const drawMolecule = (ctx: CanvasRenderingContext2D, o: Organism, time: number) => {
      const pulse = 1 + Math.sin(o.pulsePhase + time * 3) * 0.15;

      ctx.save();
      ctx.translate(o.x, o.y);
      ctx.rotate(o.rotation);

      // Draw benzene-like ring
      const ringSize = o.size * 0.5 * pulse;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * ringSize;
        const y = Math.sin(angle) * ringSize;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = o.color + "50";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Atoms at vertices
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * ringSize;
        const y = Math.sin(angle) * ringSize;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? o.color + "80" : "#34d399" + "80";
        ctx.fill();

        // Bonds extending outward
        if (i % 2 === 0) {
          const bondAngle = angle;
          const bondLength = ringSize * 0.6;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(bondAngle) * bondLength, y + Math.sin(bondAngle) * bondLength);
          ctx.strokeStyle = o.color + "30";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(
            x + Math.cos(bondAngle) * bondLength,
            y + Math.sin(bondAngle) * bondLength,
            3, 0, Math.PI * 2
          );
          ctx.fillStyle = "#fbbf24" + "60";
          ctx.fill();
        }
      }

      ctx.restore();
    };

    // Draw antibody (Y-shape)
    const drawAntibody = (ctx: CanvasRenderingContext2D, o: Organism, time: number) => {
      const pulse = 1 + Math.sin(o.pulsePhase + time * 2.5) * 0.1;
      const size = o.size * 0.4 * pulse;

      ctx.save();
      ctx.translate(o.x, o.y);
      ctx.rotate(o.rotation);

      // Y-shape body
      ctx.beginPath();
      ctx.moveTo(0, size * 1.5);
      ctx.lineTo(0, 0);
      ctx.lineTo(-size, -size);
      ctx.moveTo(0, 0);
      ctx.lineTo(size, -size);
      ctx.strokeStyle = o.color + "60";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.stroke();

      // Binding sites
      ctx.beginPath();
      ctx.arc(-size, -size, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#f472b6" + "70";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(size, -size, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#f472b6" + "70";
      ctx.fill();

      // Stem
      ctx.beginPath();
      ctx.arc(0, size * 1.5, 5, 0, Math.PI * 2);
      ctx.fillStyle = o.color + "50";
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      timeRef.current += 0.016;
      const time = timeRef.current;
      const scrollOffset = scrollRef.current * 0.1;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Organic movement
        node.x = node.baseX + Math.sin(time + node.phase) * 8 + Math.cos(time * 0.5 + node.phase * 2) * 5;
        node.y = node.baseY + Math.cos(time + node.phase) * 8 + Math.sin(scrollOffset * 0.01 + node.phase) * 10;

        // Pulsing energy
        node.energy = 0.3 + Math.sin(time * 2 + node.phase) * 0.3 + 0.4;
      });

      // Draw connections between nearby nodes
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((other, j) => {
          const dist = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2));

          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.15 * node.energy;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);

            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            gradient.addColorStop(0, colors[node.type] + Math.floor(opacity * 255).toString(16).padStart(2, "0"));
            gradient.addColorStop(1, colors[other.type] + Math.floor(opacity * 255).toString(16).padStart(2, "0"));

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Randomly spawn data packets
            if (Math.random() < 0.0005 && packets.length < 40) {
              packets.push({
                fromNode: i,
                toNode: i + 1 + j,
                progress: 0,
                speed: 0.01 + Math.random() * 0.02,
                color: packetColors[Math.floor(Math.random() * packetColors.length)],
                size: 2 + Math.random() * 2,
              });
            }
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const nodeColor = colors[node.type];
        const glowSize = 3 + node.energy * 4;

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize * 3);
        glow.addColorStop(0, nodeColor + "30");
        glow.addColorStop(1, nodeColor + "00");
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor + Math.floor(node.energy * 180).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Update and draw data packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const from = nodes[p.fromNode];
        const to = nodes[p.toNode];
        if (!from || !to) {
          packets.splice(i, 1);
          continue;
        }

        const x = from.x + (to.x - from.x) * p.progress;
        const y = from.y + (to.y - from.y) * p.progress;

        // Trail
        for (let t = 0; t < 5; t++) {
          const tp = p.progress - t * 0.03;
          if (tp < 0) continue;
          const tx = from.x + (to.x - from.x) * tp;
          const ty = from.y + (to.y - from.y) * tp;
          ctx.beginPath();
          ctx.arc(tx, ty, p.size * (1 - t * 0.15), 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor((1 - t / 5) * 200).toString(16).padStart(2, "0");
          ctx.fill();
        }

        // Main particle
        const pGlow = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
        pGlow.addColorStop(0, p.color);
        pGlow.addColorStop(0.5, p.color + "60");
        pGlow.addColorStop(1, p.color + "00");
        ctx.beginPath();
        ctx.arc(x, y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = pGlow;
        ctx.fill();
      }

      // Update and draw organisms
      organisms.forEach((o) => {
        // Movement
        o.x += o.vx;
        o.y += o.vy;
        o.rotation += o.rotationSpeed;
        o.pulsePhase += 0.02;

        // Slight drift based on time
        o.vx += Math.sin(time + o.pulsePhase) * 0.01;
        o.vy += Math.cos(time + o.pulsePhase) * 0.01;

        // Damping
        o.vx *= 0.99;
        o.vy *= 0.99;

        // Boundary wrapping
        if (o.x < -o.size) o.x = width + o.size;
        if (o.x > width + o.size) o.x = -o.size;
        if (o.y < -o.size) o.y = height + o.size;
        if (o.y > height + o.size) o.y = -o.size;

        // Draw based on type
        if (o.type === "cell") drawCell(ctx, o, time);
        else if (o.type === "molecule") drawMolecule(ctx, o, time);
        else drawAntibody(ctx, o, time);
      });

      // Draw floating DNA segments
      for (let i = 0; i < 3; i++) {
        const dnaX = width * (0.2 + i * 0.3) + Math.sin(time * 0.3 + i) * 50;
        const dnaY = height * 0.5 + Math.cos(time * 0.2 + i * 2) * 100;

        for (let j = 0; j < 12; j++) {
          const y = dnaY - 60 + j * 10;
          const phase = time * 2 + j * 0.4 + i;
          const x1 = dnaX + Math.sin(phase) * 20;
          const x2 = dnaX - Math.sin(phase) * 20;
          const z = Math.cos(phase);
          const opacity = 0.05 + Math.abs(z) * 0.1;

          // Base pair
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Nodes
          ctx.beginPath();
          ctx.arc(x1, y, 2 + z, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 1.5})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, y, 2 - z, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 114, 182, ${opacity * 1.5})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      cleanup();
    };
  }, [initCanvas]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.7 }}
      />
      {/* Depth gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 50%, transparent 0%, rgba(2, 6, 23, 0.6) 100%)",
          }}
        />
      </div>
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "10%",
          left: "10%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(244, 114, 182, 0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
          bottom: "20%",
          right: "15%",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.15, 1],
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
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.07) 0%, transparent 70%)",
          filter: "blur(55px)",
          top: "50%",
          right: "30%",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
