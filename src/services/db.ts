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
  StudentDateAttendanceEntry,
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
  StaffPayrollRecord,
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
  HostelBedRecord,
  HostelMovementRecord,
  HostelVisitorRecord,
  LibraryBookRecord,
  InventoryAssetRecord,
  AdmissionLeadRecord,
  AlumniProfileRecord,
  CampusEventClubRecord,
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
    id: 'st-math-1',
    teacherTaskId: 'task-1',
    assignedByTeacher: 'Mrs. Oswald',
    gradeSection: 'Grade 9B',
    subject: 'MATHEMATICS • GRADE 9B',
    unit: 'Ch. 4.2 Quadratics',
    title: 'Quadratic Equations Practice Sheet',
    description: 'Assigned by Mrs. Oswald (Grade 9B). Solve factorization problems 1–15 and upload your solution sheet.',
    dueDate: 'Due Sep 25, 2026',
    isDueToday: true,
    status: 'PENDING',
    completedQuestions: 10,
    totalQuestions: 15,
    resourceFileName: 'Grade9B_Quadratics_Ch4.pdf',
    resourceFileSize: '1.2 MB',
  },
  {
    id: 'st-1',
    teacherTaskId: 'task-4',
    assignedByTeacher: 'Dr. Alistair Ross',
    gradeSection: 'Grade 9B',
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
    teacherTaskId: 'task-4',
    assignedByTeacher: 'Mrs. Oswald',
    gradeSection: 'Grade 9B',
    subject: 'CALCULUS BC',
    unit: 'Unit 7',
    title: 'Integration by Parts Worksheet',
    description: 'Period 2 • Complete problems 1-12 with all steps written clearly.',
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
    linkedStudentTaskId: 'st-math-1',
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
    linkedStudentTaskId: 'st-1',
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
    id: 'leave-oswald-1',
    staffId: 'stf-1',
    staffName: 'Mrs. Oswald',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Duty',
    durationDates: 'Oct 04 (1d)',
    designationDept: 'Mathematics Lead • Grade 9B Tutor',
    note: 'State Mathematics Olympiad Jury Panel • Substitute: Mr. Vance',
    status: 'PENDING',
    appliedAt: 'Today, 08:45 AM',
  },
  {
    id: 'leave-1',
    staffId: 'stf-2',
    staffName: 'Mr. Charles Davis',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Casual',
    durationDates: 'Sep 24–25 (2d)',
    designationDept: 'Grade 10 Tutor • English Dept',
    note: 'Substitute cover confirmed: Mrs. Higgins (P2, P4)',
    status: 'PENDING',
    appliedAt: 'Yesterday',
  },
  {
    id: 'leave-2',
    staffId: 'stf-3',
    staffName: 'Ms. Rachel Higgins',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Medical',
    durationDates: 'Sep 24 (1d)',
    designationDept: 'Physics Faculty • AP Level',
    note: '⚠️ Lab session cover pending allocation',
    status: 'PENDING',
    appliedAt: 'Yesterday',
  },
  {
    id: 'leave-3',
    staffId: 'stf-4',
    staffName: 'Officer Davis',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    leaveType: 'Duty',
    durationDates: 'Sep 26 (Half-day)',
    designationDept: 'Campus Safety & Transport Lead',
    note: 'Regional transport regulatory summit attendance',
    status: 'PENDING',
    appliedAt: '2d ago',
  },
];

