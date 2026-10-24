import {
  UserProfile,
  TeacherClass,
  TeacherStudent,
  TeacherTask,
  ParentMessage,
  StudentPeriod,
  StudentTaskItem,
  StudyMaterialItem,
  StudentAchievement,
  AttendanceDayRecord,
  Student,
  AttendanceRecord,
  SafetyIncident,
  ApprovalTask,
  BusVehicle,
  AuditLogItem,
  TimetableSlot,
  RoleType,
  IncidentStatus,
  IncidentRisk,
  AdminStaffMember,
  FeeInvoiceItem,
  ClassSectionDetail,
  PrincipalAgendaItem,
  PrincipalCriticalAlert,
  PrincipalStaffLeaveItem,
  PrincipalSafeguardingCase,
  PrincipalExecutiveApproval,
  PrincipalOperationModule,
  VicePrincipalSchedulingConflict,
  VicePrincipalLessonPlan,
  VicePrincipalExamSession,
  VicePrincipalPublicationQueueItem,
  VicePrincipalTeacherItem,
  ParentChildProfile,
  ParentFeeItem,
  ParentNoticeItem,
  ParentCertificateItem,
  ParentTransportTelemetry,
  ParentLeaveRequest,
  ParentPtmBooking,
} from '../types';

export const USERS: Record<string, UserProfile> = {
  STUDENT: {
    id: 'user-student-01',
    email: 'student@caspaschool.org',
    username: 'elena.vance',
    fullName: 'Elena Vance',
    roleType: 'STUDENT',
    designation: 'Grade 9 • Roll No. 14',
    campusId: 'campus-central',
    campusName: 'CASPA Central Campus (Main)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    permissions: [
      { id: 'ps1', module: 'ACADEMICS', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: false, scope: 'OWN' },
      { id: 'ps2', module: 'TIMETABLE', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: false, scope: 'OWN' },
      { id: 'ps3', module: 'TASKS', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: false, scope: 'OWN' },
      { id: 'ps4', module: 'STUDY_MATERIAL', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: true, scope: 'OWN' },
      { id: 'ps5', module: 'ACHIEVEMENTS', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: true, scope: 'OWN' },
      { id: 'ps6', module: 'ATTENDANCE', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false, canExport: true, scope: 'OWN' },
      { id: 'ps7', module: 'SAFETY', canView: false, canCreate: true, canEdit: false, canDelete: false, canApprove: false, canExport: false, scope: 'OWN' },
    ],
  },
  TEACHER: {
    id: 'user-teacher-01',
    email: 'teacher@caspaschool.org',
    username: 'mrs.oswald',
    fullName: 'Mrs. Oswald',
    roleType: 'TEACHER',
    designation: 'Department of Mathematics',
    campusId: 'campus-central',
    campusName: 'CASPA Central Campus (Main)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    permissions: [
      { id: 'pt1', module: 'DASHBOARD', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: false, scope: 'CLASS_SECTION' },
      { id: 'pt2', module: 'ACADEMICS', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: true, scope: 'CLASS_SECTION' },
      { id: 'pt3', module: 'ATTENDANCE', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: true, scope: 'CLASS_SECTION' },
      { id: 'pt4', module: 'TASKS', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: false, canExport: true, scope: 'CLASS_SECTION' },
      { id: 'pt5', module: 'GRADING', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true, scope: 'CLASS_SECTION' },
      { id: 'pt6', module: 'PARENT_COMMUNICATION', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: false, scope: 'CLASS_SECTION' },
    ],
  },
  ADMIN: {
    id: 'user-admin-01',
    email: 'admin@caspaschool.org',
    username: 'arthur.clark',
    fullName: 'Arthur Clark',
    roleType: 'ADMIN',
    designation: 'School Administrator & Operations Director',
    campusId: 'campus-central',
    campusName: 'CASPA Central Campus (Main)',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    permissions: [
      { id: 'pa1', module: 'DASHBOARD', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'pa2', module: 'STUDENTS', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'pa3', module: 'STAFF', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'pa4', module: 'ACADEMICS', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'pa5', module: 'FINANCE', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'pa6', module: 'SAFETY', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'pa7', module: 'TRANSPORT', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'pa8', module: 'RBAC', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'pa9', module: 'SETTINGS', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
    ],
  },
  PRINCIPAL: {
    id: 'user-principal-01',
    email: 'principal@caspaschool.org',
    username: 'dr.mehta',
    fullName: 'Dr. Mehta',
    roleType: 'PRINCIPAL',
    designation: 'Principal & Executive Head',
    campusId: 'campus-central',
    campusName: 'CASPA Central Campus (Main)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    permissions: [
      { id: 'p1', module: 'DASHBOARD', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'p2', module: 'ACADEMICS', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'p3', module: 'STAFF', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'p4', module: 'FINANCE', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'p5', module: 'SAFETY', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'p6', module: 'OPERATIONS', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'p7', module: 'APPROVALS', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
    ],
  },
  VICE_PRINCIPAL: {
    id: 'user-vp-01',
    email: 's.jenkins@caspa.edu',
    username: 'dr.sarah.jenkins',
    fullName: 'Dr. Sarah Jenkins',
    roleType: 'VICE_PRINCIPAL',
    designation: 'Vice Principal • Academic Head',
    campusId: 'campus-central',
    campusName: 'St. Jude Collegiate (Main Campus)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    permissions: [
      { id: 'vp1', module: 'DASHBOARD', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'vp2', module: 'ACADEMICS', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'vp3', module: 'TEACHERS', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'vp4', module: 'TIMETABLE', canView: true, canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'vp5', module: 'LESSON_PLANS', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'vp6', module: 'EXAMINATIONS', canView: true, canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true, scope: 'SCHOOL' },
      { id: 'vp7', module: 'REPORTS', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false, canExport: true, scope: 'SCHOOL' },
    ],
  },
  PARENT: {
    id: 'user-parent-01',
    email: 'anita.sharma@caspaschool.org',
    username: 'anita.sharma',
    fullName: 'Mrs. Anita Sharma',
    roleType: 'PARENT',
    designation: 'Parent of Aarav (10-B) & Ananya (7-A)',
    campusId: 'campus-central',
    campusName: 'CASPA Central Campus (Main)',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    permissions: [
      { id: 'pp1', module: 'STUDENT_RECORD', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: true, scope: 'OWN' },
      { id: 'pp2', module: 'FEES', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: true, canExport: true, scope: 'OWN' },
      { id: 'pp3', module: 'ATTENDANCE', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false, canExport: true, scope: 'OWN' },
      { id: 'pp4', module: 'NOTICES', canView: true, canCreate: false, canEdit: true, canDelete: false, canApprove: true, canExport: true, scope: 'OWN' },
      { id: 'pp5', module: 'TRANSPORT', canView: true, canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: false, scope: 'OWN' },
      { id: 'pp6', module: 'CERTIFICATES', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false, canExport: true, scope: 'OWN' },
      { id: 'pp7', module: 'MESSAGES', canView: true, canCreate: true, canEdit: false, canDelete: false, canApprove: false, canExport: false, scope: 'OWN' },
    ],
  },
};


// ================= STUDENT SPECIFIC SEEDS (Images 2-8) =================

export const INITIAL_STUDENT_PERIODS: StudentPeriod[] = [
  {
    id: 'sp-1',
    periodNumber: 1,
    timeRange: '08:30 - 09:20 AM',
    subject: 'Calculus II',
    teacher: 'Mrs. Debora',
    room: 'Room 102',
    status: 'COMPLETED',
  },
  {
    id: 'sp-2',
    periodNumber: 2,
    timeRange: '09:25 - 10:15 AM',
    subject: 'English Literature',
    teacher: 'Mr. Marcus Vance',
    room: 'Room 204',
    status: 'COMPLETED',
  },
  {
    id: 'sp-3',
    periodNumber: 3,
    timeRange: '10:15 AM - 11:05 AM',
    subject: 'Advanced Physics (AP)',
    unitTopic: 'Unit 4: Thermodynamics & Carnot Engines',
    teacher: 'Dr. Alistair Ross',
    room: 'Lab 204 • North Wing',
    status: 'LIVE_NOW',
    notesUrl: '#',
    manualUrl: '#',
  },
  {
    id: 'sp-4',
    periodNumber: 4,
    timeRange: '11:15 - 12:05 PM',
    subject: 'Chemistry Honors',
    teacher: 'Dr. V. Ramanathan',
    room: 'Chem Lab B',
    status: 'UPCOMING',
  },
  {
    id: 'sp-5',
    periodNumber: 5,
    timeRange: '01:00 - 01:50 PM',
    subject: 'Physical Education & Health',
    teacher: 'Coach David',
    room: 'Gymnasium & Field',
    status: 'UPCOMING',
  },
  {
    id: 'sp-6',
    periodNumber: 6,
    timeRange: '01:55 - 02:45 PM',
    subject: 'English Literature AP',
    teacher: 'Dr. Katherine Wells',
    room: 'Library Annex 4',
    status: 'UPCOMING',
  },
  {
    id: 'sp-after',
    periodNumber: 7,
    timeRange: '03:15 - 04:30 PM',
    subject: 'After-School Robotics Club',
    teacher: 'Mr. Anand Sharma',
    room: 'Makerspace Hall',
    status: 'UPCOMING',
    isAfterSchool: true,
  },
];

export const INITIAL_STUDENT_TASKS: StudentTaskItem[] = [
  {
    id: 'st-1',
    subject: 'PHYSICS • UNIT 4',
    unit: 'Unit 4',
    title: 'Thermodynamics Problem Set #4',
    description: 'Problems 14–28 on page 142. Include heat flow equations and vector diagrams.',
    dueDate: 'Due Today, 5:00 PM',
    isDueToday: true,
    status: 'PENDING',
    completedQuestions: 6,
    totalQuestions: 8,
  },
  {
    id: 'st-2',
    subject: 'CALCULUS BC',
    unit: 'Unit 7',
    title: 'Integration by Parts Worksheet',
    description: 'Period 2 • Mr. Vance. Complete problems 1-12 with all steps written clearly.',
    dueDate: 'Tomorrow, 8:30 AM',
    status: 'PENDING',
    resourceFileName: 'Thomas Calculus Sec 7.1.pdf',
    resourceFileSize: '1.4 MB',
  },
  {
    id: 'st-3',
    subject: 'WORLD HISTORY',
    unit: 'Modern History',
    title: 'French Revolution Essay Draft',
    description: 'Period 5 • Room 304. Late submission open (-5% penalty per day).',
    dueDate: 'Due Yesterday, 11:59 PM',
    isOverdue: true,
    status: 'OVERDUE',
  },
  {
    id: 'st-4',
    subject: 'ENGLISH LITERATURE',
    unit: 'Drama & Theater',
    title: 'Hamlet Character Analysis Paper',
    description: 'Final submission evaluated for textual citations, soliloquy breakdown, and thesis defense.',
    dueDate: 'Submitted • Nov 12',
    status: 'GRADED',
    score: 98,
    gradeBadge: 'Grade A+',
    feedbackText: 'Exceptional defense of Hamlet’s tragic flaw and textual alignment in Act III.',
  },
];

export const INITIAL_STUDY_MATERIALS: StudyMaterialItem[] = [
  {
    id: 'sm-1',
    title: 'Newton\'s Laws Summary',
    subject: 'Science',
    format: 'PDF',
    teacher: 'Dr. Ross',
    fileSizeOrDuration: '2.4 MB',
    uploadedDate: 'Today',
    isNew: true,
  },
  {
    id: 'sm-2',
    title: 'Organic Chem Lab Video',
    subject: 'Science',
    format: 'MP4',
    teacher: 'Dr. Ross',
    fileSizeOrDuration: '14:20',
    uploadedDate: 'Today',
    isNew: true,
  },
  {
    id: 'sm-3',
    title: 'Calculus Formula Sheet',
    subject: 'Mathematics',
    format: 'PDF',
    teacher: 'Mrs. Debora',
    fileSizeOrDuration: '1.1 MB',
    uploadedDate: 'Today',
    isNew: true,
  },
  {
    id: 'sm-4',
    title: 'Chapter 5: Quadratic Equations & Formula',
    subject: 'Mathematics',
    format: 'PDF',
    teacher: 'Mrs. Deborah Hayes',
    fileSizeOrDuration: '3.2 MB',
    uploadedDate: 'Sep 3, 2026',
  },
  {
    id: 'sm-5',
    title: 'Thermodynamics: Heat Engines & Carnot',
    subject: 'Science',
    format: 'MP4',
    teacher: 'Dr. Alistair Ross',
    fileSizeOrDuration: '19:45',
    uploadedDate: 'Sep 2, 2026',
  },
  {
    id: 'sm-6',
    title: 'French Revolution Key Battles & Timeline',
    subject: 'Social',
    format: 'PDF',
    teacher: 'Mr. Marcus Vance',
    fileSizeOrDuration: '4.8 MB',
    uploadedDate: 'Aug 28, 2026',
  },
  {
    id: 'sm-7',
    title: 'MIT OpenCourseWare: Classical Mechanics',
    subject: 'Science',
    format: 'LINK',
    teacher: 'Physics AP External Resource',
    fileSizeOrDuration: 'External Web Link',
    uploadedDate: 'Sep 1, 2026',
    isExternalLink: true,
  },
  {
    id: 'sm-8',
    title: 'Hamlet Soliloquy Breakdown & Line-by-Line',
    subject: 'English',
    format: 'DOCX',
    teacher: 'Dr. Katherine Wells',
    fileSizeOrDuration: '1.8 MB',
    uploadedDate: 'Aug 25, 2026',
  },
];

export const INITIAL_STUDENT_ACHIEVEMENTS: StudentAchievement[] = [
  {
    id: 'ach-1',
    title: 'National Debate Champion',
    subtitle: 'Inter-School Championship, Aug 2025',
    category: 'Academic',
    ranking: '1st Place National • 500+ Competitors',
    isFeatured: true,
    awardYear: '2025-2026',
  },
  {
    id: 'ach-2',
    title: 'Science Fair Gold Medal',
    subtitle: 'Regional Science Olympiad',
    category: 'Academic',
    ranking: '1st Place',
    awardYear: '2025-2026',
  },
  {
    id: 'ach-3',
    title: 'Varsity Track & Field MVP',
    subtitle: 'State 800m Relay Finals',
    category: 'Sports',
    ranking: 'Winner',
    awardYear: '2025-2026',
  },
  {
    id: 'ach-4',
    title: 'Honor Roll - Distinction',
    subtitle: 'Term 1 Cumulative 3.9 GPA',
    category: 'Academic',
    ranking: 'Distinction',
    awardYear: '2025-2026',
  },
  {
    id: 'ach-5',
    title: 'Orchestra Soloist',
    subtitle: 'Annual Arts Festival, Mar 2025',
    category: 'Cultural',
    ranking: 'Finalist',
    awardYear: '2025-2026',
  },
  {
    id: 'ach-6',
    title: 'Robotics Hackathon 2nd',
    subtitle: 'Inter-District STEM Challenge',
    category: 'Clubs',
    ranking: '2nd Place',
    awardYear: '2024-2025',
  },
  {
    id: 'ach-7',
    title: 'JV Badminton Honors',
    subtitle: 'District Tournament, Nov 2024',
    category: 'Sports',
    ranking: 'Champion',
    awardYear: '2024-2025',
  },
];

