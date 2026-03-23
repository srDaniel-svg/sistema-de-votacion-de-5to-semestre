"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white pt-24 flex flex-col items-center px-4">
      <Navbar />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mt-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900">Bienvenido</h1>
          <p className="text-gray-500">Regístrate para votar por tu candidato favorito</p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#dc2626',
                  brandAccent: '#b91c1c',
                }
              }
            }
          }}
          localization={{
            variables: {
              sign_up: {
                email_label: 'Correo electrónico',
                password_label: 'Contraseña',
                button_label: 'Registrarse',
                link_text: '¿No tienes cuenta? Regístrate',
              },
              sign_in: {
                email_label: 'Correo electrónico',
                password_label: 'Contraseña',
                button_label: 'Iniciar sesión',
                link_text: '¿Ya tienes cuenta? Inicia sesión',
              }
            }
          }}
          theme="light"
        />
      </div>
    </div>
  );
}