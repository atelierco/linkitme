import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

/**
 * Landing header for the studio-wall design.
 * Wordmark left, sparse navigation and a pill log-in button right.
 */
export function WallHeader() {
  return (
    <header className="relative z-10 flex items-center justify-between gap-6 px-6 py-6 md:px-12">
      <Link
        href="/"
        className="text-xl font-bold tracking-[-0.03em] text-ink-strong"
        aria-label="LinkItMe home"
      >
        LinkItMe
      </Link>

      <div className="flex items-center gap-5 md:gap-7">
        <a href="#wall" className="text-sm font-medium text-ink-muted hover:text-ink-strong">
          Explore
        </a>
        <Button asChild variant="outline" size="sm" className="rounded-full">
          <Link href="/login">Log in</Link>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