export const INITIAL_STAFF_PAYROLL_RECORDS: StaffPayrollRecord[] = [
  {
    id: 'pay-stf-1',
    staffId: 'stf-1',
    employeeId: 'EMP-MATH-01',
    staffName: 'Mrs. Oswald',
    designation: 'Head of Mathematics & Grade 9B Class Tutor',
    department: 'Mathematics',
    salaryGrade: 'Grade IV Senior Master Faculty',
    monthlySalaryNumeric: 125000,
    monthlySalaryFormatted: '₹1,25,000',
    bankName: 'HDFC Bank',
    accountNumberMasked: 'A/C •••• 4821',
    ifscCode: 'HDFC0001204',
    monthYear: 'October 2026',
    status: 'PENDING_DISBURSEMENT',
  },
  {
    id: 'pay-stf-2',
    staffId: 'stf-2',
    employeeId: 'EMP-ENG-03',
    staffName: 'Mr. Charles Davis',
    designation: 'Senior Faculty - English Literature & Grade 10 Tutor',
    department: 'Language',
    salaryGrade: 'Grade III Faculty Lead',
    monthlySalaryNumeric: 115000,
    monthlySalaryFormatted: '₹1,15,000',
    bankName: 'ICICI Bank',
    accountNumberMasked: 'A/C •••• 7739',
    ifscCode: 'ICIC0000412',
    monthYear: 'October 2026',
    status: 'PAID_TO_BANK',
    utrNumber: 'NEFT2026991842',
    disbursedAt: 'Oct 01, 2026 • 10:15 AM',
    disbursedBy: 'Dr. Mehta (Principal)',
  },
  {
    id: 'pay-stf-3',
    staffId: 'stf-3',
    employeeId: 'EMP-SCI-05',
    staffName: 'Ms. Rachel Higgins',
    designation: 'Physics Faculty & AP Laboratory Director',
    department: 'Science',
    salaryGrade: 'Grade III Faculty Specialist',
    monthlySalaryNumeric: 118000,
    monthlySalaryFormatted: '₹1,18,000',
    bankName: 'State Bank of India',
    accountNumberMasked: 'A/C •••• 3092',
    ifscCode: 'SBIN0004419',
    monthYear: 'October 2026',
    status: 'PENDING_DISBURSEMENT',
  },
  {
    id: 'pay-stf-4',
    staffId: 'stf-4',
    employeeId: 'EMP-SEC-01',
    staffName: 'Officer Davis',
    designation: 'Campus Safety & Transport Lead',
    department: 'Transport',
    salaryGrade: 'Grade II Security Director',
    monthlySalaryNumeric: 88000,
    monthlySalaryFormatted: '₹88,000',
    bankName: 'Axis Bank',
    accountNumberMasked: 'A/C •••• 9120',
    ifscCode: 'UTIB0000811',
    monthYear: 'October 2026',
    status: 'PAID_TO_BANK',
    utrNumber: 'NEFT2026991899',
    disbursedAt: 'Oct 01, 2026 • 10:15 AM',
    disbursedBy: 'Dr. Mehta (Principal)',
  },
  {
    id: 'pay-stf-5',
    staffId: 'stf-5',
    employeeId: 'EMP-MED-01',
    staffName: 'Dr. Robert Vance',
    designation: 'Campus Health & Clinic Officer',
    department: 'Administration',
    salaryGrade: 'Grade IV Medical Officer',
    monthlySalaryNumeric: 135000,
    monthlySalaryFormatted: '₹1,35,000',
    bankName: 'HDFC Bank',
    accountNumberMasked: 'A/C •••• 5510',
    ifscCode: 'HDFC0001204',
    monthYear: 'October 2026',
    status: 'PAID_TO_BANK',
    utrNumber: 'NEFT2026991912',
    disbursedAt: 'Oct 01, 2026 • 10:18 AM',
    disbursedBy: 'Dr. Mehta (Principal)',
  },
  {
    id: 'pay-stf-6',
    staffId: 'stf-6',
    employeeId: 'EMP-SCI-01',
    staffName: 'Dr. Sunita Verma',
    designation: 'Natural Sciences Head & AP Curriculum Chair',
    department: 'Science',
    salaryGrade: 'Grade V Senior Academic Chair',
    monthlySalaryNumeric: 140000,
    monthlySalaryFormatted: '₹1,40,000',
    bankName: 'Kotak Mahindra Bank',
    accountNumberMasked: 'A/C •••• 6604',
    ifscCode: 'KKBK0008122',
    monthYear: 'October 2026',
    status: 'PENDING_DISBURSEMENT',
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
    id: 'exec-app-4',
    initials: 'MO',
    avatarBg: 'bg-emerald-100 text-emerald-800',
    requesterName: 'Mrs. Oswald',
    requesterRole: 'Department of Mathematics (Teacher)',
    requesterRoleType: 'TEACHER',
    categoryBadge: 'Academic Blueprint',
    isEmergency: false,
    slaString: '2h SLA left',
    title: 'Grade 9B Remedial Math Blueprint & Grant Revision',
    description: 'Algebra II remedial curriculum with 4-week diagnostic milestone tracking and workbook printing requisition.',
    amount: '₹12,500',
    steps: [
      { name: 'Submitted', completed: true },
      { name: 'Principal Review', completed: false, current: true },
      { name: 'Final Decision', completed: false },
    ],
    status: 'PENDING',
    submittedAt: 'Today, 09:15 AM',
  },
  {
    id: 'exec-app-2',
    initials: 'EV',
    avatarBg: 'bg-sky-100 text-sky-800',
    requesterName: 'Elena Vance',
    requesterRole: 'Grade 9B • Roll No. 14 (Student)',
    requesterRoleType: 'STUDENT',
    categoryBadge: 'Fee Concession',
    isEmergency: false,
    slaString: '1d SLA • Priority Merit Review',
    title: 'Merit Scholarship & Robotics Club Grant (Elena Vance)',
    description: 'Sibling & National Debate Merit Tier 2 Adjustment for Semester 2. Applied relief: 15% tuition concession (₹18,500) verified with parent affidavit.',
    amount: '₹18,500',
    detailsBox: {
      label: 'Accounts ledger verified',
      value: 'Rank #2 GPA 3.90 Verified',
      badge: 'Verified',
    },
    steps: [
      { name: 'Submitted', completed: true },
      { name: 'Principal Review', completed: false, current: true },
      { name: 'Final Decision', completed: false },
    ],
    status: 'PENDING',
    submittedAt: 'Yesterday, 04:20 PM',
  },
  {
    id: 'exec-app-1',
    initials: 'OD',
    avatarBg: 'bg-rose-100 text-rose-800',
    requesterName: 'Officer Davis',
    requesterRole: 'Campus Safety & Transit (Admin)',
    requesterRoleType: 'ADMIN',
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
    submittedAt: '30m ago',
  },
  {
    id: 'exec-app-3',
    initials: 'AS',
    avatarBg: 'bg-indigo-100 text-indigo-800',
    requesterName: 'Mrs. Anita Sharma',
    requesterRole: 'Parent of Aarav (10-B) & Ananya (7-A)',
    requesterRoleType: 'PARENT',
    categoryBadge: 'Admission / Transfer',
    isEmergency: false,
    slaString: '4h ago',
    title: 'Inter-House & Olympiad Travel Exemption Request',
    description: 'Executive authorization requested for Aarav Sharma (10-B) to represent CASPA at the National STEM Robotics Championship.',
    detailsBox: {
      label: 'Faculty Nominated',
      value: 'Endorsed by Mrs. Oswald',
      badge: 'Olympiad',
    },
    steps: [
      { name: 'Submitted', completed: true },
      { name: 'Principal Review', completed: false, current: true },
      { name: 'Final Decision', completed: false },
    ],
    status: 'PENDING',
    submittedAt: '4h ago',
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
  studentAttendanceLedger: StudentDateAttendanceEntry[] = [
    {
      id: 'att-seed-23-elena',
      studentId: 'ts-5',
      studentName: 'Elena Vance',
      gradeSection: 'Grade 9B',
      rollNo: 14,
      date: '2026-09-23',
      dayNumber: 23,
      status: 'PRESENT',
      markedBy: 'Mrs. Oswald',
      markedAt: '09:05 AM',
      periodSubject: 'Period 1 • Mathematics',
    },
    {
      id: 'att-seed-22-elena',
      studentId: 'ts-5',
      studentName: 'Elena Vance',
      gradeSection: 'Grade 9B',
      rollNo: 14,
      date: '2026-09-22',
      dayNumber: 22,
      status: 'LATE',
      markedBy: 'Mrs. Oswald',
      markedAt: '09:12 AM',
      periodSubject: 'Period 1 • Mathematics',
    },
    {
      id: 'att-seed-14-elena',
      studentId: 'ts-5',
      studentName: 'Elena Vance',
      gradeSection: 'Grade 9B',
      rollNo: 14,
      date: '2026-09-14',
      dayNumber: 14,
      status: 'ABSENT',
      markedBy: 'Mrs. Oswald',
      markedAt: '09:00 AM',
      periodSubject: 'Period 1 • Mathematics',
    },
    {
      id: 'att-seed-23-marcus',
      studentId: 'ts-2',
      studentName: 'Marcus Brody',
      gradeSection: 'Grade 9B',
      rollNo: 3,
      date: '2026-09-23',
      dayNumber: 23,
      status: 'ABSENT',
      markedBy: 'Mrs. Oswald',
      markedAt: '09:05 AM',
      periodSubject: 'Period 1 • Mathematics',
    },
    {
      id: 'att-seed-23-aria',
      studentId: 'ts-1',
      studentName: 'Aria Montgomery',
      gradeSection: 'Grade 9B',
      rollNo: 1,
      date: '2026-09-23',
      dayNumber: 23,
      status: 'LATE',
      markedBy: 'Mrs. Oswald',
      markedAt: '09:08 AM',
      periodSubject: 'Period 1 • Mathematics',
    },
  ];
  absenceExcuses: {
    id: string;
    studentName: string;
    gradeSection: string;
    rollNo?: string;
    date: string;
    reason: string;
    attachmentName?: string;
    submittedAt: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    reviewedBy?: string;
    reviewedAt?: string;
    teacherNote?: string;
  }[] = [
    {
      id: 'exc-seed-1',
      studentName: 'Elena Vance',
      gradeSection: 'Grade 9B',
      rollNo: '14',
      date: 'Sep 14, 2026',
      reason: 'Flu & Doctor Consultation Note',
      attachmentName: 'Medical_Certificate_Sep14.pdf',
      submittedAt: 'Sep 14, 2026 • 08:15 AM',
      status: 'APPROVED',
      reviewedBy: 'Mrs. Oswald (Class Teacher)',
      reviewedAt: 'Sep 14, 2026 • 09:10 AM',
      teacherNote: 'Medical certificate verified. Absence officially excused.',
    },
  ];

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
  staffPayrollRecords: StaffPayrollRecord[] = [...INITIAL_STAFF_PAYROLL_RECORDS];
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

  // Enterprise ERP Shared State (Hostel, Library, Inventory, Admissions CRM, Alumni, Events/Clubs)
  hostelBeds: HostelBedRecord[] = [
    {
      bedId: 'A-101-B1',
      building: 'Block A (Senior Boys)',
      floor: 'Floor 1',
      room: 'Room 101',
      wardenName: 'Prof. S. R. Murthy',
      studentName: 'Rohan Deshmukh',
      grade: '11-A',
      attendanceStatus: 'PRESENT',
      lastUpdated: 'Today • 07:30 AM',
    },
    {
      bedId: 'A-101-B2',
      building: 'Block A (Senior Boys)',
      floor: 'Floor 1',
      room: 'Room 101',
      wardenName: 'Prof. S. R. Murthy',
      studentName: 'Marcus Brody',
      grade: '9-B',
      attendanceStatus: 'OUTING',
      lastUpdated: 'Today • 02:30 PM',
    },
    {
      bedId: 'A-102-B1',
      building: 'Block A (Senior Boys)',
      floor: 'Floor 1',
      room: 'Room 102',
      wardenName: 'Prof. S. R. Murthy',
      studentName: 'Devon Patel',
      grade: '10-A',
      attendanceStatus: 'PRESENT',
      lastUpdated: 'Today • 07:30 AM',
    },
    {
      bedId: 'A-102-B2',
      building: 'Block A (Senior Boys)',
      floor: 'Floor 1',
      room: 'Room 102',
      wardenName: 'Prof. S. R. Murthy',
      studentName: null,
      grade: 'Available',
      attendanceStatus: 'PRESENT',
    },
    {
      bedId: 'B-201-B1',
      building: 'Block B (Senior Girls)',
      floor: 'Floor 2',
      room: 'Room 201',
      wardenName: 'Dr. Ananya Sen',
      studentName: 'Elena Vance',
      grade: '9-B',
      attendanceStatus: 'PRESENT',
      lastUpdated: 'Today • 07:30 AM',
    },
    {
      bedId: 'B-201-B2',
      building: 'Block B (Senior Girls)',
      floor: 'Floor 2',
      room: 'Room 201',
      wardenName: 'Dr. Ananya Sen',
      studentName: 'Sophia Chen',
      grade: '9-B',
      attendanceStatus: 'MEDICAL',
      lastUpdated: 'Today • 08:15 AM',
    },
    {
      bedId: 'B-202-B1',
      building: 'Block B (Senior Girls)',
      floor: 'Floor 2',
      room: 'Room 202',
      wardenName: 'Dr. Ananya Sen',
      studentName: 'Aria Montgomery',
      grade: '9-B',
      attendanceStatus: 'PRESENT',
      lastUpdated: 'Today • 07:30 AM',
    },
    {
      bedId: 'B-202-B2',
      building: 'Block B (Senior Girls)',
      floor: 'Floor 2',
      room: 'Room 202',
      wardenName: 'Dr. Ananya Sen',
      studentName: null,
      grade: 'Available',
      attendanceStatus: 'PRESENT',
    },
    {
      bedId: 'C-105-B1',
      building: 'Block C (Junior Dormitory)',
      floor: 'Floor 1',
      room: 'Room 105',
      wardenName: 'Mr. Vivek Kaul',
      studentName: 'Kabir Malhotra',
      grade: '6-A',
      attendanceStatus: 'PRESENT',
      lastUpdated: 'Today • 07:30 AM',
    },
    {
      bedId: 'C-105-B2',
      building: 'Block C (Junior Dormitory)',
      floor: 'Floor 1',
      room: 'Room 105',
      wardenName: 'Mr. Vivek Kaul',
      studentName: null,
      grade: 'Available',
      attendanceStatus: 'PRESENT',
    },
  ];

  hostelMovements: HostelMovementRecord[] = [
    {
      id: 'MV-101',
      studentName: 'Marcus Brody (9-B)',
      room: 'A-101',
      departure: '14:30 Today',
      purpose: 'Dental Specialist Appointment',
      destination: 'Manipal Hospital',
      expectedReturn: '18:30 Today',
      actualReturn: 'Pending Return',
      status: 'OUT',
      authorizedBy: 'Chief Warden Dr. M. Soni',
    },
    {
      id: 'MV-102',
      studentName: 'Rohan Deshmukh (11-A)',
      room: 'A-101',
      departure: '08:00 AM',
      purpose: 'State Physics Olympiad',
      destination: 'IISc Campus Auditorium',
      expectedReturn: '17:00 Today',
      actualReturn: '16:45 (Returned)',
      status: 'RETURNED',
      authorizedBy: 'Principal Dr. Mehta',
    },
  ];

  hostelVisitors: HostelVisitorRecord[] = [
    {
      id: 'VS-01',
      visitorName: 'Mr. Richard Vance',
      relation: 'Father (Guardian ID #G-902)',
      visitingStudent: 'Elena Vance (B-201)',
      room: 'B-201',
      idProofType: 'Aadhaar / Guardian RFID Pass',
      idVerified: true,
      entryTime: '16:10 PM',
      exitTime: '17:05 PM',
      status: 'CHECKED_OUT',
    },
    {
      id: 'VS-02',
      visitorName: 'Mrs. Sunita Deshmukh',
      relation: 'Mother (Guardian ID #G-418)',
      visitingStudent: 'Rohan Deshmukh (A-101)',
      room: 'A-101',
      idProofType: 'Guardian Smart Card',
      idVerified: true,
      entryTime: '17:20 PM',
      exitTime: 'In Visitor Lounge',
      status: 'CHECKED_IN',
    },
  ];

  libraryBooks: LibraryBookRecord[] = [
    {
      id: 'BK-901',
      isbn: '978-8177091878',
      title: 'Concepts of Physics (H.C. Verma Vol 1 & 2)',
      author: 'Dr. H.C. Verma',
      category: 'Science',
      totalCopies: 28,
      availableCopies: 24,
      status: 'AVAILABLE',
      borrower: '—',
      renewalsCount: 0,
      fineAmount: 0,
      isDigitalResource: true,
    },
    {
      id: 'BK-902',
      isbn: '978-8185015521',
      title: 'Higher Algebra (Hall & Knight)',
      author: 'H.S. Hall & S.R. Knight',
      category: 'Mathematics',
      totalCopies: 15,
      availableCopies: 12,
      status: 'ISSUED',
      borrower: 'Marcus Brody (9-B)',
      dueDate: 'Sep 18, 2026 (Overdue)',
      renewalsCount: 1,
      fineAmount: 60,
      isDigitalResource: false,
    },
    {
      id: 'BK-903',
      isbn: '978-0262046305',
      title: 'Introduction to Algorithms (CLRS 4th Ed)',
      author: 'Cormen, Leiserson, Rivest & Stein',
      category: 'Computer Science',
      totalCopies: 10,
      availableCopies: 8,
      status: 'RESERVED',
      borrower: 'Elena Vance (9-B)',
      reservedBy: 'Elena Vance (9-B)',
      dueDate: 'Oct 15, 2026',
      renewalsCount: 0,
      fineAmount: 0,
      isDigitalResource: true,
    },
    {
      id: 'BK-904',
      isbn: '978-0135188743',
      title: 'Campbell Biology Digital & Print Bundle',
      author: 'Lisa A. Urry & Michael L. Cain',
      category: 'Science',
      totalCopies: 20,
      availableCopies: 19,
      status: 'AVAILABLE',
      borrower: '—',
      renewalsCount: 0,
      fineAmount: 0,
      isDigitalResource: true,
    },
    {
      id: 'BK-905',
      isbn: '978-0198328667',
      title: 'Complete Shakespeare & Critical Essays Anthology',
      author: 'Oxford University Press',
      category: 'Literature',
      totalCopies: 18,
      availableCopies: 16,
      status: 'ISSUED',
      borrower: 'Aria Montgomery (9-B)',
      dueDate: 'Oct 12, 2026',
      renewalsCount: 0,
      fineAmount: 0,
      isDigitalResource: true,
    },
  ];

  inventoryAssets: InventoryAssetRecord[] = [
    {
      code: 'AST-LAB-01',
      item: 'Digital Compound Microscopes (Olympus)',
      category: 'Laboratory',
      stock: '42 Units',
      vendor: 'ThermoFisher Scientific',
      poNumber: 'PO-4092',
      amount: '₹1,24,000',
      poStatus: 'Verified & Active',
      maintenance: 'Calibrated Oct 2026',
    },
    {
      code: 'AST-IT-04',
      item: 'Raspberry Pi 5 Robotics & AI Kits',
      category: 'IT & Robotics',
      stock: '40 Kits',
      vendor: 'Element14 Tech',
      poNumber: 'PO-4095',
      amount: '₹2,80,000',
      poStatus: 'PO Approved',
      maintenance: 'New Batch Ready',
    },
    {
      code: 'AST-SPT-09',
      item: 'FIBA Match Basketballs & Electronic Scoreboard',
      category: 'Sports',
      stock: '28 Units',
      vendor: 'SportMaster Infra',
      poNumber: 'PO-4101',
      amount: '₹1,95,000',
      poStatus: 'Delivered',
      maintenance: 'Healthy',
    },
  ];

  admissionLeads: AdmissionLeadRecord[] = [
    {
      id: 'LD-2026-01',
      candidateName: 'Aarav Singhania',
      applyingGrade: 'Grade 11',
      parentName: 'Vikram Singhania',
      phone: '+91 98201 44120',
      stage: 'Interview',
      testScore: '94% (STEM Track)',
      counsellor: 'Ms. Neha Kapoor',
    },
    {
      id: 'LD-2026-02',
      candidateName: 'Zoya Merchant',
      applyingGrade: 'Grade 9',
      parentName: 'Dr. Farhan Merchant',
      phone: '+91 98452 33910',
      stage: 'Selected',
      testScore: '91% (Merit)',
      counsellor: 'Mr. Pradeep Joshi',
    },
    {
      id: 'LD-2026-03',
      candidateName: 'Kabir Malhotra',
      applyingGrade: 'Grade 6',
      parentName: 'Ritu Malhotra',
      phone: '+91 97411 20944',
      stage: 'Doc Verification',
      testScore: '88%',
      counsellor: 'Ms. Neha Kapoor',
    },
    {
      id: 'LD-2026-04',
      candidateName: 'Meera Krishnan',
      applyingGrade: 'Pre-Primary (KG-2)',
      parentName: 'Suresh Krishnan',
      phone: '+91 99002 88123',
      stage: 'Counselling',
      testScore: 'Interaction Passed',
      counsellor: 'Mrs. Kavita Nair',
    },
  ];

  alumniProfiles: AlumniProfileRecord[] = [
    {
      id: 'alm-1',
      name: 'Dr. Aditi Rao',
      graduationYear: 'Batch of 2016',
      higherEducation: 'Ph.D. Computer Science, Stanford University',
      organization: 'Google DeepMind',
      industry: 'Artificial Intelligence & Research',
      location: 'Palo Alto, CA',
      achievement: 'ACM Doctoral Dissertation Fellow & CASPA Gold Medalist',
      contributionType: 'Mentorship',
      contributionDetail: 'Monthly STEM Research & University Application Clinic',
      mentorshipSlotsBooked: 14,
    },
    {
      id: 'alm-2',
      name: 'Karthik Menon',
      graduationYear: 'Batch of 2018',
      higherEducation: 'B.Tech CS, IIT Bombay • MBA, INSEAD',
      organization: 'Stripe (APAC)',
      industry: 'FinTech & Product Engineering',
      location: 'Singapore',
      achievement: 'Forbes 30 Under 30 Asia Honoree',
      contributionType: 'Internship Sponsor',
      contributionDetail: 'Summer Coding & FinTech High-School Fellowship (4 Seats)',
      mentorshipSlotsBooked: 9,
    },
    {
      id: 'alm-3',
      name: 'Neha Verma, IAS',
      graduationYear: 'Batch of 2015',
      higherEducation: 'B.A. Economics, St. Stephen’s • M.P.P., Oxford (Rhodes)',
      organization: 'Ministry of Education, Govt. of India',
      industry: 'Public Policy & Civil Services',
      location: 'New Delhi',
      achievement: 'All India Rank #7 UPSC Civil Services',
      contributionType: 'Endowment Donor',
      contributionDetail: '₹5,00,000 Merit Scholarship Endowment Fund',
      mentorshipSlotsBooked: 18,
    },
  ];

  campusEventsAndClubs: CampusEventClubRecord[] = [
    {
      id: 'evc-1',
      name: 'Robotics & AI Innovation Club',
      category: 'Club',
      dateOrSchedule: 'Every Wednesday & Friday • 03:15 PM',
      venue: 'Innovation Lab 2',
      coordinator: 'Prof. Miller',
      participantsCount: 68,
      attendanceRate: '97.2%',
      resultOrAchievement: '1st Place National STEM & Robotics Olympiad 2026',
      certificateIssuedCount: 42,
    },
    {
      id: 'evc-2',
      name: 'Varsity Athletics & Swimming Championship',
      category: 'Sports',
      dateOrSchedule: 'Nov 08, 2026 • 08:00 AM',
      venue: 'Olympic Aquatic & Track Complex',
      coordinator: 'Coach Vikram Rathore',
      participantsCount: 94,
      attendanceRate: '98.5%',
      resultOrAchievement: '8 Gold & 5 Silver Medals at State Meet',
      certificateIssuedCount: 64,
    },
    {
      id: 'evc-3',
      name: 'Annual Inter-School STEM Symposium & MUN',
      category: 'Event',
      dateOrSchedule: 'Nov 14, 2026 • 09:00 AM',
      venue: 'Main Auditorium',
      coordinator: 'Mrs. Kavita Nair',
      participantsCount: 152,
      attendanceRate: '95.8%',
      resultOrAchievement: 'Best School Delegation Trophy 2026',
      certificateIssuedCount: 88,
    },
  ];

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
  submitStudentTask(
    taskId: string,
    submissionData?: {
      fileName?: string;
      fileSize?: string;
      fileUrl?: string;
      note?: string;
    }
  ) {
    const task = this.studentTasks.find((t) => t.id === taskId);
    const activeName = this.currentUser?.roleType === 'STUDENT' ? this.currentUser.fullName : 'Elena Vance';
    if (task) {
      const wasAlreadySubmitted = task.status === 'SUBMITTED' || task.status === 'GRADED';
      task.status = 'SUBMITTED';
      task.completedQuestions = task.totalQuestions;
      if (submissionData?.fileName) {
        task.submittedFileName = submissionData.fileName;
      }
      if (submissionData?.fileSize) {
        task.submittedFileSize = submissionData.fileSize;
      }
      if (submissionData?.fileUrl) {
        task.submittedFileUrl = submissionData.fileUrl;
      }
      if (submissionData?.note) {
        task.submissionNote = submissionData.note;
      }
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      task.submittedAt = timeNow;

      // Sync submission to Teacher Tasks so Teacher sees student's completed work & uploaded file
      let linkedTeacherTask = this.teacherTasks.find(
        (tt) =>
          tt.id === task.teacherTaskId ||
          tt.linkedStudentTaskId === task.id ||
          tt.title.toLowerCase() === task.title.toLowerCase()
      );

      if (!linkedTeacherTask) {
        linkedTeacherTask = {
          id: `task-sync-${Date.now()}`,
          linkedStudentTaskId: task.id,
          title: task.title,
          type: 'HOMEWORK',
          gradeSection: task.gradeSection || 'Grade 9B',
          dueDate: task.dueDate,
          submittedCount: 25,
          totalCount: 32,
          status: 'PUBLISHED',
        };
        this.teacherTasks.unshift(linkedTeacherTask);
        task.teacherTaskId = linkedTeacherTask.id;
      } else {
        if (!wasAlreadySubmitted) {
          linkedTeacherTask.submittedCount = Math.min(
            linkedTeacherTask.totalCount,
            linkedTeacherTask.submittedCount + 1
          );
        }
        linkedTeacherTask.linkedStudentTaskId = task.id;
      }

      linkedTeacherTask.latestStudentSubmission = {
        studentName: activeName,
        fileName: task.submittedFileName || 'Homework_Solution.pdf',
        fileSize: task.submittedFileSize || '1.1 MB',
        fileUrl: task.submittedFileUrl,
        note: task.submissionNote,
        submittedAt: `Today at ${timeNow}`,
        status: 'SUBMITTED',
      };

      this.logAudit(
        activeName,
        'STUDENT',
        'SUBMIT_HOMEWORK',
        'TASKS',
        task.title,
        `Uploaded solution${submissionData?.fileName ? ` (${submissionData.fileName})` : ''} for ${task.title}`
      );
    }
    return task;
  }

  submitAbsenceExcuse(date: string, reason: string, attachmentName?: string) {
    const activeName =
      this.currentUser?.roleType === 'STUDENT' ? this.currentUser.fullName : 'Elena Vance';
    const gradeSection =
      this.currentUser?.roleType === 'STUDENT' && this.currentUser.designation?.includes('Grade')
        ? this.currentUser.designation.split('•')[0].trim()
        : 'Grade 9B';
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const excuse = {
      id: `exc-${Date.now()}`,
      studentName: activeName,
      gradeSection: gradeSection === 'Grade 9' ? 'Grade 9B' : gradeSection,
      rollNo: '14',
      date,
      reason,
      attachmentName,
      submittedAt: `Today at ${timeNow}`,
      status: 'PENDING' as const,
    };
    this.absenceExcuses.unshift(excuse);
    this.logAudit(
      activeName,
      'STUDENT',
      'SUBMIT_ABSENCE_EXCUSE',
      'ATTENDANCE',
      excuse.id,
      `Submitted absence excuse for ${date}: ${reason} (Sent to Class Teacher)`
    );
    return excuse;
  }

  reviewStudentAbsenceExcuse(
    excuseId: string,
    decision: 'APPROVED' | 'REJECTED',
    teacherNote?: string
  ) {
    const item = this.absenceExcuses.find((e) => e.id === excuseId);
    const teacherName =
      this.currentUser?.roleType === 'TEACHER' ? this.currentUser.fullName : 'Mrs. Oswald';
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (item) {
      item.status = decision;
      item.reviewedBy = `${teacherName} (Class Teacher)`;
      item.reviewedAt = `Today at ${timeNow}`;
      item.teacherNote =
        teacherNote && teacherNote.trim().length > 0
          ? teacherNote.trim()
          : decision === 'APPROVED'
          ? 'Absence excuse verified and approved by Class Teacher.'
          : 'Absence excuse could not be approved. Please provide supporting documentation.';

      this.logAudit(
        teacherName,
        'TEACHER',
        decision === 'APPROVED' ? 'APPROVE_STUDENT_EXCUSE' : 'REJECT_STUDENT_EXCUSE',
        'ATTENDANCE',
        item.id,
        `${decision === 'APPROVED' ? 'Approved' : 'Rejected'} absence excuse for ${item.studentName} (${item.date})`
      );
    }
    return item;
  }

  // Teacher Attendance Methods (Date-Aware & Synced to Student Panel)
  setStudentAttendance(
    studentId: string,
    status: 'PRESENT' | 'ABSENT' | 'LATE',
    dateStr: string = '2026-09-23',
    periodSubject: string = 'Period 1 • Mathematics'
  ) {
    const std = this.teacherStudents.find((s) => s.id === studentId);
    const teacherName =
      this.currentUser?.roleType === 'TEACHER' ? this.currentUser.fullName : 'Mrs. Oswald';
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (std) {
      std.attendanceStatus = status;
      if (!std.attendanceByDate) {
        std.attendanceByDate = {};
      }
      std.attendanceByDate[dateStr] = {
        status,
        markedBy: teacherName,
        markedAt: timeNow,
        periodSubject,
      };

      const parts = dateStr.split('-');
      const dayNum = parts.length === 3 ? parseInt(parts[2], 10) : 23;

      const existingIdx = this.studentAttendanceLedger.findIndex(
        (e) =>
          (e.studentId === std.id || e.studentName.toLowerCase() === std.fullName.toLowerCase()) &&
          e.date === dateStr
      );

      const entry: StudentDateAttendanceEntry = {
        id: existingIdx >= 0 ? this.studentAttendanceLedger[existingIdx].id : `att-${Date.now()}-${std.id}`,
        studentId: std.id,
        studentName: std.fullName,
        gradeSection: std.grade,
        rollNo: std.rollNo,
        date: dateStr,
        dayNumber: dayNum,
        status,
        markedBy: teacherName,
        markedAt: timeNow,
        periodSubject,
      };

      if (existingIdx >= 0) {
        this.studentAttendanceLedger[existingIdx] = entry;
      } else {
        this.studentAttendanceLedger.unshift(entry);
      }

      // Also update the base heatmap day cell if dayNum is 1..30
      const heatmapCell = this.attendanceHeatmap.find((d) => d.dayNumber === dayNum);
      if (heatmapCell) {
        heatmapCell.status = status;
        heatmapCell.dateStr = dateStr;
        heatmapCell.markedByTeacher = teacherName;
        heatmapCell.markedAt = timeNow;
        heatmapCell.periodSubject = periodSubject;
        heatmapCell.studentName = std.fullName;
        heatmapCell.hasIncident = status === 'ABSENT';
      }

      this.logAudit(
        teacherName,
        'TEACHER',
        'MARK_ATTENDANCE',
        'ATTENDANCE',
        `${std.fullName} (${dateStr})`,
        `Marked ${std.fullName} as ${status} on ${dateStr} (${periodSubject})`
      );
    }
    return std;
  }

  markAllStudentsPresent(
    dateStr: string = '2026-09-23',
    sectionFilter: string = 'ALL',
    periodSubject: string = 'Period 1 • Mathematics'
  ) {
    const teacherName =
      this.currentUser?.roleType === 'TEACHER' ? this.currentUser.fullName : 'Mrs. Oswald';
    const targets = this.teacherStudents.filter(
      (s) =>
        sectionFilter === 'ALL' ||
        s.section.toLowerCase() === sectionFilter.toLowerCase() ||
        s.grade.toLowerCase().includes(sectionFilter.toLowerCase())
    );

    targets.forEach((s) => {
      this.setStudentAttendance(s.id, 'PRESENT', dateStr, periodSubject);
    });

    this.logAudit(
      teacherName,
      'TEACHER',
      'BATCH_ATTENDANCE',
      'ATTENDANCE',
      `Section ${sectionFilter} (${dateStr})`,
      `Marked all ${targets.length} students present for ${dateStr}`
    );
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

  createTask(title: string, type: 'HOMEWORK' | 'ASSIGNMENT', gradeSection: string, dueDate: string, description?: string) {
    const teacherName =
      this.currentUser?.roleType === 'TEACHER' ? this.currentUser.fullName : 'Mrs. Oswald';
    const studentTaskId = `st-assigned-${Date.now()}`;
    const teacherTaskId = `task-${Date.now()}`;

    const newTask: TeacherTask = {
      id: teacherTaskId,
      linkedStudentTaskId: studentTaskId,
      description:
        description ||
        `Assigned by ${teacherName} for ${gradeSection}. Complete all questions and upload your solution document.`,
      title,
      type,
      gradeSection,
      dueDate,
      submittedCount: 0,
      totalCount: 32,
      status: 'PUBLISHED',
    };
    this.teacherTasks.unshift(newTask);

    // Sync to Student Tasks so Grade 9 / student profile immediately sees the assigned work
    const newStudentTask: StudentTaskItem = {
      id: studentTaskId,
      teacherTaskId,
      assignedByTeacher: teacherName,
      gradeSection,
      subject: `MATHEMATICS • ${gradeSection.toUpperCase()}`,
      unit: type === 'HOMEWORK' ? 'Homework' : 'Assignment',
      title,
      description:
        description ||
        `Assigned by ${teacherName} (${gradeSection}). Complete the ${type.toLowerCase()} and upload your work before the due date.`,
      dueDate,
      isDueToday: true,
      status: 'PENDING',
      completedQuestions: 0,
      totalQuestions: 10,
      resourceFileName: `${title.replace(/\s+/g, '_')}_Worksheet.pdf`,
      resourceFileSize: '1.1 MB',
    };
    this.studentTasks.unshift(newStudentTask);

    this.logAudit(
      teacherName,
      'TEACHER',
      'CREATE_TASK',
      'TASKS',
      newTask.id,
      `Assigned ${type} "${title}" to ${gradeSection} (Synced to Student Portal)`
    );
    return newTask;
  }

  gradeStudentTaskSubmission(teacherTaskId: string, score: number, feedback: string) {
    const tTask = this.teacherTasks.find((t) => t.id === teacherTaskId);
    if (tTask) {
      if (tTask.latestStudentSubmission) {
        tTask.latestStudentSubmission.status = 'GRADED';
        tTask.latestStudentSubmission.score = score;
        tTask.latestStudentSubmission.feedback = feedback;
      }
      const sTask = this.studentTasks.find(
        (st) =>
          st.id === tTask.linkedStudentTaskId ||
          st.teacherTaskId === tTask.id ||
          st.title.toLowerCase() === tTask.title.toLowerCase()
      );
      if (sTask) {
        sTask.status = 'GRADED';
        sTask.score = score;
        sTask.gradeBadge =
          score >= 95 ? 'Grade A+' : score >= 85 ? 'Grade A' : score >= 75 ? 'Grade B+' : 'Grade B';
        sTask.feedbackText = feedback;
      }
      this.logAudit(
        this.currentUser?.fullName || 'Mrs. Oswald',
        'TEACHER',
        'GRADE_TASK_SUBMISSION',
        'TASKS',
        teacherTaskId,
        `Graded submission for "${tTask.title}": ${score}/100`
      );
    }
    return tTask;
  }

  submitTeacherLeaveRequest(data: {
    leaveType: 'Casual' | 'Medical' | 'Duty';
    durationDates: string;
    note: string;
  }) {
    const staffName =
      this.currentUser?.roleType === 'TEACHER' ? this.currentUser.fullName : 'Mrs. Oswald';
    const designationDept =
      this.currentUser?.roleType === 'TEACHER'
        ? this.currentUser.designation
        : 'Department of Mathematics • Grade 9B Tutor';

    const newLeave: PrincipalStaffLeaveItem = {
      id: `leave-${Date.now()}`,
      staffId: 'stf-1',
      staffName,
      avatarUrl:
        this.currentUser?.avatarUrl ||
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      leaveType: data.leaveType,
      durationDates: data.durationDates,
      designationDept,
      note: data.note,
      status: 'PENDING',
      appliedAt: 'Just now',
    };
    this.principalStaffLeaves.unshift(newLeave);
    this.logAudit(
      staffName,
      'TEACHER',
      'APPLY_STAFF_LEAVE',
      'STAFF',
      newLeave.id,
      `Submitted ${data.leaveType} leave request for ${data.durationDates}: ${data.note}`
    );
    return newLeave;
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
    const nextRollNo =
      this.students.filter((s) => s.grade === data.grade && s.section === data.section).length + 1;
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      admissionNo,
      fullName: data.fullName,
      grade: data.grade,
      section: data.section,
      rollNo: nextRollNo,
      gender: data.gender,
      parentName: data.parentName,
      parentPhone: data.parentPhone || '+1 (555) 200-1000',
      parentEmail: data.parentEmail || `${data.parentName.toLowerCase().replace(/\s+/g, '.')}@parent.caspa.org`,
      attendancePercentage: 100.0,
      feeOutstanding: 3850,
      busRoute: data.busRoute || 'None',
      status: 'ACTIVE',
    };
    this.students.unshift(newStudent);

    // Sync to Teacher Student Roster (Teacher Module: Attendance, Marks & Class Roster)
    const initials = data.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('');
    const matchedSection = this.classSections.find(
      (cs) => cs.section.toLowerCase() === data.section.toLowerCase() || cs.grade.toLowerCase() === data.grade.toLowerCase()
    );
    const assignedTeacher = matchedSection?.classTeacher || 'Mrs. Oswald';

    const newTeacherStudent: TeacherStudent = {
      id: `ts-${Date.now()}`,
      rollNo: nextRollNo,
      fullName: newStudent.fullName,
      grade: `${data.grade} (${data.section})`,
      section: data.section,
      attendanceStatus: 'PRESENT',
      unitTestScore: null,
      maxScore: 100,
      instructorNote: `Admission #${admissionNo} • Class Teacher: ${assignedTeacher} • Guardian: ${newStudent.parentName} (${newStudent.parentPhone}, ${newStudent.parentEmail}) • Bus: ${newStudent.busRoute}`,
      hasNote: true,
      avatarInitials: initials || 'ST',
      parentName: newStudent.parentName,
      parentPhone: newStudent.parentPhone,
    };
    this.teacherStudents.unshift(newTeacherStudent);

    // Sync class section & teacher class student counts
    if (matchedSection) {
      matchedSection.studentCount += 1;
    }
    this.teacherClasses.forEach((tc) => {
      if (
        tc.section.toLowerCase() === data.section.toLowerCase() ||
        tc.grade.toLowerCase().includes(data.section.toLowerCase()) ||
        tc.grade.toLowerCase() === data.grade.toLowerCase()
      ) {
        tc.studentCount += 1;
      }
    });

    // Sync to Teacher Parent Comms so teacher can directly message guardian
    this.parentMessages.unshift({
      id: `msg-${Date.now()}`,
      parentName: newStudent.parentName,
      parentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      studentName: newStudent.fullName,
      gradeSection: `${data.grade} (${data.section})`,
      timeString: 'Just now',
      snippet: `New student enrolled (${admissionNo}). Guardian contact: ${newStudent.parentPhone} • ${newStudent.parentEmail}`,
      unreadCount: 1,
      isOnline: true,
    });

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
    this.logAudit(
      this.currentUser?.fullName || 'Arthur Clark',
      this.currentUser?.roleType || 'ADMIN',
      'ADMIT_STUDENT',
      'STUDENTS',
      newStudent.id,
      `Admitted ${newStudent.fullName} to ${newStudent.grade} ${newStudent.section} (Synced to Teacher ${assignedTeacher})`
    );
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<Student>) {
    const std = this.students.find((s) => s.id === id);
    if (std) {
      const oldName = std.fullName;
      Object.assign(std, updates);

      // Sync updates to Teacher Roster as well
      const teacherStd = this.teacherStudents.find(
        (ts) => ts.id === id || ts.fullName.toLowerCase() === oldName.toLowerCase()
      );
      if (teacherStd) {
        if (updates.fullName) {
          teacherStd.fullName = updates.fullName;
          teacherStd.avatarInitials = updates.fullName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
        }
        if (updates.grade) teacherStd.grade = updates.grade;
        if (updates.section) teacherStd.section = updates.section;
        if (updates.parentName) teacherStd.parentName = updates.parentName;
        if (updates.parentPhone) teacherStd.parentPhone = updates.parentPhone;
      }

      this.logAudit(
        this.currentUser?.fullName || 'Arthur Clark',
        this.currentUser?.roleType || 'ADMIN',
        'UPDATE_STUDENT',
        'STUDENTS',
        id,
        `Updated student record for ${std.fullName}`
      );
    }
    return std;
  }

  archiveStudent(id: string) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return undefined;

    const [removedStudent] = this.students.splice(index, 1);

    // Also remove from Teacher Roster
    this.teacherStudents = this.teacherStudents.filter(
      (ts) =>
        ts.id !== id &&
        ts.fullName.toLowerCase() !== removedStudent.fullName.toLowerCase()
    );

    // Decrement section strength in classSections
    const matchedSection = this.classSections.find(
      (cs) =>
        cs.section.toLowerCase() === removedStudent.section.toLowerCase() ||
        `${cs.grade} ${cs.section}`.toLowerCase() ===
          `${removedStudent.grade} ${removedStudent.section}`.toLowerCase()
    );
    if (matchedSection && matchedSection.studentCount > 0) {
      matchedSection.studentCount -= 1;
    }

    // Decrement studentCount in teacherClasses for that section
    this.teacherClasses.forEach((tc) => {
      if (
        tc.section.toLowerCase() === removedStudent.section.toLowerCase() &&
        tc.studentCount > 0
      ) {
        tc.studentCount -= 1;
      }
    });

    // Remove associated fee invoices & attendance ledger entries
    this.feeInvoices = this.feeInvoices.filter(
      (inv) =>
        inv.studentId !== id &&
        inv.studentName.toLowerCase() !== removedStudent.fullName.toLowerCase()
    );
    this.studentAttendanceLedger = this.studentAttendanceLedger.filter(
      (entry) =>
        entry.studentId !== id &&
        entry.studentName.toLowerCase() !== removedStudent.fullName.toLowerCase()
    );

    this.logAudit(
      this.currentUser?.fullName || 'Arthur Clark',
      this.currentUser?.roleType || 'ADMIN',
      'DELETE_STUDENT',
      'STUDENTS',
      id,
      `Permanently deleted student record for ${removedStudent.fullName} (${removedStudent.admissionNo})`
    );
    return removedStudent;
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

  deleteStaffMember(id: string) {
    const index = this.staffMembers.findIndex((s) => s.id === id);
    if (index === -1) return undefined;

    const [removedStaff] = this.staffMembers.splice(index, 1);

    // Also remove from staff payroll & principal staff leaves
    this.staffPayrollRecords = this.staffPayrollRecords.filter(
      (r) =>
        r.staffId !== id &&
        r.staffName.toLowerCase() !== removedStaff.fullName.toLowerCase()
    );
    this.principalStaffLeaves = this.principalStaffLeaves.filter(
      (l) =>
        l.staffId !== id &&
        l.staffName.toLowerCase() !== removedStaff.fullName.toLowerCase()
    );

    this.logAudit(
      this.currentUser?.fullName || 'Arthur Clark',
      this.currentUser?.roleType || 'ADMIN',
      'DELETE_STAFF',
      'STAFF',
      id,
      `Permanently deleted faculty/staff member ${removedStaff.fullName} (${removedStaff.employeeId})`
    );
    return removedStaff;
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

  processPrincipalStaffLeave(leaveId: string, action: 'APPROVED' | 'REJECTED', remark?: string) {
    const leave = this.principalStaffLeaves.find(l => l.id === leaveId);
    if (leave) {
      leave.status = action;
      leave.principalRemark =
        remark ||
        (action === 'APPROVED'
          ? 'Approved by Principal Dr. Mehta • Substitute roster confirmed'
          : 'Declined due to examination proctoring schedule');

      // Also sync with staff directory if approved
      const matchedStaff = this.staffMembers.find(
        (s) =>
          s.id === leave.staffId ||
          s.fullName.toLowerCase().includes(leave.staffName.replace('Mrs. ', '').replace('Mr. ', '').toLowerCase())
      );
      if (matchedStaff && action === 'APPROVED') {
        matchedStaff.status = 'ON_LEAVE';
        matchedStaff.liveStatusText = `Approved Leave (${leave.durationDates})`;
      }

      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'LEAVE_DECISION', 'STAFF', leaveId, `${action} leave for ${leave.staffName} (${leave.durationDates})`);
    }
    return leave;
  }

  disburseStaffPayroll(payrollId: string) {
    const rec = this.staffPayrollRecords.find((r) => r.id === payrollId);
    if (rec) {
      rec.status = 'PAID_TO_BANK';
      rec.utrNumber = `NEFT2026${Math.floor(100000 + Math.random() * 900000)}`;
      rec.disbursedAt = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      rec.disbursedBy = this.currentUser?.fullName || 'Dr. Mehta (Principal)';

      const stf = this.staffMembers.find((s) => s.id === rec.staffId);
      if (stf && stf.ferpaCompliance) {
        stf.ferpaCompliance.monthlyDisbursement = `${rec.monthlySalaryFormatted} / month (Credited to ${rec.bankName} ${rec.accountNumberMasked} • Ref: ${rec.utrNumber})`;
      }

      this.logAudit(
        'Dr. Mehta',
        'PRINCIPAL',
        'PAYROLL_DISBURSE',
        'FINANCE',
        payrollId,
        `Disbursed ${rec.monthlySalaryFormatted} salary to ${rec.staffName} (${rec.bankName} ${rec.accountNumberMasked}) • UTR: ${rec.utrNumber}`
      );
    }
    return rec;
  }

  disburseAllStaffPayroll() {
    const timeStr = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    let count = 0;
    this.staffPayrollRecords.forEach((rec) => {
      if (rec.status !== 'PAID_TO_BANK') {
        rec.status = 'PAID_TO_BANK';
        rec.utrNumber = `NEFT2026${Math.floor(100000 + Math.random() * 900000)}`;
        rec.disbursedAt = timeStr;
        rec.disbursedBy = this.currentUser?.fullName || 'Dr. Mehta (Principal)';
        count++;

        const stf = this.staffMembers.find((s) => s.id === rec.staffId);
        if (stf && stf.ferpaCompliance) {
          stf.ferpaCompliance.monthlyDisbursement = `${rec.monthlySalaryFormatted} / month (Credited to ${rec.bankName} ${rec.accountNumberMasked} • Ref: ${rec.utrNumber})`;
        }
      }
    });
    this.logAudit(
      'Dr. Mehta',
      'PRINCIPAL',
      'BATCH_PAYROLL_DISBURSE',
      'FINANCE',
      'October-2026',
      `Batch disbursed monthly payroll to bank accounts for ${count} pending staff members`
    );
    return count;
  }

  createSafeguardingCase(data: {
    title: string;
    category: PrincipalSafeguardingCase['category'];
    severity: PrincipalSafeguardingCase['severity'];
    studentMaskedId?: string;
    details?: string;
  }) {
    const newCase: PrincipalSafeguardingCase = {
      id: `case-${Date.now()}`,
      caseNo: `Case #SF-0${Math.floor(235 + Math.random() * 600)}`,
      severity: data.severity,
      timeAgo: 'Just now',
      studentMaskedId: data.studentMaskedId || `Student ID: ***${Math.floor(1000 + Math.random() * 8999)}`,
      title: data.title,
      assignedTo: 'Assigned to Campus Safety Lead Officer Davis & Counselor Rey',
      currentStep: 1,
      notesCount: 'Initial intake statement logged',
      category: data.category,
      details:
        data.details ||
        'Incident logged via Safeguarding Command Center. Immediate triage and witness statement collection initiated.',
    };
    this.principalSafeguardingCases.unshift(newCase);
    this.logAudit(
      this.currentUser?.fullName || 'Dr. Mehta',
      'PRINCIPAL',
      'CREATE_SAFEGUARDING_CASE',
      'SAFETY',
      newCase.id,
      `Logged safeguarding incident ${newCase.caseNo}: ${newCase.title}`
    );
    return newCase;
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
      item.actionNote =
        note ||
        (action === 'APPROVED'
          ? 'Signed & Approved by Principal Dr. Mehta. Authorized for immediate execution.'
          : action === 'REJECTED'
          ? 'Declined by Principal Office. Does not meet current term policy criteria.'
          : 'Revision requested by Principal Office.');
      item.updatedAt = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      if (item.steps) {
        if (action === 'APPROVED') {
          item.steps.forEach((s) => {
            s.completed = true;
            s.current = false;
          });
        } else {
          item.steps.forEach((s, idx) => {
            s.completed = idx === 0;
            s.current = idx === 1;
          });
        }
      }
      this.logAudit('Dr. Mehta', 'PRINCIPAL', 'EXECUTIVE_APPROVAL', 'APPROVALS', approvalId, `${action} executive requisition: "${item.title}"`);
    }
    return item;
  }

  submitExecutiveApprovalRequest(data: {
    title: string;
    categoryBadge: string;
    description: string;
    amount?: string;
    isEmergency?: boolean;
    requesterNameOverride?: string;
    requesterRoleOverride?: string;
    requesterRoleTypeOverride?: RoleType;
  }) {
    const reqName = data.requesterNameOverride || this.currentUser?.fullName || 'User';
    const reqRole = data.requesterRoleOverride || this.currentUser?.designation || 'Campus Member';
    const reqRoleType = data.requesterRoleTypeOverride || this.currentUser?.roleType || 'STUDENT';
    const initials = reqName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('');

    const newApproval: PrincipalExecutiveApproval = {
      id: `exec-app-${Date.now()}`,
      initials: initials || 'RQ',
      avatarBg: data.isEmergency ? 'bg-rose-100 text-rose-800' : 'bg-teal/15 text-teal',
      requesterName: reqName,
      requesterRole: `${reqRole} (${reqRoleType.replace('_', ' ')})`,
      requesterRoleType: reqRoleType,
      requesterId: this.currentUser?.id,
      categoryBadge: data.categoryBadge,
      isEmergency: data.isEmergency || false,
      slaString: 'Just submitted • 24h SLA',
      title: data.title,
      description: data.description,
      amount: data.amount ? (data.amount.startsWith('₹') ? data.amount : `₹${data.amount}`) : undefined,
      steps: [
        { name: 'Submitted', completed: true },
        { name: 'Principal Review', completed: false, current: true },
        { name: 'Final Decision', completed: false },
      ],
      status: 'PENDING',
      submittedAt: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    };

    this.principalExecutiveApprovals.unshift(newApproval);
    this.logAudit(
      reqName,
      reqRoleType,
      'SUBMIT_EXECUTIVE_APPROVAL',
      'APPROVALS',
      newApproval.id,
      `Submitted "${newApproval.title}" (${newApproval.categoryBadge}) for Principal Executive Approval`
    );
    return newApproval;
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

  requestParentCertificate(data: {
    childId?: string;
    studentName?: string;
    type: ParentCertificateItem['type'];
    purpose: string;
    signedBy?: string;
  }) {
    const child =
      (data.childId && this.parentChildren.find((c) => c.id === data.childId)) ||
      (data.studentName &&
        this.parentChildren.find((c) =>
          c.fullName.toLowerCase().includes(data.studentName!.toLowerCase())
        )) ||
      this.parentChildren[0];

    const resolvedStudentName = data.studentName || child.fullName;

    const typeTitles: Record<ParentCertificateItem['type'], string> = {
      BONAFIDE: 'Bonafide Student Certificate',
      TRANSFER: 'Transfer Certificate (Official TC)',
      CHARACTER: 'Character Certificate',
      CONDUCT: 'Conduct & Deportment Certificate',
      STUDY: 'Study & Medium of Instruction Certificate',
      PARTICIPATION: 'Official Event Participation Certificate',
      ACHIEVEMENT: 'Academic Excellence & Achievement Certificate',
      SPORTS: 'Sports & Athletics Merit Certificate',
      EVENT: 'Co-Curricular Event Honors Certificate',
      TUITION_FEE: 'Annual Tuition Fee Certificate (FY 2026-27)',
      NOC: 'No Objection Certificate (NOC)',
    };

    const dateToday = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const newCert: ParentCertificateItem = {
      id: `cert-${Date.now()}`,
      childId: child.id,
      childName: resolvedStudentName,
      title: typeTitles[data.type] || 'Official Institutional Certificate',
      type: data.type,
      purpose: data.purpose || 'Official Documentation & Verification',
      status: 'READY',
      requestDate: dateToday,
      issuedDate: dateToday,
      verificationCode: `CASPA-${data.type.slice(0, 3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      signedBy: data.signedBy || 'Dr. Mehta (Principal) & Registrar',
      downloadUrl: '#',
    };

    this.parentCertificates.unshift(newCert);

    // Also sync to Student Achievements & Honors Cabinet so student sees it immediately!
    const categoryMap: Record<string, StudentAchievement['category']> = {
      SPORTS: 'Sports',
      EVENT: 'Cultural',
      PARTICIPATION: 'Clubs',
      ACHIEVEMENT: 'Academic',
    };
    this.studentAchievements.unshift({
      id: `ach-${Date.now()}`,
      title: newCert.title,
      subtitle: `Issued to ${resolvedStudentName} • Purpose: ${newCert.purpose} • Code: ${newCert.verificationCode}`,
      category: categoryMap[data.type] || 'Academic',
      ranking: `Verified (${newCert.verificationCode})`,
      isFeatured: true,
      awardYear: '2026',
    });

    this.logAudit(
      this.currentUser?.fullName || 'Registrar',
      this.currentUser?.roleType || 'ADMIN',
      'CERTIFICATE_GENERATED',
      'CERTIFICATES',
      newCert.id,
      `Generated verified ${newCert.title} for ${resolvedStudentName} (Code: ${newCert.verificationCode})`
    );
    return newCert;
  }

  verifyCertificateByCode(code: string) {
    const clean = code.trim().toUpperCase();
    const matchedCert = this.parentCertificates.find(
      (c) => c.verificationCode.toUpperCase() === clean
    );
    if (matchedCert) {
      return {
        verified: true,
        certificate: matchedCert,
        message: `VERIFIED AUTHENTIC (${matchedCert.verificationCode}): ${matchedCert.title} issued to ${matchedCert.childName} on ${matchedCert.issuedDate || matchedCert.requestDate} • Purpose: ${matchedCert.purpose} • Signed by ${matchedCert.signedBy || 'Principal Dr. Mehta'}`,
      };
    }
    if (clean.startsWith('CASPA-')) {
      return {
        verified: true,
        certificate: null,
        message: `VERIFIED AUTHENTIC (${clean}): Issued by CASPA School OS Central Registrar • Digital Signature & QR Hash Valid • Signed by Principal Dr. Mehta`,
      };
    }
    return {
      verified: false,
      certificate: null,
      message: `UNVERIFIED CODE (${clean}): No matching certificate found in CASPA Registrar Vault. Please check the serial code.`,
    };
  }

  // ================= HOSTEL END-TO-END METHODS (Section 10) =================
  allocateOrTransferHostelBed(
    bedId: string,
    studentName: string | null,
    grade: string = '9-B',
    targetTransferBedId?: string
  ) {
    const bed = this.hostelBeds.find((b) => b.bedId === bedId);
    if (!bed) return undefined;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (targetTransferBedId) {
      const targetBed = this.hostelBeds.find((b) => b.bedId === targetTransferBedId);
      if (targetBed && bed.studentName) {
        const movingStudent = bed.studentName;
        const movingGrade = bed.grade;
        targetBed.studentName = movingStudent;
        targetBed.grade = movingGrade;
        targetBed.attendanceStatus = bed.attendanceStatus;
        targetBed.lastUpdated = `Transferred Today • ${timeNow}`;

        bed.studentName = null;
        bed.grade = 'Available';
        bed.attendanceStatus = 'PRESENT';
        bed.lastUpdated = `Vacated Today • ${timeNow}`;

        const std = this.students.find(
          (s) => s.fullName.toLowerCase() === movingStudent.toLowerCase()
        );
        if (std) {
          std.hostelRoom = `${targetBed.building.split(' ')[1]}-${targetBed.room.replace('Room ', '')}`;
        }

        this.logAudit(
          this.currentUser?.fullName || 'Chief Warden',
          this.currentUser?.roleType || 'ADMIN',
          'HOSTEL_ROOM_TRANSFER',
          'HOSTEL',
          targetBed.bedId,
          `Transferred ${movingStudent} from ${bed.bedId} to ${targetBed.bedId}`
        );
        return targetBed;
      }
    }

    bed.studentName = studentName;
    bed.grade = studentName ? grade : 'Available';
    bed.lastUpdated = `Updated Today • ${timeNow}`;

    if (studentName) {
      const std = this.students.find(
        (s) => s.fullName.toLowerCase() === studentName.toLowerCase()
      );
      if (std) {
        std.hostelRoom = `${bed.building.split(' ')[1]}-${bed.room.replace('Room ', '')}`;
      }
    }

    this.logAudit(
      this.currentUser?.fullName || 'Chief Warden',
      this.currentUser?.roleType || 'ADMIN',
      studentName ? 'HOSTEL_BED_ALLOCATE' : 'HOSTEL_BED_VACATE',
      'HOSTEL',
      bed.bedId,
      studentName
        ? `Allocated bed ${bed.bedId} (${bed.room}) to ${studentName} (${grade})`
        : `Vacated bed ${bed.bedId} (${bed.room})`
    );
    return bed;
  }

  updateHostelBedAttendance(
    bedId: string,
    status?: HostelBedRecord['attendanceStatus']
  ) {
    const bed = this.hostelBeds.find((b) => b.bedId === bedId);
    if (!bed) return undefined;

    const order: HostelBedRecord['attendanceStatus'][] = [
      'PRESENT',
      'OUTING',
      'MEDICAL',
      'LEAVE',
      'ABSENT',
      'APPROVED_MOVEMENT',
    ];
    const nextStatus =
      status || order[(order.indexOf(bed.attendanceStatus) + 1) % order.length];
    bed.attendanceStatus = nextStatus;
    bed.lastUpdated = `Today • ${new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    this.logAudit(
      this.currentUser?.fullName || 'Warden',
      this.currentUser?.roleType || 'ADMIN',
      'HOSTEL_ATTENDANCE',
      'HOSTEL',
      bedId,
      `Marked hostel attendance for ${bed.studentName || bedId} as ${nextStatus}`
    );
    return bed;
  }

  addHostelMovement(data: {
    studentName: string;
    room: string;
    departure: string;
    purpose: string;
    destination: string;
    expectedReturn: string;
    authorizedBy?: string;
  }) {
    const newMov: HostelMovementRecord = {
      id: `MV-${Math.floor(103 + Math.random() * 890)}`,
      studentName: data.studentName,
      room: data.room,
      departure: data.departure || 'Now',
      purpose: data.purpose,
      destination: data.destination,
      expectedReturn: data.expectedReturn || '19:00 Today',
      actualReturn: 'Out on Pass',
      status: 'OUT',
      authorizedBy: data.authorizedBy || 'Chief Warden Dr. M. Soni',
    };
    this.hostelMovements.unshift(newMov);

    // Update bed status to APPROVED_MOVEMENT if student is in hostelBeds
    const matchedBed = this.hostelBeds.find(
      (b) =>
        b.studentName &&
        data.studentName.toLowerCase().includes(b.studentName.toLowerCase())
    );
    if (matchedBed) {
      matchedBed.attendanceStatus = 'APPROVED_MOVEMENT';
    }

    // Also log in Approval Center as Hostel Movement workflow
    this.approvals.unshift({
      id: `app-hm-${Date.now()}`,
      module: 'HOSTEL',
      title: `Hostel Gate Pass: ${data.studentName} (${data.destination})`,
      requesterName: data.studentName,
      requesterRole: 'STUDENT',
      department: 'Hostel & Residential Boarding',
      currentStage: 'Warden Authorization',
      status: 'APPROVED',
      slaDeadline: '6 Hours SLA',
      priority: 'NORMAL',
      description: `Purpose: ${data.purpose} • Destination: ${data.destination} • Expected Return: ${newMov.expectedReturn}`,
      createdAt: 'Just now',
      history: [
        {
          actor: newMov.authorizedBy,
          action: 'APPROVED',
          timestamp: 'Just now',
          comment: 'Hostel movement pass issued',
        },
      ],
    });

    this.logAudit(
      this.currentUser?.fullName || 'Chief Warden',
      this.currentUser?.roleType || 'ADMIN',
      'HOSTEL_MOVEMENT_OUT',
      'HOSTEL',
      newMov.id,
      `Issued hostel movement pass for ${data.studentName} to ${data.destination}`
    );
    return newMov;
  }

  markHostelMovementReturned(movementId: string) {
    const mv = this.hostelMovements.find((m) => m.id === movementId);
    if (mv) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      mv.actualReturn = `${timeStr} (Returned)`;
      mv.status = 'RETURNED';

      const matchedBed = this.hostelBeds.find(
        (b) =>
          b.studentName &&
          mv.studentName.toLowerCase().includes(b.studentName.toLowerCase())
      );
      if (matchedBed) {
        matchedBed.attendanceStatus = 'PRESENT';
      }

      this.logAudit(
        this.currentUser?.fullName || 'Chief Warden',
        this.currentUser?.roleType || 'ADMIN',
        'HOSTEL_MOVEMENT_RETURN',
        'HOSTEL',
        movementId,
        `Verified hostel return for ${mv.studentName} at ${timeStr}`
      );
    }
    return mv;
  }

  addHostelVisitor(data: {
    visitorName: string;
    relation: string;
    visitingStudent: string;
    room: string;
    idProofType?: string;
  }) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nv: HostelVisitorRecord = {
      id: `VS-0${this.hostelVisitors.length + 1}`,
      visitorName: data.visitorName,
      relation: data.relation,
      visitingStudent: data.visitingStudent,
      room: data.room,
      idProofType: data.idProofType || 'Govt Photo ID & OTP Verified',
      idVerified: true,
      entryTime: timeStr,
      exitTime: 'In Visitor Lounge',
      status: 'CHECKED_IN',
    };
    this.hostelVisitors.unshift(nv);
    this.logAudit(
      this.currentUser?.fullName || 'Hostel Security',
      this.currentUser?.roleType || 'ADMIN',
      'HOSTEL_VISITOR_IN',
      'HOSTEL',
      nv.id,
      `Checked in visitor ${nv.visitorName} (${nv.relation}) visiting ${nv.visitingStudent}`
    );
    return nv;
  }

  checkoutHostelVisitor(visitorId: string) {
    const v = this.hostelVisitors.find((item) => item.id === visitorId);
    if (v) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      v.exitTime = timeStr;
      v.status = 'CHECKED_OUT';
      this.logAudit(
        this.currentUser?.fullName || 'Hostel Security',
        this.currentUser?.roleType || 'ADMIN',
        'HOSTEL_VISITOR_OUT',
        'HOSTEL',
        visitorId,
        `Checked out visitor ${v.visitorName} at ${timeStr}`
      );
    }
    return v;
  }

  // ================= LIBRARY & INVENTORY END-TO-END METHODS (Section 8) =================
  addLibraryBook(data: {
    title: string;
    author: string;
    isbn?: string;
    category: LibraryBookRecord['category'];
    totalCopies: number;
    isDigitalResource?: boolean;
  }) {
    const newBook: LibraryBookRecord = {
      id: `BK-${Math.floor(906 + Math.random() * 90)}`,
      isbn: data.isbn || `978-81-${Math.floor(100000 + Math.random() * 899999)}`,
      title: data.title,
      author: data.author,
      category: data.category,
      totalCopies: data.totalCopies,
      availableCopies: data.totalCopies,
      status: 'AVAILABLE',
      borrower: '—',
      renewalsCount: 0,
      fineAmount: 0,
      isDigitalResource: Boolean(data.isDigitalResource),
    };
    this.libraryBooks.unshift(newBook);

    // Also add to Student E-Library studyMaterials if digital resource
    if (data.isDigitalResource) {
      const mappedSub: StudyMaterialItem['subject'] =
        data.category === 'Mathematics'
          ? 'Mathematics'
          : data.category === 'Science'
          ? 'Science'
          : data.category === 'Literature'
          ? 'English'
          : 'Computer';
      this.studyMaterials.unshift({
        id: `mat-${Date.now()}`,
        title: `${data.title} (${data.author})`,
        subject: mappedSub,
        format: 'PDF',
        teacher: 'Ms. Sunita Rao (Chief Librarian)',
        fileSizeOrDuration: '4.8 MB E-Book',
        uploadedDate: 'Today',
        isNew: true,
      });
    }

    this.logAudit(
      this.currentUser?.fullName || 'Chief Librarian',
      this.currentUser?.roleType || 'ADMIN',
      'LIBRARY_ADD_BOOK',
      'LIBRARY',
      newBook.id,
      `Catalogued "${newBook.title}" (${newBook.totalCopies} copies)`
    );
    return newBook;
  }

  issueOrReturnLibraryBook(
    bookId: string,
    action: 'ISSUE' | 'RETURN' | 'RENEW' | 'RESERVE' | 'CLEAR_FINE' | 'LOST_DAMAGED',
    studentName: string = 'Elena Vance (9-B)'
  ) {
    const book = this.libraryBooks.find((b) => b.id === bookId);
    if (!book) return undefined;

    if (action === 'ISSUE') {
      book.status = 'ISSUED';
      book.borrower = studentName;
      book.availableCopies = Math.max(0, book.availableCopies - 1);
      book.dueDate = 'Nov 14, 2026';
      book.reservedBy = undefined;
    } else if (action === 'RETURN') {
      book.status = 'AVAILABLE';
      book.borrower = '—';
      book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1);
      book.dueDate = undefined;
      book.fineAmount = 0;
      book.renewalsCount = 0;
    } else if (action === 'RENEW') {
      book.renewalsCount += 1;
      book.dueDate = 'Nov 28, 2026 (+14d Renewed)';
    } else if (action === 'RESERVE') {
      book.status = 'RESERVED';
      book.reservedBy = studentName;
      if (book.borrower === '—') {
        book.borrower = `${studentName} (Reserved)`;
      }
    } else if (action === 'CLEAR_FINE') {
      book.fineAmount = 0;
    } else if (action === 'LOST_DAMAGED') {
      book.status = 'LOST_DAMAGED';
      book.availableCopies = Math.max(0, book.availableCopies - 1);
      book.fineAmount = 450;
    }

    this.logAudit(
      this.currentUser?.fullName || 'Librarian',
      this.currentUser?.roleType || 'ADMIN',
      `LIBRARY_${action}`,
      'LIBRARY',
      book.id,
      `Library ${action} for "${book.title}" (${studentName})`
    );
    return book;
  }

  addInventoryAssetOrder(data: {
    item: string;
    category: InventoryAssetRecord['category'];
    stock: string;
    vendor: string;
    amount: string;
  }) {
    const poNum = `PO-${Math.floor(4105 + Math.random() * 800)}`;
    const newAsset: InventoryAssetRecord = {
      code: `AST-${data.category.slice(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 89)}`,
      item: data.item,
      category: data.category,
      stock: data.stock,
      vendor: data.vendor,
      poNumber: poNum,
      amount: data.amount,
      poStatus: 'Pending Approval',
      maintenance: 'Awaiting Delivery & Verification',
    };
    this.inventoryAssets.unshift(newAsset);

    // Sync to Principal Executive Approvals & Admin Approval Center
    this.principalExecutiveApprovals.unshift({
      id: `exec-po-${Date.now()}`,
      initials: 'AG',
      requesterName: 'Mr. Arvind Gupta',
      requesterRole: 'Procurement Lead',
      title: `${poNum}: ${data.item}`,
      categoryBadge: 'Procurement PO',
      description: `Vendor: ${data.vendor} • Quantity: ${data.stock} • Dept: ${data.category}`,
      amount: data.amount,
      slaString: 'Due in 24h',
      status: 'PENDING',
    });

    this.logAudit(
      this.currentUser?.fullName || 'Procurement Lead',
      this.currentUser?.roleType || 'ADMIN',
      'RAISE_PURCHASE_ORDER',
      'INVENTORY',
      newAsset.code,
      `Raised ${poNum} for ${data.item} (${data.amount}) with ${data.vendor}`
    );
    return newAsset;
  }

  advanceInventoryAssetStatus(code: string) {
    const ast = this.inventoryAssets.find((a) => a.code === code);
    if (!ast) return undefined;
    const order: InventoryAssetRecord['poStatus'][] = [
      'Request Raised',
      'Pending Approval',
      'PO Approved',
      'Delivered',
      'Verified & Active',
    ];
    const next = order[Math.min(order.indexOf(ast.poStatus) + 1, order.length - 1)];
    ast.poStatus = next;
    if (next === 'Verified & Active') {
      ast.maintenance = 'Verified & Calibrated Today';
    }
    this.logAudit(
      this.currentUser?.fullName || 'Admin',
      this.currentUser?.roleType || 'ADMIN',
      'UPDATE_ASSET_PO',
      'INVENTORY',
      code,
      `Advanced ${ast.item} (${ast.poNumber}) to ${next}`
    );
    return ast;
  }

  // ================= ADMISSIONS CRM, ALUMNI & EVENTS/CLUBS METHODS =================
  advanceAdmissionLead(leadId: string) {
    const order: AdmissionLeadRecord['stage'][] = [
      'Enquiry',
      'Counselling',
      'Application',
      'Doc Verification',
      'Entrance Test',
      'Interview',
      'Selected',
      'Fee Paid',
      'Confirmed',
    ];
    const lead = this.admissionLeads.find((l) => l.id === leadId);
    if (lead) {
      const idx = order.indexOf(lead.stage);
      lead.stage = order[Math.min(idx + 1, order.length - 1)];
      this.logAudit(
        this.currentUser?.fullName || 'Admissions Lead',
        this.currentUser?.roleType || 'ADMIN',
        'ADVANCE_ADMISSION_LEAD',
        'ADMISSIONS',
        leadId,
        `Advanced candidate ${lead.candidateName} to ${lead.stage}`
      );
    }
    return lead;
  }

  addAdmissionLead(data: Omit<AdmissionLeadRecord, 'id'>) {
    const newLead: AdmissionLeadRecord = {
      id: `LD-2026-0${this.admissionLeads.length + 1}`,
      ...data,
    };
    this.admissionLeads.unshift(newLead);
    return newLead;
  }

  addAlumniProfile(data: Omit<AlumniProfileRecord, 'id' | 'mentorshipSlotsBooked'>) {
    const newAlumni: AlumniProfileRecord = {
      id: `alm-${Date.now()}`,
      ...data,
      mentorshipSlotsBooked: 1,
    };
    this.alumniProfiles.unshift(newAlumni);
    this.logAudit(
      this.currentUser?.fullName || 'Alumni Relations',
      this.currentUser?.roleType || 'ADMIN',
      'ADD_ALUMNI_PROFILE',
      'ALUMNI',
      newAlumni.id,
      `Registered alumni ${newAlumni.name} (${newAlumni.graduationYear})`
    );
    return newAlumni;
  }

  bookAlumniMentorship(alumniId: string, studentName: string = 'Elena Vance') {
    const alm = this.alumniProfiles.find((a) => a.id === alumniId);
    if (alm) {
      alm.mentorshipSlotsBooked += 1;
      this.logAudit(
        studentName,
        'STUDENT',
        'BOOK_ALUMNI_MENTORSHIP',
        'ALUMNI',
        alumniId,
        `${studentName} booked career mentorship session with ${alm.name} (${alm.organization})`
      );
    }
    return alm;
  }

  addCampusEventOrClub(data: Omit<CampusEventClubRecord, 'id' | 'certificateIssuedCount'>) {
    const newEv: CampusEventClubRecord = {
      id: `evc-${Date.now()}`,
      ...data,
      certificateIssuedCount: 0,
    };
    this.campusEventsAndClubs.unshift(newEv);
    this.logAudit(
      this.currentUser?.fullName || 'Events Coordinator',
      this.currentUser?.roleType || 'ADMIN',
      'CREATE_EVENT_CLUB',
      'EVENTS',
      newEv.id,
      `Created ${newEv.category}: "${newEv.name}" at ${newEv.venue}`
    );
    return newEv;
  }

  issueEventClubCertificate(eventId: string, studentName: string = 'Elena Vance') {
    const ev = this.campusEventsAndClubs.find((e) => e.id === eventId);
    if (!ev) return undefined;
    ev.certificateIssuedCount += 1;
    const certType: ParentCertificateItem['type'] =
      ev.category === 'Sports'
        ? 'SPORTS'
        : ev.category === 'Event'
        ? 'EVENT'
        : 'PARTICIPATION';
    return this.requestParentCertificate({
      studentName,
      type: certType,
      purpose: `${ev.name} — ${ev.resultOrAchievement}`,
    });
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
