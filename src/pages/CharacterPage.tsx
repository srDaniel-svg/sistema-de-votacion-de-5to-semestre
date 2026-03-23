"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ChevronLeft, Heart } from 'lucide-react';
import RankingGrid from '@/components/RankingGrid';
import VideoModal from '@/components/VideoModal';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";

const CharacterPage = () => {
  const { rank } = useParams();
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // Función para convertir cualquier URL de YouTube al formato /embed/
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("embed/")) return url;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      const { data } = await supabase.from('candidates').select('*').eq('rank', rank).single();
      if (data) setStudent(data);
      else navigate('/');

      const lastVote = localStorage.getItem(`vote_${rank}_${new Date().toDateString()}`);
      if (lastVote) setHasVoted(true);
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [rank, navigate]);

  const handleVote = async () => {
    if (!user) { navigate('/login'); return; }
    if (hasVoted) { showError("Ya has votado hoy."); return; }
    
    const { error } = await supabase.from('candidates').update({ votes: (student.votes || 0) + 1 }).eq('id', student.id);
    if (!error) {
      localStorage.setItem(`vote_${rank}_${new Date().toDateString()}`, 'true');
      setHasVoted(true);
      showSuccess(`¡Voto registrado!`);
    }
  };

  if (!student) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Cargando...</div>;

  const videoUrl = getEmbedUrl(student.video_url);
  const bgVideoUrl = getEmbedUrl(student.bg_video_url);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} videoUrl={videoUrl} />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <iframe
          key={bgVideoUrl}
          src={`${bgVideoUrl}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=${bgVideoUrl.split('/').pop()}`}
          className="absolute top-1/2 left-1/2 w-[200%] h-[150%] md:w-[150%] -translate-x-1/2 -translate-y-1/2 border-none opacity-30 grayscale contrast-125"
          allow="autoplay; encrypted-media; fullscreen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      <div className="relative z-10 min-h-screen w-full flex flex-col">
        <div className="pt-8 md:pt-12 px-4 md:px-20 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">Regresar</span>
          </button>
          <div className="text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-widest truncate max-w-[150px] md:max-w-none">
            {user?.email}
          </div>
        </div>

        <div className="flex-1 max-w-[1600px] mx-auto px-4 md:px-20 flex flex-col md:flex-row items-center justify-center md:justify-between py-8 md:py-12 gap-8 md:gap-0">
          <div className="relative w-full md:w-1/2 h-[40vh] sm:h-[50vh] md:h-[70vh] flex items-center justify-center">
            <div 
              className="relative w-full h-full transform md:-skew-x-6 overflow-hidden border-x-2 md:border-x-4 border-white/10 group cursor-pointer rounded-2xl md:rounded-none" 
              onClick={() => setIsVideoOpen(true)}
            >
              <img src={student.image_url} alt={student.name} className="w-full h-full object-cover object-top scale-110 grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Play fill="white" className="ml-1" size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right space-y-4 md:space-y-6">
            <div className="md:text-right">
              <p className="text-red-600 font-black text-xs md:text-sm tracking-widest uppercase">Ranking No.</p>
              <h2 className="text-7xl md:text-9xl font-black italic leading-none tracking-tighter">{student.rank}</h2>
            </div>
            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight">{student.name}</h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium italic max-w-md">"{student.description}"</p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button 
                onClick={handleVote} 
                disabled={hasVoted} 
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all transform md:-skew-x-12 w-full sm:w-auto ${
                  hasVoted ? 'bg-gray-800 text-gray-500' : 'bg-white text-black hover:bg-red-600 hover:text-white active:scale-95'
                }`}
              >
                <Heart fill={hasVoted ? "currentColor" : "none"} size={20} /> 
                {hasVoted ? "Votado" : "Votar"}
              </button>
              <button 
                onClick={() => setIsVideoOpen(true)} 
                className="flex items-center justify-center gap-3 px-6 py-4 bg-red-600/20 border border-red-600/50 text-red-600 rounded-xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all transform md:-skew-x-12 w-full sm:w-auto active:scale-95"
              >
                <Play size={18} fill="currentColor" /> Presentación
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-20 border-t border-white/10">
          <RankingGrid className="bg-transparent" showBackgroundX={false} />
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;