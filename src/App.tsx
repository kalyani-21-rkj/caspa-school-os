import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WebLoginPage } from './components/auth/WebLoginPage';
import { WebRegisterPage } from './components/auth/WebRegisterPage';
import { PortalRoleLoginPage } from './components/auth/PortalRoleLoginPage';
import { Header } from './components/Header';
import { RoleType } from './types';

// Admin Module Components
import { AdminFixedSidebar } from './components/admin/AdminFixedSidebar';
import { AdminMobileFooterNav } from './components/admin/AdminMobileFooterNav';
import { AdminDashboardScreen } from './components/admin/AdminDashboardScreen';
import { AdminStudentsScreen } from './components/admin/AdminStudentsScreen';
import { AdminStaffScreen } from './components/admin/AdminStaffScreen';
import { AdminAcademicsScreen } from './components/admin/AdminAcademicsScreen';
import { AdminFinanceScreen } from './components/admin/AdminFinanceScreen';
import { AdminSafetyScreen } from './components/admin/AdminSafetyScreen';
import { AdminTransportScreen } from './components/admin/AdminTransportScreen';
import { AdminApprovalsScreen } from './components/admin/AdminApprovalsScreen';
import { AdminSettingsScreen } from './components/admin/AdminSettingsScreen';

// Teacher Module Components
import { TeacherFixedSidebar } from './components/teacher/TeacherFixedSidebar';
import { TeacherMobileFooterNav } from './components/teacher/TeacherMobileFooterNav';
import { TeacherDashboardScreen } from './components/teacher/TeacherDashboardScreen';
import { TeacherClassesScreen } from './components/teacher/TeacherClassesScreen';
import { TeacherAttendanceScreen } from './components/teacher/TeacherAttendanceScreen';
import { TeacherTasksScreen } from './components/teacher/TeacherTasksScreen';
import { TeacherMarksScreen } from './components/teacher/TeacherMarksScreen';
import { TeacherParentCommsScreen } from './components/teacher/TeacherParentCommsScreen';

// Student Module Components
import { StudentFixedSidebar } from './components/student/StudentFixedSidebar';
import { StudentMobileFooterNav } from './components/student/StudentMobileFooterNav';
import { StudentDashboardScreen } from './components/student/StudentDashboardScreen';
import { StudentTimetableScreen } from './components/student/StudentTimetableScreen';
import { StudentTasksScreen } from './components/student/StudentTasksScreen';
import { StudentStudyMaterialScreen } from './components/student/StudentStudyMaterialScreen';
import { StudentAttendanceScreen } from './components/student/StudentAttendanceScreen';
import { StudentAchievementsScreen } from './components/student/StudentAchievementsScreen';
import { StudentBusScreen } from './components/student/StudentBusScreen';

// Principal Module Components
import { PrincipalFixedSidebar } from './components/principal/PrincipalFixedSidebar';
import { PrincipalMobileFooterNav } from './components/principal/PrincipalMobileFooterNav';
import { PrincipalDashboardScreen } from './components/principal/PrincipalDashboardScreen';
import { PrincipalAcademicsScreen } from './components/principal/PrincipalAcademicsScreen';
import { PrincipalStaffScreen } from './components/principal/PrincipalStaffScreen';
import { PrincipalFinanceScreen } from './components/principal/PrincipalFinanceScreen';
import { PrincipalSafetyScreen } from './components/principal/PrincipalSafetyScreen';
import { PrincipalOperationsScreen } from './components/principal/PrincipalOperationsScreen';
import { PrincipalApprovalsScreen } from './components/principal/PrincipalApprovalsScreen';

