# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**LinkItMe** is a "link in bio" platform built with **Next.js 16**, **React 19**, and **TypeScript**. The application allows users to create personalized landing pages to share all their content, similar to Linktree.

**Tech Stack:**

- **Framework**: Next.js 16 (App Router, React Server Components)
- **React**: 19
- **TypeScript**: 5.x (strict mode enabled)
- **Styling**: Tailwind CSS 4 with custom config
- **UI Components**: Shadcn/UI (New York style)
- **Icons**: Lucide React
- **Theming**: next-themes (light/dark)
- **Package Manager**: pnpm 9.15.0

---

## Development Commands

### Core Commands

```bash
# Start development server (port 3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Typecheck without emitting
pnpm typecheck

# Format code (via Prettier with import sorting)
pnpm prettier --write .
```

### Pre-commit Hook

A husky `pre-commit` hook runs on every commit:

1. **lint-staged** on staged files — `prettier --write` then `eslint --fix --max-warnings=0`
2. **`pnpm typecheck`** — `tsc --noEmit` across the project

Formatting is fixed and re-staged automatically, so a formatting slip never blocks a
commit. Lint problems and type errors do block: `--max-warnings=0` means an unused
import is enough to fail, which is deliberate.

The hook installs itself via the `prepare` script, so `pnpm install` is all that's
needed on a fresh clone. To bypass it in an emergency:

```bash
git commit --no-verify
```

Note that `tsc` cannot be scoped to staged files — it needs the whole program to
resolve types — so the typecheck is always project-wide (~1.5s on this repo).

### Adding Shadcn Components

```bash
# Add a specific component
npx shadcn@latest add <component-name>

# Example
npx shadcn@latest add button
```

**Shadcn Configuration** (components.json):

- Style: `new-york`
- RSC: enabled
- Base color: `slate`
- CSS variables: enabled
- Icon library: `lucide`

---

## Architecture

### Directory Structure

```
app/
  api/
    check-username/     # Username availability API endpoint
      route.ts
  demo/                 # Demo/preview pages
    page.tsx
  layout.tsx            # Root layout with Geist fonts
  page.tsx              # Landing page (main entry)
  globals.css           # Global Tailwind styles

components/
  landing-wall/         # Landing page sections ("studio wall" design)
    PinnedWall.tsx      # Absolutely-positioned card wall, lg and up
    UsernameClaimField.tsx
    WallHeader.tsx
    WallHero.tsx
    WallStrip.tsx       # Horizontally scrolling cards, below lg
    wall-cards.tsx      # Card content shared by PinnedWall and WallStrip
  ui/                   # Shadcn UI components
    button.tsx
    card.tsx
    input.tsx
  widget.tsx            # Design-system card shell (server component)
  editable-widget.tsx   # Widget with hover resize + delete controls
  theme-provider.tsx    # next-themes wrapper
  theme-toggle.tsx      # Light/dark switch in the nav

lib/
  utils.ts              # cn() utility for class merging
  validation.ts         # Username validation logic

types/
  username.ts           # UsernameState, CheckUsernameResponse
  widget.ts             # WidgetSize, WidgetTone

hooks/
  useUsernameCheck.ts   # Custom hook for username validation/checking
```

### Key Architectural Patterns

**1. Component Organization**

- **Feature-based**: Landing page sections are grouped in `components/landing-wall/`
- **UI primitives**: Reusable Shadcn components in `components/ui/`
- **Shared components**: Root-level components like `widget.tsx` for cross-feature use

**2. Type Safety**

- All components use **TypeScript types** (not interfaces) for props
- Types are **collocated** with components when simple, or centralized in `types/` when shared
- Example: `WidgetSize` is in `types/widget.ts` because it's used across files

**3. Data Flow**

- **Section content** lives beside its components (e.g. `components/landing-wall/wall-cards.tsx`)
- **API routes** follow Next.js App Router conventions (`app/api/*/route.ts`)
- **Client hooks** handle async operations (e.g., `useUsernameCheck` for debounced API calls)

**4. Styling Patterns**

- **Tailwind CSS 4** with `@tailwindcss/postcss`
- **Class variance authority (CVA)** for component variants (see `widget.tsx`)
- **cn()** utility (from `lib/utils.ts`) for conditional class merging
- **CSS transitions** driven by the design system's motion tokens (`--ease-out`, `--dur-mid`)

**5. Server/Client Boundaries**

- Most components are **Server Components** by default
- Client components are marked with `'use client'` (e.g., `editable-widget.tsx`, `UsernameClaimField.tsx`)
- API routes use **Next.js Route Handlers** (`app/api/*/route.ts`)

---

## Code Conventions

### Import Order (Prettier Plugin)

Imports are automatically sorted via `@trivago/prettier-plugin-sort-imports`:

1. React imports (`react/*`)
2. Next.js imports (`next/*`)
3. Third-party modules
4. Types (`@/types/*`)
5. Lib/utils (`@/lib/*`)
6. Tests (`@/tests/*`)
7. Components (`@/components/*`)
8. Styles (`@/styles/*`)
9. Relative imports (`./`, `../`)

### Component Props

- Use **type** (not interface) for component props unless they're overly complex
- **Collocate** props type with the component when it's only used in one file
- Example from `editable-widget.tsx`:

