"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cpu, ShieldCheck, Cloud, Zap } from 'lucide-react';

const FRAME_COUNT = 200;

const ArthurReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth frame interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const currentFrame = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        // Load ezgif frames from absolute path using vite fs routing
        img.src = `/@fs/c:/Users/Anusha Narasimman/Downloads/ezgif-8330b8ed2e2b5ca8-png-split/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.png`;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
          if (loadedCount === FRAME_COUNT) {
            setImages(loadedImages);
            setIsLoaded(true);
          }
        };

        img.onerror = () => {
          // If sequence missing, we use the fallback logic to at least show something
          loadedCount++;
          if (loadedCount === FRAME_COUNT) setIsLoaded(true);
        };

        loadedImages[i] = img;
      }
    };

    preloadImages();
  }, []);

  // Draw to canvas
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
        const ratio = Math.min(hRatio, vRatio);
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
    render(); // Initial render

    return () => unsubscribe();
  }, [images, currentFrame]);

  // Responsive canvas scaling
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

  // Text animations
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const textY1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [20, 0, 0, -20]);

  const textOpacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const textY2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [20, 0, 0, -20]);

  const textOpacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const textY3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [20, 0, 0, -20]);

  const textOpacity4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);
  const textY4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [20, 0, 0, 0]);

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505]">
      {/* Loading Screen */}
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
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none opacity-80"
        />

        {/* Scroll to Explore */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={16} className="text-white/20" />
          </motion.div>
        </motion.div>

        {/* Text Content Sections */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Phase 1: Hero */}
          <motion.div
            style={{ opacity: textOpacity1, y: textY1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4">ARTHUR</h1>
            <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide">Engineered for the future.</p>
          </motion.div>

          {/* Phase 2: Intelligence */}
          <motion.div
            style={{ opacity: textOpacity2, y: textY2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">Intelligence Unleashed</h2>
            <div className="flex flex-wrap justify-center gap-8 mt-4">
              <div className="flex items-center gap-2 text-white/40">
                <Cpu size={20} className="text-blue-500" />
                <span className="text-xs uppercase tracking-widest">Neural Compute</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <ShieldCheck size={20} className="text-blue-500" />
                <span className="text-xs uppercase tracking-widest">Cyber Security</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <Cloud size={20} className="text-blue-500" />
                <span className="text-xs uppercase tracking-widest">Cloud Sync</span>
              </div>
            </div>
          </motion.div>

          {/* Phase 3: Power */}
          <motion.div
            style={{ opacity: textOpacity3, y: textY3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase">Power in Motion</h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light">
              A symphony of performance and elegance, built for those who dare to build what's next.
            </p>
          </motion.div>

          {/* Phase 4: Engineering */}
          <motion.div
            style={{ opacity: textOpacity4, y: textY4 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">Engineered Inside Out</h2>
            <p className="text-white/40 mb-12 max-w-xl text-sm tracking-widest uppercase">Precision. Intelligence. Performance.</p>

            <div className="flex gap-4 pointer-events-auto">
              <button className="px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500">
                Explore Features
              </button>
              <button className="px-8 py-3 border border-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-all duration-500">
                Watch Experience
              </button>
            </div>
          </motion.div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      </div>
    </div>
  );
};

export default ArthurReveal;