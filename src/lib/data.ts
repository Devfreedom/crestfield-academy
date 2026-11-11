import type {
  Student,
  Teacher,
  Class,
  Fee,
  Assignment,
  AttendanceRecord,
  Announcement,
  TimetableEntry,
  Receipt,
} from '@/types';

export const STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Chiamaka Ibrahim',
    class: 'SS2',
    section: 'A',
    gender: 'Female',
    attendance: 94,
    feesOwed: 0,
    status: 'Active',
  },
  {
    id: 's2',
    name: 'Emeka Nwosu',
    class: 'SS2',
    section: 'A',
    gender: 'Male',
    attendance: 87,
    feesOwed: 150000,
    status: 'Active',
  },
  {
    id: 's3',
    name: 'Zainab Aliyu',
    class: 'SS1',
    section: 'B',
    gender: 'Female',
    attendance: 91,
    feesOwed: 0,
    status: 'Active',
  },
  {
    id: 's4',
    name: 'David Okafor',
    class: 'JSS3',
    section: 'A',
    gender: 'Male',
    attendance: 78,
    feesOwed: 320000,
    status: 'Active',
  },
  {
    id: 's5',
    name: 'Fatima Yusuf',
    class: 'JSS2',
    section: 'B',
    gender: 'Female',
    attendance: 95,
    feesOwed: 0,
    status: 'Active',
  },
  {
    id: 's6',
    name: 'Samuel Peter',
    class: 'SS3',
    section: 'A',
    gender: 'Male',
    attendance: 82,
    feesOwed: 450000,
    status: 'Active',
  },
  {
    id: 's7',
    name: 'Grace Adebayo',
    class: 'SS1',
    section: 'A',
    gender: 'Female',
    attendance: 89,
    feesOwed: 0,
    status: 'Active',
  },
  {
    id: 's8',
    name: 'Musa Sani',
    class: 'JSS1',
    section: 'A',
    gender: 'Male',
    attendance: 92,
    feesOwed: 0,
    status: 'Active',
  },
];

export const TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Mr. James Okafor',
    subject: 'Mathematics',
    classes: ['SS1', 'SS2', 'SS3'],
    email: 'teacher@crestfield.edu.ng',
  },
  {
    id: 't2',
    name: 'Mrs. Grace Nwosu',
    subject: 'English Language',
    classes: ['JSS1', 'JSS2', 'JSS3'],
    email: 'grace.nwosu@crestfield.edu.ng',
  },
  {
    id: 't3',
    name: 'Dr. Adaeze Okonkwo',
    subject: 'Biology',
    classes: ['SS1', 'SS2', 'SS3'],
    email: 'adaeze.okonkwo@crestfield.edu.ng',
  },
  {
    id: 't4',
    name: 'Mr. Ibrahim Musa',
    subject: 'Civic Education',
    classes: ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'],
    email: 'ibrahim.musa@crestfield.edu.ng',
  },
];

export const CLASSES: Class[] = [
  { id: 'jss1-a', name: 'JSS1 A', level: 'JSS1', section: 'A', teacherId: 't2', studentCount: 32 },
  { id: 'jss1-b', name: 'JSS1 B', level: 'JSS1', section: 'B', teacherId: 't2', studentCount: 30 },
  { id: 'jss2-a', name: 'JSS2 A', level: 'JSS2', section: 'A', teacherId: 't2', studentCount: 28 },
  { id: 'jss2-b', name: 'JSS2 B', level: 'JSS2', section: 'B', teacherId: 't2', studentCount: 29 },
  { id: 'jss3-a', name: 'JSS3 A', level: 'JSS3', section: 'A', teacherId: 't2', studentCount: 31 },
  { id: 'ss1-a', name: 'SS1 A', level: 'SS1', section: 'A', teacherId: 't1', studentCount: 25 },
  { id: 'ss1-b', name: 'SS1 B', level: 'SS1', section: 'B', teacherId: 't1', studentCount: 26 },
  { id: 'ss2-a', name: 'SS2 A', level: 'SS2', section: 'A', teacherId: 't1', studentCount: 24 },
  { id: 'ss2-b', name: 'SS2 B', level: 'SS2', section: 'B', teacherId: 't1', studentCount: 23 },
  { id: 'ss3-a', name: 'SS3 A', level: 'SS3', section: 'A', teacherId: 't1', studentCount: 22 },
];

