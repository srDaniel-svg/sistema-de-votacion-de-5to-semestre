"use client";

import React, { useState, useEffect } from 'react';
import { Trash2, BarChart3, Users, ShieldCheck, Edit3, Save, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/login'); return; }

      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (profile?.role !== 'admin') {
        showError("Acceso denegado.");
        navigate('/');
      } else {
        setIsAdmin(true);
        fetchCandidates();
      }
    };
    checkAdmin();
  }, [navigate]);

  const fetchCandidates = async () => {
    const { data } = await supabase.from('candidates').select('*').order('rank', { ascending: true });
    if (data) setCandidates(data);
  };

  const handleEdit = (candidate: any) => {
    setEditingId(candidate.id);
    setEditForm(candidate);
  };

  const handleSave = async () => {
    const { error } = await supabase.from('candidates').update(editForm).eq('id', editingId);
    if (error) {
      showError("Error al actualizar");
    } else {
      showSuccess("Candidato actualizado");
      setEditingId(null);
      fetchCandidates();
    }
  };

  const removeCandidate = async (id: string) => {
    const { error } = await supabase.from('candidates').delete().eq('id', id);
    if (error) showError("Error al eliminar");
    else {
      showSuccess("Eliminado");
      fetchCandidates();
    }
  };

  if (isAdmin === null) return <div className="min-h-screen bg-white flex items-center justify-center">Verificando...</div>;

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
            <p className="text-gray-500 font-medium">Gestión total de candidatos y contenido multimedia.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase">Rank</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase">Candidato</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase">Multimedia</th>
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {candidates.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 font-black text-red-600 text-xl italic">#{c.rank}</td>
                  <td className="px-8 py-6">
                    {editingId === c.id ? (
                      <div className="space-y-2">
                        <Input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder="Nombre" />
                        <Input value={editForm.image_url} onChange={e => setEditForm({...editForm, image_url: e.target.value})} placeholder="URL Imagen" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <img src={c.image_url} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <p className="font-black text-gray-900 uppercase italic">{c.name}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {editingId === c.id ? (
                      <div className="space-y-2">
                        <Input value={editForm.video_url} onChange={e => setEditForm({...editForm, video_url: e.target.value})} placeholder="URL Video Presentación" />
                        <Input value={editForm.bg_video_url} onChange={e => setEditForm({...editForm, bg_video_url: e.target.value})} placeholder="URL Video Fondo" />
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 truncate max-w-[200px]">
                        {c.video_url}
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      {editingId === c.id ? (
                        <>
                          <button onClick={handleSave} className="p-2 bg-green-100 text-green-600 rounded-lg"><Save size={18} /></button>
                          <button onClick={() => setEditingId(null)} className="p-2 bg-gray-100 text-gray-600 rounded-lg"><X size={18} /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(c)} className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Edit3 size={18} /></button>
                          <button onClick={() => removeCandidate(c.id)} className="p-2 bg-red-100 text-red-600 rounded-lg"><Trash2 size={18} /></button>
                        </>
                      )}
                    </div>
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