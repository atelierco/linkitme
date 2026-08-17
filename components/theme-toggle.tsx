'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';

/**
 * Light/dark toggle for the nav bar.
 *
 * Renders a placeholder until mounted: the theme is only known on the client,
 * so rendering the real icon during SSR would mismatch on hydration.
 */
const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // false during SSR and the first client render, true afterwards.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="rounded-full text-ink-muted hover:text-ink-strong"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Switch theme'}
      title={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : undefined}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )
      ) : (
        <span className="size-4" />
      )}
    </Button>
  );
}
