'use client';

import { Users, CreditCard, FileText, TrendingDown } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { APPLICATIONS, ATTENDANCE_REPORT, FEES } from '@/lib/data';
import { formatCurrency, formatDateShort } from '@/lib/utils';

export default function OverviewSection() {
  const feesCollected = FEES.reduce((sum, fee) => sum + fee.paid, 0);
  const outstanding = FEES.reduce((sum, fee) => sum + (fee.amount - fee.paid), 0);
  const outstandingCount = FEES.filter((fee) => fee.status !== 'Paid').length;
  const present = ATTENDANCE_REPORT.reduce((sum, row) => sum + row.present, 0);
  const total = ATTENDANCE_REPORT.reduce((sum, row) => sum + row.present + row.absent + row.late, 0);
  const attendanceRate = Math.round((present / total) * 100);
  const newApplications = APPLICATIONS.filter((app) => app.status === 'Pending').length;

  return (
    <div className="space-y-6">
      <div className="card-grid">
        <StatCard
          title="Today's Attendance"
          value={`${attendanceRate}%`}
          change="+2% vs yesterday"
          changeType="positive"
          icon={<Users size={20} aria-hidden="true" />}
        />
        <StatCard
          title="Fees Collected"
          value={formatCurrency(feesCollected)}
          change="+12% vs last term"
          changeType="positive"
          icon={<CreditCard size={20} aria-hidden="true" />}
        />
        <StatCard
          title="Outstanding Fees"
          value={formatCurrency(outstanding)}
          change={`${outstandingCount} students owe a balance`}
          changeType="negative"
          icon={<TrendingDown size={20} aria-hidden="true" />}
        />
        <StatCard
          title="New Applications"
          value={newApplications}
          change={`${APPLICATIONS.length} total this term`}
          changeType="neutral"
          icon={<FileText size={20} aria-hidden="true" />}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="font-poppins text-lg font-bold text-navy">Recent Applications</h3>
          <p className="mt-1 text-sm text-slate-500">Latest submissions from the admissions page.</p>
        </div>
        <ul className="divide-y divide-slate-100">
          {APPLICATIONS.slice(0, 5).map((application) => (
            <li key={application.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
              <div className="min-w-0">
                <p className="font-medium text-navy">{application.childName}</p>
                <p className="text-sm text-slate-500">
                  Applying to {application.applyingTo} &middot; {application.parentName}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    application.status === 'Offered'
                      ? 'bg-success/10 text-success'
                      : application.status === 'Shortlisted'
                        ? 'bg-gold/10 text-gold'
                        : application.status === 'Under Review'
                          ? 'bg-navy/10 text-navy'
                          : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {application.status}
                </span>
                <span className="text-xs text-slate-400">{formatDateShort(application.submittedOn)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
