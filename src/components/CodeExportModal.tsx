import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  X,
  FileCode,
  Terminal,
  Database,
  Smartphone,
  Server,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'mobile' | 'prisma' | 'rbac' | 'server' | 'instructions'>('mobile');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const CODE_SNIPPETS = {
    mobile: `// mobile/src/navigation/RootNavigator.tsx (React Native / Expo)
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, BookOpen, CheckSquare, Sparkles, User, Bus, DollarSign } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

// CASPA Strict Design Tokens (Section 17)
const THEME = {
  navy: '#123B5D',
  teal: '#176B87',
  purple: '#5B3FA3',
  surface: '#F8FAFC',
  text: '#25313C',
};

export default function MobileApp() {
  const [userRole, setUserRole] = useState<'STUDENT' | 'PARENT' | 'TEACHER'>('STUDENT');

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: userRole === 'STUDENT' ? THEME.teal : THEME.navy,
          headerStyle: { backgroundColor: THEME.navy },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {userRole === 'STUDENT' ? (
          <>
            <Tab.Screen name="Home" component={StudentDashboard} />
            <Tab.Screen name="Classes" component={StudentClassesScreen} />
            <Tab.Screen name="Tasks" component={StudentTasksScreen} />
            <Tab.Screen name="CASPA" component={CaspaTutorScreen} />
            <Tab.Screen name="Profile" component={StudentProfileScreen} />
          </>
        ) : (
          <>
            <Tab.Screen name="Home" component={TeacherDashboard} />
            <Tab.Screen name="Attendance" component={TeacherAttendanceScreen} />
            <Tab.Screen name="Classes" component={TeacherClassesScreen} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}`,
    prisma: `// backend/prisma/schema.prisma (PostgreSQL & Multi-Tenant RBAC)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum RoleType {
  SUPER_ADMIN
  PRINCIPAL
  VICE_PRINCIPAL
  ADMIN
  TEACHER
  STUDENT
  PARENT
  HR
  ACCOUNTS
  ADMISSION
  TRANSPORT
  WARDEN
  SAFETY_OFFICER
  COUNSELLOR
}

enum RecordScope {
  OWN
  ASSIGNED
  DEPARTMENT
  CLASS_SECTION
  CAMPUS
  SCHOOL
  ORGANIZATION
}

model SafetyCase {
  id             String         @id @default(uuid())
  caseNumber     String         @unique
  category       String         // Anti-ragging, Bullying, Child Safety
  risk           String         // CRITICAL, HIGH, MEDIUM, LOW
  status         String         // REPORTED, UNDER_INVESTIGATION, RESOLVED
  isAnonymous    Boolean        @default(false)
  reporterId     String?
  campusId       String
  description    String
  slaDeadline    DateTime
  createdAt      DateTime       @default(now())
}

model ApprovalTask {
  id           String    @id @default(uuid())
  title        String
  module       String    // PURCHASE, LEAVE, EVENT, HOSTEL
  requester    String
  amount       Float?
  currentStage String
  status       String    // PENDING, APPROVED, REJECTED
  slaDeadline  DateTime
  createdAt    DateTime  @default(now())
}`,
    rbac: `// backend/src/middleware/rbac.ts (Dynamic Dynamic RBAC Engine)
import { Request, Response, NextFunction } from 'express';
import { PrismaClient, RecordScope } from '@prisma/client';

const prisma = new PrismaClient();

export const checkPermission = (
  moduleName: string,
  action: 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export',
  requiredScope: RecordScope = RecordScope.OWN
) => {
  return async (req: any, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: 'Authentication required' });
    if (req.user.roleType === 'SUPER_ADMIN') return next();

    const perm = await prisma.permission.findFirst({
      where: {
        userId: req.user.id,
        module: moduleName,
        ...(action === 'view' && { canView: true }),
        ...(action === 'create' && { canCreate: true }),
        ...(action === 'approve' && { canApprove: true }),
      },
    });

    if (!perm) {
      return res.status(403).json({ error: 'Access Denied: Insufficient Role Clearance' });
    }

    next();
  };
};`,
    server: `// backend/src/server.ts (Node.js & Express REST Backend)
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { checkPermission } from './middleware/rbac';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Principal Executive KPIs
app.get('/api/v1/dashboard/principal', checkPermission('DASHBOARD', 'view'), async (req, res) => {
  const studentCount = await prisma.student.count();
  const alertsCount = await prisma.safetyCase.count({ where: { status: 'REPORTED' } });
  res.json({ totalStudents: studentCount, activeSafetyAlerts: alertsCount });
});

// Confidential Incident Reporting
app.post('/api/v1/safety/incidents', async (req, res) => {
  const { category, risk, description, isAnonymous } = req.body;
  const incident = await prisma.safetyCase.create({
    data: {
      caseNumber: \`SAFE-\${Date.now().toString().slice(-6)}\`,
      category,
      risk,
      description,
      isAnonymous: Boolean(isAnonymous),
      campusId: 'campus-01',
      slaDeadline: new Date(Date.now() + 7200000), // 2 hours
    },
  });
  res.status(201).json(incident);
});

app.listen(5000, () => console.log('CASPA School OS API running on port 5000'));`,
    instructions: `### Quick Setup & Deployment Guide

1. Backend (Node.js + PostgreSQL + Prisma):
   cd backend
   npm install express cors prisma @prisma/client typescript ts-node
   npx prisma db push
   npx ts-node src/server.ts
   # API listening at http://localhost:5000

2. Android App (React Native / Expo):
   cd mobile
   npx create-expo-app . --template blank-typescript
   npm install @react-navigation/native @react-navigation/bottom-tabs lucide-react-native react-native-screens
   npx expo start
   # Press 'a' to run in Android Emulator or scan QR with Expo Go

3. Web Command Center (React + Tailwind CSS):
   cd web
   npm install
   npm run dev
   # Accessible at http://localhost:3000`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab]);
    setCopied(true);
    showToast('Code snippet copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full border border-fieldBorder overflow-hidden flex flex-col h-[650px] animate-in fade-in zoom-in-95 duration-100">
        {/* Header */}
        <div className="p-4 bg-navy text-white flex items-center justify-between border-b border-navy-dark">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-teal-light" />
            <div>
              <h3 className="font-bold text-sm">Full-Stack Codebase &amp; Architecture Specs</h3>
              <p className="text-[11px] text-slate-400">
                Ready-to-run React Native (Android), Node.js API &amp; PostgreSQL Prisma Schemas
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal hover:bg-teal-light text-white text-xs font-semibold transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 text-base">
              ✕
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="bg-surface px-4 py-2 border-b border-fieldBorder flex items-center space-x-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'mobile' ? 'bg-white text-navy shadow-xs font-semibold' : 'text-slate-600 hover:text-navy'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-teal" />
            <span>React Native (Android)</span>
          </button>

          <button
            onClick={() => setActiveTab('prisma')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'prisma' ? 'bg-white text-navy shadow-xs font-semibold' : 'text-slate-600 hover:text-navy'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-skyBlue" />
            <span>Prisma Schema (PostgreSQL)</span>
          </button>

          <button
            onClick={() => setActiveTab('rbac')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'rbac' ? 'bg-white text-navy shadow-xs font-semibold' : 'text-slate-600 hover:text-navy'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-caspaPurple" />
            <span>RBAC Middleware</span>
          </button>

          <button
            onClick={() => setActiveTab('server')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'server' ? 'bg-white text-navy shadow-xs font-semibold' : 'text-slate-600 hover:text-navy'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-caspaSuccess" />
            <span>Express Node.js Server</span>
          </button>

          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'instructions' ? 'bg-white text-navy shadow-xs font-semibold' : 'text-slate-600 hover:text-navy'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-slate-700" />
            <span>Run &amp; Deploy Guide</span>
          </button>
        </div>

        {/* Code View Area */}
        <div className="flex-1 p-4 bg-slate-950 overflow-y-auto">
          <pre className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre selection:bg-teal selection:text-white">
            {CODE_SNIPPETS[activeTab]}
          </pre>
        </div>
      </div>
    </div>
  );
};
