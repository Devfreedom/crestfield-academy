'use client';

import Modal from '@/components/Modal';
import { Printer } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Fee, Receipt, Student } from '@/types';

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  amount: string;
  onAmountChange: (value: string) => void;
  balance: number;
  term: string;
  session: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function PaymentModal({
  open,
  onClose,
  amount,
  onAmountChange,
  balance,
  term,
  session,
  onSubmit,
}: PaymentModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Make a Payment"
      description="This is a mock payment — no card details are collected."
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
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
      <form id="pay-fees-form" onSubmit={onSubmit} className="space-y-4">
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
            onChange={(event) => onAmountChange(event.target.value.replace(/[^0-9]/g, ''))}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
          />
        </div>

        <p className="text-xs text-slate-500">
          Outstanding balance: {formatCurrency(balance)}. Payments are recorded against {term} &middot;{' '}
          {session}.
        </p>
      </form>
    </Modal>
  );
}

type ReceiptModalProps = {
  receipt: Receipt | null;
  student: Student;
  onClose: () => void;
};

export function ReceiptModal({ receipt, student, onClose }: ReceiptModalProps) {
  return (
    <Modal
      open={receipt !== null}
      onClose={onClose}
      title="Payment Receipt"
      description={receipt ? `Receipt ${receipt.id.toUpperCase()}` : undefined}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
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
  );
}

export type { Fee };
