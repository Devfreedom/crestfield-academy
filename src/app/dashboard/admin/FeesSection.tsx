'use client';

import { useState } from 'react';
import { CheckCircle2, Printer } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import { FEES, STUDENTS } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Fee } from '@/types';

const STATUS_TONE: Record<Fee['status'], string> = {
  Paid: 'bg-success/10 text-success',
  Partial: 'bg-warning/10 text-warning',
  Outstanding: 'bg-danger/10 text-danger',
};

type FeeRow = Fee & { studentName: string; className: string };

export default function FeesSection() {
  const [fees, setFees] = useState<FeeRow[]>(
    FEES.map((fee) => {
      const student = STUDENTS.find((item) => item.id === fee.studentId);
      return {
        ...fee,
        studentName: student?.name ?? 'Unknown student',
        className: student ? `${student.class} ${student.section}` : '—',
      };
    }),
  );
  const [statusFilter, setStatusFilter] = useState('all');
  const [receipt, setReceipt] = useState<FeeRow | null>(null);

  const handleMarkPaid = (feeId: string) => {
    setFees((current) =>
      current.map((fee) =>
        fee.id === feeId ? { ...fee, paid: fee.amount, status: 'Paid' as const } : fee,
      ),
    );
  };

  const collected = fees.reduce((sum, fee) => sum + fee.paid, 0);
  const outstanding = fees.reduce((sum, fee) => sum + (fee.amount - fee.paid), 0);

  return (
    <>
      <SectionCard
        id="fees"
        title="Fees"
        description={`${formatCurrency(collected)} collected · ${formatCurrency(outstanding)} outstanding`}
      >
        <DataTable<FeeRow>
          caption="Student fee records"
          columns={[
            {
              key: 'studentName',
              label: 'Student',
              render: (fee) => (
                <div>
                  <p className="font-medium text-navy">{fee.studentName}</p>
                  <p className="text-xs text-slate-500">{fee.className}</p>
                </div>
              ),
            },
            {
              key: 'term',
              label: 'Term / Session',
              render: (fee) => (
                <div>
                  <p>{fee.term}</p>
                  <p className="text-xs text-slate-500">{fee.session}</p>
                </div>
              ),
            },
            {
              key: 'amount',
              label: 'Amount',
              align: 'right',
              format: (value) => formatCurrency(Number(value)),
            },
            {
              key: 'paid',
              label: 'Paid',
              align: 'right',
              format: (value) => formatCurrency(Number(value)),
            },
            {
              key: 'status',
              label: 'Status',
              render: (fee) => (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[fee.status]}`}
                >
                  {fee.status}
                </span>
              ),
            },
            { key: 'dueDate', label: 'Due Date', format: (value) => formatDate(String(value)) },
          ]}          data={fees}
          searchableKeys={['studentName', 'term', 'session', 'className']}
          searchPlaceholder="Search fees..."
          emptyMessage="No fee records found."
          filters={[
            {
              id: 'status',
              label: 'Filter by status',
              value: statusFilter,
              onChange: setStatusFilter,
              matches: (fee, value) => fee.status === value,
              options: [
                { value: 'all', label: 'All statuses' },
                { value: 'Paid', label: 'Paid' },
                { value: 'Partial', label: 'Partial' },
                { value: 'Outstanding', label: 'Outstanding' },
              ],
            },
          ]}
          rowActions={(fee) => (
            <>
              {fee.status !== 'Paid' && (
                <button
                  type="button"
                  onClick={() => handleMarkPaid(fee.id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-navy transition-colors hover:text-navy/70"
                >
                  <CheckCircle2 size={15} aria-hidden="true" />
                  Mark as Paid
                </button>
              )}
              <button
                type="button"
                onClick={() => setReceipt(fee)}
                className="flex items-center gap-1.5 text-sm font-medium text-navy transition-colors hover:text-navy/70"
              >
                <Printer size={15} aria-hidden="true" />
                Receipt
              </button>
            </>
          )}
        />
      </SectionCard>

      <Modal
        open={receipt !== null}
        onClose={() => setReceipt(null)}
        title="Payment Receipt"
        description={receipt ? `Receipt ${receipt.id.toUpperCase()}` : undefined}
        footer={
          <>
            <button
              type="button"
              onClick={() => setReceipt(null)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 font-medium text-white transition-colors hover:bg-navy/90"
            >
              <Printer size={16} aria-hidden="true" />
              Print Receipt
            </button>
          </>
        }
      >
        {receipt && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="font-poppins text-base font-bold text-navy">Crestfield Academy</p>
                <p className="text-xs text-slate-500">Plot 12, Gwarinpa, Abuja, Nigeria</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[receipt.status]}`}
              >
                {receipt.status}
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Student</dt>
                <dd className="mt-1 font-medium text-navy">{receipt.studentName}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Class</dt>
                <dd className="mt-1 font-medium text-navy">{receipt.className}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Term</dt>
                <dd className="mt-1 font-medium text-navy">
                  {receipt.term} &middot; {receipt.session}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Due Date</dt>
                <dd className="mt-1 font-medium text-navy">{formatDate(receipt.dueDate)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Amount Billed</dt>
                <dd className="mt-1 font-medium text-navy">{formatCurrency(receipt.amount)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Amount Paid</dt>
                <dd className="mt-1 font-medium text-success">{formatCurrency(receipt.paid)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-semibold uppercase text-slate-500">Balance Due</dt>
                <dd className="mt-1 font-poppins text-lg font-bold text-danger">
                  {formatCurrency(receipt.amount - receipt.paid)}
                </dd>
              </div>
            </dl>

            <p className="text-xs text-slate-400">
              This is a mock receipt generated for demonstration purposes.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
