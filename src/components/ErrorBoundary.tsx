import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 32,
            textAlign: 'center',
            fontFamily: 'var(--font-accent)',
            color: 'var(--text-muted)',
            border: '2px dashed var(--border)',
            borderRadius: 8,
            margin: '0 32px',
          }}
        >
          <span style={{ fontSize: '2rem' }}>✏️</span>
          <p style={{ marginTop: 8 }}>This section had a hiccup. Refresh to try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
