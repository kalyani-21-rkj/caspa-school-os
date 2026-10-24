// Utility to generate and trigger real browser downloads of valid PDF documents
// Works inside sandboxed iframes without window.open or external dependencies.

const sanitizePdfText = (text: string): string => {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/•/g, '-')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/’/g, "'")
    .replace(/‘/g, "'")
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    .replace(/Δ/g, 'Delta ')
    .replace(/η/g, 'eta ')
    .replace(/∫/g, 'Integral ')
    .replace(/[^\x20-\x7E]/g, '');
};

const wrapText = (text: string, maxChars: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxChars) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
};

const buildPdfBlob = (contentStream: string): Blob => {
  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /MediaBox [0 0 612 792] /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
};

export const triggerBlobDownload = (blob: Blob, fileName: string): void => {
  const cleanName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = cleanName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 300);
};

const getSubjectNotesContent = (subject: string, unitTopic?: string): {
  overview: string;
  keyConcepts: string[];
  formulasOrRules: string[];
  practiceQuestions: string[];
} => {
  const s = subject.toLowerCase();

  if (s.includes('calculus') || s.includes('math')) {
    return {
      overview:
        unitTopic ||
        'Integration by Parts, Definite Integrals, and Differential Equations for Grade 9B Honors Mathematics.',
      keyConcepts: [
        '1. Integration by Parts derives from the product rule for derivatives.',
        '2. LIATE Rule for choosing u: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.',
        '3. Fundamental Theorem of Calculus connects differentiation with definite integration.',
        '4. Area between curves is computed by integrating (Upper Function - Lower Function) over [a, b].',
      ],
      formulasOrRules: [
        'Formula 1: Integral(u dv) = u * v - Integral(v du)',
        'Formula 2: Integral from a to b of f(x) dx = F(b) - F(a)',
        'Formula 3: d/dx [sin(x)] = cos(x)  |  Integral[cos(x) dx] = sin(x) + C',
        'Formula 4: Quadratic Roots: x = (-b +/- sqrt(b^2 - 4ac)) / (2a)',
      ],
      practiceQuestions: [
        'Q1. Evaluate the indefinite integral of x * e^(2x) dx using integration by parts.',
        'Q2. Find the area bounded by y = x^2 and y = 2x + 3 on the interval [-1, 3].',
        'Q3. Solve the initial value differential equation dy/dx = 3x^2 * y with y(0) = 4.',
      ],
    };
  }

  if (s.includes('physics')) {
    return {
      overview:
        unitTopic ||
        'Unit 4: Laws of Thermodynamics, Heat Engines, Carnot Cycle Efficiency, and Entropy Systems.',
      keyConcepts: [
        '1. Zeroth Law: Thermal equilibrium is transitive across connected thermodynamic systems.',
        '2. First Law (Conservation of Energy): Internal energy change equals heat added minus work done.',
        '3. Second Law: Heat cannot spontaneously flow from a colder body to a hotter reservoir.',
        '4. Isothermal vs Adiabatic Processes: Constant temperature (Delta U = 0) vs zero heat transfer (Q = 0).',
      ],
      formulasOrRules: [
        'First Law Equation: Delta U = Q - W   (where W = Integral P dV)',
        'Ideal Gas Law: P * V = n * R * T   (R = 8.314 J/mol*K)',
        'Heat Engine Efficiency: eta = W_net / Q_hot = 1 - (Q_cold / Q_hot)',
        'Carnot Maximum Efficiency: eta_max = 1 - (T_cold / T_hot)  [Temperatures in Kelvin]',
      ],
      practiceQuestions: [
        'Q1. A Carnot engine operates between 600 K and 300 K. Calculate its maximum thermal efficiency.',
        'Q2. During an isothermal expansion at 400 K, an ideal gas absorbs 2,400 J of heat. Find Delta U and W.',
        'Q3. Sketch the 4 stages of the Carnot cycle on a P-V diagram and label heat exchange stages.',
      ],
    };
  }

  if (s.includes('chemistry')) {
    return {
      overview:
        unitTopic ||
        'Chemical Bonding, Molecular Orbital Theory, Hybridization (sp, sp2, sp3), and VSEPR Geometry.',
      keyConcepts: [
        '1. Ionic vs Covalent Bonding: Electrostatic attraction of ions vs orbital overlap and electron sharing.',
        '2. VSEPR Theory: Electron pairs (bonding and lone pairs) arrange to minimize mutual repulsion.',
        '3. Hybridization: Mixing of atomic orbitals to form degenerate hybrid orbitals (sp3 = 109.5 deg).',
        '4. Intermolecular Forces: London dispersion < Dipole-dipole < Hydrogen bonding (N, O, F).',
      ],
      formulasOrRules: [
        'Formal Charge = Valence Electrons - (Non-bonding Electrons + 0.5 * Bonding Electrons)',
        'Bond Order = 0.5 * (Bonding MO Electrons - Antibonding MO Electrons)',
        'Gibbs Free Energy: Delta G = Delta H - T * Delta S  (Spontaneous when Delta G < 0)',
        'pH Calculation: pH = -log10[H+]  |  pH + pOH = 14.0 at 298 K',
      ],
      practiceQuestions: [
        'Q1. Determine the hybridization, molecular geometry, and bond angles of NH3, H2O, and SF6.',
        'Q2. Calculate the formal charge on each oxygen atom in the ozone (O3) resonance structures.',
        'Q3. Explain why H2O has a significantly higher boiling point (100 C) than H2S (-60 C).',
      ],
    };
  }

  if (s.includes('english') || s.includes('literature')) {
    return {
      overview:
        unitTopic ||
        'Shakespearean Tragedy: Thematic & Character Analysis of Hamlet, Soliloquies, and Dramatic Irony.',
      keyConcepts: [
        '1. Tragic Flaw (Hamartia): Hamlet’s philosophical hesitation and moral perfectionism delay action.',
        '2. Appearance vs Reality: Deception, spying (Polonius, Rosencrantz), and the Mousetrap play-within-a-play.',
        '3. Soliloquy Structure: Iambic pentameter ("To be, or not to be") revealing inner psychological conflict.',
        '4. Foil Characters: Laertes and Fortinbras act as decisive contrasts to Hamlet’s contemplative nature.',
      ],
      formulasOrRules: [
        'Essay Thesis Framework: [Author] uses [Literary Device] in [Scene] to reveal [Universal Theme].',
        'Iambic Pentameter Meter: 5 iambic feet per line (da-DUM x 5 = 10 syllables total).',
        'PEEL Paragraph Method: Point -> Evidence (Direct Quote) -> Explanation -> Link to Thesis.',
      ],
      practiceQuestions: [
        'Q1. Analyze how imagery of disease and corruption functions throughout Act 1 and Act 3 of Hamlet.',
        'Q2. Compare Hamlet’s reaction to his father’s murder with Laertes’ reaction in Act 4.',
        'Q3. Write a 300-word critical commentary on the dramatic purpose of the "Mousetrap" scene (Act 3, Scene 2).',
      ],
    };
  }

  if (s.includes('computer') || s.includes('coding') || s.includes('robotics') || s.includes('ai')) {
    return {
      overview:
        unitTopic ||
        'Algorithms, Recursion, Data Structures, Time Complexity (Big-O), and Autonomous Robotics Control.',
      keyConcepts: [
        '1. Recursion requires a terminating Base Case and a Recursive Step that reduces problem size.',
        '2. Stack Memory: Each recursive call pushes a new activation frame onto the call stack.',
        '3. Binary Search divides a sorted array in half each step, achieving O(log n) time complexity.',
        '4. PID Controller in Robotics: Proportional, Integral, and Derivative error correction loop.',
      ],
      formulasOrRules: [
        'Binary Search Complexity: Time = O(log2 N), Space = O(1) iterative / O(log N) recursive',
        'Merge Sort Complexity: Time = O(N log N) in all cases, Space = O(N)',
        'PID Control Output: u(t) = Kp * e(t) + Ki * Integral(e dt) + Kd * (de/dt)',
      ],
      practiceQuestions: [
        'Q1. Trace the recursion tree and call stack depth for fibonacci(5).',
        'Q2. Write a clean function to detect a cycle in a singly linked list in O(1) auxiliary space.',
        'Q3. Explain why Merge Sort is preferred over Quick Sort for linked list structures.',
      ],
    };
  }

  return {
    overview:
      unitTopic ||
      `Comprehensive lecture notes, core principles, and revision guide for ${subject}.`,
    keyConcepts: [
      `1. Foundational principles and curriculum objectives for ${subject}.`,
      '2. Critical analysis of case studies and real-world applications covered in class.',
      '3. Key terminology, structured definitions, and historical/theoretical context.',
      '4. Summary of classroom discussions and practical demonstrations.',
    ],
    formulasOrRules: [
      'Rule 1: Always structure responses with clear definitions, diagrams, and supporting evidence.',
      'Rule 2: Review unit learning checkpoints prior to weekly formative assessments.',
      'Rule 3: Cross-reference textbook chapters with annotated classroom slides.',
    ],
    practiceQuestions: [
      `Q1. Summarize the three primary learning outcomes from today's ${subject} session.`,
      'Q2. Provide two real-world examples illustrating the unit topic discussed in class.',
      'Q3. Complete the end-of-chapter review exercises for next week’s tutorial.',
    ],
  };
};