// September 2026 Calendar Heatmap Data (Image 8)
export const INITIAL_ATTENDANCE_HEATMAP: AttendanceDayRecord[] = [
  { dayNumber: 1, status: 'PRESENT' },
  { dayNumber: 2, status: 'PRESENT' },
  { dayNumber: 3, status: 'PRESENT' },
  { dayNumber: 4, status: 'PRESENT' },
  { dayNumber: 5, status: 'WEEKEND' },
  { dayNumber: 6, status: 'WEEKEND' },
  { dayNumber: 7, status: 'WEEKEND' },
  { dayNumber: 8, status: 'LATE' }, // Purple
  { dayNumber: 9, status: 'PRESENT' },
  { dayNumber: 10, status: 'PRESENT' },
  { dayNumber: 11, status: 'PRESENT' },
  { dayNumber: 12, status: 'WEEKEND' },
  { dayNumber: 13, status: 'WEEKEND' },
  { dayNumber: 14, status: 'ABSENT', hasIncident: true }, // Red
  { dayNumber: 15, status: 'PRESENT' },
  { dayNumber: 16, status: 'PRESENT' },
  { dayNumber: 17, status: 'PRESENT' },
  { dayNumber: 18, status: 'PRESENT' },
  { dayNumber: 19, status: 'WEEKEND' },
  { dayNumber: 20, status: 'WEEKEND' },
  { dayNumber: 21, status: 'PRESENT' },
  { dayNumber: 22, status: 'LATE' }, // Purple
  { dayNumber: 23, status: 'PRESENT' },
  { dayNumber: 24, status: 'PRESENT' },
  { dayNumber: 25, status: 'PRESENT' },
  { dayNumber: 26, status: 'WEEKEND' },
  { dayNumber: 27, status: 'WEEKEND' },
  { dayNumber: 28, status: 'PRESENT' },
  { dayNumber: 29, status: 'PRESENT' },
  { dayNumber: 30, status: 'PRESENT' },
];

// Teacher Assigned Classes
export const INITIAL_TEACHER_CLASSES: TeacherClass[] = [
  {
    id: 'cls-9b',
    subject: 'Mathematics',
    grade: 'Grade 9B',
    section: '9B',
    period: 1,
    periodLabel: 'Period 1',
    track: 'Standard Core Curriculum',
    timeRange: '9:00 - 9:45 AM',
    room: 'Room 204',
    studentCount: 32,
    topic: 'Quadratic Equation Factorization Ch. 4.2',
    isNext: true,
    status: 'IN_PROGRESS',
  },
  {
    id: 'cls-10a',
    subject: 'Algebra II Honors',
    grade: 'Grade 10A',
    section: '10A',
    period: 2,
    periodLabel: 'Period 2',
    track: 'Advanced Placement Track',
    timeRange: '10:00 - 10:45 AM',
    room: 'Room 204',
    studentCount: 28,
    status: 'UPCOMING',
  },
  {
    id: 'cls-11ap',
    subject: 'AP Calculus AB',
    grade: 'Grade 11',
    section: '11',
    period: 4,
    periodLabel: 'Period 4',
    track: 'Differential & Integral',
    timeRange: '11:15 - 12:00 PM',
    room: 'Room 208',
    studentCount: 24,
    status: 'UPCOMING',
  },
  {
    id: 'cls-9rem',
    subject: 'Remedial Math Lab',
    grade: 'Grade 9',
    section: '9-Rem',
    period: 6,
    periodLabel: 'Period 6',
    track: 'Targeted Skill Reinforcement',
    timeRange: '01:30 - 02:15 PM',
    room: 'Math Lab 1',
    studentCount: 16,
    status: 'UPCOMING',
  },
];

export const INITIAL_TEACHER_STUDENTS: TeacherStudent[] = [
  {
    id: 'ts-1',
    rollNo: 1,
    fullName: 'Aria Montgomery',
    grade: 'Grade 9B',
    section: '9B',
    attendanceStatus: 'LATE',
    unitTestScore: 98,
    maxScore: 100,
    avatarInitials: 'AM',
    parentName: 'Mrs. Ella Montgomery',
    parentPhone: '+1 (555) 392-1084',
  },
  {
    id: 'ts-2',
    rollNo: 3,
    fullName: 'Marcus Brody',
    grade: 'Grade 9B',
    section: '9B',
    attendanceStatus: 'ABSENT',
    unitTestScore: null,
    maxScore: 100,
    instructorNote: 'Struggled with quadratic factorization in section B. Needs remedial session on Thursday.',
    hasNote: true,
    alertType: 'MISSED_HW',
    alertDetail: 'Missed HW (x2)',
    avatarInitials: 'MB',
    parentName: 'Mr. David Brody',
    parentPhone: '+1 (555) 849-2041',
  },
  {
    id: 'ts-3',
    rollNo: 4,
    fullName: 'Chloe Adams',
    grade: 'Grade 9B',
    section: '9B',
    attendanceStatus: 'PRESENT',
    unitTestScore: 85,
    maxScore: 100,
    avatarInitials: 'CA',
    parentName: 'Mr. Arthur Adams',
    parentPhone: '+1 (555) 203-9912',
  },
  {
    id: 'ts-4',
    rollNo: 8,
    fullName: 'Devon Patel',
    grade: 'Grade 9B',
    section: '9B',
    attendanceStatus: 'PRESENT',
    unitTestScore: 78,
    maxScore: 100,
    alertType: 'MISSED_QUIZ',
    alertDetail: 'Missed Quiz',
    avatarInitials: 'DP',
    parentName: 'Mr. Rajesh Patel',
    parentPhone: '+1 (555) 771-3048',
  },
  {
    id: 'ts-5',
    rollNo: 14,
    fullName: 'Elena Vance',
    grade: 'Grade 9B',
    section: '9B',
    attendanceStatus: 'PRESENT',
    unitTestScore: 92,
    maxScore: 100,
    avatarInitials: 'EV',
    parentName: 'Mrs. Sarah Vance',
    parentPhone: '+1 (555) 489-1120',
  },
  {
    id: 'ts-6',
    rollNo: 19,
    fullName: 'Liam Hemsworth',
    grade: 'Grade 9B',
    section: '9B',
    attendanceStatus: 'PRESENT',
    unitTestScore: 64,
    maxScore: 100,
    avatarInitials: 'LH',
    parentName: 'Mr. Luke Hemsworth',
    parentPhone: '+1 (555) 670-3849',
  },
  {
    id: 'ts-7',
    rollNo: 27,
    fullName: 'Sophia Chen',
    grade: 'Grade 9B',
    section: '9B',
    attendanceStatus: 'PRESENT',
    unitTestScore: null,
    maxScore: 100,
    alertType: 'LOW_ATTENDANCE',
    alertDetail: 'Attendance (68%)',
    avatarInitials: 'SC',
    parentName: 'Dr. Katherine Chen',
    parentPhone: '+1 (555) 902-4412',
  },
];

export const INITIAL_TEACHER_TASKS: TeacherTask[] = [
  {
    id: 'task-1',
    title: 'Quadratic Equations Practice Sheet',
    type: 'HOMEWORK',
    gradeSection: 'Grade 9B',
    dueDate: 'Due Sep 25, 2026',
    submittedCount: 24,
    totalCount: 32,
    status: 'PUBLISHED',
  },
  {
    id: 'task-2',
    title: 'Polynomial Functions Worksheet',
    type: 'HOMEWORK',
    gradeSection: 'Grade 10A',
    dueDate: 'Due Yesterday, 11:59 PM',
    submittedCount: 28,
    totalCount: 30,
    status: 'OVERDUE',
    lateCount: 2,
  },
  {
    id: 'task-3',
    title: 'Derivatives Applications Quiz Prep',
    type: 'ASSIGNMENT',
    gradeSection: 'Grade 11 AP Calculus',
    dueDate: 'Drafted Today',
    submittedCount: 0,
    totalCount: 24,
    status: 'DRAFT',
  },
  {
    id: 'task-4',
    title: 'Mid-Term Algebra Performance',
    type: 'ASSIGNMENT',
    gradeSection: 'Grade 9B',
    dueDate: 'Due Oct 2, 2026',
    submittedCount: 12,
    totalCount: 32,
    status: 'PUBLISHED',
  },
];

export const INITIAL_PARENT_MESSAGES: ParentMessage[] = [
  {
    id: 'msg-1',
    parentName: 'Mr. David Brody',
    parentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    studentName: 'Marcus Brody',
    gradeSection: 'Grade 9B',
    timeString: '10:42 AM',
    snippet: 'Thank you Mrs. Oswald, we will make sure Marcus attends Thursday’s remedial session.',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: 'msg-2',
    parentName: 'Dr. Katherine Chen',
    parentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    studentName: 'Sophia Chen',
    gradeSection: 'Grade 9B',
    timeString: 'Yesterday',
    snippet: 'Sophia was unwell with fever earlier this week. Doctor note attached.',
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: 'msg-3',
    parentName: 'Mrs. Sarah Vance',
    parentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    studentName: 'Elena Vance',
    gradeSection: 'Grade 9B',
    timeString: 'Sep 21',
    snippet: 'Elena really enjoyed the debate competition and says your math coaching helped!',
    isRead: true,
    isOnline: false,
  },
  {
    id: 'msg-4',
    parentName: 'Mr. Rajesh Patel',
    parentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    studentName: 'Devon Patel',
    gradeSection: 'Grade 10A',
    timeString: 'Sep 19',
    snippet: 'Acknowledged regarding the quiz re-test schedule. Devon is preparing thoroughly.',
    isRead: true,
    isOnline: false,
  },
];

// ================= ADMIN & ENTERPRISE SPECIFIC SEEDS =================

export const INITIAL_ADMIN_STUDENTS: Student[] = [
  {
    id: 'std-001',
    admissionNo: 'CASPA-2026-0891',
    fullName: 'Elena Vance',
    grade: 'Grade 9',
    section: '9B',
    rollNo: 14,
    gender: 'FEMALE',
    parentName: 'Mrs. Sarah Vance',
    parentPhone: '+1 (555) 489-1120',
    parentEmail: 'sarah.vance@parent.caspa.org',
    attendancePercentage: 96.2,
    feeOutstanding: 0,
    busRoute: 'Route 12',
    status: 'ACTIVE',
  },
  {
    id: 'std-002',
    admissionNo: 'CASPA-2026-0412',
    fullName: 'Marcus Brody',
    grade: 'Grade 9',
    section: '9B',
    rollNo: 3,
    gender: 'MALE',
    parentName: 'Mr. David Brody',
    parentPhone: '+1 (555) 849-2041',
    parentEmail: 'david.brody@parent.caspa.org',
    attendancePercentage: 74.5,
    feeOutstanding: 650,
    busRoute: 'Route 04',
    status: 'ACTIVE',
  },
  {
    id: 'std-003',
    admissionNo: 'CASPA-2026-0118',
    fullName: 'Sophia Chen',
    grade: 'Grade 9',
    section: '9B',
    rollNo: 27,
    gender: 'FEMALE',
    parentName: 'Dr. Katherine Chen',
    parentPhone: '+1 (555) 902-4412',
    parentEmail: 'kchen@generalhospital.org',
    attendancePercentage: 68.0,
    feeOutstanding: 0,
    busRoute: 'Route 12',
    status: 'ACTIVE',
  },
  {
    id: 'std-004',
    admissionNo: 'CASPA-2026-0774',
    fullName: 'Devon Patel',
    grade: 'Grade 10',
    section: '10A',
    rollNo: 8,
    gender: 'MALE',
    parentName: 'Mr. Rajesh Patel',
    parentPhone: '+1 (555) 771-3048',
    parentEmail: 'r.patel@techcorp.io',
    attendancePercentage: 91.8,
    feeOutstanding: 1200,
    busRoute: 'Route 08',
    status: 'ACTIVE',
  },
  {
    id: 'std-005',
    admissionNo: 'CASPA-2026-0923',
    fullName: 'Aria Montgomery',
    grade: 'Grade 9',
    section: '9B',
    rollNo: 1,
    gender: 'FEMALE',
    parentName: 'Mrs. Ella Montgomery',
    parentPhone: '+1 (555) 392-1084',
    parentEmail: 'ella.m@designstudio.com',
    attendancePercentage: 98.4,
    feeOutstanding: 0,
    busRoute: 'Route 12',
    status: 'ACTIVE',
  },
  {
    id: 'std-006',
    admissionNo: 'CASPA-2026-0331',
    fullName: 'Chloe Adams',
    grade: 'Grade 9',
    section: '9B',
    rollNo: 4,
    gender: 'FEMALE',
    parentName: 'Mr. Arthur Adams',
    parentPhone: '+1 (555) 203-9912',
    parentEmail: 'arthur.adams@legal.org',
    attendancePercentage: 94.6,
    feeOutstanding: 0,
    busRoute: 'Route 02',
    status: 'ACTIVE',
  },
  {
    id: 'std-007',
    admissionNo: 'CASPA-2026-0655',
    fullName: 'Liam Hemsworth',
    grade: 'Grade 9',
    section: '9B',
    rollNo: 19,
    gender: 'MALE',
    parentName: 'Mr. Luke Hemsworth',
    parentPhone: '+1 (555) 670-3849',
    parentEmail: 'luke.hemsworth@estate.com',
    attendancePercentage: 88.0,
    feeOutstanding: 850,
    busRoute: 'Route 09',
    status: 'ACTIVE',
  },
  {
    id: 'std-008',
    admissionNo: 'CASPA-2026-0542',
    fullName: 'Zoe Saldana',
    grade: 'Grade 10',
    section: '10A',
    rollNo: 12,
    gender: 'FEMALE',
    parentName: 'Mrs. Marco Saldana',
    parentPhone: '+1 (555) 341-9988',
    parentEmail: 'marco.s@biolab.com',
    attendancePercentage: 97.1,
    feeOutstanding: 0,
    busRoute: 'Route 04',
    status: 'ACTIVE',
  },
  {
    id: 'std-009',
    admissionNo: 'CASPA-2026-0219',
    fullName: 'Julian Thorne',
    grade: 'Grade 11',
    section: '11 AP',
    rollNo: 5,
    gender: 'MALE',
    parentName: 'Dr. Gregory Thorne',
    parentPhone: '+1 (555) 882-7102',
    parentEmail: 'gthorne@university.edu',
    attendancePercentage: 99.0,
    feeOutstanding: 0,
    status: 'ACTIVE',
  },
  {
    id: 'std-010',
    admissionNo: 'CASPA-2026-0155',
    fullName: 'Maya Lin',
    grade: 'Grade 12',
    section: '12A',
    rollNo: 2,
    gender: 'FEMALE',
    parentName: 'Mr. Kenzo Lin',
    parentPhone: '+1 (555) 541-6677',
    parentEmail: 'kenzo.lin@archfirm.com',
    attendancePercentage: 95.8,
    feeOutstanding: 0,
    status: 'ACTIVE',
  },
  {
    id: 'std-011',
    admissionNo: 'CASPA-2026-0988',
    fullName: 'Tariq Al-Mansoor',
    grade: 'Grade 8',
    section: '8B',
    rollNo: 22,
    gender: 'MALE',
    parentName: 'Mrs. Fatima Al-Mansoor',
    parentPhone: '+1 (555) 912-4433',
    parentEmail: 'fatima.m@globaltrade.ae',
    attendancePercentage: 93.4,
    feeOutstanding: 450,
    busRoute: 'Route 07',
    status: 'ACTIVE',
  },
  {
    id: 'std-012',
    admissionNo: 'CASPA-2026-0803',
    fullName: 'Ananya Sharma',
    grade: 'Grade 10',
    section: '10B',
    rollNo: 15,
    gender: 'FEMALE',
    parentName: 'Mr. Ramesh Sharma',
    parentPhone: '+1 (555) 234-8899',
    parentEmail: 'ramesh.sharma@consulting.com',
    attendancePercentage: 96.7,
    feeOutstanding: 0,
    busRoute: 'Route 12',
    status: 'ACTIVE',
  },
];

