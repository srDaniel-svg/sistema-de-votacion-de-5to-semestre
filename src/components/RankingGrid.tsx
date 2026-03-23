"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RankingCard from './RankingCard';
import BackgroundX from './BackgroundX';
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface RankingGridProps {
  className?: string;
  showBackgroundX?: boolean;
}

const RankingGrid = ({ className, showBackgroundX = true }: RankingGridProps) => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      const { data } = await supabase
        .from('candidates')
        .select('*')
        .order('rank', { ascending: true });
      
      if (data) setCandidates(data);
      setLoading(false);
    };

    fetchCandidates();
  }, []);

  if (loading) return <div className="py-20 text-center font-black italic text-gray-400">CARGANDO RANKING...</div>;

  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="relative py-24">
        {showBackgroundX && <BackgroundX />}
        
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="mb-20 relative">
            <h2 className="text-7xl md:text-9xl font-black opacity-5 absolute -top-12 left-0 select-none tracking-tighter">
              CHARACTER
            </h2>
            <h2 className="text-4xl md:text-6xl font-black relative z-10 italic flex items-center gap-4">
              <span className="w-12 h-1 bg-red-600" />
              TOP <span className="text-red-600">SISTEMAS</span>
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {/* Fila 1 (Top 1-5) */}
            <div className="flex flex-wrap items-center justify-center -space-x-4 md:-space-x-8">
              <div className="hidden lg:block w-40 h-80 bg-black/5 backdrop-blur-sm transform -skew-x-12 border-x border-black/5" />
              {candidates.slice(0, 5).map((student) => (
                <RankingCard 
                  key={student.id} 
                  rank={student.rank}
                  name={student.name}
                  role={student.description || "Candidato"}
                  image={student.image_url}
                  className="w-full max-w-[180px] sm:max-w-[220px]"
                  onClick={() => navigate(`/character/${student.rank}`)}
                />
              ))}
            </div>

            {/* Fila 2 (Top 6-10) */}
            <div className="flex flex-wrap items-center justify-center -space-x-4 md:-space-x-8">
              {candidates.slice(5, 10).map((student) => (
                <RankingCard 
                  key={student.id} 
                  rank={student.rank}
                  name={student.name}
                  role={student.description || "Candidato"}
                  image={student.image_url}
                  className="w-full max-w-[180px] sm:max-w-[220px]"
                  onClick={() => navigate(`/character/${student.rank}`)}
                />
              ))}
              <div className="hidden lg:block w-40 h-80 bg-black/5 backdrop-blur-sm transform -skew-x-12 border-x border-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingGrid;