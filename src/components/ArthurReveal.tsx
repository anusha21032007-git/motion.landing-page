"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cpu, ShieldCheck, Cloud } from 'lucide-react';

const FRAME_COUNT = 200;

const ArthurReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const currentFrame = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        // Using relative path for robustness
        img.src = `/ezgif/ezgif-frame-${String(i + 1).padStart(3, "0")}.png`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
          if (loadedCount === FRAME_COUNT) {
            setImages(loadedImages);
            setIsLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) setIsLoaded(true);
        };
        loadedImages[i] = img;
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const render = () => {
      if (!canvasRef.current || images.length === 0) return;
      const context = canvasRef.current.getContext('2d');
      if (!context) return;

      const frameIndex = Math.floor(currentFrame.get());
      const img = images[frameIndex];

      if (img && img.complete) {
        const canvas = canvasRef.current;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio); // Use Math.max to fill screen
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      }
    };

    const unsubscribe = currentFrame.on("change", render);
    render();
    return () => unsubscribe();
  }, [images, currentFrame]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Section transformations
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const textY1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [20, 0, 0, -20]);

  const textOpacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const textY2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [20, 0, 0, -20]);

  const textOpacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const textY3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [20, 0, 0, -20]);

  const textOpacity4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);
  const textY4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [20, 0, 0, 0]);

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Readability shadow style
  const headingShadow = "drop-shadow-[0_4px_12px_rgba(0,0,0,1)]";
  const subShadow = "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]";

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="w-48 h-[1px] bg-white/10 mb-4 overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-blue-500"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40">Initializing Arthur Systems {loadingProgress}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas Background with aggressive mask to blend with background */}
        <div className="absolute inset-0 z-0 canvas-container">
          <canvas
            ref={canvasRef}
            className="w-full h-full pointer-events-none opacity-80 transition-opacity duration-700"
          />
          {/* Layered gradients to hide any potential edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none opacity-50" />
        </div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/60 font-bold drop-shadow-md">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={16} className="text-white/40" />
          </motion.div>
        </motion.div>

        {/* Text Content Sections */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Phase 1: Hero */}
          <motion.div
            style={{ opacity: textOpacity1, y: textY1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h1 className={`text-7xl md:text-9xl font-black tracking-tighter mb-4 text-white ${headingShadow}`}>ARTHUR</h1>
            <p className={`text-xl md:text-2xl text-white/90 font-medium tracking-wide ${subShadow}`}>Engineered for the future.</p>
          </motion.div>

          {/* Phase 2: Intelligence */}
          <motion.div
            style={{ opacity: textOpacity2, y: textY2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className={`text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase text-white ${headingShadow}`}>Intelligence Unleashed</h2>
            <div className="flex flex-wrap justify-center gap-8 mt-4 bg-black/40 backdrop-blur-xl p-8 rounded-full border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <Cpu size={24} className="text-blue-500" />
                <span className="text-xs uppercase tracking-[0.3em] font-black text-white">Neural Compute</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-blue-500" />
                <span className="text-xs uppercase tracking-[0.3em] font-black text-white">Cyber Security</span>
              </div>
              <div className="flex items-center gap-3">
                <Cloud size={24} className="text-blue-500" />
                <span className="text-xs uppercase tracking-[0.3em] font-black text-white">Cloud Sync</span>
              </div>
            </div>
          </motion.div>

          {/* Phase 3: Power */}
          <motion.div
            style={{ opacity: textOpacity3, y: textY3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className={`text-5xl md:text-8xl font-black tracking-tighter mb-4 uppercase text-white ${headingShadow}`}>Power in Motion</h2>
            <p className={`text-lg md:text-2xl text-white max-w-2xl mx-auto font-bold bg-black/60 backdrop-blur-2xl p-8 rounded-2xl border border-white/5 shadow-2xl ${subShadow}`}>
              A symphony of performance and elegance, built for those who dare to build what's next.
            </p>
          </motion.div>

          {/* Phase 4: Engineering */}
          <motion.div
            style={{ opacity: textOpacity4, y: textY4 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className={`text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase text-white ${headingShadow}`}>Engineered Inside Out</h2>
            <p className={`text-white/70 mb-12 max-w-xl text-xs tracking-[0.5em] uppercase font-black ${subShadow}`}>Precision • Intelligence • Performance</p>

            <div className="flex flex-col md:flex-row gap-6 pointer-events-auto">
              <button className="group relative px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <span className="relative z-10">Explore Features</span>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              <button className="px-12 py-5 border-2 border-white/20 text-white text-xs font-black uppercase tracking-[0.3em] rounded-full hover:bg-white/10 hover:border-white transition-all duration-500 backdrop-blur-md active:scale-95">
                Watch Experience
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArthurReveal;