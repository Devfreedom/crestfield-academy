'use client';

import { Clock, CreditCard, FileText, Calendar } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { ASSIGNMENTS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import type { Student } from '@/types';

export default function OverviewSection({ student }: { student: Student }) {
  const upcomingAssignments = ASSIGNMENTS.filter(
    (assignment) => assignment.class === student.class,
  );

  return (
    <div className="card-grid">
      <StatCard
        title="Attendance"
        value={`${student.attendance}%`}
        change="Good standing"
        changeType="positive"
        icon={<Clock size={20} aria-hidden="true" />}
      />
      <StatCard
        title="Fees Balance"
        value={formatCurrency(student.feesOwed)}
        change={student.feesOwed === 0 ? 'Paid in full' : 'Outstanding'}
        changeType={student.feesOwed === 0 ? 'positive' : 'negative'}
        icon={<CreditCard size={20} aria-hidden="true" />}
      />
      <StatCard
        title="Upcoming Assignments"
        value={upcomingAssignments.length}
        change="Due this term"
        changeType="neutral"
        icon={<FileText size={20} aria-hidden="true" />}
      />
      <StatCard
        title="Class"
        value={`${student.class} ${student.section}`}
        change={student.status}
        changeType="neutral"
        icon={<Calendar size={20} aria-hidden="true" />}
      />
    </div>
  );
}