export interface ClassNotesDownloadParams {
  subject: string;
  periodNumber: number;
  teacher: string;
  room: string;
  timeRange: string;
  unitTopic?: string;
  studentName?: string;
  grade?: string;
  day?: string;
  isAiGenerated?: boolean;
}

export const downloadClassNotesPdf = (params: ClassNotesDownloadParams): void => {
  const {
    subject,
    periodNumber,
    teacher,
    room,
    timeRange,
    unitTopic,
    studentName = 'Elena Vance',
    grade = 'Grade 9B',
    day = 'Wednesday',
    isAiGenerated = false,
  } = params;

  const content = getSubjectNotesContent(subject, unitTopic);
  const commands: string[] = [];

  // Header Banner (Navy/Teal bar at top)
  commands.push('0.09 0.42 0.53 rg');
  commands.push('36 705 540 55 re f');

  // White text inside banner
  commands.push('BT /F2 15 Tf 1 1 1 rg 50 737 Td (' + sanitizePdfText(`CASPA ACADEMIC PORTAL - ${isAiGenerated ? 'AI SMART REVISION NOTES' : 'OFFICIAL CLASS NOTES'}`) + ') Tj ET');
  commands.push('BT /F1 10 Tf 0.9 0.96 0.98 rg 50 718 Td (' + sanitizePdfText(`Period ${periodNumber}: ${subject}  |  Instructor: ${teacher}  |  Room: ${room}`) + ') Tj ET');

  // Metadata Box
  commands.push('0.95 0.97 0.98 rg');
  commands.push('36 648 540 46 re f');
  commands.push('0.82 0.86 0.90 RG 1 w 36 648 540 46 re S');

  commands.push('BT /F2 10 Tf 0.08 0.15 0.28 rg 48 676 Td (' + sanitizePdfText(`Student: ${studentName} (${grade})`) + ') Tj ET');
  commands.push('BT /F1 10 Tf 0.25 0.32 0.42 rg 320 676 Td (' + sanitizePdfText(`Schedule: ${day}, ${timeRange}`) + ') Tj ET');
  commands.push('BT /F2 10 Tf 0.09 0.42 0.53 rg 48 658 Td (' + sanitizePdfText(`Topic: ${content.overview.slice(0, 82)}`) + ') Tj ET');

  let y = 620;

  const drawSectionHeader = (title: string) => {
    commands.push('0.09 0.42 0.53 rg');
    commands.push(`36 ${y - 4} 4 16 re f`);
    commands.push(`BT /F2 12 Tf 0.08 0.15 0.28 rg 46 ${y} Td (${sanitizePdfText(title)}) Tj ET`);
    y -= 20;
  };

  const drawParagraphLines = (lines: string[], font: 'F1' | 'F2' = 'F1', fontSize = 10) => {
    for (const rawLine of lines) {
      const wrapped = wrapText(rawLine, 88);
      for (const wLine of wrapped) {
        if (y < 65) break;
        commands.push(`BT /${font} ${fontSize} Tf 0.18 0.23 0.30 rg 46 ${y} Td (${sanitizePdfText(wLine)}) Tj ET`);
        y -= 15;
      }
    }
    y -= 8;
  };

  drawSectionHeader('1. UNIT OVERVIEW & LEARNING OBJECTIVES');
  drawParagraphLines([content.overview]);

  drawSectionHeader('2. KEY CONCEPTS & LECTURE SUMMARY');
  drawParagraphLines(content.keyConcepts);

  drawSectionHeader('3. ESSENTIAL FORMULAS, RULES & FRAMEWORKS');
  drawParagraphLines(content.formulasOrRules, 'F2', 10);

  drawSectionHeader('4. PRACTICE PROBLEMS & EXAM PREPARATION');
  drawParagraphLines(content.practiceQuestions);

  // Footer
  commands.push('0.85 0.88 0.92 RG 0.8 w 36 48 540 0 re S');
  commands.push(
    `BT /F1 8 Tf 0.45 0.50 0.58 rg 36 34 Td (${sanitizePdfText(
      `Generated by CASPA Education LMS for ${studentName} • Verified Course Material • Page 1 of 1`
    )}) Tj ET`
  );

  const blob = buildPdfBlob(commands.join('\n'));
  const prefix = isAiGenerated ? 'AI_Revision_Notes' : 'Class_Notes';
  triggerBlobDownload(blob, `Period_${periodNumber}_${subject}_${prefix}.pdf`);
};