export const INITIAL_STAFF_MEMBERS: AdminStaffMember[] = [
  {
    id: 'stf-1',
    employeeId: 'EMP-MATH-01',
    fullName: 'Mrs. Eleanor Oswald',
    designation: 'Head of Mathematics & Grade 9B Class Tutor',
    department: 'Mathematics',
    email: 'eleanor.oswald@caspaschool.org',
    phone: '+1 (555) 432-8811',
    workloadPeriods: 24,
    classesAssigned: ['Grade 9B Algebra II', 'Grade 10A Geometry', 'Grade 11 AP Pre-Calculus', 'Grade 9B Remedial Lab'],
    qualification: 'M.Sc. Pure Mathematics (Stanford), B.Ed. Distinction',
    joinDate: 'Aug 2018',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    roomLocation: 'Class Room 204',
    liveStatusText: 'Present / In Class Room 204',
    evaluationScore: 4.8,
    percentileRank: '98th Pctl',
    badge: 'Top Rated',
    attendanceRatePercent: 98.4,
    leaveBalances: {
      casualRemaining: 5,
      casualTotal: 8,
      medicalRemaining: 7,
      medicalTotal: 10,
      dutyRemaining: 3,
    },
    todaySchedule: [
      { period: 'Period 1 (08:30 - 09:15)', time: '08:30 AM', classSection: 'Grade 9B Algebra II', room: 'Class Room 204', status: 'COMPLETED' },
      { period: 'Period 2 (09:20 - 10:05)', time: '09:20 AM', classSection: 'Grade 10A Honors Geometry', room: 'Class Room 204', status: 'IN_SESSION' },
      { period: 'Period 3 (10:10 - 10:55)', time: '10:10 AM', classSection: 'Planning & Remedial Prep', room: 'Faculty Lounge B', status: 'UPCOMING' },
      { period: 'Period 4 (11:00 - 11:45)', time: '11:00 AM', classSection: 'Grade 11 AP Calculus', room: 'Room 302', status: 'UPCOMING' },
      { period: 'Period 6 (01:15 - 02:00)', time: '01:15 PM', classSection: 'Grade 9 Remedial Clinic', room: 'Class Room 204', status: 'UPCOMING' },
    ],
    observationNotes: [
      {
        id: 'obs-1',
        author: 'Dr. Mehta (Principal)',
        date: 'Sep 18, 2026',
        cycle: 'Term 1 Observational Review',
        rating: 4.9,
        notes: 'Outstanding pedagogy during polynomial factoring modules. Engaged students with interactive whiteboard proofs; remedial intervention scaffolding for Section 9B is exemplary.',
        commendation: 'Exemplary Diagnostic Scaffolding',
      },
      {
        id: 'obs-2',
        author: 'Vice Principal Stern',
        date: 'May 12, 2026',
        cycle: 'Annual Faculty Audit',
        rating: 4.8,
        notes: 'Punctual curriculum pacing. Maintained 96% board examination pass velocity with zero parent escalations.',
      },
    ],
    ferpaCompliance: {
      salaryGrade: 'Grade IV Senior Master Faculty',
      monthlyDisbursement: '₹1,25,000 / month (Automated Mandate)',
      backgroundCheckStatus: 'Verified (State Board Clearance #SB-9921)',
      lastAuditTimestamp: 'Aug 15, 2026',
      emergencyContact: 'Mr. David Oswald (+1 555-901-2244)',
    },
  },
  {
    id: 'stf-2',
    employeeId: 'EMP-ENG-03',
    fullName: 'Mr. Charles Davis',
    designation: 'Senior Faculty - English Literature & Grade 10 Tutor',
    department: 'Language',
    email: 'charles.davis@caspaschool.org',
    phone: '+1 (555) 472-1199',
    workloadPeriods: 22,
    classesAssigned: ['Grade 10 English Literature', 'Grade 11 AP English Language', 'Grade 9 World Lit'],
    qualification: 'M.A. English Literature (Columbia), B.Ed.',
    joinDate: 'Jan 2019',
    status: 'ON_LEAVE',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    roomLocation: 'Class Room 102',
    liveStatusText: 'On Leave (Sep 24–25)',
    evaluationScore: 4.7,
    percentileRank: '96th Pctl',
    badge: 'Faculty Mentor',
    attendanceRatePercent: 94.2,
    leaveBalances: {
      casualRemaining: 2,
      casualTotal: 8,
      medicalRemaining: 8,
      medicalTotal: 10,
      dutyRemaining: 4,
    },
    todaySchedule: [
      { period: 'Period 2 (09:20 - 10:05)', time: '09:20 AM', classSection: 'Grade 10 Lit (Substitute: Mrs. Higgins)', room: 'Class Room 102', status: 'IN_SESSION' },
      { period: 'Period 4 (11:00 - 11:45)', time: '11:00 AM', classSection: 'Grade 11 AP Lang (Substitute: Mrs. Higgins)', room: 'Class Room 102', status: 'UPCOMING' },
    ],
    observationNotes: [
      {
        id: 'obs-d1',
        author: 'Dr. Mehta (Principal)',
        date: 'Sep 10, 2026',
        cycle: 'Term 1 Observational Review',
        rating: 4.7,
        notes: 'Dynamic literature seminar discussions on post-colonial texts. Encouraged analytical essays with high rubric compliance.',
      },
    ],
    ferpaCompliance: {
      salaryGrade: 'Grade III Faculty Lead',
      monthlyDisbursement: '₹1,15,000 / month (Automated Mandate)',
      backgroundCheckStatus: 'Verified (Clearance #SB-8841)',
      lastAuditTimestamp: 'Aug 12, 2026',
      emergencyContact: 'Mrs. Claire Davis (+1 555-883-9900)',
    },
  },
  {
    id: 'stf-3',
    employeeId: 'EMP-SCI-05',
    fullName: 'Ms. Rachel Higgins',
    designation: 'Physics Faculty & AP Laboratory Director',
    department: 'Science',
    email: 'rachel.higgins@caspaschool.org',
    phone: '+1 (555) 544-0012',
    workloadPeriods: 20,
    classesAssigned: ['Grade 11 AP Physics', 'Grade 12 Advanced Mechanics', 'Grade 9 Science Lab'],
    qualification: 'M.Sc. Experimental Physics (Caltech), B.Ed.',
    joinDate: 'Oct 2020',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    roomLocation: 'Physics Lab 02',
    liveStatusText: 'Present (Prep Period)',
    evaluationScore: 4.6,
    percentileRank: '95th Pctl',
    badge: 'Lab Safety Lead',
    attendanceRatePercent: 96.8,
    leaveBalances: {
      casualRemaining: 6,
      casualTotal: 8,
      medicalRemaining: 6,
      medicalTotal: 10,
      dutyRemaining: 2,
    },
    todaySchedule: [
      { period: 'Period 1 (08:30 - 09:15)', time: '08:30 AM', classSection: 'AP Physics Practical Mock', room: 'Physics Lab 02', status: 'COMPLETED' },
      { period: 'Period 3 (10:10 - 10:55)', time: '10:10 AM', classSection: 'Laser Optics Calibration', room: 'Lab Darkroom', status: 'UPCOMING' },
    ],
    observationNotes: [
      {
        id: 'obs-h1',
        author: 'Dr. Mehta (Principal)',
        date: 'Aug 29, 2026',
        cycle: 'Term 1 Lab Safety Inspection',
        rating: 4.8,
        notes: 'Strict compliance with hazardous equipment safety protocols. Successfully authored new AP Optics syllabus modules.',
      },
    ],
    ferpaCompliance: {
      salaryGrade: 'Grade III Faculty Specialist',
      monthlyDisbursement: '₹1,18,000 / month (Automated Mandate)',
      backgroundCheckStatus: 'Verified (Clearance #SB-9102)',
      lastAuditTimestamp: 'Aug 20, 2026',
      emergencyContact: 'Mr. Tyler Higgins (+1 555-776-2211)',
    },
  },
  {
    id: 'stf-4',
    employeeId: 'EMP-SEC-01',
    fullName: 'Officer Davis',
    designation: 'Campus Safety & Transport Lead',
    department: 'Transport',
    email: 'security.davis@caspaschool.org',
    phone: '+1 (555) 500-6644',
    workloadPeriods: 0,
    classesAssigned: ['Perimeter Security', 'Bus Fleet Dispatch', 'Anti-Ragging Squad'],
    qualification: 'Certified Protection Officer (CPO), Ex-Emergency Services',
    joinDate: 'Mar 2016',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    roomLocation: 'Security Gate 03',
    liveStatusText: 'Present / Perimeter Check',
    evaluationScore: 4.9,
    percentileRank: '99th Pctl',
    badge: 'Security Lead',
    attendanceRatePercent: 99.2,
    todaySchedule: [
      { period: 'Morning Transit (07:00 - 08:30)', time: '07:00 AM', classSection: 'Fleet Intake & Breathalyzer Signoff', room: 'Security Gate 01', status: 'COMPLETED' },
      { period: 'Midday Perimeter (11:30 - 01:00)', time: '11:30 AM', classSection: 'Boundary Sensor & Biometric Audit', room: 'North Gate 03', status: 'IN_SESSION' },
      { period: 'Evening Transit (03:30 - 05:00)', time: '03:30 PM', classSection: 'Boarding Dispatch & Route Telemetry', room: 'Bus Depot Bay', status: 'UPCOMING' },
    ],
    observationNotes: [
      {
        id: 'obs-sec-1',
        author: 'Dr. Mehta (Principal)',
        date: 'Sep 15, 2026',
        cycle: 'Safeguarding Audit Review',
        rating: 5.0,
        notes: 'Rapid 4-minute incident triage during playground altercation. Maintained rigorous GPS dispatch standards.',
      },
    ],
    ferpaCompliance: {
      salaryGrade: 'Grade II Security Director',
      monthlyDisbursement: '₹88,000 / month (Automated Mandate)',
      backgroundCheckStatus: 'Certified Homeland Security Cleared',
      lastAuditTimestamp: 'Jul 30, 2026',
      emergencyContact: 'HQ Operations Dispatch (+1 555-500-0000)',
    },
  },
  {
    id: 'stf-5',
    employeeId: 'EMP-MED-01',
    fullName: 'Dr. Robert Vance',
    designation: 'Campus Health & Clinic Officer',
    department: 'Administration',
    email: 'robert.vance@clinic.caspa.org',
    phone: '+1 (555) 537-8899',
    workloadPeriods: 0,
    classesAssigned: ['Campus Infirmary Care', 'First Aid Response', 'Sports Medical Triage'],
    qualification: 'M.B.B.S, Sports Medicine Specialist',
    joinDate: 'Nov 2017',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    roomLocation: 'Health Bay 01',
    liveStatusText: 'Present / Health Bay 01',
    evaluationScore: 4.8,
    percentileRank: '97th Pctl',
    badge: 'Clinical Lead',
    attendanceRatePercent: 97.6,
    todaySchedule: [
      { period: 'Morning Clinic (08:00 - 12:00)', time: '08:00 AM', classSection: 'Daily Student Health Checks & Vaccinations', room: 'Health Bay 01', status: 'IN_SESSION' },
      { period: 'Afternoon Sports Cover', time: '02:00 PM', classSection: 'Athletics Arena Triage', room: 'Sports Complex', status: 'UPCOMING' },
    ],
    ferpaCompliance: {
      salaryGrade: 'Grade IV Medical Officer',
      monthlyDisbursement: '₹1,35,000 / month (Automated Mandate)',
      backgroundCheckStatus: 'State Medical Council Registered',
      lastAuditTimestamp: 'Aug 01, 2026',
      emergencyContact: 'City Hospital Emergency (+1 555-911-0011)',
    },
  },
  {
    id: 'stf-6',
    employeeId: 'EMP-SCI-01',
    fullName: 'Dr. Sunita Verma',
    designation: 'Natural Sciences Head & AP Curriculum Chair',
    department: 'Science',
    email: 'sunita.verma@caspaschool.org',
    phone: '+1 (555) 672-8819',
    workloadPeriods: 20,
    classesAssigned: ['Grade 12 Advanced Chemistry', 'AP Science R&D', 'Curriculum Committee'],
    qualification: 'Ph.D. Biochemistry (Cambridge), M.Sc.',
    joinDate: 'Jul 2014',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80',
    roomLocation: 'Science Wing Admin Office',
    liveStatusText: 'Present / Science Wing Admin Office',
    evaluationScore: 4.9,
    percentileRank: '99th Pctl',
    badge: 'Academic Chair',
    attendanceRatePercent: 99.0,
    todaySchedule: [
      { period: 'Period 1 (08:30 - 09:15)', time: '08:30 AM', classSection: 'Advanced Biochemistry Seminar', room: 'Lab 01', status: 'COMPLETED' },
      { period: 'Period 4 (11:00 - 11:45)', time: '11:00 AM', classSection: 'Curriculum Pacing Review', room: 'Academic Office', status: 'UPCOMING' },
    ],
    ferpaCompliance: {
      salaryGrade: 'Grade V Senior Academic Chair',
      monthlyDisbursement: '₹1,40,000 / month (Automated Mandate)',
      backgroundCheckStatus: 'Certified State Educator',
      lastAuditTimestamp: 'Aug 10, 2026',
      emergencyContact: 'Dr. R. Verma (+1 555-334-1100)',
    },
  },
];

export const INITIAL_FEE_INVOICES: FeeInvoiceItem[] = [
  {
    id: 'inv-101',
    invoiceNo: 'INV-2026-0901',
    studentId: 'std-001',
    studentName: 'Elena Vance',
    gradeSection: 'Grade 9B',
    term: 'Term 2 (Fall 2026)',
    totalAmount: 3850,
    paidAmount: 3850,
    balanceDue: 0,
    dueDate: 'Sep 15, 2026',
    status: 'PAID',
    paymentMethod: 'Online Banking (Chase)',
    lastPaymentDate: 'Sep 12, 2026',
  },
  {
    id: 'inv-102',
    invoiceNo: 'INV-2026-0902',
    studentId: 'std-002',
    studentName: 'Marcus Brody',
    gradeSection: 'Grade 9B',
    term: 'Term 2 (Fall 2026)',
    totalAmount: 3850,
    paidAmount: 3200,
    balanceDue: 650,
    dueDate: 'Sep 15, 2026',
    status: 'OVERDUE',
    paymentMethod: 'Credit Card (Partial)',
    lastPaymentDate: 'Sep 10, 2026',
  },
  {
    id: 'inv-103',
    invoiceNo: 'INV-2026-0903',
    studentId: 'std-003',
    studentName: 'Sophia Chen',
    gradeSection: 'Grade 9B',
    term: 'Term 2 (Fall 2026)',
    totalAmount: 3850,
    paidAmount: 3850,
    balanceDue: 0,
    dueDate: 'Sep 15, 2026',
    status: 'PAID',
    paymentMethod: 'Wire Transfer',
    lastPaymentDate: 'Sep 08, 2026',
  },
  {
    id: 'inv-104',
    invoiceNo: 'INV-2026-0904',
    studentId: 'std-004',
    studentName: 'Devon Patel',
    gradeSection: 'Grade 10A',
    term: 'Term 2 (Fall 2026)',
    totalAmount: 4200,
    paidAmount: 3000,
    balanceDue: 1200,
    dueDate: 'Sep 15, 2026',
    status: 'OVERDUE',
    paymentMethod: 'Cheque',
    lastPaymentDate: 'Sep 05, 2026',
  },
  {
    id: 'inv-105',
    invoiceNo: 'INV-2026-0905',
    studentId: 'std-005',
    studentName: 'Aria Montgomery',
    gradeSection: 'Grade 9B',
    term: 'Term 2 (Fall 2026)',
    totalAmount: 3850,
    paidAmount: 3850,
    balanceDue: 0,
    dueDate: 'Sep 15, 2026',
    status: 'PAID',
    paymentMethod: 'Online Auto-Debit',
    lastPaymentDate: 'Sep 01, 2026',
  },
  {
    id: 'inv-106',
    invoiceNo: 'INV-2026-0906',
    studentId: 'std-007',
    studentName: 'Liam Hemsworth',
    gradeSection: 'Grade 9B',
    term: 'Term 2 (Fall 2026)',
    totalAmount: 3850,
    paidAmount: 3000,
    balanceDue: 850,
    dueDate: 'Sep 15, 2026',
    status: 'OVERDUE',
    paymentMethod: 'Credit Card',
    lastPaymentDate: 'Aug 29, 2026',
  },
  {
    id: 'inv-107',
    invoiceNo: 'INV-2026-0907',
    studentId: 'std-009',
    studentName: 'Julian Thorne',
    gradeSection: 'Grade 11 AP',
    term: 'Term 2 (Fall 2026)',
    totalAmount: 4600,
    paidAmount: 4600,
    balanceDue: 0,
    dueDate: 'Sep 15, 2026',
    status: 'PAID',
    paymentMethod: 'ACH Direct',
    lastPaymentDate: 'Sep 14, 2026',
  },
  {
    id: 'inv-108',
    invoiceNo: 'INV-2026-0908',
    studentId: 'std-011',
    studentName: 'Tariq Al-Mansoor',
    gradeSection: 'Grade 8B',
    term: 'Term 2 (Fall 2026)',
    totalAmount: 3450,
    paidAmount: 3000,
    balanceDue: 450,
    dueDate: 'Sep 15, 2026',
    status: 'PARTIAL',
    paymentMethod: 'Wire Transfer',
    lastPaymentDate: 'Sep 11, 2026',
  },
];

