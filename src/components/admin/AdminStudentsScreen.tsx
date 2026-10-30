import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Mail,
  Bus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

export const AdminStudentsScreen: React.FC = () => {
  const { students, admitStudent, updateStudent, archiveStudent, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ALL');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // New Student Form
  const [formData, setFormData] = useState({
    fullName: '',
    grade: 'Grade 9',
    section: '9B',
    gender: 'FEMALE' as 'MALE' | 'FEMALE' | 'OTHER',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    busRoute: 'Route 12',
  });

  const handleAdmitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.parentName.trim()) {
      showToast('Please fill in student and guardian names');
      return;
    }
    admitStudent(formData);
    setIsAdmitModalOpen(false);
    setFormData({
      fullName: '',
      grade: 'Grade 9',
      section: '9B',
      gender: 'FEMALE',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      busRoute: 'Route 12',
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    updateStudent(editingStudent.id, {
      fullName: editingStudent.fullName,
      grade: editingStudent.grade,
      section: editingStudent.section,
      parentPhone: editingStudent.parentPhone,
      parentEmail: editingStudent.parentEmail,
      busRoute: editingStudent.busRoute,
    });
    setEditingStudent(null);
  };

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = gradeFilter === 'ALL' || s.grade.toLowerCase() === gradeFilter.toLowerCase();
    const matchesSection = sectionFilter === 'ALL' || s.section.toLowerCase() === sectionFilter.toLowerCase();
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;

    return matchesSearch && matchesGrade && matchesSection && matchesStatus;
  });

  const activeCount = students.filter((s) => s.status === 'ACTIVE').length;
  const overdueCount = students.filter((s) => s.feeOutstanding > 0).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar matching Teacher/Student Module */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-teal font-semibold uppercase tracking-wider mb-1">
            <span>Student Information System • Central Campus</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
            Student Admissions &amp; Enrollment Records
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage academic rosters, guardian correspondence, and tuition clearance across all grades.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => showToast('Student directory exported to CSV format')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAdmitModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-teal hover:bg-[#125870] text-white text-xs font-bold transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Admit Student</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Enrolled Roster</span>
          <div className="text-xl font-extrabold text-navy mt-0.5">{students.length} Students</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Status</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-0.5">{activeCount} Active</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Fee Pending</span>
          <div className="text-xl font-extrabold text-amber-600 mt-0.5">{overdueCount} Dues</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Avg Attendance</span>
          <div className="text-xl font-extrabold text-teal mt-0.5">96.2%</div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, admission #, parent..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-teal"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Grade filter */}
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-teal"
          >
            <option value="ALL">All Grades</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>

          {/* Section filter */}
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-teal"
          >
            <option value="ALL">All Sections</option>
            <option value="9A">Section 9A</option>
            <option value="9B">Section 9B</option>
            <option value="10A">Section 10A</option>
            <option value="10B">Section 10B</option>
            <option value="11 AP">Section 11 AP</option>
            <option value="12A">Section 12A</option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-teal"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="ON_LEAVE">On Leave</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
        </div>
      </div>

      {/* Student Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Admission No</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Grade &amp; Section</th>
                <th className="px-4 py-3">Attendance</th>
                <th className="px-4 py-3">Fee Status</th>
                <th className="px-4 py-3">Guardian Info</th>
                <th className="px-4 py-3">Route</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No student records matching your query criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50/60 transition">
                    <td className="px-4 py-3 font-mono font-semibold text-teal">
                      {std.admissionNo}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-navy">
                          {std.fullName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <strong className="block text-navy font-bold">{std.fullName}</strong>
                          <span className="text-[10px] text-slate-400">Roll #{std.rollNo}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-700">{std.grade}</span>
                      <span className="text-slate-400 text-[11px] ml-1">({std.section})</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              std.attendancePercentage >= 90
                                ? 'bg-emerald-500'
                                : std.attendancePercentage >= 75
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${std.attendancePercentage}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800">{std.attendancePercentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {std.feeOutstanding === 0 ? (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Cleared</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>${std.feeOutstanding} Due</span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[11px]">
                        <span className="font-semibold text-slate-800 block">{std.parentName}</span>
                        <span className="text-slate-400">{std.parentPhone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[11px] text-slate-600 font-medium">
                        {std.busRoute || 'Self'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => setViewingStudent(std)}
                          className="p-1 text-slate-400 hover:text-teal transition"
                          title="View Student Dossier"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingStudent(std)}
                          className="p-1 text-slate-400 hover:text-indigo-600 transition"
                          title="Edit Student Record"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => archiveStudent(std.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Delete Student Permanently"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admit New Student Modal */}
      {isAdmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-teal">
                <Users className="w-5 h-5" />
                <h3 className="font-bold text-base text-navy">Admit New Student Profile</h3>
              </div>
              <button
                onClick={() => setIsAdmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdmitSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Student Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Benjamin Carter"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Grade *</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Section *</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="9A">9A</option>
                    <option value="9B">9B</option>
                    <option value="10A">10A</option>
                    <option value="10B">10B</option>
                    <option value="11 AP">11 AP</option>
                    <option value="12A">12A</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Guardian / Parent Name *</label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="e.g. Mrs. Eleanor Carter"
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-teal"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Guardian Phone</label>
                  <input
                    type="text"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Guardian Email</label>
                  <input
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    placeholder="guardian@example.com"
                    className="w-full p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Transport / Bus Route</label>
                <select
                  value={formData.busRoute}
                  onChange={(e) => setFormData({ ...formData, busRoute: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="None">None (Self Transport)</option>
                  <option value="Route 12">Route 12 (Campus Special)</option>
                  <option value="Route 04">Route 04 (North Express)</option>
                  <option value="Route 08">Route 08 (East Hub)</option>
                  <option value="Route 09">Route 09 (South Loop)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdmitModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-teal hover:bg-[#125870] text-white shadow-xs"
                >
                  Confirm &amp; Generate ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-navy">Edit Record: {editingStudent.fullName}</h3>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={editingStudent.fullName}
                  onChange={(e) => setEditingStudent({ ...editingStudent, fullName: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Grade</label>
                  <input
                    type="text"
                    value={editingStudent.grade}
                    onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Section</label>
                  <input
                    type="text"
                    value={editingStudent.section}
                    onChange={(e) => setEditingStudent({ ...editingStudent, section: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Parent Phone</label>
                <input
                  type="text"
                  value={editingStudent.parentPhone}
                  onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Parent Email</label>
                <input
                  type="email"
                  value={editingStudent.parentEmail}
                  onChange={(e) => setEditingStudent({ ...editingStudent, parentEmail: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-teal text-white shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Dossier Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-teal">
                <Users className="w-5 h-5" />
                <h3 className="font-bold text-base text-navy">Official Student Dossier</h3>
              </div>
              <button onClick={() => setViewingStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-navy">{viewingStudent.fullName}</h4>
                  <span className="text-[11px] text-teal font-mono font-bold">{viewingStudent.admissionNo}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {viewingStudent.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block">Class Roster</span>
                  <span className="font-bold">{viewingStudent.grade} • Section {viewingStudent.section}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Roll Number</span>
                  <span className="font-bold">Roll #{viewingStudent.rollNo}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Attendance Rate</span>
                  <span className="font-bold text-navy">{viewingStudent.attendancePercentage}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Tuition Status</span>
                  <span className={`font-bold ${viewingStudent.feeOutstanding > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {viewingStudent.feeOutstanding > 0 ? `$${viewingStudent.feeOutstanding} Overdue` : 'Zero Balance'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Authorized Guardians</span>
                <p className="font-bold text-navy">{viewingStudent.parentName}</p>
                <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-teal" />
                    <span>{viewingStudent.parentPhone}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-teal" />
                    <span className="truncate max-w-[140px]">{viewingStudent.parentEmail}</span>
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Assigned Transit:</span>
                <span className="font-bold text-navy flex items-center space-x-1">
                  <Bus className="w-3.5 h-3.5 text-teal" />
                  <span>{viewingStudent.busRoute || 'None'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => {
                  showToast(`Printed academic transcript for ${viewingStudent.fullName}`);
                  setViewingStudent(null);
                }}
                className="px-4 py-2 bg-navy hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-xs"
              >
                Print Official Transcript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
