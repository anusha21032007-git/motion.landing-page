"use client";

import React from 'react';
import ArthurReveal from '@/components/ArthurReveal';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <main className="relative w-full bg-[#050505] selection:bg-blue-500/30">
      {/* Luxury Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 p-8 flex justify-between items-center pointer-events-none">
        <div className="text-[10px] tracking-[0.8em] font-bold uppercase pointer-events-auto cursor-pointer mix-blend-difference">
          Arthur
        </div>
        <div className="hidden md:flex gap-12 pointer-events-auto">
          {['Systems', 'Vision', 'Security', 'Order'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-[9px] tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="pointer-events-auto cursor-pointer">
          <div className="w-6 h-[1px] bg-white mb-1.5" />
          <div className="w-4 h-[1px] bg-white ml-auto" />
        </div>
      </nav>

      {/* Main Scrollytelling Section */}
      <ArthurReveal />

      {/* Footer / CTA Section */}
      <section className="relative bg-[#050505] py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-12 opacity-80">The future of computing is here.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-24">
            <div className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-sm">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-4">Neural Engine</h3>
              <p className="text-white/40 text-sm leading-relaxed">Dedicated AI hardware designed for real-time inference and massive data processing.</p>
            </div>
            <div className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-sm">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-4">Quantum Encryption</h3>
              <p className="text-white/40 text-sm leading-relaxed">Military-grade hardware-level security ensuring your data remains your own.</p>
            </div>
            <div className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-sm">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-blue-400 mb-4">Carbon Unibody</h3>
              <p className="text-white/40 text-sm leading-relaxed">Aerospace materials combined for ultimate strength and impossible lightness.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/20">© 2024 Arthur Computer Systems. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

      <MadeWithDyad />
    </main>
  );
};

export default Index;