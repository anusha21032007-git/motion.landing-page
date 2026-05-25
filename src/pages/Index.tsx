"use client";

import React from 'react';
import ArthurReveal from '@/components/ArthurReveal';
import { Mail, Github, Twitter, Instagram, Globe, Cpu, Zap, Shield, ShoppingBag } from 'lucide-react';

const Index = () => {
  const navItems = [
    { name: 'Systems', icon: <Cpu size={14} /> },
    { name: 'Vision', icon: <Zap size={14} /> },
    { name: 'Security', icon: <Shield size={14} /> },
    { name: 'Order', icon: <ShoppingBag size={14} /> },
  ];

  return (
    <main className="relative w-full bg-[#050505] selection:bg-blue-500/30">
      {/* Luxury Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 p-8 flex justify-between items-center pointer-events-none">
        {/* Logo */}
        <div className="text-[14px] tracking-[0.8em] font-black uppercase pointer-events-auto cursor-pointer mix-blend-difference drop-shadow-md">
          Arthur
        </div>

        {/* Center Navigation with Icons */}
        <div className="hidden md:flex gap-8 pointer-events-auto bg-black/40 backdrop-blur-md px-10 py-4 rounded-full border border-white/10 shadow-2xl">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href="#" 
              className="group flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-white/50 hover:text-white font-bold transition-all duration-300 drop-shadow-sm"
            >
              <span className="text-white/30 group-hover:text-blue-400 transition-colors duration-300">
                {item.icon}
              </span>
              {item.name}
            </a>
          ))}
        </div>

        {/* Right spacing - keeping it clean as requested */}
        <div className="w-24 hidden md:block" />
      </nav>

      {/* Main Scrollytelling Section */}
      <ArthurReveal />

      {/* Footer / Brand Experience Section */}
      <footer className="relative bg-[#050505] border-t border-white/10 pt-32 pb-12 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent drop-shadow-sm">
                Join the vanguard of <br /> computational evolution.
              </h2>
              <div className="flex gap-8 mt-12">
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Github size={20} /></a>
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Mail size={20} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black text-white/30 mb-8">Ecosystem</h3>
              <ul className="space-y-5">
                {['Neural OS', 'Quantum Kernel', 'Arthur Cloud', 'Security Layer'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-white/70 hover:text-white transition-colors tracking-wide">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black text-white/30 mb-8">Inquiry</h3>
              <ul className="space-y-5">
                {['Press Kit', 'Investor Relations', 'Enterprise Sales', 'Career Path'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-white/70 hover:text-white transition-colors tracking-wide">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10">
            <div className="flex items-center gap-12">
              <p className="text-[10px] tracking-[0.4em] font-black uppercase text-white/40">© 2024 Arthur Computer Systems</p>
              <div className="flex gap-8">
                <a href="#" className="text-[10px] tracking-[0.4em] font-black uppercase text-white/40 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-[10px] tracking-[0.4em] font-black uppercase text-white/40 hover:text-white transition-colors">Legal</a>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] tracking-[0.4em] font-black uppercase text-white/40">
              <Globe size={12} />
              <span>Global / EN-US</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;