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
      {/* Shape Container with Skew */}
      <div className="relative overflow-hidden transform -skew-x-12 bg-gray-200 border-r border-white/20 group-hover:z-20 transition-all duration-300 h-64 sm:h-80 shadow-xl">
        {/* Image with reverse skew */}
        <div className="absolute inset-0 transform skew-x-12 scale-150">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        {/* Overlay Info */}
        <div className="absolute top-2 right-4 transform skew-x-12 bg-black px-2 py-0.5">
          <p className="text-[8px] font-bold text-white uppercase tracking-widest">
            HERO NAME
          </p>
          <p className="text-[10px] font-black text-white uppercase italic">
            {name.split(' ')[0]}
          </p>
        </div>

        {/* Rank Number - Big and Red */}
        <div className="absolute bottom-4 left-4 transform skew-x-12">
          <div className="relative">
            <p className="text-[8px] font-bold text-black bg-white px-1 inline-block mb-1">
              RANKING No.
            </p>
            <h3 className="text-5xl sm:text-7xl font-black text-red-600 leading-none tracking-tighter italic">
              {rank}
            </h3>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600 transition-colors duration-300" />
      </div>
    </div>
  );
};

export default RankingCard;