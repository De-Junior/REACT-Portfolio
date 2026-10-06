import React, { useRef, useState, useCallback, type CSSProperties } from 'react';
import { motion } from 'framer-motion';

import type { TiltCardProps } from '../types';

export const TiltCard: React.FC<TiltCardProps> = ({ children, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setTilt({
        x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4,
        y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      } as CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};
