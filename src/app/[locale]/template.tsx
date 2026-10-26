/**
 * Page transition. A template remounts on every navigation, so the CSS
 * entrance animation replays each time: a short fade + 8px rise that signals
 * the change without hiding content. Being CSS-only, the server-rendered
 * HTML is never invisible while waiting for hydration, and the global
 * `prefers-reduced-motion` rule collapses it to ~0ms.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
