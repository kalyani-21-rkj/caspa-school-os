import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from './src/services/db';
import { processCaspaQuery } from './src/services/caspaAi';
import { RoleType } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // ===================== REST API ROUTES =====================

  // 1. Auth: Login & Register
  app.post('/api/v1/auth/login', (req: Request, res: Response) => {
    const { emailOrUsername, password, role } = req.body;
    if (!emailOrUsername) {
      return res.status(400).json({ error: 'Email or Username is required' });
    }
    const result = db.login(emailOrUsername, password, role as RoleType);
    res.json(result);
  });

  app.post('/api/v1/auth/register', (req: Request, res: Response) => {
    const { username, designation, email, password } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and Email are required' });
    }
    const result = db.register(username, designation, email, password);
    res.json(result);
  });

  app.post('/api/v1/auth/logout', (req: Request, res: Response) => {
    db.logout();
    res.json({ success: true, message: 'Logged out successfully' });
  });

  app.get('/api/v1/auth/me', (req: Request, res: Response) => {
    res.json({
      isAuthenticated: db.isAuthenticated,
      user: db.currentUser,
    });
  });

  // 2. Teacher Specific Routes (Images 4, 5, 6, 7, 8, 9)
  app.get('/api/v1/teacher/overview', (req: Request, res: Response) => {
    res.json({
      teacher: db.currentUser,
      termInfo: 'Term 2 • Week 8',
      summaryKpis: {
        classesCount: db.teacherClasses.length,
        studentsCount: 187,
        homeworkToReview: 12,
      },
      nextClass: db.teacherClasses.find(c => c.isNext) || db.teacherClasses[0],
      timetable: db.teacherClasses,
      studentAlerts: [
        { id: 'al-1', studentName: 'Marcus Brody', grade: 'Grade 9B', alert: 'Missed HW (x2)', actionLabel: 'Follow Up', avatarInitials: 'MB' },
        { id: 'al-2', studentName: 'Sophia Chen', grade: 'Grade 9B', alert: 'Attendance (68%)', actionLabel: 'Send Note', avatarInitials: 'SC' },
        { id: 'al-3', studentName: 'Devon Patel', grade: 'Grade 10A', alert: 'Missed Quiz', actionLabel: 'Follow Up', avatarInitials: 'DP' },
      ],
    });
  });

  app.get('/api/v1/teacher/classes', (req: Request, res: Response) => {
    res.json({ classes: db.teacherClasses });
  });

  app.get('/api/v1/teacher/students', (req: Request, res: Response) => {
    res.json({ students: db.teacherStudents });
  });

  app.post('/api/v1/teacher/attendance/mark', (req: Request, res: Response) => {
    const { studentId, status } = req.body;
    if (!studentId || !status) {
      return res.status(400).json({ error: 'studentId and status required' });
    }
    const updated = db.setStudentAttendance(studentId, status);
    res.json({ success: true, student: updated });
  });

  app.post('/api/v1/teacher/attendance/mark-all-present', (req: Request, res: Response) => {
    const updated = db.markAllStudentsPresent();
    res.json({ success: true, students: updated });
  });

  app.post('/api/v1/teacher/grading/update', (req: Request, res: Response) => {
    const { studentId, score, note } = req.body;
    if (!studentId) {
      return res.status(400).json({ error: 'studentId required' });
    }
    const updated = db.updateStudentGrade(studentId, score, note);
    res.json({ success: true, student: updated });
  });

  app.get('/api/v1/teacher/tasks', (req: Request, res: Response) => {
    res.json({ tasks: db.teacherTasks });
  });

  app.post('/api/v1/teacher/tasks/create', (req: Request, res: Response) => {
    const { title, type, gradeSection, dueDate } = req.body;
    const newTask = db.createTask(title, type, gradeSection, dueDate);
    res.status(201).json({ success: true, task: newTask });
  });

  app.get('/api/v1/teacher/parent-messages', (req: Request, res: Response) => {
    res.json({ messages: db.parentMessages });
  });

  app.post('/api/v1/teacher/parent-messages/reply', (req: Request, res: Response) => {
    const { parentId, replyText } = req.body;
    const updated = db.sendParentMessage(parentId, replyText);
    res.json({ success: true, message: updated });
  });

  // 3. Student Specific Routes
  app.get('/api/v1/student/overview', (req: Request, res: Response) => {
    res.json({
      student: db.currentUser?.roleType === 'STUDENT' ? db.currentUser : null,
      gpa: 3.9,
      rank: 2,
      attendanceRate: 96.2,
      periodsToday: db.studentPeriods,
      pendingTasks: db.studentTasks.filter(t => t.status === 'PENDING'),
      recentMaterials: db.studyMaterials.slice(0, 3),
      assignedBus: db.buses[0],
    });
  });

  app.get('/api/v1/student/timetable', (req: Request, res: Response) => {
    res.json({ periods: db.studentPeriods });
  });

  app.get('/api/v1/student/tasks', (req: Request, res: Response) => {
    res.json({ tasks: db.studentTasks });
  });

  app.post('/api/v1/student/tasks/:id/submit', (req: Request, res: Response) => {
    const { id } = req.params;
    const task = db.submitStudentTask(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ success: true, task });
  });

  app.get('/api/v1/student/materials', (req: Request, res: Response) => {
    const { subject } = req.query;
    let list = db.studyMaterials;
    if (subject && subject !== 'ALL') {
      list = list.filter(m => m.subject.toLowerCase() === (subject as string).toLowerCase());
    }
    res.json({ materials: list });
  });

  app.get('/api/v1/student/attendance', (req: Request, res: Response) => {
    res.json({
      rate: 96.2,
      totalDays: 22,
      present: 19,
      late: 2,
      absent: 1,
      heatmap: db.attendanceHeatmap,
      excuses: db.absenceExcuses,
    });
  });

  app.post('/api/v1/student/attendance/excuse', (req: Request, res: Response) => {
    const { date, reason } = req.body;
    if (!date || !reason) {
      return res.status(400).json({ error: 'Date and reason are required' });
    }
    const excuse = db.submitAbsenceExcuse(date, reason);
    res.json({ success: true, excuse });
  });

  app.get('/api/v1/student/achievements', (req: Request, res: Response) => {
    res.json({ achievements: db.studentAchievements });
  });

  app.get('/api/v1/student/bus', (req: Request, res: Response) => {
    res.json({ bus: db.buses[0] });
  });

  // 4. Admin & Enterprise School Management Routes
  app.get('/api/v1/admin/overview', (req: Request, res: Response) => {
    const totalStudents = db.students.length;
    const activeStudents = db.students.filter(s => s.status === 'ACTIVE').length;
    const totalStaff = db.staffMembers.length;
    const totalBuses = db.buses.length;
    const activeSafety = db.safetyIncidents.filter(s => s.status !== 'RESOLVED' && s.status !== 'CLOSED').length;
    const pendingApprovals = db.approvals.filter(a => a.status === 'PENDING').length;
    const totalFeeAmount = db.feeInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const paidFeeAmount = db.feeInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const feeRate = totalFeeAmount > 0 ? ((paidFeeAmount / totalFeeAmount) * 100).toFixed(1) : '94.2';

    res.json({
      admin: db.currentUser?.roleType === 'ADMIN' ? db.currentUser : null,
      summary: {
        totalStudents,
        activeStudents,
        totalStaff,
        totalBuses,
        activeSafety,
        pendingApprovals,
        attendanceTodayRate: 96.4,
        feeCollectionRate: parseFloat(feeRate),
        totalFeeCollected: paidFeeAmount,
        totalFeeOutstanding: totalFeeAmount - paidFeeAmount,
      },
      recentAudits: db.auditLogs.slice(0, 10),
      approvals: db.approvals.slice(0, 5),
      safetyAlerts: db.safetyIncidents.filter(s => s.status !== 'RESOLVED'),
    });
  });

  app.get('/api/v1/admin/students', (req: Request, res: Response) => {
    const { grade, section, status, search } = req.query;
    let list = db.students;
    if (grade && grade !== 'ALL') {
      list = list.filter(s => s.grade.toLowerCase() === (grade as string).toLowerCase());
    }
    if (section && section !== 'ALL') {
      list = list.filter(s => s.section.toLowerCase() === (section as string).toLowerCase());
    }
    if (status && status !== 'ALL') {
      list = list.filter(s => s.status === status);
    }
    if (search) {
      const q = (search as string).toLowerCase();
      list = list.filter(s =>
        s.fullName.toLowerCase().includes(q) ||
        s.admissionNo.toLowerCase().includes(q) ||
        s.parentName.toLowerCase().includes(q)
      );
    }
    res.json({ students: list, total: list.length });
  });

  app.post('/api/v1/admin/students/admit', (req: Request, res: Response) => {
    const { fullName, grade, section, gender, parentName, parentPhone, parentEmail, busRoute } = req.body;
    if (!fullName || !grade || !section || !parentName) {
      return res.status(400).json({ error: 'fullName, grade, section, parentName are required' });
    }
    const student = db.admitStudent({ fullName, grade, section, gender: gender || 'OTHER', parentName, parentPhone: parentPhone || '', parentEmail: parentEmail || '', busRoute });
    res.status(201).json({ success: true, student });
  });

  app.put('/api/v1/admin/students/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = db.updateStudent(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ success: true, student: updated });
  });

  app.post('/api/v1/admin/students/:id/archive', (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = db.archiveStudent(id);
    if (!updated) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ success: true, student: updated });
  });

  app.get('/api/v1/admin/staff', (req: Request, res: Response) => {
    const { department } = req.query;
    let list = db.staffMembers;
    if (department && department !== 'ALL') {
      list = list.filter(s => s.department.toLowerCase() === (department as string).toLowerCase());
    }
    res.json({ staff: list, total: list.length });
  });

  app.post('/api/v1/admin/staff/onboard', (req: Request, res: Response) => {
    const { fullName, designation, department, email, phone, qualification, classesAssigned, workloadPeriods } = req.body;
    if (!fullName || !designation || !department || !email) {
      return res.status(400).json({ error: 'fullName, designation, department, and email are required' });
    }
    const staff = db.addStaffMember({ fullName, designation, department, email, phone: phone || '', qualification: qualification || '', classesAssigned: classesAssigned || [], workloadPeriods: workloadPeriods || 20 });
    res.status(201).json({ success: true, staff });
  });

  app.get('/api/v1/admin/finance/invoices', (req: Request, res: Response) => {
    res.json({ invoices: db.feeInvoices });
  });

  app.post('/api/v1/admin/finance/collect', (req: Request, res: Response) => {
    const { invoiceId, amount, paymentMethod } = req.body;
    if (!invoiceId || !amount) {
      return res.status(400).json({ error: 'invoiceId and amount required' });
    }
    const inv = db.recordFeePayment(invoiceId, parseFloat(amount), paymentMethod || 'Cash');
    if (!inv) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json({ success: true, invoice: inv });
  });

  app.get('/api/v1/admin/academics/sections', (req: Request, res: Response) => {
    res.json({ sections: db.classSections });
  });

  app.get('/api/v1/admin/safety/cases', (req: Request, res: Response) => {
    res.json({ cases: db.safetyIncidents });
  });

  app.post('/api/v1/admin/safety/cases/:id/update', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, note } = req.body;
    const updated = db.updateSafetyIncident(id, status, note);
    res.json({ success: true, incident: updated });
  });

  app.post('/api/v1/admin/approvals/:id/action', (req: Request, res: Response) => {
    const { id } = req.params;
    const { action, comment } = req.body;
    const updated = db.processApproval(id, action, comment);
    res.json({ success: true, approval: updated });
  });

  app.get('/api/v1/admin/audit-logs', (req: Request, res: Response) => {
    res.json({ logs: db.auditLogs });
  });

  // 5. Principal Executive Console Routes
  app.get('/api/v1/principal/overview', (req: Request, res: Response) => {
    res.json({
      metrics: {
        students: 1240,
        studentsGrowth: '+8.2% vs last term',
        staff: 96,
        staffActiveDutyLead: 4,
        attendance: 91,
        attendanceDiff: '-1.4% vs yesterday',
        feeCollection: 87,
        feeMtdTotal: '₹18.2L MTD Total',
        admissionsMtd: 34,
        admissionsCounselling: 18,
        safetyAlerts: db.principalCriticalAlerts.filter(a => a.status === 'ACTIVE').length,
      },
      criticalAlerts: db.principalCriticalAlerts,
      agenda: db.principalAgenda,
      performance: {
        attendance: { value: '91%', label: '95% Target benchmark' },
        passRate: { value: '88%', label: '+4% from midterms' },
        feeVelocity: { value: '₹18.2L', label: '87% of monthly quota' },
        conversion: { value: '18.3%', label: '34 of 186 enrolled' },
      },
    });
  });

  app.post('/api/v1/principal/alerts/:id/dispatch', (req: Request, res: Response) => {
    const { id } = req.params;
    const { actionType } = req.body;
    const updated = db.dispatchCriticalAlert(id, actionType || 'DISPATCH');
    res.json({ success: true, alert: updated });
  });

  app.get('/api/v1/principal/academics', (req: Request, res: Response) => {
    res.json({
      avgAttendance: '91%',
      avgPassRate: '88%',
      trendStatutoryFloor: '80%',
      cohortStanding: [
        { grade: 'Grade 11 AP Track', score: 89, scholars: 88, status: 'OPTIMAL' },
        { grade: 'Grade 10 High School', score: 86, scholars: 110, status: 'NORMAL' },
        { grade: 'Grade 9 High School', score: 84, scholars: 90, status: 'ATTENTION', note: 'Remediation protocol active for Algebra II' },
      ],
      pendingAcademicApprovals: db.principalExecutiveApprovals.filter(a => a.categoryBadge === 'Academic Blueprint' && a.status === 'PENDING'),
    });
  });

  app.get('/api/v1/principal/staff', (req: Request, res: Response) => {
    res.json({
      workforcePulse: { totalStaff: 96, presentToday: 91, rate: '94.8%', onLeave: 5 },
      facultyEvaluationOverview: { cycle: 'Term 1 Observational Cycle', rating: 4.7, topPercentile: '98th Pctl' },
      pendingLeaves: db.principalStaffLeaves,
      staffDirectory: db.staffMembers,
    });
  });

  app.post('/api/v1/principal/staff/leaves/:id/action', (req: Request, res: Response) => {
    const { id } = req.params;
    const { action } = req.body;
    const updated = db.processPrincipalStaffLeave(id, action || 'APPROVED');
    res.json({ success: true, leave: updated });
  });

  app.get('/api/v1/principal/finance', (req: Request, res: Response) => {
    res.json({
      collectedMtd: '₹18.2L',
      collectedProgress: 84,
      outstanding: '₹4.6L',
      outstandingBalances: 142,
      overdue: '₹1.2L',
      overdueAccountsAlert: 38,
      collectionRate: '87%',
      rateComparison: '+2.4% vs Term 1',
      defaulters: db.principalDefaulters,
      restrictedPayrollSummary: {
        totalMtd: '₹42.0L',
        disbursalDate: '28th via Automated Mandate',
      },
    });
  });

  app.post('/api/v1/principal/finance/remind/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = db.sendFeeReminder(id);
    res.json({ success: true, defaulter: updated });
  });

  app.get('/api/v1/principal/safety', (req: Request, res: Response) => {
    res.json({
      criticalCount: 1,
      openCasesCount: 3,
      investigationCount: 2,
      emergencyCenterActive: true,
      cases: db.principalSafeguardingCases,
      annualAuditDueDays: 14,
      documentationPercent: 92,
    });
  });

  app.post('/api/v1/principal/safety/emergency', (req: Request, res: Response) => {
    const { protocol, details } = req.body;
    const result = db.triggerEmergencyProtocol(protocol, details);
    res.json(result);
  });

  app.post('/api/v1/principal/safety/cases/:id/step', (req: Request, res: Response) => {
    const { id } = req.params;
    const { step } = req.body;
    const updated = db.updateSafeguardingCaseStep(id, Number(step));
    res.json({ success: true, case: updated });
  });

  app.get('/api/v1/principal/operations', (req: Request, res: Response) => {
    res.json({
      copilotLogistics: 'Route 7 delayed 6m by rain; 98.4% morning intake complete.',
      activeBuses: 18,
      hostelOccupancy: '82%',
      libraryCirculation: '94%',
      modules: db.principalOperationsModules,
      operationalAlerts: [
        { id: 'oa-1', title: 'Bus #14 maintenance overdue — schedule mandatory inspection', time: '32m ago', category: 'Fleet Maintenance' },
        { id: 'oa-2', title: 'Perimeter Gate 3 Biometric Terminal Offline', time: '48m ago', category: 'Campus Security' },
        { id: 'oa-3', title: 'Hostel Block B water sensor alert — technician notified', time: '1h ago', category: 'Facilities Dept' },
        { id: 'oa-4', title: 'Library fine collection settlement pending for Term 1', time: '3h ago', category: 'Accounts & Audit' },
      ],
      campusUtility: { solarCapacity: '91%', status: 'Optimal' },
    });
  });

  app.get('/api/v1/principal/approvals', (req: Request, res: Response) => {
    res.json({
      pendingSlaCount: 9,
      signedTodayCount: 4,
      breachedSlaCount: 1,
      approvals: db.principalExecutiveApprovals,
    });
  });

  app.post('/api/v1/principal/approvals/:id/action', (req: Request, res: Response) => {
    const { id } = req.params;
    const { action, note } = req.body;
    const updated = db.processExecutiveApprovalAction(id, action || 'APPROVED', note);
    res.json({ success: true, approval: updated });
  });

  // 6. CASPA AI Query
  app.post('/api/v1/caspa/query', async (req: Request, res: Response) => {
    const { query, role, userName } = req.body;
    const activeRole = (role as RoleType) || db.currentUser?.roleType || 'TEACHER';
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    const result = await processCaspaQuery({ query, role: activeRole, userName });
    res.json(result);
  });

  // 7. Enterprise ERP Modules (Sections 4, 8, 9, 10, 11, 12, 13, 15, 16 & 24)
  app.get('/api/v1/admissions/leads', (_req: Request, res: Response) => {
    res.json({
      funnel: {
        enquiries: 342,
        counselling: 184,
        testsCleared: 92,
        interviews: db.admissionLeads.filter((l) => l.stage === 'Interview').length + 33,
        confirmed: 24 + db.admissionLeads.filter((l) => l.stage === 'Confirmed').length,
        conversionRate: '18.3%',
      },
      leads: db.admissionLeads,
    });
  });

  app.post('/api/v1/admissions/leads/:id/advance', (req: Request, res: Response) => {
    const updated = db.advanceAdmissionLead(req.params.id);
    res.json({ success: Boolean(updated), lead: updated });
  });

  app.get('/api/v1/hostel/overview', (_req: Request, res: Response) => {
    const occupied = db.hostelBeds.filter((b) => Boolean(b.studentName)).length;
    res.json({
      occupancy: `${occupied}/${db.hostelBeds.length}`,
      availableBeds: db.hostelBeds.length - occupied,
      beds: db.hostelBeds,
      movements: db.hostelMovements,
      visitors: db.hostelVisitors,
      curfewVerified: true,
    });
  });

  app.post('/api/v1/hostel/beds/allocate', (req: Request, res: Response) => {
    const { bedId, studentName, grade, targetTransferBedId } = req.body;
    const updated = db.allocateOrTransferHostelBed(bedId, studentName ?? null, grade, targetTransferBedId);
    res.json({ success: Boolean(updated), bed: updated, beds: db.hostelBeds });
  });

  app.post('/api/v1/hostel/beds/:bedId/attendance', (req: Request, res: Response) => {
    const updated = db.updateHostelBedAttendance(req.params.bedId, req.body.status);
    res.json({ success: Boolean(updated), bed: updated });
  });

  app.post('/api/v1/hostel/movements', (req: Request, res: Response) => {
    const mv = db.addHostelMovement(req.body);
    res.status(201).json({ success: true, movement: mv });
  });

  app.post('/api/v1/hostel/movements/:id/return', (req: Request, res: Response) => {
    const mv = db.markHostelMovementReturned(req.params.id);
    res.json({ success: Boolean(mv), movement: mv });
  });

  app.post('/api/v1/hostel/visitors', (req: Request, res: Response) => {
    const visitor = db.addHostelVisitor(req.body);
    res.status(201).json({ success: true, visitor });
  });

  app.post('/api/v1/hostel/visitors/:id/checkout', (req: Request, res: Response) => {
    const visitor = db.checkoutHostelVisitor(req.params.id);
    res.json({ success: Boolean(visitor), visitor });
  });

  app.get('/api/v1/library/catalogue', (_req: Request, res: Response) => {
    res.json({
      circulationIndex: '94%',
      overdueBooksCount: db.libraryBooks.filter((b) => b.fineAmount > 0).length,
      books: db.libraryBooks,
    });
  });

  app.post('/api/v1/library/books', (req: Request, res: Response) => {
    const book = db.addLibraryBook(req.body);
    res.status(201).json({ success: true, book });
  });

  app.post('/api/v1/library/books/:id/action', (req: Request, res: Response) => {
    const { action, studentName } = req.body;
    const book = db.issueOrReturnLibraryBook(req.params.id, action, studentName);
    res.json({ success: Boolean(book), book });
  });

  app.get('/api/v1/inventory/assets', (_req: Request, res: Response) => {
    res.json({
      pendingPurchaseOrders: db.inventoryAssets.filter((a) => a.poStatus !== 'Verified & Active').length,
      assets: db.inventoryAssets,
    });
  });

  app.post('/api/v1/inventory/assets', (req: Request, res: Response) => {
    const asset = db.addInventoryAssetOrder(req.body);
    res.status(201).json({ success: true, asset });
  });

  app.post('/api/v1/inventory/assets/:code/advance', (req: Request, res: Response) => {
    const asset = db.advanceInventoryAssetStatus(req.params.code);
    res.json({ success: Boolean(asset), asset });
  });

  app.get('/api/v1/certificates', (_req: Request, res: Response) => {
    res.json({ certificates: db.parentCertificates });
  });

  app.post('/api/v1/certificates/generate', (req: Request, res: Response) => {
    const cert = db.requestParentCertificate(req.body);
    res.status(201).json({ success: true, certificate: cert });
  });

  app.get('/api/v1/certificates/verify/:code', (req: Request, res: Response) => {
    const result = db.verifyCertificateByCode(req.params.code);
    res.json(result);
  });

  app.get('/api/v1/alumni-career', (_req: Request, res: Response) => {
    res.json({
      totalAlumni: 1840 + db.alumniProfiles.length,
      mentorsActive: 64,
      alumni: db.alumniProfiles,
      eventsAndClubs: db.campusEventsAndClubs,
      seniorStreams: [
        'STEM (JEE/SAT)',
        'Biomedical (NEET)',
        'Commerce & Finance (CA/CUET)',
        'Global Liberal Arts (IB/CLAT)',
      ],
    });
  });

  app.post('/api/v1/communications/broadcast', (req: Request, res: Response) => {
    const { audience, channels, subject, isEmergency } = req.body;
    res.json({
      success: true,
      dispatchedAt: new Date().toISOString(),
      audience: audience || 'Campus-Wide',
      channels: channels || ['In-App', 'Push'],
      subject,
      isEmergency: Boolean(isEmergency),
    });
  });

  app.get('/api/v1/rbac/workflows', (_req: Request, res: Response) => {
    res.json({
      workflows: [
        'Leave approval',
        'Admission approval',
        'Fee concession',
        'Purchase request',
        'Expense approval',
        'Certificate approval',
        'Student transfer',
        'Hostel movement',
        'Transport request',
        'Event request',
      ],
      totalScreensImplemented: 76,
    });
  });

  // ===================== VITE & STATIC SERVING =====================
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CASPA School OS] Full-stack engine running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
