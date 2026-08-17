import { cva } from 'class-variance-authority';

import type { WidgetSize, WidgetTone } from '@/types/widget';

import { cn } from '@/lib/utils';

/**
 * Widget footprints, in pixels.
 * Copied from the LinkitItem size variants so both stay in step.
 */
export const WIDGET_SIZES: Record<WidgetSize, { width: number; height: number }> = {
  xs: { width: 240, height: 280 },
  sm: { width: 400, height: 180 },
  md: { width: 400, height: 320 },
  lg: { width: 300, height: 550 },
  xl: { width: 600, height: 380 },
};

const widgetVariants = cva(
  'relative h-full w-full overflow-hidden rounded-widget border p-6 shadow-widget transition-shadow duration-200 ease-out',
  {
    variants: {
      tone: {
        surface: 'border-line bg-surface-card text-ink-body',
        lilac: 'border-lilac-bd bg-lilac-sf text-lilac-ik',
        sky: 'border-sky-bd bg-sky-sf text-sky-ik',
        mint: 'border-mint-bd bg-mint-sf text-mint-ik',
        blush: 'border-blush-bd bg-blush-sf text-blush-ik',
        butter: 'border-butter-bd bg-butter-sf text-butter-ik',
        peach: 'border-peach-bd bg-peach-sf text-peach-ik',
      },
    },
    defaultVariants: {
      tone: 'surface',
    },
  }
);

export type WidgetProps = {
  children: React.ReactNode;
  size?: WidgetSize;
  tone?: WidgetTone;
  /** Fill the parent instead of the fixed footprint, for layouts that size the card themselves. */
  fill?: boolean;
  className?: string;
};

/**
 * A single card on the profile wall.
 *
 * Renders at a fixed footprint from WIDGET_SIZES and carries the design
 * system's sheen and bevel so the surface reads curved rather than flat.
 */
export function Widget({
  children,
  size = 'md',
  tone = 'surface',
  fill = false,
  className,
}: WidgetProps) {
  const { width, height } = WIDGET_SIZES[size];

  return (
    <div
      style={fill ? undefined : { width, height }}
      className={cn('relative', fill && 'h-full w-full', className)}
    >
      <div
        className={cn(widgetVariants({ tone }))}
        style={{
          backgroundImage: 'var(--sheen)',
          boxShadow: 'var(--ds-shadow-widget), var(--bevel)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
