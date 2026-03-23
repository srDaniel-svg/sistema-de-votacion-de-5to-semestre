"use client";

import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110] group"
      >
        <X size={48} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <div className="relative w-full max-w-6xl aspect-video px-4 md:px-10 animate-in zoom-in-95 duration-300">
        <div className="w-full h-full border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
          <iframe 
            src={videoUrl}
            className="w-full h-full border-none" 
            allow="autoplay; fullscreen; encrypted-media"
            scrolling="no"
          />
          
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-red-600" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-red-600" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-red-600" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-red-600" />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;