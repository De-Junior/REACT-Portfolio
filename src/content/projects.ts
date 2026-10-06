export type Link = { label: string; href: string };
export type Fact = { label: string; value: string };
export type Decision = { title: string; body: string };

export type CaseStudy = {
  id: string;
  name: string;
  kind: string;
  tagline: string;
  summary: string;
  facts: Fact[];
  decisions: Decision[];
  links: Link[];
  /** Shown when the source isn't public, so reviewers know why there's no code link. */
  sourceNote?: string;
};

export const routeClub: CaseStudy & {
  parts: Decision[];
  status: Fact[];
} = {
  id: 'routeclub',
  name: 'RouteClub',
  kind: 'Product',
  tagline: 'Long-distance ride sharing between Limpopo and Gauteng',
  summary:
    'Drivers post trips along the Giyani, Malamulele, Pretoria and Johannesburg corridor with their own pickup points and fares. Riders search for their segment, book a seat and pay in the app. I designed and built the whole system and run it through my company, Route Technologies.',
  facts: [
    { label: 'Role', value: 'Founder and engineer' },
    { label: 'Company', value: 'Route Technologies (Pty) Ltd' },
    { label: 'Platforms', value: 'Android app, operations console, website' },
    { label: 'Stack', value: 'Expo, Express, Prisma, PostgreSQL' },
  ],
  parts: [
    {
      title: 'Mobile app',
      body: 'React Native and Expo. One app for riders and drivers: segment search, multi-stop trip posting, booking and payment, chat, waiting lists, ratings, identity checks and an SOS flow.',
    },
    {
      title: 'API',
      body: 'Node.js, Express and Prisma on Railway, organised by feature. JWT sessions, Google sign-in, one-time codes by email and SMS, rate limits and sign-in throttling.',
    },
    {
      title: 'Data',
      body: 'A 47-table PostgreSQL schema on Supabase, private storage for identity documents, and nightly backups that are restored after each run to prove they work.',
    },
    {
      title: 'Operations console',
      body: 'A Next.js console for verifications, payments and refunds, safety reports, SOS events, fares and places, with administrator access approved by a super admin.',
    },
  ],
  decisions: [
    {
      title: 'A trip is many priced journeys',
      body: 'A posted trip is an ordered route with several pickups and drop-offs. Every origin and destination pair carries its own fare, and search matches the rider’s own segment, so one trip can serve Giyani to Pretoria and Malamulele to Johannesburg.',
    },
    {
      title: 'The payment provider is the source of truth',
      body: 'An Ozow notification only prompts the API to ask Ozow what happened. Payments move through an explicit state machine, conditional updates make each transition happen exactly once, and reconciliation settles payments whose notification never arrived.',
    },
    {
      title: 'Invariants live in the database',
      body: 'Rules protecting seats, bookings, payments and credit balances are CHECK constraints and partial unique indexes. Before accepting traffic, the server verifies each rule exists exactly as written and refuses to start if one is missing.',
    },
    {
      title: 'Latency budgeted per round trip',
      body: 'The API and database sit about 150 ms apart, so query speed was never the bottleneck. I traced round trips per request at the wire level and reshaped hot paths to make fewer sequential queries.',
    },
    {
      title: 'Operable from the first release',
      body: 'Every response carries a request ID shared with logs and Sentry, administrator actions are audit-logged, and CI runs unit tests plus around fifty end-to-end checks against a fresh database on every push.',
    },
  ],
  status: [
    { label: 'Android', value: 'Internal testing on Google Play' },
    { label: 'iOS', value: 'Not yet released' },
    { label: 'Payments', value: 'Ozow integration built, live verification in progress' },
  ],
  links: [
    { label: 'Product page', href: 'https://routetechnologies.co.za/routeclub/' },
    { label: 'Route Technologies', href: 'https://routetechnologies.co.za/' },
  ],
  sourceNote: 'Company product with a private repository. I’m glad to walk through the code in an interview.',
};

export const teamFlow: CaseStudy = {
  id: 'teamflow',
  name: 'TeamFlow',
  kind: 'SaaS',
  tagline: 'Multi-tenant project management',
  summary:
    'Organisations get isolated workspaces with projects, a Kanban board, detailed tasks, analytics and subscription billing. I built it to work through the parts of B2B software that are easy to get wrong: tenancy, permissions and payments.',
  facts: [
    { label: 'Type', value: 'Personal project' },
    { label: 'Stack', value: 'Next.js, React, TypeScript, Prisma, PostgreSQL' },
    { label: 'Services', value: 'Stripe, Pusher, Resend, Gemini' },
    { label: 'Status', value: 'Live, with a one-click demo' },
  ],
  decisions: [
    {
      title: 'Tenant isolation by construction',
      body: 'Tenant data goes through scoped repositories and one access guard, so a record from another organisation resolves to “not found”. Unit tests cover the cross-tenant case.',
    },
    {
      title: 'One permission matrix, enforced on the server',
      body: 'Five roles map to permissions in a single module that both the interface and every mutating API route read. A test asserts that no lower role holds a permission a higher one lacks.',
    },
    {
      title: 'Revocable sessions on stateless tokens',
      body: 'Each sign-in records a session the token refers to, re-checked at most every five minutes, so users can sign out other devices without a database lookup on every request.',
    },
    {
      title: 'Idempotent billing',
      body: 'Stripe webhooks are signature-verified and recorded by event ID before processing, so a retried delivery is a no-op.',
    },
  ],
  links: [
    { label: 'Live demo', href: 'https://teamflow-rosy-three.vercel.app' },
    { label: 'Source', href: 'https://github.com/De-Junior/Teamflow' },
  ],
};

export const connectDevs: CaseStudy = {
  id: 'connectdevs',
  name: 'ConnectDevs',
  kind: 'Platform',
  tagline: 'Project collaboration for developers',
  summary:
    'Developers post side projects, apply to join teams and coordinate through direct messages and notifications. Owners review applications, and everyone can follow the people whose work they want to keep up with.',
  facts: [
    { label: 'Type', value: 'Personal project' },
    { label: 'Stack', value: 'Next.js Server Actions, Prisma, PostgreSQL' },
    { label: 'Status', value: 'Live' },
  ],
  decisions: [
    {
      title: 'Thin actions over a data layer',
      body: 'Server Actions validate input with Zod and check ownership, then call a data layer that owns every query. Business rules sit in one place instead of spreading across pages.',
    },
    {
      title: 'Public shapes by default',
      body: 'Shared select shapes keep private fields such as email addresses out of public responses, and a test fails if one is added back.',
    },
  ],
  links: [{ label: 'Live site', href: 'https://connect-liart-omega.vercel.app' }],
};

export const otherWork: { name: string; description: string; stack: string; links: Link[] }[] = [
  {
    name: 'Route Technologies website',
    description: 'Company site for Route Technologies and RouteClub, with legal pages and an enquiry form wired to the RouteClub API.',
    stack: 'Next.js, TypeScript',
    links: [{ label: 'Visit', href: 'https://routetechnologies.co.za/' }],
  },
  {
    name: 'Clinical dashboard',
    description: 'Responsive dashboard for patient vitals, lab results and history, charting data from a REST API.',
    stack: 'JavaScript, Chart.js',
    links: [
      { label: 'Visit', href: 'https://de-junior.github.io/Health-Care/' },
      { label: 'Source', href: 'https://github.com/De-Junior/Health-Care' },
    ],
  },
];
