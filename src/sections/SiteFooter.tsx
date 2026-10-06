import { profile } from '../content/profile';

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="page flex flex-col gap-3 py-8 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <p>
          Designed and built with React and TypeScript.{' '}
          <a href={profile.source} target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center text-body underline underline-offset-4 hover:text-ink">
            View source
          </a>
        </p>
      </div>
    </footer>
  );
}
