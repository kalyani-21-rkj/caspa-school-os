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
  if (role === 'PRINCIPAL' || role === 'SUPER_ADMIN') {
    return [
      { label: 'Review Urgent Approvals', actionId: 'NAV_APPROVALS' },
      { label: 'View Safeguarding Log', actionId: 'NAV_SAFETY' },
      { label: 'Inspect Campus Operations', actionId: 'NAV_OPERATIONS' },
      { label: 'Open Finance Ledger', actionId: 'NAV_FINANCE' },
    ];
  }
  if (role === 'ADMIN') {
    return [
      { label: 'Pending Approvals', actionId: 'NAV_APPROVALS' },
      { label: 'Safety SLA Desk', actionId: 'NAV_SAFETY' },
      { label: 'Fee Invoices & Billing', actionId: 'NAV_FINANCE' },
      { label: 'Fleet GPS Radar', actionId: 'NAV_TRANSPORT' },
    ];
  }
  if (role === 'VICE_PRINCIPAL') {
    return [
      { label: 'Inspect Timetable Conflicts', actionId: 'NAV_TIMETABLE' },
      { label: 'Review Lesson Plans', actionId: 'NAV_LESSON_PLANS' },
      { label: 'Examinations & Results', actionId: 'NAV_EXAMINATIONS' },
      { label: 'Academic Analytics', actionId: 'NAV_ACADEMICS' },
    ];
  }
  if (role === 'TEACHER') {
    return [
      { label: 'One-Tap Attendance', actionId: 'NAV_ATTENDANCE' },
      { label: 'Generate Pop Quiz', actionId: 'ACTION_QUIZ' },
      { label: 'Review Class Marks', actionId: 'NAV_MARKS' },
      { label: 'Parent Messages', actionId: 'NAV_COMMS' },
    ];
  }
  if (role === 'STUDENT') {
    return [
      { label: 'View Class Timetable', actionId: 'NAV_TIMETABLE' },
      { label: 'Check Homework Deadlines', actionId: 'NAV_TASKS' },
      { label: 'Open Study Materials', actionId: 'NAV_MATERIALS' },
      { label: 'Track School Bus', actionId: 'NAV_BUS' },
    ];
  }
  if (role === 'PARENT') {
    return [
      { label: 'Track School Bus Live', actionId: 'NAV_BUS' },
      { label: 'View Fee Invoices', actionId: 'NAV_FEES' },
      { label: 'Check Attendance Log', actionId: 'NAV_ATTENDANCE' },
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
  const displayName =
    userName ||
    db.currentUser?.fullName ||
    (role === 'STUDENT'
      ? 'Student'
      : role === 'TEACHER'
      ? 'Teacher'
      : role === 'PRINCIPAL'
      ? 'Principal'
      : role === 'VICE_PRINCIPAL'
      ? 'Vice Principal'
      : role === 'PARENT'
      ? 'Parent'
      : 'Administrator');
  const firstName = displayName.split(' ')[0];
  const metrics = db.getDashboardMetrics();

  // ============================================================================
  // 1. UNIVERSAL ACADEMIC & STEM TUTOR QUERIES (Physics, Math, Chemistry, Bio, English)
  //    (Skip direct student-style answer only if Teacher explicitly asks for a Quiz or Rubric)
  // ============================================================================
  const isTeacherQuizOrRubricRequest =
    role === 'TEACHER' &&
    (q.includes('quiz') || q.includes('rubric') || q.includes('lesson plan') || q.includes('draft'));

  if (!isTeacherQuizOrRubricRequest) {
    // Newton's Laws of Motion
    if (q.includes('newton')) {
      if (q.includes('third') || q.includes('3rd') || q.includes('3')) {
        return {
          answer: `**Newton's Third Law of Motion**\n\n**Statement:**\n"For every action, there is an equal and opposite reaction."\n\n**Mathematical Form:**\n$$\\vec{F}_{AB} = -\\vec{F}_{BA}$$\n*(If object A exerts a force $\\vec{F}_{AB}$ on object B, then object B simultaneously exerts a force $\\vec{F}_{BA}$ of equal magnitude and opposite direction on object A.)*\n\n**Key Points to Remember:**\n1. Action and reaction forces always act on **two different bodies**, so they never cancel each other out.\n2. Both forces occur **simultaneously** and are of the same nature.\n\n**Real-Life Examples:**\n• **Rocket Propulsion:** A rocket expels hot exhaust gases downward (action), and the gases push the rocket upward with equal force (reaction).\n• **Walking:** Your foot pushes the ground backward (action), and the ground pushes you forward (reaction).\n• **Swimming:** A swimmer pushes water backward with their hands (action), and the water propels the swimmer forward (reaction).\n• **Recoil of a Gun:** When a bullet is fired forward (action), the gun jerks backward (reaction).`,
          sources: ['CASPA Physics Curriculum Engine', 'Classical Mechanics Module'],
          isAiGenerated: true,
          suggestedActions: getSuggestedActionsForRole(role),
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

    // Thermodynamics / Carnot
    if (q.includes('thermodynamic') || q.includes('carnot') || q.includes('entropy')) {
      return {
        answer: `**Thermodynamics & Carnot Engine Summary**\n\n• **First Law of Thermodynamics (Conservation of Energy):**\n  $$\\Delta U = Q - W$$\n  *(Change in internal energy $\\Delta U$ equals heat added $Q$ minus work done by the system $W$.)*\n• **Second Law of Thermodynamics:** Heat cannot spontaneously flow from a colder body to a hotter body without external work.\n• **Carnot Engine Efficiency:**\n  $$\\eta_{\\max} = 1 - \\frac{T_C}{T_H}$$\n  *(Temperatures $T_C$ and $T_H$ must be in Kelvin $\\text{K}$.)*`,
        sources: ['AP Physics Unit 4 Syllabus', 'Thermodynamics Module'],
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
  }

  // ============================================================================
  // 2. STUDENT MODULE INTELLIGENCE
  // ============================================================================
  if (role === 'STUDENT') {
    if (q.includes('homework') || q.includes('task') || q.includes('assignment') || q.includes('due')) {
      const pending = db.studentTasks.filter((t) => t.status === 'PENDING');
      const taskLines =
        pending.length > 0
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
        suggestedActions: [{ label: 'View Class Timetable', actionId: 'NAV_TIMETABLE' }],
      };
    }

    if (q.includes('attendance') || q.includes('present') || q.includes('absent')) {
      return {
        answer: `**Attendance Summary for ${displayName}:**\n• **Overall Attendance Rate:** 96.2% (Above the 90% school benchmark)\n• **Days Present (This Month):** 19 / 22 days\n• **Late Arrivals:** 2\n• **Excused Absences:** 1`,
        sources: ['Student Attendance Ledger'],
        isAiGenerated: true,
        suggestedActions: [{ label: 'View Attendance Calendar', actionId: 'NAV_ATTENDANCE' }],
      };
    }

    if (q.includes('bus') || q.includes('transport') || q.includes('eta') || q.includes('route')) {
      const bus = db.buses[0];
      return {
        answer: `**Live School Bus Update for ${displayName}:**\n• **Assigned Bus:** ${bus?.routeNumber || 'Route #12'} (${bus?.busNumber || 'KA-01-EA-4921'})\n• **Driver:** ${bus?.driverName || 'Mr. Manjunath'}\n• **Current Status:** ${bus?.status || 'ON_ROUTE'} — Next stop: ${bus?.nextStop || 'Silver Oak Gate'}\n• **Estimated Arrival (ETA):** ${bus?.etaMinutes || 14} minutes`,
        sources: ['CASPA Fleet GPS Telemetry'],
        isAiGenerated: true,
        suggestedActions: [{ label: 'Track School Bus Live', actionId: 'NAV_BUS' }],
      };
    }

    if (q.includes('mark') || q.includes('grade') || q.includes('score') || q.includes('gpa') || q.includes('rank') || q.includes('achievement')) {
      return {
        answer: `**Academic Scorecard & Achievements for ${displayName}:**\n• **Cumulative GPA:** 3.90 / 4.00 (Rank #2 in Section — Distinction)\n• **Recent Subject Scores:**\n  - **Mathematics:** 98 / 100 (Grade A+)\n  - **English Literature:** 96 / 100 (Grade A+)\n  - **AP Physics:** 94 / 100 (Grade A)\n  - **Chemistry Honors:** 91 / 100 (Grade A)\n• **Featured Achievement:** ${db.studentAchievements[0]?.title || 'National Science Olympiad Gold Medalist'}`,
        sources: ['Student Examination Registry', 'Honors & Achievements Ledger'],
        isAiGenerated: true,
        suggestedActions: [{ label: 'View Marks & Achievements', actionId: 'NAV_MARKS' }],
      };
    }

    const nextPeriod = db.studentPeriods.find((p) => p.status === 'LIVE_NOW' || p.status === 'UPCOMING');
    return {
      answer: `Hello **${displayName}**! Regarding your question on **"${query}"**:\n\nHere is a structured study & portal breakdown for you:\n1. **Key Concept Summary:** Break the topic into core definitions, governing equations/rules, and real-world applications for maximum exam retention.\n2. **Your Active Portal Status:**\n   • **Attendance:** 96.2% (Optimal standing)\n   • **Pending Homework:** ${db.studentTasks.filter((t) => t.status === 'PENDING').length} tasks due this week\n   • **Next Scheduled Class:** ${nextPeriod?.subject || 'Mathematics'} (${nextPeriod?.timeRange || '10:15 AM'})\n\nTry asking me specific subject questions (e.g., *"Explain Newton's Third Law"*, *"Explain Lenz's Law"*, *"Solve Quadratic Equations"*, *"Explain Photosynthesis"*) or ask about your homework, timetable, marks, or bus ETA!`,
      sources: ['CASPA Student Knowledge Base', 'Academic Tutor Engine'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('STUDENT'),
    };
  }

  // ============================================================================
  // 3. TEACHER MODULE INTELLIGENCE
  // ============================================================================
  if (role === 'TEACHER') {
    // A. Pop Quiz / Question Paper Generation
    if (q.includes('quiz') || q.includes('question') || q.includes('test') || q.includes('electromagnetic')) {
      if (q.includes('quadratic') || q.includes('factor') || q.includes('math') || q.includes('algebra')) {
        return {
          answer: `**5-Question Pop-Quiz: Quadratic Equations & Factorization (Prepared for ${displayName})**\n\n**Q1.** Factorize completely and find the roots of $2x^2 + 7x + 3 = 0$.\n• *Answer Key:* $(2x + 1)(x + 3) = 0 \\implies x = -\\frac{1}{2}, -3$.\n\n**Q2.** Determine the nature of roots for $3x^2 - 4\\sqrt{3}x + 4 = 0$ using the discriminant.\n• *Answer Key:* $D = b^2 - 4ac = 48 - 48 = 0$ (Real and equal roots: $x = \\frac{2}{\\sqrt{3}}$).\n\n**Q3.** Solve using the Quadratic Formula: $x^2 - 4x - 5 = 0$.\n• *Answer Key:* $x = 5$ or $x = -1$.\n\n**Q4.** Find the value of $k$ for which $x^2 + kx + 9 = 0$ has equal roots.\n• *Answer Key:* $k^2 - 36 = 0 \\implies k = \\pm 6$.\n\n**Q5. (Application):** A ball is thrown vertically upward with height $h(t) = -5t^2 + 20t + 2$. Find the maximum height reached.\n• *Answer Key:* Vertex at $t = -b / 2a = 2\\text{ s} \\implies h_{\\max} = 22\\text{ m}$.`,
          sources: ['Grade 9/10 Mathematics Curriculum', 'CASPA Assessment Generator'],
          isAiGenerated: true,
          requiresReview: true,
          suggestedActions: [
            { label: 'Publish to Tasks & Homework', actionId: 'NAV_TASKS' },
            { label: 'Open Gradebook', actionId: 'NAV_MARKS' },
          ],
        };
      }

      return {
        answer: `**5-Question Pop-Quiz on Electromagnetic Induction with Answer Key (Prepared for ${displayName}):**\n\n**Q1.** State Faraday's First and Second Laws of Electromagnetic Induction.\n• *Answer Key:* (1) Whenever magnetic flux linked with a circuit changes, an EMF is induced. (2) The magnitude of induced EMF is directly proportional to the rate of change of magnetic flux ($\\mathcal{E} = -N \\Delta\\Phi_B / \\Delta t$).\n\n**Q2.** Explain how Lenz's Law is a direct consequence of the Law of Conservation of Energy.\n• *Answer Key:* Mechanical work done against the opposing magnetic pole is converted into electrical energy ($I^2Rt$).\n\n**Q3.** Differentiate between a Step-Up and Step-Down transformer based on turns ratio ($N_s / N_p$).\n• *Answer Key:* Step-Up has $N_s > N_p$ (increases voltage, decreases current); Step-Down has $N_s < N_p$ (decreases voltage, increases current).\n\n**Q4.** Give two practical engineering applications of Eddy Currents.\n• *Answer Key:* Electromagnetic braking in high-speed trains and induction furnaces.\n\n**Q5. (Numerical):** A coil of $50$ turns experiences a magnetic flux change of $0.2\\text{ Wb}$ in $0.05\\text{ s}$. Calculate the induced EMF.\n• *Answer Key:* $\\mathcal{E} = 50 \\times (0.2 / 0.05) = \\mathbf{200\\text{ V}}$.`,
        sources: ['Curriculum Standard Grade 10/12', 'Physics Syllabus Matrix'],
        isAiGenerated: true,
        requiresReview: true,
        suggestedActions: [
          { label: 'Publish to Tasks & Homework', actionId: 'NAV_TASKS' },
          { label: 'Review Class Marks', actionId: 'NAV_MARKS' },
        ],
      };
    }

    // B. Attendance below 90% / At-Risk Students
    if (q.includes('attendance') || q.includes('90%') || q.includes('absent') || q.includes('late') || q.includes('alert') || q.includes('flag') || q.includes('weak')) {
      const lowAttStudents = db.students.filter((s) => s.attendancePercentage < 90);
      const rosterSummary =
        lowAttStudents.length > 0
          ? lowAttStudents
              .map(
                (s) =>
                  `• **${s.fullName}** (${s.grade}-${s.section}, Roll #${s.rollNo}) — **${s.attendancePercentage}% Attendance** *(Parent: ${s.parentName}, ${s.parentPhone})*`
              )
              .join('\n')
          : '• **Sophia Chen** (Grade 9-B, Roll #12) — **68.0% Attendance** *(Action: Send Parent Note)*\n• **Marcus Brody** (Grade 9-B, Roll #04) — **84.5% Attendance** *(Missed 2 Homework Sets)*\n• **Devon Patel** (Grade 10-A, Roll #19) — **88.2% Attendance** *(Missed Unit Quiz)*';

      return {
        answer: `**Attendance & Early-Intervention Roster for ${displayName}:**\n\n**Students Currently Below the 90% Attendance Benchmark:**\n${rosterSummary}\n• **Sophia Chen (Grade 9B):** 68% attendance — flagged for immediate guardian follow-up.\n• **Marcus Brody (Grade 9B):** 84% attendance — also has 2 consecutive missed homework submissions.\n\n**Today's Section Roll Call Status:**\n• **Present:** ${db.teacherStudents.filter((s) => s.attendanceStatus === 'PRESENT').length} students\n• **Absent:** ${db.teacherStudents.filter((s) => s.attendanceStatus === 'ABSENT').length} students\n• **Late:** ${db.teacherStudents.filter((s) => s.attendanceStatus === 'LATE').length} students\n\nWould you like me to draft an automated attendance advisory note to their parents via the Parent Comms Hub?`,
        sources: ['Daily Class Attendance Register', 'CASPA Early Warning System'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'One-Tap Attendance', actionId: 'NAV_ATTENDANCE' },
          { label: 'Message Parents', actionId: 'NAV_COMMS' },
        ],
      };
    }

    // C. Formative Assessment Rubric / Essay / Grading
    if (q.includes('rubric') || q.includes('shakespeare') || q.includes('essay') || q.includes('grade') || q.includes('mark') || q.includes('assessment')) {
      return {
        answer: `**Formative Assessment Rubric: Literary & Critical Essay (100 Points — Prepared for ${displayName})**\n\n**1. Thesis & Critical Argument (30 Points)**\n• **Distinction (26–30 pts):** Original, insightful thesis analyzing character motivation and thematic complexity.\n• **Proficient (20–25 pts):** Clear thesis statement with consistent focus throughout the essay.\n• **Developing (0–19 pts):** Thesis is overly broad, descriptive rather than analytical, or unclear.\n\n**2. Textual Evidence & Close Reading (30 Points)**\n• **Distinction (26–30 pts):** Seamlessly integrates direct quotations, soliloquy analysis, and literary devices (metaphor, dramatic irony).\n• **Proficient (20–25 pts):** Relevant quotes included with adequate explanation.\n• **Developing (0–19 pts):** Limited textual evidence or quotes dropped without context.\n\n**3. Organization & Paragraph Coherence (20 Points)**\n• **Distinction (18–20 pts):** Logical progression of topic sentences, smooth transitions, and compelling conclusion.\n• **Proficient (14–17 pts):** Clear intro, body, and conclusion structure.\n\n**4. Academic Style, Vocabulary & MLA Mechanics (20 Points)**\n• **Distinction (18–20 pts):** Precise academic diction, zero grammatical errors, accurate act/scene/line citations (e.g., *Hamlet* 3.1.56–60).`,
        sources: ['CASPA Pedagogy & Rubric Engine', 'Academic Grading Standards'],
        isAiGenerated: true,
        requiresReview: true,
        suggestedActions: [
          { label: 'Review Class Marks', actionId: 'NAV_MARKS' },
          { label: 'Create Assignment', actionId: 'NAV_TASKS' },
        ],
      };
    }

    // D. Lesson Plan / Timetable / Classes
    if (q.includes('lesson') || q.includes('plan') || q.includes('class') || q.includes('timetable') || q.includes('schedule')) {
      const classLines = db.teacherClasses
        .map((c) => `• **${c.timeRange}** — ${c.subject} (${c.grade} ${c.section}, ${c.room}) • Topic: *${c.topic || 'Core Syllabus Unit'}*`)
        .join('\n');

      return {
        answer: `**Teaching Schedule & Lesson Blueprint for ${displayName}:**\n\n**Today's Assigned Classes (${db.teacherClasses.length} Sessions):**\n${classLines}\n\n**45-Minute Structured Lesson Plan Template:**\n• **00–08 mins (Hook & Recap):** Quick 2-question warm-up connecting previous concepts.\n• **08–25 mins (Direct Instruction):** Core derivation, worked board examples, and visual demonstration.\n• **25–38 mins (Guided Collaborative Practice):** Pair problem-solving with differentiated difficulty tiers.\n• **38–45 mins (Exit Ticket & Homework):** 3-minute formative check to verify mastery before dismissal.`,
        sources: ['Teacher Timetable Matrix', 'VP Curriculum Blueprint'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'View My Classes', actionId: 'NAV_CLASSES' },
          { label: 'One-Tap Attendance', actionId: 'NAV_ATTENDANCE' },
        ],
      };
    }

    // E. Parent Communication / Homework
    if (q.includes('parent') || q.includes('message') || q.includes('comms') || q.includes('homework') || q.includes('task')) {
      const taskSummary = db.teacherTasks
        .map((t) => `• **${t.title}** (${t.gradeSection}) — ${t.submittedCount}/${t.totalCount} submitted [${t.status}]`)
        .join('\n');

      return {
        answer: `**Homework Submissions & Parent Comms Summary for ${displayName}:**\n\n**Active Tasks & Submission Velocity:**\n${taskSummary}\n\n**Unread Parent Messages (${db.parentMessages.filter((m) => !m.isRead).length}):**\n${db.parentMessages.map((m) => `• **${m.parentName}** (Ward: ${m.studentName}, ${m.gradeSection}): *"${m.snippet}"*`).join('\n')}`,
        sources: ['Teacher Task Tracker', 'Parent Communication Hub'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Open Tasks & Homework', actionId: 'NAV_TASKS' },
          { label: 'Reply to Parents', actionId: 'NAV_COMMS' },
        ],
      };
    }

    // Default Comprehensive Teacher Response
    return {
      answer: `Good day, **${displayName}**! Regarding your query on **"${query}"**:\n\n**1. Classroom & Pedagogical Synthesis:**\n• **Assigned Sessions Today:** ${db.teacherClasses.length} periods (${db.teacherClasses[0]?.subject || 'Mathematics'} — ${db.teacherClasses[0]?.grade || 'Grade 9B'} next in ${db.teacherClasses[0]?.room || 'Room 204'}).\n• **Active Homework & Grading:** ${db.teacherTasks.length} published tasks (${db.teacherTasks.reduce((acc, t) => acc + (t.totalCount - t.submittedCount), 0)} student submissions pending review).\n• **Priority Student Alerts:**\n  - **Marcus Brody (Grade 9B):** Missed 2 homework sets — schedule remedial check-in.\n  - **Sophia Chen (Grade 9B):** Attendance at 68% — parent notification recommended.\n  - **Devon Patel (Grade 10A):** Missed unit quiz — makeup slot required.\n\n**Quick AI Capabilities:** Ask me to *"Draft a 5-question pop quiz"*, *"List students with attendance below 90%"*, *"Create a grading rubric"*, or *"Summarize parent messages"*!`,
      sources: ['Daily Class Roster', 'Teacher Timetable', 'CASPA Faculty Copilot'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('TEACHER'),
    };
  }

  // ============================================================================
  // 4. VICE PRINCIPAL MODULE INTELLIGENCE
  // ============================================================================
  if (role === 'VICE_PRINCIPAL') {
    // A. Timetable Conflicts & Substitute Allocation
    if (q.includes('conflict') || q.includes('timetable') || q.includes('clash') || q.includes('substitute') || q.includes('coverage') || q.includes('lab') || q.includes('room')) {
      const activeConflicts = db.vpConflicts.filter((c) => c.status === 'ACTIVE');
      const conflictLines =
        activeConflicts.length > 0
          ? activeConflicts
              .map(
                (c, idx) =>
                  `${idx + 1}. **${c.title}** [${c.severity}] — *${c.period}*\n   • **Issue:** ${c.description}\n   • **AI Recommended Resolution:** ${
                    c.id === 'conf-1'
                      ? 'Relocate Grade 12 Chemistry Practical to **Chemistry Lab 2 (Annex)**; retain Grade 11 Physics in Lab 3B.'
                      : 'Assign **Ms. Taylor (English Dept)** as verified substitute for Grade 10B Period 2.'
                  }`
              )
              .join('\n\n')
          : '• All master timetable conflicts for today have been resolved!';

      return {
        answer: `**Master Timetable Conflict & Substitute Coverage Audit for ${displayName}:**\n\n**Active Scheduling Alerts (${activeConflicts.length}):**\n${conflictLines}\n\n**Faculty Coverage Pulse Today:**\n• **Active Teachers Present:** 46 / 48 (95.8% coverage)\n• **On Approved Leave:** Mr. Charles Davis (English Literature — Grades 10, 11)\n• **Periods Monitored Today:** 42 total sessions across campus (7 currently in progress).`,
        sources: ['VP Master Timetable Matrix', 'Substitute Allocation Engine'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Resolve Timetable Conflicts', actionId: 'NAV_TIMETABLE' },
          { label: 'View Faculty Roster', actionId: 'NAV_TEACHERS' },
        ],
      };
    }

    // B. Lesson Plans & Syllabus Reviews
    if (q.includes('lesson') || q.includes('plan') || q.includes('syllabus') || q.includes('blueprint') || q.includes('revision')) {
      const planLines = db.vpLessonPlans
        .map(
          (p) =>
            `• **${p.title}** — *${p.teacherName}* (${p.subject}, ${p.gradeSection}) • Status: **${p.status.replace('_', ' ')}**${
              p.warningNote ? `\n  ⚠️ *Note:* ${p.warningNote}` : ''
            }`
        )
        .join('\n');

      return {
        answer: `**Lesson Plan & Curriculum Audit for ${displayName}:**\n\n**Submission Telemetry (Term 2 Week 8):**\n• **Total Submitted:** 42 plans | **Approved:** 30 | **Pending VP Review / Revision:** 8\n\n**Priority Lesson Plans in Queue:**\n${planLines}\n\n**Recommendation:** Click **Review Lesson Plans** below to approve pending syllabi or dispatch revision mandates.`,
        sources: ['VP Lesson Plan Registry', 'Academic Curriculum Tracker'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Review Lesson Plans', actionId: 'NAV_LESSON_PLANS' },
          { label: 'Inspect Faculty Status', actionId: 'NAV_TEACHERS' },
        ],
      };
    }

    // C. Examinations, Invigilation & Result Publication
    if (q.includes('exam') || q.includes('invigilation') || q.includes('test') || q.includes('result') || q.includes('publish') || q.includes('proctor')) {
      const examLines = db.vpExams
        .map(
          (e) =>
            `• **${e.title}** (${e.grade} ${e.subject}) — ${e.dateStr} (${e.timeRange}) at ${e.venue} • Proctor: ${e.chiefProctor} [**${e.status}**]`
        )
        .join('\n');
      const pubLines = db.vpPublicationQueue
        .map(
          (pq) =>
            `• **${pq.title}** (${pq.detail}) — ${pq.isPublished ? '✅ Published' : '⏳ Ready for VP Publication Sign-off'}`
        )
        .join('\n');

      return {
        answer: `**Examination Operations & Result Publication Briefing for ${displayName}:**\n\n**Active & Upcoming Exam Sessions:**\n${examLines}\n\n**Result Publication Queue:**\n${pubLines}\n\n**Invigilation Readiness:** 94% of exam halls have verified chief proctors and sealed question paper packets.`,
        sources: ['VP Examinations Controller', 'Result Publication Queue'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Open Examinations Hub', actionId: 'NAV_EXAMINATIONS' },
          { label: 'Academic Analytics', actionId: 'NAV_ACADEMICS' },
        ],
      };
    }

    // D. Academic Progress Review (Class 10 / Cohorts / Teachers)
    return {
      answer: `**Vice Principal Academic Progress & Operations Review for ${displayName}:**\n\n**1. Campus Academic Performance Trend:**\n• **Current Cohort Weighted GPA Average:** **82.4%** (+1.2% vs Mid-Term • Institutional Target: 85.0%)\n• **Grade 11 AP Track:** 89.0% average (Optimal standing across STEM & Calculus)\n• **Class 10 High School:** 86.0% average (Mid-Term Board Prep ongoing; 94% syllabus pacing)\n• **Grade 9 High School:** 84.0% average (Remediation protocol active for Section 9B Algebra II)\n\n**2. Immediate VP Action Items Today:**\n• **Active Timetable Conflicts:** ${db.vpConflicts.filter((c) => c.status === 'ACTIVE').length} clashes flagged (Lab 3B double-booking & Grade 10B Period 2 substitute coverage)\n• **Lesson Plans Awaiting Review:** ${db.vpLessonPlans.filter((p) => p.status !== 'APPROVED').length} plans in queue\n• **Faculty Presence:** 46 / 48 present today (Mrs. Eleanor Oswald & Ms. Rachel Higgins active; Mr. Charles Davis on leave).`,
      sources: ['VP Academic Operations Engine', 'Master Timetable Matrix', 'Cohort Analytics'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('VICE_PRINCIPAL'),
    };
  }

  // ============================================================================
  // 5. PARENT MODULE INTELLIGENCE
  // ============================================================================
  if (role === 'PARENT') {
    const activeChild =
      db.parentChildren.find((c) => c.id === db.activeChildId) || db.parentChildren[0];
    const childName = activeChild?.fullName || 'Aarav Sharma';
    const childGrade = `${activeChild?.grade || 'Grade 10'} • Sec ${activeChild?.section || 'B'}`;
    const childTeacher = activeChild?.classTeacher || 'Mrs. Eleanor Oswald';
    const pendingChildFees = db.parentFees.filter(
      (f) => f.childId === activeChild?.id && f.status !== 'PAID'
    );
    const totalPendingDues = pendingChildFees.reduce((sum, f) => sum + f.amount, 0);

    // A. Bus Location / Route 12 / Route 07 / Transport
    if (
      q.includes('bus') ||
      q.includes('route') ||
      q.includes('transport') ||
      q.includes('located') ||
      q.includes('where is') ||
      q.includes('eta') ||
      q.includes('driver')
    ) {
      const t = db.parentTransport;
      return {
        answer: `**Live School Bus GPS Telemetry for ${displayName} (Ward: ${childName}):**\n\n• **Assigned Bus & Route:** ${t.routeNumber} (${t.busNumber}) / Route 12 Transit Corridor\n• **Current Status:** **${t.statusText}** — Moving at **${t.currentSpeedKmH} km/h** (Engine Health: ${t.engineHealth})\n• **Next Destination Stop:** **${t.nextStopName}**\n• **Estimated Arrival (ETA):** **In ${t.etaNextStopMins} minutes**\n• **RFID Boarding Verification:** ${childName} is verified onboard (${t.rfidBoardedCount}/${t.totalCapacity} students checked in via smart card)\n• **Driver & Support Contact:**\n  - **Captain:** ${t.driverName} (${t.driverPhone})\n  - **Attendant:** ${t.conductorName} (${t.conductorPhone})`,
        sources: ['CASPA Fleet GPS Telemetry', 'Student RFID Transit Log'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Track School Bus Live', actionId: 'NAV_BUS' },
          { label: 'Message Class Teacher', actionId: 'NAV_MESSAGES' },
        ],
      };
    }

    // B. Attendance / Marked Present Today / Leave
    if (
      q.includes('present') ||
      q.includes('attendance') ||
      q.includes('absent') ||
      q.includes('today') ||
      q.includes('leave') ||
      q.includes('check')
    ) {
      return {
        answer: `**Real-Time Attendance Verification for ${childName} (${childGrade}):**\n\n• **Today's Status:** ✅ **MARKED PRESENT** (Biometric RFID Gate 1 check-in recorded at **07:52 AM**)\n• **Cumulative Term Attendance:** **${activeChild?.attendancePercent || 94.2}%** (${activeChild?.presentDays || 48} present out of ${activeChild?.totalDays || 51} total working days)\n• **Institutional Standing:** Good Standing (Exceeds the 85.0% statutory requirement)\n• **Recent Leave Applications:** ${
          db.parentLeaves.length > 0
            ? `${db.parentLeaves[0].type} Leave (${db.parentLeaves[0].startDate} to ${db.parentLeaves[0].endDate}) — Status: **${db.parentLeaves[0].status}**`
            : 'No pending leave requests.'
        }\n\nYou can view the full monthly attendance calendar or submit a medical/family leave request anytime from the **Attendance** tab.`,
        sources: ['Biometric RFID Gate Registry', 'Student Attendance Ledger'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Open Attendance Calendar', actionId: 'NAV_ATTENDANCE' },
          { label: 'Message Class Teacher', actionId: 'NAV_MESSAGES' },
        ],
      };
    }

    // C. Fees / Pending Dues / Invoices / Receipts
    if (
      q.includes('fee') ||
      q.includes('due') ||
      q.includes('tuition') ||
      q.includes('payment') ||
      q.includes('invoice') ||
      q.includes('paid') ||
      q.includes('receipt') ||
      q.includes('balance')
    ) {
      const allChildFees = db.parentFees.filter((f) => f.childId === activeChild?.id);
      const feeBreakdown = allChildFees
        .map(
          (f) =>
            `• **${f.title}** (${f.category}): **₹${f.amount.toLocaleString('en-IN')}** — Status: **${f.status}** ${
              f.receiptNo ? `*(Receipt: ${f.receiptNo})*` : `*(Due: ${f.dueDate})*`
            }`
        )
        .join('\n');

      return {
        answer: `**Fee Ledger & Dues Confirmation for ${displayName} (Ward: ${childName}):**\n\n• **Total Pending Balance:** **₹${totalPendingDues.toLocaleString('en-IN')}** ${
          totalPendingDues > 0 ? `(Due by ${activeChild?.dueDate || 'Oct 15, 2026'})` : '(All Term Dues Cleared!)'
        }\n\n**Itemized Fee Breakdown (${childGrade}):**\n${feeBreakdown}\n\nYou can settle any pending installment instantly via **UPI / QR Code, Netbanking, or Card** and download digitally signed receipts in the **Fees** tab.`,
        sources: ['School Bursar & Accounts Ledger', 'Parent Fee Portal'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'View & Pay Fee Invoices', actionId: 'NAV_FEES' },
          { label: 'Download Certificates', actionId: 'NAV_CERTIFICATES' },
        ],
      };
    }

    // D. Academic Performance / Marks / PTM / Teacher Remarks
    if (
      q.includes('mark') ||
      q.includes('grade') ||
      q.includes('score') ||
      q.includes('academic') ||
      q.includes('result') ||
      q.includes('exam') ||
      q.includes('ptm') ||
      q.includes('progress') ||
      q.includes('report')
    ) {
      const subjLines =
        activeChild?.academicPerformance
          .map((s) => `• **${s.subject}:** ${s.score}% (Grade **${s.grade}**, Trend: ${s.trend === 'up' ? '↗ Improving' : '→ Stable'})`)
          .join('\n') || '• **Mathematics:** 95% (A+)\n• **Science:** 92% (A+)';

      return {
        answer: `**Academic Progress & Scorecard for ${childName} (${childGrade}):**\n\n• **Term GPA / Aggregate:** **${activeChild?.gpa || '9.6 CGPA'}** (${activeChild?.rank || 'Rank #3 in Section'})\n\n**Subject-Wise Mastery:**\n${subjLines}\n\n**Class Teacher Observation (${childTeacher}):**\n*"${activeChild?.teacherRemarks || 'Demonstrates strong analytical aptitude and consistent classroom participation.'}"*\n\n**Upcoming Parent-Teacher Meeting (PTM):**\n• **Date & Time:** Oct 15, 2026 at 10:30 AM (Room 102) with ${childTeacher}.`,
        sources: ['Student Academic Scorecard', 'PTM Scheduler'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'View Child Academic Profile', actionId: 'NAV_CHILD' },
          { label: 'Message Class Teacher', actionId: 'NAV_MESSAGES' },
        ],
      };
    }

    // E. Notices / Circulars / Certificates
    if (q.includes('notice') || q.includes('circular') || q.includes('certificate') || q.includes('bonafide') || q.includes('event')) {
      const noticeLines = db.parentNotices
        .slice(0, 3)
        .map((n) => `• **[${n.category}] ${n.title}** (${n.dateStr}) — *${n.summary}*`)
        .join('\n');

      return {
        answer: `**Recent School Circulars & Certificates for ${displayName}:**\n\n**Published Advisories:**\n${noticeLines}\n\n**Requested Certificates (${db.parentCertificates.length}):**\n${db.parentCertificates.map((c) => `• **${c.title}** (${c.childName}) — Status: **${c.status}** [Code: ${c.verificationCode}]`).join('\n')}`,
        sources: ['Campus Circulars Broadcast', 'Registrar Certificate Desk'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'View School Notices', actionId: 'NAV_NOTICES' },
          { label: 'Open Certificates', actionId: 'NAV_CERTIFICATES' },
        ],
      };
    }

    // Default Comprehensive Parent Response
    return {
      answer: `Good day, **${displayName}**! Here is the complete real-time family portal summary for **${childName}** (${childGrade}, ${activeChild?.curriculum || 'CBSE'}):\n\n• **Attendance Today:** ✅ **Present** (Checked in at 07:52 AM via RFID Gate 1 • Term Attendance: **${activeChild?.attendancePercent || 94.2}%**)\n• **Live School Bus (${db.parentTransport.routeNumber}):** **${db.parentTransport.statusText}** at ${db.parentTransport.currentSpeedKmH} km/h — Next stop: **${db.parentTransport.nextStopName}** (ETA: **${db.parentTransport.etaNextStopMins} mins**)\n• **Tuition & Fee Status:** ${
        totalPendingDues > 0
          ? `**₹${totalPendingDues.toLocaleString('en-IN')}** pending for Term 2 (Due by ${activeChild?.dueDate || 'Oct 15, 2026'})`
          : 'All Term 2 fees paid and cleared'
      }\n• **Academic Standing:** **${activeChild?.gpa || '9.6 CGPA'}** (${activeChild?.rank || 'Top 5%'}) • Class Teacher: **${childTeacher}**\n\nAsk me about **Bus Route 12 location**, **today's attendance**, **Term 2 fee dues**, **subject marks**, or **upcoming PTM dates**!`,
      sources: ['Student Information System', 'Fleet GPS Telemetry', 'Accounts Ledger'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('PARENT'),
    };
  }

  // ============================================================================
  // 6. PRINCIPAL MODULE INTELLIGENCE
  // ============================================================================
  if (role === 'PRINCIPAL' || role === 'SUPER_ADMIN') {
    // A. Absenteeism Anomalies & Active Safety Cases
    if (
      q.includes('absenteeism') ||
      q.includes('anomaly') ||
      q.includes('anomalies') ||
      q.includes('safety') ||
      q.includes('incident') ||
      q.includes('ragging') ||
      q.includes('pocso') ||
      q.includes('alert')
    ) {
      const caseLines = db.principalSafeguardingCases
        .map(
          (c) =>
            `• **Case ${c.caseNo} [${c.severity}]:** ${c.title} (${c.category})\n  - *Assigned To:* ${c.assignedTo} • *Stage:* Step ${c.currentStep}/4 (${c.notesCount})`
        )
        .join('\n');

      return {
        answer: `**Executive Briefing: Absenteeism Anomalies & Safeguarding Dossier for ${displayName}**\n\n**1. Campus Attendance & Absenteeism Anomalies Today:**\n• **Overall Student Attendance:** **91.0%** (-1.4% vs yesterday; Target benchmark: 95.0%)\n• **Detected Anomaly:** Grade 9 Section B recorded an unusual dip to **84.2%** today (7 scholars absent due to seasonal viral fever cluster; Medical Officer notified).\n• **Faculty Presence:** **91 / 96 Present (94.8%)** — 5 staff members on leave (substitutes deployed for all morning periods).\n\n**2. Active Safeguarding & Anti-Ragging Cases (${db.principalSafeguardingCases.length} Open):**\n${caseLines}\n\n**3. Statutory Compliance Status:**\n• **POCSO & Anti-Ragging Audit Readiness:** 92% documentation verified; annual statutory inspection in **14 days**.`,
        sources: ['Confidential Safeguarding Vault', 'Campus Biometric Attendance Engine'],
        isAiGenerated: true,
        requiresReview: true,
        suggestedActions: [
          { label: 'View Safeguarding Log', actionId: 'NAV_SAFETY' },
          { label: 'Inspect Cohort Standing', actionId: 'NAV_ACADEMICS' },
        ],
      };
    }

    // B. Approval Requisitions & SLA Deadlines
    if (
      q.includes('approval') ||
      q.includes('sla') ||
      q.includes('requisition') ||
      q.includes('deadline') ||
      q.includes('pending') ||
      q.includes('authorize')
    ) {
      const pendingExec = db.principalExecutiveApprovals.filter((a) => a.status === 'PENDING');
      const appLines = pendingExec
        .map(
          (a) =>
            `• **${a.title}** — Requested by *${a.requesterName}* (${a.requesterRole})\n  - *Category:* ${a.categoryBadge} • *SLA Countdown:* **${a.slaString}** ${
              a.amount ? `• *Allocation:* **${a.amount}**` : ''
            }`
        )
        .join('\n');

      return {
        answer: `**Executive Approvals & SLA Compliance Audit for ${displayName}:**\n\n**Summary Metrics:**\n• **Pending Executive Sign-Off:** ${pendingExec.length} priority requisitions\n• **Signed Today:** 4 authorizations completed\n• **Urgent (< 4h SLA Window):** 2 items require immediate Principal action\n\n**Requisitions Approaching SLA Deadlines:**\n${appLines}\n\nClick **Review Urgent Approvals** below to execute cryptographic sign-offs or request revisions.`,
        sources: ['Principal Executive Approval Center', 'Multi-Stage SLA Monitor'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Review Urgent Approvals', actionId: 'NAV_APPROVALS' },
          { label: 'Open Finance Ledger', actionId: 'NAV_FINANCE' },
        ],
      };
    }

    // C. Term 2 Fee Collections, Finance, Defaulters & Fleet Status
    if (
      q.includes('fee') ||
      q.includes('finance') ||
      q.includes('collection') ||
      q.includes('fleet') ||
      q.includes('bus') ||
      q.includes('defaulter') ||
      q.includes('budget') ||
      q.includes('payroll') ||
      q.includes('operation')
    ) {
      const defaulterLines = db.principalDefaulters
        .slice(0, 3)
        .map(
          (d) =>
            `• **${d.studentName}** (${d.gradeSection}) — **${d.amount}** overdue by ${d.overdueDays} days [${d.noticeLevel}]`
        )
        .join('\n');

      return {
        answer: `**Executive Briefing: Term 2 Fee Collections & Fleet Operations for ${displayName}**\n\n**1. Financial & Fee Collection Velocity (Term 2):**\n• **Collected MTD:** **₹18.2L** (**87%** of monthly target • +2.4% vs Term 1)\n• **Outstanding Balances:** **₹4.6L** across 142 student accounts\n• **Critical Overdue (> 30 Days):** **₹1.2L** across 38 accounts\n• **Monthly Staff Payroll Mandate:** **₹42.0L** scheduled for automated disbursal on the 28th\n\n**Top Defaulter Accounts Flagged for Reminder:**\n${defaulterLines}\n\n**2. Campus Transit Fleet & Operations Status:**\n• **Active GPS Buses:** **18 / 20 vehicles active** (98.4% morning student intake completed)\n• **Transit Advisory:** Route 7 delayed 6 mins due to rain; Bus #14 scheduled for mandatory maintenance inspection.\n• **Hostel & Utilities:** Hostel occupancy at **82%** (198/240 scholars); Campus solar array operating at **91% optimal capacity**.`,
        sources: ['Executive Finance Ledger', 'CASPA Fleet GPS Matrix', 'Campus Operations Hub'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Open Finance Ledger', actionId: 'NAV_FINANCE' },
          { label: 'Inspect Campus Operations', actionId: 'NAV_OPERATIONS' },
        ],
      };
    }

    // D. Staff / Faculty Evaluation & Leaves
    if (q.includes('staff') || q.includes('faculty') || q.includes('teacher') || q.includes('leave') || q.includes('appraisal')) {
      const leaveLines = db.principalStaffLeaves
        .map(
          (l) =>
            `• **${l.staffName}** (${l.designationDept}) — *${l.leaveType} Leave* (${l.durationDates}): "${l.note}" [**${l.status}**]`
        )
        .join('\n');

      return {
        answer: `**Faculty Workforce Pulse & Leave Dossier for ${displayName}:**\n\n• **Total Campus Staff:** 96 members (**91 Present Today — 94.8%**, 5 on leave)\n• **Faculty Observational Appraisal:** **4.7 / 5.0** average rating across Term 1 cycle (Top 98th percentile benchmark)\n\n**Pending Staff Leave Authorizations:**\n${leaveLines}`,
        sources: ['Principal HR & Faculty Evaluation Dossier'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Open Staff Directory', actionId: 'NAV_STAFF' },
          { label: 'Review Urgent Approvals', actionId: 'NAV_APPROVALS' },
        ],
      };
    }

    // E. Academic Cohorts & Board Readiness
    if (q.includes('academic') || q.includes('cohort') || q.includes('pass rate') || q.includes('curriculum') || q.includes('grade')) {
      return {
        answer: `**Principal Academic Standing & Cohort Health Report for ${displayName}:**\n\n• **Campus Pass Rate Projection:** **88.0%** (+4.0% vs Mid-Terms; State Statutory Floor: 80.0%)\n• **Grade 11 AP Track (88 Scholars):** **89% Aggregate** — Optimal standing\n• **Grade 10 High School (110 Scholars):** **86% Aggregate** — Board prep on schedule\n• **Grade 9 High School (90 Scholars):** **84% Aggregate** — **Attention Required** in Section 9B (Remediation protocol active for Algebra II with Mrs. Eleanor Oswald).`,
        sources: ['Executive Academic Analytics', 'Board Accreditation Tracker'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Open Academic Command', actionId: 'NAV_ACADEMICS' },
          { label: 'Review Urgent Approvals', actionId: 'NAV_APPROVALS' },
        ],
      };
    }

    // Default Comprehensive Principal Response
    return {
      answer: `**CASPA Executive Command Synthesis for ${displayName}:**\n\n• **Campus Enrollment & Attendance:** **1,240 Scholars** (+8.2% vs last term) • **91.0% Attendance Today** • **96 Faculty** (94.8% present)\n• **Critical Alerts Active (${db.principalCriticalAlerts.filter((a) => a.status === 'ACTIVE').length}):**\n  - *Perimeter Gate 3 Biometric Terminal Offline* (Technician dispatch ready)\n  - *Grade 9B Attendance Dip* (84.2% today — seasonal flu advisory)\n• **Safeguarding Vault:** ${db.principalSafeguardingCases.length} active cases under investigation (1 Critical SLA countdown)\n• **Financial Velocity:** **₹18.2L** collected MTD (87% of monthly quota; ₹4.6L outstanding)\n• **Executive Approvals:** **${db.principalExecutiveApprovals.filter((a) => a.status === 'PENDING').length} requisitions** awaiting Principal signature.\n\nAsk me to *"Summarize today's absenteeism anomalies and safety cases"*, *"List approvals approaching SLA deadlines"*, or *"Brief on Term 2 fee collections and fleet status"*!`,
      sources: ['Principal Command Center Telemetry', 'Financial Ledger', 'Safeguarding Register'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('PRINCIPAL'),
    };
  }

  // ============================================================================
  // 7. ADMIN MODULE INTELLIGENCE
  // ============================================================================
  if (role === 'ADMIN' || role === 'ACCOUNTS' || role === 'TRANSPORT' || role === 'SAFETY_OFFICER') {
    const pendingApps = db.approvals.filter((a) => a.status === 'PENDING');
    const activeSafety = db.safetyIncidents.filter((s) => s.status !== 'RESOLVED' && s.status !== 'CLOSED');
    const totalFeeCollected = db.feeInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const totalFeeDue = db.feeInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const feeRate = totalFeeDue > 0 ? ((totalFeeCollected / totalFeeDue) * 100).toFixed(1) : '94.2';

    // A. Fee Collection / Finance / Invoices
    if (q.includes('fee') || q.includes('finance') || q.includes('invoice') || q.includes('billing') || q.includes('revenue') || q.includes('due')) {
      const invLines = db.feeInvoices
        .map(
          (inv) =>
            `• **${inv.invoiceNo}** — ${inv.studentName} (${inv.gradeSection}): **$${inv.paidAmount.toLocaleString()} / $${inv.totalAmount.toLocaleString()}** [**${inv.status}** • Due: ${inv.dueDate}]`
        )
        .join('\n');

      return {
        answer: `**Enterprise Finance & Fee Billing Audit for ${displayName}:**\n\n• **Term 2 Collection Rate:** **${feeRate}%** ($${totalFeeCollected.toLocaleString()} collected of $${totalFeeDue.toLocaleString()} billed)\n• **Outstanding Balance:** **$${(totalFeeDue - totalFeeCollected).toLocaleString()}**\n\n**Active Student Fee Invoices:**\n${invLines}`,
        sources: ['Enterprise Accounts Ledger', 'Admin Billing Console'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Open Finance & Invoices', actionId: 'NAV_FINANCE' },
          { label: 'Pending Approvals', actionId: 'NAV_APPROVALS' },
        ],
      };
    }

    // B. Transport Fleet / Buses / GPS
    if (q.includes('bus') || q.includes('fleet') || q.includes('transport') || q.includes('route') || q.includes('gps')) {
      const busLines = db.buses
        .map(
          (b) =>
            `• **${b.routeNumber} (${b.busNumber})** — *${b.routeName}*\n  - Driver: ${b.driverName} (${b.driverPhone}) • Speed: ${b.speedKmH} km/h • Occupancy: ${b.studentsOnBoard}/${b.capacity} • Status: **${b.status}** (ETA: ${b.etaMinutes}m)`
        )
        .join('\n');

      return {
        answer: `**Campus Fleet GPS Telemetry Report for ${displayName}:**\n\n• **Active Vehicles on Radar:** ${db.buses.filter((b) => b.status === 'ON_ROUTE' || b.status === 'DELAYED').length} / ${db.buses.length} routes tracked live\n\n**Route-by-Route Telemetry:**\n${busLines}`,
        sources: ['CASPA Fleet GPS Radar', 'Transport Control Desk'],
        isAiGenerated: true,
        suggestedActions: [{ label: 'Open Fleet GPS Radar', actionId: 'NAV_TRANSPORT' }],
      };
    }

    // C. Staff / Admissions / Students / RBAC Audit
    if (q.includes('staff') || q.includes('student') || q.includes('admission') || q.includes('audit') || q.includes('rbac') || q.includes('permission')) {
      const sectionLines = db.classSections
        .map(
          (sec) =>
            `• **${sec.grade} - Sec ${sec.section}** (Teacher: ${sec.classTeacher}, ${sec.room}): ${sec.studentCount}/${sec.capacity} enrolled • **${sec.syllabusCompletionRate}% Syllabus Complete**`
        )
        .join('\n');

      return {
        answer: `**Enterprise Enrollment, Faculty & Security Audit for ${displayName}:**\n\n• **Total Enrolled Students:** 1,420 active across campus (${db.students.length} priority directory records synced)\n• **Faculty & Staff Roster:** ${db.staffMembers.length} department leads & active staff (98.1% on duty today)\n\n**Class Section Capacity & Syllabus Completion:**\n${sectionLines}\n\n**Latest RBAC Security Audit Log:**\n• *${db.auditLogs[0]?.timestamp || 'Just now'}* — **${db.auditLogs[0]?.userName || displayName}** (${db.auditLogs[0]?.module || 'SYSTEM'}): ${db.auditLogs[0]?.details || 'Session verified'}`,
        sources: ['Student Admissions Registry', 'HR Staff Directory', 'Immutable RBAC Audit Log'],
        isAiGenerated: true,
        suggestedActions: [
          { label: 'Manage Students', actionId: 'NAV_STUDENTS' },
          { label: 'Manage Faculty & Staff', actionId: 'NAV_STAFF' },
        ],
      };
    }

    // D. Default / Comprehensive School-Wide Summary (Attendance, Safety, Approvals, Finance)
    const safetyLines = activeSafety
      .map(
        (s) =>
          `• **Case #${s.caseNumber} [${s.risk}]:** ${s.category} at ${s.location} — *${s.description}* (SLA: **${s.slaDeadline}**)`
      )
      .join('\n');
    const approvalLines = pendingApps
      .map(
        (a) =>
          `• **[${a.priority}] ${a.title}** (${a.module}) — Requested by ${a.requesterName} ${
            a.amount ? `($${a.amount.toLocaleString()})` : ''
          } • SLA: **${a.slaDeadline}**`
      )
      .join('\n');

    return {
      answer: `**Enterprise School Operations Summary for ${displayName} (${role}):**\n\n**1. School-Wide Attendance & Workforce Pulse:**\n• **Student Attendance Today:** **96.4%** (1,369 present / 51 absent out of 1,420 enrolled)\n• **Faculty & Staff Attendance:** **98.1%** (84 active staff on duty)\n• **Fleet GPS Status:** 24/24 transit routes active with real-time RFID telemetry\n• **Fee Collection Velocity:** **${feeRate}%** collected ($${totalFeeCollected.toLocaleString()} received)\n\n**2. Active Safeguarding & Safety Cases (${activeSafety.length} Open):**\n${safetyLines || '• Zero unresolved safety incidents.'}\n\n**3. Pending Administrative Approvals (${pendingApps.length} In Queue):**\n${approvalLines || '• All requisitions cleared.'}`,
      sources: ['School Enterprise Telemetry Engine', 'Confidential Safety Desk', 'Approval Workflow Center'],
      isAiGenerated: true,
      suggestedActions: getSuggestedActionsForRole('ADMIN'),
    };
  }

  // Fallback for any other specialized role (COUNSELLOR, HOSTEL_WARDEN)
  return {
    answer: `**CASPA Operational Briefing for ${displayName} (${role}):**\n• **Campus Attendance Today:** ${metrics.kpis.attendanceTodayPercent}% students present; ${metrics.kpis.staffAttendancePercent}% staff on duty.\n• **Active Fleet Routes:** ${db.buses.filter((b) => b.status === 'ON_ROUTE').length} of ${db.buses.length} buses active.\n• **Pending Approvals:** ${metrics.pendingApprovalsCount} items in workflow queue.`,
    sources: ['CASPA Enterprise Telemetry Engine'],
    isAiGenerated: true,
    suggestedActions: getSuggestedActionsForRole(role),
  };
}
