'use client';

import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import { ASSIGNMENTS } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import type { Assignment, Student } from '@/types';

export default function AssignmentsSection({ student }: { student: Student }) {
  const upcoming = ASSIGNMENTS.filter((assignment) => assignment.class === student.class);

  return (
    <SectionCard
      id="assignments"
      title="Upcoming Assignments"
      description="Work set by your teachers for this term."
    >
      <DataTable<Assignment>
        caption="Upcoming assignments"
        columns={[
          {
            key: 'title',
            label: 'Assignment',
            render: (assignment) => (
              <div>
                <p className="font-medium text-navy">{assignment.title}</p>
                <p className="text-xs text-slate-500">{assignment.description}</p>
              </div>
            ),
          },
          { key: 'subject', label: 'Subject' },
          { key: 'dueDate', label: 'Due Date', format: (value) => formatDate(String(value)) },
        ]}
        data={upcoming}
        searchableKeys={['title', 'subject']}
        searchPlaceholder="Search assignments..."
        emptyMessage="No upcoming assignments."
      />
    </SectionCard>
  );
}
