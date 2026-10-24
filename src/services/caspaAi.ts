import { GoogleGenAI } from '@google/genai';
import { RoleType } from '../types';
import { db } from './db';

export interface CaspaQueryRequest {
  query: string;
  role: RoleType;
  contextScope?: string;
}

export interface CaspaQueryResponse {
  answer: string;
  sources: string[];
  suggestedActions?: { label: string; actionId: string }[];
  isAiGenerated: boolean;
  requiresReview?: boolean;
}

export function buildRoleSystemPrompt(role: RoleType): string {
  const baseRules = `
You are CASPA (Centralized Academic & School Predictive Assistant), the built-in intelligence engine of CASPA School OS.
Current User Role: ${role}.
Enterprise Privacy and RBAC Constraints:
1. Strict Role Boundaries:
   - For 'STUDENT' or 'PARENT': NEVER reveal confidential safety files, anti-ragging incident details, staff disciplinary actions, or overall school finance/salary metrics. Focus purely on personal learning, timetable, attendance, bus ETA, and homework.
   - For 'TEACHER': Assist with pedagogy, pop-quizzes, lesson outlines, grading rubric suggestions, and attendance patterns. Do not leak other departments' private finance files or confidential safety investigation logs.
   - For 'SAFETY_OFFICER': Provide statutory anti-ragging compliance advice, escalation SLAs, and confidential investigative note drafting.
   - For 'PRINCIPAL': Provide executive synthesis, academic trends, operational health (buses, staff attendance, fee collection), and pending authorizations.
2. Tone: Professional, reassuring, precise, and educational.
3. Be concise and actionable.
`;
  return baseRules;
}

export async function processCaspaQuery(req: CaspaQueryRequest): Promise<CaspaQueryResponse> {
  const { query, role } = req;
  const apiKey = process.env.GEMINI_API_KEY;

  // Domain context injection based on active DB state
  const metrics = db.getDashboardMetrics();
  const busOnRoute = db.buses.filter((b) => b.status === 'ON_ROUTE').length;

  const schoolContext = `
Current Real-Time School State:
- Total Student Enrollment: 2,450
- Today's Student Attendance: ${metrics.kpis.attendanceTodayPercent}%
- Staff Attendance: ${metrics.kpis.staffAttendancePercent}%
- Pending Executive Approvals: ${metrics.pendingApprovalsCount}
- Active Safety Cases: ${role === 'PRINCIPAL' || role === 'SAFETY_OFFICER' ? metrics.kpis.activeSafetyAlerts : '[Redacted - Insufficient Clearance]'}
- School Bus Fleet: ${busOnRoute} of ${db.buses.length} active on GPS
`;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildRoleSystemPrompt(role) + '\n' + schoolContext;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const text = response.text || '';
      return {
        answer: text,
        sources: ['CASPA Real-Time Telemetry', 'School Knowledge Base', 'Gemini 2.5 Flash'],
        isAiGenerated: true,
        requiresReview: role === 'TEACHER' || role === 'PRINCIPAL',
        suggestedActions: getSuggestedActionsForRole(role),
      };
    } catch (err) {
      console.warn('Gemini API call error, falling back to local domain intelligence:', err);
    }
  }

  // High-fidelity domain-aware rule engine fallback
  return getLocalSmartResponse(query, role, metrics);
}

