'use client';

import { useEffect, useState } from 'react';
import { requireRole } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import StatCard from '@/components/StatCard';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import { STUDENTS, TEACHERS, FEES, CLASSES, ASSIGNMENTS, ANNOUNCEMENTS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Users, GraduationCap, CreditCard, FileText, Megaphone, Plus, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  if (typeof window !== 'undefined') {
    requireRole(['admin']);
  }

  useEffect(() => {
    requireRole(['admin']);
  }, []);

  const [students, setStudents] = useState(STUDENTS);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: 'JSS1' as const,
    section: 'A' as const,
    gender: 'Male' as const,
  });

  const todayAttendance = 87;
  const feesCollected = FEES.reduce((sum, f) => sum + f.paid, 0);
  const outstandingFees = FEES.reduce((sum, f) => sum + (f.amount - f.paid), 0);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student = {
      id: `s${students.length + 1}`,
      name: newStudent.name,
      class: newStudent.class,
      section: newStudent.section,
      gender: newStudent.gender,
      attendance: 100,
      feesOwed: 0,
      status: 'Active' as const,
    };
    setStudents([...students, student]);
    setShowAddStudent(false);
    setNewStudent({ name: '', class: 'JSS1', section: 'A', gender: 'Male' });
  };

  const handleMarkPaid = (feeId: string) => {
    // Mock: mark fee as paid
    setStudents(students); // trigger re-render
  };

  return (
    <DashboardShell allowedRoles={['admin']}>
      <div className="space-y-6">
        <PageHeader title="Admin Dashboard" subtitle="Manage students, classes, fees, and announcements" breadcrumb="Dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Today's Attendance" value={`${todayAttendance}%`} change="+2% vs yesterday" changeType="positive" icon={<Users className="w-5 h-5" />} />
          <StatCard title="Fees Collected" value={formatCurrency(feesCollected)} change="+12% vs last term" changeType="positive" icon={<CreditCard className="w-5 h-5" />} />
          <StatCard title="Outstanding Fees" value={formatCurrency(outstandingFees)} change="15 students" changeType="negative" icon={<CreditCard className="w-5 h-5" />} />
          <StatCard title="New Applications" value={24} change="+5 this week" changeType="positive" icon={<FileText className="w-5 h-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-navy">Students</h2>
              <button
                onClick={() => setShowAddStudent(true)}
                className="flex items-center gap-2 bg-navy text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-navy/90 transition-colors"
              >
                <Plus size={16} /> Add Student
              </button>
            </div>
            <DataTable
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'class', label: 'Class', format: (c: string) => `${c} ${students.find((s) => s.name === c)?.section || ''}` },
                { key: 'attendance', label: 'Attendance', format: (a: number) => `${a}%` },
                { key: 'feesOwed', label: 'Fees Owed', format: (f: number) => formatCurrency(f) },
                { key: 'status', label: 'Status' },
              ]}
              data={students}
              searchableKeys={['name', 'class']}
              emptyMessage="No students found."
              actions={(student) => (
                <button
                  onClick={() => handleMarkPaid(student.id)}
                  className="text-navy hover:text-navy/90 text-sm font-medium"
                >
                  View Profile
                </button>
              )}
            />
          </div>

          {showAddStudent && (
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
              <h2 className="font-bold text-lg text-navy mb-6">Add New Student</h2>
              <form onSubmit={handleAddStudent} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Class</label>
                    <select
                      value={newStudent.class}
                      onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value as any })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      <option value="JSS1">JSS1</option>
                      <option value="JSS2">JSS2</option>
                      <option value="JSS3">JSS3</option>
                      <option value="SS1">SS1</option>
                      <option value="SS2">SS2</option>
                      <option value="SS3">SS3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Section</label>
                    <select
                      value={newStudent.section}
                      onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value as any })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                    <select
                      value={newStudent.gender}
                      onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value as any })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-navy text-white px-4 py-3 rounded-lg font-medium hover:bg-navy/90 transition-colors">
                    Add Student
                  </button>
                  <button type="button" onClick={() => setShowAddStudent(false)} className="flex-1 bg-white text-slate-600 border border-slate-200 px-4 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Classes & Timetable</h2>
            <DataTable
              columns={[
                { key: 'name', label: 'Class' },
                { key: 'studentCount', label: 'Students', format: (n: number) => String(n) },
              ]}
              data={CLASSES}
              searchableKeys={['name']}
              emptyMessage="No classes found."
            />
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Announcements</h2>
            <div className="space-y-4">
              {ANNOUNCEMENTS.map((a) => (
                <div key={a.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50">
                  <p className="font-medium text-navy">{a.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{a.content}</p>
                  <p className="text-xs text-slate-400 mt-2">{a.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}