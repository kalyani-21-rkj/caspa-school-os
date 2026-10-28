import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoleType } from '../../types';

interface WebRegisterPageProps {
  onNavigateToLogin: () => void;
  onNavigateToPortal?: () => void;
}

export const WebRegisterPage: React.FC<WebRegisterPageProps> = ({
  onNavigateToLogin,
}) => {
  const { register, showToast } = useApp();
  const [username, setUsername] = useState('');
  const [designation, setDesignation] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleType>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const MIN_PASSWORD_LENGTH = 5;

  const isUsernameValid = username.trim().length > 0;
  const isEmailValid = email.trim().length > 0;
  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;

  const rolePresets: { role: RoleType; label: string; defaultDesignation: string }[] = [
    { role: 'STUDENT', label: 'Student', defaultDesignation: 'Student • Grade 10' },
    { role: 'PARENT', label: 'Parent', defaultDesignation: 'Parent & Guardian' },
    { role: 'TEACHER', label: 'Teacher', defaultDesignation: 'Teacher • Dept of Mathematics' },
    { role: 'PRINCIPAL', label: 'Principal', defaultDesignation: 'Principal & Executive Head' },
    { role: 'VICE_PRINCIPAL', label: 'Vice Principal', defaultDesignation: 'Vice Principal • Academic Head' },
    { role: 'ADMIN', label: 'Admin', defaultDesignation: 'School Administrator (All Modules)' },
  ];

  const handleSelectRolePreset = (preset: (typeof rolePresets)[0]) => {
    setSelectedRole(preset.role);
    setDesignation(preset.defaultDesignation);
  };

  const handleDesignationChange = (val: string) => {
    setDesignation(val);
    const lower = val.toLowerCase();
    if (lower.includes('vice') || lower.includes('vp')) {
      setSelectedRole('VICE_PRINCIPAL');
    } else if (lower.includes('principal')) {
      setSelectedRole('PRINCIPAL');
    } else if (lower.includes('admin') || lower.includes('director')) {
      setSelectedRole('ADMIN');
    } else if (lower.includes('teacher') || lower.includes('faculty') || lower.includes('dept')) {
      setSelectedRole('TEACHER');
    } else if (lower.includes('parent') || lower.includes('guardian')) {
      setSelectedRole('PARENT');
    } else if (lower.includes('student') || lower.includes('grade') || lower.includes('roll')) {
      setSelectedRole('STUDENT');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setUsernameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!username.trim() || !email.trim()) {
      showToast('Please fill in your username and email');
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      showToast(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      register(username.trim(), designation || selectedRole, email.trim(), password, selectedRole);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F8FAFC] font-sans text-bodyText">
      {/* Left Panel: Deep Navy Showcase */}
      <div className="hidden md:flex md:w-[46%] lg:w-[48%] bg-gradient-to-br from-[#071B2F] via-[#0E2C48] to-[#176B87] text-white p-12 lg:p-14 flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-start -left-32">
          <div className="w-[340px] h-[340px] rounded-full border border-white/10 absolute left-16" />
          <div className="w-[460px] h-[460px] rounded-full border border-white/10 absolute left-2" />
          <div className="w-[580px] h-[580px] rounded-full border border-white/10 absolute -left-12" />
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm">
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

        <div className="relative z-10 max-w-md my-0 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-sky-400/15 border border-sky-300/25 text-sky-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>Instant Role Provisioning</span>
          </div>
          <h1 className="text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.18]">
            Create your verified school workspace account.
          </h1>
          <p className="text-sm text-slate-300 font-normal leading-relaxed">
            One School. One Platform. Complete Visibility across all 6 academic &amp; administrative modules.
          </p>
        </div>

        <div className="relative z-10 text-[10px] uppercase tracking-[0.15em] text-slate-300/75 font-medium">
          POWERED BY &nbsp;ERP COMMUNITY
        </div>
      </div>

      {/* Right Panel: Minimal Clean Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-[420px] bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-7 my-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-extrabold text-[#176B87] uppercase tracking-wider block">
                NEW ACCOUNT
              </span>
              <h2 className="text-2xl font-extrabold text-[#0E2C48] tracking-tight">
                Register Workspace ID
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                One School. One Platform. Complete Visibility.
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/caspa_logo_7f187f6a.png"
                alt="CASPA School OS"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
            {/* Username */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block text-xs">
                Username / Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={username}
                  onBlur={() => setUsernameTouched(true)}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your full name or username"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition text-xs"
                />
              </div>
              {(usernameTouched || submitAttempted) && !isUsernameValid && (
                <p className="text-[11px] font-medium text-rose-600 flex items-center space-x-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Please fill in your username</span>
                </p>
              )}
            </div>

            {/* Designation + Module Authorization Selector */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block text-xs">
                Designation &amp; Role Module
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => handleDesignationChange(e.target.value)}
                placeholder="e.g. Student • Grade 10, Teacher, Parent, Principal"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition text-xs"
              />
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {rolePresets.map((preset) => {
                  const isActive = selectedRole === preset.role;
                  return (
                    <button
                      key={preset.role}
                      type="button"
                      onClick={() => handleSelectRolePreset(preset)}
                      className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold flex items-center justify-between transition ${
                        isActive
                          ? 'bg-[#E6F3F7] border-[#176B87] text-[#176B87]'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate">{preset.label}</span>
                      {isActive && <CheckCircle2 className="w-2.5 h-2.5 text-[#176B87] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block text-xs">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onBlur={() => setEmailTouched(true)}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="principal@caspaschool.org"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition text-xs"
                />
              </div>
              {(emailTouched || submitAttempted) && !isEmailValid && (
                <p className="text-[11px] font-medium text-rose-600 flex items-center space-x-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Please fill in your email</span>
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block text-xs">
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
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {(passwordTouched || submitAttempted) && !isPasswordValid && (
                <p className="text-[11px] font-medium text-rose-600 flex items-center space-x-1 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Password must be at least {MIN_PASSWORD_LENGTH} characters</span>
                </p>
              )}
            </div>

            {/* Register & Back Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-[#0E2C48] to-[#176B87] hover:from-[#0A2136] hover:to-[#125870] text-white font-bold rounded-xl text-xs transition shadow-sm disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register Account'}
              </button>

              <button
                type="button"
                onClick={onNavigateToLogin}
                className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl text-xs transition flex items-center justify-center space-x-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