function getSuggestedActionsForRole(role: RoleType) {
  if (role === 'PRINCIPAL') {
    return [
      { label: 'Review Urgent Approvals', actionId: 'NAV_APPROVALS' },
      { label: 'View Confidential Safety Log', actionId: 'NAV_SAFETY' },
      { label: 'Check Bus GPS Fleet', actionId: 'NAV_TRANSPORT' },
    ];
  }
  if (role === 'TEACHER') {
    return [
      { label: 'One-Tap Attendance', actionId: 'NAV_ATTENDANCE' },
      { label: 'Generate Pop Quiz', actionId: 'ACTION_QUIZ' },
      { label: 'Review Grade 10-A Marks', actionId: 'NAV_ACADEMICS' },
    ];
  }
  if (role === 'STUDENT') {
    return [
      { label: 'View Class Timetable', actionId: 'NAV_TIMETABLE' },
      { label: 'Check Homework Deadlines', actionId: 'NAV_TASKS' },
      { label: 'Study Flashcards', actionId: 'ACTION_FLASHCARDS' },
    ];
  }
  if (role === 'PARENT') {
    return [
      { label: 'Track School Bus Live', actionId: 'NAV_BUS' },
      { label: 'View Fee Invoices', actionId: 'NAV_FEES' },
      { label: 'Message Class Teacher', actionId: 'NAV_MESSAGES' },
    ];
  }
  return [{ label: 'Safety Incident Register', actionId: 'NAV_SAFETY' }];
}

