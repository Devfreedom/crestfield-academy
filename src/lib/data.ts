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
  Grade,
  Application,
  Resource,
  NewsItem,
  Permission,
  SchoolSettings,
} from '@/types';

export const STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Chiamaka Ibrahim',
    class: 'SS2',
    section: 'A',
    gender: 'Female',
    attendance: 94,
    feesOwed: 175000,
    status: 'Active',
  },
  {
    id: 's2',
    name: 'Emeka Nwosu',
    class: 'SS2',
    section: 'A',
    gender: 'Male',
    attendance: 87,
    feesOwed: 75000,
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
    feesOwed: 160000,
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
    feesOwed: 225000,
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
  { id: 'f1', studentId: 's1', term: 'Second Term', session: '2024/2025', amount: 475000, paid: 300000, dueDate: '2025-02-15', status: 'Partial' },
  { id: 'f2', studentId: 's2', term: 'Second Term', session: '2024/2025', amount: 475000, paid: 400000, dueDate: '2025-02-15', status: 'Partial' },
  { id: 'f3', studentId: 's3', term: 'Second Term', session: '2024/2025', amount: 425000, paid: 425000, dueDate: '2025-02-15', status: 'Paid' },
  { id: 'f4', studentId: 's4', term: 'Second Term', session: '2024/2025', amount: 425000, paid: 265000, dueDate: '2025-02-15', status: 'Partial' },
  { id: 'f5', studentId: 's5', term: 'Second Term', session: '2024/2025', amount: 425000, paid: 425000, dueDate: '2025-02-15', status: 'Paid' },
  { id: 'f6', studentId: 's6', term: 'Second Term', session: '2024/2025', amount: 475000, paid: 250000, dueDate: '2025-02-15', status: 'Partial' },
  { id: 'f7', studentId: 's7', term: 'Second Term', session: '2024/2025', amount: 475000, paid: 475000, dueDate: '2025-02-15', status: 'Paid' },
  { id: 'f8', studentId: 's8', term: 'Second Term', session: '2024/2025', amount: 425000, paid: 425000, dueDate: '2025-02-15', status: 'Paid' },
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
  { id: 'r1', studentId: 's1', amount: 300000, date: '2025-02-10', term: 'Second Term', session: '2024/2025' },
  { id: 'r2', studentId: 's3', amount: 425000, date: '2025-02-08', term: 'Second Term', session: '2024/2025' },
  { id: 'r3', studentId: 's5', amount: 425000, date: '2025-02-09', term: 'Second Term', session: '2024/2025' },
  { id: 'r4', studentId: 's7', amount: 475000, date: '2025-02-11', term: 'Second Term', session: '2024/2025' },
  { id: 'r5', studentId: 's8', amount: 425000, date: '2025-02-07', term: 'Second Term', session: '2024/2025' },
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

export const GRADES: Grade[] = [
  { id: 'g1', studentId: 's1', class: 'SS2', subject: 'Mathematics', assessment: 'Quadratic Equations Problem Set', score: 88, grade: 'B2', remark: 'Very good', term: 'Second Term', session: '2024/2025' },
  { id: 'g2', studentId: 's1', class: 'SS2', subject: 'English Language', assessment: 'Comprehension: Things Fall Apart', score: 74, grade: 'C4', remark: 'Good', term: 'Second Term', session: '2024/2025' },
  { id: 'g3', studentId: 's1', class: 'SS2', subject: 'Biology', assessment: 'Cell Biology Lab Report', score: 91, grade: 'A1', remark: 'Excellent', term: 'Second Term', session: '2024/2025' },
  { id: 'g4', studentId: 's1', class: 'SS2', subject: 'Civic Education', assessment: 'Essay: The Role of Citizens in Democracy', score: 80, grade: 'B3', remark: 'Very good', term: 'Second Term', session: '2024/2025' },
  { id: 'g5', studentId: 's1', class: 'SS2', subject: 'Physics', assessment: 'Continuous Assessment 1', score: 85, grade: 'B2', remark: 'Very good', term: 'Second Term', session: '2024/2025' },
  { id: 'g6', studentId: 's1', class: 'SS2', subject: 'Chemistry', assessment: 'Continuous Assessment 1', score: 78, grade: 'C3', remark: 'Good', term: 'Second Term', session: '2024/2025' },
  { id: 'g7', studentId: 's3', class: 'SS1', subject: 'English Language', assessment: 'Comprehension: Things Fall Apart', score: 66, grade: 'C5', remark: 'Credit', term: 'Second Term', session: '2024/2025' },
  { id: 'g8', studentId: 's3', class: 'SS1', subject: 'Mathematics', assessment: 'Quadratic Equations Problem Set', score: 59, grade: 'C6', remark: 'Credit', term: 'Second Term', session: '2024/2025' },
  { id: 'g9', studentId: 's3', class: 'SS1', subject: 'Basic Science', assessment: 'Continuous Assessment 1', score: 72, grade: 'C4', remark: 'Good', term: 'Second Term', session: '2024/2025' },
  { id: 'g10', studentId: 's5', class: 'JSS2', subject: 'Mathematics', assessment: 'Continuous Assessment 1', score: 93, grade: 'A1', remark: 'Excellent', term: 'Second Term', session: '2024/2025' },
  { id: 'g11', studentId: 's5', class: 'JSS2', subject: 'Basic Science', assessment: 'Continuous Assessment 1', score: 89, grade: 'B2', remark: 'Very good', term: 'Second Term', session: '2024/2025' },
];

export const APPLICATIONS: Application[] = [
  { id: 'ap1', childName: 'Musa Ibrahim', applyingTo: 'JSS1', parentName: 'Mr. Ibrahim Sani', phone: '+234 803 441 2290', email: 'ibrahim.sani@example.com', submittedOn: '2025-11-10', status: 'Pending' },
  { id: 'ap2', childName: 'Amina Bello', applyingTo: 'SS1', parentName: 'Mrs. Hauwa Bello', phone: '+234 806 772 1184', email: 'hauwa.bello@example.com', submittedOn: '2025-11-09', status: 'Under Review' },
  { id: 'ap3', childName: 'Tobi Adeyemi', applyingTo: 'JSS2', parentName: 'Mr. Segun Adeyemi', phone: '+234 705 908 3341', email: 'segun.adeyemi@example.com', submittedOn: '2025-11-08', status: 'Shortlisted' },
  { id: 'ap4', childName: 'Halima Yusuf', applyingTo: 'JSS3', parentName: 'Mrs. Aisha Yusuf', phone: '+234 812 330 8876', email: 'aisha.yusuf@example.com', submittedOn: '2025-11-06', status: 'Offered' },
  { id: 'ap5', childName: 'Emeka Uche', applyingTo: 'SS2', parentName: 'Mr. Chidi Uche', phone: '+234 809 551 6620', email: 'chidi.uche@example.com', submittedOn: '2025-11-05', status: 'Under Review' },
  { id: 'ap6', childName: 'Zainab Lawal', applyingTo: 'JSS1', parentName: 'Mrs. Bisi Lawal', phone: '+234 816 224 7738', email: 'bisi.lawal@example.com', submittedOn: '2025-11-04', status: 'Pending' },
  { id: 'ap7', childName: 'David Eze', applyingTo: 'SS3', parentName: 'Mr. Ifeanyi Eze', phone: '+234 807 116 4402', email: 'ifeanyi.eze@example.com', submittedOn: '2025-11-02', status: 'Offered' },
  { id: 'ap8', childName: 'Blessing Yusuf', applyingTo: 'SS1', parentName: 'Mr. Nasir Yusuf', phone: '+234 810 337 9951', email: 'nasir.yusuf@example.com', submittedOn: '2025-11-01', status: 'Pending' },
];

export const RESOURCES: Resource[] = [
  { id: 'r1', title: 'Quadratic Equations Lecture Notes', subject: 'Mathematics', class: 'SS2', fileName: 'quadratic-equations-notes.pdf', size: '1.8 MB', uploadedOn: '2025-11-07', uploadedBy: 't1' },
  { id: 'r2', title: 'Cell Biology Practical Manual', subject: 'Biology', class: 'SS1', fileName: 'cell-biology-practical.pdf', size: '3.2 MB', uploadedOn: '2025-11-05', uploadedBy: 't3' },
  { id: 'r3', title: 'Democracy Essay Guidance', subject: 'Civic Education', class: 'SS2', fileName: 'democracy-essay-guide.docx', size: '96 KB', uploadedOn: '2025-11-03', uploadedBy: 't4' },
  { id: 'r4', title: 'Things Fall Apart Study Guide', subject: 'English Language', class: 'SS1', fileName: 'things-fall-apart-guide.pdf', size: '2.1 MB', uploadedOn: '2025-10-30', uploadedBy: 't2' },
];

export const NEWS_ITEMS: NewsItem[] = [
  { id: 'n1', title: 'WAEC Registration Now Open', date: 'Nov 8, 2026', excerpt: 'SS3 students can now register for the 2026 WAEC examinations. Deadline: November 30.' },
  { id: 'n2', title: 'Mid-Term Break Announcement', date: 'Nov 1, 2026', excerpt: 'School will be closed from November 15-17 for mid-term break. Classes resume Monday, November 18.' },
  { id: 'n3', title: 'Science Fair 2026', date: 'Oct 20, 2026', excerpt: 'Our annual science fair showcased innovative student projects in robotics, chemistry, and environmental science.' },
];

export const REVENUE_BY_TERM = [
  { term: 'First Term', revenue: 34100000, collected: 30700000 },
  { term: 'Second Term', revenue: 37400000, collected: 34700000 },
  { term: 'Third Term', revenue: 39750000, collected: 36050000 },
];

export const ENROLLMENT_GROWTH = [
  { session: '2021/2022', students: 610, teachers: 48 },
  { session: '2022/2023', students: 668, teachers: 51 },
  { session: '2023/2024', students: 742, teachers: 56 },
  { session: '2024/2025', students: 812, teachers: 59 },
  { session: '2025/2026', students: 850, teachers: 62 },
];

export const CLASS_PERFORMANCE = [
  { class: 'JSS1 A', students: 32, average: 61, best: 88, passRate: 84 },
  { class: 'JSS1 B', students: 30, average: 58, best: 81, passRate: 79 },
  { class: 'JSS2 A', students: 28, average: 66, best: 90, passRate: 88 },
  { class: 'JSS2 B', students: 29, average: 63, best: 85, passRate: 82 },
  { class: 'JSS3 A', students: 31, average: 69, best: 92, passRate: 91 },
  { class: 'SS1 A', students: 25, average: 72, best: 94, passRate: 94 },
  { class: 'SS1 B', students: 26, average: 68, best: 87, passRate: 87 },
  { class: 'SS2 A', students: 24, average: 74, best: 96, passRate: 96 },
  { class: 'SS2 B', students: 23, average: 71, best: 89, passRate: 90 },
  { class: 'SS3 A', students: 22, average: 78, best: 97, passRate: 98 },
];

export const ATTENDANCE_REPORT = [
  { class: 'JSS1 A', present: 29, absent: 1, late: 2, rate: 94 },
  { class: 'JSS2 A', present: 25, absent: 1, late: 2, rate: 89 },
  { class: 'SS1 A', present: 23, absent: 1, late: 1, rate: 92 },
  { class: 'SS1 B', present: 22, absent: 2, late: 2, rate: 85 },
  { class: 'SS2 A', present: 22, absent: 1, late: 1, rate: 92 },
  { class: 'SS2 B', present: 19, absent: 2, late: 2, rate: 83 },
  { class: 'SS3 A', present: 20, absent: 1, late: 1, rate: 91 },
];

export const PERMISSIONS: Permission[] = [
  { area: 'View dashboard', super_admin: true, admin: true, teacher: true, student: true },
  { area: 'Manage users & roles', super_admin: true, admin: false, teacher: false, student: false },
  { area: 'School settings', super_admin: true, admin: false, teacher: false, student: false },
  { area: 'Manage students', super_admin: true, admin: true, teacher: false, student: false },
  { area: 'Manage classes & timetable', super_admin: true, admin: true, teacher: false, student: false },
  { area: 'Manage fees & receipts', super_admin: true, admin: true, teacher: false, student: false },
  { area: 'Publish announcements', super_admin: true, admin: true, teacher: false, student: false },
  { area: 'View school reports', super_admin: true, admin: true, teacher: false, student: false },
  { area: 'Take attendance', super_admin: true, admin: true, teacher: true, student: false },
  { area: 'Create & grade assignments', super_admin: true, admin: true, teacher: true, student: false },
  { area: 'Upload teaching resources', super_admin: true, admin: true, teacher: true, student: false },
  { area: 'View own grades', super_admin: true, admin: true, teacher: true, student: true },
  { area: 'Pay fees & view receipts', super_admin: true, admin: true, teacher: false, student: true },
];

export const SCHOOL_SETTINGS: SchoolSettings = {
  schoolName: 'Crestfield Academy',
  term: 'Second Term',
  session: '2024/2025',
  address: 'Plot 12, Gwarinpa, Abuja, Nigeria',
  email: 'admissions@crestfieldacademy.edu.ng',
  phone: '+234 800 123 4567',
};

export const TERM_OPTIONS = ['First Term', 'Second Term', 'Third Term'];
export const SESSION_OPTIONS = ['2023/2024', '2024/2025', '2025/2026'];
export const CLASS_LEVELS = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'] as const;