export type Role = 'super_admin' | 'admin' | 'teacher' | 'student';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  classId?: string;
};

export type Student = {
  id: string;
  name: string;
  class: 'JSS1' | 'JSS2' | 'JSS3' | 'SS1' | 'SS2' | 'SS3';
  section: 'A' | 'B';
  gender: 'Male' | 'Female';
  attendance: number; // %
  feesOwed: number; // in Naira
  status: 'Active' | 'Suspended' | 'Graduated';
};

export type Teacher = {
  id: string;
  name: string;
  subject: string;
  classes: string[]; // e.g. ['SS1', 'SS2']
  email: string;
};

export type Class = {
  id: string;
  name: string;
  level: 'JSS1' | 'JSS2' | 'JSS3' | 'SS1' | 'SS2' | 'SS3';
  section: 'A' | 'B';
  teacherId?: string;
  studentCount: number;
};

export type Fee = {
  id: string;
  studentId: string;
  term: string;
  session: string;
  amount: number;
  paid: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Outstanding';
};

export type Assignment = {
  id: string;
  title: string;
  class: string;
  subject: string;
  dueDate: string;
  description: string;
  createdBy: string;
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  audience: Role[];
};

export type TimetableEntry = {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  subject: string;
  teacher: string;
  room: string;
  classLevel: string;
};

export type Receipt = {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  term: string;
  session: string;
};

export type Grade = {
  id: string;
  studentId: string;
  class: string;
  subject: string;
  assessment: string;
  score: number; // out of 100
  grade: string; // A1 - F9
  remark: string;
  term: string;
  session: string;
};

export type Application = {
  id: string;
  childName: string;
  applyingTo: string;
  parentName: string;
  phone: string;
  email: string;
  submittedOn: string;
  status: 'Pending' | 'Under Review' | 'Shortlisted' | 'Offered';
};

export type Resource = {
  id: string;
  title: string;
  subject: string;
  class: string;
  fileName: string;
  size: string;
  uploadedOn: string;
  uploadedBy: string;
};

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
};

export type Permission = {
  area: string;
  super_admin: boolean;
  admin: boolean;
  teacher: boolean;
  student: boolean;
};

export type SchoolSettings = {
  schoolName: string;
  term: string;
  session: string;
  address: string;
  email: string;
  phone: string;
};