```typescript
export type EditableWidgetProps = {
  children: React.ReactNode;
  size?: WidgetSize;
  tone?: WidgetTone;
  onSizeChange?: (size: WidgetSize) => void;
  onDelete?: () => void;
  disabled?: boolean;
  className?: string;
};
```

### Path Aliases

Uses `@/*` for absolute imports (configured in `tsconfig.json`):

```typescript
import type { WidgetSize } from '@/types/widget';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
```

### Validation Pattern

Username validation is split into two layers:

1. **Client-side**: `lib/validation.ts` exports `validateUsername()` and `normalizeUsername()`
2. **Server-side**: API route (`app/api/check-username/route.ts`) reuses the same validators

**Rules:**

- 3-30 characters
- Alphanumeric, hyphens, underscores only
- Cannot start/end with hyphen or underscore
- Case-insensitive

---

## Component Patterns

### Widget

The shell every piece of profile content lives in. Content-agnostic, five fixed
footprints, carrying the design system's sheen and bevel.

- 5 size variants: `xs`, `sm`, `md`, `lg`, `xl` (see `WIDGET_SIZES`)
- 7 tones: `surface` plus the six pastel accent families
- `fill` hands sizing to the parent, for layouts that own the box
- Uses CVA for tone styling
- A **server component** — keep it that way so static walls stay off the client

```tsx
<Widget size="md" tone="lilac">
  {/* Content here */}
</Widget>
```

### EditableWidget

`Widget` plus the controls for rearranging a profile. A client component.

- Hover or keyboard focus reveals a resize toolbar (bottom) and delete control (top-left)
- Controlled when `onSizeChange` is passed, uncontrolled otherwise
- Resizing morphs the footprint over 500ms rather than snapping

```tsx
<EditableWidget size={size} onSizeChange={setSize} onDelete={remove} tone="peach">
  {/* Content here */}
</EditableWidget>
```

### Custom Hooks

**`useUsernameCheck`** (in `hooks/useUsernameCheck.ts`):

- Debounced username validation
- Calls `/api/check-username` endpoint
- Returns `{ username, setUsername, isValid, isChecking, isAvailable, error }`

---

## API Routes

### `GET /api/check-username?username=<username>`

**Response:**

```typescript
{
  available: boolean;
  message?: string;
}
```

**Behavior:**

- Validates format using `validateUsername()`
- Checks against mock list of reserved usernames (in production, query DB)
- Returns 400 for invalid format, 200 for valid check

---

## Styling & Design System

### Tailwind Configuration

- **Version**: Tailwind CSS 4
- **Base color**: `slate` (from Shadcn)
- **Fonts**: Geist Sans and Geist Mono (loaded via `next/font`)

### Shadcn Components

Currently installed:

- `button`
- `card`
- `input`

To add more, use:

```bash
npx shadcn@latest add <component>
```

---

## Testing & Quality

### ESLint

- Config: `eslint-config-next` (core web vitals + TypeScript)
- Extends Prettier for formatting compatibility
- Custom ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### Prettier

- Print width: 100
- Single quotes
- Trailing commas: ES5
- Import sorting enabled

### Git Hooks

- **husky** runs the `pre-commit` hook; installed by the `prepare` script on `pnpm install`
- **lint-staged** scopes Prettier and ESLint to staged files, and handles partially
  staged files correctly (so `git add -p` hunks are not clobbered)
- See [Pre-commit Hook](#pre-commit-hook) above for what runs and how to bypass it

---

## When Adding Features

### New Components

1. Determine if it's feature-specific (→ `components/landing-wall/`) or reusable (→ `components/` or `components/ui/`)
2. Use **type** for props, colocate unless shared
3. Mark client components with `'use client'`
4. Use `cn()` for conditional classes
5. Follow import order convention

### New API Routes

1. Place in `app/api/<route-name>/route.ts`
2. Use Next.js `NextRequest`/`NextResponse`
3. Define response types in `types/`
4. Reuse validation logic from `lib/validation.ts`
5. Return typed JSON responses

### New Types

1. Place in `types/` directory
2. Use **type** (not interface) for consistency
3. Export individual types, not namespaces
4. Document complex types with JSDoc comments

### New Utilities

1. Place in `lib/` directory
2. Export pure functions
3. Include JSDoc comments explaining purpose and usage
4. Reuse across server and client when possible

---

## Current State

**Landing Page ("studio wall"):**

- Ported from the LinkItMe design system's `landing-wall` template
- Nav (wordmark, Explore, Log in, theme toggle), oversized headline, username claim field
- A wall of five creator cards, pinned at slight rotations from `lg` up and
  scaled down between `lg` and `2xl`; below `lg` the same cards render as a
  horizontally scrolling strip

**Demo Page:**

- Located at `/demo`
- Widget playground: editable widgets, all five footprints, all seven tones, and content examples

**No Database Yet:**

- Username checks use mock data (`TAKEN_USERNAMES` array in API route)
- In production, replace with real DB queries

---

## Notes

- **No tests yet**: Consider adding Jest/React Testing Library when implementing new features
- **Mock data**: Wall card content and reserved usernames are hardcoded; replace with dynamic data later
- **Fonts**: Uses Geist Sans and Geist Mono from Google Fonts via `next/font`
- **React 19**: Takes advantage of React Server Components and modern patterns

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
