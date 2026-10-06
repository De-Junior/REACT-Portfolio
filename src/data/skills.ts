import type { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    icon: '🎨',
    title: 'Frontend & UI',
    tags: ['React', 'Next.js', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Shadcn UI', 'TanStack Query', 'Zustand', 'React Hook Form', 'Zod'],
  },
  {
    icon: '⚙️',
    title: 'Backend & APIs',
    tags: ['Node.js', 'REST APIs', 'Server Actions', 'Socket.io', 'Redis', 'BullMQ', 'NextAuth', 'JWT', 'OAuth', 'Stripe', 'OpenAI API'],
  },
  {
    icon: '🗄️',
    title: 'Databases & ORMs',
    tags: ['PostgreSQL', 'Prisma ORM', 'Neon', 'Supabase', 'SQL'],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    tags: ['Vercel', 'AWS S3', 'Docker', 'GitHub Actions', 'CI/CD', 'Sentry'],
  },
  {
    icon: '🧪',
    title: 'Testing & Quality',
    tags: ['Vitest', 'Playwright', 'React Testing Library', 'Agile/Scrum'],
  },
  {
    icon: '🔐',
    title: 'Security',
    tags: ['Helmet', 'Rate Limiting', 'CSRF Protection', 'bcrypt', 'Row Level Security'],
  },
];
