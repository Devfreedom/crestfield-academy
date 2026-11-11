'use client';

import SectionCard from '@/components/SectionCard';
import { ATTENDANCE_REPORT, CLASS_PERFORMANCE } from '@/lib/data';

export default function ReportsSection() {
  const averageAttendance = Math.round(
    ATTENDANCE_REPORT.reduce((sum, row) => sum + row.rate, 0) / ATTENDANCE_REPORT.length,
  );
  const averageScore = Math.round(
    CLASS_PERFORMANCE.reduce((sum, row) => sum + row.average, 0) / CLASS_PERFORMANCE.length,
  );
  const averagePassRate = Math.round(
    CLASS_PERFORMANCE.reduce((sum, row) => sum + row.passRate, 0) / CLASS_PERFORMANCE.length,
  );

  return (
    <SectionCard
      id="reports"
      title="Reports"
      description={`Average attendance ${averageAttendance}% · average score ${averageScore}% · ${averagePassRate}% pass rate`}
    >
      <div className="space-y-8">
        <div>
          <h3 className="mb-3 font-poppins text-base font-bold text-navy">Attendance report</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <caption className="sr-only">Attendance by class</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Class</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Present</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Absent</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Late</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ATTENDANCE_REPORT.map((row) => (
                  <tr key={row.class} className="transition-colors hover:bg-slate-50">
                    <th scope="row" className="px-4 py-3 font-medium text-navy">{row.class}</th>
                    <td className="px-4 py-3 text-right text-slate-600">{row.present}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.absent}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.late}</td>
                    <td className="px-4 py-3 text-right font-semibold text-navy">{row.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-poppins text-base font-bold text-navy">Performance report</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <caption className="sr-only">Academic performance by class</caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Class</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Students</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Average</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Best</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Pass Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CLASS_PERFORMANCE.map((row) => (
                  <tr key={row.class} className="transition-colors hover:bg-slate-50">
                    <th scope="row" className="px-4 py-3 font-medium text-navy">{row.class}</th>
                    <td className="px-4 py-3 text-right text-slate-600">{row.students}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.average}%</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.best}%</td>
                    <td className="px-4 py-3 text-right font-semibold text-navy">{row.passRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
