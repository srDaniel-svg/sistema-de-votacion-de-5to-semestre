"use client";

import React from 'react';

const BackgroundX = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full opacity-20"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {/* Línea Diagonal 1 */}
        <line
          x1="0" y1="0" x2="1000" y2="1000"
          stroke="red"
          strokeWidth="1"
          className="animate-draw-line"
        />
        {/* Línea Diagonal 2 */}
        <line
          x1="1000" y1="0" x2="0" y2="1000"
          stroke="red"
          strokeWidth="1"
          className="animate-draw-line-delay"
        />
        
        {/* X Grande en el centro */}
        <path
          d="M 300 200 L 700 800 M 700 200 L 300 800"
          stroke="red"
          strokeWidth="0.5"
          fill="none"
          className="animate-draw-x"
        />
      </svg>

      <style jsx>{`
        @keyframes drawLine {
          0% { stroke-dasharray: 1500; stroke-dashoffset: 1500; opacity: 0; }
          20% { opacity: 1; }
          50% { stroke-dashoffset: 0; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -1500; opacity: 0; }
        }

        .animate-draw-line {
          stroke-dasharray: 1500;
          animation: drawLine 8s linear infinite;
        }

        .animate-draw-line-delay {
          stroke-dasharray: 1500;
          animation: drawLine 8s linear infinite;
          animation-delay: 4s;
        }

        .animate-draw-x {
          stroke-dasharray: 1000;
          animation: drawLine 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundX;