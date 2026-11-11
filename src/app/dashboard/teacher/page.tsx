'use client';

import { useEffect, useState } from 'react';
import { requireRole } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import StatCard from '@/components/StatCard';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import { STUDENTS, TEACHERS, ASSIGNMENTS, ATTENDANCE, TIMETABLE } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { GraduationCap, Users, ClipboardList, FileText, BarChart3, Calendar, Plus, Check, Save } from 'lucide-react';

export default function TeacherDashboard() {
  if (typeof window !== 'undefined') {
    requireRole(['teacher']);
  }

  useEffect(() => {
    requireRole(['teacher']);
  }, []);

  const [attendanceMode, setAttendanceMode] = useState<'list' | 'save'>('list');
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, string>>({});

  const teacher = TEACHERS[0]; // Mr. James Okafor
  const myClasses = TEACHERS.flatMap((t) => t.classes);
  const myAssignments = ASSIGNMENTS.filter((a) => a.createdBy === teacher.id);
  const classStudents = STUDENTS.filter((s: { class: string }) => myClasses.includes(s.class));

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const records = Object.entries(attendanceStatus).map(([studentId, status]) => ({
      id: `at${Date.now()}`,
      studentId,
      date: new Date().toISOString().split('T')[0],
      status: status as 'Present' | 'Absent' | 'Late',
    }));
    // Mock: update attendance
    setAttendanceMode('save');
    setTimeout(() => setAttendanceMode('list'), 1500);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: create assignment
  };

  return (
    <DashboardShell allowedRoles={['teacher']}>
      <div className="space-y-6">
        <PageHeader title="Teacher Dashboard" subtitle={`Welcome back, ${teacher.name}`} breadcrumb="Dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="My Classes" value={myClasses.length} change="SS1, SS2, SS3" changeType="neutral" icon={<GraduationCap className="w-5 h-5" />} />
          <StatCard title="Students" value={classStudents.length} change="Across your classes" changeType="neutral" icon={<Users className="w-5 h-5" />} />
          <StatCard title="Assignments" value={myAssignments.length} change="Active assignments" changeType="neutral" icon={<FileText className="w-5 h-5" />} />
          <StatCard title="Avg Attendance" value="89%" change="+3% vs last week" changeType="positive" icon={<ClipboardList className="w-5 h-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Classes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">My Classes</h2>
            <div className="space-y-3">
              {myClasses.map((cls) => (
                <div key={cls} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="font-medium text-navy">{cls}</span>
                  <span className="text-xs text-slate-500">{STUDENTS.filter((s) => s.class === cls).length} students</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Take Attendance</h2>
            <p className="text-sm text-slate-600 mb-6">Select a class and mark attendance for today.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Class</label>
                <select
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                >
                  {myClasses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 font-semibold text-slate-600">Student</th>
                      <th className="px-4 py-3 font-semibold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {classStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-700">{s.name}</td>
                        <td className="px-4 py-3">
                          <select
                            value={attendanceStatus[s.id] || 'Present'}
                            onChange={(e) => setAttendanceStatus({ ...attendanceStatus, [s.id]: e.target.value })}
                            className="px-3 py-2 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleSaveAttendance}
                className="w-full bg-navy text-white px-6 py-3 rounded-lg font-bold hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
              >
                <Save size={18} /> Save Attendance
              </button>
              {attendanceMode === 'save' && (
                <p className="mt-3 text-sm text-success font-medium">Attendance saved successfully!</p>
              )}
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Assignments</h2>
            <DataTable
              columns={[
                { key: 'title', label: 'Title' },
                { key: 'class', label: 'Class' },
                { key: 'subject', label: 'Subject' },
                { key: 'dueDate', label: 'Due Date', format: formatDate },
              ]}
              data={myAssignments}
              searchableKeys={['title', 'subject']}
              emptyMessage="No assignments found."
              actions={() => (
                <button className="text-navy hover:text-navy/90 text-sm font-medium">Edit</button>
              )}
            />
            <button
              onClick={handleCreateAssignment}
              className="w-full mt-4 bg-gold text-navy px-4 py-3 rounded-lg font-medium hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Create Assignment
            </button>
          </div>

          {/* Timetable */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Weekly Timetable</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-slate-500 font-semibold">Day</th>
                    <th className="px-4 py-3 text-slate-500 font-semibold">Time</th>
                    <th className="px-4 py-3 text-slate-500 font-semibold">Subject</th>
                    <th className="px-4 py-3 text-slate-500 font-semibold">Room</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {TIMETABLE.slice(0, 5).map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-navy">{t.day}</td>
                      <td className="px-4 py-3 text-slate-600">{t.time}</td>
                      <td className="px-4 py-3 text-slate-600">{t.subject}</td>
                      <td className="px-4 py-3 text-slate-600">{t.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}