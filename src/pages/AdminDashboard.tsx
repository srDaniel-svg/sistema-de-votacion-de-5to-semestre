"use client";

import React, { useState } from 'react';
import { TOP_STUDENTS as initialStudents } from '@/constants/students';
import { Trash2, BarChart3, Users, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { showSuccess } from '@/utils/toast';

const AdminDashboard = () => {
  const [students, setStudents] = useState(initialStudents);

  const removeStudent = (rank: string) => {
    setStudents(students.filter(s => s.rank !== rank));
    showSuccess("Participante eliminado del ranking");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-600 rounded-xl text-white">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Panel de Administración</h1>
            <p className="text-gray-500">Gestiona los participantes y supervisa las votaciones.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-red-600" />
              <span className="text-xs font-bold text-gray-400 uppercase">Total Participantes</span>
            </div>
            <p className="text-4xl font-black text-gray-900">{students.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="text-red-600" />
              <span className="text-xs font-bold text-gray-400 uppercase">Votos Totales</span>
            </div>
            <p className="text-4xl font-black text-gray-900">
              {students.reduce((acc, s) => acc + s.votes, 0)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Rank</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Estudiante</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Votos</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.rank} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-black text-red-600">#{student.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={student.image} className="w-10 h-10 rounded-full object-cover" alt="" />
                      <div>
                        <p className="font-bold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">{student.votes}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => removeStudent(student.rank)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;