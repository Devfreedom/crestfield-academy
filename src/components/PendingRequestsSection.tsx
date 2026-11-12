'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import { approveRequest, rejectRequest, type PendingRequest } from '@/lib/accounts';
import { usePendingRequests } from '@/lib/useAccounts';
import { formatDateShort } from '@/lib/utils';

const ROLE_LABEL: Record<PendingRequest['role'], string> = {
  student: 'Student',
  teacher: 'Teacher',
  parent: 'Parent',
};

/**
 * Admin-facing queue of account requests from the Register tab. Approving
 * moves the person into `crestfield_users` so they can sign in; rejecting
 * only marks the request — the list shows pending ones only.
 */
export default function PendingRequestsSection() {
  const { requests } = usePendingRequests();
  const [toast, setToast] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showToast = (message: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(message);
    timerRef.current = setTimeout(() => setToast(''), 3500);
  };

  const handleApprove = (id: string) => {
    approveRequest(id);
    showToast('Approved');
  };

  const handleReject = (id: string) => {
    rejectRequest(id);
    showToast('Rejected');
  };

  return (
    <>
      <SectionCard
        id="pending-requests"
        title="Pending Account Requests"
        description={
          requests.length > 0
            ? `${requests.length} request${requests.length === 1 ? '' : 's'} awaiting review`
            : 'No requests awaiting review'
        }
      >
        <DataTable<PendingRequest>
          caption="Pending account requests"
          columns={[
            { key: 'fullName', label: 'Full Name' },
            { key: 'email', label: 'Email' },
            {
              key: 'role',
              label: 'Role',
              format: (value) => ROLE_LABEL[value as PendingRequest['role']],
            },
            {
              key: 'class',
              label: 'Class',
              format: (value) => (typeof value === 'string' ? value : '—'),
            },
            {
              key: 'createdAt',
              label: 'Requested',
              format: (value) => formatDateShort(String(value)),
            },
          ]}
          data={requests}
          searchableKeys={['fullName', 'email', 'role', 'class']}
          searchPlaceholder="Search requests..."
          emptyMessage="No pending account requests."
          rowActions={(request) => (
            <>
              <button
                type="button"
                onClick={() => handleApprove(request.id)}
                className="flex items-center gap-1.5 text-sm font-medium text-success transition-colors hover:text-success/70"
              >
                <CheckCircle2 size={15} aria-hidden="true" />
                Approve
              </button>
              <button
                type="button"
                onClick={() => handleReject(request.id)}
                className="flex items-center gap-1.5 text-sm font-medium text-danger transition-colors hover:text-danger/70"
              >
                <XCircle size={15} aria-hidden="true" />
                Reject
              </button>
            </>
          )}
        />
      </SectionCard>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          <CheckCircle2 size={16} className="text-gold" aria-hidden="true" />
          {toast}
        </div>
      )}
    </>
  );
}
