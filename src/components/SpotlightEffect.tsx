"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SpotlightEffect = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {/* Blue Glow */}
      <motion.div 
        animate={{ x: mousePos.x - 400, y: mousePos.y - 400 }}
        transition={{ type: "spring", damping: 30, stiffness: 50 }}
        className="absolute w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full opacity-50"
      />
      {/* Subtle Amber Spotlight */}
      <motion.div 
        animate={{ x: mousePos.x - 200, y: mousePos.y - 200 }}
        transition={{ type: "spring", damping: 40, stiffness: 60 }}
        className="absolute w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full opacity-30"
      />
    </div>
  );
};

export default SpotlightEffect;