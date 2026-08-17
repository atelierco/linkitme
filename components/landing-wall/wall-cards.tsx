import type { WidgetSize, WidgetTone } from '@/types/widget';

/**
 * The five creator cards that make up the wall.
 *
 * Content lives here so the pinned desktop wall and the scrolling small-screen
 * strip render the same cards rather than duplicating markup. `pin` carries the
 * absolute placement the desktop wall uses; the strip ignores it.
 */
export type WallCard = {
  id: string;
  size: WidgetSize;
  tone: WidgetTone;
  /** Absolute placement + rotation used by the pinned desktop layout. */
  pin: string;
  content: React.ReactNode;
};

export const WALL_CARDS: WallCard[] = [
  {
    id: 'studio-photo',
    size: 'md',
    tone: 'surface',
    pin: 'left-0 top-0 rotate-[-2deg]',
    content: (
      <div className="flex h-full flex-col gap-3.5">
        <div
          className="grid flex-1 place-items-center rounded-lg bg-peach-sf"
          style={{ boxShadow: 'var(--ds-shadow-well)' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-peach-ik/70">
            Studio photo
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-base font-semibold text-ink-strong">Sunday kiln</span>
          <span className="font-mono text-[11px] text-ink-faint">42 photos</span>
        </div>
      </div>
    ),
  },
  {
    id: 'creator-intro',
    size: 'xs',
    tone: 'lilac',
    pin: 'left-[434px] top-11 rotate-[2.2deg]',
    content: (
      <div className="flex h-full flex-col justify-between">
        <span className="grid size-10 place-items-center rounded-full bg-lilac-bd text-base font-semibold text-lilac-ik">
          M
        </span>
        <p className="m-0 text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-lilac-ik text-pretty">
          I make things for home screens.
        </p>
        <span className="font-mono text-[11px] text-lilac-ik/75">linkitme/mireiaoak</span>
      </div>
    ),
  },
  {
    id: 'views',
    size: 'sm',
    tone: 'mint',
    pin: 'left-6 top-[352px] rotate-[1.4deg]',
    content: (
      <div className="flex h-full items-center justify-between gap-4">
        <span className="flex flex-col gap-1.5">
          <span className="text-[44px] font-bold leading-none tracking-[-0.025em] text-mint-ik">
            3.2M
          </span>
          <span className="text-sm text-mint-ik">views on your wall this month</span>
        </span>
        <span className="flex h-16 items-end gap-[5px]">
          <span className="h-[32%] w-2.5 rounded bg-mint-bd" />
          <span className="h-[54%] w-2.5 rounded bg-mint-bd" />
          <span className="h-[41%] w-2.5 rounded bg-mint-bd" />
          <span className="h-[76%] w-2.5 rounded bg-mint-bd" />
          <span className="h-full w-2.5 rounded bg-mint-ik/55" />
        </span>
      </div>
    ),
  },
  {
    id: 'location',
    size: 'xs',
    tone: 'sky',
    pin: 'left-[454px] top-[344px] rotate-[-2.6deg]',
    content: (
      <div className="flex h-full flex-col justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-sky-ik/80">
          Currently
        </span>
        <div
          className="my-3 flex-1 rounded-lg bg-sky-bd/55"
          style={{ boxShadow: 'var(--ds-shadow-well)' }}
        />
        <p className="m-0 text-base font-semibold text-sky-ik">Lisbon, until spring</p>
      </div>
    ),
  },
  {
    id: 'playlist',
    size: 'lg',
    tone: 'butter',
    pin: 'left-[706px] top-[-36px] rotate-[-1.2deg]',
    content: (
      <div className="flex h-full flex-col justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-butter-ik/80">
          On repeat
        </span>
        <p className="m-0 text-3xl font-bold leading-[1.14] tracking-[-0.02em] text-butter-ik text-pretty">
          Slow mornings, six playlists deep.
        </p>
        <div className="flex flex-col gap-2.5">
          <span className="h-3 w-4/5 rounded-md bg-butter-bd" />
          <span className="h-3 w-[64%] rounded-md bg-butter-bd/80" />
          <span className="h-3 w-[72%] rounded-md bg-butter-bd/60" />
        </div>
      </div>
    ),
  },
];
