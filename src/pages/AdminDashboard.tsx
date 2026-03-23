"use client";

import React, { useState, useEffect } from 'react';
import { TOP_STUDENTS as initialStudents } from '@/constants/students';
import { Trash2, BarChart3, Users, ShieldCheck, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [students, setStudents] = useState(initialStudents);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        showError("Acceso denegado. Solo administradores.");
        navigate('/');
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [navigate]);

  const removeStudent = (rank: string) => {
    setStudents(students.filter(s => s.rank !== rank));
    showSuccess("Participante eliminado del ranking");
  };

  if (isAdmin === null) return <div className="min-h-screen bg-white flex items-center justify-center">Verificando credenciales...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-red-600 rounded-xl text-white">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase italic">Panel de Control</h1>
            <p className="text-gray-500 font-medium">Gestión de candidatos y auditoría de votos.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-red-600" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Candidatos</span>
            </div>
            <p className="text-5xl font-black text-gray-900 italic">{students.length}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="text-red-600" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Votos Totales</span>
            </div>
            <p className="text-5xl font-black text-gray-900 italic">
              {students.reduce((acc, s) => acc + s.votes, 0)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Rank</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Estudiante</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Votos</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.rank} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6 font-black text-red-600 text-xl italic">#{student.rank}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={student.image} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      </div>
                      <div>
                        <p className="font-black text-gray-900 uppercase italic">{student.name}</p>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{student.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-black text-gray-600">{student.votes}</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => removeStudent(student.rank)}
                      className="p-3 bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
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