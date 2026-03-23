"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, ShieldCheck, Mail, Lock } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 pt-24 flex flex-col items-center px-4">
      <Navbar />
      
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 mt-10">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="login" className="rounded-lg font-bold">Entrar</TabsTrigger>
            <TabsTrigger value="register" className="rounded-lg font-bold">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="tu@correo.com" 
                    className="pl-10 h-12 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 rounded-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all" disabled={loading}>
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setRole('votante')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    role === 'votante' ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-100 text-gray-400'
                  }`}
                >
                  <User size={24} />
                  <span className="text-xs font-bold uppercase">Votante</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                    role === 'admin' ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-100 text-gray-400'
                  }`}
                >
                  <ShieldCheck size={24} />
                  <span className="text-xs font-bold uppercase">Admin</span>
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Correo Electrónico</Label>
                <Input 
                  id="reg-email" 
                  type="email" 
                  placeholder="tu@correo.com" 
                  className="h-12 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Contraseña</Label>
                <Input 
                  id="reg-password" 
                  type="password" 
                  placeholder="Mínimo 6 caracteres" 
                  className="h-12 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-all" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}