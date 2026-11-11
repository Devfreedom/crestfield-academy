import type { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  color?: string;
};

export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon,
  color = 'text-navy',
}: StatCardProps) {
  const changeColor =
    changeType === 'positive'
      ? 'text-success'
      : changeType === 'negative'
        ? 'text-danger'
        : 'text-slate-500';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-navy mt-1">{value}</p>
          {change && (
            <p className={`text-xs font-medium mt-2 ${changeColor}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg ${color === 'text-navy' ? 'bg-navy/10' : 'bg-gold/10'} flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}