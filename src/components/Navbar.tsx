"use client";

import React, { useEffect, useState } from 'react';
import { Menu, ShieldAlert } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

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

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo2.png" 
                alt="Logo UAGRM" 
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold text-xl tracking-tight text-gray-900">
                SISTEMAS <span className="text-red-600">UAGRM</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Inicio</Link>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Carrera</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors">Ranking</a>
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

          <button className="md:hidden p-2 text-gray-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;