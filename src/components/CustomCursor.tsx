import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth delayed cursor ring
  const springConfig = { damping: 28, stiffness: 260, mass: 0.6 };
  const cursorRingX = useSpring(cursorX, springConfig);
  const cursorRingY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on non-touch screens with pointers
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target && (
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cursor-pointer') ||
          target.getAttribute('role') === 'button'
        )
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor completely under pointer device
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* 1. Core Dot: Instant reaction */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-blue rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 select-none shadow-[0_0_8px_rgba(44,100,247,0.85)]"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isClicking ? 0.7 : isHovered ? 1.6 : 1,
        }}
      />

      {/* 2. Outer Ring: Smooth delay tracking with crosshair detailing */}
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 border rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 select-none flex items-center justify-center"
        style={{
          x: cursorRingX,
          y: cursorRingY,
          scale: isClicking ? 1.3 : isHovered ? 1.8 : 1,
          borderColor: isHovered ? 'rgba(34, 211, 238, 0.75)' : 'rgba(44, 100, 247, 0.5)',
          backgroundColor: isHovered ? 'rgba(44, 100, 247, 0.08)' : 'rgba(0, 0, 0, 0)',
          boxShadow: isHovered ? '0 0 12px rgba(44, 100, 247, 0.25)' : '0 0 0px rgba(0,0,0,0)',
        }}
      >
        {/* High-tech tick marks */}
        <div className="absolute w-[2px] h-[5px] bg-brand-blue/60 top-0 left-1/2 -translate-x-1/2" />
        <div className="absolute w-[2px] h-[5px] bg-brand-blue/60 bottom-0 left-1/2 -translate-x-1/2" />
        <div className="absolute w-[5px] h-[2px] bg-brand-blue/60 left-0 top-1/2 -translate-y-1/2" />
        <div className="absolute w-[5px] h-[2px] bg-brand-blue/60 right-0 top-1/2 -translate-y-1/2" />
      </motion.div>
    </>
  );
}
