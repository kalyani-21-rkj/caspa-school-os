export type RoleType =
  | 'SUPER_ADMIN'
  | 'PRINCIPAL'
  | 'VICE_PRINCIPAL'
  | 'ADMIN'
  | 'TEACHER'
  | 'STUDENT'
  | 'PARENT'
  | 'SAFETY_OFFICER'
  | 'COUNSELLOR'
  | 'ACCOUNTS'
  | 'TRANSPORT'
  | 'HOSTEL_WARDEN';

export type RecordScope = 'OWN' | 'ASSIGNED' | 'CLASS_SECTION' | 'DEPARTMENT' | 'CAMPUS' | 'SCHOOL';

export type IncidentRisk = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type IncidentStatus =
  | 'REPORTED'
  | 'INITIAL_REVIEW'
  | 'UNDER_INVESTIGATION'
  | 'ACTION_PENDING'
  | 'COMMITTEE_REVIEW'
  | 'RESOLVED'
  | 'CLOSED';

export interface Permission {
  id: string;
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  canExport: boolean;
  scope: RecordScope;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  fullName: string;
  roleType: RoleType;
  designation: string;
  campusId: string;
  campusName: string;
  avatarUrl?: string;
  permissions: Permission[];
}

// Student Specific Models (Images 2-8)
export interface StudentPeriod {
  id: string;
  periodNumber: number;
  timeRange: string;
  subject: string;
  unitTopic?: string;
  teacher: string;
  room: string;
  status: 'COMPLETED' | 'LIVE_NOW' | 'UPCOMING';
  notesUrl?: string;
  manualUrl?: string;
  isAfterSchool?: boolean;
  weekLabel?: string;
  day?: string;
  gradeSection?: string;
  completedAt?: string;
  completedByTeacher?: string;
  lectureNote?: string;
}

export interface StudentTaskItem {
  id: string;
  teacherTaskId?: string;
  assignedByTeacher?: string;
  gradeSection?: string;
  subject: string;
  unit: string;
  title: string;
  description: string;
  dueDate: string;
  isDueToday?: boolean;
  isOverdue?: boolean;
  status: 'PENDING' | 'SUBMITTED' | 'OVERDUE' | 'GRADED';
  completedQuestions?: number;
  totalQuestions?: number;
  resourceFileName?: string;
  resourceFileSize?: string;
  score?: number;
  gradeBadge?: string;
  feedbackText?: string;
  submittedFileName?: string;
  submittedFileSize?: string;
  submittedFileUrl?: string;
  submissionNote?: string;
  submittedAt?: string;
}

export interface StudyMaterialItem {
  id: string;
  title: string;
  subject: 'Mathematics' | 'Science' | 'English' | 'Social' | 'Computer';
  format: 'PDF' | 'MP4' | 'DOCX' | 'LINK';
  teacher: string;
  fileSizeOrDuration: string;
  uploadedDate: string;
  isNew?: boolean;
  isExternalLink?: boolean;
}

export interface StudentAchievement {
  id: string;
  title: string;
  subtitle: string;
  category: 'Sports' | 'Academic' | 'Cultural' | 'Clubs';
  ranking: string;
  isFeatured?: boolean;
  awardYear: string;
}

export interface AttendanceDayRecord {
  dayNumber: number;
  dateStr?: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'WEEKEND';
  hasIncident?: boolean;
  markedByTeacher?: string;
  markedAt?: string;
  periodSubject?: string;
  studentName?: string;
}

export interface StudentDateAttendanceEntry {
  id: string;
  studentId: string;
  studentName: string;
  gradeSection: string;
  rollNo: number;
  date: string;
  dayNumber: number;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  markedBy: string;
  markedAt: string;
  periodSubject: string;
}

