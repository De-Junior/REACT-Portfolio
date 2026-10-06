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
    title: 'Founder and software engineer',
    period: '2026 – present',
    summary: 'Building and operating RouteClub, a ride-sharing product for the Limpopo to Gauteng corridor.',
    highlights: [
      'Designed and built the mobile app, API, database, payment flow, operations console and company website.',
      'Own releases, backups, monitoring and the Google Play listing.',
    ],
  },
  {
    organisation: 'Sima Digital Agencies',
    title: 'Software Developer, Work Integrated Learning',
    period: 'Apr 2025 – Dec 2025',
    summary: 'Production features for client web applications in an Agile team, with sprint planning and code review.',
    highlights: [
      'Reduced average page load time by 23% across core routes by improving server-side rendering and query efficiency.',
      'Cut the frontend defect rate by 15% by fixing UI issues raised in sprints and QA.',
      'Built reusable React components with the Next.js App Router and TypeScript over REST APIs and PostgreSQL.',
    ],
  },
  {
    organisation: 'Tirisano Education Institute',
    title: 'Volunteer data visualisation intern',
    period: 'Sep 2025 – Jan 2026',
    summary: 'Turned programme data into reports for stakeholders.',
    highlights: ['Analysed programme data in Excel and mapped organisational networks in Kumu and Neo4j.'],
  },
];

export const education: { name: string; detail: string; year: string }[] = [
  { name: 'Diploma in Information Technology (NQF 6)', detail: 'Richfield Graduate Institute of Technology', year: '2025' },
  { name: 'FNB App Academy', detail: 'Full-stack development programme', year: '2025' },
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
