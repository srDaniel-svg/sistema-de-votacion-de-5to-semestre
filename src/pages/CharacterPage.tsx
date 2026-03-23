"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ChevronLeft, ArrowDown, Heart } from 'lucide-react';
import RankingGrid from '@/components/RankingGrid';
import VideoModal from '@/components/VideoModal';
import { TOP_STUDENTS } from '@/constants/students';
import { showSuccess, showError } from '@/utils/toast';

const CharacterPage = () => {
  const { rank } = useParams();
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const student = TOP_STUDENTS.find(s => s.rank === rank);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsVideoOpen(false);
    
    // Verificar si ya votó hoy (simulado con localStorage)
    const lastVote = localStorage.getItem('last_vote_date');
    const today = new Date().toDateString();
    if (lastVote === today) {
      setHasVoted(true);
    }
  }, [rank]);

  const handleVote = () => {
    if (hasVoted) {
      showError("Ya has usado tu crédito de voto por hoy.");
      return;
    }
    
    localStorage.setItem('last_vote_date', new Date().toDateString());
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

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <iframe
          key={student.bgVideoUrl}
          src={student.bgVideoUrl}
          className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 border-none opacity-40 grayscale contrast-125"
          allow="autoplay; encrypted-media; fullscreen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 h-screen w-full flex flex-col">
        <div className="pt-12 px-8 md:px-20">
          <div className="flex justify-between items-start">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold tracking-widest uppercase">Regresar al Inicio</span>
            </button>
            
            <div className="text-right">
              <p className="text-red-600 font-black text-sm tracking-widest uppercase">Ranking No.</p>
              <h2 className="text-7xl md:text-9xl font-black italic leading-none tracking-tighter">
                {student.rank}
              </h2>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-[1600px] mx-auto px-8 md:px-20 flex flex-col md:flex-row items-center justify-between">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10 select-none">
            <h1 className="text-[15vw] font-black uppercase italic leading-none">
              {student.name.split(' ')[0]}
            </h1>
          </div>

          <div className="relative w-full md:w-1/2 h-[70vh] flex items-center justify-center md:justify-start">
            <div className="relative w-full h-full transform -skew-x-6 overflow-hidden border-x-4 border-white/10">
              <img 
                src={student.image} 
                alt={student.name} 
                className="w-full h-full object-cover object-top scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-end text-right space-y-8">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter">
                {student.name}
              </h1>
              <div className="bg-red-600 text-white px-4 py-1 inline-block transform -skew-x-12">
                <p className="text-sm font-bold tracking-widest uppercase">{student.role}</p>
              </div>
            </div>

            <div className="max-w-md">
              <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
                "{student.desc}"
              </p>
            </div>

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
                <Heart fill={hasVoted ? "none" : "currentColor"} />
                {hasVoted ? "Votado" : "Votar"}
              </button>

              <button 
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all transform -skew-x-12"
              >
                <Play fill="currentColor" />
                Ver Presentación
              </button>
            </div>
          </div>
        </div>

        <div className="pb-10 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <p className="text-[10px] font-bold tracking-widest uppercase">Ver Ranking</p>
          <ArrowDown size={20} />
        </div>
      </div>

      <div className="relative z-20 bg-transparent">
        <RankingGrid className="bg-transparent" showBackgroundX={false} />
      </div>
    </div>
  );
};

export default CharacterPage;