export const INITIAL_CLASS_SECTIONS: ClassSectionDetail[] = [
  {
    id: 'sec-9a',
    grade: 'Grade 9',
    section: '9A',
    classTeacher: 'Mr. Marcus Vance',
    room: 'Room 201',
    studentCount: 30,
    capacity: 32,
    periodsPerDay: 7,
    syllabusCompletionRate: 64,
  },
  {
    id: 'sec-9b',
    grade: 'Grade 9',
    section: '9B',
    classTeacher: 'Mrs. Oswald',
    room: 'Room 204',
    studentCount: 32,
    capacity: 32,
    periodsPerDay: 7,
    syllabusCompletionRate: 71,
  },
  {
    id: 'sec-10a',
    grade: 'Grade 10',
    section: '10A',
    classTeacher: 'Dr. Katherine Wells',
    room: 'Room 301',
    studentCount: 28,
    capacity: 30,
    periodsPerDay: 7,
    syllabusCompletionRate: 68,
  },
  {
    id: 'sec-10b',
    grade: 'Grade 10',
    section: '10B',
    classTeacher: 'Mr. David Morales',
    room: 'Room 303',
    studentCount: 29,
    capacity: 30,
    periodsPerDay: 7,
    syllabusCompletionRate: 65,
  },
  {
    id: 'sec-11ap',
    grade: 'Grade 11',
    section: '11 AP',
    classTeacher: 'Dr. Alistair Ross',
    room: 'Lab 204 (North Wing)',
    studentCount: 24,
    capacity: 25,
    periodsPerDay: 8,
    syllabusCompletionRate: 78,
  },
  {
    id: 'sec-12',
    grade: 'Grade 12',
    section: '12 Senior',
    classTeacher: 'Dr. Katherine Sterling',
    room: 'Auditorium Hall 2',
    studentCount: 31,
    capacity: 35,
    periodsPerDay: 8,
    syllabusCompletionRate: 82,
  },
];

export const INITIAL_SAFETY_INCIDENTS: SafetyIncident[] = [
  {
    id: 'inc-01',
    caseNumber: 'SAFE-2026-0042',
    category: 'Anti-Ragging',
    risk: 'HIGH',
    status: 'UNDER_INVESTIGATION',
    isAnonymous: true,
    campusId: 'campus-central',
    campusName: 'CASPA Central Campus (Main)',
    location: 'Senior Wing 2nd Floor Locker Bay',
    dateTime: 'Sep 22, 2026 • 02:40 PM',
    description: 'Report of intimidation and verbal harassment during lunch recess involving Grade 11 and Grade 9 students near the locker corridor.',
    evidenceUrls: [],
    assignedInvestigator: 'Arthur Clark (School Administrator) & Discipline Committee',
    slaDeadline: 'Today, 6:00 PM (2h 15m remaining)',
    isSlaBreached: false,
    investigationNotes: [
      {
        author: 'Arthur Clark',
        note: 'CCTV footage retrieved from Camera 14B. Statement recording scheduled with floor proctor.',
        timestamp: 'Sep 22, 03:15 PM',
        isConfidential: true,
      },
    ],
    createdAt: 'Sep 22, 2026 02:45 PM',
    updatedAt: 'Sep 22, 2026 03:15 PM',
  },
  {
    id: 'inc-02',
    caseNumber: 'SAFE-2026-0038',
    category: 'Bullying',
    risk: 'MEDIUM',
    status: 'RESOLVED',
    isAnonymous: false,
    reporterName: 'Mrs. Oswald (Teacher)',
    reporterRole: 'TEACHER',
    campusId: 'campus-central',
    campusName: 'CASPA Central Campus (Main)',
    location: 'Cafeteria West Wing',
    dateTime: 'Sep 18, 2026 • 12:30 PM',
    description: 'Exclusionary behavior and verbal teasing resolved through joint counselling with grade counsellor and parent mediation.',
    evidenceUrls: [],
    assignedInvestigator: 'Ms. Rebecca Stone (Counsellor)',
    actionTaken: 'Parent counselling conducted. Behavioral pledge signed by students.',
    slaDeadline: 'Resolved within 24h SLA',
    isSlaBreached: false,
    investigationNotes: [
      {
        author: 'Rebecca Stone',
        note: 'Case successfully closed with parental sign-off and follow-up checkpoint in 14 days.',
        timestamp: 'Sep 19, 11:00 AM',
        isConfidential: false,
      },
    ],
    createdAt: 'Sep 18, 2026 01:00 PM',
    updatedAt: 'Sep 19, 11:30 AM',
  },
];

export const INITIAL_APPROVALS: ApprovalTask[] = [
  {
    id: 'app-01',
    title: 'Robotics Lab Equipment Purchase Requisition',
    module: 'PURCHASE',
    requesterName: 'Dr. Alistair Ross',
    requesterRole: 'Head of Natural Sciences',
    amount: 4250,
    department: 'Science',
    currentStage: 'Administrator Final Approval',
    status: 'PENDING',
    slaDeadline: '24 Hours SLA',
    priority: 'HIGH',
    description: 'Procurement of 12 Arduino microcontroller kits and sensor expansion boards for STEM competitive hackathon.',
    createdAt: 'Sep 22, 2026 09:30 AM',
    history: [
      { actor: 'Dr. Ross', action: 'SUBMITTED', timestamp: 'Sep 22, 09:30 AM', comment: 'Requisition with vendor quotation' },
    ],
  },
  {
    id: 'app-02',
    title: 'Emergency Medical Leave Request (4 Days)',
    module: 'LEAVE',
    requesterName: 'Mrs. Deborah Hayes',
    requesterRole: 'Mathematics Teacher',
    department: 'Mathematics',
    currentStage: 'Director Operations Approval',
    status: 'PENDING',
    slaDeadline: '12 Hours SLA',
    priority: 'URGENT',
    description: 'Leave required for orthopedic surgery recovery. Substitute teaching arrangements coordinated with Mrs. Oswald.',
    createdAt: 'Sep 22, 2026 08:15 AM',
    history: [
      { actor: 'Mrs. Hayes', action: 'SUBMITTED', timestamp: 'Sep 22, 08:15 AM' },
    ],
  },
  {
    id: 'app-03',
    title: 'Annual Sports Day Track Maintenance Budget',
    module: 'EVENT',
    requesterName: 'Coach Raymond Briggs',
    requesterRole: 'Director of Athletics',
    amount: 1850,
    department: 'Sports',
    currentStage: 'Financial Clearance',
    status: 'PENDING',
    slaDeadline: '48 Hours SLA',
    priority: 'NORMAL',
    description: 'Synthetic track line resurfacing and high-jump pit foam cushion replacement.',
    createdAt: 'Sep 21, 2026 04:00 PM',
    history: [
      { actor: 'Coach Briggs', action: 'SUBMITTED', timestamp: 'Sep 21, 04:00 PM' },
    ],
  },
];

// ================= PRINCIPAL & GOVERNANCE SPECIFIC SEEDS =================

export const INITIAL_PRINCIPAL_AGENDA: PrincipalAgendaItem[] = [
  {
    id: 'ag-1',
    time: '10:00 AM',
    location: 'BOARDROOM A',
    type: 'PTM',
    title: 'Parent-Teacher Council Review',
    description: 'Discussion on Term 2 Curriculum Progression',
    badgeColor: '#176B87',
  },
  {
    id: 'ag-2',
    time: '11:30 AM',
    location: 'FINANCE OFFICE',
    type: 'MEETING',
    title: 'Fee Reconciliation & Concessions',
    description: 'Review 44 pending merit scholarship cases',
    badgeColor: '#0E2C48',
  },
  {
    id: 'ag-3',
    time: '04:00 PM',
    location: 'SECURITY GATE',
    type: 'SAFETY / TRAN',
    title: 'Daily Bus Fleet Dispatch Clearance',
    description: 'GPS telemetry check & breathalyzer signoff',
    badgeColor: '#D97706',
  },
  {
    id: 'ag-4',
    time: '05:30 PM',
    location: 'CONFERENCE B',
    type: 'ACADEMIC',
    title: 'Term 2 AP Optics Module Review',
    description: 'Final signoff with Dr. Sunita Verma',
    badgeColor: '#7C3AED',
  },
];

export const INITIAL_PRINCIPAL_CRITICAL_ALERTS: PrincipalCriticalAlert[] = [
  {
    id: 'crit-1',
    title: 'Perimeter Gate 3 Biometric Terminal Offline',
    timeString: 'Reported 38m ago',
    locationOrDetail: 'Gate Sensor Node #04',
    actionLabel: 'Dispatch Tech',
    actionType: 'DISPATCH_TECH',
    status: 'ACTIVE',
  },
  {
    id: 'crit-2',
    title: 'Unexcused Absence Spike in Grade 9B',
    timeString: 'Triggered 1h ago',
    locationOrDetail: '3 Consecutive Days (5 Students)',
    actionLabel: 'Notify Guardians',
    actionType: 'NOTIFY_GUARDIANS',
    status: 'ACTIVE',
  },
];

export const INITIAL_PRINCIPAL_STAFF_LEAVES: PrincipalStaffLeaveItem[] = [
  {
    id: 'leave-1',
    staffName: 'Mr. Charles Davis',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Casual',
    durationDates: 'Sep 24–25 (2d)',
    designationDept: 'Grade 10 Tutor • English Dept',
    note: 'Substitute cover confirmed: Mrs. Higgins (P2, P4)',
    status: 'PENDING',
  },
  {
    id: 'leave-2',
    staffName: 'Ms. Rachel Higgins',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Medical',
    durationDates: 'Sep 24 (1d)',
    designationDept: 'Physics Faculty • AP Level',
    note: '⚠️ Lab session cover pending allocation',
    status: 'PENDING',
  },
  {
    id: 'leave-3',
    staffName: 'Officer Davis',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Duty',
    durationDates: 'Sep 26 (Half-day)',
    designationDept: 'Campus Safety & Transport Lead',
    note: 'Regional transport regulatory summit attendance',
    status: 'PENDING',
  },
];

export const INITIAL_PRINCIPAL_SAFEGUARDING_CASES: PrincipalSafeguardingCase[] = [
  {
    id: 'case-0234',
    caseNo: 'Case #SF-0234',
    severity: 'CRITICAL',
    timeAgo: '12m ago',
    studentMaskedId: 'Student ID: ***8942',
    title: 'Bullying / Physical Altercation • Under Investigation',
    assignedTo: 'Assigned to Campus Safety Lead Officer Davis',
    currentStep: 3,
    notesCount: '3 statements + CCTV secured',
    category: 'Bullying',
    details: 'Incident reported near North Playground basketball court. Medical triage cleared minor scrapes; counselor Rey conducting interviews.',
  },
  {
    id: 'case-0231',
    caseNo: 'Case #SF-0231',
    severity: 'HIGH',
    timeAgo: '2h ago',
    studentMaskedId: 'Student ID: ***3109',
    title: 'Cyberbullying & Social Media Harassment • Investigation Stage',
    assignedTo: 'Joint Parent Conference scheduled • Counselor Rey',
    currentStep: 3,
    notesCount: 'Digital logs archived',
    category: 'Child Protection',
    details: 'Anonymous messaging app screenshots submitted by guardian. Device policy verification underway with IT department.',
  },
  {
    id: 'case-0228',
    caseNo: 'Case #SF-0228',
    severity: 'MEDIUM',
    timeAgo: 'Yesterday',
    studentMaskedId: 'Student ID: ***6552',
    title: 'Classroom Disruption & Non-Compliance • Discipline / Behavior Log',
    assignedTo: 'Weekly Dean Checkpoint',
    currentStep: 2,
    notesCount: 'Rehabilitation-oriented tracking active',
    category: 'Discipline',
    details: 'Repeated lab equipment misuse during chemistry period 4. Parents notified and remediation contract signed.',
  },
];

export const INITIAL_PRINCIPAL_EXECUTIVE_APPROVALS: PrincipalExecutiveApproval[] = [
  {
    id: 'exec-app-1',
    initials: 'OD',
    avatarBg: 'bg-rose-100 text-rose-800',
    requesterName: 'Officer Davis',
    requesterRole: 'Campus Safety & Transit',
    categoryBadge: 'Emergency',
    isEmergency: true,
    slaString: '30m remaining • Expedited Flash SLA',
    title: 'Emergency Bus Route 4 Reroute',
    description: 'Immediate traffic bypass authorization needed due to North Corridor flash water main closure. Impacts 42 evening boarding scholars.',
    detailsBox: {
      label: 'Transit Bypass Overlay',
      value: '+6 min travel window shift',
      badge: 'Bus 04',
    },
    steps: [
      { name: 'Ops Signoff', completed: true },
      { name: 'Principal Review', completed: false, current: true },
      { name: 'Dispatch', completed: false },
    ],
    status: 'PENDING',
  },
  {
    id: 'exec-app-2',
    initials: 'FD',
    avatarBg: 'bg-sky-100 text-sky-800',
    requesterName: 'Finance Dept',
    requesterRole: 'Bursar + Accounts Office',
    categoryBadge: 'Fee Concession',
    isEmergency: false,
    slaString: '1d overdue • Immediate escalation flagged',
    title: 'Elena Vance (Grade 10-A)',
    description: 'Sibling Policy Tier 2 Adjustment for Semester 2. Applied relief: 15% tuition concession (₹18,500) verified with parent affidavit.',
    detailsBox: {
      label: 'Accounts ledger verified',
      value: 'Sibling enrolled in G7',
      badge: 'Verified',
    },
    status: 'PENDING',
  },
  {
    id: 'exec-app-3',
    initials: 'AV',
    avatarBg: 'bg-indigo-100 text-indigo-800',
    requesterName: 'Mr. Arthur Vance',
    requesterRole: 'STEM Faculty Coordinator',
    categoryBadge: 'Lab Purchase',
    isEmergency: false,
    slaString: '4h ago',
    title: 'Optics Benches & Laser Diffraction Mounts',
    description: 'Required apparatus for AP Physics Lab practical exams. Approved in Department Q3 budget plan.',
    amount: '₹45,000',
    detailsBox: {
      label: 'CAPEX Fund #4',
      value: 'Budget approved by HOD',
      badge: 'CAPEX',
    },
    status: 'PENDING',
  },
  {
    id: 'exec-app-4',
    initials: 'EO',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    requesterName: 'Mrs. Eleanor Oswald',
    requesterRole: 'Mathematics Department',
    categoryBadge: 'Academic Blueprint',
    isEmergency: false,
    slaString: '2h SLA left',
    title: 'Grade 9B Remedial Math Blueprint Revision',
    description: 'Algebra II remedial curriculum with 4-week diagnostic milestone tracking.',
    status: 'PENDING',
  },
];

export const INITIAL_PRINCIPAL_OPERATIONS_MODULES: PrincipalOperationModule[] = [
  { id: 'op-1', title: 'Transport', iconName: 'Bus', metricPrimary: '18/20 buses active', metricSecondary: 'GPS Telemetry On', badge: 'Active' },
  { id: 'op-2', title: 'Hostel', iconName: 'Building', metricPrimary: '198/240 occupied', metricSecondary: 'Warden on duty', badge: '82%' },
  { id: 'op-3', title: 'Library', iconName: 'BookOpen', metricPrimary: '18 overdue books', metricSecondary: 'Circulation 94%', badge: 'Open' },
  { id: 'op-4', title: 'Inventory', iconName: 'Package', metricPrimary: '4 PO requests', metricSecondary: 'Lab stock low', badge: 'Action' },
  { id: 'op-5', title: 'Events', iconName: 'Calendar', metricPrimary: '2 upcoming', metricSecondary: 'Debate & Sports', badge: 'Term 2' },
  { id: 'op-6', title: 'Admissions', iconName: 'Users', metricPrimary: '34 enquiries', metricSecondary: '18.3% converted', badge: 'MTD' },
];

// ================= VICE PRINCIPAL SPECIFIC SEEDS (Images 1-7) =================

