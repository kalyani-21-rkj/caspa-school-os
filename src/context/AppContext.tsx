import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  RoleType,
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
  MasterTimetableSlot,
  IncidentStatus,
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
} from '../types';
import {
  USERS,
  INITIAL_TEACHER_CLASSES,
  INITIAL_TEACHER_STUDENTS,
  INITIAL_TEACHER_TASKS,
  INITIAL_PARENT_MESSAGES,
  INITIAL_STUDENT_PERIODS,
  INITIAL_STUDENT_TASKS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_STUDENT_ACHIEVEMENTS,
  INITIAL_ATTENDANCE_HEATMAP,
  INITIAL_ADMIN_STUDENTS,
  INITIAL_STAFF_MEMBERS,
  INITIAL_FEE_INVOICES,
  INITIAL_CLASS_SECTIONS,
  INITIAL_SAFETY_INCIDENTS,
  INITIAL_APPROVALS,
  INITIAL_PRINCIPAL_AGENDA,
  INITIAL_PRINCIPAL_CRITICAL_ALERTS,
  INITIAL_PRINCIPAL_STAFF_LEAVES,
  INITIAL_STAFF_PAYROLL_RECORDS,
  INITIAL_PRINCIPAL_SAFEGUARDING_CASES,
  INITIAL_PRINCIPAL_EXECUTIVE_APPROVALS,
  INITIAL_PRINCIPAL_OPERATIONS_MODULES,
  db,
} from '../services/db';

export interface AbsenceExcuseItem {
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
}

