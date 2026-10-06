import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

import { TiltCard } from '../components/TiltCard';
import { GITHUB_USERNAME } from '../config';
import type { GitHubStatsState } from '../types';

export const GitHubStats: React.FC = () => {
  const [state, setState] = useState<GitHubStatsState>({
    repos: null,
    stars: null,
    loading: true,
    error: false,
  });

  const fetchStats = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: false }));
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Unexpected response');
      setState({
        repos: data.length,
        stars: data.reduce((acc: number, repo: { stargazers_count?: number }) => acc + (repo.stargazers_count || 0), 0),
        loading: false,
        error: false,
      });
    } catch {
      setState({ repos: null, stars: null, loading: false, error: true });
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <section
      className="github-stats-section"
      aria-labelledby="github-heading"
      style={{ padding: '60px 32px', background: 'var(--bg)' }}
    >
      <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--accent)' }}>
          🐙 live from GitHub
        </span>
        <h2 id="github-heading" className="sr-only">
          GitHub statistics
        </h2>
        <TiltCard
          className="torn-paper"
          style={{
            padding: 24,
            marginTop: 16,
            display: 'flex',
            justifyContent: 'center',
            gap: 40,
            flexWrap: 'wrap',
            alignItems: 'center',
            minHeight: 80,
          }}
        >
          {state.loading && (
            <div
              style={{ fontFamily: 'var(--font-accent)', color: 'var(--text-muted)' }}
              aria-live="polite"
              aria-busy="true"
            >
              Loading stats…
            </div>
          )}
          {state.error && !state.loading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
              aria-live="polite"
            >
              <span
                style={{
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.9rem',
                }}
              >
                Couldn't load stats.
              </span>
              <button
                onClick={fetchStats}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'none',
                  border: '1px dashed var(--border)',
                  borderRadius: 4,
                  padding: '4px 12px',
                  cursor: 'pointer',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                }}
                aria-label="Retry loading GitHub stats"
              >
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          )}
          {!state.loading && !state.error && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                  aria-label={`${state.repos} public repositories`}
                >
                  {state.repos}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Public Repos</div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                  aria-label={`${state.stars} total stars`}
                >
                  {state.stars}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Stars</div>
              </div>
            </>
          )}
        </TiltCard>
        <p
          style={{
            marginTop: 12,
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-accent)',
          }}
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent3)', textDecoration: 'underline' }}
          >
            View profile on GitHub ↗
          </a>
        </p>
      </div>
    </section>
  );
};
