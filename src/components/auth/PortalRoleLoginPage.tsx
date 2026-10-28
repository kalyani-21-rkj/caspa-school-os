import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Smartphone,
  UserPlus,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoleType } from '../../types';

interface PortalRoleLoginPageProps {
  onNavigateToWebLogin?: () => void;
  onNavigateToRegister: () => void;
}

type PrimaryTab = 'STUDENT' | 'PARENT' | 'TEACHER' | 'STAFF';

export const PortalRoleLoginPage: React.FC<PortalRoleLoginPageProps> = ({
  onNavigateToRegister,
}) => {
  const { login, showToast } = useApp();

  const [primaryTab, setPrimaryTab] = useState<PrimaryTab>('STUDENT');
  const [staffSubRole, setStaffSubRole] = useState<'PRINCIPAL' | 'VICE_PRINCIPAL' | 'ADMIN'>('PRINCIPAL');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [idTouched, setIdTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const MIN_PASSWORD_LENGTH = 5;

  const effectiveRole: RoleType =
    primaryTab === 'STAFF' ? staffSubRole : primaryTab;

  const roleConfig: Record<
    RoleType,
    { label: string; placeholder: string; defaultId: string; defaultPass: string }
  > = {
    STUDENT: {
      label: 'Email or Student ID',
      placeholder: 'e.g. student@caspaschool.org',
      defaultId: 'student@caspaschool.org',
      defaultPass: 'student123',
    },
    PARENT: {
      label: 'Email or Parent ID',
      placeholder: 'e.g. anita.sharma@caspaschool.org',
      defaultId: 'anita.sharma@caspaschool.org',
      defaultPass: 'parent123',
    },
    TEACHER: {
      label: 'Email or Teacher ID',
      placeholder: 'e.g. teacher@caspaschool.org',
      defaultId: 'teacher@caspaschool.org',
      defaultPass: 'teacher123',
    },
    PRINCIPAL: {
      label: 'Email or Principal ID',
      placeholder: 'e.g. principal@caspaschool.org',
      defaultId: 'principal@caspaschool.org',
      defaultPass: 'principal123',
    },
    VICE_PRINCIPAL: {
      label: 'Email or VP Staff ID',
      placeholder: 'e.g. s.jenkins@caspa.edu',
      defaultId: 's.jenkins@caspa.edu',
      defaultPass: 'vp12345',
    },
    ADMIN: {
      label: 'Email or Admin ID',
      placeholder: 'e.g. admin@caspaschool.org',
      defaultId: 'admin@caspaschool.org',
      defaultPass: 'admin123',
    },
    SUPER_ADMIN: {
      label: 'Email or Admin ID',
      placeholder: 'e.g. admin@caspaschool.org',
      defaultId: 'admin@caspaschool.org',
      defaultPass: 'admin123',
    },
    SAFETY_OFFICER: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. safety@caspaschool.org',
      defaultId: 'safety@caspaschool.org',
      defaultPass: 'safety123',
    },
    COUNSELLOR: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. counsellor@caspaschool.org',
      defaultId: 'counsellor@caspaschool.org',
      defaultPass: 'counsellor123',
    },
    ACCOUNTS: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. accounts@caspaschool.org',
      defaultId: 'accounts@caspaschool.org',
      defaultPass: 'accounts123',
    },
    TRANSPORT: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. transport@caspaschool.org',
      defaultId: 'transport@caspaschool.org',
      defaultPass: 'transport123',
    },
    HOSTEL_WARDEN: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. warden@caspaschool.org',
      defaultId: 'warden@caspaschool.org',
      defaultPass: 'warden123',
    },
  };

  const currentConfig = roleConfig[effectiveRole];

  const isIdValid = identifier.trim().length > 0;

  const idError =
    (idTouched || submitAttempted) && !isIdValid
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

  const handleQuickFillDemo = () => {
    setIdentifier(currentConfig.defaultId);
    if (password.length < MIN_PASSWORD_LENGTH) {
      setPassword(currentConfig.defaultPass);
    }
    setIdTouched(false);
    setPasswordTouched(false);
    setSubmitAttempted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setIdTouched(true);
    setPasswordTouched(true);

    if (!identifier.trim()) {
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
    } else if (otpCode.trim().length < 4) {
      showToast('Please enter a valid OTP code');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(identifier.trim(), password, effectiveRole);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col items-center justify-center px-4 py-8 font-sans text-bodyText">
      {/* Main Sign-In Card */}
      <div className="w-full max-w-[400px] bg-white rounded-3xl border border-slate-200/80 shadow-xl px-6 py-7 sm:px-8 sm:py-8">
        {/* Top Centered CASPA Logo Box */}
        <div className="flex justify-center">
          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-2 inline-flex items-center justify-center">
            <img
              src="/assets/aistudio/caspa_logo_7f187f6a.png"
              alt="CASPA School OS"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            />
          </div>
        </div>

        {/* Welcome Back Heading */}
        <div className="text-center mt-4 space-y-1">
          <h1 className="text-2xl font-extrabold text-[#0E2C48] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-[#64748B]">
            Sign in to continue to your dashboard.
          </p>
        </div>

        {/* SIGN IN AS Selector */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider">
              SIGN IN AS
            </span>
            <button
              type="button"
              onClick={handleQuickFillDemo}
              className="inline-flex items-center space-x-1 text-[10px] font-bold text-[#176B87] hover:underline"
            >
              <Sparkles className="w-3 h-3" />
              <span>Quick Fill {effectiveRole}</span>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-200/70">
            {(
              [
                { id: 'STUDENT', label: 'Student' },
                { id: 'PARENT', label: 'Parent' },
                { id: 'TEACHER', label: 'Teacher' },
                { id: 'STAFF', label: 'Staff' },
              ] as { id: PrimaryTab; label: string }[]
            ).map((tab) => {
              const isSelected = primaryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setPrimaryTab(tab.id);
                    setSubmitAttempted(false);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs transition text-center ${
                    isSelected
                      ? 'bg-[#176B87] text-white font-bold shadow-xs'
                      : 'bg-white border border-slate-200 text-[#64748B] font-medium hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Staff Sub-Role Selector when Staff is active */}
          {primaryTab === 'STAFF' && (
            <div className="mt-2.5 grid grid-cols-3 gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/70">
              {(
                [
                  { role: 'PRINCIPAL', label: 'Principal' },
                  { role: 'VICE_PRINCIPAL', label: 'Vice Principal' },
                  { role: 'ADMIN', label: 'Admin (All)' },
                ] as const
              ).map((sub) => (
                <button
                  key={sub.role}
                  type="button"
                  onClick={() => {
                    setStaffSubRole(sub.role);
                    setSubmitAttempted(false);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition ${
                    staffSubRole === sub.role
                      ? 'bg-[#0E2C48] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          {/* Email or ID Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B] block">
              {currentConfig.label}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={identifier}
                onBlur={() => setIdTouched(true)}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={currentConfig.placeholder}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 transition ${
                  idError
                    ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                    : 'border-slate-200 focus:ring-[#176B87]/20 focus:border-[#176B87]'
                }`}
              />
            </div>
            {idError && (
              <p className="flex items-center space-x-1 text-rose-600 text-[11px] font-medium pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{idError}</span>
              </p>
            )}
          </div>

          {/* Password or OTP */}
          {!isOtpMode ? (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E293B] block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onBlur={() => setPasswordTouched(true)}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password (min. 5 characters)"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 transition ${
                    passwordError
                      ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
                      : 'border-slate-200 focus:ring-[#176B87]/20 focus:border-[#176B87]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              <label className="text-xs font-bold text-[#1E293B] block">
                Mobile OTP Code
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-mono tracking-widest text-center focus:outline-none focus:border-[#176B87]"
              />
              {passwordError && (
                <p className="flex items-center space-x-1 text-rose-600 text-[11px] font-medium pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passwordError}</span>
                </p>
              )}
            </div>
          )}

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Password recovery instructions sent')}
              className="text-xs font-bold text-[#176B87] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Primary Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-[#0E2C48] to-[#176B87] hover:from-[#0A2136] hover:to-[#125870] text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-md flex items-center justify-center space-x-1.5 disabled:opacity-50"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Registration & OTP Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="py-2.5 px-3 bg-[#E5F1F5] hover:bg-[#d5e8ef] border border-[#176B87]/30 text-[#176B87] font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOtpMode(!isOtpMode)}
              className="py-2.5 px-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#176B87]" />
              <span>{isOtpMode ? 'Use Password' : 'OTP Login'}</span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200/70 text-center space-y-1">
          <p className="text-xs text-[#64748B]">
            Need help?{' '}
            <button
              type="button"
              onClick={() => showToast('Connected to CASPA Enterprise Helpdesk')}
              className="text-[#176B87] font-semibold underline hover:text-[#125870]"
            >
              Contact your administrator
            </button>
          </p>
          <p className="text-[10px] text-slate-400 font-medium">
            CASPA School OS • Enterprise Edition
          </p>
        </div>
      </div>
    </div>
  );
};
