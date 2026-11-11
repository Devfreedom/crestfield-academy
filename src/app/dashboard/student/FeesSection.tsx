'use client';

import { useState } from 'react';
import { CreditCard, Printer } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import { FEES, RECEIPTS } from '@/lib/data';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Fee, Receipt, Student } from '@/types';
import { PaymentModal, ReceiptModal } from './FeeModals';

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

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        amount={amount}
        onAmountChange={setAmount}
        balance={balance}
        term={fee?.term ?? ''}
        session={fee?.session ?? ''}
        onSubmit={handlePay}
      />

      <ReceiptModal receipt={receipt} student={student} onClose={() => setReceipt(null)} />
    </>
  );
}
