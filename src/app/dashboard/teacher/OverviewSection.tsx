'use client';

import { GraduationCap, Users, FileText, ClipboardList } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { ASSIGNMENTS, STUDENTS } from '@/lib/data';
import type { Teacher } from '@/types';

export default function OverviewSection({ teacher }: { teacher: Teacher }) {
  const myClasses = teacher.classes;
  const classStudents = STUDENTS.filter((student) => myClasses.includes(student.class));
  const myAssignments = ASSIGNMENTS.filter((assignment) => assignment.createdBy === teacher.id);
  const averageAttendance = classStudents.length
    ? Math.round(
        classStudents.reduce((sum, student) => sum + student.attendance, 0) / classStudents.length,
      )
    : 0;

  return (
    <div className="card-grid">
      <StatCard
        title="My Classes"
        value={myClasses.length}
        change={myClasses.join(', ')}
        changeType="neutral"
        icon={<GraduationCap size={20} aria-hidden="true" />}
      />
      <StatCard
        title="Students"
        value={classStudents.length}
        change="Across your classes"
        changeType="neutral"
        icon={<Users size={20} aria-hidden="true" />}
      />
      <StatCard
        title="Assignments"
        value={myAssignments.length}
        change="Active assignments"
        changeType="neutral"
        icon={<FileText size={20} aria-hidden="true" />}
      />
      <StatCard
        title="Avg Attendance"
        value={`${averageAttendance}%`}
        change="+3% vs last week"
        changeType="positive"
        icon={<ClipboardList size={20} aria-hidden="true" />}
      />
    </div>
  );
}
