"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface RankingCardProps {
  rank: string;
  name: string;
  role: string;
  image: string;
  className?: string;
  onClick?: () => void;
}

const RankingCard = ({ rank, name, role, image, className, onClick }: RankingCardProps) => {
  return (
    <div 
      className={cn("relative group cursor-pointer z-10", className)}
      onClick={onClick}
    >
      {/* Shape Container */}
      <div className="relative overflow-hidden transform md:-skew-x-12 bg-gray-200 border-r border-white/20 group-hover:z-20 transition-all duration-300 h-56 sm:h-80 shadow-xl rounded-xl md:rounded-none">
        {/* Image */}
        <div className="absolute inset-0 transform md:skew-x-12 md:scale-150">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* Overlay Info */}
        <div className="absolute top-2 right-3 md:right-4 transform md:skew-x-12 bg-black px-2 py-0.5">
          <p className="text-[7px] md:text-[8px] font-bold text-white uppercase tracking-widest">
            CANDIDATO
          </p>
          <p className="text-[9px] md:text-[10px] font-black text-white uppercase italic truncate max-w-[80px]">
            {name.split(' ')[0]}
          </p>
        </div>

        {/* Rank Number */}
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 transform md:skew-x-12">
          <div className="relative">
            <p className="text-[7px] md:text-[8px] font-bold text-black bg-white px-1 inline-block mb-0.5 md:mb-1">
              RANK No.
            </p>
            <h3 className="text-4xl md:text-7xl font-black text-red-600 leading-none tracking-tighter italic">
              {rank}
            </h3>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600 transition-colors duration-300 rounded-xl md:rounded-none" />
      </div>
    </div>
  );
};

export default RankingCard;