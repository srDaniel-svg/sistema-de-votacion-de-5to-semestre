"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RankingCard from './RankingCard';
import BackgroundX from './BackgroundX';
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from 'lucide-react';

interface RankingGridProps {
  className?: string;
  showBackgroundX?: boolean;
}

const RankingGrid = ({ className, showBackgroundX = true }: RankingGridProps) => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const { data } = await supabase
        .from('candidates')
        .select('*')
        .order('rank', { ascending: true });
      
      if (data) {
        setCandidates(data);
        const total = data.reduce((acc, curr) => acc + (curr.votes || 0), 0);
        setTotalVotes(total);
      }
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  if (loading) return <div className="py-20 text-center font-black italic text-gray-400">CARGANDO RANKING...</div>;

  const isDark = className?.includes('bg-transparent') || className?.includes('bg-black');

  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="relative py-12 md:py-24">
        {showBackgroundX && <div className="hidden md:block"><BackgroundX /></div>}
        
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-8 md:mb-20 relative flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="relative">
              <h2 className={cn(
                "text-5xl md:text-9xl font-black absolute -top-6 md:-top-12 left-0 select-none tracking-tighter",
                isDark ? "opacity-10 text-white" : "opacity-5 text-black"
              )}>
                RANKING
              </h2>
              <h2 className={cn(
                "text-2xl md:text-6xl font-black relative z-10 italic flex items-center gap-3 md:gap-4",
                isDark ? "text-white" : "text-black"
              )}>
                <span className="w-8 md:w-12 h-1 bg-red-600" />
                TOP <span className="text-red-600">CANDIDATOS</span>
              </h2>
            </div>

            {/* Contador de Votos Totales */}
            <div className="relative z-10 flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-xl md:rounded-none md:-skew-x-12 shadow-lg self-start md:self-auto">
              <Heart size={18} className="fill-white animate-pulse" />
              <div className="md:skew-x-12">
                <p className="text-[8px] font-black uppercase tracking-widest opacity-80">Votos Totales</p>
                <p className="text-xl font-black italic leading-none">{totalVotes.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Mobile Grid: Optimizado y Fluido */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {candidates.map((student) => (
              <RankingCard 
                key={student.id} 
                rank={student.rank}
                name={student.name}
                role={student.description || "Candidato"}
                image={student.image_url}
                className="w-full"
                onClick={() => {
                  navigate(`/character/${student.rank}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>

          {/* Desktop Layout: Restaurado al original con efectos */}
          <div className="hidden md:flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-center -space-x-8">
              <div className={cn(
                "w-40 h-80 backdrop-blur-sm transform -skew-x-12 border-x",
                isDark ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              )} />
              {candidates.slice(0, 5).map((student) => (
                <RankingCard 
                  key={student.id} 
                  rank={student.rank}
                  name={student.name}
                  role={student.description || "Candidato"}
                  image={student.image_url}
                  className="max-w-[220px]"
                  onClick={() => {
                    navigate(`/character/${student.rank}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center -space-x-8">
              {candidates.slice(5, 10).map((student) => (
                <RankingCard 
                  key={student.id} 
                  rank={student.rank}
                  name={student.name}
                  role={student.description || "Candidato"}
                  image={student.image_url}
                  className="max-w-[220px]"
                  onClick={() => {
                    navigate(`/character/${student.rank}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
              <div className={cn(
                "w-40 h-80 backdrop-blur-sm transform -skew-x-12 border-x",
                isDark ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
              )} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingGrid;