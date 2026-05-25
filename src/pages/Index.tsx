"use client";

import React from 'react';
import ArthurReveal from '@/components/ArthurReveal';
import { Mail, Github, Twitter, Instagram, Globe } from 'lucide-react';

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

      {/* Footer / Brand Experience Section */}
      <footer className="relative bg-[#050505] border-t border-white/5 pt-32 pb-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-4xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-white to-white/20 bg-clip-text text-transparent">
                Join the vanguard of <br /> computational evolution.
              </h2>
              <div className="flex gap-6 mt-12">
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={18} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={18} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Github size={18} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Mail size={18} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8">Ecosystem</h3>
              <ul className="space-y-4">
                {['Neural OS', 'Quantum Kernel', 'Arthur Cloud', 'Security Layer'].map(item => (
                  <li key={item}><a href="#" className="text-xs text-white/40 hover:text-white transition-colors tracking-wide">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 mb-8">Inquiry</h3>
              <ul className="space-y-4">
                {['Press Kit', 'Investor Relations', 'Enterprise Sales', 'Career Path'].map(item => (
                  <li key={item}><a href="#" className="text-xs text-white/40 hover:text-white transition-colors tracking-wide">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
            <div className="flex items-center gap-8">
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/20">© 2024 Arthur Computer Systems</p>
              <div className="flex gap-6">
                <a href="#" className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white transition-colors">Legal</a>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-white/20">
              <Globe size={10} />
              <span>Global / EN-US</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;