// Vice Principal Module Components (Images 1-7)
import { VicePrincipalFixedSidebar } from './components/vice-principal/VicePrincipalFixedSidebar';
import { VicePrincipalMobileFooterNav } from './components/vice-principal/VicePrincipalMobileFooterNav';
import { VicePrincipalDashboardScreen } from './components/vice-principal/VicePrincipalDashboardScreen';
import { VicePrincipalTeachersScreen } from './components/vice-principal/VicePrincipalTeachersScreen';
import { VicePrincipalAcademicsScreen } from './components/vice-principal/VicePrincipalAcademicsScreen';
import { VicePrincipalTimetableScreen } from './components/vice-principal/VicePrincipalTimetableScreen';
import { VicePrincipalMoreScreen } from './components/vice-principal/VicePrincipalMoreScreen';
import { VicePrincipalLessonPlansScreen } from './components/vice-principal/VicePrincipalLessonPlansScreen';
import { VicePrincipalExaminationsScreen } from './components/vice-principal/VicePrincipalExaminationsScreen';

// Parent Module Components (Images 1-7)
import { ParentFixedSidebar } from './components/parent/ParentFixedSidebar';
import { ParentMobileFooterNav } from './components/parent/ParentMobileFooterNav';
import { ParentHomeScreen } from './components/parent/ParentHomeScreen';
import { ParentChildScreen } from './components/parent/ParentChildScreen';
import { ParentFeesScreen } from './components/parent/ParentFeesScreen';
import { ParentAttendanceScreen } from './components/parent/ParentAttendanceScreen';
import { ParentNoticesScreen } from './components/parent/ParentNoticesScreen';
import { ParentTransportScreen } from './components/parent/ParentTransportScreen';
import { ParentCertificatesScreen } from './components/parent/ParentCertificatesScreen';
import { ParentMessagesScreen } from './components/parent/ParentMessagesScreen';

