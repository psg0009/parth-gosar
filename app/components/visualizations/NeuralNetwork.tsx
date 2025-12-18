"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface NeuralNetworkProps {
  className?: string;
}

export default function NeuralNetwork({ className = "" }: NeuralNetworkProps) {
  const [activeConnections, setActiveConnections] = useState<number[]>([]);

  const layers = [
    { nodes: 4, x: 50 },   // Input
    { nodes: 6, x: 150 },  // Hidden 1
    { nodes: 8, x: 250 },  // Hidden 2
    { nodes: 6, x: 350 },  // Hidden 3
    { nodes: 3, x: 450 },  // Output
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
      setActiveConnections(newActive);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const getNodeY = (layerIndex: number, nodeIndex: number, totalNodes: number) => {
    const spacing = 200 / (totalNodes + 1);
    return spacing * (nodeIndex + 1);
  };

  // Generate all connections
  const connections: { x1: number; y1: number; x2: number; y2: number; id: number }[] = [];
  let connId = 0;
  for (let l = 0; l < layers.length - 1; l++) {
    for (let n1 = 0; n1 < layers[l].nodes; n1++) {
      for (let n2 = 0; n2 < layers[l + 1].nodes; n2++) {
        connections.push({
          x1: layers[l].x,
          y1: getNodeY(l, n1, layers[l].nodes),
          x2: layers[l + 1].x,
          y2: getNodeY(l + 1, n2, layers[l + 1].nodes),
          id: connId++,
        });
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 500 200" className="w-full h-full">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00ff88" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="activeConnection" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((conn) => {
          const isActive = activeConnections.includes(conn.id % 100);
          return (
            <motion.line
              key={conn.id}
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke={isActive ? "url(#activeConnection)" : "rgba(34, 211, 238, 0.1)"}
              strokeWidth={isActive ? 2 : 0.5}
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />
          );
        })}

        {/* Nodes */}
        {layers.map((layer, layerIndex) =>
          Array.from({ length: layer.nodes }, (_, nodeIndex) => {
            const y = getNodeY(layerIndex, nodeIndex, layer.nodes);
            const isInput = layerIndex === 0;
            const isOutput = layerIndex === layers.length - 1;
            return (
              <g key={`${layerIndex}-${nodeIndex}`}>
                {/* Outer ring */}
                <motion.circle
                  cx={layer.x}
                  cy={y}
                  r={isInput || isOutput ? 10 : 8}
                  fill="none"
                  stroke={isOutput ? "#00ff88" : "#22d3ee"}
                  strokeWidth="1"
                  opacity="0.5"
                  animate={{
                    r: isInput || isOutput ? [10, 12, 10] : [8, 10, 8],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: (layerIndex + nodeIndex) * 0.1,
                  }}
                />
                {/* Inner node */}
                <motion.circle
                  cx={layer.x}
                  cy={y}
                  r={isInput || isOutput ? 6 : 4}
                  fill={isOutput ? "#00ff88" : isInput ? "#f472b6" : "#22d3ee"}
                  filter="url(#nodeGlow)"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: (layerIndex + nodeIndex) * 0.05,
                  }}
                />
              </g>
            );
          })
        )}

        {/* Layer labels */}
        <text x="50" y="195" fill="#f472b6" fontSize="8" textAnchor="middle" fontFamily="monospace">
          INPUT
        </text>
        <text x="150" y="195" fill="#22d3ee" fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.6">
          CONV
        </text>
        <text x="250" y="195" fill="#22d3ee" fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.6">
          POOL
        </text>
        <text x="350" y="195" fill="#22d3ee" fontSize="8" textAnchor="middle" fontFamily="monospace" opacity="0.6">
          FC
        </text>
        <text x="450" y="195" fill="#00ff88" fontSize="8" textAnchor="middle" fontFamily="monospace">
          OUTPUT
        </text>
      </svg>

      {/* Processing indicator */}
      <motion.div
        className="absolute top-2 right-2 flex items-center gap-2 text-[10px] font-mono text-cyan-400"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400" />
        INFERENCE
      </motion.div>
    </div>
  );
}
