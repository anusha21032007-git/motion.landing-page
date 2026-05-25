"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, Twitter, Instagram, Globe, Play, ChevronRight } from 'lucide-react';
import ArthurReveal from '@/components/ArthurReveal';
import MagneticButton from '@/components/MagneticButton';
import BentoFeatures from '@/components/BentoFeatures';
import SpotlightEffect from '@/components/SpotlightEffect';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <main className="relative w-full bg-[#050505] selection:bg-blue-500/30 grain">
      <SpotlightEffect />
      
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="text-[12px] tracking-[0.8em] font-black uppercase pointer-events-auto cursor-pointer drop-shadow-md">
          Arthur
        </div>

        <div className="hidden md:flex gap-12 pointer-events-auto bg-black/20 backdrop-blur-md px-10 py-3 rounded-full border border-white/5 shadow-2xl">
          {['Systems', 'Vision', 'Security', 'Order'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-white font-bold transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="pointer-events-auto">
          <MagneticButton className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white hover:text-black">
            Get Access
          </MagneticButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="z-10"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] tracking-[0.8em] font-black uppercase text-blue-500 mb-8 block"
          >
            Evolution is here
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-8 text-glow"
          >
            THE FUTURE <br/> IS DESIGNED.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/50 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Experience the next generation of computational intelligence. <br/> 
            Clean, efficient, and beautifully brutal.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <MagneticButton>
              Explore Features <ChevronRight size={14} />
            </MagneticButton>
            <MagneticButton variant="secondary">
              Watch Reel <Play size={14} fill="currentColor" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Ambient Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-orange-600/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Scrollytelling Reveal */}
      <ArthurReveal />

      {/* Bento Features Section */}
      <BentoFeatures />

      {/* Stats Section */}
      <section className="py-40 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Latency', value: '0.04ms' },
            { label: 'Throughput', value: '1.2PB/s' },
            { label: 'Security', value: '99.9%' },
            { label: 'Active Cores', value: '64,000+' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-[10px] tracking-[0.4em] font-black uppercase text-white/30 mb-4">{stat.label}</h4>
              <p className="text-4xl md:text-6xl font-black tracking-tighter text-glow">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center overflow-hidden relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-12">REDEFINE YOUR <br/> REALITY.</h2>
          <MagneticButton className="px-16 py-6 text-sm">
            Reserve Your Unit
          </MagneticButton>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
            <div className="col-span-1 md:col-span-2">
              <div className="text-[14px] tracking-[0.8em] font-black uppercase mb-8">Arthur</div>
              <p className="text-white/40 text-sm max-w-sm mb-8 leading-relaxed">
                Building the future of human-machine interaction through precision engineering and cinematic design.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={18} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={18} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Github size={18} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black text-white/30 mb-8">Ecosystem</h3>
              <ul className="space-y-4">
                {['Neural OS', 'Quantum Kernel', 'Cloud', 'Security'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-white/60 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-black text-white/30 mb-8">Company</h3>
              <ul className="space-y-4">
                {['Press', 'Careers', 'Legal', 'Privacy'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-white/60 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
            <p className="text-[10px] tracking-[0.4em] font-black uppercase text-white/20">© 2024 ARTHUR COMPUTER SYSTEMS</p>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.4em] font-black uppercase text-white/20">
              <Globe size={12} />
              <span>GLOBAL / EN-US</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;