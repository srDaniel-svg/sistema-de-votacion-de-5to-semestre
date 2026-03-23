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
      try {
        const { data, error } = await supabase
          .from('candidates')
          .select('*')
          .order('rank', { ascending: true });
        
        if (error) throw error;

        if (data) {
          setCandidates(data);
          const total = data.reduce((acc, curr) => acc + (curr.votes || 0), 0);
          setTotalVotes(total);
        }
      } catch (err) {
        console.error("Error fetching candidates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return (
    <div className="py-40 text-center">
      <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-black italic text-gray-400 uppercase tracking-widest">Cargando Ranking...</p>
    </div>
  );

  const isDark = className?.includes('bg-transparent') || className?.includes('bg-black');

  return (
    <section className={cn("relative overflow-hidden min-h-[600px]", className)}>
      <div className="relative py-12 md:py-24">
        {showBackgroundX && <div className="hidden md:block"><BackgroundX /></div>}
        
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-12 md:mb-24 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="relative">
              <h2 className={cn(
                "text-6xl md:text-9xl font-black absolute -top-8 md:-top-16 left-0 select-none tracking-tighter whitespace-nowrap",
                isDark ? "opacity-10 text-white" : "opacity-5 text-black"
              )}>
                RANKING
              </h2>
              <h2 className={cn(
                "text-3xl md:text-6xl font-black relative z-10 italic flex items-center gap-3 md:gap-4",
                isDark ? "text-white" : "text-black"
              )}>
                <span className="w-8 md:w-16 h-1.5 bg-red-600" />
                TOP <span className="text-red-600">CANDIDATOS</span>
              </h2>
            </div>

            <div className="relative z-10 flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-xl md:rounded-none md:-skew-x-12 shadow-xl self-start md:self-auto">
              <Heart size={24} className="fill-white animate-pulse" />
              <div className="md:skew-x-12">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none mb-1">Votos Totales</p>
                <p className="text-2xl font-black italic leading-none">{totalVotes.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {candidates.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
              <p className="text-gray-400 font-bold italic">No hay candidatos registrados aún.</p>
            </div>
          ) : (
            <>
              {/* Mobile Grid */}
              <div className="grid grid-cols-2 gap-4 md:hidden">
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

              {/* Desktop Layout */}
              <div className="hidden md:flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center -space-x-10">
                  <div className={cn(
                    "w-48 h-96 backdrop-blur-sm transform -skew-x-12 border-x border-white/10",
                    isDark ? "bg-white/5" : "bg-black/5"
                  )} />
                  {candidates.slice(0, 5).map((student) => (
                    <RankingCard 
                      key={student.id} 
                      rank={student.rank}
                      name={student.name}
                      role={student.description || "Candidato"}
                      image={student.image_url}
                      className="w-[240px]"
                      onClick={() => {
                        navigate(`/character/${student.rank}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center -space-x-10">
                  {candidates.slice(5, 10).map((student) => (
                    <RankingCard 
                      key={student.id} 
                      rank={student.rank}
                      name={student.name}
                      role={student.description || "Candidato"}
                      image={student.image_url}
                      className="w-[240px]"
                      onClick={() => {
                        navigate(`/character/${student.rank}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  ))}
                  <div className={cn(
                    "w-48 h-96 backdrop-blur-sm transform -skew-x-12 border-x border-white/10",
                    isDark ? "bg-white/5" : "bg-black/5"
                  )} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default RankingGrid;