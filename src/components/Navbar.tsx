"use client";

import React, { useEffect, useState } from 'react';
import { Menu, ShieldAlert, X, Home, GraduationCap, Trophy } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        if (profile?.role === 'admin') {
          setIsAdmin(true);
        }
      }
    };
    checkAdmin();
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', path: '/', icon: <Home size={18} /> },
    { name: 'Carrera', path: '#', icon: <GraduationCap size={18} /> },
    { name: 'Ranking', path: '#', icon: <Trophy size={18} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/logo2.png" 
                alt="Logo UAGRM" 
                className="h-8 sm:h-10 w-auto object-contain"
              />
              <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-900">
                SISTEMAS <span className="text-red-600">UAGRM</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-black uppercase italic rounded-lg hover:bg-red-700 transition-all"
              >
                <ShieldAlert size={14} />
                Panel Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 top-16 bg-white z-40 md:hidden transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className="flex items-center gap-4 p-4 text-lg font-bold text-gray-800 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all"
            >
              <span className="text-red-600">{link.icon}</span>
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link 
              to="/admin" 
              className="flex items-center gap-4 p-4 text-lg font-bold text-white bg-red-600 rounded-2xl shadow-lg shadow-red-200"
            >
              <ShieldAlert size={20} />
              Panel de Administración
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;