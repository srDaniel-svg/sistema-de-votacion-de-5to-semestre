"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ChevronLeft, ArrowDown } from 'lucide-react';
import RankingGrid from '@/components/RankingGrid';
import VideoModal from '@/components/VideoModal';

const TOP_STUDENTS = [
  { 
    rank: "01", 
    name: "Juan Manuel Terrazas", 
    bvid: "BV1gj411n7ge", 
    image: "https://i.postimg.cc/52fbMfLK/Whats-App-Image-2026-03-17-at-19-11-53-(2).jpg", 
    desc: "Arquitecto de sistemas con visión global y liderazgo técnico." 
  },
  { 
    rank: "02", 
    name: "Maria Gomez", 
    bvid: "BV1uT4y1P791", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop", 
    desc: "Experta en análisis de datos masivos." 
  },
  { 
    rank: "03", 
    name: "Carlos Paez", 
    bvid: "BV1v54y1h7v6", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop", 
    desc: "Especialista en seguridad ofensiva." 
  },
  { 
    rank: "04", 
    name: "Lucia Torrez", 
    bvid: "BV17y4y1H7vB", 
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop", 
    desc: "Investigadora de IA y redes neuronales." 
  },
  { 
    rank: "05", 
    name: "Juan Mendez", 
    bvid: "BV1p54y1j7vS", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop", 
    desc: "Desarrollador Fullstack de alto rendimiento." 
  },
  { 
    rank: "06", 
    name: "Elena Rios", 
    bvid: "BV1f54y1h7vG", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1200&fit=crop", 
    desc: "Ingeniera de Cloud y escalabilidad." 
  },
  { 
    rank: "07", 
    name: "Roberto Soliz", 
    bvid: "BV1k54y1h7vH", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1200&fit=crop", 
    desc: "Líder en desarrollo de aplicaciones móviles." 
  },
  { 
    rank: "08", 
    name: "Sofia Luna", 
    bvid: "BV1m54y1h7vJ", 
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1200&fit=crop", 
    desc: "Diseñadora de experiencias digitales." 
  },
  { 
    rank: "09", 
    name: "Diego Vaca", 
    bvid: "BV1n54y1h7vK", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1200&fit=crop", 
    desc: "Arquitecto de infraestructura y DevOps." 
  },
  { 
    rank: "10", 
    name: "Ana Belen", 
    bvid: "BV1o54y1h7vL", 
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop", 
    desc: "Desarrolladora de contratos inteligentes." 
  },
];

const CharacterPage = () => {
  const { rank } = useParams();
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const student = TOP_STUDENTS.find(s => s.rank === rank);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsVideoOpen(false);
  }, [rank]);

  if (!student) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Personaje no encontrado</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        bvid={student.bvid} 
      />

      {/* Background Video (Bilibili Iframe) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <iframe
          key={student.bvid}
          src={`//player.bilibili.com/player.html?bvid=${student.bvid}&page=1&high_quality=1&autoplay=1&muted=1`}
          className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 border-none opacity-40 grayscale contrast-125"
          allow="autoplay; encrypted-media; fullscreen"
          scrolling="no"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
      </div>

      {/* Hero Content Section */}
      <div className="relative z-10 h-screen w-full flex flex-col">
        {/* Header Info */}
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

        {/* Main Content */}
        <div className="flex-1 max-w-[1600px] mx-auto px-8 md:px-20 flex flex-col md:flex-row items-center justify-between">
          
          {/* Character Name (Large Background Text) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10 select-none">
            <h1 className="text-[15vw] font-black uppercase italic leading-none">
              {student.name.split(' ')[0]}
            </h1>
          </div>

          {/* Left: Character Image */}
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

          {/* Right: Details */}
          <div className="w-full md:w-1/2 flex flex-col items-end text-right space-y-8">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter">
                {student.name}
              </h1>
              <div className="bg-red-600 text-white px-4 py-1 inline-block transform -skew-x-12">
                <p className="text-sm font-bold tracking-widest uppercase">Sistemas UAGRM Hero</p>
              </div>
            </div>

            <div className="max-w-md">
              <p className="text-gray-400 text-lg leading-relaxed font-medium italic">
                "{student.desc} Un talento excepcional que redefine los límites de la tecnología en nuestra facultad."
              </p>
            </div>

            {/* Movie Preview Section */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase">Character Concept Movie</p>
              <div 
                className="relative group cursor-pointer"
                onClick={() => setIsVideoOpen(true)}
              >
                <div className="w-80 h-44 border-2 border-white/20 overflow-hidden transform -skew-x-12 group-hover:border-red-600 transition-all duration-500">
                  <iframe 
                    src={`//player.bilibili.com/player.html?bvid=${student.bvid}&page=1&autoplay=0&muted=1`}
                    className="w-full h-full border-none scale-125 skew-x-12 opacity-40 group-hover:opacity-100 transition-all duration-500 pointer-events-none" 
                    scrolling="no"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play size={20} fill="white" className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pb-10 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <p className="text-[10px] font-bold tracking-widest uppercase">Ver Ranking</p>
          <ArrowDown size={20} />
        </div>
      </div>

      {/* Ranking Section (Transparent) */}
      <div className="relative z-20 bg-transparent">
        <RankingGrid className="bg-transparent" showBackgroundX={false} />
      </div>

      {/* Bottom Decorative Bar */}
      <div className="fixed bottom-0 w-full h-1 bg-red-600 z-50" />
    </div>
  );
};

export default CharacterPage;