function getLocalSmartResponse(query: string, role: RoleType, metrics: ReturnType<typeof db.getDashboardMetrics>): CaspaQueryResponse {
  const q = query.toLowerCase();

  if (role === 'STUDENT') {
    if (q.includes('homework') || q.includes('task') || q.includes('assignment')) {
      return {
        answer: `Hi Rahul! Here are your active assignments due this week:\n• Physics: Electromagnetic Induction practice set (Due tomorrow at 04:00 PM)\n• Mathematics: Quadratic Formula worksheet (Due Friday)\n• English: Shakespearean Essay draft (Due Monday)\n\nTip: You can ask me to explain any difficult formula or provide concept flashcards!`,
        sources: ['Grade 10 LMS Syllabus Engine', 'Physics Department'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Generate Physics Revision Guide', actionId: 'PHYSICS_GUIDE' },
          { label: 'Practice Quiz', actionId: 'QUIZ' },
        ],
      };
    }
    if (q.includes('timetable') || q.includes('next class') || q.includes('period')) {
      return {
        answer: `Next Class Period 3 (10:15 - 11:00 AM): Physics in Lab 2B with Mr. Anand Sharma. Make sure to bring your Practical Record book!`,
        sources: ['Central Timetable Scheduler'],
        isAiGenerated: true,
      };
    }
    return {
      answer: `Hello Rahul! I am your CASPA Student Study Assistant. I can help you with:\n1. Step-by-step revision guides for Physics, Chemistry, and Math\n2. Timetable & upcoming class reminders\n3. Homework deadline tracking\n4. Practice quiz drills for exam prep\n\nWhat would you like to review?`,
      sources: ['CASPA Student Portal Knowledge Base'],
      isAiGenerated: true,
      suggestedActions: [
        { label: 'Review Today\'s Lessons', actionId: 'REVIEW' },
        { label: 'Practice Physics Quiz', actionId: 'QUIZ' },
      ],
    };
  }

  if (role === 'PARENT') {
    return {
      answer: `Good day, Mrs. Anita Verma! Here is Rahul Verma's (Grade 10-A) summary for today:\n• Attendance: Present (marked at 08:15 AM)\n• Bus Status: Bus Route 12 is currently ON ROUTE near Silver Oak Apartments. Estimated Drop-off at South Enclave stop is 03:45 PM.\n• Fee Status: Term 2 Tuition fee is 100% PAID. No outstanding dues.\n• Next PTM: Friday, 24th October from 03:00 PM.`,
      sources: ['Student Information System', 'Fleet GPS Telemetry', 'Accounts Ledger'],
      isAiGenerated: true,
      suggestedActions: [
        { label: 'Track Bus Live on Map', actionId: 'NAV_BUS' },
        { label: 'Download Fee Receipt', actionId: 'NAV_FEES' },
      ],
    };
  }

  if (role === 'TEACHER') {
    if (q.includes('quiz') || q.includes('question') || q.includes('test')) {
      return {
        answer: `Here is a suggested 5-question pop-quiz on Electromagnetic Induction (Grade 10 Physics):\n1. State Faraday's First Law of Electromagnetic Induction.\n2. In Lenz's Law, what does the direction of induced current oppose? (Conservation of Energy principle).\n3. Differentiate between Step-up and Step-down transformers in terms of turns ratio.\n4. Name two everyday devices that utilize eddy currents for electromagnetic damping.\n5. Numerical: A coil of 50 turns experiences a magnetic flux change of 0.2 Weber in 0.05 seconds. Calculate the induced electromotive force (EMF).\n\nWould you like me to generate the answer key and marking rubric?`,
        sources: ['Curriculum Standard NCERT/CBSE Grade 10', 'Physics Syllabus Matrix'],
        isAiGenerated: true,
        requiresReview: true,
        suggestedActions: [
          { label: 'Publish to Class 10-A Portal', actionId: 'PUBLISH_QUIZ' },
          { label: 'Download Printable PDF', actionId: 'EXPORT_PDF' },
        ],
      };
    }
    return {
      answer: `Good morning Mr. Anand Sharma! Here is your Class 10-A Academic Summary:\n• Enrolled Students: 38 (36 Present, 1 Absent: Ishaan Chopra, 1 Late: Rohan Mehra)\n• Next Period: Period 3 Physics (Lab 2B) starting at 10:15 AM\n• Pending Tasks: 4 Practical Record books pending sign-off\n\nHow can CASPA assist your teaching workflow today?`,
      sources: ['Grade 10-A Daily Roster', 'Teacher Timetable'],
      isAiGenerated: true,
      suggestedActions: [
        { label: 'Open One-Tap Attendance', actionId: 'NAV_ATTENDANCE' },
        { label: 'Draft Pop-Quiz', actionId: 'ACTION_QUIZ' },
      ],
    };
  }

  // PRINCIPAL & SAFETY_OFFICER
  if (q.includes('alert') || q.includes('safety') || q.includes('incident') || q.includes('ragging')) {
    return {
      answer: `CASPA Safety Summary (Principal & Safety Officer Clearance):\n• Active Cases: 3 currently logged in Central Campus.\n• Case #SAFE-8941 [HIGH RISK]: Anti-Ragging complaint in Senior Cafeteria. SLA window expires in 2 hours. Cmdr. Mehra has isolated South Wing CCTV footage.\n• Case #SAFE-8939 [MEDIUM RISK]: Defamatory graffiti on Locker #142. Facilities has scrubbed surface; counselling scheduled.\n• Case #SAFE-8920 [CRITICAL]: Unofficial group harassment. IT liaison coordinating with Cyber Safety cell.\n\nRecommendation: Convene the Anti-Ragging Committee at 11:30 AM to finalize preliminary findings for SAFE-8941.`,
      sources: ['Confidential Safeguarding Module', 'CCTV Log Central', 'Anti-Ragging Committee Register'],
      isAiGenerated: true,
      suggestedActions: [
        { label: 'Open Case #SAFE-8941 Dossier', actionId: 'OPEN_SAFE_8941' },
        { label: 'Trigger Committee Meeting Alert', actionId: 'TRIGGER_MEETING' },
      ],
    };
  }

  return {
    answer: `CASPA Command Center Executive Intelligence Report:\n• Attendance: Today's student attendance is tracking strong at ${metrics.kpis.attendanceTodayPercent}% across 2,450 students. Staff presence is at 98.1%.\n• Fleet Safety: All ${db.buses.length} transport buses are active; Route 08 is currently experiencing an 8-minute traffic delay near Golf Links.\n• Critical Approvals: 3 urgent requisitions require your sign-off, notably Chemistry Lab Reagents ($3,420) for board practicals.\n• Campus Climate: 1 high-priority safety alert pending stage 2 review within 2-hour SLA deadline.`,
    sources: ['School Enterprise Telemetry Engine', 'Financial Accounts Ledger', 'GPS Transit Matrix'],
    isAiGenerated: true,
    suggestedActions: [
      { label: 'View Pending Approvals', actionId: 'NAV_APPROVALS' },
      { label: 'Inspect Fleet Operations', actionId: 'NAV_TRANSPORT' },
      { label: 'Open Safety Center', actionId: 'NAV_SAFETY' },
    ],
  };
}
