import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, type MotionStyle } from 'framer-motion';

import { useTheme } from '../theme/useTheme';

export const DoodleCursor: React.FC = () => {
  const isTouch: boolean =
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const { theme } = useTheme();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });

  useEffect(() => {
    if (isTouch) return;
    let raf: number | null = null;
    const move = (e: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="doodle-cursor"
      style={
        {
          position: 'fixed',
          left: springX,
          top: springY,
          width: theme === 'paper' ? 18 : 14,
          height: theme === 'paper' ? 22 : 16,
          transform: 'translate(-4px, -2px) rotate(-10deg)',
          pointerEvents: 'none',
          zIndex: 10000,
          background:
            theme === 'paper'
              ? "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 22\"><path d=\"M16 0 L2 0 C1 0 0 1 0 2 L0 18 C0 19 1 20 2 20 L12 20 L18 14 L18 2 C18 1 17 0 16 0Z\" fill=\"%23c4450c\"/><path d=\"M12 14 L18 14 L12 20Z\" fill=\"%233a3226\"/></svg>') no-repeat center/contain"
              : "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14 16\"><rect x=\"5\" y=\"12\" width=\"8\" height=\"3\" rx=\"1\" fill=\"%23ffb74d\"/><rect x=\"3\" y=\"2\" width=\"10\" height=\"8\" rx=\"1\" fill=\"%23e8e4dc\"/></svg>') no-repeat center/contain",
        } as MotionStyle
      }
    />
  );
};