export const INITIAL_VP_CONFLICTS: VicePrincipalSchedulingConflict[] = [
  {
    id: 'conf-1',
    title: 'Lab 3B Double Booking',
    description: 'Grade 11 Physics & Grade 12 Chemistry overlap during Period 4 today. Both booked full capacity.',
    period: 'Period 4 (11:05 - 11:50 AM)',
    affectedRoomsOrTeachers: 'Lab 3B • Ms. Rachel Higgins & Dr. Sunita Verma',
    severity: 'CRITICAL',
    status: 'ACTIVE',
  },
  {
    id: 'conf-2',
    title: 'Coverage Gap: Grade 10B',
    description: 'Period 2 English substitute pending confirmation for Mr. Davis. Class roster is unassigned.',
    period: 'Period 2 (09:20 - 10:05 AM)',
    affectedRoomsOrTeachers: 'Room 102 • Mr. Charles Davis (On Leave)',
    severity: 'WARNING',
    status: 'ACTIVE',
  },
];

export const INITIAL_VP_LESSON_PLANS: VicePrincipalLessonPlan[] = [
  {
    id: 'plan-1',
    title: 'Quadratic Equations & Parabolic Modelling',
    teacherName: 'Mrs. Eleanor Oswald',
    subject: 'Mathematics',
    gradeSection: 'Grade 9B',
    week: 'Week 8',
    learningObjectives: [
      'Graphing standard form quadratic functions',
      'Vertex identification & axis of symmetry',
      'Real-world projectile trajectory problem solving',
    ],
    courseResources: ['Textbook Ch. 4', 'Desmos Graphing Tool', 'Remedial Worksheet #2'],
    durationText: '4 Periods (180 mins)',
    blueprintTag: 'Term 2 Blueprint',
    status: 'NEEDS_REVISION',
    warningNote: 'Please integrate formative exit-ticket rubrics before final approval.',
    submittedTimeAgo: 'Yesterday',
  },
  {
    id: 'plan-2',
    title: 'Electromagnetic Induction & Faraday\'s Laws',
    teacherName: 'Ms. Rachel Higgins',
    subject: 'Physics (AP)',
    gradeSection: 'Grade 11 AP',
    week: 'Week 7',
    learningObjectives: [
      'Magnetic flux derivation and Lenz’s law',
      'Faraday induction coil laboratory verification',
      'Solenoid electromotive force calculus',
    ],
    courseResources: ['Lab Manual Sec 3.2', 'PhET Interactive Simulation'],
    durationText: '3 Modules (135 mins)',
    blueprintTag: 'AP CollegeBoard Standard',
    status: 'SUBMITTED',
    submittedTimeAgo: '4h ago',
  },
  {
    id: 'plan-3',
    title: 'Shakespearean Dramatic Irony in Macbeth',
    teacherName: 'Mr. Charles Davis',
    subject: 'English Literature',
    gradeSection: 'Grade 10',
    week: 'Week 7',
    learningObjectives: [
      'Textual deconstruction of Act III soliloquies',
      'Comparative tragic flaw analysis in Jacobean context',
    ],
    courseResources: ['Folger Shakespeare Edition', 'Audio Drama Excerpt Act 3'],
    durationText: '3 Periods (135 mins)',
    blueprintTag: 'Core Curriculum',
    status: 'APPROVED',
    feedbackNote: 'Verified by VP Office • Reviewed Oct 14',
    submittedTimeAgo: 'Oct 14',
  },
];

export const INITIAL_VP_EXAMS: VicePrincipalExamSession[] = [
  {
    id: 'exam-1',
    title: 'Grade 10 • Mathematics Mid-Term',
    subject: 'Mathematics',
    grade: 'Grade 10',
    dateStr: 'Oct 02, 2026',
    timeRange: '09:00 - 11:30 AM',
    venue: 'Hall A',
    chiefProctor: 'M. Davies',
    status: 'ONGOING',
    batchSize: 110,
    progressNotice: 'Session ongoing • Hall A biometric active',
  },
  {
    id: 'exam-2',
    title: 'Grade 11 • AP Physics Practical Exam',
    subject: 'AP Physics',
    grade: 'Grade 11',
    dateStr: 'Oct 08, 2026',
    timeRange: '10:00 AM - 01:00 PM',
    venue: 'Lab 3B',
    chiefProctor: 'R. Higgins',
    status: 'SCHEDULED',
    batchSize: 42,
    progressNotice: 'Lab equipment staged & validated',
  },
  {
    id: 'exam-3',
    title: 'Grade 9 • English Literature Diagnostic',
    subject: 'English Lit',
    grade: 'Grade 9',
    dateStr: 'Sep 22, 2026',
    timeRange: 'Completed',
    venue: 'Lecture Hall 2',
    chiefProctor: 'C. Davis',
    status: 'COMPLETED',
    batchSize: 90,
    progressNotice: 'Evaluations ready for sign-off',
    gradingFinishedPercent: 100,
  },
  {
    id: 'exam-4',
    title: 'Grade 12 • Chemistry Organic Synthesis',
    subject: 'Chemistry',
    grade: 'Grade 12',
    dateStr: 'Sep 23, 2026',
    timeRange: 'Completed',
    venue: 'Lab 1',
    chiefProctor: 'S. Verma',
    status: 'COMPLETED',
    batchSize: 64,
    progressNotice: 'Teacher grading 87% finished',
    gradingFinishedPercent: 87,
  },
];

export const INITIAL_VP_PUBLICATION_QUEUE: VicePrincipalPublicationQueueItem[] = [
  {
    id: 'pub-1',
    title: 'Grade 9 English Mock',
    detail: 'All 30/30 papers authenticated',
    status: 'COMPLETE',
    submissionsText: '30/30 verified',
    isPublished: false,
  },
  {
    id: 'pub-2',
    title: 'Grade 12 Chemistry Quiz',
    detail: '4 submissions pending review',
    status: 'IN_PROGRESS',
    submissionsText: '28/32 graded',
    isPublished: false,
  },
  {
    id: 'pub-3',
    title: 'Grade 10 Biology Diagnostic',
    detail: 'Lab score reconciliations pending',
    status: 'IN_PROGRESS',
    submissionsText: '14/35 graded',
    isPublished: false,
  },
];

