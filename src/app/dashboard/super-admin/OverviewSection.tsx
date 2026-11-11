'use client';

import { Users, GraduationCap, CreditCard, Shield } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { ENROLLMENT_GROWTH, REVENUE_BY_TERM, STUDENTS, TEACHERS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

type OverviewSectionProps = {
  totalUsers: number;
  totalAdmins: number;
};

export default function OverviewSection({ totalUsers, totalAdmins }: OverviewSectionProps) {
  const totalRevenue = REVENUE_BY_TERM.reduce((sum, term) => sum + term.collected, 0);
  const latestEnrollment = ENROLLMENT_GROWTH[ENROLLMENT_GROWTH.length - 1];

  return (
    <>
      <div className="card-grid">
        <StatCard
          title="Total Students"
          value={STUDENTS.length}
          change={`${latestEnrollment.students} enrolled this session`}
          changeType="positive"
          icon={<Users size={20} aria-hidden="true" />}
        />
        <StatCard
          title="Total Teachers"
          value={TEACHERS.length}
          change={`${latestEnrollment.teachers} on the staff`}
          changeType="positive"
          icon={<GraduationCap size={20} aria-hidden="true" />}
        />
        <StatCard
          title="Revenue Collected"
          value={formatCurrency(totalRevenue)}
          change="+8.5% vs last term"
          changeType="positive"
          icon={<CreditCard size={20} aria-hidden="true" />}
        />
        <StatCard
          title="Administrators"
          value={totalAdmins}
          change={`${totalUsers} portal users`}
          changeType="neutral"
          icon={<Shield size={20} aria-hidden="true" />}
        />
      </div>
    </>
  );
}
