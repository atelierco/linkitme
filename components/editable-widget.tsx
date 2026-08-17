'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import type { WidgetSize, WidgetTone } from '@/types/widget';

import { cn } from '@/lib/utils';

import { WIDGET_SIZES, widgetVariants } from '@/components/widget';

const SIZE_ORDER: WidgetSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

/** Proportions of each footprint, drawn as a glyph in the resize toolbar. */
const SIZE_GLYPH: Record<WidgetSize, { x: number; y: number; w: number; h: number }> = {
  xs: { x: 6, y: 5, w: 12, h: 14 },
  sm: { x: 2, y: 8, w: 20, h: 8 },
  md: { x: 4, y: 4, w: 16, h: 16 },
  lg: { x: 7, y: 2, w: 10, h: 20 },
  xl: { x: 2, y: 5, w: 20, h: 14 },
};

function SizeGlyph({ size, active }: { size: WidgetSize; active: boolean }) {
  const g = SIZE_GLYPH[size];

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="block" aria-hidden>
      <rect
        x={g.x}
        y={g.y}
        width={g.w}
        height={g.h}
        rx="2"
        strokeWidth="2"
        className={cn(
          'transition-colors duration-200',
          active ? 'fill-ink-strong stroke-ink-strong' : 'fill-transparent stroke-surface-card'
        )}
      />
    </svg>
  );
}

export type EditableWidgetProps = {
  children: React.ReactNode;
  size?: WidgetSize;
  tone?: WidgetTone;
  onSizeChange?: (size: WidgetSize) => void;
  onDelete?: () => void;
  disabled?: boolean;
  className?: string;
};

/**
 * A Widget the viewer can resize and remove.
 *
 * Hovering reveals a resize toolbar below the card and, when onDelete is
 * passed, a delete control at its top-left. Both also appear on keyboard
 * focus, so the controls are reachable without a pointer.
 *
 * Size is controlled when onSizeChange is passed and uncontrolled otherwise.
 * Resizing morphs the footprint rather than snapping to it.
 */
export function EditableWidget({
  children,
  size,
  tone = 'surface',
  onSizeChange,
  onDelete,
  disabled = false,
  className,
}: EditableWidgetProps) {
  const [internalSize, setInternalSize] = useState<WidgetSize>('md');
  const currentSize = size ?? internalSize;
  const { width, height } = WIDGET_SIZES[currentSize];

  const handleSizeChange = (next: WidgetSize) => {
    if (disabled) return;
    if (onSizeChange) {
      onSizeChange(next);
    } else {
      setInternalSize(next);
    }
  };

  return (
    <div
      style={{ width, height }}
      className={cn(
        'group relative transition-[width,height] duration-500 ease-out',
        disabled && 'opacity-50',
        className
      )}
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

      {onDelete && (
        <button
          type="button"
          onClick={() => !disabled && onDelete()}
          disabled={disabled}
          aria-label="Delete widget"
          className={cn(
            'absolute -left-3.5 -top-3.5 z-10 grid size-8 place-items-center rounded-full',
            'border border-line bg-surface-card text-ink-body',
            'opacity-0 transition-opacity duration-200 group-hover:opacity-100',
            'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-strong',
            'disabled:cursor-not-allowed'
          )}
          style={{ boxShadow: 'var(--ds-shadow-pop)' }}
        >
          <Trash2 className="size-[15px]" />
        </button>
      )}

      <div
        role="toolbar"
        aria-label="Resize widget"
        className={cn(
          'absolute -bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1',
          'rounded-full bg-ink-strong px-2.5 py-1.5',
          'opacity-0 transition-opacity duration-200 group-hover:opacity-100',
          'focus-within:opacity-100'
        )}
        style={{ boxShadow: 'var(--ds-shadow-pop)' }}
      >
        {SIZE_ORDER.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => handleSizeChange(option)}
            disabled={disabled}
            aria-label={`Resize to ${option}`}
            aria-pressed={currentSize === option}
            className={cn(
              'grid place-items-center rounded-md p-1 transition-colors duration-200',
              currentSize === option ? 'bg-surface-card' : 'hover:bg-surface-card/15',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-card',
              'disabled:cursor-not-allowed'
            )}
          >
            <SizeGlyph size={option} active={currentSize === option} />
          </button>
        ))}
      </div>
    </div>
  );
}
