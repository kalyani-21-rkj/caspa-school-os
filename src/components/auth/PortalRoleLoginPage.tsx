import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Smartphone,
  UserPlus,
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

  const effectiveRole: RoleType =
    primaryTab === 'STAFF' ? staffSubRole : primaryTab;

  const roleConfig: Record<
    RoleType,
    { label: string; placeholder: string; defaultId: string }
  > = {
    STUDENT: {
      label: 'Email or Student ID',
      placeholder: 'e.g. STU-2024-8890 or email',
      defaultId: 'STU-2024-8890',
    },
    PARENT: {
      label: 'Email or Parent ID',
      placeholder: 'e.g. anita.sharma@caspaschool.org',
      defaultId: 'anita.sharma@caspaschool.org',
    },
    TEACHER: {
      label: 'Email or Teacher ID',
      placeholder: 'e.g. teacher@caspaschool.org',
      defaultId: 'teacher@caspaschool.org',
    },
    PRINCIPAL: {
      label: 'Email or Principal ID',
      placeholder: 'e.g. principal@caspaschool.org',
      defaultId: 'principal@caspaschool.org',
    },
    VICE_PRINCIPAL: {
      label: 'Email or VP Staff ID',
      placeholder: 'e.g. s.jenkins@caspa.edu',
      defaultId: 's.jenkins@caspa.edu',
    },
    ADMIN: {
      label: 'Email or Admin ID',
      placeholder: 'e.g. admin@caspaschool.org',
      defaultId: 'admin@caspaschool.org',
    },
    SUPER_ADMIN: {
      label: 'Email or Admin ID',
      placeholder: 'e.g. admin@caspaschool.org',
      defaultId: 'admin@caspaschool.org',
    },
    SAFETY_OFFICER: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. safety@caspaschool.org',
      defaultId: 'safety@caspaschool.org',
    },
    COUNSELLOR: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. counsellor@caspaschool.org',
      defaultId: 'counsellor@caspaschool.org',
    },
    ACCOUNTS: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. accounts@caspaschool.org',
      defaultId: 'accounts@caspaschool.org',
    },
    TRANSPORT: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. transport@caspaschool.org',
      defaultId: 'transport@caspaschool.org',
    },
    HOSTEL_WARDEN: {
      label: 'Email or Staff ID',
      placeholder: 'e.g. warden@caspaschool.org',
      defaultId: 'warden@caspaschool.org',
    },
  };

  const currentConfig = roleConfig[effectiveRole];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginId = identifier.trim() || currentConfig.defaultId;
    setIsLoading(true);
    setTimeout(() => {
      login(loginId, password || 'password123', effectiveRole);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col items-center justify-center px-5 py-8 font-sans text-bodyText">
      {/* Main Sign-In Container (Exact match to Image 2) */}
      <div className="w-full max-w-[400px] bg-[#F8FAFC] sm:bg-white sm:rounded-3xl sm:border sm:border-slate-200/80 sm:shadow-xl sm:px-8 sm:py-9">
        {/* Top Centered CASPA Logo Box */}
        <div className="flex justify-center">
          <div className="bg-[#EFEFEF] px-4 py-0.5 inline-flex items-center justify-center">
            <img
              src="/assets/aistudio/caspa_logo_7f187f6a.png"
              alt="CASPA School OS"
              className="w-36 h-36 sm:w-40 sm:h-40 object-contain"
            />
          </div>
        </div>

        {/* Welcome Back Heading */}
        <div className="text-center mt-5 space-y-1">
          <h1 className="text-[26px] font-extrabold text-[#0E2C48] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-[13px] text-[#64748B]">
            Sign in to continue to your dashboard.
          </p>
        </div>

        {/* SIGN IN AS Selector */}
        <div className="mt-6">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block mb-2">
            SIGN IN AS
          </span>
          <div className="grid grid-cols-4 gap-2 p-1.5 bg-white/70 rounded-2xl border border-slate-100">
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
                    setIdentifier('');
                  }}
                  className={`py-2.5 px-2 rounded-xl text-xs transition text-center ${
                    isSelected
                      ? 'bg-[#E5F1F5] border-[1.5px] border-[#176B87] text-[#176B87] font-bold shadow-2xs'
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
                    setIdentifier('');
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
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Email or ID Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1E293B] block">
              {currentConfig.label}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={currentConfig.placeholder}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition"
              />
            </div>
          </div>

          {/* Password or OTP */}
          {!isOtpMode ? (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E293B] block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-mono tracking-widest text-center focus:outline-none focus:border-[#176B87]"
              />
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
            className="w-full py-3.5 bg-[#176B87] hover:bg-[#125870] text-white font-bold rounded-xl text-sm transition shadow-sm flex items-center justify-center space-x-1.5 disabled:opacity-50"
          >
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Registration Option Placed Right After Sign In Button */}
          <button
            type="button"
            onClick={onNavigateToRegister}
            className="w-full py-3 bg-[#E5F1F5] hover:bg-[#d5e8ef] border border-[#176B87]/30 text-[#176B87] font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register New Account</span>
          </button>

          {/* OR Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200/80" />
            <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-400 uppercase">
              OR
            </span>
            <div className="flex-grow border-t border-slate-200/80" />
          </div>

          {/* Sign in with OTP / Mobile Button */}
          <button
            type="button"
            onClick={() => setIsOtpMode(!isOtpMode)}
            className="w-full py-3 bg-white border border-[#176B87] text-[#176B87] hover:bg-slate-50 font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center space-x-2"
          >
            <Smartphone className="w-4 h-4" />
            <span>{isOtpMode ? 'Sign in with Password' : 'Sign in with OTP / Mobile'}</span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-7 pt-5 border-t border-slate-200/70 text-center space-y-1.5">
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
          <p className="text-[11px] text-slate-400 font-medium">
            CASPA School OS • Enterprise Edition
          </p>
        </div>
      </div>
    </div>
  );
};
