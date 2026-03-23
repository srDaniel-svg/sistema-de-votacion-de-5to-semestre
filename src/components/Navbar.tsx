"use client";

import React from 'react';
import { Monitor, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <Monitor className="text-white" size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              SISTEMAS <span className="text-red-600">UAGRM</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Inicio</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Carrera</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Ranking</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Contacto</a>
          </div>

          <button className="md:hidden p-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;