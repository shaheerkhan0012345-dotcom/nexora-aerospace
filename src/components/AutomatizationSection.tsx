"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Cpu, Orbit, Zap } from "lucide-react";
import ufoImage from "../assets/images/ufo_space_craft_1781165155348.png";
import { useTransparentImage } from "../hooks/useTransparentImage";
import Starfield from "./Starfield";

export default function AutomatizationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const transparentUfoImage = useTransparentImage(ufoImage, 32);

  // Motion values for smooth 3D parallax card tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to dampen mouse movement for 3D tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    damping: 25,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    damping: 25,
    stiffness: 150,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to [-0.5, 0.5]
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      id="automatization-section"
      className="relative min-h-[85vh] w-full bg-black py-16 md:py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-t border-neutral-900/60"
    >
      {/* Dynamic Background Gradient - blending smoothly with deep purples & blues */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(130%_130%_at_90%_50%,#5a37f525_0%,#170c4f15_45%,#000000_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-800/50 to-transparent" />
      </div>

      {/* Dynamic Starfield Overlay */}
      <Starfield count={75} />

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left Side Content Block */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8">
          <div className="flex flex-col space-y-3">
            {/* Section Category Indicator */}
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#3ca2fa] uppercase w-fit select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3ca2fa] animate-pulse" />
              <span>COORDINATE TELEMETRY</span>
            </div>

            {/* Headline matching reference style */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] uppercase">
              REVOLUTIONARY <br className="hidden sm:inline" />
              <span className="text-[#3ca2fa] drop-shadow-[0_0_12px_rgba(60,162,250,0.3)]">
                UFO DEPARTURE & LANDING
              </span>
            </h2>
          </div>

          {/* Description Block */}
          <div className="space-y-4 max-w-xl">
            <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              Watch real-time aerospace tracking in action. As you scroll through Nexora's
              sectors, our deep-space scout craft calculates coordinate vectors and adjusts
              its hover height, rotation, and banking angle to land perfectly inside the pad.
            </p>
            <p className="font-sans text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              No static placeholders—this trajectory is fully synchronous with your scroll velocity,
              crafting an immersive, interactive cosmic simulation.
            </p>
          </div>

          {/* Micro stats under text */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-900">
            <div className="flex flex-col space-y-1">
              <span className="text-white font-display text-xl font-bold tracking-tight">0.02s</span>
              <span className="text-[10px] font-mono uppercase text-[#3ca2fa] tracking-wider">Telemetry Latency</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-white font-display text-xl font-bold tracking-tight">100%</span>
              <span className="text-[10px] font-mono uppercase text-[#3ca2fa] tracking-wider">Dynamic Tracking</span>
            </div>
            <div className="flex flex-col space-y-1 col-span-2 md:col-span-1">
              <span className="text-white font-display text-xl font-bold tracking-tight">Real-time</span>
              <span className="text-[10px] font-mono uppercase text-[#3ca2fa] tracking-wider">Target Docking</span>
            </div>
          </div>
        </div>

        {/* Right Side Visual Block: 3D Landing Spot Container for the Scrolling UFO */}
        <div className="lg:col-span-6 flex justify-center items-center relative min-h-[350px] md:min-h-[450px]">
          {/* Outer Ambient Blue & Violet Glow Ring */}
          <div className="absolute inset-0 bg-radial-gradient from-brand-blue/20 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

          {/* Landing pad visual guide representing a stable parking vector */}
          <div className="absolute h-64 w-64 rounded-full border border-dashed border-brand-blue/15 animate-[spin_40s_linear_infinite] flex items-center justify-center opacity-60">
            <div className="h-48 w-48 rounded-full border border-dotted border-purple-500/10 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-brand-blue/5 border border-brand-blue/5" />
            </div>
          </div>

          <motion.div
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              transformStyle: "preserve-3d",
            }}
            className="w-full max-w-[420px] aspect-square flex justify-center items-center select-none relative"
          >
            {/* Target 4: Resting place for the UFO. This invisible div will be tracked by the Scroll coordinator */}
            <div 
              id="ufo-target-4" 
              className="absolute h-48 w-48 rounded-full flex items-center justify-center border border-brand-blue/10 bg-brand-blue/5 pointer-events-none"
            >
              <div id="ufo-target-4-center" className="w-1 h-1 opacity-0" />
            </div>

            {/* Extra sleek micro-detail elements floating around */}
            <div className="absolute top-[10%] left-[10%] pointer-events-none select-none z-25">
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 backdrop-blur-md"
              >
                <Cpu className="h-3 w-3 text-[#3ca2fa]" />
                <span className="text-[9px] font-mono tracking-wider text-neutral-300">AUTO-SYSTEM COORD</span>
              </motion.div>
            </div>

            <div className="absolute bottom-[10%] right-[5%] pointer-events-none select-none z-25">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 backdrop-blur-md"
              >
                <Orbit className="h-3 w-3 text-emerald-400" />
                <span className="text-[9px] font-mono tracking-wider text-neutral-300">NEXORA UFO STABLE</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
