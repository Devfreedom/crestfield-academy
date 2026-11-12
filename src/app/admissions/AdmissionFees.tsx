import { formatCurrency } from '@/lib/utils';

const FEES = [
  { level: 'Junior Secondary', day: 425000, boarding: 725000 },
  { level: 'Senior Secondary', day: 475000, boarding: 800000 },
];

export default function AdmissionFees() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-poppins text-3xl font-bold text-navy">
            School Fees (2024/2025 Session)
          </h2>
          <p className="text-slate-600">Fees are payable per term.</p>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* The fee table scrolls horizontally on narrow screens — never a
              stacked-card layout (per AGENTS.md). */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <caption className="sr-only">School fees by level and mode of attendance</caption>
              <thead>
                <tr className="bg-navy text-white">
                  <th scope="col" className="px-6 py-4 text-left">Level</th>
                  <th scope="col" className="px-6 py-4 text-right">Day</th>
                  <th scope="col" className="px-6 py-4 text-right">Boarding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FEES.map((fee) => (
                  <tr key={fee.level} className="transition-colors hover:bg-slate-50">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-700">{fee.level}</th>
                    <td className="px-6 py-4 text-right text-slate-600">{formatCurrency(fee.day)}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{formatCurrency(fee.boarding)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
            <p className="text-sm text-slate-500">
              Fees include tuition, textbooks, and examination fees. Boarding fees include
              accommodation and meals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