export const FEES: Fee[] = [
  { id: 'f1', studentId: 's1', term: 'Second Term', session: '2024/2025', amount: 950000, paid: 950000, dueDate: '2025-02-15', status: 'Paid' },
  { id: 'f2', studentId: 's2', term: 'Second Term', session: '2024/2025', amount: 950000, paid: 800000, dueDate: '2025-02-15', status: 'Partial' },
  { id: 'f3', studentId: 's3', term: 'Second Term', session: '2024/2025', amount: 850000, paid: 850000, dueDate: '2025-02-15', status: 'Paid' },
  { id: 'f4', studentId: 's4', term: 'Second Term', session: '2024/2025', amount: 850000, paid: 530000, dueDate: '2025-02-15', status: 'Partial' },
  { id: 'f5', studentId: 's5', term: 'Second Term', session: '2024/2025', amount: 850000, paid: 850000, dueDate: '2025-02-15', status: 'Paid' },
  { id: 'f6', studentId: 's6', term: 'Second Term', session: '2024/2025', amount: 950000, paid: 500000, dueDate: '2025-02-15', status: 'Partial' },
  { id: 'f7', studentId: 's7', term: 'Second Term', session: '2024/2025', amount: 950000, paid: 950000, dueDate: '2025-02-15', status: 'Paid' },
  { id: 'f8', studentId: 's8', term: 'Second Term', session: '2024/2025', amount: 850000, paid: 850000, dueDate: '2025-02-15', status: 'Paid' },
];

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    title: 'Quadratic Equations Problem Set',
    class: 'SS2',
    subject: 'Mathematics',
    dueDate: '2025-11-18',
    description: 'Solve problems 1-20 from the textbook chapter on quadratic equations.',
    createdBy: 't1',
  },
  {
    id: 'a2',
    title: 'Essay: The Role of Citizens in Democracy',
    class: 'SS2',
    subject: 'Civic Education',
    dueDate: '2025-11-20',
    description: 'Write a 1000-word essay on citizen participation in democratic governance.',
    createdBy: 't4',
  },
  {
    id: 'a3',
    title: 'Cell Biology Lab Report',
    class: 'SS2',
    subject: 'Biology',
    dueDate: '2025-11-25',
    description: 'Submit lab report on microscope observation of plant and animal cells.',
    createdBy: 't3',
  },
  {
    id: 'a4',
    title: 'Comprehension: Things Fall Apart',
    class: 'SS1',
    subject: 'English Language',
    dueDate: '2025-11-22',
    description: 'Answer questions on chapters 1-5 of Things Fall Apart by Chinua Achebe.',
    createdBy: 't2',
  },
];

export const ATTENDANCE: AttendanceRecord[] = [
  { id: 'at1', studentId: 's1', date: '2025-11-10', status: 'Present' },
  { id: 'at2', studentId: 's2', date: '2025-11-10', status: 'Present' },
  { id: 'at3', studentId: 's3', date: '2025-11-10', status: 'Present' },
  { id: 'at4', studentId: 's4', date: '2025-11-10', status: 'Absent' },
  { id: 'at5', studentId: 's5', date: '2025-11-10', status: 'Present' },
  { id: 'at6', studentId: 's6', date: '2025-11-10', status: 'Present' },
  { id: 'at7', studentId: 's7', date: '2025-11-10', status: 'Present' },
  { id: 'at8', studentId: 's8', date: '2025-11-10', status: 'Present' },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'an1',
    title: 'Mid-Term Break',
    content: 'School will be closed from November 15-17 for mid-term break. Classes resume Monday, November 18.',
    date: '2025-11-10',
    audience: ['super_admin', 'admin', 'teacher', 'student'],
  },
  {
    id: 'an2',
    title: 'WAEC Registration Deadline',
    content: 'SS3 students: WAEC registration closes on November 30. Pay your fees to the bursary office.',
    date: '2025-11-08',
    audience: ['super_admin', 'admin', 'teacher', 'student'],
  },
  {
    id: 'an3',
    title: 'Staff Meeting',
    content: 'All teachers are required to attend the staff meeting on Thursday at 3:00 PM in the staff room.',
    date: '2025-11-05',
    audience: ['super_admin', 'admin', 'teacher'],
  },
];

