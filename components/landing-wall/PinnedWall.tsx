import { Widget } from '@/components/widget';

import { WALL_CARDS } from './wall-cards';

/**
 * The loosely pinned wall of creator cards, for lg and up.
 *
 * Cards are absolutely positioned at slight rotations so the group reads as
 * pinned-up rather than laid out on a grid. Hovering straightens a card and
 * lifts it; the .lim-pin rule in globals.css carries that transition and its
 * reduced-motion guard. The wall deliberately bleeds off the right edge.
 */
export function PinnedWall() {
  return (
    <div id="wall" className="relative h-[660px] w-[1006px]">
      {WALL_CARDS.map(card => (
        <div key={card.id} className={`lim-pin absolute ${card.pin}`}>
          <Widget size={card.size} tone={card.tone}>
            {card.content}
          </Widget>
        </div>
      ))}
    </div>
  );
}
