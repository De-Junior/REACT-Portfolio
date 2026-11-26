export type Role = {
  organisation: string;
  title: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const roles: Role[] = [
  {
    organisation: 'Route Technologies (Pty) Ltd',
    title: 'Director & Software Engineer',
    period: 'August 2026 – present',
    summary: 'Sole developer of RouteClub, a long-distance ride-sharing app connecting riders and independent drivers between Limpopo and Gauteng.',
    highlights: [
      'Built the React Native (Expo, TypeScript) app for Android and iOS, the Node.js, Express and Prisma API on PostgreSQL, and a Next.js administration dashboard.',
      'Made seat booking safe under concurrent requests with database transactions, guarded seat allocation and constraints against duplicate bookings and overselling.',
      'Integrated Google Maps route previews, push notifications, Ozow platform-fee payments with reconciliation, and email and SMS verification.',
      'Published on Google Play and the Apple App Store, and reached 150 registered users after the first public release on 15 October 2026.',
    ],
  },
];

export const education: { name: string; detail: string; year: string }[] = [
  { name: 'Diploma in Information Technology (NQF 6)', detail: 'Richfield Graduate Institute of Technology. Programming 89%, Information Systems 88%, Human Computer Interaction 86%', year: '2023 – 2025' },
  { name: 'National Senior Certificate', detail: 'New Era College', year: '2022' },
];

/** Grouped by what the tools are used for, each with where it was actually used. */
export const capabilities: { area: string; tools: string; usedIn: string }[] = [
  { area: 'Frontend', tools: 'TypeScript, React, Next.js, Tailwind CSS', usedIn: 'TeamFlow, ConnectDevs, RouteClub console' },
  { area: 'Mobile', tools: 'React Native, Expo, EAS builds, push notifications', usedIn: 'RouteClub app' },
  { area: 'Backend', tools: 'Node.js, Express, Next.js route handlers and Server Actions, Zod', usedIn: 'RouteClub API, TeamFlow, ConnectDevs' },
  { area: 'Data', tools: 'PostgreSQL, Prisma, Supabase, Neon', usedIn: 'Every project above' },
  { area: 'Integrations', tools: 'Ozow, Stripe, Twilio, Resend, Firebase, Pusher', usedIn: 'Payments, messaging and notifications' },
  { area: 'Delivery', tools: 'GitHub Actions, Vercel, Railway, Sentry, Vitest', usedIn: 'CI and hosting for all projects' },
];

export const principles: { title: string; body: string; evidence: string }[] = [
  {
    title: 'Put rules where they can’t be skipped',
    body: 'Permissions are checked on the server for every change, and data rules live in the database. A hidden button is a convenience, not a control.',
    evidence: 'RouteClub database invariants, TeamFlow access guards',
  },
  {
    title: 'Assume integrations fail',
    body: 'Webhooks get lost and providers time out. Handlers are idempotent, reconciliation catches what was missed, and side effects never fail the main request.',
    evidence: 'RouteClub payments, TeamFlow billing',
  },
  {
    title: 'Measure before optimising',
    body: 'Find out where the time goes first. On RouteClub that meant counting round trips per request rather than tuning queries that already ran in under a millisecond.',
    evidence: 'RouteClub performance notes',
  },
  {
    title: 'Test what would hurt',
    body: 'Tests start with permissions, money and data integrity, and CI runs them on every push. Coverage numbers come second to protecting behaviour.',
    evidence: 'TeamFlow and RouteClub pipelines',
  },
  {
    title: 'Prefer the boring option',
    body: 'One API with clear feature folders, PostgreSQL and a few well-chosen services. Extra moving parts have to earn their place.',
    evidence: 'RouteClub API structure',
  },
  {
    title: 'Write it down',
    body: 'Deploys, payments, backups and incident steps are documented next to the code, so nobody has to rediscover them under pressure.',
    evidence: 'RouteClub runbooks',
  },
];
