'use client';

import { ArrowUpRight, Image as ImageIcon, MapPin, Play } from 'lucide-react';
import { useState } from 'react';

import type { WidgetSize } from '@/types/widget';

import { EditableWidget } from '@/components/editable-widget';
import { ThemeToggle } from '@/components/theme-toggle';
import { WIDGET_SIZES, Widget } from '@/components/widget';

const TONES = ['surface', 'lilac', 'sky', 'mint', 'blush', 'butter', 'peach'] as const;

export default function DemoPage() {
  const [profileSize, setProfileSize] = useState<WidgetSize>('md');
  const [linkSize, setLinkSize] = useState<WidgetSize>('sm');
  const [gallerySize, setGallerySize] = useState<WidgetSize>('lg');
  const [removed, setRemoved] = useState<string[]>([]);

  const remove = (id: string) => setRemoved(prev => [...prev, id]);
  const isVisible = (id: string) => !removed.includes(id);

  return (
    <div className="min-h-screen bg-page font-sans text-ink-body">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <header className="mb-12 flex items-start justify-between gap-6">
          <div>
            <h1 className="m-0 text-4xl font-bold tracking-[-0.025em] text-ink-strong">
              Widget playground
            </h1>
            <p className="mt-2 max-w-xl text-ink-muted">
              Hover a card to reveal its resize toolbar and delete control. Every surface, shadow
              and type size below comes from the design system tokens.
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Editable widgets */}
        <section className="mb-20">
          <h2 className="mb-2 text-xl font-semibold text-ink-strong">Editable</h2>
          <p className="mb-10 text-sm text-ink-muted">
            Resizing morphs the footprint over 500ms. Controls are reachable by keyboard as well as
            hover.
          </p>

          <div className="flex flex-wrap items-start gap-x-12 gap-y-16">
            {isVisible('profile') && (
              <EditableWidget
                size={profileSize}
                onSizeChange={setProfileSize}
                onDelete={() => remove('profile')}
                tone="lilac"
              >
                <div className="flex h-full flex-col justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-lilac-bd text-lg font-semibold text-lilac-ik">
                    V
                  </span>
                  <p className="m-0 text-2xl font-bold leading-[1.2] tracking-[-0.02em] text-lilac-ik text-pretty">
                    Designer, wallpaper maker.
                  </p>
                  <span className="font-mono text-[11px] text-lilac-ik/75">linkitme/vbrdnk</span>
                </div>
              </EditableWidget>
            )}

            {isVisible('link') && (
              <EditableWidget
                size={linkSize}
                onSizeChange={setLinkSize}
                onDelete={() => remove('link')}
              >
                <div className="flex h-full items-center gap-4">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-inner bg-surface-sunken text-ink-strong"
                    style={{ boxShadow: 'var(--ds-shadow-tile), var(--bevel)' }}
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-ink-strong">My portfolio</span>
                    <span className="text-[13px] text-ink-muted">Selected work, 2019 onwards</span>
                    <span className="font-mono text-[11px] text-ink-faint">vbrdnk.dev</span>
                  </span>
                </div>
              </EditableWidget>
            )}

            {isVisible('gallery') && (
              <EditableWidget
                size={gallerySize}
                onSizeChange={setGallerySize}
                onDelete={() => remove('gallery')}
                tone="peach"
              >
                <div className="flex h-full flex-col gap-4">
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-peach-ik/80">
                    <ImageIcon className="size-3.5" />
                    Gallery
                  </span>
                  <div className="grid flex-1 grid-cols-2 gap-2">
                    <div className="rounded-lg bg-peach-bd/70" />
                    <div className="rounded-lg bg-peach-bd/50" />
                    <div className="rounded-lg bg-peach-bd/50" />
                    <div className="rounded-lg bg-peach-bd/70" />
                  </div>
                  <span className="font-mono text-[11px] text-peach-ik/75">42 photos</span>
                </div>
              </EditableWidget>
            )}
          </div>

          {removed.length > 0 && (
            <button
              type="button"
              onClick={() => setRemoved([])}
              className="mt-12 text-sm font-medium text-ink-strong underline underline-offset-4"
            >
              Restore {removed.length} deleted {removed.length === 1 ? 'widget' : 'widgets'}
            </button>
          )}
        </section>

        {/* Footprints */}
        <section className="mb-20">
          <h2 className="mb-2 text-xl font-semibold text-ink-strong">Footprints</h2>
          <p className="mb-8 text-sm text-ink-muted">
            Five fixed sizes. Content is expected to adapt to the box, not the other way round.
          </p>

          <div className="flex flex-wrap items-start gap-5">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as WidgetSize[]).map(size => (
              <Widget key={size} size={size} tone="sky">
                <div className="flex h-full flex-col justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-sky-ik/80">
                    {size}
                  </span>
                  <span className="font-mono text-[11px] text-sky-ik/60">
                    {WIDGET_SIZES[size].width} × {WIDGET_SIZES[size].height}
                  </span>
                </div>
              </Widget>
            ))}
          </div>
        </section>

        {/* Tones */}
        <section className="mb-20">
          <h2 className="mb-2 text-xl font-semibold text-ink-strong">Tones</h2>
          <p className="mb-8 text-sm text-ink-muted">
            Each family pairs a surface, a border tint and an ink that stays legible on it, in both
            themes.
          </p>

          <div className="flex flex-wrap items-start gap-5">
            {TONES.map(tone => (
              <Widget key={tone} size="xs" tone={tone} className="h-[150px] w-[150px]" fill>
                <div className="flex h-full flex-col justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.04em] opacity-80">
                    {tone}
                  </span>
                  <div className="flex gap-1.5">
                    <span className="size-4 rounded-full bg-current opacity-90" />
                    <span className="size-4 rounded-full bg-current opacity-50" />
                    <span className="size-4 rounded-full bg-current opacity-25" />
                  </div>
                </div>
              </Widget>
            ))}
          </div>
        </section>

        {/* Non-editable content examples */}
        <section>
          <h2 className="mb-2 text-xl font-semibold text-ink-strong">Content examples</h2>
          <p className="mb-8 text-sm text-ink-muted">
            The shell is content-agnostic; these are ordinary children inside it.
          </p>

          <div className="flex flex-wrap items-start gap-5">
            <Widget size="xl" tone="surface">
              <div className="flex h-full flex-col gap-4">
                <span className="flex items-center gap-2 text-sm font-semibold text-ink-strong">
                  <Play className="size-4" />
                  Latest video
                </span>
                <div
                  className="grid flex-1 place-items-center rounded-inner bg-surface-sunken"
                  style={{ boxShadow: 'var(--ds-shadow-well)' }}
                >
                  <span className="grid size-16 place-items-center rounded-full bg-ink-strong text-surface-card">
                    <Play className="size-6" />
                  </span>
                </div>
                <span className="font-mono text-[11px] text-ink-faint">3.2M views</span>
              </div>
            </Widget>

            <Widget size="xs" tone="mint">
              <div className="flex h-full flex-col justify-between">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-mint-ik/80">
                  <MapPin className="size-3.5" />
                  Currently
                </span>
                <p className="m-0 text-base font-semibold text-mint-ik">Lisbon, until spring</p>
              </div>
            </Widget>
          </div>
        </section>
      </div>
    </div>
  );
}
