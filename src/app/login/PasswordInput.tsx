'use client';

import { useId, useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

type PasswordInputProps = {
  label: string;
  name: string;
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
  /** Overrides the generated id (tests target the stable #password id). */
  id?: string;
  minLength?: number;
  required?: boolean;
};

/**
 * Password field with an in-field icon and a Show/Hide toggle. The toggle is a
 * real button (not a CSS-only reveal) so it is reachable and announced.
 */
export default function PasswordInput({
  label,
  name,
  autoComplete,
  value,
  onChange,
  id: idProp,
  minLength,
  required = true,
}: PasswordInputProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Lock
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          spellCheck={false}
          autoCapitalize="none"
          minLength={minLength}
          required={required}
          enterKeyHint={autoComplete === 'new-password' ? 'next' : 'done'}
          className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy"
        >
          {visible ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
