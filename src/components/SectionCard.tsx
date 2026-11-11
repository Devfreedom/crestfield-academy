import type { ReactNode } from 'react';

type SectionCardProps = {
  id: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Dashboard section wrapper. The `id` is the target for sidebar anchor links,
 * and the card adapts to its own width via a container query (see globals.css).
 */
export default function SectionCard({
  id,
  title,
  description,
  actions,
  children,
  className = '',
}: SectionCardProps) {
  return (
    <section id={id} className={`section-card scroll-mt-24 rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
      <div className="section-card__header flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-4">
        <div className="min-w-0">
          <h2 className="font-poppins text-lg font-bold text-navy">{title}</h2>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </section>
  );
}