export const TIMETABLE: TimetableEntry[] = [
  { id: 'tt1', day: 'Monday', time: '8:00 AM', subject: 'Mathematics', teacher: 'Mr. James Okafor', room: 'Room 101', classLevel: 'SS2' },
  { id: 'tt2', day: 'Monday', time: '9:00 AM', subject: 'English Language', teacher: 'Mrs. Grace Nwosu', room: 'Room 102', classLevel: 'SS2' },
  { id: 'tt3', day: 'Monday', time: '10:00 AM', subject: 'Biology', teacher: 'Dr. Adaeze Okonkwo', room: 'Lab 3', classLevel: 'SS2' },
  { id: 'tt4', day: 'Tuesday', time: '8:00 AM', subject: 'Civic Education', teacher: 'Mr. Ibrahim Musa', room: 'Room 101', classLevel: 'SS2' },
  { id: 'tt5', day: 'Tuesday', time: '9:00 AM', subject: 'Mathematics', teacher: 'Mr. James Okafor', room: 'Room 101', classLevel: 'SS2' },
  { id: 'tt6', day: 'Wednesday', time: '8:00 AM', subject: 'Biology', teacher: 'Dr. Adaeze Okonkwo', room: 'Lab 3', classLevel: 'SS2' },
  { id: 'tt7', day: 'Wednesday', time: '9:00 AM', subject: 'English Language', teacher: 'Mrs. Grace Nwosu', room: 'Room 102', classLevel: 'SS2' },
  { id: 'tt8', day: 'Thursday', time: '8:00 AM', subject: 'Mathematics', teacher: 'Mr. James Okafor', room: 'Room 101', classLevel: 'SS2' },
  { id: 'tt9', day: 'Thursday', time: '9:00 AM', subject: 'Civic Education', teacher: 'Mr. Ibrahim Musa', room: 'Room 101', classLevel: 'SS2' },
  { id: 'tt10', day: 'Friday', time: '8:00 AM', subject: 'Biology', teacher: 'Dr. Adaeze Okonkwo', room: 'Lab 3', classLevel: 'SS2' },
];

export const RECEIPTS: Receipt[] = [
  { id: 'r1', studentId: 's1', amount: 950000, date: '2025-02-10', term: 'Second Term', session: '2024/2025' },
  { id: 'r2', studentId: 's3', amount: 850000, date: '2025-02-08', term: 'Second Term', session: '2024/2025' },
  { id: 'r3', studentId: 's5', amount: 850000, date: '2025-02-09', term: 'Second Term', session: '2024/2025' },
  { id: 'r4', studentId: 's7', amount: 950000, date: '2025-02-11', term: 'Second Term', session: '2024/2025' },
  { id: 'r5', studentId: 's8', amount: 850000, date: '2025-02-07', term: 'Second Term', session: '2024/2025' },
];

export const ADMIN_USERS = [
  { id: 'u1', name: 'Super Admin', email: 'superadmin@crestfield.edu.ng', role: 'super_admin' as const },
  { id: 'u2', name: 'Admin Officer', email: 'admin@crestfield.edu.ng', role: 'admin' as const },
  { id: 'u3', name: 'Mr. James Okafor', email: 'teacher@crestfield.edu.ng', role: 'teacher' as const },
  { id: 'u4', name: 'Chiamaka Ibrahim', email: 'student@crestfield.edu.ng', role: 'student' as const },
  { id: 'u5', name: 'Mrs. Grace Nwosu', email: 'grace.nwosu@crestfield.edu.ng', role: 'teacher' as const },
  { id: 'u6', name: 'Dr. Adaeze Okonkwo', email: 'adaeze.okonkwo@crestfield.edu.ng', role: 'teacher' as const },
  { id: 'u7', name: 'Mr. Ibrahim Musa', email: 'ibrahim.musa@crestfield.edu.ng', role: 'teacher' as const },
];