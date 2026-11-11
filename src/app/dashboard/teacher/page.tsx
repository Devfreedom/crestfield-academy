'use client';

import DashboardShell from '@/components/DashboardShell';
import { useCurrentUser } from '@/lib/useAuth';
import { TEACHERS } from '@/lib/data';
import OverviewSection from './OverviewSection';
import ClassesSection from './ClassesSection';
import AttendanceSection from './AttendanceSection';
import AssignmentsSection from './AssignmentsSection';
import GradesSection from './GradesSection';
import TimetableSection from './TimetableSection';
import ResourcesSection from './ResourcesSection';

export default function TeacherDashboard() {
  const { user } = useCurrentUser();
  const teacher = TEACHERS.find((item) => item.email === user?.email) ?? TEACHERS[0];

  return (
    <DashboardShell allowedRoles={['teacher']}>
      <div className="space-y-6">
        <section id="overview" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="font-poppins text-2xl font-bold text-navy">Teacher Dashboard</h2>
            <p className="mt-1 text-slate-600">
              Welcome back, {teacher.name}. Take attendance, set assignments, and share resources.
            </p>
          </div>
          <OverviewSection teacher={teacher} />
        </section>

        <ClassesSection teacher={teacher} />
        <AttendanceSection teacher={teacher} />
        <AssignmentsSection teacher={teacher} />
        <GradesSection teacher={teacher} />
        <TimetableSection teacher={teacher} />
        <ResourcesSection teacher={teacher} />
      </div>
    </DashboardShell>
  );
}