export interface CertificateDownloadParams {
  title: string;
  subtitle: string;
  category: string;
  ranking: string;
  awardYear: string;
  studentName?: string;
  grade?: string;
}

export const downloadCertificatePdf = (params: CertificateDownloadParams): void => {
  const {
    title,
    subtitle,
    category,
    ranking,
    awardYear,
    studentName = 'Elena Vance',
    grade = 'Grade 9B',
  } = params;

  const credentialId = `CASPA-CERT-${awardYear.replace(/[^0-9]/g, '') || '2025'}-${Math.abs(
    title.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1000)
  )}`;

  const commands: string[] = [];

  // Outer Decorative Navy Border
  commands.push('0.08 0.16 0.30 RG 4 w 28 28 556 736 re S');
  // Inner Gold/Amber Border
  commands.push('0.85 0.65 0.13 RG 1.5 w 36 36 540 720 re S');

  // Top Header Banner
  commands.push('0.09 0.42 0.53 rg 36 666 540 90 re f');
  commands.push('BT /F2 18 Tf 1 1 1 rg 125 720 Td (CASPA INTERNATIONAL ACADEMY) Tj ET');
  commands.push('BT /F1 10 Tf 0.90 0.96 0.98 rg 165 700 Td (OFFICIAL ACADEMIC & CO-CURRICULAR HONORS BOARD) Tj ET');
  commands.push(`BT /F2 9 Tf 0.98 0.84 0.35 rg 215 680 Td (${sanitizePdfText(`CREDENTIAL ID: ${credentialId}`)}) Tj ET`);

  // Certificate Title
  commands.push('BT /F2 24 Tf 0.08 0.16 0.30 rg 110 605 Td (CERTIFICATE OF ACHIEVEMENT) Tj ET');
  commands.push('0.85 0.65 0.13 rg 186 592 240 2.5 re f');

  commands.push('BT /F1 12 Tf 0.35 0.42 0.50 rg 195 555 Td (This official credential is proudly presented to) Tj ET');

  // Student Name Highlight
  commands.push(`BT /F2 26 Tf 0.09 0.42 0.53 rg 175 510 Td (${sanitizePdfText(studentName.toUpperCase())}) Tj ET`);
  commands.push(`BT /F1 11 Tf 0.35 0.42 0.50 rg 235 488 Td (${sanitizePdfText(`Student Roll & Class: ${grade}`)}) Tj ET`);

  // Achievement Box
  commands.push('0.96 0.98 0.99 rg 70 355 472 108 re f');
  commands.push('0.80 0.87 0.92 RG 1 w 70 355 472 108 re S');

  commands.push('BT /F1 11 Tf 0.30 0.36 0.44 rg 90 440 Td (In recognition of outstanding distinction and verified performance in:) Tj ET');
  commands.push(`BT /F2 16 Tf 0.08 0.16 0.30 rg 90 412 Td (${sanitizePdfText(title)}) Tj ET`);
  commands.push(`BT /F1 11 Tf 0.15 0.25 0.35 rg 90 390 Td (${sanitizePdfText(subtitle)}) Tj ET`);
  commands.push(
    `BT /F2 11 Tf 0.09 0.42 0.53 rg 90 368 Td (${sanitizePdfText(
      `Distinction / Standing: ${ranking}   |   Category: ${category}   |   Session: ${awardYear}`
    )}) Tj ET`
  );

  // Verification Badge Box
  commands.push('0.93 0.98 0.95 rg 156 275 300 46 re f');
  commands.push('0.16 0.65 0.42 RG 1 w 156 275 300 46 re S');
  commands.push('BT /F2 11 Tf 0.08 0.48 0.28 rg 195 301 Td (VERIFIED DIGITAL INSTITUTIONAL CREDENTIAL) Tj ET');
  commands.push('BT /F1 9 Tf 0.20 0.45 0.32 rg 182 285 Td (Authenticated by CASPA Examination & Honors Registry) Tj ET');

  // Signatures
  commands.push('0.40 0.45 0.52 RG 1 w 80 155 180 0 re S');
  commands.push('BT /F2 11 Tf 0.08 0.16 0.30 rg 115 138 Td (Dr. Arthur Pendelton) Tj ET');
  commands.push('BT /F1 9 Tf 0.40 0.45 0.52 rg 122 124 Td (Principal & Head of Institution) Tj ET');

  commands.push('0.40 0.45 0.52 RG 1 w 352 155 180 0 re S');
  commands.push('BT /F2 11 Tf 0.08 0.16 0.30 rg 388 138 Td (Prof. Eleanor Vance-Sterling) Tj ET');
  commands.push('BT /F1 9 Tf 0.40 0.45 0.52 rg 392 124 Td (Dean of Academic Excellence) Tj ET');

  // Footer
  commands.push(
    `BT /F1 8 Tf 0.45 0.50 0.58 rg 135 60 Td (${sanitizePdfText(
      `Issued by CASPA Academic Portal • Verification Code: ${credentialId} • Official Copy`
    )}) Tj ET`
  );

  const blob = buildPdfBlob(commands.join('\n'));
  triggerBlobDownload(blob, `Certificate_${title}_${studentName}.pdf`);
};

