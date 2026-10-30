import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Phone,
  Mail,
  BookOpen,
  Award,
  Clock,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminStaffMember } from '../../types';

export const AdminStaffScreen: React.FC = () => {
  const { staffMembers, addStaffMember, updateStaffMember, deleteStaffMember, showToast } = useApp();

  const [activeDept, setActiveDept] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<AdminStaffMember | null>(null);

  // Form
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    department: 'Mathematics' as AdminStaffMember['department'],
    email: '',
    phone: '',
    qualification: '',
    classesAssigned: 'Grade 9B, Grade 10A',
    workloadPeriods: 22,
  });

  const departments = [
    'ALL',
    'Mathematics',
    'Science',
    'Humanities',
    'Language',
    'Administration',
    'Sports',
    'Transport',
  ];

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.designation.trim() || !formData.email.trim()) {
      showToast('Please fill in required fields');
      return;
    }
    addStaffMember({
      fullName: formData.fullName,
      designation: formData.designation,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      qualification: formData.qualification,
      classesAssigned: formData.classesAssigned.split(',').map((s) => s.trim()),
      workloadPeriods: Number(formData.workloadPeriods),
    });
    setIsOnboardModalOpen(false);
    setFormData({
      fullName: '',
      designation: '',
      department: 'Mathematics',
      email: '',
      phone: '',
      qualification: '',
      classesAssigned: 'Grade 9B, Grade 10A',
      workloadPeriods: 22,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;
    updateStaffMember(editingStaff.id, {
      fullName: editingStaff.fullName,
      designation: editingStaff.designation,
      phone: editingStaff.phone,
      email: editingStaff.email,
      workloadPeriods: editingStaff.workloadPeriods,
    });
    setEditingStaff(null);
  };

  const filteredStaff = staffMembers.filter((stf) => {
    const matchesDept = activeDept === 'ALL' || stf.department.toLowerCase() === activeDept.toLowerCase();
    const matchesSearch =
      stf.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stf.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stf.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar matching Teacher/Student Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-teal font-semibold uppercase tracking-wider mb-1">
            <span>Human Resources &amp; Academic Faculty • Central Campus</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            Faculty &amp; Staff Administration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Oversee instructional staffing, workload allocation, and department credentials.
          </p>
        </div>

        <button
          onClick={() => setIsOnboardModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-teal hover:bg-[#125870] text-white text-xs font-bold transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard Faculty</span>
        </button>
      </div>

      {/* Department Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition whitespace-nowrap ${
                activeDept === dept
                  ? 'bg-teal text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-teal"
          />
        </div>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((stf) => (
          <div
            key={stf.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-teal/50 transition group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={stf.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
                    alt={stf.fullName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-xs"
                  />
                  <div>
                    <h3 className="font-extrabold text-sm text-navy">{stf.fullName}</h3>
                    <p className="text-[11px] text-teal font-medium">{stf.designation}</p>
                    <span className="text-[10px] font-mono text-slate-400">{stf.employeeId}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setEditingStaff(stf)}
                    className="p-1.5 text-slate-400 hover:text-teal rounded-lg hover:bg-slate-50 transition cursor-pointer"
                    title="Edit Faculty / Staff Details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteStaffMember(stf.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    title="Delete Faculty / Staff Permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span className="truncate">{stf.qualification || 'Certified Faculty'}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Workload: <strong>{stf.workloadPeriods} Periods / Week</strong></span>
                </div>
              </div>

              {stf.classesAssigned && stf.classesAssigned.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Class Assignments
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {stf.classesAssigned.map((cls, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-100"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center space-x-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>{stf.phone}</span>
              </span>
              <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Active</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Onboard Staff Modal */}
      {isOnboardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-teal">
                <UserCheck className="w-5 h-5" />
                <h3 className="font-bold text-base text-navy">Onboard Faculty or Staff Member</h3>
              </div>
              <button onClick={() => setIsOnboardModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOnboardSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Dr. Alistair Ross"
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as any })}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Language">Language</option>
                    <option value="Administration">Administration</option>
                    <option value="Sports">Sports</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Designation *</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Senior Lecturer"
                    className="w-full p-2 rounded-lg border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="faculty@caspaschool.org"
                    className="w-full p-2 rounded-lg border border-slate-300"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Qualifications &amp; Degrees</label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. Ph.D. Applied Physics (MIT), B.Ed."
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Assigned Classes (comma separated)</label>
                  <input
                    type="text"
                    value={formData.classesAssigned}
                    onChange={(e) => setFormData({ ...formData, classesAssigned: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Weekly Workload (Periods)</label>
                  <input
                    type="number"
                    value={formData.workloadPeriods}
                    onChange={(e) => setFormData({ ...formData, workloadPeriods: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOnboardModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-teal hover:bg-[#125870] text-white shadow-xs"
                >
                  Confirm &amp; Issue ID Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-navy">Edit Staff Details</h3>
              <button onClick={() => setEditingStaff(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={editingStaff.fullName}
                  onChange={(e) => setEditingStaff({ ...editingStaff, fullName: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Designation</label>
                <input
                  type="text"
                  value={editingStaff.designation}
                  onChange={(e) => setEditingStaff({ ...editingStaff, designation: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone</label>
                <input
                  type="text"
                  value={editingStaff.phone}
                  onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Workload (Periods / Wk)</label>
                <input
                  type="number"
                  value={editingStaff.workloadPeriods}
                  onChange={(e) => setEditingStaff({ ...editingStaff, workloadPeriods: Number(e.target.value) })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    deleteStaffMember(editingStaff.id);
                    setEditingStaff(null);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Permanently</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingStaff(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-teal text-white shadow-xs cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
