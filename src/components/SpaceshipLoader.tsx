import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = "#2c64f7";

/* ---------- tiny helpers ---------- */
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

/* ---------- Starfield ---------- */
const Star: React.FC<{ delay: number; x: number; y: number; size: number }> = ({ delay, x, y, size }) => (
  <motion.div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      borderRadius: "50%",
      background: "#fff",
    }}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{ repeat: Infinity, duration: rand(2, 4), delay }}
  />
);

const Starfield = React.memo(() => {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: rand(0, 100),
        y: rand(0, 100),
        size: rand(1, 3),
        delay: rand(0, 3),
      })),
    []
  );
  return (
    <>
      {stars.map((s) => (
        <Star key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />
      ))}
    </>
  );
});

/* ---------- Orbital rings ---------- */
const OrbitRing: React.FC<{ size: number; duration: number; reverse?: boolean }> = ({
  size,
  duration,
  reverse,
}) => (
  <motion.div
    style={{
      position: "absolute",
      width: size,
      height: size,
      border: `1px solid rgba(44,100,247,0.15)`,
      borderRadius: "50%",
      top: "50%",
      left: "50%",
      marginTop: -size / 2,
      marginLeft: -size / 2,
    }}
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{ repeat: Infinity, duration, ease: "linear" }}
  />
);

/* ---------- Rocket SVG ---------- */
const Rocket: React.FC = () => (
  <svg width="60" height="140" viewBox="0 0 60 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* nose cone */}
    <path d="M30 0 C30 0 45 30 45 50 L15 50 C15 30 30 0 30 0Z" fill={BRAND} />
    {/* body */}
    <rect x="15" y="50" width="30" height="55" rx="2" fill="#1a1a2e" stroke={BRAND} strokeWidth="1" />
    {/* window */}
    <circle cx="30" cy="70" r="8" fill="#0d0d1a" stroke={BRAND} strokeWidth="1.5" />
    <circle cx="30" cy="70" r="4" fill={BRAND} opacity="0.3" />
    {/* fins */}
    <path d="M15 90 L0 115 L15 105Z" fill={BRAND} opacity="0.8" />
    <path d="M45 90 L60 115 L45 105Z" fill={BRAND} opacity="0.8" />
    {/* nozzle */}
    <path d="M20 105 L18 115 L42 115 L40 105Z" fill="#111" stroke={BRAND} strokeWidth="0.5" />
  </svg>
);

/* ---------- Engine plume ---------- */
const EnginePlume: React.FC = () => (
  <motion.div
    style={{
      position: "absolute",
      bottom: -35,
      left: "50%",
      transform: "translateX(-50%)",
      width: 20,
      height: 50,
      background: `radial-gradient(ellipse at top, ${BRAND} 0%, rgba(44,100,247,0.4) 40%, transparent 70%)`,
      borderRadius: "0 0 50% 50%",
      filter: "blur(2px)",
    }}
    animate={{ scaleY: [1, 1.3, 0.9, 1.1, 1], opacity: [0.9, 1, 0.8, 1, 0.9] }}
    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
  />
);

/* ---------- HUD ---------- */
const phases = ["IGNITION", "LIFTOFF", "MAX-Q", "ORBIT INSERTION"];

const HUD: React.FC<{ progress: number }> = ({ progress }) => {
  const phaseIdx = Math.min(Math.floor(progress / 25), 3);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        width: 260,
        padding: "12px 16px",
        background: "rgba(10,10,30,0.7)",
        backdropFilter: "blur(8px)",
        border: `1px solid rgba(44,100,247,0.25)`,
        borderRadius: 10,
        fontFamily: "'DM Sans', sans-serif",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div style={{ fontWeight: 700, letterSpacing: 3, color: BRAND, fontSize: 14, marginBottom: 4 }}>
        NEXORA
      </div>
      <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 6 }}>{phases[phaseIdx]}</div>
      {/* progress bar */}
      <div
        style={{
          width: "100%",
          height: 3,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 2,
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <motion.div
          style={{ height: "100%", background: BRAND, borderRadius: 2 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          opacity: 0.6,
        }}
      >
        <span>ALT {Math.floor(progress * 4)}km</span>
        <span>VEL {(progress * 0.08).toFixed(1)}km/s</span>
        <span>FUEL {Math.max(0, 100 - Math.floor(progress * 0.7))}%</span>
      </div>
    </div>
  );
};

/* ====================================================================
   SpaceshipLoader – full-screen overlay
   ==================================================================== */
export interface SpaceshipLoaderProps {
  onComplete?: () => void;
  duration?: number; // ms – default 3400
}

const SpaceshipLoader: React.FC<SpaceshipLoaderProps> = ({ onComplete, duration = 3400 }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onCompleteRef.current?.();
        }, 400);
      }
    };
    requestAnimationFrame(tick);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#050510",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Starfield />

          {/* orbital rings */}
          <OrbitRing size={160} duration={10} />
          <OrbitRing size={260} duration={14} reverse />
          <OrbitRing size={360} duration={18} />

          {/* rocket container – hover float */}
          <motion.div
            style={{ position: "relative", zIndex: 10 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Rocket />
            <EnginePlume />
          </motion.div>

          <HUD progress={progress} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpaceshipLoader;
