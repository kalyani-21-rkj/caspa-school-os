import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!username.trim() || !email.trim()) {
      showToast('Please enter your username and email');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      register(username, designation || selectedRole, email, password, selectedRole);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F8FAFC] md:bg-white font-sans text-bodyText">
      {/* Left Panel: Deep Navy (Hidden on mobile so mobile shows clean registration form directly) */}
      <div className="hidden md:flex md:w-[46%] lg:w-[48%] bg-[#103758] text-white p-12 lg:p-14 flex-col justify-between relative overflow-hidden shrink-0">
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

      {/* Right Panel: Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 lg:p-12 overflow-y-auto">
        {/* Main Center Form Block */}
        <div className="w-full max-w-[380px] my-auto py-3">
          {/* Top Centered CASPA School OS Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#EFEFEF] md:bg-transparent px-4 py-0.5 md:p-0 inline-flex items-center justify-center">
              <img
                src="/assets/aistudio/caspa_logo_7f187f6a.png"
                alt="CASPA School OS"
                className="w-36 h-36 object-contain"
              />
            </div>
          </div>

          {/* Heading Block */}
          <div className="text-center space-y-1 mb-5">
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#1E293B] tracking-tight">
              Register
            </h2>
            <p className="text-xs text-slate-400 text-left pt-1">
              One School. One Platform. Complete Visibility.
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Username */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block text-[11px]">
                Username / Full Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your full name or username"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition text-xs"
                required
              />
            </div>

            {/* Designation + Module Authorization Selector */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block text-[11px]">
                Designation &amp; Role Module
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => handleDesignationChange(e.target.value)}
                placeholder="e.g. Student • Grade 10, Teacher, Parent, Principal"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition text-xs"
              />
              {/* Quick Module Authorization Pills */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {rolePresets.map((preset) => {
                  const isActive = selectedRole === preset.role;
                  return (
                    <button
                      key={preset.role}
                      type="button"
                      onClick={() => handleSelectRolePreset(preset)}
                      className={`px-2 py-1.5 rounded border text-[10px] font-bold flex items-center justify-between transition ${
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
              <label className="font-bold text-slate-700 block text-[11px]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="principal@caspaschool.org"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B87]/20 focus:border-[#176B87] transition text-xs"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
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

            {/* Register Button */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#176B87] hover:bg-[#125870] text-white font-bold rounded-md text-xs transition shadow-xs disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>

              {/* Back to Sign In Option Placed Right After Register Button */}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="w-full py-2.5 bg-white border border-[#176B87] text-[#176B87] hover:bg-slate-50 font-bold rounded-md text-xs transition flex items-center justify-center space-x-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </form>

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
  );
};
