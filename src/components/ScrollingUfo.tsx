"use client";
import React, { useEffect, useRef, useState } from "react";
import ufoImg from "../assets/images/ufo_space_craft_1781165155348.png";
import { useTransparentImage } from "../hooks/useTransparentImage";

type Position = { x: number; y: number };

export default function ScrollingUfo() {
  const ufoRef = useRef<HTMLDivElement>(null);
  const transparentUfoImg = useTransparentImage(ufoImg, 32);
  
  // Track scroll position
  const [scrollY, setScrollY] = useState(0);

  // Smooth interpolated coordinates for standard lag/inertia glide
  const currentPos = useRef<Position>({ x: 0, y: 0 });
  const targetPos = useRef<Position>({ x: 0, y: 0 });
  const previousPos = useRef<Position>({ x: 0, y: 0 });

  // Floating offset animation
  const floatOffset = useRef(0);

  // Set up tracking on scroll and resize
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Frame update ticks for smooth inertia (lerping)
  useEffect(() => {
    let animationFrameId: number;

    const updateUfoProgress = () => {
      floatOffset.current += 0.05;

      const getAbsolutePos = (id: string): Position | null => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 + window.scrollX,
          y: rect.top + rect.height / 2 + window.scrollY,
        };
      };

      // Query absolute page positions of targets
      const t1 = getAbsolutePos("ufo-target-1");
      const t2 = getAbsolutePos("ufo-target-2");
      const t3 = getAbsolutePos("ufo-target-3");
      const t4 = getAbsolutePos("ufo-target-4");

      if (!t1 || !t2 || !t3 || !t4) {
        // If targets aren't fully loaded/mounted, retry in next frame safely
        animationFrameId = requestAnimationFrame(updateUfoProgress);
        return;
      }

      const currentScroll = window.scrollY;

      // Map scroll positions to track interpolation ranges
      const s1 = t1.y - window.innerHeight / 1.5;
      const s2 = t2.y - window.innerHeight / 2.2;
      const s3 = t3.y - window.innerHeight / 2.2;
      const s4 = t4.y - window.innerHeight / 2.2;

      let targetX = t1.x;
      let targetY = t1.y;
      let targetOpacity = 0;
      let targetScale = 0.5;

      // 1. Before Urgency Section: fade in
      if (currentScroll < s1) {
        targetX = t1.x;
        targetY = t1.y;
        const dist = s1 - currentScroll;
        targetOpacity = Math.max(0, 1 - dist / 350);
        targetScale = 0.6 + (1 - dist / 350) * 0.25; // Scales up to 0.85
      }
      // 2. Target 1 to Target 2 (Urgency to JAXA)
      else if (currentScroll >= s1 && currentScroll < s2) {
        const p = (currentScroll - s1) / (s2 - s1);
        targetX = t1.x + (t2.x - t1.x) * p;
        targetY = t1.y + (t2.y - t1.y) * p;
        targetOpacity = 1;
        targetScale = 0.85 - p * 0.4; // Shrinks slightly to focus on JAXA point (0.45)
      }
      // 3. Target 2 to Target 3 (JAXA to Portfolio Slider)
      else if (currentScroll >= s2 && currentScroll < s3) {
        const p = (currentScroll - s2) / (s3 - s2);
        targetX = t2.x + (t3.x - t2.x) * p;
        targetY = t2.y + (t3.y - t2.y) * p;
        targetOpacity = 1;
        targetScale = 0.45 + p * 0.45; // Grows up to 0.9 for portfolio section
      }
      // 4. Target 3 to Target 4 (Portfolio to Automatization Section)
      else if (currentScroll >= s3 && currentScroll < s4) {
        const p = (currentScroll - s3) / (s4 - s3);
        targetX = t3.x + (t4.x - t3.x) * p;
        targetY = t3.y + (t4.y - t3.y) * p;
        targetOpacity = 1;
        targetScale = 0.9 + p * 0.4; // Grows to a generous 1.30 as it lands in original slot
      }
      // 5. Settled inside Automatization Landing Pad (Section 4)
      else {
        targetX = t4.x;
        targetY = t4.y;
        targetScale = 1.3;
        targetOpacity = 1;
      }

      // Smooth Lerp (Linear Interpolation) for sluggish weight/inertia
      // Also adds a subtle hover floating cycle on the target position
      const hoverCycle = Math.sin(floatOffset.current) * 12;
      const lerpFactor = 0.08; // Adjust to make UFO slide faster (0.15) or lazier (0.05)

      // Initialize if coordinates are 0
      if (currentPos.current.x === 0 && currentPos.current.y === 0) {
        currentPos.current.x = targetX;
        currentPos.current.y = targetY;
      }

      previousPos.current = { ...currentPos.current };
      currentPos.current.x += (targetX - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetY + hoverCycle - currentPos.current.y) * lerpFactor;

      // Compute visual rotation based on heading trajectory (DX/DY)
      const dx = currentPos.current.x - previousPos.current.x;
      const rollTilt = Math.max(-28, Math.min(28, dx * 0.65)); // Roll bank angle during lateral turns
      const pitchTilt = Math.max(-12, Math.min(12, Math.sin(floatOffset.current * 0.5) * 8)); // Continuous pitch hover

      // Update actual DOM element properties directly for maximum layout execution speed and 0 throttle lag
      if (ufoRef.current) {
        const viewportX = currentPos.current.x;
        const viewportY = currentPos.current.y - currentScroll;

        ufoRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${targetScale}) rotate(${rollTilt}deg) rotateX(${pitchTilt}deg)`;
        ufoRef.current.style.left = `${viewportX}px`;
        ufoRef.current.style.top = `${viewportY}px`;
        ufoRef.current.style.opacity = `${targetOpacity}`;
        ufoRef.current.style.display = targetOpacity <= 0.01 ? "none" : "block";
      }

      animationFrameId = requestAnimationFrame(updateUfoProgress);
    };

    animationFrameId = requestAnimationFrame(updateUfoProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={ufoRef}
      className="fixed pointer-events-none select-none z-5 overflow-visible transition-[opacity,scale] ease-out duration-300 filter drop-shadow-[0_20px_50px_rgba(60,162,250,0.45)]"
      style={{
        width: "280px",
        height: "170px",
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src={transparentUfoImg}
        alt="Transiting UFO Scout Ship"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain"
      />
      
      {/* Sleek Blue Ion Engine Exhaust thrust glow */}
      <div className="absolute left-[35%] right-[35%] bottom-[12%] h-[6px] bg-[#3ca2fa] blur-[4px] rounded-full opacity-70 animate-pulse" />
    </div>
  );
}
