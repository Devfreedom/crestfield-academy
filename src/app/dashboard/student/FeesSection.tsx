'use client';

import { useState } from 'react';
import { CreditCard, Printer } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import Modal from '@/components/Modal';
import { FEES, RECEIPTS } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Fee, Receipt, Student } from '@/types';

export default function FeesSection({ student }: { student: Student }) {
  const [fee, setFee] = useState<Fee | undefined>(
    FEES.find((item) => item.studentId === student.id),
  );
  const [receipts, setReceipts] = useState<Receipt[]>(
    RECEIPTS.filter((item) => item.studentId === student.id),
  );
  const [payOpen, setPayOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [notice, setNotice] = useState('');
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const balance = fee ? fee.amount - fee.paid : 0;

  const handlePay = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fee) return;

    const value = Number(amount);
    if (Number.isNaN(value) || value <= 0) return;

    const paid = Math.min(fee.paid + value, fee.amount);
    const created: Receipt = {
      id: `r${receipts.length + 1}`,
      studentId: student.id,
      amount: value,
      date: new Date().toISOString().slice(0, 10),
      term: fee.term,
      session: fee.session,
    };

    setFee({
      ...fee,
      paid,
      status: paid >= fee.amount ? 'Paid' : 'Partial',
    });
    setReceipts((current) => [created, ...current]);
    setPayOpen(false);
    setAmount('');
    setNotice(`Payment of ${formatCurrency(value)} received. Your receipt is ready.`);
  };

  return (
    <>
      <SectionCard
        id="fees"
        title="Fees &amp; Payments"
        description="Your balance, payment history, and receipts."
      >
        {fee ? (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">Total</p>
                <p className="mt-1 font-poppins text-lg font-bold text-navy">
                  {formatCurrency(fee.amount)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">Paid</p>
                <p className="mt-1 font-poppins text-lg font-bold text-success">
                  {formatCurrency(fee.paid)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">Balance</p>
                <p className="mt-1 font-poppins text-lg font-bold text-danger">
                  {formatCurrency(balance)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">Status</p>
                <p
                  className={`mt-1 font-poppins text-lg font-bold ${
                    fee.status === 'Paid' ? 'text-success' : 'text-warning'
                  }`}
                >
                  {fee.status}
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
              <p className="text-slate-500">Term / Session</p>
              <p className="font-medium text-navy">
                {fee.term} &middot; {fee.session} &middot; Due {formatDate(fee.dueDate)}
              </p>
            </div>

            {balance > 0 ? (
              <button
                type="button"
                onClick={() => {
                  setAmount(String(balance));
                  setPayOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 font-bold text-white transition-colors hover:bg-navy/90"
              >
                <CreditCard size={18} aria-hidden="true" />
                Pay Now (Mock)
              </button>
            ) : (
              <p className="rounded-lg bg-success/10 px-4 py-3 text-center text-sm font-semibold text-success">
                Your fees are fully paid for this term. Thank you.
              </p>
            )}

            {notice && (
              <p role="status" className="mt-4 text-sm font-medium text-success">
                {notice}
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-slate-500">No fee records are available for this term.</p>
        )}
      </SectionCard>

      <SectionCard id="payment-history" title="Payment History">
        <DataTable<Receipt>
          caption="Payment history"
          columns={[
            { key: 'date', label: 'Date', format: (value) => formatDate(String(value)) },
            { key: 'term', label: 'Term' },
            { key: 'session', label: 'Session' },
            {
              key: 'amount',
              label: 'Amount',
              align: 'right',
              format: (value) => formatCurrency(Number(value)),
            },
          ]}
          data={receipts}
          emptyMessage="No payment history."
          rowActions={(item) => (
            <button
              type="button"
              onClick={() => setReceipt(item)}
              className="flex items-center gap-1.5 text-sm font-medium text-navy transition-colors hover:text-navy/70"
            >
              <Printer size={15} aria-hidden="true" />
              Receipt
            </button>
          )}
        />
      </SectionCard>

      <Modal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        title="Make a Payment"
        description="This is a mock payment — no card details are collected."
        footer={
          <>
            <button
              type="button"
              onClick={() => setPayOpen(false)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="pay-fees-form"
              className="rounded-lg bg-navy px-4 py-2.5 font-medium text-white transition-colors hover:bg-navy/90"
            >
              Pay {amount ? formatCurrency(Number(amount)) : ''}
            </button>
          </>
        }
      >
        <form id="pay-fees-form" onSubmit={handlePay} className="space-y-4">
          <div>
            <label htmlFor="payment-amount" className="mb-2 block text-sm font-medium text-slate-700">
              Amount (₦)
            </label>
            <input
              id="payment-amount"
              name="amount"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              autoFocus
              value={amount}
              onChange={(event) => setAmount(event.target.value.replace(/[^0-9]/g, ''))}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
            />
          </div>

          <p className="text-xs text-slate-500">
            Outstanding balance: {formatCurrency(balance)}. Payments are recorded against{' '}
            {fee?.term} &middot; {fee?.session}.
          </p>
        </form>
      </Modal>

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
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                Paid
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Student</dt>
                <dd className="mt-1 font-medium text-navy">{student.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Date</dt>
                <dd className="mt-1 font-medium text-navy">{formatDate(receipt.date)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Term</dt>
                <dd className="mt-1 font-medium text-navy">
                  {receipt.term} &middot; {receipt.session}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Amount</dt>
                <dd className="mt-1 font-medium text-success">{formatCurrency(receipt.amount)}</dd>
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