export interface SubjectMarkRow {
  subject: string;
  teacher: string;
  score: number;
  total: number;
  grade: string;
  feedback: string;
}

export const downloadReportCardPdf = (
  studentName: string,
  grade: string,
  subjectMarks: SubjectMarkRow[]
): void => {
  const commands: string[] = [];

  // Banner
  commands.push('0.09 0.42 0.53 rg 36 700 540 58 re f');
  commands.push('BT /F2 16 Tf 1 1 1 rg 48 734 Td (CASPA ACADEMY - OFFICIAL ACADEMIC REPORT CARD) Tj ET');
  commands.push('BT /F1 10 Tf 0.90 0.96 0.98 rg 48 714 Td (Fall Term Examination & Coursework Evaluation  |  Academic Year 2025-2026) Tj ET');

  // Student Summary Box
  commands.push('0.95 0.97 0.98 rg 36 640 540 48 re f');
  commands.push('0.82 0.86 0.90 RG 1 w 36 640 540 48 re S');
  commands.push(`BT /F2 11 Tf 0.08 0.16 0.30 rg 48 668 Td (${sanitizePdfText(`Student Name: ${studentName}`)}) Tj ET`);
  commands.push(`BT /F1 10 Tf 0.25 0.32 0.42 rg 48 650 Td (${sanitizePdfText(`Class / Roll: ${grade}`)}) Tj ET`);
  commands.push('BT /F2 11 Tf 0.08 0.48 0.28 rg 340 668 Td (Cumulative GPA: 3.90 / 4.00  (Rank #2)) Tj ET');
  commands.push('BT /F2 10 Tf 0.09 0.42 0.53 rg 340 650 Td (Aggregate Score: 95.6%  |  Result: DISTINCTION) Tj ET');

  // Table Header
  let y = 605;
  commands.push('0.08 0.16 0.30 rg 36 598 540 24 re f');
  commands.push('BT /F2 10 Tf 1 1 1 rg 46 606 Td (SUBJECT) Tj ET');
  commands.push('BT /F2 10 Tf 1 1 1 rg 185 606 Td (INSTRUCTOR) Tj ET');
  commands.push('BT /F2 10 Tf 1 1 1 rg 305 606 Td (SCORE) Tj ET');
  commands.push('BT /F2 10 Tf 1 1 1 rg 370 606 Td (GRADE) Tj ET');
  commands.push('BT /F2 10 Tf 1 1 1 rg 425 606 Td (REMARKS) Tj ET');

  y = 574;
  for (const row of subjectMarks) {
    commands.push('0.90 0.92 0.95 RG 0.7 w 36 ' + (y - 12) + ' 540 36 re S');
    commands.push(`BT /F2 10 Tf 0.08 0.16 0.30 rg 46 ${y + 6} Td (${sanitizePdfText(row.subject)}) Tj ET`);
    commands.push(`BT /F1 9 Tf 0.30 0.36 0.44 rg 185 ${y + 6} Td (${sanitizePdfText(row.teacher)}) Tj ET`);
    commands.push(`BT /F2 10 Tf 0.08 0.16 0.30 rg 305 ${y + 6} Td (${row.score}/${row.total}) Tj ET`);
    commands.push(`BT /F2 10 Tf 0.09 0.42 0.53 rg 375 ${y + 6} Td (${sanitizePdfText(row.grade)}) Tj ET`);
    commands.push(`BT /F1 8 Tf 0.35 0.40 0.48 rg 46 ${y - 6} Td (${sanitizePdfText(`Feedback: ${row.feedback}`)}) Tj ET`);
    y -= 42;
  }

  commands.push(
    `BT /F1 9 Tf 0.35 0.40 0.48 rg 36 90 Td (${sanitizePdfText(
      `Official Transcript generated for ${studentName} • Verified by Controller of Examinations, CASPA Academy.`
    )}) Tj ET`
  );

  const blob = buildPdfBlob(commands.join('\n'));
  triggerBlobDownload(blob, `Official_Report_Card_${studentName}.pdf`);
};

export const downloadStudyMaterialPdf = (params: {
  title: string;
  subject: string;
  teacher: string;
  format: string;
  studentName?: string;
}): void => {
  downloadClassNotesPdf({
    subject: params.subject,
    periodNumber: 1,
    teacher: params.teacher,
    room: 'Digital Library',
    timeRange: 'Self-Paced Study Resource',
    unitTopic: params.title,
    studentName: params.studentName || 'Elena Vance',
    grade: 'Grade 9B',
    day: 'Fall Term',
    isAiGenerated: false,
  });
};
