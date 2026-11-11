'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import { ENROLLMENT_GROWTH, REVENUE_BY_TERM } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

const AXIS_PROPS = {
  stroke: '#94a3b8',
  fontSize: 12,
  tickLine: false,
  axisLine: false,
} as const;

const TOOLTIP_STYLE = {
  borderRadius: '0.5rem',
  border: '1px solid #e2e8f0',
  fontSize: '0.75rem',
};

export default function AnalyticsSection() {
  return (
    <SectionCard
      id="analytics"
      title="Revenue &amp; Enrollment"
      description="Term-by-term revenue and five-year enrollment growth."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-navy">
            <TrendingUp size={16} className="text-gold" aria-hidden="true" />
            Revenue by term
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_BY_TERM} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="term" {...AXIS_PROPS} />
                <YAxis
                  {...AXIS_PROPS}
                  width={62}
                  tickFormatter={(value: number) => `₦${Math.round(value / 1_000_000)}m`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={TOOLTIP_STYLE}
                />
                <Bar dataKey="revenue" name="Billed" fill="#c9a227" radius={[4, 4, 0, 0]} />
                <Bar dataKey="collected" name="Collected" fill="#0b1f4b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-navy">
            <TrendingUp size={16} className="text-gold" aria-hidden="true" />
            Enrollment growth
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ENROLLMENT_GROWTH} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="session" {...AXIS_PROPS} />
                <YAxis {...AXIS_PROPS} width={44} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="students"
                  name="Students"
                  stroke="#0b1f4b"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#c9a227' }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="teachers"
                  name="Teachers"
                  stroke="#c9a227"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#0b1f4b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
