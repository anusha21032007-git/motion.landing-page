"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Zap, Globe, Lock, Code } from 'lucide-react';

const features = [
  {
    title: "Neural Core",
    desc: "Next-gen processing unit designed for instantaneous response times.",
    icon: <Cpu className="text-blue-500" />,
    size: "col-span-2 row-span-2",
    glow: "bg-blue-500/10"
  },
  {
    title: "Quantum Sync",
    desc: "Seamlessly synchronized across all dimensions.",
    icon: <Zap className="text-orange-500" />,
    size: "col-span-1 row-span-1",
    glow: "bg-orange-500/10"
  },
  {
    title: "Iron Wall",
    desc: "Military-grade encryption for every single byte.",
    icon: <Shield className="text-emerald-500" />,
    size: "col-span-1 row-span-1",
    glow: "bg-emerald-500/10"
  },
  {
    title: "Edge Compute",
    desc: "Distributed intelligence operating at the boundaries of what's possible.",
    icon: <Globe className="text-purple-500" />,
    size: "col-span-2 row-span-1",
    glow: "bg-purple-500/10"
  }
];

const BentoFeatures = () => {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="text-[10px] tracking-[0.5em] font-black uppercase text-blue-500 mb-4 block">Ecosystem</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter">The Infrastructure <br/> of Tomorrow.</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${f.size} glass rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500`}
          >
            <div className={`absolute -right-8 -top-8 w-32 h-32 blur-[60px] rounded-full transition-all duration-500 group-hover:scale-150 ${f.glow}`} />
            <div className="relative z-10">
              <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl border border-white/5">
                {f.icon}
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-[250px]">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BentoFeatures;