interface AppContextType {
  // Authentication & Authorization
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  authenticatedUser: UserProfile | null;
  canAccessAllModules: boolean;
  currentRole: RoleType;
  setRole: (role: RoleType) => void;
  login: (emailOrUsername: string, password?: string, preferredRole?: RoleType) => void;
  register: (username: string, designation: string, email: string, password?: string, roleOverride?: RoleType) => void;
  logout: () => void;
  authView: 'login' | 'register' | 'portal';
  setAuthView: (view: 'login' | 'register' | 'portal') => void;
  hasPermission: (module: string, action: 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export') => boolean;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileSimulatorOpen: boolean;
  setIsMobileSimulatorOpen: (open: boolean) => void;
  simulatorRole: RoleType;
  setSimulatorRole: (role: RoleType) => void;

  // Student Module Entities & Actions
  studentPeriods: StudentPeriod[];
  studentTasks: StudentTaskItem[];
  studyMaterials: StudyMaterialItem[];
  studentAchievements: StudentAchievement[];
  attendanceHeatmap: AttendanceDayRecord[];
  absenceExcuses: AbsenceExcuseItem[];
  submitStudentTask: (
    taskId: string,
    submissionData?: {
      fileName?: string;
      fileSize?: string;
      fileUrl?: string;
      note?: string;
    }
  ) => void;
  submitAbsenceExcuse: (date: string, reason: string, attachmentName?: string) => void;
  reviewStudentAbsenceExcuse: (excuseId: string, decision: 'APPROVED' | 'REJECTED', teacherNote?: string) => void;

  // Teacher Module Entities & Actions
  teacherClasses: TeacherClass[];
  teacherStudents: TeacherStudent[];
  teacherTasks: TeacherTask[];
  parentMessages: ParentMessage[];
  setStudentAttendance: (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => void;
  markAllStudentsPresent: () => void;
  updateStudentGrade: (studentId: string, score: number | null, note?: string) => void;
  createTask: (title: string, type: 'HOMEWORK' | 'ASSIGNMENT', gradeSection: string, dueDate: string, description?: string) => void;
  gradeStudentTaskSubmission: (teacherTaskId: string, score: number, feedback: string) => void;
  submitTeacherLeaveRequest: (data: { leaveType: 'Casual' | 'Medical' | 'Duty'; durationDates: string; note: string }) => void;
  sendParentMessage: (parentId: string, replyText: string) => void;

  // Admin & School-wide Enterprise data
  students: Student[];
  staffMembers: AdminStaffMember[];
  feeInvoices: FeeInvoiceItem[];
  classSections: ClassSectionDetail[];
  attendance: AttendanceRecord[];
  safetyIncidents: SafetyIncident[];
  approvals: ApprovalTask[];
  buses: BusVehicle[];
  auditLogs: AuditLogItem[];
  timetable: TimetableSlot[];
  masterTimetable: MasterTimetableSlot[];
  availableTimetableWeeks: string[];
  activeTimetableWeek: string;
  setActiveTimetableWeek: (week: string) => void;
  addTimetableWeek: (weekLabel: string) => void;
  addOrUpdateTimetableSlot: (
    slotData: Omit<MasterTimetableSlot, 'id'> & { id?: string; applyToAllWeekdays?: boolean }
  ) => void;
  deleteTimetableSlot: (slotId: string) => void;
  generateWeeklyTimetable: (options: {
    weekLabel: string;
    gradeSection: string;
    days?: MasterTimetableSlot['day'][];
    periodsPerDay?: number;
    autoPublish?: boolean;
  }) => void;
  publishMasterTimetable: (weekLabel: string, gradeSection?: string) => void;
  togglePeriodCompletion: (slotOrClassId: string, teacherName?: string, lectureNote?: string) => void;

  // Admin Actions
  admitStudent: (data: {
    fullName: string;
    grade: string;
    section: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    busRoute?: string;
  }) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  archiveStudent: (id: string) => void;
  addStaffMember: (data: {
    fullName: string;
    designation: string;
    department: AdminStaffMember['department'];
    email: string;
    phone: string;
    qualification: string;
    classesAssigned: string[];
    workloadPeriods: number;
  }) => void;
  updateStaffMember: (id: string, updates: Partial<AdminStaffMember>) => void;
  recordFeePayment: (invoiceId: string, amount: number, paymentMethod: string) => void;
  updateSafetyIncident: (id: string, status: SafetyIncident['status'], note?: string) => void;
  createIncident: (data: Partial<SafetyIncident>) => void;
  updateIncidentStatus: (id: string, status: IncidentStatus, actionTaken?: string) => void;
  markAttendance: (studentId: string, status: AttendanceRecord['status']) => void;
  batchMarkAttendance: (status: AttendanceRecord['status'], grade?: string, section?: string) => void;
  processApproval: (id: string, action: 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED', comment?: string) => void;
  updateRbacPermission: (role: RoleType, moduleId: string, field: 'canView' | 'canCreate' | 'canEdit' | 'canDelete' | 'canApprove' | 'canExport', value: boolean) => void;

  // Principal Module Entities & Actions
  principalAgenda: PrincipalAgendaItem[];
  principalCriticalAlerts: PrincipalCriticalAlert[];
  principalStaffLeaves: PrincipalStaffLeaveItem[];
  staffPayrollRecords: StaffPayrollRecord[];
  principalSafeguardingCases: PrincipalSafeguardingCase[];
  principalExecutiveApprovals: PrincipalExecutiveApproval[];
  principalOperationsModules: PrincipalOperationModule[];
  principalDefaulters: { id: string; studentName: string; gradeSection: string; overdueDays: number; amount: string; status: string; noticeLevel: string }[];
  dispatchCriticalAlert: (alertId: string, actionType: string) => void;
  processPrincipalStaffLeave: (leaveId: string, action: 'APPROVED' | 'REJECTED', remark?: string) => void;
  disburseStaffPayroll: (payrollId: string) => void;
  disburseAllStaffPayroll: () => void;
  createSafeguardingCase: (data: {
    title: string;
    category: PrincipalSafeguardingCase['category'];
    severity: PrincipalSafeguardingCase['severity'];
    studentMaskedId?: string;
    details?: string;
  }) => void;
  updateSafeguardingCaseStep: (caseId: string, step: number) => void;
  processExecutiveApprovalAction: (approvalId: string, action: 'APPROVED' | 'CHANGES_REQUESTED' | 'REJECTED', note?: string) => void;
  submitExecutiveApprovalRequest: (data: {
    title: string;
    categoryBadge: string;
    description: string;
    amount?: string;
    isEmergency?: boolean;
  }) => void;
  triggerEmergencyProtocol: (protocol: 'LOCKDOWN' | 'BROADCAST' | 'EVACUATE', details?: string) => void;
  sendFeeReminder: (defaulterId: string) => void;
  addStaffObservationNote: (staffId: string, noteData: { author: string; rating: number; cycle: string; notes: string; commendation?: string }) => void;
  updateStaffWorkload: (staffId: string, workloadPeriods: number, classesAssigned: string[]) => void;
  updateStaffLiveStatus: (staffId: string, liveStatusText: string, roomLocation: string) => void;
  issueStaffCommendation: (staffId: string, commendationTitle: string, note: string) => void;
  updateSafeguardingCaseDetails: (caseId: string, note: string) => void;
  closeSafeguardingCase: (caseId: string, resolutionSummary: string) => void;
  recordCohortIntervention: (cohortName: string, intervention: { targetFloor: number; remediationAction: string; assignedMentor: string; parentNoticeDispatched: boolean }) => void;
  recordFeeConcession: (studentId: string, waiverPercent: number, reason: string) => void;
  recordFeeNoticeDispatch: (studentId: string, channel: string, customNotice?: string) => void;
  dispatchSubsystemAction: (subsystemId: string, actionName: string, detail: string) => void;

  // Vice Principal Module State & Actions (Images 1-7)
  vpConflicts: VicePrincipalSchedulingConflict[];
  vpLessonPlans: VicePrincipalLessonPlan[];
  vpExams: VicePrincipalExamSession[];
  vpPublicationQueue: VicePrincipalPublicationQueueItem[];
  vpTeachers: VicePrincipalTeacherItem[];
  resolveVpConflict: (conflictId: string, resolutionAction: string) => void;
  updateVpLessonPlanStatus: (planId: string, status: 'APPROVED' | 'NEEDS_REVISION' | 'REJECTED', note?: string) => void;
  publishVpExamResult: (queueItemId: string) => void;
  pingTeacherReminder: (teacherId: string, customMessage?: string) => void;
  addPeriodOverride: (data: { period: string; class: string; room: string; teacher: string }) => void;

  // Parent Module State & Actions (Images 1-7)
  activeChildId: string;
  activeChild: ParentChildProfile;
  parentChildren: ParentChildProfile[];
  parentFees: ParentFeeItem[];
  parentNotices: ParentNoticeItem[];
  parentCertificates: ParentCertificateItem[];
  parentTransport: ParentTransportTelemetry;
  parentLeaves: ParentLeaveRequest[];
  parentPtms: ParentPtmBooking[];
  switchActiveChild: (childId: string) => void;
  payParentFee: (feeId: string, paymentMethod?: string) => void;
  payAllPendingFees: (childId: string, paymentMethod?: string) => void;
  acknowledgeParentNotice: (noticeId: string) => void;
  registerParentNoticeEvent: (noticeId: string) => void;
  requestParentCertificate: (data: { childId: string; type: ParentCertificateItem['type']; purpose: string }) => void;
  applyParentStudentLeave: (data: { childId: string; startDate: string; endDate: string; reason: string; type: ParentLeaveRequest['type'] }) => void;
  bookParentPtmSlot: (data: { childId: string; timeSlot: string; teacherName: string; subject: string; venue?: string }) => void;
  linkNewChild: (data: { fullName: string; grade: string; section: string; rollNo: number; curriculum: 'CBSE' | 'IB' | 'ICSE' }) => void;

  // Toast System
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start unauthenticated so every user must sign in or register first
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<UserProfile | null>(null);
  const [currentRole, setCurrentRole] = useState<RoleType>('STUDENT');
  const [authView, setAuthView] = useState<'login' | 'register' | 'portal'>('login');

  const canAccessAllModules =
    authenticatedUser?.roleType === 'ADMIN' || authenticatedUser?.roleType === 'SUPER_ADMIN';

  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMobileSimulatorOpen, setIsMobileSimulatorOpen] = useState<boolean>(false);
  const [simulatorRole, setSimulatorRole] = useState<RoleType>('STUDENT');

  // Student Module Data
  const [studentPeriods, setStudentPeriods] = useState<StudentPeriod[]>([...INITIAL_STUDENT_PERIODS]);
  const [studentTasks, setStudentTasks] = useState<StudentTaskItem[]>([...INITIAL_STUDENT_TASKS]);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterialItem[]>([...INITIAL_STUDY_MATERIALS]);
  const [studentAchievements, setStudentAchievements] = useState<StudentAchievement[]>([...INITIAL_STUDENT_ACHIEVEMENTS]);
  const [attendanceHeatmap, setAttendanceHeatmap] = useState<AttendanceDayRecord[]>([...INITIAL_ATTENDANCE_HEATMAP]);
  const [absenceExcuses, setAbsenceExcuses] = useState<AbsenceExcuseItem[]>([...db.absenceExcuses]);

  // Teacher Module Data
  const [teacherClasses, setTeacherClasses] = useState<TeacherClass[]>([...INITIAL_TEACHER_CLASSES]);
  const [teacherStudents, setTeacherStudents] = useState<TeacherStudent[]>([...INITIAL_TEACHER_STUDENTS]);
  const [teacherTasks, setTeacherTasks] = useState<TeacherTask[]>([...INITIAL_TEACHER_TASKS]);
  const [parentMessages, setParentMessages] = useState<ParentMessage[]>([...INITIAL_PARENT_MESSAGES]);

  // Admin & Enterprise Data
  const [students, setStudents] = useState<Student[]>([...INITIAL_ADMIN_STUDENTS]);
  const [staffMembers, setStaffMembers] = useState<AdminStaffMember[]>([...INITIAL_STAFF_MEMBERS]);
  const [feeInvoices, setFeeInvoices] = useState<FeeInvoiceItem[]>([...INITIAL_FEE_INVOICES]);
  const [classSections, setClassSections] = useState<ClassSectionDetail[]>([...INITIAL_CLASS_SECTIONS]);
  const [safetyIncidents, setSafetyIncidents] = useState<SafetyIncident[]>([...INITIAL_SAFETY_INCIDENTS]);
  const [approvals, setApprovals] = useState<ApprovalTask[]>([...INITIAL_APPROVALS]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([...db.auditLogs]);

  // Master Week-wise & Section-wise Timetable State
  const DEFAULT_TIMETABLE_WEEKS = [
    'Week 8 (Oct 26 - Oct 31, 2026)',
    'Week 9 (Nov 02 - Nov 07, 2026)',
    'Week 10 (Nov 09 - Nov 14, 2026)',
  ];
  const [availableTimetableWeeks, setAvailableTimetableWeeks] = useState<string[]>(DEFAULT_TIMETABLE_WEEKS);
  const [activeTimetableWeek, setActiveTimetableWeek] = useState<string>(DEFAULT_TIMETABLE_WEEKS[0]);

  const buildInitialMasterTimetable = (): MasterTimetableSlot[] => {
    const days: MasterTimetableSlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const base9BSlots = [
      { period: 1, timeRange: '08:30 - 09:15 AM', subject: 'Mathematics (Calculus Core)', unitTopic: 'Quadratic Equation Factorization Ch. 4.2', teacher: 'Mrs. Oswald', room: 'Room 204' },
      { period: 2, timeRange: '09:20 - 10:05 AM', subject: 'English Literature', unitTopic: 'Shakespearean Tragedy & Rhetoric', teacher: 'Dr. Katherine Wells', room: 'Room 204' },
      { period: 3, timeRange: '10:15 - 11:00 AM', subject: 'AP Physics (Thermodynamics)', unitTopic: 'Laws of Heat Transfer & Entropy', teacher: 'Dr. Alistair Ross', room: 'Lab 204 North' },
      { period: 4, timeRange: '11:05 - 11:50 AM', subject: 'World History & Civics', unitTopic: 'Modern Constitutional Frameworks', teacher: 'Mr. Marcus Vance', room: 'Room 304' },
      { period: 5, timeRange: '12:35 - 01:20 PM', subject: 'Chemistry Lab Practical', unitTopic: 'Titration & Molarity Calculations', teacher: 'Dr. Alistair Ross', room: 'Science Lab 2' },
      { period: 6, timeRange: '01:25 - 02:10 PM', subject: 'Computer Science & Python', unitTopic: 'Data Structures & Recursion Lab', teacher: 'Mr. Anand Sharma', room: 'STEM Lab' },
      { period: 7, timeRange: '02:15 - 03:00 PM', subject: 'Physical Education & Athletics', unitTopic: 'Track Conditioning & Team Drills', teacher: 'Coach Briggs', room: 'Main Gymnasium' },
    ];
    const base10ASlots = [
      { period: 1, timeRange: '08:30 - 09:15 AM', subject: 'AP Physics Mechanics', unitTopic: 'Newtonian Kinematics & Vectors', teacher: 'Dr. Alistair Ross', room: 'Lab 204 North' },
      { period: 2, timeRange: '09:20 - 10:05 AM', subject: 'Algebra II Honors', unitTopic: 'Polynomial Functions & Graphs', teacher: 'Mrs. Oswald', room: 'Room 204' },
      { period: 3, timeRange: '10:15 - 11:00 AM', subject: 'World Literature', unitTopic: 'Modernist Poetry Analysis', teacher: 'Dr. Katherine Wells', room: 'Room 208' },
      { period: 4, timeRange: '11:05 - 11:50 AM', subject: 'Computer Science & AI', unitTopic: 'Neural Network Basics in Python', teacher: 'Mr. Anand Sharma', room: 'STEM Lab' },
      { period: 5, timeRange: '12:35 - 01:20 PM', subject: 'Remedial Math Lab', unitTopic: 'Problem Solving Workshop', teacher: 'Mrs. Oswald', room: 'Math Lab 1' },
      { period: 6, timeRange: '01:25 - 02:10 PM', subject: 'Global Economics & Civics', unitTopic: 'Macroeconomic Indicators', teacher: 'Mr. Marcus Vance', room: 'Room 304' },
    ];

    const generated: MasterTimetableSlot[] = [];
    for (const week of DEFAULT_TIMETABLE_WEEKS.slice(0, 2)) {
      for (const day of days) {
        const daySlots9B = day === 'Saturday' ? base9BSlots.slice(0, 4) : base9BSlots;
        daySlots9B.forEach((slot) => {
          generated.push({
            id: `tt-${week.slice(0, 6).replace(/\s+/g, '')}-9B-${day}-P${slot.period}`,
            weekLabel: week,
            gradeSection: '9B',
            day,
            period: slot.period,
            timeRange: slot.timeRange,
            subject: slot.subject,
            unitTopic: slot.unitTopic,
            teacher: slot.teacher,
            room: slot.room,
            isPublished: true,
            publishedAt: 'Oct 25, 2026 • 04:30 PM',
            status: day === 'Monday' && slot.period === 1 && week === DEFAULT_TIMETABLE_WEEKS[0] ? 'COMPLETED' : 'UPCOMING',
            completedAt: day === 'Monday' && slot.period === 1 && week === DEFAULT_TIMETABLE_WEEKS[0] ? '09:15 AM' : undefined,
            completedByTeacher: day === 'Monday' && slot.period === 1 && week === DEFAULT_TIMETABLE_WEEKS[0] ? slot.teacher : undefined,
          });
        });

        const daySlots10A = day === 'Saturday' ? base10ASlots.slice(0, 4) : base10ASlots;
        daySlots10A.forEach((slot) => {
          generated.push({
            id: `tt-${week.slice(0, 6).replace(/\s+/g, '')}-10A-${day}-P${slot.period}`,
            weekLabel: week,
            gradeSection: '10A',
            day,
            period: slot.period,
            timeRange: slot.timeRange,
            subject: slot.subject,
            unitTopic: slot.unitTopic,
            teacher: slot.teacher,
            room: slot.room,
            isPublished: true,
            publishedAt: 'Oct 25, 2026 • 04:30 PM',
            status: 'UPCOMING',
          });
        });
      }
    }
    return generated;
  };

  const [masterTimetable, setMasterTimetable] = useState<MasterTimetableSlot[]>(() => buildInitialMasterTimetable());

  // Principal & Governance Data
  const [principalAgenda, setPrincipalAgenda] = useState<PrincipalAgendaItem[]>([...INITIAL_PRINCIPAL_AGENDA]);
  const [principalCriticalAlerts, setPrincipalCriticalAlerts] = useState<PrincipalCriticalAlert[]>([...INITIAL_PRINCIPAL_CRITICAL_ALERTS]);
  const [principalStaffLeaves, setPrincipalStaffLeaves] = useState<PrincipalStaffLeaveItem[]>([...INITIAL_PRINCIPAL_STAFF_LEAVES]);
  const [staffPayrollRecords, setStaffPayrollRecords] = useState<StaffPayrollRecord[]>([...INITIAL_STAFF_PAYROLL_RECORDS]);
  const [principalSafeguardingCases, setPrincipalSafeguardingCases] = useState<PrincipalSafeguardingCase[]>([...INITIAL_PRINCIPAL_SAFEGUARDING_CASES]);
  const [principalExecutiveApprovals, setPrincipalExecutiveApprovals] = useState<PrincipalExecutiveApproval[]>([...INITIAL_PRINCIPAL_EXECUTIVE_APPROVALS]);
  const [principalOperationsModules, setPrincipalOperationsModules] = useState<PrincipalOperationModule[]>([...INITIAL_PRINCIPAL_OPERATIONS_MODULES]);
  const [principalDefaulters, setPrincipalDefaulters] = useState(db.principalDefaulters);

  // Vice Principal Module State (Images 1-7)
  const [vpConflicts, setVpConflicts] = useState<VicePrincipalSchedulingConflict[]>([...db.vpConflicts]);
  const [vpLessonPlans, setVpLessonPlans] = useState<VicePrincipalLessonPlan[]>([...db.vpLessonPlans]);
  const [vpExams, setVpExams] = useState<VicePrincipalExamSession[]>([...db.vpExams]);
  const [vpPublicationQueue, setVpPublicationQueue] = useState<VicePrincipalPublicationQueueItem[]>([...db.vpPublicationQueue]);
  const [vpTeachers, setVpTeachers] = useState<VicePrincipalTeacherItem[]>([...db.vpTeachers]);

  // Parent Module State (Images 1-7)
  const [activeChildId, setActiveChildId] = useState<string>(db.activeChildId);
  const [parentChildren, setParentChildren] = useState<ParentChildProfile[]>([...db.parentChildren]);
  const [parentFees, setParentFees] = useState<ParentFeeItem[]>([...db.parentFees]);
  const [parentNotices, setParentNotices] = useState<ParentNoticeItem[]>([...db.parentNotices]);
  const [parentCertificates, setParentCertificates] = useState<ParentCertificateItem[]>([...db.parentCertificates]);
  const [parentTransport, setParentTransport] = useState<ParentTransportTelemetry>({ ...db.parentTransport });
  const [parentLeaves, setParentLeaves] = useState<ParentLeaveRequest[]>([...db.parentLeaves]);
  const [parentPtms, setParentPtms] = useState<ParentPtmBooking[]>([...db.parentPtms]);

  const activeChild = parentChildren.find(c => c.id === activeChildId) || parentChildren[0];

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // RBAC Permission Check
  const hasPermission = (module: string, action: 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export'): boolean => {
    if (!currentUser) return false;
    if (
      currentUser.roleType === 'PRINCIPAL' ||
      currentUser.roleType === 'VICE_PRINCIPAL' ||
      currentUser.roleType === 'SUPER_ADMIN' ||
      currentUser.roleType === 'ADMIN'
    ) return true;

    const perm = currentUser.permissions.find(p => p.module === module);
    if (!perm) return false;

    switch (action) {
      case 'view': return perm.canView;
      case 'create': return perm.canCreate;
      case 'edit': return perm.canEdit;
      case 'delete': return perm.canDelete;
      case 'approve': return perm.canApprove;
      case 'export': return perm.canExport;
      default: return false;
    }
  };

  const login = (emailOrUsername: string, password?: string, preferredRole?: RoleType) => {
    const res = db.login(emailOrUsername, password, preferredRole);
    if (res.success && res.user) {
      setAuthenticatedUser(res.user);
      setCurrentUser(res.user);
      setCurrentRole(res.user.roleType);
      setSimulatorRole(res.user.roleType);
      setIsAuthenticated(true);
      setActiveTab('home');
      setAuditLogs([...db.auditLogs]);
      showToast(`Signed in as ${res.user.fullName} (${res.user.roleType.replace('_', ' ')} Module Authorized)`);
    } else {
      showToast(res.error || 'Login failed');
    }
  };

  const register = (username: string, designation: string, email: string, password?: string, roleOverride?: RoleType) => {
    const res = db.register(username, designation, email, password, roleOverride);
    if (res.success && res.user) {
      setAuthenticatedUser(res.user);
      setCurrentUser(res.user);
      setCurrentRole(res.user.roleType);
      setSimulatorRole(res.user.roleType);
      setIsAuthenticated(true);
      setActiveTab('home');
      setAuditLogs([...db.auditLogs]);
      showToast(`Account registered for ${res.user.fullName} • Authorized for ${res.user.roleType.replace('_', ' ')} Module`);
    }
  };

  const logout = () => {
    db.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAuthenticatedUser(null);
    setAuthView('login');
    showToast('Signed out of workspace');
  };

  const setRole = (role: RoleType) => {
    const isAdminSession =
      authenticatedUser?.roleType === 'ADMIN' || authenticatedUser?.roleType === 'SUPER_ADMIN';

    if (!isAdminSession && role !== authenticatedUser?.roleType) {
      showToast(`Access Restricted: Your account is authorized only for the ${authenticatedUser?.roleType} module.`);
      return;
    }

    if (USERS[role]) {
      setCurrentRole(role);
      setCurrentUser(USERS[role]);
      db.currentUser = USERS[role];
      setSimulatorRole(role);
      setActiveTab('home');
      showToast(`Admin Master View: Switched to ${role.replace('_', ' ')} Module`);
    }
  };

  // Student Actions
  const submitStudentTask = (
    taskId: string,
    submissionData?: {
      fileName?: string;
      fileSize?: string;
      fileUrl?: string;
      note?: string;
    }
  ) => {
    const updated = db.submitStudentTask(taskId, submissionData);
    if (updated) {
      setStudentTasks([...db.studentTasks]);
      setTeacherTasks([...db.teacherTasks]);
      setAuditLogs([...db.auditLogs]);
      showToast(
        submissionData?.fileName
          ? `Uploaded "${submissionData.fileName}" for "${updated.title}" (Synced to Teacher Portal)`
          : `Submitted solution for "${updated.title}"`
      );
    }
  };

  const submitAbsenceExcuse = (date: string, reason: string, attachmentName?: string) => {
    const excuse = db.submitAbsenceExcuse(date, reason, attachmentName);
    setAbsenceExcuses([...db.absenceExcuses]);
    setAuditLogs([...db.auditLogs]);
    showToast(`Absence excuse for ${excuse.date} submitted • Sent to Class Teacher (Mrs. Oswald) for approval`);
  };

  const reviewStudentAbsenceExcuse = (
    excuseId: string,
    decision: 'APPROVED' | 'REJECTED',
    teacherNote?: string
  ) => {
    const updated = db.reviewStudentAbsenceExcuse(excuseId, decision, teacherNote);
    if (updated) {
      setAbsenceExcuses([...db.absenceExcuses]);
      setAuditLogs([...db.auditLogs]);
      showToast(
        `${decision === 'APPROVED' ? 'Approved' : 'Rejected'} ${updated.studentName}'s absence excuse (${updated.date}) • Synced to Student Portal`
      );
    }
  };

  // Teacher Attendance
  const setStudentAttendance = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    db.setStudentAttendance(studentId, status);
    setTeacherStudents([...db.teacherStudents]);
  };

  const markAllStudentsPresent = () => {
    db.markAllStudentsPresent();
    setTeacherStudents([...db.teacherStudents]);
    showToast('Marked all students in Section 9B as Present');
  };

  // Teacher Grading
  const updateStudentGrade = (studentId: string, score: number | null, note?: string) => {
    db.updateStudentGrade(studentId, score, note);
    setTeacherStudents([...db.teacherStudents]);
  };

  // Teacher Tasks
  const createTask = (
    title: string,
    type: 'HOMEWORK' | 'ASSIGNMENT',
    gradeSection: string,
    dueDate: string,
    description?: string
  ) => {
    const newTask = db.createTask(title, type, gradeSection, dueDate, description);
    setTeacherTasks([...db.teacherTasks]);
    setStudentTasks([...db.studentTasks]);
    setAuditLogs([...db.auditLogs]);
    showToast(`Published ${type}: "${title}" to ${gradeSection} (Synced to Student Portal)`);
    return newTask;
  };

  const gradeStudentTaskSubmission = (teacherTaskId: string, score: number, feedback: string) => {
    const updated = db.gradeStudentTaskSubmission(teacherTaskId, score, feedback);
    if (updated) {
      setTeacherTasks([...db.teacherTasks]);
      setStudentTasks([...db.studentTasks]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Graded "${updated.title}" (${score}/100) • Synced to Student Portal`);
    }
  };

  const submitTeacherLeaveRequest = (data: {
    leaveType: 'Casual' | 'Medical' | 'Duty';
    durationDates: string;
    note: string;
  }) => {
    const leave = db.submitTeacherLeaveRequest(data);
    setPrincipalStaffLeaves([...db.principalStaffLeaves]);
    setAuditLogs([...db.auditLogs]);
    showToast(`Leave request (${leave.durationDates}) sent to Principal for approval`);
  };

  // Parent Comms
  const sendParentMessage = (parentId: string, replyText: string) => {
    db.sendParentMessage(parentId, replyText);
    setParentMessages([...db.parentMessages]);
  };

  // Admin Actions
  const admitStudent = (data: {
    fullName: string;
    grade: string;
    section: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    busRoute?: string;
  }) => {
    const newStudent = db.admitStudent(data);
    setStudents([...db.students]);
    setTeacherStudents([...db.teacherStudents]);
    setTeacherClasses([...db.teacherClasses]);
    setClassSections([...db.classSections]);
    setParentMessages([...db.parentMessages]);
    setFeeInvoices([...db.feeInvoices]);
    setAuditLogs([...db.auditLogs]);
    const matchedSection = db.classSections.find(
      (cs) => cs.section.toLowerCase() === data.section.toLowerCase()
    );
    const teacherLabel = matchedSection?.classTeacher || 'Mrs. Oswald';
    showToast(
      `Admitted ${newStudent.fullName} (${newStudent.admissionNo}) to ${newStudent.grade} (${newStudent.section}) • Synced to ${teacherLabel}`
    );
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    const updated = db.updateStudent(id, updates);
    if (updated) {
      setStudents([...db.students]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Updated profile for ${updated.fullName}`);
    }
  };

  const archiveStudent = (id: string) => {
    const archived = db.archiveStudent(id);
    if (archived) {
      setStudents([...db.students]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Archived student ${archived.fullName}`);
    }
  };

  const addStaffMember = (data: {
    fullName: string;
    designation: string;
    department: AdminStaffMember['department'];
    email: string;
    phone: string;
    qualification: string;
    classesAssigned: string[];
    workloadPeriods: number;
  }) => {
    const newStaff = db.addStaffMember(data);
    setStaffMembers([...db.staffMembers]);
    setAuditLogs([...db.auditLogs]);
    showToast(`Onboarded ${newStaff.fullName} to ${newStaff.department}`);
  };

  const updateStaffMember = (id: string, updates: Partial<AdminStaffMember>) => {
    const updated = db.updateStaffMember(id, updates);
    if (updated) {
      setStaffMembers([...db.staffMembers]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Updated staff details for ${updated.fullName}`);
    }
  };

  const recordFeePayment = (invoiceId: string, amount: number, paymentMethod: string) => {
    const inv = db.recordFeePayment(invoiceId, amount, paymentMethod);
    if (inv) {
      setFeeInvoices([...db.feeInvoices]);
      setStudents([...db.students]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Recorded $${amount} fee payment for ${inv.studentName}`);
    }
  };

  const updateSafetyIncident = (id: string, status: SafetyIncident['status'], note?: string) => {
    const inc = db.updateSafetyIncident(id, status, note);
    if (inc) {
      setSafetyIncidents([...db.safetyIncidents]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Updated Case #${inc.caseNumber} status to ${status}`);
    }
  };

  const processApproval = (id: string, action: 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED', comment?: string) => {
    const app = db.processApproval(id, action, comment);
    if (app) {
      setApprovals([...db.approvals]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Requisition marked as ${action}`);
    }
  };

  const updateRbacPermission = (role: RoleType, moduleId: string, field: 'canView' | 'canCreate' | 'canEdit' | 'canDelete' | 'canApprove' | 'canExport', value: boolean) => {
    db.updateRbacPermission(role, moduleId, field, value);
    setAuditLogs([...db.auditLogs]);
    showToast(`Updated ${role} ${moduleId} permissions`);
  };

  const createIncident = (data: Partial<SafetyIncident>) => {
    const newInc: SafetyIncident = {
      id: `safe-${Date.now()}`,
      caseNumber: `SAFE-2026-${Math.floor(100 + Math.random() * 900)}`,
      category: data.category || 'Child Safety',
      risk: data.risk || 'HIGH',
      status: 'REPORTED',
      isAnonymous: data.isAnonymous ?? true,
      reporterName: data.reporterName,
      reporterRole: data.reporterRole,
      assignedInvestigator: 'Arthur Clark (Director of Student Safety)',
      campusId: 'camp-01',
      campusName: 'Main Campus',
      location: data.location || 'Campus Ground',
      dateTime: 'Just now',
      description: data.description || '',
      evidenceUrls: [],
      slaDeadline: '24 Hours SLA',
      isSlaBreached: false,
      investigationNotes: [],
      createdAt: 'Just now',
      updatedAt: 'Just now',
    };
    db.safetyIncidents.unshift(newInc);
    setSafetyIncidents([...db.safetyIncidents]);
    showToast(`Case ${newInc.caseNumber} logged securely`);
  };

  const updateIncidentStatus = (id: string, status: IncidentStatus, actionTaken?: string) => {
    updateSafetyIncident(id, status, actionTaken);
  };

  const markAttendance = (studentId: string, status: AttendanceRecord['status']) => {
    setStudentAttendance(studentId, status === 'EXCUSED' ? 'LATE' : (status as any));
  };

  const batchMarkAttendance = () => {
    markAllStudentsPresent();
  };

  const dispatchCriticalAlert = (alertId: string, actionType: string) => {
    const res = db.dispatchCriticalAlert(alertId, actionType);
    if (res) {
      setPrincipalCriticalAlerts([...db.principalCriticalAlerts]);
      showToast(`Action dispatched: ${res.actionLabel}`);
    }
  };

  const processPrincipalStaffLeave = (leaveId: string, action: 'APPROVED' | 'REJECTED', remark?: string) => {
    const res = db.processPrincipalStaffLeave(leaveId, action, remark);
    if (res) {
      setPrincipalStaffLeaves([...db.principalStaffLeaves]);
      setStaffMembers([...db.staffMembers]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Staff leave for ${res.staffName} marked as ${action} (Synced to Teacher Account)`);
    }
  };

  const disburseStaffPayroll = (payrollId: string) => {
    const res = db.disburseStaffPayroll(payrollId);
    if (res) {
      setStaffPayrollRecords([...db.staffPayrollRecords]);
      setStaffMembers([...db.staffMembers]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Disbursed ${res.monthlySalaryFormatted} to ${res.staffName}'s ${res.bankName} account (UTR: ${res.utrNumber})`);
    }
  };

  const disburseAllStaffPayroll = () => {
    const count = db.disburseAllStaffPayroll();
    setStaffPayrollRecords([...db.staffPayrollRecords]);
    setStaffMembers([...db.staffMembers]);
    setAuditLogs([...db.auditLogs]);
    showToast(`Processed & credited salary to bank accounts for all ${count} pending staff members`);
  };

  const createSafeguardingCase = (data: {
    title: string;
    category: PrincipalSafeguardingCase['category'];
    severity: PrincipalSafeguardingCase['severity'];
    studentMaskedId?: string;
    details?: string;
  }) => {
    const newCase = db.createSafeguardingCase(data);
    setPrincipalSafeguardingCases([...db.principalSafeguardingCases]);
    setAuditLogs([...db.auditLogs]);
    showToast(`Logged Safeguarding ${newCase.caseNo} & assigned to Officer Davis`);
  };

  const updateSafeguardingCaseStep = (caseId: string, step: number) => {
    const res = db.updateSafeguardingCaseStep(caseId, step);
    if (res) {
      setPrincipalSafeguardingCases([...db.principalSafeguardingCases]);
      showToast(`Updated case stage to step ${step}`);
    }
  };

  const processExecutiveApprovalAction = (approvalId: string, action: 'APPROVED' | 'CHANGES_REQUESTED' | 'REJECTED', note?: string) => {
    const res = db.processExecutiveApprovalAction(approvalId, action, note);
    if (res) {
      setPrincipalExecutiveApprovals([...db.principalExecutiveApprovals]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Executive decision (${action.replace('_', ' ')}) synced to ${res.requesterName}'s account`);
    }
  };

  const submitExecutiveApprovalRequest = (data: {
    title: string;
    categoryBadge: string;
    description: string;
    amount?: string;
    isEmergency?: boolean;
  }) => {
    const created = db.submitExecutiveApprovalRequest(data);
    setPrincipalExecutiveApprovals([...db.principalExecutiveApprovals]);
    setAuditLogs([...db.auditLogs]);
    showToast(`Submitted "${created.title}" to Principal Executive Approvals queue`);
  };

  const triggerEmergencyProtocol = (protocol: 'LOCKDOWN' | 'BROADCAST' | 'EVACUATE', details?: string) => {
    db.triggerEmergencyProtocol(protocol, details);
    showToast(`EMERGENCY ${protocol} triggered across campus!`);
  };

  const sendFeeReminder = (defaulterId: string) => {
    const res = db.sendFeeReminder(defaulterId);
    if (res) {
      showToast(`Fee reminder sent to guardian of ${res.studentName} (${res.noticeLevel})`);
    }
  };

  const addStaffObservationNote = (staffId: string, noteData: { author: string; rating: number; cycle: string; notes: string; commendation?: string }) => {
    const res = db.addStaffObservationNote(staffId, noteData);
    if (res) {
      setStaffMembers([...db.staffMembers]);
      showToast(`Logged observation appraisal (${noteData.rating}★)`);
    }
  };

  const updateStaffWorkload = (staffId: string, workloadPeriods: number, classesAssigned: string[]) => {
    const res = db.updateStaffWorkload(staffId, workloadPeriods, classesAssigned);
    if (res) {
      setStaffMembers([...db.staffMembers]);
      showToast(`Workload updated: ${workloadPeriods} periods/week`);
    }
  };

  const updateStaffLiveStatus = (staffId: string, liveStatusText: string, roomLocation: string) => {
    const res = db.updateStaffLiveStatus(staffId, liveStatusText, roomLocation);
    if (res) {
      setStaffMembers([...db.staffMembers]);
      showToast(`Updated location for ${res.fullName}`);
    }
  };

  const issueStaffCommendation = (staffId: string, commendationTitle: string, note: string) => {
    const res = db.issueStaffCommendation(staffId, commendationTitle, note);
    if (res) {
      setStaffMembers([...db.staffMembers]);
      showToast(`Conferred citation "${commendationTitle}" to ${res.fullName}`);
    }
  };

  const updateSafeguardingCaseDetails = (caseId: string, note: string) => {
    const res = db.updateSafeguardingCaseDetails(caseId, note);
    if (res) {
      setPrincipalSafeguardingCases([...db.principalSafeguardingCases]);
      showToast(`Updated case record for ${res.caseNo}`);
    }
  };

  const closeSafeguardingCase = (caseId: string, resolutionSummary: string) => {
    const res = db.closeSafeguardingCase(caseId, resolutionSummary);
    if (res) {
      setPrincipalSafeguardingCases([...db.principalSafeguardingCases]);
      showToast(`Closed safeguarding case ${res.caseNo}`);
    }
  };

  const recordCohortIntervention = (
    cohortName: string,
    intervention: { targetFloor: number; remediationAction: string; assignedMentor: string; parentNoticeDispatched: boolean }
  ) => {
    db.recordCohortIntervention(cohortName, intervention);
    setAuditLogs([...db.auditLogs]);
    showToast(`Remediation Directive committed for ${cohortName}`);
  };

  const recordFeeConcession = (studentId: string, waiverPercent: number, reason: string) => {
    const res = db.recordFeeConcession(studentId, waiverPercent, reason);
    if (res) {
      setPrincipalDefaulters([...db.principalDefaulters]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Financial relief (${waiverPercent}%) applied for ${res.studentName}`);
    }
  };

  const recordFeeNoticeDispatch = (studentId: string, channel: string, customNotice?: string) => {
    const res = db.recordFeeNoticeDispatch(studentId, channel, customNotice);
    if (res) {
      setPrincipalDefaulters([...db.principalDefaulters]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Notice sent via ${channel} to guardians of ${res.studentName}`);
    }
  };

  const dispatchSubsystemAction = (subsystemId: string, actionName: string, detail: string) => {
    db.dispatchSubsystemAction(subsystemId, actionName, detail);
    setAuditLogs([...db.auditLogs]);
    showToast(`Directive executed: ${actionName}`);
  };

  // Vice Principal Workspace Actions
  const resolveVpConflict = (conflictId: string, resolutionAction: string) => {
    const res = db.resolveVpConflict(conflictId, resolutionAction);
    if (res) {
      setVpConflicts([...db.vpConflicts]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Conflict resolved: ${res.title}`);
    }
  };

  const updateVpLessonPlanStatus = (planId: string, status: 'APPROVED' | 'NEEDS_REVISION' | 'REJECTED', note?: string) => {
    const res = db.updateVpLessonPlanStatus(planId, status, note);
    if (res) {
      setVpLessonPlans([...db.vpLessonPlans]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Lesson plan updated: ${status}`);
    }
  };

  const publishVpExamResult = (queueItemId: string) => {
    const res = db.publishVpExamResult(queueItemId);
    if (res) {
      setVpPublicationQueue([...db.vpPublicationQueue]);
      setAuditLogs([...db.auditLogs]);
      showToast(`Published official results for ${res.title}`);
    }
  };

  const pingTeacherReminder = (teacherId: string, customMessage?: string) => {
    const res = db.pingTeacherReminder(teacherId, customMessage);
    if (res) {
      setAuditLogs([...db.auditLogs]);
      showToast(`Filing reminder sent to ${res.name}`);
    }
  };

  const addPeriodOverride = (data: { period: string; class: string; room: string; teacher: string }) => {
    db.addPeriodOverride(data);
    setAuditLogs([...db.auditLogs]);
    showToast(`Period override saved for ${data.period}`);
  };

  // ================= PARENT MODULE HANDLERS (Images 1-7) =================
  const switchActiveChild = (childId: string) => {
    db.switchActiveChild(childId);
    setActiveChildId(childId);
    const child = parentChildren.find(c => c.id === childId);
    if (child) {
      showToast(`Switched active profile to ${child.fullName}`);
    }
  };

  const payParentFee = (feeId: string, paymentMethod?: string) => {
    const fee = db.payParentFee(feeId, paymentMethod);
    setParentFees([...db.parentFees]);
    setParentChildren([...db.parentChildren]);
    if (fee) {
      showToast(`Payment receipt ${fee.receiptNo} generated for ₹${fee.amount.toLocaleString('en-IN')}`);
    }
  };

  const payAllPendingFees = (childId: string, paymentMethod?: string) => {
    const result = db.payAllPendingFees(childId, paymentMethod);
    setParentFees([...db.parentFees]);
    setParentChildren([...db.parentChildren]);
    showToast(`Cleared all dues: ₹${result.totalPaid.toLocaleString('en-IN')} (Receipt ${result.receiptNo})`);
  };

  const acknowledgeParentNotice = (noticeId: string) => {
    const notice = db.acknowledgeParentNotice(noticeId);
    setParentNotices([...db.parentNotices]);
    if (notice) {
      showToast(`Acknowledged receipt of: "${notice.title}"`);
    }
  };

  const registerParentNoticeEvent = (noticeId: string) => {
    const notice = db.registerParentNoticeEvent(noticeId);
    setParentNotices([...db.parentNotices]);
    if (notice) {
      showToast(`Registration confirmed for "${notice.title}"`);
    }
  };

  const requestParentCertificate = (data: { childId: string; type: ParentCertificateItem['type']; purpose: string }) => {
    const newCert = db.requestParentCertificate(data);
    setParentCertificates([...db.parentCertificates]);
    showToast(`Generated verified ${newCert.title} (Code: ${newCert.verificationCode})`);
  };

  const applyParentStudentLeave = (data: { childId: string; startDate: string; endDate: string; reason: string; type: ParentLeaveRequest['type'] }) => {
    const newLeave = db.applyParentStudentLeave(data);
    setParentLeaves([...db.parentLeaves]);
    showToast(`Leave application submitted for approval`);
  };

  const bookParentPtmSlot = (data: { childId: string; timeSlot: string; teacherName: string; subject: string; venue?: string }) => {
    const newBooking = db.bookParentPtmSlot(data);
    setParentPtms([...db.parentPtms]);
    showToast(`PTM Slot booked with ${data.teacherName} at ${data.timeSlot}`);
  };

  const linkNewChild = (data: { fullName: string; grade: string; section: string; rollNo: number; curriculum: 'CBSE' | 'IB' | 'ICSE' }) => {
    const newChild = db.linkNewChild(data);
    setParentChildren([...db.parentChildren]);
    showToast(`Linked student ${newChild.fullName} successfully!`);
  };

  // ================= MASTER TIMETABLE BUILDER, PUBLISHER & TEACHER COMPLETION =================
  const addTimetableWeek = (weekLabel: string) => {
    const trimmed = weekLabel.trim();
    if (!trimmed) return;
    if (!availableTimetableWeeks.includes(trimmed)) {
      setAvailableTimetableWeeks((prev) => [...prev, trimmed]);
    }
    setActiveTimetableWeek(trimmed);
    showToast(`Created & selected timetable week: "${trimmed}"`);
  };

  const syncTimetableToTeacherAndStudent = (updatedSlots: MasterTimetableSlot[], targetWeek: string) => {
    // Sync Monday/active day Grade 9B slots to studentPeriods
    const published9BSlots = updatedSlots
      .filter((s) => s.weekLabel === targetWeek && s.gradeSection === '9B' && s.day === 'Monday' && s.isPublished)
      .sort((a, b) => a.period - b.period);

    if (published9BSlots.length > 0) {
      setStudentPeriods(
        published9BSlots.map((s) => ({
          id: s.id,
          periodNumber: s.period,
          timeRange: s.timeRange,
          subject: s.subject,
          unitTopic: s.unitTopic,
          teacher: s.teacher,
          room: s.room,
          status: s.status,
          weekLabel: s.weekLabel,
          day: s.day,
          gradeSection: s.gradeSection,
          completedAt: s.completedAt,
          completedByTeacher: s.completedByTeacher,
          lectureNote: s.lectureNote,
        }))
      );
    }

    // Sync Mrs. Oswald's published slots for Monday in targetWeek to teacherClasses
    const oswaldSlots = updatedSlots
      .filter(
        (s) =>
          s.weekLabel === targetWeek &&
          s.isPublished &&
          s.day === 'Monday' &&
          (s.teacher.toLowerCase().includes('oswald') || s.subject.toLowerCase().includes('math') || s.subject.toLowerCase().includes('algebra'))
      )
      .sort((a, b) => a.period - b.period);

    if (oswaldSlots.length > 0) {
      setTeacherClasses((prev) => {
        const mappedFromTimetable: TeacherClass[] = oswaldSlots.map((s) => ({
          id: s.id,
          subject: s.subject,
          grade: `Grade ${s.gradeSection}`,
          section: s.gradeSection,
          period: s.period,
          periodLabel: `Period ${s.period}`,
          track: s.unitTopic || 'Core Curriculum Track',
          timeRange: s.timeRange,
          room: s.room,
          studentCount: 32,
          topic: s.unitTopic,
          status: s.status === 'COMPLETED' ? 'COMPLETED' : 'UPCOMING',
          day: s.day,
          weekLabel: s.weekLabel,
          teacher: s.teacher,
          completedAt: s.completedAt,
          lectureNote: s.lectureNote,
        }));
        const existingOtherIds = prev.filter((c) => !mappedFromTimetable.some((m) => m.period === c.period && m.section === c.section));
        return [...mappedFromTimetable, ...existingOtherIds];
      });
    }
  };

  const addOrUpdateTimetableSlot = (
    slotData: Omit<MasterTimetableSlot, 'id'> & { id?: string; applyToAllWeekdays?: boolean }
  ) => {
    const targetDays: MasterTimetableSlot['day'][] = slotData.applyToAllWeekdays
      ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      : [slotData.day];

    setMasterTimetable((prev) => {
      let next = [...prev];
      for (const d of targetDays) {
        const existingIndex = next.findIndex(
          (s) =>
            (slotData.id && s.id === slotData.id && !slotData.applyToAllWeekdays) ||
            (s.weekLabel === slotData.weekLabel &&
              s.gradeSection === slotData.gradeSection &&
              s.day === d &&
              s.period === slotData.period)
        );
        const newSlot: MasterTimetableSlot = {
          id:
            existingIndex >= 0
              ? next[existingIndex].id
              : `tt-${Date.now()}-${slotData.gradeSection}-${d}-P${slotData.period}`,
          weekLabel: slotData.weekLabel,
          gradeSection: slotData.gradeSection,
          day: d,
          period: slotData.period,
          timeRange: slotData.timeRange,
          subject: slotData.subject,
          unitTopic: slotData.unitTopic,
          teacher: slotData.teacher,
          room: slotData.room,
          isPublished: slotData.isPublished,
          publishedAt: slotData.isPublished ? 'Just now' : undefined,
          status: slotData.status || 'UPCOMING',
          completedAt: slotData.completedAt,
          completedByTeacher: slotData.completedByTeacher,
          lectureNote: slotData.lectureNote,
        };

        if (existingIndex >= 0) {
          next[existingIndex] = newSlot;
        } else {
          next.push(newSlot);
        }
      }
      next.sort((a, b) => a.period - b.period);
      syncTimetableToTeacherAndStudent(next, slotData.weekLabel);
      return next;
    });

    showToast(
      slotData.applyToAllWeekdays
        ? `Saved Period ${slotData.period} (${slotData.subject}) across Mon–Fri for Section ${slotData.gradeSection}`
        : `Saved Period ${slotData.period} (${slotData.subject}) on ${slotData.day} for Section ${slotData.gradeSection}`
    );
  };

  const deleteTimetableSlot = (slotId: string) => {
    setMasterTimetable((prev) => {
      const next = prev.filter((s) => s.id !== slotId);
      syncTimetableToTeacherAndStudent(next, activeTimetableWeek);
      return next;
    });
    showToast('Removed period slot from timetable');
  };

  const generateWeeklyTimetable = (options: {
    weekLabel: string;
    gradeSection: string;
    days?: MasterTimetableSlot['day'][];
    periodsPerDay?: number;
    autoPublish?: boolean;
  }) => {
    const daysToGenerate: MasterTimetableSlot['day'][] = options.days || [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const maxPeriods = options.periodsPerDay || 7;
    const isPublished = options.autoPublish ?? true;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const subjectPool = [
      { subject: 'Mathematics (Calculus Core)', unitTopic: 'Quadratic Equations & Functions', teacher: 'Mrs. Oswald', room: `Room ${options.gradeSection === '9B' ? '204' : '206'}` },
      { subject: 'English Literature & Composition', unitTopic: 'Analytical Essays & Literary Themes', teacher: 'Dr. Katherine Wells', room: 'Room 204' },
      { subject: 'AP Physics (Thermodynamics)', unitTopic: 'Kinematics, Work & Thermal Energy', teacher: 'Dr. Alistair Ross', room: 'Lab 204 North' },
      { subject: 'World History & Global Civics', unitTopic: 'Constitutional Governance & History', teacher: 'Mr. Marcus Vance', room: 'Room 304' },
      { subject: 'Chemistry Lab & Stoichiometry', unitTopic: 'Chemical Bonding & Titration Practical', teacher: 'Dr. Alistair Ross', room: 'Science Lab 2' },
      { subject: 'Computer Science & Python AI', unitTopic: 'Algorithms & Data Structures Lab', teacher: 'Mr. Anand Sharma', room: 'STEM Lab' },
      { subject: 'Physical Education & Sports', unitTopic: 'Athletic Conditioning & Team Drills', teacher: 'Coach Briggs', room: 'Main Gymnasium' },
    ];

    const periodTimings = [
      '08:30 - 09:15 AM',
      '09:20 - 10:05 AM',
      '10:15 - 11:00 AM',
      '11:05 - 11:50 AM',
      '12:35 - 01:20 PM',
      '01:25 - 02:10 PM',
      '02:15 - 03:00 PM',
    ];

    setMasterTimetable((prev) => {
      // Remove old slots for this weekLabel + gradeSection on target days
      const filtered = prev.filter(
        (s) => !(s.weekLabel === options.weekLabel && s.gradeSection === options.gradeSection && daysToGenerate.includes(s.day))
      );

      const generatedSlots: MasterTimetableSlot[] = [];
      daysToGenerate.forEach((day, dayIdx) => {
        const countForDay = day === 'Saturday' ? Math.min(4, maxPeriods) : maxPeriods;
        for (let p = 1; p <= countForDay; p++) {
          // Rotate subjects slightly by day while keeping Period 1/2 consistent for core subjects
          const poolIndex = p === 1 ? 0 : (p - 1 + dayIdx) % subjectPool.length;
          const item = subjectPool[poolIndex];
          generatedSlots.push({
            id: `tt-gen-${Date.now()}-${options.gradeSection}-${day}-P${p}`,
            weekLabel: options.weekLabel,
            gradeSection: options.gradeSection,
            day,
            period: p,
            timeRange: periodTimings[p - 1] || `Period ${p}`,
            subject: item.subject,
            unitTopic: `${item.unitTopic} (${day} Session)`,
            teacher: item.teacher,
            room: item.room,
            isPublished,
            publishedAt: isPublished ? `Today • ${timestamp}` : undefined,
            status: 'UPCOMING',
          });
        }
      });

      const combined = [...filtered, ...generatedSlots];
      syncTimetableToTeacherAndStudent(combined, options.weekLabel);
      return combined;
    });

    showToast(
      `Generated ${daysToGenerate.length}-day weekly timetable for Section ${options.gradeSection} (${options.weekLabel})${
        isPublished ? ' & Published to Teachers!' : ''
      }`
    );
  };

  const publishMasterTimetable = (weekLabel: string, gradeSection?: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMasterTimetable((prev) => {
      const updated = prev.map((slot) => {
        if (slot.weekLabel === weekLabel && (!gradeSection || slot.gradeSection === gradeSection)) {
          return {
            ...slot,
            isPublished: true,
            publishedAt: `Published Today at ${timestamp}`,
          };
        }
        return slot;
      });
      syncTimetableToTeacherAndStudent(updated, weekLabel);
      return updated;
    });

    showToast(
      `Published Master Timetable (${weekLabel}${gradeSection ? ` • Section ${gradeSection}` : ''}) to all Teachers & Students!`
    );
  };

  const togglePeriodCompletion = (slotOrClassId: string, teacherName?: string, lectureNote?: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let toggledSubject = 'Lecture';
    let newStatusIsCompleted = true;

    setMasterTimetable((prev) => {
      const updated = prev.map((slot) => {
        if (slot.id === slotOrClassId) {
          const nextCompleted = slot.status !== 'COMPLETED';
          newStatusIsCompleted = nextCompleted;
          toggledSubject = `Period ${slot.period}: ${slot.subject} (${slot.gradeSection})`;
          return {
            ...slot,
            status: (nextCompleted ? 'COMPLETED' : 'UPCOMING') as MasterTimetableSlot['status'],
            completedAt: nextCompleted ? timestamp : undefined,
            completedByTeacher: nextCompleted ? teacherName || slot.teacher : undefined,
            lectureNote: lectureNote ?? slot.lectureNote,
          };
        }
        return slot;
      });
      syncTimetableToTeacherAndStudent(updated, activeTimetableWeek);
      return updated;
    });

    setTeacherClasses((prev) =>
      prev.map((cls) => {
        if (cls.id === slotOrClassId) {
          const nextCompleted = cls.status !== 'COMPLETED';
          newStatusIsCompleted = nextCompleted;
          toggledSubject = `${cls.periodLabel}: ${cls.subject} (${cls.grade})`;
          return {
            ...cls,
            status: nextCompleted ? 'COMPLETED' : 'UPCOMING',
            completedAt: nextCompleted ? timestamp : undefined,
            lectureNote: lectureNote ?? cls.lectureNote,
          };
        }
        return cls;
      })
    );

    setStudentPeriods((prev) =>
      prev.map((p) => {
        if (p.id === slotOrClassId) {
          const nextCompleted = p.status !== 'COMPLETED';
          return {
            ...p,
            status: nextCompleted ? 'COMPLETED' : 'UPCOMING',
            completedAt: nextCompleted ? timestamp : undefined,
            completedByTeacher: nextCompleted ? teacherName || p.teacher : undefined,
            lectureNote: lectureNote ?? p.lectureNote,
          };
        }
        return p;
      })
    );

    showToast(
      newStatusIsCompleted
        ? `✓ Marked ${toggledSubject} as Completed (${timestamp}) • Synced to Admin & Student Portals`
        : `Reopened ${toggledSubject} as Upcoming`
    );
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        authenticatedUser,
        canAccessAllModules,
        currentRole,
        setRole,
        login,
        register,
        logout,
        authView,
        setAuthView,
        hasPermission,
        activeTab,
        setActiveTab,
        isMobileSimulatorOpen,
        setIsMobileSimulatorOpen,
        simulatorRole,
        setSimulatorRole,
        studentPeriods,
        studentTasks,
        studyMaterials,
        studentAchievements,
        attendanceHeatmap,
        absenceExcuses,
        submitStudentTask,
        submitAbsenceExcuse,
        reviewStudentAbsenceExcuse,
        teacherClasses,
        teacherStudents,
        teacherTasks,
        parentMessages,
        setStudentAttendance,
        markAllStudentsPresent,
        updateStudentGrade,
        createTask,
        gradeStudentTaskSubmission,
        submitTeacherLeaveRequest,
        sendParentMessage,
        students,
        staffMembers,
        feeInvoices,
        classSections,
        attendance: [],
        safetyIncidents,
        approvals,
        buses: db.buses,
        auditLogs,
        timetable: masterTimetable,
        masterTimetable,
        availableTimetableWeeks,
        activeTimetableWeek,
        setActiveTimetableWeek,
        addTimetableWeek,
        addOrUpdateTimetableSlot,
        deleteTimetableSlot,
        generateWeeklyTimetable,
        publishMasterTimetable,
        togglePeriodCompletion,
        admitStudent,
        updateStudent,
        archiveStudent,
        addStaffMember,
        updateStaffMember,
        recordFeePayment,
        updateSafetyIncident,
        createIncident,
        updateIncidentStatus,
        markAttendance,
        batchMarkAttendance,
        processApproval,
        updateRbacPermission,
        principalAgenda,
        principalCriticalAlerts,
        principalStaffLeaves,
        staffPayrollRecords,
        principalSafeguardingCases,
        principalExecutiveApprovals,
        principalOperationsModules,
        principalDefaulters,
        dispatchCriticalAlert,
        processPrincipalStaffLeave,
        disburseStaffPayroll,
        disburseAllStaffPayroll,
        createSafeguardingCase,
        updateSafeguardingCaseStep,
        processExecutiveApprovalAction,
        submitExecutiveApprovalRequest,
        triggerEmergencyProtocol,
        sendFeeReminder,
        addStaffObservationNote,
        updateStaffWorkload,
        updateStaffLiveStatus,
        issueStaffCommendation,
        updateSafeguardingCaseDetails,
        closeSafeguardingCase,
        recordCohortIntervention,
        recordFeeConcession,
        recordFeeNoticeDispatch,
        dispatchSubsystemAction,
        vpConflicts,
        vpLessonPlans,
        vpExams,
        vpPublicationQueue,
        vpTeachers,
        resolveVpConflict,
        updateVpLessonPlanStatus,
        publishVpExamResult,
        pingTeacherReminder,
        addPeriodOverride,
        activeChildId,
        activeChild,
        parentChildren,
        parentFees,
        parentNotices,
        parentCertificates,
        parentTransport,
        parentLeaves,
        parentPtms,
        switchActiveChild,
        payParentFee,
        payAllPendingFees,
        acknowledgeParentNotice,
        registerParentNoticeEvent,
        requestParentCertificate,
        applyParentStudentLeave,
        bookParentPtmSlot,
        linkNewChild,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