export interface AbsenceExcuseItem {
  date: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// Teacher Specific Models
export interface TeacherClass {
  id: string;
  subject: string;
  grade: string;
  section: string;
  period: number;
  periodLabel: string;
  track: string;
  timeRange: string;
  room: string;
  studentCount: number;
  topic?: string;
  isNext?: boolean;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';
  day?: string;
  weekLabel?: string;
  teacher?: string;
  completedAt?: string;
  lectureNote?: string;
}

export interface TeacherStudent {
  id: string;
  rollNo: number;
  fullName: string;
  grade: string;
  section: string;
  attendanceStatus: 'PRESENT' | 'ABSENT' | 'LATE';
  attendanceByDate?: Record<
    string,
    {
      status: 'PRESENT' | 'ABSENT' | 'LATE';
      markedBy: string;
      markedAt: string;
      periodSubject: string;
    }
  >;
  unitTestScore: number | null;
  maxScore: number;
  instructorNote?: string;
  hasNote?: boolean;
  alertType?: 'MISSED_HW' | 'LOW_ATTENDANCE' | 'MISSED_QUIZ';
  alertDetail?: string;
  avatarInitials: string;
  parentName: string;
  parentPhone: string;
}

export interface TeacherTask {
  id: string;
  linkedStudentTaskId?: string;
  description?: string;
  title: string;
  type: 'HOMEWORK' | 'ASSIGNMENT';
  gradeSection: string;
  dueDate: string;
  submittedCount: number;
  totalCount: number;
  status: 'PUBLISHED' | 'OVERDUE' | 'DRAFT';
  lateCount?: number;
  latestStudentSubmission?: {
    studentName: string;
    fileName?: string;
    fileSize?: string;
    fileUrl?: string;
    note?: string;
    submittedAt: string;
    status: 'SUBMITTED' | 'GRADED';
    score?: number;
    feedback?: string;
  };
}

export interface ParentMessage {
  id: string;
  parentName: string;
  parentAvatar: string;
  studentName: string;
  gradeSection: string;
  timeString: string;
  snippet: string;
  unreadCount?: number;
  isRead?: boolean;
  isOnline?: boolean;
}

export interface Student {
  id: string;
  admissionNo: string;
  fullName: string;
  grade: string;
  section: string;
  rollNo: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  attendancePercentage: number;
  feeOutstanding: number;
  busRoute?: string;
  hostelRoom?: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'WITHDRAWN';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  rollNo: number;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  timeMarked?: string;
}

export interface SafetyIncident {
  id: string;
  caseNumber: string;
  category: 'Anti-Ragging' | 'Bullying' | 'Child Safety' | 'Substance Abuse' | 'Cyber Harassment' | 'Physical Altercation' | 'Mental Health Crisis';
  risk: IncidentRisk;
  status: IncidentStatus;
  isAnonymous: boolean;
  reporterName?: string;
  reporterRole?: string;
  assignedInvestigator?: string;
  campusId: string;
  campusName: string;
  location: string;
  dateTime: string;
  description: string;
  evidenceUrls: string[];
  actionTaken?: string;
  slaDeadline: string;
  isSlaBreached: boolean;
  investigationNotes: {
    author: string;
    note: string;
    timestamp: string;
    isConfidential: boolean;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalTask {
  id: string;
  title: string;
  module: 'FEES' | 'LEAVE' | 'PURCHASE' | 'HOSTEL' | 'DISCIPLINE' | 'EVENT';
  requesterName: string;
  requesterRole: string;
  amount?: number;
  department: string;
  currentStage: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';
  slaDeadline: string;
  priority: 'URGENT' | 'HIGH' | 'NORMAL';
  description: string;
  createdAt: string;
  history: {
    actor: string;
    action: string;
    timestamp: string;
    comment?: string;
  }[];
}

export interface BusVehicle {
  id: string;
  busNumber: string;
  routeNumber: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  currentLocationName: string;
  lat: number;
  lng: number;
  speedKmH: number;
  studentsOnBoard: number;
  capacity: number;
  status: 'ON_ROUTE' | 'DELAYED' | 'ARRIVED' | 'IDLE';
  etaMinutes: number;
  nextStop: string;
}

export interface TimetableSlot {
  id: string;
  weekLabel?: string;
  gradeSection?: string;
  day: string;
  period: number;
  timeRange: string;
  subject: string;
  unitTopic?: string;
  teacher: string;
  room: string;
  isCurrent?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  status?: 'UPCOMING' | 'LIVE_NOW' | 'COMPLETED';
  completedAt?: string;
  completedByTeacher?: string;
  lectureNote?: string;
}

export interface MasterTimetableSlot {
  id: string;
  weekLabel: string;
  gradeSection: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  timeRange: string;
  subject: string;
  unitTopic: string;
  teacher: string;
  room: string;
  isPublished: boolean;
  publishedAt?: string;
  status: 'UPCOMING' | 'LIVE_NOW' | 'COMPLETED';
  completedAt?: string;
  completedByTeacher?: string;
  lectureNote?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  module: string;
  resourceId: string;
  details: string;
}

export interface StaffObservationNote {
  id: string;
  author: string;
  date: string;
  cycle: string;
  rating: number;
  notes: string;
  commendation?: string;
}

export interface AdminStaffMember {
  id: string;
  employeeId: string;
  fullName: string;
  designation: string;
  department: 'Mathematics' | 'Science' | 'Humanities' | 'Language' | 'Administration' | 'Sports' | 'Transport';
  email: string;
  phone: string;
  workloadPeriods: number;
  classesAssigned: string[];
  qualification: string;
  joinDate: string;
  status: 'ACTIVE' | 'ON_LEAVE';
  avatarUrl?: string;
  roomLocation?: string;
  liveStatusText?: string;
  evaluationScore?: number;
  percentileRank?: string;
  badge?: string;
  leaveBalances?: {
    casualRemaining: number;
    casualTotal: number;
    medicalRemaining: number;
    medicalTotal: number;
    dutyRemaining: number;
  };
  attendanceRatePercent?: number;
  todaySchedule?: {
    period: string;
    time: string;
    classSection: string;
    room: string;
    status: 'COMPLETED' | 'IN_SESSION' | 'UPCOMING';
  }[];
  observationNotes?: StaffObservationNote[];
  ferpaCompliance?: {
    salaryGrade: string;
    monthlyDisbursement: string;
    backgroundCheckStatus: string;
    lastAuditTimestamp: string;
    emergencyContact: string;
  };
}

export interface FeeInvoiceItem {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  gradeSection: string;
  term: string;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  dueDate: string;
  status: 'PAID' | 'PARTIAL' | 'OVERDUE';
  paymentMethod?: string;
  lastPaymentDate?: string;
}

export interface ClassSectionDetail {
  id: string;
  grade: string;
  section: string;
  classTeacher: string;
  room: string;
  studentCount: number;
  capacity: number;
  periodsPerDay: number;
  syllabusCompletionRate: number;
}

// Principal Specific Models
export interface PrincipalAgendaItem {
  id: string;
  time: string;
  location: string;
  type: string;
  title: string;
  description: string;
  badgeColor?: string;
}

export interface PrincipalCriticalAlert {
  id: string;
  title: string;
  timeString: string;
  locationOrDetail: string;
  actionLabel: string;
  actionType: 'DISPATCH_TECH' | 'NOTIFY_GUARDIANS' | 'INSPECT';
  status: 'ACTIVE' | 'RESOLVED';
}

export interface PrincipalStaffLeaveItem {
  id: string;
  staffId?: string;
  staffName: string;
  avatarUrl: string;
  leaveType: 'Casual' | 'Medical' | 'Duty';
  durationDates: string;
  designationDept: string;
  note: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedAt?: string;
  principalRemark?: string;
}

export interface StaffPayrollRecord {
  id: string;
  staffId: string;
  employeeId: string;
  staffName: string;
  designation: string;
  department: string;
  salaryGrade: string;
  monthlySalaryNumeric: number;
  monthlySalaryFormatted: string;
  bankName: string;
  accountNumberMasked: string;
  ifscCode: string;
  monthYear: string;
  status: 'PAID_TO_BANK' | 'PENDING_DISBURSEMENT';
  utrNumber?: string;
  disbursedAt?: string;
  disbursedBy?: string;
}

export interface PrincipalSafeguardingCase {
  id: string;
  caseNo: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  timeAgo: string;
  studentMaskedId: string;
  title: string;
  assignedTo: string;
  currentStep: number; // 1: Report, 2: Review, 3: Investigate, 4: Resolve
  notesCount: string;
  category: 'Bullying' | 'Anti-Ragging' | 'Child Protection' | 'Discipline';
  details?: string;
}

export interface PrincipalExecutiveApproval {
  id: string;
  initials: string;
  avatarBg?: string;
  requesterName: string;
  requesterRole: string;
  requesterRoleType?: RoleType;
  requesterId?: string;
  categoryBadge: string;
  isEmergency?: boolean;
  slaString: string;
  title: string;
  description: string;
  detailsBox?: {
    label: string;
    value: string;
    badge?: string;
  };
  steps?: { name: string; completed: boolean; current?: boolean }[];
  amount?: string;
  status: 'PENDING' | 'APPROVED' | 'CHANGES_REQUESTED' | 'REJECTED';
  actionNote?: string;
  submittedAt?: string;
  updatedAt?: string;
}

export interface PrincipalOperationModule {
  id: string;
  title: string;
  iconName: string;
  metricPrimary: string;
  metricSecondary: string;
  badge?: string;
}

// Vice Principal Specific Models (Images 1-7)
export interface VicePrincipalSchedulingConflict {
  id: string;
  title: string;
  description: string;
  period: string;
  affectedRoomsOrTeachers: string;
  severity: 'CRITICAL' | 'WARNING';
  status: 'ACTIVE' | 'RESOLVED';
  resolutionActionText?: string;
}

export interface VicePrincipalLessonPlan {
  id: string;
  title: string;
  teacherName: string;
  subject: string;
  gradeSection: string;
  week: string;
  learningObjectives: string[];
  courseResources: string[];
  durationText: string;
  blueprintTag: string;
  status: 'SUBMITTED' | 'NEEDS_REVISION' | 'APPROVED' | 'REJECTED';
  feedbackNote?: string;
  warningNote?: string;
  submittedTimeAgo: string;
}

export interface VicePrincipalExamSession {
  id: string;
  title: string;
  subject: string;
  grade: string;
  dateStr: string;
  timeRange: string;
  venue: string;
  chiefProctor: string;
  batchSize?: number;
  status: 'ONGOING' | 'SCHEDULED' | 'COMPLETED';
  progressNotice?: string;
  gradingFinishedPercent?: number;
}

export interface VicePrincipalPublicationQueueItem {
  id: string;
  title: string;
  detail: string;
  submissionsText?: string;
  status: 'COMPLETE' | 'IN_PROGRESS';
  readyToPublish?: boolean;
  isPublished: boolean;
  publishedTimestamp?: string;
}

export interface VicePrincipalTeacherItem {
  id: string;
  name: string;
  subjectRole: string;
  grades: string;
  performanceScore: number;
  statusText: 'Present' | 'On Leave' | 'In Transit';
  planStatus: 'Up to Date' | 'Overdue' | 'N/A';
  nextScheduleInfo: string;
  actionLinkLabel: string;
  overdueAlertText?: string;
  avatarUrl: string;
  isVerified?: boolean;
}

// ================= PARENT MODULE MODELS (Images 1-7) =================
export interface ParentChildProfile {
  id: string;
  fullName: string;
  grade: string;
  section: string;
  curriculum: 'CBSE' | 'IB' | 'ICSE';
  rollNo: number;
  avatarUrl: string;
  attendancePercent: number;
  totalDays: number;
  presentDays: number;
  pendingDues: number;
  dueDate: string;
  gpa: string;
  rank: string;
  house: string;
  bloodGroup: string;
  classTeacher: string;
  classTeacherEmail: string;
  busRoute: string;
  busStop: string;
  emergencyContact: string;
  academicPerformance: {
    subject: string;
    score: number;
    grade: string;
    trend: 'up' | 'stable' | 'down';
  }[];
  teacherRemarks: string;
}

export interface ParentFeeItem {
  id: string;
  childId: string;
  title: string;
  category: 'Tuition' | 'Lab & Tech' | 'Transport' | 'Activities' | 'Annual';
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  receiptNo?: string;
  paidOn?: string;
  paymentMethod?: string;
}

export interface ParentNoticeItem {
  id: string;
  title: string;
  category: 'URGENT' | 'ACADEMIC' | 'EVENTS' | 'PTM' | 'TRANSPORT';
  dateStr: string;
  author: string;
  summary: string;
  fullContent: string;
  isUrgent?: boolean;
  requiresAcknowledgment?: boolean;
  isAcknowledged?: boolean;
  acknowledgedTimestamp?: string;
  actionType?: 'ACKNOWLEDGE' | 'REGISTER' | 'DOWNLOAD' | 'PAY';
  actionLabel?: string;
  isRegistered?: boolean;
}

export interface ParentCertificateItem {
  id: string;
  childId: string;
  childName: string;
  title: string;
  type:
    | 'BONAFIDE'
    | 'TRANSFER'
    | 'CHARACTER'
    | 'CONDUCT'
    | 'STUDY'
    | 'PARTICIPATION'
    | 'ACHIEVEMENT'
    | 'SPORTS'
    | 'EVENT'
    | 'TUITION_FEE'
    | 'NOC';
  purpose: string;
  status: 'READY' | 'PROCESSING' | 'APPROVED' | 'SUBMITTED';
  requestDate: string;
  issuedDate?: string;
  verificationCode: string;
  signedBy?: string;
  downloadUrl?: string;
}

export interface HostelBedRecord {
  bedId: string;
  building: string;
  floor: string;
  room: string;
  wardenName: string;
  studentName: string | null;
  studentId?: string;
  grade: string;
  attendanceStatus: 'PRESENT' | 'ABSENT' | 'LEAVE' | 'OUTING' | 'MEDICAL' | 'APPROVED_MOVEMENT';
  lastUpdated?: string;
}

export interface HostelMovementRecord {
  id: string;
  studentName: string;
  room: string;
  departure: string;
  purpose: string;
  destination: string;
  expectedReturn: string;
  actualReturn: string;
  status: 'OUT' | 'RETURNED' | 'PENDING_APPROVAL';
  authorizedBy: string;
}

export interface HostelVisitorRecord {
  id: string;
  visitorName: string;
  relation: string;
  visitingStudent: string;
  room: string;
  idProofType: string;
  idVerified: boolean;
  entryTime: string;
  exitTime: string;
  status: 'CHECKED_IN' | 'CHECKED_OUT';
}

export interface LibraryBookRecord {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: 'Mathematics' | 'Science' | 'Computer Science' | 'Literature' | 'Reference' | 'Digital E-Book';
  totalCopies: number;
  availableCopies: number;
  status: 'AVAILABLE' | 'ISSUED' | 'RESERVED' | 'LOST_DAMAGED';
  borrower: string;
  reservedBy?: string;
  dueDate?: string;
  renewalsCount: number;
  fineAmount: number;
  isDigitalResource?: boolean;
}

export interface InventoryAssetRecord {
  code: string;
  item: string;
  category: 'Laboratory' | 'IT & Robotics' | 'Sports' | 'Furniture & Infra' | 'Examination';
  stock: string;
  vendor: string;
  poNumber: string;
  amount: string;
  poStatus: 'Request Raised' | 'Pending Approval' | 'PO Approved' | 'Delivered' | 'Verified & Active';
  maintenance: string;
}

export interface AdmissionLeadRecord {
  id: string;
  candidateName: string;
  applyingGrade: string;
  parentName: string;
  phone: string;
  stage:
    | 'Enquiry'
    | 'Counselling'
    | 'Application'
    | 'Doc Verification'
    | 'Entrance Test'
    | 'Interview'
    | 'Selected'
    | 'Fee Paid'
    | 'Confirmed';
  testScore: string;
  counsellor: string;
}

export interface AlumniProfileRecord {
  id: string;
  name: string;
  graduationYear: string;
  higherEducation: string;
  organization: string;
  industry: string;
  location: string;
  achievement: string;
  contributionType: 'Mentorship' | 'Internship Sponsor' | 'Guest Talk' | 'Endowment Donor';
  contributionDetail: string;
  mentorshipSlotsBooked: number;
}

export interface CampusEventClubRecord {
  id: string;
  name: string;
  category: 'Event' | 'Sports' | 'Club';
  dateOrSchedule: string;
  venue: string;
  coordinator: string;
  participantsCount: number;
  attendanceRate: string;
  resultOrAchievement: string;
  certificateIssuedCount: number;
}

export interface ParentTransportTelemetry {
  routeNumber: string;
  busNumber: string;
  currentSpeedKmH: number;
  statusText: string;
  engineHealth: 'Optimal' | 'Warning';
  rfidBoardedCount: number;
  totalCapacity: number;
  nextStopName: string;
  etaNextStopMins: number;
  driverName: string;
  driverPhone: string;
  conductorName: string;
  conductorPhone: string;
  safetyOfficerPhone: string;
  studentRfidLogs: {
    tripType: 'MORNING' | 'AFTERNOON';
    timestamp: string;
    location: string;
    status: 'BOARDED' | 'ARRIVED_CAMPUS' | 'DROPPED_HOME' | 'SCHEDULED';
  }[];
  stops: {
    stopNumber: number;
    name: string;
    scheduledTime: string;
    isCompleted: boolean;
    isCurrent: boolean;
    isStudentStop?: boolean;
  }[];
}

export interface ParentLeaveRequest {
  id: string;
  childId: string;
  childName: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: 'SICK' | 'CASUAL' | 'FAMILY';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedDate: string;
  teacherRemark?: string;
}

export interface ParentPtmBooking {
  id: string;
  childId: string;
  childName: string;
  dateStr: string;
  timeSlot: string;
  teacherName: string;
  subject: string;
  venue: string;
  status: 'BOOKED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
}


