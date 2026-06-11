import { useEffect } from 'react';
import gsap from 'gsap';

export default function useGsapSmoothScroll() {
  useEffect(() => {
    // Only enable premium smooth scrolling on non-touch desktop screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const scrollObj = { y: window.scrollY };
    let targetY = window.scrollY;

    let lastWheelTime = 0;
    let velocityMultiplier = 1;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = performance.now();
      const timeDiff = now - lastWheelTime;
      lastWheelTime = now;

      // If consecutive wheel events occur within 150ms, build momentum (acceleration)
      if (timeDiff < 150) {
        // Build up to a max multiplier of 2.8x for fast scrolling
        velocityMultiplier = Math.min(2.8, velocityMultiplier + 0.2);
      } else {
        velocityMultiplier = 1.0;
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate target scroll using the accelerated wheel delta
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY * 1.15 * velocityMultiplier));

      // Shorter duration makes it feel extremely snappy and responsive
      // When scrolling quickly, duration decreases to make it finish faster and feel more modern
      const duration = Math.max(0.35, 0.65 - (velocityMultiplier * 0.12));

      // Tween current scroll to target scroll with GSAP
      gsap.killTweensOf(scrollObj);
      gsap.to(scrollObj, {
        y: targetY,
        duration: duration,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
        },
      });
    };

    // Keep state in sync if scrolled naturally via scrollbars, key navigation, or anchors
    const handleScroll = () => {
      if (!gsap.isTweening(scrollObj)) {
        targetY = window.scrollY;
        scrollObj.y = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      gsap.killTweensOf(scrollObj);
    };
  }, []);
}
