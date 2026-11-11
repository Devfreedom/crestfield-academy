'use client';

import { useMemo, useState } from 'react';
import { Plus, User as UserIcon } from 'lucide-react';
import SectionCard from '@/components/SectionCard';
import DataTable from '@/components/DataTable';
import { CLASS_LEVELS, STUDENTS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import type { Student } from '@/types';
import { AddStudentModal, StudentProfileModal, type NewStudent } from './StudentModals';

const STATUS_TONE: Record<Student['status'], string> = {
  Active: 'bg-success/10 text-success',
  Suspended: 'bg-warning/10 text-warning',
  Graduated: 'bg-navy/10 text-navy',
};

const INITIAL_NEW_STUDENT: NewStudent = {
  name: '',
  class: 'JSS1',
  section: 'A',
  gender: 'Male',
};

export default function StudentsSection() {
  const [students, setStudents] = useState<Student[]>(STUDENTS);
  const [classFilter, setClassFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [profile, setProfile] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<NewStudent>(INITIAL_NEW_STUDENT);

  const classOptions = useMemo(() => ['all', ...CLASS_LEVELS], []);

  const handleAddStudent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const created: Student = {
      id: `s${students.length + 1}`,
      name: newStudent.name,
      class: newStudent.class,
      section: newStudent.section,
      gender: newStudent.gender,
      attendance: 100,
      feesOwed: 0,
      status: 'Active',
    };
    setStudents((current) => [...current, created]);
    setAddOpen(false);
    setNewStudent(INITIAL_NEW_STUDENT);
  };

  return (
    <>
      <SectionCard
        id="students"
        title="Students"
        description="Search, filter, and add students to the roll."
        actions={
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy/90"
          >
            <Plus size={16} aria-hidden="true" />
            Add Student
          </button>
        }
      >
        <DataTable<Student>
          caption="Student roll"
          columns={[
            { key: 'name', label: 'Name' },
            {
              key: 'class',
              label: 'Class',
              render: (student) => `${student.class} ${student.section}`,
            },
            { key: 'gender', label: 'Gender' },
            { key: 'attendance', label: 'Attendance', format: (value) => `${value}%` },
            {
              key: 'feesOwed',
              label: 'Fees Owed',
              align: 'right',
              format: (value) => formatCurrency(Number(value)),
            },
            {
              key: 'status',
              label: 'Status',
              render: (student) => (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_TONE[student.status]}`}
                >
                  {student.status}
                </span>
              ),
            },
          ]}
          data={students}
          searchableKeys={['name', 'class', 'section']}
          searchPlaceholder="Search students..."
          emptyMessage="No students found."
          filters={[
            {
              id: 'class',
              label: 'Filter by class',
              value: classFilter,
              onChange: setClassFilter,
              matches: (student, value) => student.class === value,
              options: classOptions.map((level) => ({
                value: level,
                label: level === 'all' ? 'All classes' : level,
              })),
            },
          ]}
          rowActions={(student) => (
            <button
              type="button"
              onClick={() => setProfile(student)}
              className="flex items-center gap-1.5 text-sm font-medium text-navy transition-colors hover:text-navy/70"
            >
              <UserIcon size={15} aria-hidden="true" />
              View Profile
            </button>
          )}
        />
      </SectionCard>

      <AddStudentModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        value={newStudent}
        onChange={setNewStudent}
        onSubmit={handleAddStudent}
      />

      <StudentProfileModal student={profile} onClose={() => setProfile(null)} />
    </>
  );
}
