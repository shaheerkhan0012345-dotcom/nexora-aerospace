import { useEffect, useState } from "react";

/**
 * Custom React hook that takes an image source with a black background
 * and returns a data URL representing the same image with a transparent background.
 * It loops through colors at runtime and converts black pixels to fully transparent.
 */
export function useTransparentImage(src: string, threshold: number = 28) {
  const [processedSrc, setProcessedSrc] = useState(src);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setProcessedSrc(src);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Loop through all pixels (R, G, B, A) and turn black pixels transparent
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Compute absolute luminance/intensity
          const maxVal = Math.max(r, g, b);

          if (maxVal < threshold) {
            // Apply gradual feathering transition based on proximity to black
            const ratio = maxVal / threshold;
            data[i + 3] = Math.round(ratio * 255 * 0.4); // Feather alpha channel safely
          } else {
            // Adjust dark internal shadow regions to be semi-transparent for realism
            const brightness = (r + g + b) / 3;
            if (brightness < 60) {
              const shadowAlpha = 110 + Math.round(((brightness - threshold) / (60 - threshold)) * 145);
              data[i + 3] = Math.min(data[i + 3], shadowAlpha);
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL());
      } catch (err) {
        console.warn("Dynamic image keying bypassed, using original asset:", err);
        setProcessedSrc(src);
      }
    };

    img.onerror = () => {
      setProcessedSrc(src);
    };
  }, [src, threshold]);

  return processedSrc;
}
