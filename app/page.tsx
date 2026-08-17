import { WallHeader } from '@/components/landing-wall/WallHeader';
import { WallHero } from '@/components/landing-wall/WallHero';
import { WallStrip } from '@/components/landing-wall/WallStrip';

/**
 * Landing page — "studio wall".
 *
 * Ported from the LinkItMe design system's landing-wall template: an oversized
 * headline against a loosely pinned wall of creator cards that bleeds off the
 * page. The previous landing page is kept at /legacy.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-page font-sans text-ink-body">
      {/* Blurred colour wash behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-56 size-[640px] rounded-full bg-lilac-bd opacity-40 blur-[120px] dark:opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-64 right-44 size-[620px] rounded-full bg-peach-bd opacity-35 blur-[130px] dark:opacity-55"
      />

      <WallHeader />
      <WallHero />
      <WallStrip />
    </main>
  );
}
