import React from 'react';
import { motion, useScroll, type MotionStyle } from 'framer-motion';

import { useTheme } from '../theme/useTheme';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress-bar"
      style={
        {
          position: 'fixed',
          top: 0,
          left: 0,
          height: 4,
          right: 0,
          background: theme === 'paper' ? 'var(--accent)' : 'var(--accent2)',
          transformOrigin: '0%',
          scaleX: scrollYProgress,
          zIndex: 10001,
          borderRadius: '0 0 4px 0',
        } as MotionStyle
      }
    />
  );
};
