import { Widget } from '@/components/widget';

import { WALL_CARDS } from './wall-cards';

/**
 * Small-screen counterpart to PinnedWall, for below lg.
 *
 * The pinned layout depends on absolute pixel offsets that have no sensible
 * behaviour once the viewport is narrower than the wall itself, so below lg the
 * same cards lay out as a horizontally scrolling row instead of disappearing.
 * Rotations are kept so the group still reads as pinned up rather than filed.
 *
 * The row bleeds past the page gutter on both sides via negative margins, so a
 * card is always partly visible at the edge — the affordance that there is more
 * to scroll.
 */
export function WallStrip() {
  return (
    <div
      className="overflow-x-auto pb-16 pt-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Example creator cards"
    >
      <div className="flex w-max items-center gap-5 px-6 md:px-12">
        {WALL_CARDS.map((card, i) => (
          <div
            key={card.id}
            className="lim-pin h-[300px] w-[240px] shrink-0 sm:h-[320px] sm:w-[280px]"
            style={{ transform: `rotate(${i % 2 === 0 ? -1.6 : 1.8}deg)` }}
          >
            <Widget size={card.size} tone={card.tone} fill>
              {card.content}
            </Widget>
          </div>
        ))}
      </div>
    </div>
  );
}
