"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ChevronLeft, ArrowDown, Heart, User } from 'lucide-react';
import RankingGrid from '@/components/RankingGrid';
import VideoModal from '@/components/VideoModal';
import { TOP_STUDENTS } from '@/constants/students';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from "@/integrations/supabase/client";

const CharacterPage = () => {
  const { rank } = useParams();
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const student = TOP_STUDENTS.find(s => s.rank === rank);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const lastVote = localStorage.getItem(`vote_${rank}_${new Date().toDateString()}`);
    if (lastVote) setHasVoted(true);
  }, [rank]);

  const handleVote = () => {
    if (!user) {
      showError("Debes iniciar sesión para votar.");
      navigate('/login');
      return;
    }
    
    if (hasVoted) {
      showError("Ya has votado por este candidato hoy.");
      return;
    }
    
    localStorage.setItem(`vote_${rank}_${new Date().toDateString()}`, 'true');
    setHasVoted(true);
    showSuccess(`¡Voto registrado para ${student?.name}!`);
  };

  if (!student) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Personaje no encontrado</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoUrl={student.videoUrl} 
      />

      {/* Background Video Individual */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <iframe
          key={student.bgVideoUrl}
          src={`${student.bgVideoUrl}&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1`}
          className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 border-none opacity-30 grayscale contrast-125"
          allow="autoplay; encrypted-media; fullscreen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      <div className="relative z-10 min-h-screen w-full flex flex-col">
        <div className="pt-12 px-8 md:px-20 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold tracking-widest uppercase">Regresar</span>
          </button>
          
          {user ? (
            <div className="flex items-center gap-2 text-xs font-bold text-white/60">
              <User size={14} />
              {user.email}
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className="text-xs font-bold text-red-600 hover:text-red-500 uppercase tracking-widest">
              Iniciar Sesión
            </button>
          )}
        </div>

        <div className="flex-1 max-w-[1600px] mx-auto px-8 md:px-20 flex flex-col md:flex-row items-center justify-between py-12">
          <div className="relative w-full md:w-1/2 h-[50vh] md:h-[70vh] flex items-center justify-center">
            <div className="relative w-full h-full transform -skew-x-6 overflow-hidden border-x-4 border-white/10 group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
              <img 
                src={student.image} 
                alt={student.name} 
                className="w-full h-full object-cover object-top scale-110 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Play fill="white" className="ml-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-end text-right space-y-6 mt-8 md:mt-0">
            <div className="text-right">
              <p className="text-red-600 font-black text-sm tracking-widest uppercase">Ranking No.</p>
              <h2 className="text-6xl md:text-9xl font-black italic leading-none tracking-tighter">
                {student.rank}
              </h2>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter">
                {student.name}
              </h1>
              <div className="bg-red-600 text-white px-4 py-1 inline-block transform -skew-x-12">
                <p className="text-xs font-bold tracking-widest uppercase">{student.role}</p>
              </div>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed font-medium italic max-w-md">
              "{student.desc}"
            </p>

            <div className="flex gap-4">
              <button 
                onClick={handleVote}
                disabled={hasVoted}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all transform -skew-x-12 ${
                  hasVoted 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-black hover:bg-red-600 hover:text-white'
                }`}
              >
                <Heart fill={hasVoted ? "currentColor" : "none"} />
                {hasVoted ? "Votado" : "Votar"}
              </button>

              <button 
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-3 px-6 py-4 bg-red-600/20 border border-red-600/50 text-red-600 rounded-xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all transform -skew-x-12"
              >
                <Play size={18} fill="currentColor" />
                Presentación
              </button>
            </div>
          </div>
        </div>

        <div className="pb-10 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <p className="text-[10px] font-bold tracking-widest uppercase">Ver Ranking</p>
          <ArrowDown size={20} />
        </div>
      </div>

      <div className="relative z-20 bg-black/50 backdrop-blur-xl">
        <RankingGrid className="bg-transparent" showBackgroundX={false} />
      </div>
    </div>
  );
};

export default CharacterPage;