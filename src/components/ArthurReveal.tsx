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
  const headingShadow = "drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]";
  const subShadow = "drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]";

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
        {/* Canvas Background with subtle dimming for readability */}
        <div className="absolute inset-0 z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain pointer-events-none opacity-70"
          />
          {/* Subtle vignette to focus on text */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
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
            <h1 className={`text-7xl md:text-9xl font-extrabold tracking-tighter mb-4 text-white ${headingShadow}`}>ARTHUR</h1>
            <p className={`text-xl md:text-2xl text-white/80 font-medium tracking-wide ${subShadow}`}>Engineered for the future.</p>
          </motion.div>

          {/* Phase 2: Intelligence */}
          <motion.div
            style={{ opacity: textOpacity2, y: textY2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className={`text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 uppercase text-white ${headingShadow}`}>Intelligence Unleashed</h2>
            <div className="flex flex-wrap justify-center gap-8 mt-4 bg-black/20 backdrop-blur-sm p-6 rounded-full border border-white/5">
              <div className="flex items-center gap-2">
                <Cpu size={20} className="text-blue-500" />
                <span className="text-xs uppercase tracking-widest font-bold text-white/90">Neural Compute</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-500" />
                <span className="text-xs uppercase tracking-widest font-bold text-white/90">Cyber Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud size={20} className="text-blue-500" />
                <span className="text-xs uppercase tracking-widest font-bold text-white/90">Cloud Sync</span>
              </div>
            </div>
          </motion.div>

          {/* Phase 3: Power */}
          <motion.div
            style={{ opacity: textOpacity3, y: textY3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className={`text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 uppercase text-white ${headingShadow}`}>Power in Motion</h2>
            <p className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium bg-black/40 backdrop-blur-md p-4 rounded-xl ${subShadow}`}>
              A symphony of performance and elegance, built for those who dare to build what's next.
            </p>
          </motion.div>

          {/* Phase 4: Engineering */}
          <motion.div
            style={{ opacity: textOpacity4, y: textY4 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h2 className={`text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 uppercase text-white ${headingShadow}`}>Engineered Inside Out</h2>
            <p className={`text-white/80 mb-12 max-w-xl text-sm tracking-[0.3em] uppercase font-bold ${subShadow}`}>Precision. Intelligence. Performance.</p>

            <div className="flex gap-4 pointer-events-auto">
              <button className="px-10 py-4 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-xl shadow-blue-500/10">
                Explore Features
              </button>
              <button className="px-10 py-4 border-2 border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all duration-500 backdrop-blur-sm">
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