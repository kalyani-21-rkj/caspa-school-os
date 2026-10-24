import { GoogleGenAI } from '@google/genai';
import { RoleType } from '../types';
import { db } from './db';
import {
  CaspaQueryRequest,
  CaspaQueryResponse,
  getLocalSmartResponse,
  getSuggestedActionsForRole,
} from './caspaKnowledgeEngine';

export type { CaspaQueryRequest, CaspaQueryResponse };

export function buildRoleSystemPrompt(role: RoleType, userName?: string): string {
  const displayName = userName || db.currentUser?.fullName || role;
  const baseRules = `
You are CASPA (Centralized Academic & School Predictive Assistant), the built-in intelligence engine and academic tutor of CASPA School OS.
Current User Name: ${displayName}
Current User Role: ${role}.
Enterprise Privacy and RBAC Constraints:
1. Strict Role Boundaries:
   - For 'STUDENT': Act as an expert, encouraging academic tutor for all school subjects (Physics, Mathematics, Chemistry, Biology, English, Computer Science, History) AND a personal student portal assistant (homework deadlines, timetable, attendance, study notes, and school bus ETA). Answer any science, math, or general academic question thoroughly with clear explanations, formulas, and examples. NEVER reveal confidential safety files, anti-ragging incident details, staff disciplinary actions, or school salary metrics.
   - For 'PARENT': Focus on their child's attendance, homework, exam results, fee invoices, and live school bus tracking.
   - For 'TEACHER': Assist with pedagogy, pop-quizzes, lesson outlines, grading rubric suggestions, and attendance patterns.
   - For 'VICE_PRINCIPAL': Assist with master timetable conflict resolution, substitute teacher allocation, lesson plan reviews, and examination readiness.
   - For 'PRINCIPAL' or 'ADMIN': Provide executive synthesis, academic trends, operational health (buses, staff attendance, fee collection), safety compliance, and pending authorizations.
2. Tone: Professional, clear, structured, and educational. Address the user by name (${displayName}) when appropriate.
`;
  return baseRules;
}

export async function processCaspaQuery(req: CaspaQueryRequest): Promise<CaspaQueryResponse> {
  const { query, role, userName } = req;
  const apiKey = process.env.GEMINI_API_KEY;

  const metrics = db.getDashboardMetrics();
  const busOnRoute = db.buses.filter((b) => b.status === 'ON_ROUTE').length;
  const pendingStudentTasks = db.studentTasks
    .filter((t) => t.status === 'PENDING')
    .map((t) => `${t.subject}: ${t.title} (Due: ${t.dueDate})`)
    .join('; ');

  const schoolContext = `
Current Real-Time School State:
- Logged-In User: ${userName || db.currentUser?.fullName || 'User'} (${role})
- Total Student Enrollment: 2,450
- Today's Student Attendance: ${metrics.kpis.attendanceTodayPercent}%
- Staff Attendance: ${metrics.kpis.staffAttendancePercent}%
- Pending Executive Approvals: ${metrics.pendingApprovalsCount}
- Student Pending Homework Tasks: ${pendingStudentTasks}
- Active Safety Cases: ${role === 'PRINCIPAL' || role === 'ADMIN' || role === 'SAFETY_OFFICER' ? metrics.kpis.activeSafetyAlerts : '[Redacted - Insufficient Clearance]'}
- School Bus Fleet: ${busOnRoute} of ${db.buses.length} active on GPS
`;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
      const systemInstruction = buildRoleSystemPrompt(role, userName) + '\n' + schoolContext;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: query,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const text = response.text;
      if (text && text.trim().length > 0) {
        return {
          answer: text,
          sources: ['CASPA Real-Time Telemetry', 'School Knowledge Base', 'Gemini 3.8 Flash'],
          isAiGenerated: true,
          requiresReview: role === 'TEACHER' || role === 'PRINCIPAL',
          suggestedActions: getSuggestedActionsForRole(role),
        };
      }
    } catch (err) {
      console.warn('Gemini API call error, falling back to local domain intelligence:', err);
    }
  }

  return getLocalSmartResponse(query, role, userName);
}
