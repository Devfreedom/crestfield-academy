type ProgressBarProps = {
  value: number;
  label: string;
  max?: number;
  tone?: 'navy' | 'success' | 'warning' | 'danger';
};

const TONE = {
  navy: 'bg-navy',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
} as const;

export default function ProgressBar({ value, label, max = 100, tone = 'navy' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(value, max));
  const percent = Math.round((clamped / max) * 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className="h-4 w-full overflow-hidden rounded-full bg-slate-200"
    >
      <div
        className={`h-4 rounded-full transition-[width] duration-700 ${TONE[tone]}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