// Shared Components
import { DashboardView } from './components/DashboardView';
import { CaspaAiView } from './components/CaspaAiView';
import { CodeExportModal } from './components/CodeExportModal';
import { CheckCircle2, Shield } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    isAuthenticated,
    authView,
    setAuthView,
    canAccessAllModules,
    currentRole,
    setRole,
    activeTab,
    setActiveTab,
    toastMessage,
  } = useApp();

  const [isCodeExportOpen, setIsCodeExportOpen] = useState(false);

  // If unauthenticated, show Login, Role Portal Sign-In, or Register
  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <WebRegisterPage
          onNavigateToLogin={() => setAuthView('login')}
          onNavigateToPortal={() => setAuthView('portal')}
        />
      );
    }
    if (authView === 'portal') {
      return (
        <PortalRoleLoginPage
          onNavigateToWebLogin={() => setAuthView('login')}
          onNavigateToRegister={() => setAuthView('register')}
        />
      );
    }
    return (
      <WebLoginPage
        onNavigateToRegister={() => setAuthView('register')}
        onNavigateToPortal={() => setAuthView('portal')}
      />
    );
  }

  const isAdmin = currentRole === 'ADMIN';
  const isStudent = currentRole === 'STUDENT';
  const isTeacher = currentRole === 'TEACHER';
  const isPrincipal = currentRole === 'PRINCIPAL' || currentRole === 'SUPER_ADMIN';
  const isVicePrincipal = currentRole === 'VICE_PRINCIPAL';
  const isParent = currentRole === 'PARENT';

  const adminModuleTabs: { role: RoleType; label: string }[] = [
    { role: 'ADMIN', label: 'Admin Module' },
    { role: 'PRINCIPAL', label: 'Principal Module' },
    { role: 'VICE_PRINCIPAL', label: 'Vice Principal Module' },
    { role: 'TEACHER', label: 'Teacher Module' },
    { role: 'PARENT', label: 'Parent Module' },
    { role: 'STUDENT', label: 'Student Module' },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#F8FAFC] font-sans text-bodyText antialiased">
      {/* Top Application Header */}
      <Header
        onOpenCodeExport={() => setIsCodeExportOpen(true)}
        onOpenCaspa={() => setActiveTab('caspa')}
      />

      {/* Admin Master All-Module Bar (Only visible when logged in as Admin) */}
      {canAccessAllModules && (
        <div className="bg-[#092238] border-b border-[#16426a] px-4 py-1.5 flex items-center justify-between overflow-x-auto scrollbar-none shrink-0">
          <div className="flex items-center space-x-2 text-[11px] text-cyan-300 font-bold shrink-0 mr-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin All-Module Authorization:</span>
          </div>
          <div className="flex items-center space-x-1.5">
            {adminModuleTabs.map((m) => (
              <button
                key={m.role}
                onClick={() => setRole(m.role)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold transition shrink-0 ${
                  currentRole === m.role
                    ? 'bg-teal text-white shadow-2xs'
                    : 'bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex min-h-0 w-full overflow-hidden relative">
        {/* Desktop Fixed Non-Sliding Sidebar (strictly hidden on mobile md:flex) */}
        {isAdmin ? (
          <AdminFixedSidebar
            currentTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        ) : isPrincipal ? (
          <PrincipalFixedSidebar
            currentTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        ) : isVicePrincipal ? (
          <VicePrincipalFixedSidebar
            currentTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        ) : isParent ? (
          <ParentFixedSidebar
            currentTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        ) : isStudent ? (
          <StudentFixedSidebar
            currentTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        ) : (
          <TeacherFixedSidebar
            currentTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Dynamic Main Workspace Container - right side as it is with independent scrolling */}
        <main className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-6 lg:p-8 pb-24 md:pb-8 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto w-full">
            {/* ================= ADMIN MODULE SCREENS ================= */}
            {isAdmin && (
              <>
                {activeTab === 'home' && (
                  <AdminDashboardScreen onNavigate={(tab) => setActiveTab(tab)} />
                )}
                {activeTab === 'students' && <AdminStudentsScreen />}
                {activeTab === 'staff' && <AdminStaffScreen />}
                {activeTab === 'academics' && <AdminAcademicsScreen />}
                {activeTab === 'finance' && <AdminFinanceScreen />}
                {activeTab === 'safety' && <AdminSafetyScreen />}
                {activeTab === 'transport' && <AdminTransportScreen />}
                {activeTab === 'approvals' && <AdminApprovalsScreen />}
                {(activeTab === 'rbac' || activeTab === 'settings') && <AdminSettingsScreen />}
                {activeTab === 'caspa' && <CaspaAiView />}
              </>
            )}

            {/* ================= STUDENT MODULE SCREENS ================= */}
            {isStudent && (
              <>
                {activeTab === 'home' && (
                  <StudentDashboardScreen onNavigate={(tab) => setActiveTab(tab)} />
                )}
                {(activeTab === 'timetable' || activeTab === 'classes') && <StudentTimetableScreen />}
                {activeTab === 'tasks' && <StudentTasksScreen />}
                {(activeTab === 'materials' || activeTab === 'notes') && <StudentStudyMaterialScreen />}
                {activeTab === 'attendance' && <StudentAttendanceScreen />}
                {(activeTab === 'achievements' || activeTab === 'marks') && <StudentAchievementsScreen />}
                {(activeTab === 'transport' || activeTab === 'bus') && <StudentBusScreen />}
                {activeTab === 'caspa' && <CaspaAiView />}
              </>
            )}

            {/* ================= TEACHER MODULE SCREENS ================= */}
            {isTeacher && (
              <>
                {activeTab === 'home' && (
                  <TeacherDashboardScreen onNavigate={(tab) => setActiveTab(tab)} />
                )}
                {activeTab === 'classes' && (
                  <TeacherClassesScreen
                    onTakeAttendance={() => setActiveTab('attendance')}
                    onViewRoster={() => setActiveTab('marks')}
                  />
                )}
                {activeTab === 'attendance' && (
                  <TeacherAttendanceScreen onBack={() => setActiveTab('home')} />
                )}
                {activeTab === 'tasks' && <TeacherTasksScreen />}
                {activeTab === 'marks' && <TeacherMarksScreen />}
                {activeTab === 'comms' && <TeacherParentCommsScreen />}
                {activeTab === 'caspa' && <CaspaAiView />}
              </>
            )}

            {/* ================= PRINCIPAL COMMAND CENTER ================= */}
            {isPrincipal && (
              <>
                {(activeTab === 'home' || activeTab === 'dashboard') && (
                  <PrincipalDashboardScreen onNavigate={(tab) => setActiveTab(tab)} />
                )}
                {activeTab === 'academics' && <PrincipalAcademicsScreen />}
                {activeTab === 'staff' && <PrincipalStaffScreen />}
                {activeTab === 'finance' && <PrincipalFinanceScreen />}
                {activeTab === 'safety' && <PrincipalSafetyScreen />}
                {activeTab === 'operations' && <PrincipalOperationsScreen />}
                {activeTab === 'approvals' && <PrincipalApprovalsScreen />}
                {activeTab === 'caspa' && <CaspaAiView />}
              </>
            )}

            {/* ================= VICE PRINCIPAL WORKSPACE (Images 1-7) ================= */}
            {isVicePrincipal && (
              <>
                {(activeTab === 'home' || activeTab === 'dashboard') && (
                  <VicePrincipalDashboardScreen onNavigate={(tab) => setActiveTab(tab)} />
                )}
                {activeTab === 'academics' && <VicePrincipalAcademicsScreen />}
                {activeTab === 'teachers' && <VicePrincipalTeachersScreen />}
                {activeTab === 'timetable' && (
                  <VicePrincipalTimetableScreen onBack={() => setActiveTab('dashboard')} />
                )}
                {activeTab === 'lesson-plans' && (
                  <VicePrincipalLessonPlansScreen onBack={() => setActiveTab('dashboard')} />
                )}
                {activeTab === 'examinations' && (
                  <VicePrincipalExaminationsScreen onBack={() => setActiveTab('dashboard')} />
                )}
                {activeTab === 'more' && (
                  <VicePrincipalMoreScreen onNavigate={(tab) => setActiveTab(tab)} />
                )}
                {activeTab === 'reports' && <VicePrincipalAcademicsScreen />}
                {activeTab === 'caspa' && <CaspaAiView />}
              </>
            )}

            {/* ================= PARENT MODULE WORKSPACE (Images 1-7) ================= */}
            {isParent && (
              <>
                {(activeTab === 'home' || activeTab === 'dashboard') && (
                  <ParentHomeScreen onNavigate={(tab) => setActiveTab(tab)} />
                )}
                {activeTab === 'child' && <ParentChildScreen />}
                {activeTab === 'fees' && <ParentFeesScreen />}
                {activeTab === 'attendance' && <ParentAttendanceScreen />}
                {activeTab === 'transport' && <ParentTransportScreen />}
                {activeTab === 'notices' && <ParentNoticesScreen />}
                {activeTab === 'certificates' && <ParentCertificatesScreen />}
                {activeTab === 'messages' && <ParentMessagesScreen />}
                {activeTab === 'caspa' && <CaspaAiView />}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Footer Navigation Bar in #0E2C48 (no sidebar on mobile) */}
      {isAdmin && <AdminMobileFooterNav />}
      {isPrincipal && <PrincipalMobileFooterNav />}
      {isVicePrincipal && <VicePrincipalMobileFooterNav />}
      {isParent && <ParentMobileFooterNav />}
      {isStudent && <StudentMobileFooterNav />}
      {isTeacher && <TeacherMobileFooterNav />}

      {/* Code Specifications & Architecture Modal */}
      <CodeExportModal
        isOpen={isCodeExportOpen}
        onClose={() => setIsCodeExportOpen(false)}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 md:bottom-5 right-5 z-50 bg-[#0E2C48] text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center space-x-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