export const INITIAL_VP_TEACHERS: VicePrincipalTeacherItem[] = [
  {
    id: 'vp-t-1',
    name: 'Mrs. Eleanor Oswald',
    subjectRole: 'Mathematics Lead',
    grades: 'Grades 9, 10',
    performanceScore: 96,
    statusText: 'Present',
    planStatus: 'Up to Date',
    nextScheduleInfo: 'Next: Alg II (Rm 204)',
    actionLinkLabel: 'View Classroom',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    isVerified: true,
  },
  {
    id: 'vp-t-2',
    name: 'Mr. Charles Davis',
    subjectRole: 'English Literature',
    grades: 'Grades 10, 11',
    performanceScore: 91,
    statusText: 'On Leave',
    planStatus: 'Up to Date',
    nextScheduleInfo: 'Sep 24-25 • Sub: Ms. Taylor',
    actionLinkLabel: 'Coverage Plan',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'vp-t-3',
    name: 'Ms. Rachel Higgins',
    subjectRole: 'Natural Sciences & AP Physics',
    grades: 'Gr 11, 12',
    performanceScore: 94,
    statusText: 'Present',
    planStatus: 'Overdue',
    overdueAlertText: 'Week 7 Lab Syllabus Pending (3d)',
    nextScheduleInfo: 'Period 3: Physics Lab (Lab 3B)',
    actionLinkLabel: 'Ping Reminder',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'vp-t-4',
    name: 'Mr. Arthur Vance',
    subjectRole: 'STEM & Applied Labs',
    grades: 'Grades 9, 11, 12',
    performanceScore: 88,
    statusText: 'Present',
    planStatus: 'Up to Date',
    nextScheduleInfo: 'Robotics Showcase in 4 Days',
    actionLinkLabel: 'View Schedule',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'vp-t-5',
    name: 'Dr. Sunita Verma',
    subjectRole: 'Chemistry Department',
    grades: 'Grades 11, 12',
    performanceScore: 89,
    statusText: 'Present',
    planStatus: 'Overdue',
    overdueAlertText: 'AP Chem Practical Rubric (1d)',
    nextScheduleInfo: 'Period 4: Chemistry (Lab 3B clash)',
    actionLinkLabel: 'Ping Reminder',
    avatarUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'vp-t-6',
    name: 'Officer Davis',
    subjectRole: 'Campus Safety & Transport Coordination',
    grades: 'All Campus',
    performanceScore: 95,
    statusText: 'Present',
    planStatus: 'N/A',
    nextScheduleInfo: 'Gate A & Bus Depot Clearance',
    actionLinkLabel: 'Log Details',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
];

// ================= PARENT MODULE SEEDS (Images 1-7) =================

export const INITIAL_PARENT_CHILDREN: ParentChildProfile[] = [
  {
    id: 'child-aarav-sharma',
    fullName: 'Aarav Sharma',
    grade: 'Grade 10',
    section: 'B',
    curriculum: 'CBSE',
    rollNo: 14,
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    attendancePercent: 94.2,
    totalDays: 51,
    presentDays: 48,
    pendingDues: 12400,
    dueDate: 'Oct 15, 2026',
    gpa: '9.4 CGPA',
    rank: '4th in Class',
    house: 'Falcons',
    bloodGroup: 'O+',
    classTeacher: 'Mrs. Oswald',
    classTeacherEmail: 'mrs.oswald@caspaschool.org',
    busRoute: 'Route 4B',
    busStop: 'Green Glen Junction',
    emergencyContact: '+91 98450 67890',
    academicPerformance: [
      { subject: 'Mathematics', score: 92, grade: 'A1', trend: 'up' },
      { subject: 'Science (Physics & Chem)', score: 88, grade: 'A2', trend: 'up' },
      { subject: 'English Literature', score: 95, grade: 'A1', trend: 'stable' },
      { subject: 'Social Studies', score: 82, grade: 'B1', trend: 'stable' },
      { subject: 'Computer Science & AI', score: 98, grade: 'A1', trend: 'up' },
    ],
    teacherRemarks: 'Aarav is showing consistent improvement in Physics and Calculus. Outstanding problem solving in Robotics club.',
  },
  {
    id: 'child-ananya-sharma',
    fullName: 'Ananya Sharma',
    grade: 'Grade 7',
    section: 'A',
    curriculum: 'IB',
    rollNo: 8,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    attendancePercent: 96.8,
    totalDays: 51,
    presentDays: 49,
    pendingDues: 0,
    dueDate: 'Cleared',
    gpa: '6.8 / 7.0',
    rank: '2nd in Class',
    house: 'Eagles',
    bloodGroup: 'A+',
    classTeacher: 'Mr. Marcus Vance',
    classTeacherEmail: 'marcus.vance@caspaschool.org',
    busRoute: 'Route 4B',
    busStop: 'Green Glen Junction',
    emergencyContact: '+91 98450 67890',
    academicPerformance: [
      { subject: 'Language & Literature', score: 96, grade: 'Grade 7', trend: 'up' },
      { subject: 'Integrated Science', score: 94, grade: 'Grade 7', trend: 'up' },
      { subject: 'Mathematics', score: 90, grade: 'Grade 6', trend: 'stable' },
      { subject: 'Visual Arts & Design', score: 98, grade: 'Grade 7', trend: 'up' },
      { subject: 'Individuals & Societies', score: 92, grade: 'Grade 7', trend: 'stable' },
    ],
    teacherRemarks: 'Ananya demonstrates exemplary creative expression in Visual Arts and has maintained top-tier performance in Language Arts.',
  },
];

export const INITIAL_PARENT_FEES: ParentFeeItem[] = [
  {
    id: 'fee-due-1',
    childId: 'child-aarav-sharma',
    title: 'Term 2 Tuition Fee',
    category: 'Tuition',
    amount: 8000,
    dueDate: 'Oct 15, 2026',
    status: 'PENDING',
  },
  {
    id: 'fee-due-2',
    childId: 'child-aarav-sharma',
    title: 'STEM & Robotics Lab Consumables',
    category: 'Lab & Tech',
    amount: 2400,
    dueDate: 'Oct 15, 2026',
    status: 'PENDING',
  },
  {
    id: 'fee-due-3',
    childId: 'child-aarav-sharma',
    title: 'Transport Route 4B (Term 2)',
    category: 'Transport',
    amount: 2000,
    dueDate: 'Oct 15, 2026',
    status: 'PENDING',
  },
  {
    id: 'fee-paid-1',
    childId: 'child-aarav-sharma',
    title: 'Term 1 Comprehensive Tuition',
    category: 'Tuition',
    amount: 35000,
    dueDate: 'Jul 10, 2026',
    status: 'PAID',
    receiptNo: 'RCP-2026-8812',
    paidOn: 'Jul 05, 2026',
    paymentMethod: 'UPI / Razorpay',
  },
  {
    id: 'fee-paid-2',
    childId: 'child-aarav-sharma',
    title: 'Annual Technology & Digital Campus Fee',
    category: 'Annual',
    amount: 15000,
    dueDate: 'Jul 10, 2026',
    status: 'PAID',
    receiptNo: 'RCP-2026-7241',
    paidOn: 'Jul 05, 2026',
    paymentMethod: 'Netbanking (HDFC)',
  },
  {
    id: 'fee-paid-3',
    childId: 'child-aarav-sharma',
    title: 'Library, Sports & Co-Curricular Fund',
    category: 'Activities',
    amount: 5000,
    dueDate: 'Jul 10, 2026',
    status: 'PAID',
    receiptNo: 'RCP-2026-6190',
    paidOn: 'Jul 05, 2026',
    paymentMethod: 'Debit Card',
  },
  {
    id: 'fee-paid-4',
    childId: 'child-ananya-sharma',
    title: 'Annual Comprehensive IB Tuition (Gr 7)',
    category: 'Tuition',
    amount: 65000,
    dueDate: 'Jul 15, 2026',
    status: 'PAID',
    receiptNo: 'RCP-2026-9021',
    paidOn: 'Jul 10, 2026',
    paymentMethod: 'Netbanking (ICICI)',
  },
];

export const INITIAL_PARENT_NOTICES: ParentNoticeItem[] = [
  {
    id: 'p-notice-1',
    title: 'Monsoon Weather Warning & Early Dismissal Today',
    category: 'URGENT',
    dateStr: 'Today, 11:30 AM',
    author: 'Principal Dr. Mehta',
    summary: 'Due to severe torrential rains and waterlogging forecasts, school will dismiss early at 1:30 PM. All Route 4B buses will depart safely with GPS active.',
    fullContent: 'Dear Parents, In view of the heavy rain advisory issued by the Meteorological Department and regional waterlogging alerts, CASPA Central Campus will conclude classes today at 1:30 PM. Fleet buses will depart campus bays at 1:45 PM. GPS tracking is live on your parent app. Parents opting for self-pickup may collect wards from Gate 2 starting 1:15 PM.',
    isUrgent: true,
    requiresAcknowledgment: true,
    isAcknowledged: false,
    actionType: 'ACKNOWLEDGE',
    actionLabel: 'Acknowledge Receipt',
  },
  {
    id: 'p-notice-2',
    title: 'Term 1 Board Exam Guidelines & Syllabus Blueprint',
    category: 'ACADEMIC',
    dateStr: 'Oct 02, 2026',
    author: 'Vice Principal Dr. Jenkins',
    summary: 'Detailed examination timetable, blueprint weightages, and strict examination hall regulations for CBSE Grade 10 and IB Middle Years.',
    fullContent: 'The Term 1 Assessment cycle begins on October 20, 2026. Hall tickets and barcode student IDs will be issued by class teachers on Monday. Parents are requested to ensure revision schedules are maintained. No electronic smartwatches are permitted in exam halls.',
    actionType: 'DOWNLOAD',
    actionLabel: 'Download Blueprint PDF',
  },
  {
    id: 'p-notice-3',
    title: 'Parent-Teacher Meeting (PTM) Registration Open',
    category: 'PTM',
    dateStr: 'Sep 28, 2026',
    author: 'Academic Coordination Desk',
    summary: 'Book your 15-minute one-on-one conference slot with subject teachers for the upcoming PTM on Saturday, October 15, 2026.',
    fullContent: 'We invite parents to meet Mrs. Oswald (Maths), Mr. Davis (English), and Dr. Verma (Science) to review first-term formative portfolios and progress indicators.',
    actionType: 'REGISTER',
    actionLabel: 'Book Conference Slot',
  },
  {
    id: 'p-notice-4',
    title: 'National Science & Robotics Olympiad 2026-27',
    category: 'EVENTS',
    dateStr: 'Sep 25, 2026',
    author: 'STEM & Innovation Club',
    summary: 'Registrations are now open for the All-India Inter-School Science & Robotics Olympiad. Aarav has been nominated by faculty for the senior squad.',
    fullContent: 'Students selected for the preliminary round will receive mentorship from IISc research scholars. Training will occur during zero-period on Tuesdays and Thursdays.',
    actionType: 'REGISTER',
    actionLabel: 'Confirm Registration',
  },
  {
    id: 'p-notice-5',
    title: 'Transport Route 4B Winter Timing Update',
    category: 'TRANSPORT',
    dateStr: 'Sep 20, 2026',
    author: 'Fleet Management Hub',
    summary: 'Effective October 1st, morning pickup at Green Glen Junction stop will be shifted by 4 minutes to 08:14 AM.',
    fullContent: 'To ensure seamless transit ahead of arterial flyover construction, Bus 4B will arrive at Green Glen stop at 08:14 AM sharp. Conductor Mr. Ramesh will be verifying RFID student tags upon entry.',
    actionType: 'DOWNLOAD',
    actionLabel: 'View Route Schedule',
  },
];

export const INITIAL_PARENT_CERTIFICATES: ParentCertificateItem[] = [
  {
    id: 'cert-1',
    childId: 'child-aarav-sharma',
    childName: 'Aarav Sharma',
    title: 'Bonafide Student Certificate',
    type: 'BONAFIDE',
    purpose: 'Passport Renewal / Visa Application',
    status: 'READY',
    requestDate: 'Oct 01, 2026',
    issuedDate: 'Oct 01, 2026',
    verificationCode: 'CASPA-BNF-2026-9921',
    downloadUrl: '#',
  },
  {
    id: 'cert-2',
    childId: 'child-aarav-sharma',
    childName: 'Aarav Sharma',
    title: 'Tuition Fee Certificate (FY 2026-27)',
    type: 'TUITION_FEE',
    purpose: 'Income Tax Exemption under Section 80C',
    status: 'READY',
    requestDate: 'Sep 15, 2026',
    issuedDate: 'Sep 15, 2026',
    verificationCode: 'CASPA-TAX-2026-4418',
    downloadUrl: '#',
  },
  {
    id: 'cert-3',
    childId: 'child-aarav-sharma',
    childName: 'Aarav Sharma',
    title: 'Character & Conduct Certificate',
    type: 'CHARACTER',
    purpose: 'National Science Olympiad Registration',
    status: 'READY',
    requestDate: 'Sep 28, 2026',
    issuedDate: 'Sep 29, 2026',
    verificationCode: 'CASPA-CHR-2026-7811',
    downloadUrl: '#',
  },
  {
    id: 'cert-4',
    childId: 'child-ananya-sharma',
    childName: 'Ananya Sharma',
    title: 'Bonafide Student Certificate',
    type: 'BONAFIDE',
    purpose: 'State Junior Badminton Championship',
    status: 'READY',
    requestDate: 'Sep 10, 2026',
    issuedDate: 'Sep 10, 2026',
    verificationCode: 'CASPA-BNF-2026-3109',
    downloadUrl: '#',
  },
];

export const INITIAL_PARENT_TRANSPORT: ParentTransportTelemetry = {
  routeNumber: 'Route 4B',
  busNumber: 'KA-01-MJ-4821',
  currentSpeedKmH: 34,
  statusText: 'En Route • Green Glen Next',
  engineHealth: 'Optimal',
  rfidBoardedCount: 24,
  totalCapacity: 28,
  nextStopName: 'Green Glen Junction',
  etaNextStopMins: 4,
  driverName: 'Mr. Rajesh Kumar',
  driverPhone: '+91 98450 12345',
  conductorName: 'Mr. Ramesh K.',
  conductorPhone: '+91 98450 67891',
  safetyOfficerPhone: '+91 80 2345 6789',
  studentRfidLogs: [
    {
      tripType: 'MORNING',
      timestamp: '08:14 AM',
      location: 'Green Glen Junction Stop',
      status: 'BOARDED',
    },
    {
      tripType: 'MORNING',
      timestamp: '08:42 AM',
      location: 'CASPA Central Campus (Gate 3)',
      status: 'ARRIVED_CAMPUS',
    },
    {
      tripType: 'AFTERNOON',
      timestamp: '02:15 PM',
      location: 'School Depot Bay 3',
      status: 'BOARDED',
    },
  ],
  stops: [
    { stopNumber: 1, name: 'Palm Meadows Main Gate', scheduledTime: '07:45 AM', isCompleted: true, isCurrent: false },
    { stopNumber: 2, name: 'Silver Oaks Sector 2', scheduledTime: '08:00 AM', isCompleted: true, isCurrent: false },
    { stopNumber: 3, name: 'Green Glen Junction (Your Stop)', scheduledTime: '08:14 AM', isCompleted: false, isCurrent: true, isStudentStop: true },
    { stopNumber: 4, name: 'Outer Ring Road Metro Hub', scheduledTime: '08:28 AM', isCompleted: false, isCurrent: false },
    { stopNumber: 5, name: 'CASPA Central Campus (Main)', scheduledTime: '08:42 AM', isCompleted: false, isCurrent: false },
  ],
};

export const INITIAL_PARENT_LEAVES: ParentLeaveRequest[] = [
  {
    id: 'leave-1',
    childId: 'child-aarav-sharma',
    childName: 'Aarav Sharma',
    startDate: '2026-09-18',
    endDate: '2026-09-19',
    reason: 'Viral fever and prescribed medical rest',
    type: 'SICK',
    status: 'APPROVED',
    appliedDate: '2026-09-17',
    teacherRemark: 'Approved by Mrs. Oswald. Please submit medical note when returning.',
  },
  {
    id: 'leave-2',
    childId: 'child-aarav-sharma',
    childName: 'Aarav Sharma',
    startDate: '2026-10-18',
    endDate: '2026-10-19',
    reason: 'Family ceremony out of town',
    type: 'FAMILY',
    status: 'PENDING',
    appliedDate: '2026-10-10',
  },
];

export const INITIAL_PARENT_PTM_BOOKINGS: ParentPtmBooking[] = [
  {
    id: 'ptm-1',
    childId: 'child-aarav-sharma',
    childName: 'Aarav Sharma',
    dateStr: 'Saturday, Oct 15, 2026',
    timeSlot: '10:30 AM - 10:45 AM',
    teacherName: 'Mrs. Oswald',
    subject: 'Mathematics (Calculus & Coordinate Geometry)',
    venue: 'Academic Block A, Room 102',
    status: 'BOOKED',
    notes: 'Discussion on advanced problem solving in Olympiad training.',
  },
];

// In-Memory Database Engine
class DatabaseStore {
  currentUser: UserProfile | null = null;
  authenticatedUser: UserProfile | null = null;
  isAuthenticated: boolean = false;
  registeredUsers: UserProfile[] = Object.values(USERS);

  // Student State
  studentPeriods: StudentPeriod[] = [...INITIAL_STUDENT_PERIODS];
  studentTasks: StudentTaskItem[] = [...INITIAL_STUDENT_TASKS];
  studyMaterials: StudyMaterialItem[] = [...INITIAL_STUDY_MATERIALS];
  studentAchievements: StudentAchievement[] = [...INITIAL_STUDENT_ACHIEVEMENTS];
  attendanceHeatmap: AttendanceDayRecord[] = [...INITIAL_ATTENDANCE_HEATMAP];
  absenceExcuses: { date: string; reason: string; status: 'PENDING' | 'APPROVED' }[] = [];

  // Teacher State
  teacherClasses: TeacherClass[] = [...INITIAL_TEACHER_CLASSES];
  teacherStudents: TeacherStudent[] = [...INITIAL_TEACHER_STUDENTS];
  teacherTasks: TeacherTask[] = [...INITIAL_TEACHER_TASKS];
  parentMessages: ParentMessage[] = [...INITIAL_PARENT_MESSAGES];
  auditLogs: AuditLogItem[] = [];

  // Admin & Enterprise State
  students: Student[] = [...INITIAL_ADMIN_STUDENTS];
  staffMembers: AdminStaffMember[] = [...INITIAL_STAFF_MEMBERS];
  feeInvoices: FeeInvoiceItem[] = [...INITIAL_FEE_INVOICES];
  classSections: ClassSectionDetail[] = [...INITIAL_CLASS_SECTIONS];
  safetyIncidents: SafetyIncident[] = [...INITIAL_SAFETY_INCIDENTS];
  approvals: ApprovalTask[] = [...INITIAL_APPROVALS];

  // Principal & Governance State
  principalAgenda: PrincipalAgendaItem[] = [...INITIAL_PRINCIPAL_AGENDA];
  principalCriticalAlerts: PrincipalCriticalAlert[] = [...INITIAL_PRINCIPAL_CRITICAL_ALERTS];
  principalStaffLeaves: PrincipalStaffLeaveItem[] = [...INITIAL_PRINCIPAL_STAFF_LEAVES];
  principalSafeguardingCases: PrincipalSafeguardingCase[] = [...INITIAL_PRINCIPAL_SAFEGUARDING_CASES];
  principalExecutiveApprovals: PrincipalExecutiveApproval[] = [...INITIAL_PRINCIPAL_EXECUTIVE_APPROVALS];
  principalOperationsModules: PrincipalOperationModule[] = [...INITIAL_PRINCIPAL_OPERATIONS_MODULES];
  principalDefaulters = [
    { id: 'def-1', studentName: 'Marcus Brody', gradeSection: 'Grade 9B • Roll #14', overdueDays: 18, amount: '₹14,500', status: '18 days overdue', noticeLevel: 'First Notice' },
    { id: 'def-2', studentName: 'Liam Hemsworth', gradeSection: 'Grade 9B • Roll #09', overdueDays: 24, amount: '₹14,500', status: '2nd notice pending', noticeLevel: 'Second Notice' },
  ];

  // Vice Principal State (Images 1-7)
  vpConflicts: VicePrincipalSchedulingConflict[] = [...INITIAL_VP_CONFLICTS];
  vpLessonPlans: VicePrincipalLessonPlan[] = [...INITIAL_VP_LESSON_PLANS];
  vpExams: VicePrincipalExamSession[] = [...INITIAL_VP_EXAMS];
  vpPublicationQueue: VicePrincipalPublicationQueueItem[] = [...INITIAL_VP_PUBLICATION_QUEUE];
  vpTeachers: VicePrincipalTeacherItem[] = [...INITIAL_VP_TEACHERS];

  // Parent Module State (Images 1-7)
  activeChildId: string = 'child-aarav-sharma';
  parentChildren: ParentChildProfile[] = [...INITIAL_PARENT_CHILDREN];
  parentFees: ParentFeeItem[] = [...INITIAL_PARENT_FEES];
  parentNotices: ParentNoticeItem[] = [...INITIAL_PARENT_NOTICES];
  parentCertificates: ParentCertificateItem[] = [...INITIAL_PARENT_CERTIFICATES];
  parentTransport: ParentTransportTelemetry = { ...INITIAL_PARENT_TRANSPORT };
  parentLeaves: ParentLeaveRequest[] = [...INITIAL_PARENT_LEAVES];
  parentPtms: ParentPtmBooking[] = [...INITIAL_PARENT_PTM_BOOKINGS];

  // Helper to format a username or email into a clean display name
  private formatDisplayName(rawInput: string): string {
    const trimmed = rawInput.trim();
    if (!trimmed) return 'User';
    if (trimmed.includes('@')) {
      const localPart = trimmed.split('@')[0];
      return localPart
        .split(/[._-]+/)
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
    }
    // If the user typed a name like "rahul sharma" or "Rahul", capitalize each word nicely
    return trimmed
      .split(/\s+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // Authentication API
  login(emailOrUsername: string, password?: string, preferredRole?: RoleType): { success: boolean; user?: UserProfile; error?: string } {
    const raw = emailOrUsername.trim();
    const q = raw.toLowerCase();

    const defaultIdentifiers = new Set([
      'stu-2024-8890',
      'student@caspaschool.org',
      'elena.vance',
      'elena vance',
      'teacher@caspaschool.org',
      'mrs.oswald',
      'mrs. oswald',
      'admin@caspaschool.org',
      'arthur.clark',
      'arthur clark',
      'principal@caspaschool.org',
      'dr.mehta',
      'dr. mehta',
      's.jenkins@caspa.edu',
      'dr.sarah.jenkins',
      'dr. sarah jenkins',
      'anita.sharma@caspaschool.org',
      'anita.sharma',
      'mrs. anita sharma',
    ]);

    // 1. Check exact match in registeredUsers first
    const exactAccount = this.registeredUsers.find(
      (u) =>
        u.email.toLowerCase() === q ||
        u.username.toLowerCase() === q ||
        u.fullName.toLowerCase() === q
    );

    // Determine target role
    let targetRole: RoleType = preferredRole || 'PRINCIPAL';
    if (!preferredRole) {
      if (exactAccount) {
        targetRole = exactAccount.roleType;
      } else if (q.includes('vice') || q.includes('vp') || q.includes('jenkins') || q.includes('sarah')) {
        targetRole = 'VICE_PRINCIPAL';
      } else if (q.includes('admin') || q.includes('clark') || q.includes('operations')) {
        targetRole = 'ADMIN';
      } else if (q.includes('student') || q.includes('elena') || q.includes('8890') || q.includes('vance') || q.includes('stu-')) {
        targetRole = 'STUDENT';
      } else if (q.includes('teacher') || q.includes('oswald') || q.includes('faculty')) {
        targetRole = 'TEACHER';
      } else if (q.includes('principal') || q.includes('mehta') || q.includes('sterling')) {
        targetRole = 'PRINCIPAL';
      } else if (q.includes('parent') || q.includes('sharma') || q.includes('anita') || q.includes('aarav') || q.includes('brody') || q.includes('guardian')) {
        targetRole = 'PARENT';
      }
    }

    let matchedUser: UserProfile;

    if (exactAccount && (!preferredRole || exactAccount.roleType === preferredRole)) {
      matchedUser = exactAccount;
    } else if (raw && !defaultIdentifiers.has(q)) {
      // User signed in with their own custom username or email — personalize the module profile with their name!
      const baseTemplate = USERS[targetRole] || USERS.STUDENT;
      const customFullName = this.formatDisplayName(raw);
      const customEmail = raw.includes('@') ? raw : `${raw.toLowerCase().replace(/\s+/g, '.')}@caspaschool.org`;
      matchedUser = {
        ...baseTemplate,
        id: `user-${Date.now()}`,
        username: raw,
        fullName: customFullName,
        email: customEmail,
        roleType: targetRole,
      };
      this.registeredUsers.unshift(matchedUser);
      USERS[targetRole] = matchedUser;
    } else {
      matchedUser = USERS[targetRole] || USERS.PRINCIPAL;
    }

    this.currentUser = matchedUser;
    this.authenticatedUser = matchedUser;
    this.isAuthenticated = true;
    this.logAudit(matchedUser.fullName, matchedUser.roleType, 'USER_LOGIN', 'AUTH', matchedUser.id, `User signed into ${matchedUser.roleType} workspace`);
    return { success: true, user: matchedUser };
  }

  register(username: string, designation: string, email: string, password?: string, roleOverride?: RoleType): { success: boolean; user: UserProfile } {
    const newId = `user-${Date.now()}`;
    const combined = `${designation} ${email} ${username}`.toLowerCase();

    let resolvedRole: RoleType = 'STUDENT';
    if (roleOverride) {
      resolvedRole = roleOverride;
    } else if (combined.includes('vice') || combined.includes('vp')) {
      resolvedRole = 'VICE_PRINCIPAL';
    } else if (combined.includes('principal')) {
      resolvedRole = 'PRINCIPAL';
    } else if (combined.includes('admin') || combined.includes('director')) {
      resolvedRole = 'ADMIN';
    } else if (combined.includes('teacher') || combined.includes('faculty') || combined.includes('educator') || combined.includes('dept')) {
      resolvedRole = 'TEACHER';
    } else if (combined.includes('parent') || combined.includes('guardian')) {
      resolvedRole = 'PARENT';
    } else if (combined.includes('student') || combined.includes('grade') || combined.includes('roll')) {
      resolvedRole = 'STUDENT';
    }

    const templateUser = USERS[resolvedRole] || USERS.STUDENT;
    const formattedName = this.formatDisplayName(username || email);

    const newUser: UserProfile = {
      id: newId,
      email: email.trim() || `${username.toLowerCase().replace(/\s+/g, '.')}@caspaschool.org`,
      username: username.trim(),
      fullName: formattedName,
      roleType: resolvedRole,
      designation: designation.trim() || templateUser.designation,
      campusId: 'campus-central',
      campusName: 'CASPA Central Campus (Main)',
      avatarUrl: templateUser.avatarUrl,
      permissions: [...templateUser.permissions],
    };

    this.registeredUsers.unshift(newUser);
    USERS[resolvedRole] = newUser;
    this.currentUser = newUser;
    this.authenticatedUser = newUser;
    this.isAuthenticated = true;
    this.logAudit(newUser.fullName, newUser.roleType, 'USER_REGISTER', 'AUTH', newId, `User registered new ${resolvedRole} workspace account`);
    return { success: true, user: newUser };
  }

  logout() {
    this.currentUser = null;
    this.authenticatedUser = null;
    this.isAuthenticated = false;
  }

  logAudit(userName: string, userRole: string, action: string, module: string, resourceId: string, details: string) {
    const item: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      userName,
      userRole,
      action,
      module,
      resourceId,
      details,
    };
    this.auditLogs.unshift(item);
  }

  // Student Methods
  submitStudentTask(taskId: string) {
    const task = this.studentTasks.find((t) => t.id === taskId);
    const activeName = this.currentUser?.fullName || 'Student';
    if (task) {
      task.status = 'SUBMITTED';
      task.completedQuestions = task.totalQuestions;
      this.logAudit(activeName, 'STUDENT', 'SUBMIT_HOMEWORK', 'TASKS', task.title, `Uploaded solution for ${task.title}`);
    }
    return task;
  }

  submitAbsenceExcuse(date: string, reason: string) {
    const excuse = { date, reason, status: 'PENDING' as const };
    const activeName = this.currentUser?.fullName || 'Student';
    this.absenceExcuses.unshift(excuse);
    this.logAudit(activeName, 'STUDENT', 'SUBMIT_ABSENCE_EXCUSE', 'ATTENDANCE', date, `Submitted excuse for ${date}: ${reason}`);
    return excuse;
  }

  // Teacher Attendance Methods
  setStudentAttendance(studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') {
    const std = this.teacherStudents.find((s) => s.id === studentId);
    if (std) {
      std.attendanceStatus = status;
      this.logAudit('Mrs. Oswald', 'TEACHER', 'MARK_ATTENDANCE', 'ATTENDANCE', std.fullName, `Marked ${std.fullName} as ${status}`);
    }
    return std;
  }

  markAllStudentsPresent() {
    this.teacherStudents.forEach((s) => {
      s.attendanceStatus = 'PRESENT';
    });
    this.logAudit('Mrs. Oswald', 'TEACHER', 'BATCH_ATTENDANCE', 'ATTENDANCE', 'Grade 9B', 'Marked all 32 students present');
    return this.teacherStudents;
  }

  // Teacher Grading Methods
  updateStudentGrade(studentId: string, score: number | null, note?: string) {
    const std = this.teacherStudents.find((s) => s.id === studentId);
    if (std) {
      std.unitTestScore = score;
      if (note !== undefined) {
        std.instructorNote = note;
        std.hasNote = Boolean(note && note.trim().length > 0);
      }
      this.logAudit('Mrs. Oswald', 'TEACHER', 'GRADE_UPDATE', 'GRADING', std.fullName, `Recorded score ${score ?? '--'}/100`);
    }
    return std;
  }

  createTask(title: string, type: 'HOMEWORK' | 'ASSIGNMENT', gradeSection: string, dueDate: string) {
    const newTask: TeacherTask = {
      id: `task-${Date.now()}`,
      title,
      type,
      gradeSection,
      dueDate,
      submittedCount: 0,
      totalCount: 32,
      status: 'PUBLISHED',
    };
    this.teacherTasks.unshift(newTask);
    this.logAudit('Mrs. Oswald', 'TEACHER', 'CREATE_TASK', 'TASKS', newTask.id, `Created ${type}: ${title}`);
    return newTask;
  }

  sendParentMessage(parentId: string, replyText: string) {
    const parent = this.parentMessages.find((p) => p.id === parentId);
    if (parent) {
      parent.snippet = `You: ${replyText}`;
      parent.isRead = true;
      parent.unreadCount = 0;
      this.logAudit('Mrs. Oswald', 'TEACHER', 'PARENT_MESSAGE', 'COMMS', parent.parentName, `Sent message to ${parent.parentName}`);
    }
    return parent;
  }

  buses: BusVehicle[] = [
    {
      id: 'bus-01',
      busNumber: 'KA-01-EA-4921',
      routeNumber: 'Route 12',
      routeName: 'South Enclave - Metro Hub - Campus',
      driverName: 'Manjunath Gowda',
      driverPhone: '+91 94481 22910',
      currentLocationName: 'Near Metro Gate 4, Outer Ring Rd',
      lat: 12.9279,
      lng: 77.6271,
      speedKmH: 34,
      studentsOnBoard: 28,
      capacity: 35,
      status: 'ON_ROUTE',
      etaMinutes: 14,
      nextStop: 'Silver Oak Apartments',
    },
  ];

  // ================= ADMIN & ENTERPRISE METHODS =================

  admitStudent(data: {
    fullName: string;
    grade: string;
    section: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    busRoute?: string;
  }) {
    const admissionNo = `CASPA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      admissionNo,
      fullName: data.fullName,
      grade: data.grade,
      section: data.section,
      rollNo: this.students.filter(s => s.grade === data.grade && s.section === data.section).length + 1,
      gender: data.gender,
      parentName: data.parentName,
      parentPhone: data.parentPhone,
      parentEmail: data.parentEmail,
      attendancePercentage: 100.0,
      feeOutstanding: 3850,
      busRoute: data.busRoute || 'None',
      status: 'ACTIVE',
    };
    this.students.unshift(newStudent);
    // Create term fee invoice
    this.feeInvoices.unshift({
      id: `inv-${Date.now()}`,
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: newStudent.id,
      studentName: newStudent.fullName,
      gradeSection: `${newStudent.grade} ${newStudent.section}`,
      term: 'Term 2 (Fall 2026)',
      totalAmount: 3850,
      paidAmount: 0,
      balanceDue: 3850,
      dueDate: 'Oct 15, 2026',
      status: 'OVERDUE',
    });
    this.logAudit('Arthur Clark', 'ADMIN', 'ADMIT_STUDENT', 'STUDENTS', newStudent.id, `Admitted ${newStudent.fullName} to ${newStudent.grade} ${newStudent.section}`);
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<Student>) {
    const std = this.students.find(s => s.id === id);
    if (std) {
      Object.assign(std, updates);
      this.logAudit('Arthur Clark', 'ADMIN', 'UPDATE_STUDENT', 'STUDENTS', id, `Updated student record for ${std.fullName}`);
    }
    return std;
  }

  archiveStudent(id: string) {
    const std = this.students.find(s => s.id === id);
    if (std) {
      std.status = 'WITHDRAWN';
      this.logAudit('Arthur Clark', 'ADMIN', 'ARCHIVE_STUDENT', 'STUDENTS', id, `Marked ${std.fullName} as Withdrawn`);
    }
    return std;
  }

  addStaffMember(data: {
    fullName: string;
    designation: string;
    department: AdminStaffMember['department'];
    email: string;
    phone: string;
    qualification: string;
    classesAssigned: string[];
    workloadPeriods: number;
  }) {
    const empId = `EMP-${data.department.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const newStaff: AdminStaffMember = {
      id: `stf-${Date.now()}`,
      employeeId: empId,
      fullName: data.fullName,
      designation: data.designation,
      department: data.department,
      email: data.email,
      phone: data.phone,
      qualification: data.qualification,
      workloadPeriods: data.workloadPeriods || 20,
      classesAssigned: data.classesAssigned || ['Standard Roster'],
      joinDate: 'Oct 2026',
      status: 'ACTIVE',
    };
    this.staffMembers.unshift(newStaff);
    this.logAudit('Arthur Clark', 'ADMIN', 'ONBOARD_STAFF', 'STAFF', newStaff.id, `Onboarded ${newStaff.fullName} (${newStaff.designation})`);
    return newStaff;
  }

  updateStaffMember(id: string, updates: Partial<AdminStaffMember>) {
    const stf = this.staffMembers.find(s => s.id === id);
    if (stf) {
      Object.assign(stf, updates);
      this.logAudit('Arthur Clark', 'ADMIN', 'UPDATE_STAFF', 'STAFF', id, `Updated faculty details for ${stf.fullName}`);
    }
    return stf;
  }

  recordFeePayment(invoiceId: string, amount: number, paymentMethod: string) {
    const inv = this.feeInvoices.find(i => i.id === invoiceId);
    if (inv) {
      inv.paidAmount += amount;
      inv.balanceDue = Math.max(0, inv.totalAmount - inv.paidAmount);
      inv.paymentMethod = paymentMethod;
      inv.lastPaymentDate = 'Today';
      if (inv.balanceDue === 0) {
        inv.status = 'PAID';
      } else {
        inv.status = 'PARTIAL';
      }
      const std = this.students.find(s => s.id === inv.studentId);
      if (std) {
        std.feeOutstanding = Math.max(0, std.feeOutstanding - amount);
      }
      this.logAudit('Arthur Clark', 'ADMIN', 'FEE_PAYMENT', 'FINANCE', inv.invoiceNo, `Recorded $${amount} fee payment for ${inv.studentName} via ${paymentMethod}`);
    }
    return inv;
  }

  updateSafetyIncident(id: string, status: IncidentStatus, note?: string) {
    const inc = this.safetyIncidents.find(i => i.id === id);
    if (inc) {
      inc.status = status;
      inc.updatedAt = 'Just now';
      if (note) {
        inc.investigationNotes.push({
          author: 'Arthur Clark (Admin)',
          note,
          timestamp: 'Just now',
          isConfidential: true,
        });
      }
      this.logAudit('Arthur Clark', 'ADMIN', 'SAFETY_CASE_UPDATE', 'SAFETY', inc.caseNumber, `Updated status to ${status} for Case #${inc.caseNumber}`);
    }
    return inc;
  }

  processApproval(id: string, action: 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED', comment?: string) {
    const app = this.approvals.find(a => a.id === id);
    if (app) {
      app.status = action;
      app.history.push({
        actor: 'Arthur Clark (School Administrator)',
        action,
        timestamp: 'Just now',
        comment: comment || `Action marked by Administration`,
      });
      this.logAudit('Arthur Clark', 'ADMIN', 'PROCESS_APPROVAL', 'APPROVALS', app.id, `${action} requisition: "${app.title}"`);
    }
    return app;
  }

  updateRbacPermission(role: RoleType, moduleId: string, field: 'canView' | 'canCreate' | 'canEdit' | 'canDelete' | 'canApprove' | 'canExport', value: boolean) {
    const user = USERS[role];
    if (user) {
      const perm = user.permissions.find(p => p.module === moduleId);
      if (perm) {
        perm[field] = value;
        this.logAudit('Arthur Clark', 'ADMIN', 'RBAC_UPDATE', 'RBAC', role, `Updated ${role} ${moduleId}.${field} = ${value}`);
      }
    }
  }

  // ================= PRINCIPAL & GOVERNANCE METHODS =================

  dispatchCriticalAlert(alertId: string, actionType: string) {
    const alert = this.principalCriticalAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'RESOLVED';
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'DISPATCH_ALERT', 'DASHBOARD', alertId, `Dispatched action "${alert.actionLabel}" for: ${alert.title}`);
    }
    return alert;
  }

  processPrincipalStaffLeave(leaveId: string, action: 'APPROVED' | 'REJECTED') {
    const leave = this.principalStaffLeaves.find(l => l.id === leaveId);
    if (leave) {
      leave.status = action;
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'LEAVE_DECISION', 'STAFF', leaveId, `${action} leave for ${leave.staffName} (${leave.durationDates})`);
    }
    return leave;
  }

  updateSafeguardingCaseStep(caseId: string, step: number) {
    const item = this.principalSafeguardingCases.find(c => c.id === caseId);
    if (item) {
      item.currentStep = step;
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'SAFEGUARDING_STEP', 'SAFETY', caseId, `Advanced ${item.caseNo} to stage ${step}`);
    }
    return item;
  }

  processExecutiveApprovalAction(approvalId: string, action: 'APPROVED' | 'CHANGES_REQUESTED' | 'REJECTED', note?: string) {
    const item = this.principalExecutiveApprovals.find(a => a.id === approvalId);
    if (item) {
      item.status = action;
      item.actionNote = note;
      if (item.steps && action === 'APPROVED') {
        item.steps.forEach(s => s.completed = true);
      }
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'EXECUTIVE_APPROVAL', 'APPROVALS', approvalId, `${action} executive requisition: "${item.title}"`);
    }
    return item;
  }

  triggerEmergencyProtocol(protocol: 'LOCKDOWN' | 'BROADCAST' | 'EVACUATE', details?: string) {
    const eventId = `emg-${Date.now()}`;
    this.logAudit('Dr. Mehta', 'PRINCIPAL', 'EMERGENCY_TRIGGER', 'SAFETY', eventId, `Initiated ${protocol} protocol across campus`);
    return { success: true, protocol, timestamp: 'Just now' };
  }

  sendFeeReminder(defaulterId: string) {
    const defaulter = this.principalDefaulters.find(d => d.id === defaulterId);
    if (defaulter) {
      if (defaulter.noticeLevel === 'First Notice') {
        defaulter.noticeLevel = 'Second Notice';
        defaulter.status = '2nd notice issued';
      } else {
        defaulter.noticeLevel = 'Formal Escalation';
        defaulter.status = 'Escalated to Executive Board';
      }
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'FEE_REMINDER', 'FINANCE', defaulterId, `Dispatched formal fee reminder notice to guardian of ${defaulter.studentName} (${defaulter.noticeLevel})`);
    }
    return defaulter;
  }

  getStaffMemberById(id: string) {
    return this.staffMembers.find(s => s.id === id);
  }

  addStaffObservationNote(staffId: string, noteData: { author: string; rating: number; cycle: string; notes: string; commendation?: string }) {
    const stf = this.staffMembers.find(s => s.id === staffId);
    if (stf) {
      if (!stf.observationNotes) stf.observationNotes = [];
      const newNote = {
        id: `obs-${Date.now()}`,
        author: noteData.author || 'Dr. Mehta (Principal)',
        date: 'Today',
        cycle: noteData.cycle || 'Observational Appraisal',
        rating: noteData.rating,
        notes: noteData.notes,
        commendation: noteData.commendation,
      };
      stf.observationNotes.unshift(newNote);
      stf.evaluationScore = Number((stf.observationNotes.reduce((acc, curr) => acc + curr.rating, 0) / stf.observationNotes.length).toFixed(1));
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'STAFF_OBSERVATION', 'STAFF', staffId, `Added observation appraisal for ${stf.fullName} (Rating: ${noteData.rating})`);
      return newNote;
    }
    return null;
  }

  updateStaffWorkload(staffId: string, workloadPeriods: number, classesAssigned: string[]) {
    const stf = this.staffMembers.find(s => s.id === staffId);
    if (stf) {
      stf.workloadPeriods = workloadPeriods;
      stf.classesAssigned = classesAssigned;
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'UPDATE_WORKLOAD', 'STAFF', staffId, `Updated teaching workload for ${stf.fullName} (${workloadPeriods} periods/week)`);
    }
    return stf;
  }

  updateStaffLiveStatus(staffId: string, liveStatusText: string, roomLocation: string) {
    const stf = this.staffMembers.find(s => s.id === staffId);
    if (stf) {
      stf.liveStatusText = liveStatusText;
      stf.roomLocation = roomLocation;
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'UPDATE_LOCATION', 'STAFF', staffId, `Updated live location for ${stf.fullName} to ${roomLocation}`);
    }
    return stf;
  }

  issueStaffCommendation(staffId: string, commendationTitle: string, note: string) {
    const stf = this.staffMembers.find(s => s.id === staffId);
    if (stf) {
      stf.badge = commendationTitle;
      if (!stf.observationNotes) stf.observationNotes = [];
      stf.observationNotes.unshift({
        id: `obs-com-${Date.now()}`,
        author: 'Dr. Mehta (Principal)',
        date: 'Today',
        cycle: 'Executive Commendation Citation',
        rating: 5.0,
        notes: note,
        commendation: commendationTitle,
      });
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'COMMENDATION', 'STAFF', staffId, `Conferred commendation "${commendationTitle}" upon ${stf.fullName}`);
    }
    return stf;
  }

  updateSafeguardingCaseDetails(caseId: string, note: string) {
    const item = this.principalSafeguardingCases.find(c => c.id === caseId);
    if (item) {
      if (note) {
        item.details = (item.details ? item.details + '\n\n' : '') + `[Principal Directive]: ${note}`;
      }
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'SAFEGUARDING_UPDATE', 'SAFETY', caseId, `Updated case dossier for ${item.caseNo}`);
    }
    return item;
  }

  closeSafeguardingCase(caseId: string, resolutionSummary: string) {
    const item = this.principalSafeguardingCases.find(c => c.id === caseId);
    if (item) {
      item.currentStep = 4;
      item.details = (item.details ? item.details + '\n\n' : '') + `[Case Closed by Principal]: ${resolutionSummary}`;
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'SAFEGUARDING_CLOSE', 'SAFETY', caseId, `Closed safeguarding case ${item.caseNo}`);
    }
    return item;
  }

  recordCohortIntervention(cohortName: string, intervention: { targetFloor: number; remediationAction: string; assignedMentor: string; parentNoticeDispatched: boolean }) {
    this.logAudit(
      'Dr. Mehta',
      'PRINCIPAL',
      'COHORT_INTERVENTION',
      'ACADEMICS',
      cohortName,
      `Authorized academic remediation for ${cohortName}: Floor target ${intervention.targetFloor}%, Mentor: ${intervention.assignedMentor}. Action: ${intervention.remediationAction}`
    );
    return true;
  }

  recordFeeConcession(studentId: string, waiverPercent: number, reason: string) {
    const defaulter = this.principalDefaulters.find(d => d.id === studentId);
    if (defaulter) {
      const origNum = parseInt(defaulter.amount.replace(/[^0-9]/g, '')) || 0;
      const discounted = Math.round(origNum * (1 - waiverPercent / 100));
      defaulter.amount = `₹${discounted.toLocaleString('en-IN')}`;
      if (waiverPercent === 100 || discounted <= 0) {
        defaulter.status = 'Fully Cleared / 100% Bursary';
        defaulter.noticeLevel = 'Bursary Granted';
      } else {
        defaulter.status = `Relief Granted (${waiverPercent}% waiver)`;
        defaulter.noticeLevel = 'Restructured';
      }
      this.logAudit(
        'Dr. Mehta',
        'PRINCIPAL',
        'FEE_CONCESSION',
        'FINANCE',
        studentId,
        `Approved ${waiverPercent}% financial relief / bursary for ${defaulter.studentName}. Reason: ${reason}`
      );
    }
    return defaulter;
  }

  recordFeeNoticeDispatch(studentId: string, channel: string, customNotice?: string) {
    const defaulter = this.principalDefaulters.find(d => d.id === studentId);
    if (defaulter) {
      defaulter.noticeLevel = `Notice Dispatched via ${channel}`;
      this.logAudit(
        'Dr. Mehta',
        'PRINCIPAL',
        'FEE_NOTICE_DISPATCH',
        'FINANCE',
        studentId,
        `Dispatched formal fee reminder notice to guardians of ${defaulter.studentName} via ${channel}. ${customNotice ? `Directive: ${customNotice}` : ''}`
      );
    }
    return defaulter;
  }

  dispatchSubsystemAction(subsystemId: string, actionName: string, detail: string) {
    this.logAudit(
      'Dr. Mehta',
      'PRINCIPAL',
      'OPERATION_DIRECTIVE',
      'OPERATIONS',
      subsystemId,
      `Executed operational directive [${subsystemId.toUpperCase()}]: ${actionName} - ${detail}`
    );
    return true;
  }

  // ================= VICE PRINCIPAL WORKSPACE METHODS =================

  resolveVpConflict(conflictId: string, resolutionAction: string) {
    const conflict = this.vpConflicts.find(c => c.id === conflictId);
    if (conflict) {
      conflict.status = 'RESOLVED';
      conflict.resolutionActionText = resolutionAction;
      this.logAudit(
        'Dr. Sarah Jenkins',
        'VICE_PRINCIPAL',
        'RESOLVE_TIMETABLE_CONFLICT',
        'TIMETABLE',
        conflictId,
        `Resolved scheduling conflict "${conflict.title}": ${resolutionAction}`
      );
    }
    return conflict;
  }

  updateVpLessonPlanStatus(planId: string, status: 'APPROVED' | 'NEEDS_REVISION' | 'REJECTED', note?: string) {
    const plan = this.vpLessonPlans.find(p => p.id === planId);
    if (plan) {
      plan.status = status;
      if (note) plan.feedbackNote = note;
      this.logAudit(
        'Dr. Sarah Jenkins',
        'VICE_PRINCIPAL',
        'LESSON_PLAN_REVIEW',
        'ACADEMICS',
        planId,
        `Updated lesson plan "${plan.title}" to status ${status}. Note: ${note || 'Standard departmental review'}`
      );
    }
    return plan;
  }

  publishVpExamResult(queueItemId: string) {
    const item = this.vpPublicationQueue.find(q => q.id === queueItemId);
    if (item) {
      item.isPublished = true;
      item.publishedTimestamp = 'Just now • Digitally Signed';
      this.logAudit(
        'Dr. Sarah Jenkins',
        'VICE_PRINCIPAL',
        'PUBLISH_EXAM_RESULTS',
        'EXAMINATIONS',
        queueItemId,
        `Authorized official publication of final results for "${item.title}". Transcripts pushed with institutional cryptographic seal.`
      );
    }
    return item;
  }

  pingTeacherReminder(teacherId: string, customMessage?: string) {
    const teacher = this.vpTeachers.find(t => t.id === teacherId);
    if (teacher) {
      this.logAudit(
        'Dr. Sarah Jenkins',
        'VICE_PRINCIPAL',
        'TEACHER_REMINDER_PING',
        'FACULTY',
        teacherId,
        `Dispatched priority syllabus filing reminder to ${teacher.name}. ${customMessage ? `Directive: ${customMessage}` : ''}`
      );
    }
    return teacher;
  }

  addPeriodOverride(data: { period: string; class: string; room: string; teacher: string }) {
    this.logAudit(
      'Dr. Sarah Jenkins',
      'VICE_PRINCIPAL',
      'TIMETABLE_PERIOD_OVERRIDE',
      'TIMETABLE',
      data.period,
      `Authorized timetable period override: ${data.period} for ${data.class} in ${data.room} assigned to ${data.teacher}`
    );
    return true;
  }

  // ================= PARENT MODULE METHODS (Images 1-7) =================
  switchActiveChild(childId: string) {
    const child = this.parentChildren.find(c => c.id === childId);
    if (child) {
      this.activeChildId = childId;
      this.logAudit(
        'Mrs. Anita Sharma',
        'PARENT',
        'SWITCH_CHILD_PROFILE',
        'PARENT_PORTAL',
        childId,
        `Switched active parent portal view to ${child.fullName} (${child.grade}-${child.section})`
      );
    }
    return child;
  }

  payParentFee(feeId: string, paymentMethod: string = 'UPI / Netbanking') {
    const fee = this.parentFees.find(f => f.id === feeId);
    if (fee && fee.status === 'PENDING') {
      fee.status = 'PAID';
      fee.paidOn = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      fee.receiptNo = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      fee.paymentMethod = paymentMethod;

      // Update child pending dues
      const child = this.parentChildren.find(c => c.id === fee.childId);
      if (child) {
        child.pendingDues = Math.max(0, child.pendingDues - fee.amount);
      }

      this.logAudit(
        'Mrs. Anita Sharma',
        'PARENT',
        'FEE_PAYMENT',
        'FINANCE',
        feeId,
        `Cleared invoice "${fee.title}" for ₹${fee.amount.toLocaleString('en-IN')} via ${paymentMethod}. Generated receipt ${fee.receiptNo}`
      );
    }
    return fee;
  }

  payAllPendingFees(childId: string, paymentMethod: string = 'UPI / Razorpay') {
    const dues = this.parentFees.filter(f => f.childId === childId && f.status === 'PENDING');
    const totalPaid = dues.reduce((acc, curr) => acc + curr.amount, 0);
    const receiptNo = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const paidOn = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    dues.forEach(f => {
      f.status = 'PAID';
      f.paidOn = paidOn;
      f.receiptNo = receiptNo;
      f.paymentMethod = paymentMethod;
    });

    const child = this.parentChildren.find(c => c.id === childId);
    if (child) {
      child.pendingDues = 0;
    }

    this.logAudit(
      'Mrs. Anita Sharma',
      'PARENT',
      'FEE_SETTLEMENT_ALL',
      'FINANCE',
      childId,
      `Settled all pending dues (₹${totalPaid.toLocaleString('en-IN')}) for ${child?.fullName || 'child'}. Generated consolidated receipt ${receiptNo}`
    );
    return { totalPaid, receiptNo, count: dues.length };
  }

  acknowledgeParentNotice(noticeId: string) {
    const notice = this.parentNotices.find(n => n.id === noticeId);
    if (notice) {
      notice.isAcknowledged = true;
      notice.acknowledgedTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.logAudit(
        'Mrs. Anita Sharma',
        'PARENT',
        'NOTICE_ACKNOWLEDGED',
        'NOTICES',
        noticeId,
        `Parent acknowledged receipt of critical notice: "${notice.title}" at ${notice.acknowledgedTimestamp}`
      );
    }
    return notice;
  }

  registerParentNoticeEvent(noticeId: string) {
    const notice = this.parentNotices.find(n => n.id === noticeId);
    if (notice) {
      notice.isRegistered = true;
      this.logAudit(
        'Mrs. Anita Sharma',
        'PARENT',
        'EVENT_REGISTRATION',
        'EVENTS',
        noticeId,
        `Completed formal event registration for "${notice.title}". Confirmation email dispatched.`
      );
    }
    return notice;
  }

  requestParentCertificate(data: { childId: string; type: ParentCertificateItem['type']; purpose: string }) {
    const child = this.parentChildren.find(c => c.id === data.childId) || this.parentChildren[0];
    const typeTitles: Record<ParentCertificateItem['type'], string> = {
      BONAFIDE: 'Bonafide Student Certificate',
      TRANSFER: 'Transfer Certificate (TC)',
      CHARACTER: 'Character & Conduct Certificate',
      STUDY: 'Study & Medium of Instruction Certificate',
      TUITION_FEE: 'Tuition Fee Certificate (FY 2026-27)',
      NOC: 'No Objection Certificate (NOC)',
    };

    const newCert: ParentCertificateItem = {
      id: `cert-${Date.now()}`,
      childId: child.id,
      childName: child.fullName,
      title: typeTitles[data.type] || 'Student Certificate',
      type: data.type,
      purpose: data.purpose || 'Official Documentation & Records',
      status: 'READY',
      requestDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      issuedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      verificationCode: `CASPA-${data.type.slice(0, 3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      downloadUrl: '#',
    };

    this.parentCertificates.unshift(newCert);
    this.logAudit(
      'Mrs. Anita Sharma',
      'PARENT',
      'CERTIFICATE_GENERATED',
      'VAULT',
      newCert.id,
      `Generated verified ${newCert.title} for ${child.fullName}. Verification code: ${newCert.verificationCode}`
    );
    return newCert;
  }

  applyParentStudentLeave(data: { childId: string; startDate: string; endDate: string; reason: string; type: ParentLeaveRequest['type'] }) {
    const child = this.parentChildren.find(c => c.id === data.childId) || this.parentChildren[0];
    const newLeave: ParentLeaveRequest = {
      id: `leave-${Date.now()}`,
      childId: child.id,
      childName: child.fullName,
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
      type: data.type,
      status: 'PENDING',
      appliedDate: new Date().toISOString().split('T')[0],
      teacherRemark: 'Pending review by Class Teacher ' + child.classTeacher,
    };

    this.parentLeaves.unshift(newLeave);
    this.logAudit(
      'Mrs. Anita Sharma',
      'PARENT',
      'STUDENT_LEAVE_APPLIED',
      'ATTENDANCE',
      newLeave.id,
      `Submitted leave request for ${child.fullName} from ${data.startDate} to ${data.endDate}. Reason: ${data.reason}`
    );
    return newLeave;
  }

  bookParentPtmSlot(data: { childId: string; timeSlot: string; teacherName: string; subject: string; venue?: string }) {
    const child = this.parentChildren.find(c => c.id === data.childId) || this.parentChildren[0];
    const newBooking: ParentPtmBooking = {
      id: `ptm-${Date.now()}`,
      childId: child.id,
      childName: child.fullName,
      dateStr: 'Saturday, Oct 15, 2026',
      timeSlot: data.timeSlot,
      teacherName: data.teacherName,
      subject: data.subject,
      venue: data.venue || 'Academic Block A, Room 102',
      status: 'BOOKED',
      notes: `15-minute conference booked for ${child.fullName}`,
    };

    this.parentPtms.unshift(newBooking);
    this.logAudit(
      'Mrs. Anita Sharma',
      'PARENT',
      'PTM_SLOT_BOOKED',
      'COMMUNICATION',
      newBooking.id,
      `Booked PTM conference slot with ${data.teacherName} (${data.timeSlot}) for ${child.fullName}`
    );
    return newBooking;
  }

  linkNewChild(data: { fullName: string; grade: string; section: string; rollNo: number; curriculum: 'CBSE' | 'IB' | 'ICSE' }) {
    const newChild: ParentChildProfile = {
      id: `child-${Date.now()}`,
      fullName: data.fullName,
      grade: data.grade,
      section: data.section,
      curriculum: data.curriculum,
      rollNo: data.rollNo,
      avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      attendancePercent: 95.0,
      totalDays: 51,
      presentDays: 48,
      pendingDues: 0,
      dueDate: 'Cleared',
      gpa: '9.0 GPA',
      rank: 'Top 5',
      house: 'Falcons',
      bloodGroup: 'B+',
      classTeacher: 'Mrs. Oswald',
      classTeacherEmail: 'mrs.oswald@caspaschool.org',
      busRoute: 'Route 4B',
      busStop: 'Green Glen Junction',
      emergencyContact: '+91 98450 67890',
      academicPerformance: [
        { subject: 'Mathematics', score: 90, grade: 'A1', trend: 'stable' },
        { subject: 'Science', score: 88, grade: 'A2', trend: 'up' },
        { subject: 'English', score: 92, grade: 'A1', trend: 'stable' },
      ],
      teacherRemarks: 'Linked student profile. Academic records verified with central registry.',
    };

    this.parentChildren.push(newChild);
    this.logAudit(
      'Mrs. Anita Sharma',
      'PARENT',
      'LINK_CHILD_PROFILE',
      'RECORDS',
      newChild.id,
      `Linked new student record: ${newChild.fullName} (${newChild.grade}-${newChild.section}, ${newChild.curriculum})`
    );
    return newChild;
  }

  getDashboardMetrics() {
    return {
      kpis: {
        totalStudents: 2450,
        attendanceTodayPercent: 96.4,
        feeCollectionRate: 88.2,
        outstandingFeesAmount: 142500,
        activeSafetyAlerts: 1,
        fleetTotal: 24,
        fleetActive: 24,
        hostelOccupancyPercent: 82.5,
        staffAttendancePercent: 98.1,
      },
      agendaToday: [
        { time: '09:00 AM', title: 'Senior Secondary Assembly', location: 'Auditorium Hall' },
        { time: '11:30 AM', title: 'Anti-Ragging Squad Review', location: 'Conference Room B' },
      ],
      pendingApprovalsCount: 3,
    };
  }
}

export const db = new DatabaseStore();
