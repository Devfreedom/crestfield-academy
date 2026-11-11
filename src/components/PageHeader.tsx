type PageHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
};

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumb && (
        <p className="text-xs font-medium text-navy/70 uppercase tracking-wider mb-2">
          {breadcrumb}
        </p>
      )}
      <h1 className="text-2xl font-bold text-navy">{title}</h1>
      {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
    </div>
  );
}