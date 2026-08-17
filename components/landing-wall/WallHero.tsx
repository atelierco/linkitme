import { PinnedWall } from './PinnedWall';
import { UsernameClaimField } from './UsernameClaimField';

/**
 * Hero for the studio-wall landing page.
 *
 * Oversized headline on the left, the pinned card wall on the right. The wall
 * is hidden below lg, where the absolute positioning has no room to breathe.
 */
export function WallHero() {
  return (
    <div className="relative z-[5] grid grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 pb-8 pt-12 md:px-12 lg:min-h-[74vh] lg:grid-cols-[minmax(min(100%,440px),1fr)_auto] lg:gap-12 lg:pb-16 lg:pr-0 xl:gap-16">
      <div className="flex w-full min-w-0 max-w-[540px] flex-col gap-6">
        <h1 className="m-0 text-[clamp(40px,4.6vw,68px)] font-bold leading-[0.98] tracking-[-0.032em] text-ink-strong text-balance">
          Make a corner of the internet that looks like you.
        </h1>

        <p className="m-0 max-w-[420px] text-lg leading-[1.55] text-ink-muted text-pretty">
          One page for everything you make. Pin it up, move it around, publish when it feels right.
        </p>

        <UsernameClaimField />

        <p className="m-0 text-sm text-ink-muted">
          Free forever.{' '}
          <a href="/login" className="font-medium text-ink-strong hover:underline">
            Log in
          </a>{' '}
          if you already have a page.
        </p>
      </div>

      {/* The wall bleeds off the right edge. Between lg and 2xl it scales down so
          the copy keeps a readable measure instead of being squeezed into one
          word per line; below lg it becomes a scrolling row (WallStrip). */}
      <div className="hidden lg:block lg:h-[410px] lg:w-[624px] xl:h-[515px] xl:w-[785px] 2xl:h-[660px] 2xl:w-[1006px]">
        <div className="origin-top-left scale-[0.62] xl:scale-[0.78] 2xl:scale-100">
          <PinnedWall />
        </div>
      </div>
    </div>
  );
}
