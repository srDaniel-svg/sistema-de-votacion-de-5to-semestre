"use client";

import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  bvid: string;
}

const VideoModal = ({ isOpen, onClose, bvid }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110] group"
      >
        <X size={48} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Video Container */}
      <div className="relative w-full max-w-6xl aspect-video px-4 md:px-10 animate-in zoom-in-95 duration-300">
        <div className="w-full h-full border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
          <iframe 
            src={`//player.bilibili.com/player.html?bvid=${bvid}&page=1&autoplay=1`}
            className="w-full h-full border-none" 
            allow="autoplay; fullscreen"
            scrolling="no"
          />
          
          {/* Decorative corners */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-red-600" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-red-600" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-red-600" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-red-600" />
        </div>
        
        {/* Caption style from image */}
        <div className="mt-6 flex justify-end">
          <div className="flex items-center gap-3 text-white/40 italic">
            <span className="text-xs font-bold tracking-[0.2em]">CHARACTER STORY MOVIE</span>
            <div className="w-12 h-[1px] bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;