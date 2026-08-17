'use client';

import { useUsernameCheck } from '@/hooks/useUsernameCheck';
import { CircleCheck, CircleX, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

/**
 * Username claim field in the design system's styling.
 *
 * Visuals come from the design system's UsernameClaimField; the availability
 * logic stays on useUsernameCheck, which debounces against /api/check-username
 * rather than the mock reserved-name list the design prototype shipped with.
 */
export function UsernameClaimField() {
  const { value, isValid, isChecking, isAvailable, error, handleUsernameChange } =
    useUsernameCheck();

  const canSubmit = isValid && isAvailable === true && !isChecking;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      // TODO: Navigate to signup page with username pre-filled
      console.log('Claiming username:', value);
    }
  };

  const borderColor = !value
    ? 'var(--line-strong)'
    : isChecking
      ? 'var(--info-ik)'
      : error
        ? 'var(--danger-ik)'
        : isAvailable
          ? 'var(--ok-ik)'
          : 'var(--line-strong)';

  const message = error ?? (isAvailable ? 'Yours, if you want it.' : '');

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[420px] flex-col gap-3">
      <div
        className="flex h-11 items-center overflow-hidden rounded-md border bg-surface-card"
        style={{ borderColor, boxShadow: 'var(--ds-shadow-well)' }}
      >
        <span className="self-stretch border-r border-line bg-surface-sunken px-3 text-sm font-medium leading-[44px] text-ink-muted">
          linkitme/
        </span>

        <input
          type="text"
          value={value}
          onChange={e => handleUsernameChange(e.target.value)}
          placeholder="yourname"
          aria-label="Username"
          aria-invalid={!!error}
          aria-describedby={message ? 'claim-message' : undefined}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-base text-ink-strong outline-none placeholder:text-ink-faint"
        />

        {value && (
          <span className="flex items-center px-3">
            {isChecking ? (
              <LoaderCircle className="h-[18px] w-[18px] animate-spin text-info-ik" />
            ) : error ? (
              <CircleX className="h-[18px] w-[18px] text-danger-ik" />
            ) : isAvailable ? (
              <CircleCheck className="h-[18px] w-[18px] text-ok-ik" />
            ) : null}
          </span>
        )}
      </div>

      <Button type="submit" size="lg" disabled={!canSubmit} className="w-full">
        {isChecking ? 'Checking…' : 'Claim your username'}
      </Button>

      {message && (
        <p
          id="claim-message"
          role={error ? 'alert' : 'status'}
          className="m-0 text-[13px]"
          style={{ color: error ? 'var(--danger-ik)' : 'var(--ok-ik)' }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
