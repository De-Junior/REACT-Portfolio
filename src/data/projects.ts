import { GITHUB_USERNAME } from '../config';
import type { Project } from '../types';

// Keep these in step with each repository's README: every claim here should
// be something a reviewer can verify in the code or the live demo.
export const projectsData: Project[] = [
  {
    title: 'TeamFlow — Multi‑Tenant SaaS for Project Management',
    desc: 'Isolated team workspaces with role‑based access, a drag‑and‑drop Kanban board with subtasks, comments and time tracking, realtime notifications, analytics with AI insights and Stripe billing. One‑click demo login on the landing page.',
    icon: '🏢',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'Auth.js', 'Stripe', 'Pusher', 'Vitest'],
    link: 'https://teamflow-rosy-three.vercel.app',
    github: `https://github.com/${GITHUB_USERNAME}/Teamflow`,
    architecture:
      'Tenant isolation through scoped repositories and access guards, one permission matrix enforced in the UI and on every API route, revocable JWT sessions, idempotent Stripe webhooks and CI on GitHub Actions.',
  },
  {
    title: 'ConnectDevs — Developer Collaboration Platform',
    desc: 'Developers post side projects, apply to join teams and coordinate through direct messages, with owner‑approved applications, follows, an activity feed and in‑app notifications.',
    icon: '🤝',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma', 'Auth.js', 'TanStack Query', 'Tailwind CSS'],
    link: 'https://connect-liart-omega.vercel.app/',
    github: `https://github.com/${GITHUB_USERNAME}/Connect`,
    architecture:
      'Server Actions validate with Zod and check ownership before calling a dedicated data layer; shared select shapes keep private fields out of public responses.',
  },
  {
    title: 'Healthcare Clinical Dashboard',
    desc: 'Responsive dashboard for patient vitals, lab results & medical history. Integrates REST APIs and visualises data with Chart.js across 5+ interactive chart types.',
    icon: '🏥',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Chart.js'],
    link: `https://${GITHUB_USERNAME}.github.io/Health-Care/`,
    github: `https://github.com/${GITHUB_USERNAME}/Health-Care`,
    architecture: 'Client-side rendering with vanilla JS, Chart.js for data visualisation, multiple REST API integrations.',
  },
];
