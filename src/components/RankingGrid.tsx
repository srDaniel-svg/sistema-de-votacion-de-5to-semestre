"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import RankingCard from './RankingCard';
import BackgroundX from './BackgroundX';
import { cn } from "@/lib/utils";

interface RankingGridProps {
  className?: string;
  showBackgroundX?: boolean;
}

const TOP_STUDENTS = [
  { rank: "01", name: "Juan Manuel Terrazas", role: "Software Architect", image: "https://i.postimg.cc/52fbMfLK/Whats-App-Image-2026-03-17-at-19-11-53-(2).jpg" },
  { rank: "02", name: "Maria Gomez", role: "Data Scientist", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop" },
  { rank: "03", name: "Carlos Paez", role: "Cybersecurity", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop" },
  { rank: "04", name: "Lucia Torrez", role: "AI Researcher", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop" },
  { rank: "05", name: "Juan Mendez", role: "Fullstack Dev", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1200&fit=crop" },
  { rank: "06", name: "Elena Rios", role: "Cloud Engineer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1200&fit=crop" },
  { rank: "07", name: "Roberto Soliz", role: "Mobile Expert", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1200&fit=crop" },
  { rank: "08", name: "Sofia Luna", role: "UX Designer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1200&fit=crop" },
  { rank: "09", name: "Diego Vaca", role: "DevOps Lead", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1200&fit=crop" },
  { rank: "10", name: "Ana Belen", role: "Blockchain Dev", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&fit=crop" },
];

const RankingGrid = ({ className, showBackgroundX = true }: RankingGridProps) => {
  const navigate = useNavigate();

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
            {/* Fila 1 */}
            <div className="flex items-center justify-center -space-x-4 md:-space-x-8">
              <div className="hidden md:block w-40 h-80 bg-black/20 backdrop-blur-sm transform -skew-x-12 border-x border-white/10" />
              {TOP_STUDENTS.slice(0, 5).map((student) => (
                <RankingCard 
                  key={student.rank} 
                  {...student} 
                  className="w-full max-w-[220px]"
                  onClick={() => navigate(`/character/${student.rank}`)}
                />
              ))}
            </div>

            {/* Fila 2 */}
            <div className="flex items-center justify-center -space-x-4 md:-space-x-8">
              {TOP_STUDENTS.slice(5, 10).map((student) => (
                <RankingCard 
                  key={student.rank} 
                  {...student} 
                  className="w-full max-w-[220px]"
                  onClick={() => navigate(`/character/${student.rank}`)}
                />
              ))}
              <div className="hidden md:block w-40 h-80 bg-black/20 backdrop-blur-sm transform -skew-x-12 border-x border-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingGrid;