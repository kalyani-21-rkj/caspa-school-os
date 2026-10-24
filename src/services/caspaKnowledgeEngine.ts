import { RoleType } from '../types';
import { db } from './db';

export interface CaspaQueryRequest {
  query: string;
  role: RoleType;
  userName?: string;
  contextScope?: string;
}

export interface CaspaQueryResponse {
  answer: string;
  sources: string[];
  suggestedActions?: { label: string; actionId: string }[];
  isAiGenerated: boolean;
  requiresReview?: boolean;
}

export function getSuggestedActionsForRole(role: RoleType) {
  if (role === 'PRINCIPAL' || role === 'ADMIN' || role === 'SUPER_ADMIN') {
    return [
      { label: 'Review Urgent Approvals', actionId: 'NAV_APPROVALS' },
      { label: 'View Confidential Safety Log', actionId: 'NAV_SAFETY' },
      { label: 'Check Bus GPS Fleet', actionId: 'NAV_TRANSPORT' },
    ];
  }
  if (role === 'VICE_PRINCIPAL') {
    return [
      { label: 'Inspect Timetable Conflicts', actionId: 'NAV_TIMETABLE' },
      { label: 'Review Lesson Plans', actionId: 'NAV_LESSON_PLANS' },
      { label: 'Academic Analytics', actionId: 'NAV_ACADEMICS' },
    ];
  }
  if (role === 'TEACHER') {
    return [
      { label: 'One-Tap Attendance', actionId: 'NAV_ATTENDANCE' },
      { label: 'Generate Pop Quiz', actionId: 'ACTION_QUIZ' },
      { label: 'Review Class Marks', actionId: 'NAV_MARKS' },
    ];
  }
  if (role === 'STUDENT') {
    return [
      { label: 'View Class Timetable', actionId: 'NAV_TIMETABLE' },
      { label: 'Check Homework Deadlines', actionId: 'NAV_TASKS' },
      { label: 'Open Study Materials', actionId: 'NAV_MATERIALS' },
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

export function getLocalSmartResponse(
  query: string,
  role: RoleType,
  userName?: string
): CaspaQueryResponse {
  const q = query.toLowerCase().trim();
  const displayName = userName || db.currentUser?.fullName || (role === 'STUDENT' ? 'Student' : 'User');
  const firstName = displayName.split(' ')[0];
  const metrics = db.getDashboardMetrics();

  // ============================================================================
  // 1. UNIVERSAL ACADEMIC & STEM TUTOR QUERIES (Physics, Math, Chemistry, Bio, etc.)
  // ============================================================================

  // Newton's Laws of Motion
  if (q.includes('newton')) {
    if (q.includes('third') || q.includes('3rd') || q.includes('3')) {
      return {
        answer: `**Newton's Third Law of Motion**\n\n**Statement:**\n"For every action, there is an equal and opposite reaction."\n\n**Mathematical Form:**\n$$\\vec{F}_{AB} = -\\vec{F}_{BA}$$\n*(If object A exerts a force $\\vec{F}_{AB}$ on object B, then object B simultaneously exerts a force $\\vec{F}_{BA}$ of equal magnitude and opposite direction on object A.)*\n\n**Key Points to Remember:**\n1. Action and reaction forces always act on **two different bodies**, so they never cancel each other out.\n2. Both forces occur **simultaneously** and are of the same nature.\n\n**Real-Life Examples:**\n• **Rocket Propulsion:** A rocket expels hot exhaust gases downward (action), and the gases push the rocket upward with equal force (reaction).\n• **Walking:** Your foot pushes the ground backward (action), and the ground pushes you forward (reaction).\n• **Swimming:** A swimmer pushes water backward with their hands (action), and the water propels the swimmer forward (reaction).\n• **Recoil of a Gun:** When a bullet is fired forward (action), the gun jerks backward (reaction).`,
        sources: ['CASPA Physics Curriculum Engine', 'Classical Mechanics Module'],
        isAiGenerated: true,
        suggestedActions: role === 'STUDENT'
          ? [
              { label: 'Open Study Materials', actionId: 'NAV_MATERIALS' },
              { label: 'Check Homework Deadlines', actionId: 'NAV_TASKS' },
            ]
          : getSuggestedActionsForRole(role),
      };
    }
    if (q.includes('first') || q.includes('1st') || q.includes('inertia')) {
      return {
        answer: `**Newton's First Law of Motion (Law of Inertia)**\n\n**Statement:**\n"An object at rest remains at rest, and an object in motion continues to move at a constant velocity in a straight line, unless acted upon by a net external unbalanced force."\n\n**Key Concept — Inertia:**\nInertia is the natural tendency of an object to resist any change in its state of rest or uniform motion. Mass is the quantitative measure of inertia.\n\n**Real-Life Examples:**\n• Passengers jerk forward when a moving bus stops suddenly (inertia of motion).\n• A coin placed on a card over a glass falls straight into the glass when the card is flicked away rapidly (inertia of rest).`,
        sources: ['CASPA Physics Curriculum Engine', 'Classical Mechanics Module'],
        isAiGenerated: true,
        suggestedActions: getSuggestedActionsForRole(role),
      };
    }
    if (q.includes('second') || q.includes('2nd')) {
      return {
        answer: `**Newton's Second Law of Motion**\n\n**Statement:**\n"The rate of change of momentum of an object is directly proportional to the net external force applied, and this change takes place in the direction of the applied force."\n\n**Mathematical Formula:**\n$$F = m \\cdot a$$\nWhere:\n• $F$ = Net external force (in Newtons, $\\text{N}$)\n• $m$ = Mass of the object (in $\\text{kg}$)\n• $a$ = Acceleration produced (in $\\text{m/s}^2$)\n\n**Real-Life Example:**\nA cricketer pulls their hands backward while catching a fast-moving ball to increase the time of impact ($\\Delta t$), which reduces the force ($F = \\Delta p / \\Delta t$) on their hands.`,
        sources: ['CASPA Physics Curriculum Engine', 'Classical Mechanics Module'],
        isAiGenerated: true,
        suggestedActions: getSuggestedActionsForRole(role),
      };
    }
    return {
      answer: `**Newton's Three Laws of Motion Summary:**\n\n1. **First Law (Law of Inertia):** An object stays at rest or in uniform motion unless acted upon by a net external force.\n2. **Second Law ($F = ma$):** Force equals mass times acceleration; the rate of change of momentum is proportional to applied force.\n3. **Third Law (Action & Reaction):** For every action, there is an equal and opposite reaction ($F_{AB} = -F_{BA}$).\n\nWould you like numerical practice problems on any of these laws, ${firstName}?`,
      sources: ['CASPA Physics Curriculum Engine'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole(role),
    };
  }

  // Lenz's Law / Faraday's Law / Electromagnetic Induction
  if (q.includes('lenz') || q.includes('faraday') || q.includes('electromagnetic induction')) {
    return {
      answer: `**Lenz's Law & Electromagnetic Induction**\n\n**Statement of Lenz's Law:**\n"The direction of the induced electric current in a conductor by a changing magnetic field is such that the magnetic field created by the induced current **opposes** the initial changing magnetic field which produced it."\n\n**Formula (Faraday-Lenz Law):**\n$$\\mathcal{E} = -N \\frac{\\Delta \\Phi_B}{\\Delta t}$$\n*(The negative sign $-$ represents Lenz's Law — opposition to the change in magnetic flux $\\Phi_B$.)*\n\n**Real-Life Analogy:**\nThink of Lenz's Law like **climate-control inertia** or a **stubborn roommate**:\n• If you try to push a North pole of a magnet *toward* a coil, the coil acts like a North pole to **push you back**.\n• If you try to pull the North pole *away*, the coil switches to a South pole to **pull it back**!\n• Just like conservation of energy, nature resists sudden changes — you have to do mechanical work against this opposition, and that mechanical work is converted into electrical energy!`,
      sources: ['Grade 10/12 Physics Syllabus', 'Electromagnetism Module'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole(role),
    };
  }

  // Quadratic Equations / Practice Problems
  if (q.includes('quadratic') || q.includes('practice problem') || q.includes('algebra')) {
    return {
      answer: `**Quadratic Equations — Formula & 3 Practice Problems**\n\n**Standard Form:** $ax^2 + bx + c = 0$ (where $a \\neq 0$)\n**Quadratic Formula:** $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\n\n---\n**Problem 1 (Factoring Method):**\nSolve: $x^2 - 7x + 12 = 0$\n• **Solution:** Find two numbers that multiply to $+12$ and add to $-7$ $\\rightarrow$ $(-3)$ and $(-4)$.\n• $(x - 3)(x - 4) = 0 \\implies \\mathbf{x = 3}$ or $\\mathbf{x = 4}$.\n\n**Problem 2 (Quadratic Formula):**\nSolve: $2x^2 + 5x - 3 = 0$\n• **Solution:** Here $a = 2, b = 5, c = -3$.\n• Discriminant $D = b^2 - 4ac = 25 - 4(2)(-3) = 49$.\n• $x = \\frac{-5 \\pm \\sqrt{49}}{4} = \\frac{-5 \\pm 7}{4} \\implies \\mathbf{x = \\frac{1}{2}}$ or $\\mathbf{x = -3}$.\n\n**Problem 3 (Word Problem — Geometry):**\nThe length of a rectangular hall is $5\\text{ m}$ more than its width. If the area is $84\\text{ m}^2$, find its dimensions.\n• **Solution:** Let width $= w$, length $= w + 5$.\n• $w(w + 5) = 84 \\implies w^2 + 5w - 84 = 0 \\implies (w + 12)(w - 7) = 0$.\n• Width $\\mathbf{w = 7\\text{ m}}$, Length $\\mathbf{= 12\\text{ m}}$.`,
      sources: ['CASPA Mathematics Problem Bank', 'Algebra Curriculum'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole(role),
    };
  }

  // Ohm's Law / Electricity
  if (q.includes('ohm') || q.includes('voltage') || q.includes('resistance')) {
    return {
      answer: `**Ohm's Law**\n\n**Statement:**\nAt constant temperature, the electric current ($I$) flowing through a metallic conductor is directly proportional to the potential difference ($V$) across its ends.\n\n**Formula:**\n$$V = I \\times R$$\n• $V$ = Voltage / Potential Difference (Volts, $\\text{V}$)\n• $I$ = Current (Amperes, $\\text{A}$)\n• $R$ = Resistance (Ohms, $\\Omega$)\n\n**Example:** If a $12\\text{ V}$ battery is connected across a $4\\text{ }\\Omega$ resistor, the current is $I = V / R = 12 / 4 = 3\\text{ A}$.`,
      sources: ['CASPA Physics Curriculum Engine'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole(role),
    };
  }

  // Photosynthesis / Biology
  if (q.includes('photosynthesis') || q.includes('chlorophyll') || q.includes('mitosis') || q.includes('cell')) {
    return {
      answer: `**Photosynthesis — Process & Chemical Equation**\n\n**Definition:**\nPhotosynthesis is the biochemical process by which green plants, algae, and certain bacteria convert light energy from the sun into chemical energy (glucose) using carbon dioxide and water in the presence of chlorophyll.\n\n**Balanced Chemical Equation:**\n$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{Sunlight, Chlorophyll}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$$\n\n**Two Main Stages:**\n1. **Light-Dependent Reactions (in Thylakoid membranes):** Sunlight splits water ($\\text{H}_2\\text{O}$) to release $\\text{O}_2$ and generate ATP & NADPH.\n2. **Calvin Cycle / Light-Independent Reactions (in Stroma):** Uses ATP, NADPH, and $\\text{CO}_2$ to synthesize glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$).`,
      sources: ['CASPA Biology & Life Sciences Engine'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole(role),
    };
  }

  // Trigonometry / Pythagoras / Calculus
  if (q.includes('trigonometry') || q.includes('pythagoras') || q.includes('derivative') || q.includes('calculus')) {
    return {
      answer: `**Core Mathematics Quick Reference (${firstName}):**\n\n• **Pythagorean Theorem:** $a^2 + b^2 = c^2$ (for a right-angled triangle with hypotenuse $c$)\n• **Primary Trigonometric Ratios:**\n  - $\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$\n  - $\\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$\n  - $\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}} = \\frac{\\sin(\\theta)}{\\cos(\\theta)}$\n• **Fundamental Identity:** $\\sin^2(\\theta) + \\cos^2(\\theta) = 1$\n• **Power Rule (Calculus):** $\\frac{d}{dx}[x^n] = n \\cdot x^{n-1}$`,
      sources: ['CASPA Mathematics Curriculum Engine'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole(role),
    };
  }

  // ============================================================================
  // 2. ROLE-SCOPED SCHOOL ERP & PORTAL QUERIES
  // ============================================================================

  if (role === 'STUDENT') {
    if (q.includes('homework') || q.includes('task') || q.includes('assignment') || q.includes('due')) {
      const pending = db.studentTasks.filter((t) => t.status === 'PENDING');
      const taskLines = pending.length > 0
        ? pending.map((t) => `• **${t.subject}**: ${t.title} *(Due: ${t.dueDate})*`).join('\n')
        : '• All assigned homework tasks are currently completed!';

      return {
        answer: `Hi **${displayName}**! Here are your homework assignments and academic tasks due this week:\n\n${taskLines}\n\n**Study Tip:** You can click **Check Homework Deadlines** below to submit your work or ask me to explain any topic from your assignments!`,
        sources: ['CASPA Student LMS', 'Homework & Assignment Tracker'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Check Homework Deadlines', actionId: 'NAV_TASKS' },
          { label: 'Open Study Materials', actionId: 'NAV_MATERIALS' },
        ],
      };
    }

    if (q.includes('timetable') || q.includes('schedule') || q.includes('next class') || q.includes('period')) {
      const periodLines = db.studentPeriods
        .slice(0, 5)
        .map((p) => `• **${p.timeRange}** — ${p.subject} (${p.room}) with ${p.teacher} [${p.status}]`)
        .join('\n');

      return {
        answer: `Hi **${displayName}**! Here is your class schedule for today:\n\n${periodLines}\n\nMake sure to carry your lab manual and notes for your upcoming sessions!`,
        sources: ['Central Timetable Scheduler'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'View Class Timetable', actionId: 'NAV_TIMETABLE' },
        ],
      };
    }

    if (q.includes('attendance') || q.includes('present') || q.includes('absent')) {
      return {
        answer: `**Attendance Summary for ${displayName}:**\n• **Overall Attendance Rate:** 96.2% (Above the 90% school benchmark)\n• **Days Present (This Month):** 19 / 22 days\n• **Late Arrivals:** 2\n• **Excused Absences:** 1`,
        sources: ['Student Attendance Ledger'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'View Attendance Calendar', actionId: 'NAV_ATTENDANCE' },
        ],
      };
    }

    if (q.includes('bus') || q.includes('transport') || q.includes('eta') || q.includes('route')) {
      const bus = db.buses[0];
      return {
        answer: `**Live School Bus Update for ${displayName}:**\n• **Assigned Bus:** ${bus?.routeNumber || 'Route #4'} (${bus?.busNumber || 'Bus #4'})\n• **Driver:** ${bus?.driverName || 'Mr. Davis'}\n• **Current Status:** ${bus?.status || 'ON_ROUTE'} — Next stop: ${bus?.nextStop || 'Oak St & 4th Ave'}\n• **Estimated Arrival (ETA):** ${bus?.etaMinutes || 6} minutes`,
        sources: ['CASPA Fleet GPS Telemetry'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Track School Bus Live', actionId: 'NAV_TRANSPORT' },
        ],
      };
    }

    const nextPeriod = db.studentPeriods.find((p) => p.status === 'LIVE_NOW' || p.status === 'UPCOMING');

    // Default helpful response for any other Student question
    return {
      answer: `Hello **${displayName}**! Regarding your question on **"${query}"**:\n\nHere is a structured study & portal breakdown for you:\n1. **Key Concept Summary:** Break the topic into core definitions, governing equations/rules, and real-world applications for maximum exam retention.\n2. **Your Active Portal Status:**\n   • **Attendance:** 96.2% (Optimal standing)\n   • **Pending Homework:** ${db.studentTasks.filter((t) => t.status === 'PENDING').length} tasks due this week\n   • **Next Scheduled Class:** ${nextPeriod?.subject || 'Mathematics'} (${nextPeriod?.timeRange || '10:30 AM'})\n\nTry asking me specific subject questions (e.g., *"Explain Newton's Third Law"*, *"Explain Lenz's Law"*, *"Solve Quadratic Equations"*, *"Explain Photosynthesis"*) or ask about your homework, timetable, or bus ETA!`,
      sources: ['CASPA Student Knowledge Base', 'Academic Tutor Engine'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('STUDENT'),
    };
  }

  if (role === 'PARENT') {
    return {
      answer: `Good day, **${displayName}**! Here is your child's real-time school summary:\n• **Attendance Today:** Present (checked in at 07:52 AM)\n• **Bus Telemetry:** Route #07 (Bus KA-01-AB-4421) is ON ROUTE — ETA 8 mins to Green Valley Gate 2.\n• **Fee Status:** ₹80,500 Paid; ₹14,500 Term 3 installment due by 15 Mar 2025.\n• **Recent Academic Standing:** 94.2% Term Aggregate (Rank #3 in Class 10-B).`,
      sources: ['Student Information System', 'Fleet GPS Telemetry', 'Accounts Ledger'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('PARENT'),
    };
  }

  if (role === 'TEACHER') {
    if (q.includes('quiz') || q.includes('question') || q.includes('test')) {
      return {
        answer: `**5-Question Pop-Quiz on Electromagnetic Induction (Prepared for ${displayName}):**\n\n1. State Faraday's First and Second Laws of Electromagnetic Induction.\n2. Explain how Lenz's Law is a direct consequence of the Law of Conservation of Energy.\n3. Differentiate between a Step-Up and Step-Down transformer based on turns ratio ($N_s / N_p$).\n4. Give two practical applications of Eddy Currents in modern engineering.\n5. **Numerical:** A coil of 50 turns experiences a magnetic flux change of $0.2\\text{ Wb}$ in $0.05\\text{ s}$. Calculate the induced EMF ($\\mathcal{E} = 200\\text{ V}$).`,
        sources: ['Curriculum Standard Grade 10/12', 'Physics Syllabus Matrix'],
        isAiGenerated: true,
        requiresReview: true,
        suggestedActions: getSuggestedActionsForRole('TEACHER'),
      };
    }
    return {
      answer: `Good day, **${displayName}**! Here is your teaching & class summary:\n• **Assigned Classes Today:** ${db.teacherClasses.length} sessions\n• **Total Enrolled Students:** 187 across sections\n• **Homework Pending Grading:** 12 submissions\n• **Students Flagged for Follow-up:** Marcus Brody (Missed HW), Sophia Chen (Attendance 68%)`,
      sources: ['Daily Class Roster', 'Teacher Timetable'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('TEACHER'),
    };
  }

  if (role === 'VICE_PRINCIPAL') {
    return {
      answer: `**Vice Principal Academic & Scheduling Summary for ${displayName}:**\n• **Active Scheduling Conflicts:** 3 timetable clashes flagged for resolution\n• **Teacher Coverage Today:** 64 / 68 Present (3 on approved leave, 1 substitute pending)\n• **Lesson Plans Pending Review:** 8 submissions awaiting VP sign-off\n• **Upcoming Exam Readiness:** Mid-Term Invigilation Roster 92% complete.`,
      sources: ['VP Academic Operations Engine', 'Master Timetable Matrix'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('VICE_PRINCIPAL'),
    };
  }

  // PRINCIPAL, ADMIN, SAFETY_OFFICER
  if (q.includes('alert') || q.includes('safety') || q.includes('incident') || q.includes('ragging')) {
    return {
      answer: `**CASPA Safeguarding & Safety Briefing for ${displayName}:**\n• **Active Cases:** 3 logged in Central Campus.\n• **Case #SAFE-2026-09 [CRITICAL]:** Cyber-bullying report in Grade 9 — IT & Counselling Committee investigation in progress.\n• **Case #SAFE-2026-14 [HIGH]:** Bus #4 GPS Deviation Alert — Transport Manager verifying route log.\n• **Statutory Compliance:** 92% documentation complete; annual audit due in 14 days.`,
      sources: ['Confidential Safeguarding Module', 'Anti-Ragging Committee Register'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole(role),
    };
  }

  return {
    answer: `**CASPA Executive Intelligence Report for ${displayName}:**\n• **Attendance:** Student attendance is at **${metrics.kpis.attendanceTodayPercent}%** today; staff presence is **${metrics.kpis.staffAttendancePercent}%**.\n• **Fleet Operations:** ${db.buses.filter((b) => b.status === 'ON_ROUTE').length} of ${db.buses.length} buses active on GPS tracking.\n• **Pending Executive Approvals:** ${metrics.pendingApprovalsCount} items awaiting authorization.\n• **Fee Collection Velocity:** ₹18.2L collected MTD (87% of monthly target).`,
    sources: ['School Enterprise Telemetry Engine', 'Financial Accounts Ledger', 'GPS Transit Matrix'],
    isAiGenerated: true,
    suggestedActions: getSuggestedActionsForRole(role),
  };
}
