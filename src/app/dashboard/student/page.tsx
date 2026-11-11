'use client';

import DashboardShell from '@/components/DashboardShell';
import { useCurrentUser } from '@/lib/useAuth';
import { STUDENTS } from '@/lib/data';
import OverviewSection from './OverviewSection';
import ClassesSection from './ClassesSection';
import AssignmentsSection from './AssignmentsSection';
import AttendanceSection from './AttendanceSection';
import GradesSection from './GradesSection';
import FeesSection from './FeesSection';
import AnnouncementsSection from './AnnouncementsSection';

export default function StudentDashboard() {
  const { user } = useCurrentUser();
  const student = STUDENTS.find((item) => item.name === user?.name) ?? STUDENTS[0];

  return (
    <DashboardShell allowedRoles={['student']}>
      <div className="space-y-6">
        <section id="overview" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="font-poppins text-2xl font-bold text-navy">Student Dashboard</h2>
            <p className="mt-1 text-slate-600">
              Welcome back, {student.name.split(' ')[0]} &mdash; {student.class} Science
            </p>
          </div>
          <OverviewSection student={student} />
        </section>

        <ClassesSection student={student} />
        <AssignmentsSection student={student} />
        <AttendanceSection student={student} />
        <GradesSection student={student} />
        <FeesSection student={student} />
        <AnnouncementsSection />
      </div>
    </DashboardShell>
  );
}
