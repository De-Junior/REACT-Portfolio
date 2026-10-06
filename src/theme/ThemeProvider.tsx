import React, { useEffect, useState, useCallback, type ReactNode } from 'react';

import { getGlobalCSS } from './globalCss';
import { ThemeContext } from './useTheme';
import type { Theme } from '../types';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('jj-theme');
      return saved === 'paper' || saved === 'chalkboard' ? saved : 'paper';
    } catch {
      return 'paper';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jj-theme', theme);
    } catch {
      // silently ignore storage errors
    }
    let el = document.getElementById('jj-global-styles');
    if (!el) {
      el = document.createElement('style');
      el.id = 'jj-global-styles';
      document.head.appendChild(el);
    }
    el.textContent = getGlobalCSS(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'paper' ? 'chalkboard' : 'paper'));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
