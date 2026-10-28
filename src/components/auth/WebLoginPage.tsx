import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Shield,
  CheckCircle2,
  UserPlus,
  Mail,
  Lock,
  AlertCircle,
  Sparkles,
  ArrowRight,
  KeyRound,
  Building2,
  GraduationCap,
  Users,
  BookOpen,
  UserCheck,
  Briefcase,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoleType } from '../../types';
import { PortalRoleLoginPage } from './PortalRoleLoginPage';

interface WebLoginPageProps {
  onNavigateToRegister: () => void;
  onNavigateToPortal?: () => void;
}

export const WebLoginPage: React.FC<WebLoginPageProps> = ({
  onNavigateToRegister,
  onNavigateToPortal,
}) => {
  const { login, showToast } = useApp();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleType | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const MIN_PASSWORD_LENGTH = 5;

  const isEmailValid = emailOrUsername.trim().length > 0;
  const isPasswordValid = isOtpMode
    ? otpCode.trim().length >= 4
    : password.length >= MIN_PASSWORD_LENGTH;

  const emailError =
    (emailTouched || submitAttempted) && !isEmailValid
      ? 'Please fill in your email or username'
      : null;

  const passwordError =
    !isOtpMode && (passwordTouched || submitAttempted)
      ? password.length === 0
        ? 'Please enter your password'
        : password.length < MIN_PASSWORD_LENGTH
        ? `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
        : null
      : isOtpMode && submitAttempted && otpCode.trim().length < 4
      ? 'Please enter a valid OTP code'
      : null;

  const roleCredentials: {
    role: RoleType;
    label: string;
    email: string;
    defaultPass: string;
    moduleDesc: string;
    icon: React.ReactNode;
  }[] = [
    {
      role: 'ADMIN',
      label: 'Admin',
      email: 'admin@caspaschool.org',
      defaultPass: 'admin123',
      moduleDesc: 'All 6 Modules Access',
      icon: <Shield className="w-3.5 h-3.5 text-[#176B87]" />,
    },
    {
      role: 'PRINCIPAL',
      label: 'Principal',
      email: 'principal@caspaschool.org',
      defaultPass: 'principal123',
      moduleDesc: 'Executive & Governance',
      icon: <Building2 className="w-3.5 h-3.5 text-indigo-600" />,
    },
    {
      role: 'VICE_PRINCIPAL',
      label: 'Vice Principal',
      email: 's.jenkins@caspa.edu',
      defaultPass: 'vp12345',
      moduleDesc: 'Academic Operations',
      icon: <Briefcase className="w-3.5 h-3.5 text-purple-600" />,
    },
    {
      role: 'TEACHER',
      label: 'Teacher',
      email: 'teacher@caspaschool.org',
      defaultPass: 'teacher123',
      moduleDesc: 'Classes & Grading',
      icon: <BookOpen className="w-3.5 h-3.5 text-emerald-600" />,
    },
    {
      role: 'PARENT',
      label: 'Parent',
      email: 'anita.sharma@caspaschool.org',
      defaultPass: 'parent123',
      moduleDesc: 'Ward Progress & Fees',
      icon: <Users className="w-3.5 h-3.5 text-amber-600" />,
    },
    {
      role: 'STUDENT',
      label: 'Student',
      email: 'student@caspaschool.org',
      defaultPass: 'student123',
      moduleDesc: 'Timetable & Homework',
      icon: <GraduationCap className="w-3.5 h-3.5 text-sky-600" />,
    },
  ];

  const handleSelectRoleCredential = (cred: (typeof roleCredentials)[0]) => {
    setEmailOrUsername(cred.email);
    if (password.length < MIN_PASSWORD_LENGTH) {
      setPassword(cred.defaultPass);
    }
    setSelectedRole(cred.role);
    setEmailTouched(false);
    setPasswordTouched(false);
    setSubmitAttempted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!emailOrUsername.trim()) {
      showToast('Please fill in your email or username');
      return;
    }

    if (!isOtpMode) {
      if (!password) {
        showToast('Please enter your password');
        return;
      }
      if (password.length < MIN_PASSWORD_LENGTH) {
        showToast(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
        return;
      }
    } else {
      if (otpCode.trim().length < 4) {
        showToast('Please enter a valid OTP code');
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      login(emailOrUsername.trim(), password, selectedRole);
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      {/* MOBILE LOGIN PAGE */}
      <div className="md:hidden">
        <PortalRoleLoginPage
          onNavigateToWebLogin={onNavigateToPortal}
          onNavigateToRegister={onNavigateToRegister}
        />
      </div>

      {/* DESKTOP WEB LOGIN PAGE: Minimal Clean Split-Screen Layout */}
      <div className="hidden md:flex min-h-screen w-full flex-row bg-[#F8FAFC] font-sans text-bodyText">
        {/* Left Panel: Deep Navy Architectural Showcase */}
        <div className="md:w-[46%] lg:w-[48%] bg-gradient-to-br from-[#071B2F] via-[#0E2C48] to-[#176B87] text-white p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden shrink-0">
          {/* Decorative Ambient Glows & Radar Rings */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#176B87]/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-20 w-[420px] h-[420px] rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none flex items-center justify-start -left-32">
            <div className="w-[340px] h-[340px] rounded-full border border-white/10 absolute left-16" />
            <div className="w-[480px] h-[480px] rounded-full border border-white/[0.07] absolute left-2" />
            <div className="w-[620px] h-[620px] rounded-full border border-white/[0.05] absolute -left-12" />
          </div>

          {/* Top Brand Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg shadow-black/20">
                <img
                  src="/assets/aistudio/caspa_logo_7f187f6a.png"
                  alt="CASPA Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block leading-none">
                  CASPA School OS
                </span>
                <span className="text-[10px] text-sky-200/80 font-semibold tracking-wider uppercase">
                  Unified Institutional Cloud
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold text-sky-100 tracking-wide">
              v4.8 Enterprise
            </span>
          </div>

          {/* Center Hero Value Proposition */}
          <div className="relative z-10 max-w-lg my-auto py-8 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-sky-400/15 border border-sky-300/25 text-sky-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>Next-Gen K-12 Academic &amp; Governance ERP</span>
            </div>

            <h1 className="text-3xl lg:text-[40px] font-extrabold tracking-tight text-white leading-[1.15]">
              Everything your school needs, in one intelligent command center.
            </h1>

            <p className="text-sm text-slate-200/90 font-normal leading-relaxed">
              Synchronize master timetables, live classroom attendance, homework workflows, staff payroll, and executive approvals across every campus role in real time.
            </p>

            {/* Minimal Feature Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/15 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">
                    Role Synchronization
                  </span>
                  <UserCheck className="w-4 h-4 text-emerald-300" />
                </div>
                <p className="text-xs font-bold text-white">6 Dedicated Portals</p>
                <p className="text-[11px] text-slate-300">
                  Admin, Principal, VP, Teacher, Parent &amp; Student
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/15 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sky-200 uppercase tracking-wider">
                    Security Standard
                  </span>
                  <Shield className="w-4 h-4 text-sky-300" />
                </div>
                <p className="text-xs font-bold text-white">Strict RBAC &amp; Audit</p>
                <p className="text-[11px] text-slate-300">
                  End-to-end encrypted academic records
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer Note */}
          <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-slate-300/80 font-semibold border-t border-white/10 pt-4">
            <span>POWERED BY ERP COMMUNITY</span>
            <span>ISO 27001 CERTIFIED CAMPUS CLOUD</span>
          </div>
        </div>

        {/* Right Panel: Minimal Clean Authentication Card */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-10 overflow-y-auto">
          <div className="w-full max-w-[420px] bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-7 lg:p-8 my-auto">
            {/* Top Logo & Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-extrabold text-[#176B87] uppercase tracking-wider block">
                  WELCOME BACK
                </span>
                <h2 className="text-2xl font-extrabold text-[#0E2C48] tracking-tight mt-0.5">
                  Sign in to your workspace
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  One School. One Platform. Complete Visibility.
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 p-1.5 flex items-center justify-center shrink-0">
                <img
                  src="/assets/aistudio/caspa_logo_7f187f6a.png"
                  alt="CASPA School OS"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
              {/* Email or Username */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block text-xs">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail
                    className={`w-4 h-4 absolute left-3.5 top-3 transition ${
                      emailError
                        ? 'text-rose-500'
                        : isEmailValid
                        ? 'text-[#176B87]'
                        : 'text-slate-400'
                    }`}
                  />
                  <input
                    type="text"
                    value={emailOrUsername}
                    onBlur={() => setEmailTouched(true)}
                    onChange={(e) => {
                      setEmailOrUsername(e.target.value);
                      setSelectedRole(undefined);
                    }}
                    placeholder="principal@caspaschool.org"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition text-xs ${
                      emailError
                        ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                        : 'border-slate-200 focus:ring-[#176B87]/20 focus:border-[#176B87]'
                    }`}
                  />
                </div>
                {emailError && (
                  <p className="flex items-center space-x-1 text-rose-600 text-[11px] font-medium pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{emailError}</span>
                  </p>
                )}
              </div>

              {/* Password with Eye Toggle */}
              {!isOtpMode ? (
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block text-xs">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className={`w-4 h-4 absolute left-3.5 top-3 transition ${
                        passwordError
                          ? 'text-rose-500'
                          : isPasswordValid
                          ? 'text-[#176B87]'
                          : 'text-slate-400'
                      }`}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onBlur={() => setPasswordTouched(true)}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password (min. 5 characters)"
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition text-xs ${
                        passwordError
                          ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                          : 'border-slate-200 focus:ring-[#176B87]/20 focus:border-[#176B87]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="flex items-center space-x-1 text-rose-600 text-[11px] font-medium pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{passwordError}</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block text-xs">
                    One-Time Password (OTP)
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter 6-digit verification code"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#176B87] text-xs font-mono tracking-widest"
                    />
                  </div>
                  {passwordError && (
                    <p className="flex items-center space-x-1 text-rose-600 text-[11px] font-medium pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{passwordError}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#176B87] focus:ring-[#176B87]"
                  />
                  <span className="text-[11px] font-medium text-slate-600">
                    Keep me signed in
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    showToast('Password reset link sent to your registered school email')
                  }
                  className="text-[11px] font-bold text-[#176B87] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-[#0E2C48] to-[#176B87] hover:from-[#0A2136] hover:to-[#125870] text-white font-bold rounded-xl text-xs transition shadow-md shadow-[#176B87]/20 flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Actions Row */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="py-2.5 px-3 bg-[#E5F1F5] hover:bg-[#d5e8ef] border border-[#176B87]/30 text-[#176B87] font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Create Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOtpMode(!isOtpMode);
                    setSubmitAttempted(false);
                  }}
                  className="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#176B87]" />
                  <span>{isOtpMode ? 'Use Password' : 'Login with OTP'}</span>
                </button>
              </div>
            </form>

            {/* Quick Role Selector */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Role Credentials
                </span>
                <Shield className="w-3.5 h-3.5 text-[#176B87]" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {roleCredentials.map((cred) => {
                  const isSelected =
                    emailOrUsername.trim().toLowerCase() === cred.email.toLowerCase();
                  return (
                    <button
                      key={cred.role}
                      type="button"
                      onClick={() => handleSelectRoleCredential(cred)}
                      className={`p-2 rounded-xl border text-left transition ${
                        isSelected
                          ? 'bg-[#E6F3F7] border-[#176B87] text-[#0E2C48]'
                          : 'bg-slate-50/70 border-slate-200/90 text-slate-700 hover:bg-white hover:border-[#176B87]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 min-w-0">
                          {cred.icon}
                          <span className="font-bold text-[11px] truncate">
                            {cred.label}
                          </span>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-3 h-3 text-[#176B87] shrink-0" />
                        )}
                      </div>
                      <span className="text-[9px] text-slate-500 block truncate mt-0.5">
                        {cred.moduleDesc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
