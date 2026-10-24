import React, { useState } from 'react';
import { Eye, EyeOff, Shield, CheckCircle2, UserPlus } from 'lucide-react';
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
  const [emailOrUsername, setEmailOrUsername] = useState('principal@caspaschool.org');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<RoleType | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roleCredentials: {
    role: RoleType;
    label: string;
    email: string;
    moduleDesc: string;
  }[] = [
    {
      role: 'PRINCIPAL',
      label: 'Principal',
      email: 'principal@caspaschool.org',
      moduleDesc: 'Principal Module Only',
    },
    {
      role: 'VICE_PRINCIPAL',
      label: 'Vice Principal',
      email: 's.jenkins@caspa.edu',
      moduleDesc: 'Vice Principal Module Only',
    },
    {
      role: 'ADMIN',
      label: 'Admin',
      email: 'admin@caspaschool.org',
      moduleDesc: 'All Modules Access',
    },
    {
      role: 'TEACHER',
      label: 'Teacher',
      email: 'teacher@caspaschool.org',
      moduleDesc: 'Teacher Module Only',
    },
    {
      role: 'PARENT',
      label: 'Parent',
      email: 'anita.sharma@caspaschool.org',
      moduleDesc: 'Parent Module Only',
    },
    {
      role: 'STUDENT',
      label: 'Student',
      email: 'student@caspaschool.org',
      moduleDesc: 'Student Module Only',
    },
  ];

  const handleSelectRoleCredential = (cred: (typeof roleCredentials)[0]) => {
    setEmailOrUsername(cred.email);
    setSelectedRole(cred.role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername.trim()) {
      showToast('Please enter your email or username');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      login(emailOrUsername, password, selectedRole);
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      {/* MOBILE LOGIN PAGE: Directly shows the 2nd page (PortalRoleLoginPage) without the stacked navy banner */}
      <div className="md:hidden">
        <PortalRoleLoginPage
          onNavigateToWebLogin={onNavigateToPortal}
          onNavigateToRegister={onNavigateToRegister}
        />
      </div>

      {/* DESKTOP WEB LOGIN PAGE: Split-screen layout */}
      <div className="hidden md:flex min-h-screen w-full flex-row bg-white font-sans text-bodyText">
        {/* Left Panel: Deep Navy with concentric radar design lines */}
        <div className="md:w-[46%] lg:w-[48%] bg-[#103758] text-white p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden shrink-0">
          {/* Concentric Circular Rings */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-start -left-32">
            <div className="w-[340px] h-[340px] rounded-full border border-white/10 absolute left-16" />
            <div className="w-[460px] h-[460px] rounded-full border border-white/10 absolute left-2" />
            <div className="w-[580px] h-[580px] rounded-full border border-white/10 absolute -left-12" />
          </div>

          {/* Top Left Brand Header: White square CASPA logo + CASPA School OS text */}
          <div className="relative z-10 flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-white p-0.5 flex items-center justify-center shadow-sm">
              <img
                src="/assets/aistudio/caspa_logo_7f187f6a.png"
                alt="CASPA Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">
              CASPA School OS
            </span>
          </div>

          {/* Center Hero Value Proposition */}
          <div className="relative z-10 max-w-md my-0 space-y-3">
            <h1 className="text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.18]">
              Everything your school needs, in one clear view.
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              One School. One Platform. Complete Visibility.
            </p>
          </div>

          {/* Bottom Footer Note */}
          <div className="relative z-10 text-[10px] uppercase tracking-[0.15em] text-slate-300/75 font-medium">
            POWERED BY &nbsp;ERP COMMUNITY
          </div>
        </div>

        {/* Right Panel: White Authentication Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-10 lg:p-12 overflow-y-auto bg-white">
          {/* Main Center Form Block */}
          <div className="w-full max-w-[380px] my-auto py-4">
            {/* Top Centered CASPA School OS Logo */}
            <div className="flex justify-center mb-5">
              <img
                src="/assets/aistudio/caspa_logo_7f187f6a.png"
                alt="CASPA School OS"
                className="w-36 h-36 object-contain"
              />
            </div>

            {/* Left-Aligned Heading Block */}
            <div className="text-left space-y-1 mb-5">
              <span className="text-[11px] font-extrabold text-[#176B87] uppercase tracking-wider block">
                WELCOME BACK
              </span>
              <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#1E293B] tracking-tight">
                Sign in to your workspace
              </h2>
              <p className="text-xs text-slate-400">
                One School. One Platform. Complete Visibility.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Email or Username */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block text-[11px]">
                  Email or Username
                </label>
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => {
                    setEmailOrUsername(e.target.value);
                    setSelectedRole(undefined);
                  }}
                  placeholder="principal@caspaschool.org"
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition text-xs"
                  required
                />
              </div>

              {/* Password with Eye Toggle */}
              {!isOtpMode ? (
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block text-[11px]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition text-xs pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block text-[11px]">
                    One-Time Password (OTP)
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit verification code"
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#176B87] text-xs font-mono tracking-widest text-center"
                  />
                </div>
              )}

              {/* Forgot Password Link */}
              <div className="flex justify-end pt-0.5">
                <button
                  type="button"
                  onClick={() => showToast('Password reset link sent to your registered school email')}
                  className="text-[11px] font-bold text-[#176B87] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#176B87] hover:bg-[#125870] text-white font-bold rounded-md text-xs transition shadow-xs disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Login'}
              </button>

              {/* Registration Option Placed Right After Sign In / Login Button */}
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="w-full py-2.5 bg-[#E5F1F5] hover:bg-[#d5e8ef] border border-[#176B87]/30 text-[#176B87] font-bold rounded-md text-xs transition flex items-center justify-center space-x-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register New Account</span>
              </button>

              {/* Login with OTP Button */}
              <button
                type="button"
                onClick={() => setIsOtpMode(!isOtpMode)}
                className="w-full py-2.5 bg-white border border-[#176B87] text-[#176B87] hover:bg-slate-50 font-bold rounded-md text-xs transition"
              >
                {isOtpMode ? 'Login with Password' : 'Login with OTP'}
              </button>
            </form>

            {/* Role Authorization Selector (Select account to test strict module authorization) */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Role Credentials (Module Authorization)
                </span>
                <Shield className="w-3.5 h-3.5 text-[#176B87]" />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {roleCredentials.map((cred) => {
                  const isSelected = emailOrUsername.toLowerCase() === cred.email.toLowerCase();
                  return (
                    <button
                      key={cred.role}
                      type="button"
                      onClick={() => handleSelectRoleCredential(cred)}
                      className={`p-2 rounded-md border text-left transition ${
                        isSelected
                          ? 'bg-[#E6F3F7] border-[#176B87] text-[#0E2C48]'
                          : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] truncate">{cred.label}</span>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-[#176B87] shrink-0" />}
                      </div>
                      <span className="text-[9px] text-slate-500 block truncate mt-0.5">
                        {cred.moduleDesc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Security Text */}
            <div className="mt-6 text-center space-y-1">
              <p className="text-[10px] text-slate-400">
                Your data is protected with enterprise-grade security.
              </p>
              <p className="text-[9px] text-slate-400">
                For Principal, Teacher, Parent, Admin and Staff
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
