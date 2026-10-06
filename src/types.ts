import { type ReactNode, type CSSProperties } from 'react';

export type Theme = 'paper' | 'chalkboard';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface GitHubStatsState {
  repos: number | null;
  stars: number | null;
  loading: boolean;
  error: boolean;
}

export interface StatItem {
  num: number;
  label: string;
  icon: string;
}

export interface InfoItem {
  icon: string;
  label: string;
  val: string;
  href?: string;
  accent?: boolean;
}

export interface SkillCategory {
  icon: string;
  title: string;
  tags: string[];
}

export interface ExperienceEntry {
  date: string;
  icon: string;
  role: string;
  company: string;
  desc: string;
}

export interface Project {
  title: string;
  desc: string;
  icon: string;
  tags: string[];
  link: string;
  github?: string;
  architecture: string;
}

export interface DesignToken {
  name: string;
  value: string;
  desc: string;
}

export interface ContactItem {
  icon: ReactNode;
  label: string;
  val: string;
  href: string;
}
