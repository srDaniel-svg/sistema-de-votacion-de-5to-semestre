"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import RankingGrid from '@/components/RankingGrid';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { ArrowRight, Code, Database, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-600">
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <div className="text-[20rem] font-black text-gray-200 leading-none transform rotate-12 translate-x-20">
            UAGRM
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Facultad de Ingeniería en Ciencias de la Computación
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6">
              Forjando el Futuro <br />
              <span className="text-red-600 italic">Tecnológico</span> de Bolivia.
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl">
              Bienvenidos al portal oficial de Ingeniería en Sistemas de la Universidad Autónoma Gabriel René Moreno. 
              Excelencia académica, innovación y liderazgo en el corazón de Santa Cruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-red-600 transition-all flex items-center gap-2 group">
                Ver Plan de Estudios
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-xl hover:border-red-600 transition-all">
                Admisiones 2024
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: <Code className="text-red-600" />, title: "Desarrollo de Software", desc: "Domina los lenguajes y arquitecturas más demandadas del mercado global." },
            { icon: <Database className="text-red-600" />, title: "Ciencia de Datos", desc: "Transforma información en decisiones estratégicas con IA y Big Data." },
            { icon: <Shield className="text-red-600" />, title: "Ciberseguridad", desc: "Protege infraestructuras críticas y lidera la defensa digital." }
          ].map((feat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feat.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ranking Section */}
      <RankingGrid className="bg-white" />

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500">
            © 2024 Ingeniería en Sistemas - UAGRM. Todos los derechos reservados.
          </div>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;