"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'votante' | 'admin'>('votante');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/');
    });
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }
      }
    });

    if (error) {
      showError(error.message);
    } else {
      showSuccess("¡Registro exitoso! Revisa tu correo para confirmar.");
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Bienvenido de nuevo");
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center relative overflow-hidden">
      <Navbar />
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-red-50/50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent -z-10" />

      <div className="w-full max-w-md px-6 pt-32 pb-12 flex flex-col items-center">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
            Bienvenido al <span className="text-red-600">Portal</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Ingresa tus credenciales para acceder a la plataforma.
          </p>
        </div>

        <div className="w-full bg-white p-1 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 animate-in zoom-in-95 duration-500">
          <div className="bg-white p-6 sm:p-8 rounded-[1.8rem]">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                <TabsTrigger 
                  value="login" 
                  className="rounded-xl font-bold text-xs uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-red-600 transition-all"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="rounded-xl font-bold text-xs uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-red-600 transition-all"
                >
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-5 animate-in fade-in duration-300">
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Correo Electrónico</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="ejemplo@uagrm.edu.bo" 
                        className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-red-500/20 transition-all text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Contraseña</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-12 h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-red-500/20 transition-all text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2" 
                    disabled={loading}
                  >
                    {loading ? "Procesando..." : (
                      <>
                        Iniciar Sesión
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-5 animate-in fade-in duration-300">
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <button
                      type="button"
                      onClick={() => setRole('votante')}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                        role === 'votante' ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-50 bg-gray-50 text-gray-400'
                      }`}
                    >
                      <User size={20} />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Votante</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                        role === 'admin' ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-50 bg-gray-50 text-gray-400'
                      }`}
                    >
                      <ShieldCheck size={20} />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Admin</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Correo Electrónico</Label>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="tu@correo.com" 
                      className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password" className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Contraseña</Label>
                    <Input 
                      id="reg-password" 
                      type="password" 
                      placeholder="Mínimo 6 caracteres" 
                      className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white text-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    className="w-full h-14 bg-gray-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all active:scale-[0.98]" 
                    disabled={loading}
                  >
                    {loading ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-400 font-medium">
          Al continuar, aceptas nuestros <span className="text-gray-600 underline cursor-pointer">Términos de Servicio</span> y <span className="text-gray-600 underline cursor-pointer">Política de Privacidad</span>.
        </p>
      </div>
    </div>
  );
}