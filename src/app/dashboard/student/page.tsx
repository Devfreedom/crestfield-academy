'use client';

import { useEffect, useState } from 'react';
import { requireRole } from '@/lib/auth';
import DashboardShell from '@/components/DashboardShell';
import StatCard from '@/components/StatCard';
import PageHeader from '@/components/PageHeader';
import DataTable from '@/components/DataTable';
import { STUDENTS, FEES, ASSIGNMENTS, TIMETABLE, ANNOUNCEMENTS, RECEIPTS } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Calendar, FileText, BarChart3, CreditCard, Megaphone, Clock } from 'lucide-react';

export default function StudentDashboard() {
  if (typeof window !== 'undefined') {
    requireRole(['student']);
  }

  useEffect(() => {
    requireRole(['student']);
  }, []);

  const user = JSON.parse(localStorage.getItem('crestfield_user') || '{}');
  const student = STUDENTS.find((s) => s.name === user.name) || STUDENTS[0];
  const studentFees = FEES.find((f) => f.studentId === student.id);
  const studentReceipts = RECEIPTS.filter((r) => r.studentId === student.id);
  const upcomingAssignments = ASSIGNMENTS.filter((a) => a.class === student.class);

  return (
    <DashboardShell allowedRoles={['student']}>
      <div className="space-y-6">
        <PageHeader title="Student Dashboard" subtitle={`Welcome back, ${student.name} - ${student.class} ${student.section}`} breadcrumb="Dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Attendance" value={`${student.attendance}%`} change="Good standing" changeType="positive" icon={<Clock className="w-5 h-5" />} />
          <StatCard title="Fees Balance" value={formatCurrency(student.feesOwed)} change={student.feesOwed === 0 ? 'Paid in full' : 'Outstanding'} changeType={student.feesOwed === 0 ? 'positive' : 'negative'} icon={<CreditCard className="w-5 h-5" />} />
          <StatCard title="Upcoming Assignments" value={upcomingAssignments.length} change="Due this term" changeType="neutral" icon={<FileText className="w-5 h-5" />} />
          <StatCard title="Status" value={student.status} change={`${student.class} ${student.section}`} changeType="neutral" icon={<Calendar className="w-5 h-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Classes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Today's Classes</h2>
            <div className="space-y-3">
              {TIMETABLE.filter((t) => t.day === 'Monday' && t.classLevel === student.class).map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div>
                    <p className="font-medium text-navy">{t.subject}</p>
                    <p className="text-xs text-slate-500">{t.teacher} · {t.room}</p>
                  </div>
                  <span className="text-xs font-medium bg-navy/10 text-navy px-2 py-1 rounded">{t.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Upcoming Assignments</h2>
            <DataTable
              columns={[
                { key: 'title', label: 'Title' },
                { key: 'subject', label: 'Subject' },
                { key: 'dueDate', label: 'Due Date', format: formatDate },
              ]}
              data={upcomingAssignments}
              searchableKeys={['title', 'subject']}
              emptyMessage="No upcoming assignments."
            />
          </div>

          {/* Attendance Progress */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Attendance</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-navy">{student.attendance}%</span>
                <span className="text-slate-500">Attendance Rate</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className="bg-navy h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${student.attendance}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Your attendance for this term is {student.attendance}%. Keep it up!
            </p>
          </div>

          {/* Grades */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Grades / Report Card</h2>
            <DataTable
              columns={[
                { key: 'title', label: 'Assignment' },
                { key: 'subject', label: 'Subject' },
                { key: 'dueDate', label: 'Due Date', format: formatDate },
              ]}
              data={upcomingAssignments}
              searchableKeys={['title', 'subject']}
              emptyMessage="No grades recorded yet."
            />
          </div>

          {/* Fees */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Fees & Payments</h2>
            {studentFees && (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <p className="text-sm font-medium text-slate-600">Term / Session</p>
                  <p className="font-bold text-navy">{studentFees.term} / {studentFees.session}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Total</p>
                    <p className="font-bold text-navy">{formatCurrency(studentFees.amount)}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Paid</p>
                    <p className="font-bold text-success">{formatCurrency(studentFees.paid)}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Balance</p>
                    <p className="font-bold text-danger">{formatCurrency(studentFees.amount - studentFees.paid)}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Status</p>
                    <p className={`font-bold ${studentFees.status === 'Paid' ? 'text-success' : 'text-warning'}`}>
                      {studentFees.status}
                    </p>
                  </div>
                </div>
                <button
                  className="w-full bg-navy text-white px-6 py-3 rounded-lg font-bold hover:bg-navy/90 transition-colors"
                >
                  Pay Now (Mock)
                </button>
              </div>
            )}
            <h3 className="font-bold text-md text-navy mt-8 mb-4">Payment History</h3>
            <DataTable
              columns={[
                { key: 'amount', label: 'Amount', format: (a: number) => formatCurrency(a) },
                { key: 'date', label: 'Date', format: formatDate },
                { key: 'term', label: 'Term' },
                { key: 'session', label: 'Session' },
              ]}
              data={studentReceipts}
              emptyMessage="No payment history."
            />
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h2 className="font-bold text-lg text-navy mb-6">Announcements & Events</h2>
            <div className="space-y-3">
              {ANNOUNCEMENTS.filter((a) => a.audience.includes('student')).map((a) => (
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