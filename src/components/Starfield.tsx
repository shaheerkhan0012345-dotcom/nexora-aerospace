import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  colorClass: string;
}

interface StarfieldProps {
  count?: number;
  className?: string;
}

export default function Starfield({ count = 50, className = "" }: StarfieldProps) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: count }).map((_, i) => {
      // 80% white, 10% soft blue/cyan, 10% brand blue
      const roll = Math.random();
      let colorClass = "bg-white";
      if (roll > 0.9) {
        colorClass = "bg-cyan-300 shadow-[0_0_4px_rgba(34,211,238,0.6)]";
      } else if (roll > 0.8) {
        colorClass = "bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.6)]";
      }

      return {
        id: i,
        // coordinate grid layout with some noise to ensure even distribution
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.8, // 0.8px to 2.8px
        opacity: Math.random() * 0.7 + 0.3,
        twinkleDuration: Math.random() * 4 + 2, // 2s to 6s
        colorClass
      };
    });
    setStars(generatedStars);
  }, [count]);

  return (
    <div className={`absolute inset-0 select-none overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Twilight Ambient Star Glows */}
      <div className="absolute top-[20%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-blue-900/10 blur-[120px]" />
      <div className="absolute bottom-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-950/10 blur-[155px]" />

      {/* Render Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full transition-opacity ${star.colorClass}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.twinkleDuration}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Embedded twinkling animation style to avoid external CSS dependency */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
