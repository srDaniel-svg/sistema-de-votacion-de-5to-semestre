"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, BarChart3, Users, ShieldCheck, Edit3, Save, X, Heart } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    const { data } = await supabase.from('candidates').select('*').order('rank', { ascending: true });
    if (data) setCandidates(data);
    setLoading(false);
  };

  const totalVotes = useMemo(() => {
    return candidates.reduce((acc, curr) => acc + (curr.votes || 0), 0);
  }, [candidates]);

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
    if (!confirm("¿Estás seguro de eliminar este candidato?")) return;
    const { error } = await supabase.from('candidates').delete().eq('id', id);
    if (error) showError("Error al eliminar");
    else {
      showSuccess("Eliminado");
      fetchCandidates();
    }
  };

  if (isAdmin === null) return <div className="min-h-screen bg-white flex items-center justify-center font-black italic text-red-600 animate-pulse">VERIFICANDO ACCESO...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 pb-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-red-600 rounded-2xl text-white shadow-lg shadow-red-200">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tighter">Panel de Control</h1>
              <p className="text-gray-500 font-medium text-sm">Gestión de candidatos y estadísticas en tiempo real.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Votos</span>
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-red-600 fill-red-600" />
                <span className="text-2xl font-black text-gray-900">{totalVotes}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Candidatos</span>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <span className="text-2xl font-black text-gray-900">{candidates.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 text-center font-black italic text-gray-300 animate-pulse">CARGANDO DATOS...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {/* Desktop Header (Hidden on Mobile) */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Candidato</div>
                <div className="col-span-2 text-center">Votos</div>
                <div className="col-span-3">Multimedia</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>

              {/* List of Candidates */}
              {candidates.map((c) => (
                <div 
                  key={c.id} 
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                >
                  <div className="md:grid md:grid-cols-12 md:items-center gap-4 p-4 md:px-8 md:py-6">
                    {/* Rank & Image */}
                    <div className="col-span-1 flex items-center gap-4 mb-4 md:mb-0">
                      <span className="text-2xl md:text-xl font-black text-red-600 italic">#{c.rank}</span>
                      <img src={c.image_url} className="w-12 h-12 md:w-10 md:h-10 rounded-xl object-cover md:hidden" alt="" />
                    </div>

                    {/* Candidate Info */}
                    <div className="col-span-4 flex items-center gap-4 mb-4 md:mb-0">
                      <img src={c.image_url} className="hidden md:block w-12 h-12 rounded-xl object-cover" alt="" />
                      <div className="flex-1">
                        {editingId === c.id ? (
                          <Input 
                            value={editForm.name} 
                            onChange={e => setEditForm({...editForm, name: e.target.value})} 
                            className="h-10 rounded-xl text-sm font-bold"
                          />
                        ) : (
                          <p className="font-black text-gray-900 uppercase italic truncate">{c.name}</p>
                        )}
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter truncate">{c.description || 'Sin descripción'}</p>
                      </div>
                    </div>

                    {/* Votes (Mobile Friendly) */}
                    <div className="col-span-2 flex items-center justify-between md:justify-center mb-4 md:mb-0 bg-gray-50 md:bg-transparent p-3 md:p-0 rounded-xl">
                      <span className="text-[10px] font-black text-gray-400 uppercase md:hidden">Votos Recibidos</span>
                      <div className="flex items-center gap-2">
                        <Heart size={14} className="text-red-500 fill-red-500" />
                        <span className="font-black text-gray-900">{c.votes || 0}</span>
                      </div>
                    </div>

                    {/* Multimedia Links */}
                    <div className="col-span-3 mb-4 md:mb-0">
                      {editingId === c.id ? (
                        <div className="space-y-2">
                          <Input value={editForm.video_url} onChange={e => setEditForm({...editForm, video_url: e.target.value})} placeholder="URL Video" className="h-8 text-[10px]" />
                          <Input value={editForm.bg_video_url} onChange={e => setEditForm({...editForm, bg_video_url: e.target.value})} placeholder="URL Fondo" className="h-8 text-[10px]" />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] font-bold text-gray-400 uppercase truncate">Video: {c.video_url}</span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase truncate">Fondo: {c.bg_video_url}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex justify-end gap-2 border-t md:border-0 pt-4 md:pt-0">
                      {editingId === c.id ? (
                        <>
                          <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700 rounded-xl h-10 w-10 p-0"><Save size={18} /></Button>
                          <Button onClick={() => setEditingId(null)} size="sm" variant="outline" className="rounded-xl h-10 w-10 p-0"><X size={18} /></Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={() => handleEdit(c)} size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50 rounded-xl h-10 w-10 p-0"><Edit3 size={18} /></Button>
                          <Button onClick={() => removeCandidate(c.id)} size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 rounded-xl h-10 w-10 p-0"><Trash2 size={18} /></Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;