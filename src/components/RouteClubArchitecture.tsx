type Node = { name: string; detail: string };

const clients: Node[] = [
  { name: 'Android app', detail: 'React Native, Expo' },
  { name: 'Operations console', detail: 'Next.js on Vercel' },
  { name: 'Website', detail: 'Next.js on Vercel' },
];

const api: Node = { name: 'RouteClub API', detail: 'Express and Prisma on Railway' };

const services: Node[] = [
  { name: 'PostgreSQL', detail: 'Supabase, Frankfurt' },
  { name: 'Storage', detail: 'Identity documents' },
  { name: 'Ozow', detail: 'Payments' },
  { name: 'Twilio', detail: 'SMS codes, SOS' },
  { name: 'Resend', detail: 'Email' },
  { name: 'Firebase', detail: 'Push notifications' },
  { name: 'Sentry', detail: 'Errors and alerts' },
];

function Tile({ node, emphasis = false }: { node: Node; emphasis?: boolean }) {
  return (
    <li
      className={`rounded-lg border px-3.5 py-3 ${
        emphasis ? 'border-routeclub/40 bg-surface shadow-sm' : 'border-line bg-surface'
      }`}
    >
      <p className={`text-[0.875rem] font-medium ${emphasis ? 'text-routeclub' : 'text-ink'}`}>{node.name}</p>
      <p className="mt-0.5 text-[0.75rem] text-muted">{node.detail}</p>
    </li>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <span className="h-6 border-l border-dashed border-line-strong" />
      <span className="font-mono text-[0.6875rem] text-muted">{label}</span>
    </div>
  );
}

/** How RouteClub's pieces connect, drawn from the API's own README. */
export function RouteClubArchitecture() {
  return (
    <figure className="rounded-xl border border-line bg-subtle/60 p-4 md:p-6" data-reveal>
      <ul className="grid gap-2.5 sm:grid-cols-3" aria-label="Clients">
        {clients.map((node) => (
          <Tile key={node.name} node={node} />
        ))}
      </ul>
      <Connector label="HTTPS, signed JWT" />
      <ul className="mx-auto max-w-sm" aria-label="API">
        <Tile node={api} emphasis />
      </ul>
      <Connector label="Prisma, provider APIs" />
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7" aria-label="Services">
        {services.map((node) => (
          <Tile key={node.name} node={node} />
        ))}
      </ul>
      <figcaption className="mt-5 text-[0.8125rem] text-muted">
        One API serves the app, the console and the website. Payments, messaging and storage are external services behind it.
      </figcaption>
    </figure>
  );
}
