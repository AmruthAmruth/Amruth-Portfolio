'use client';

import { useState, useEffect } from 'react';
import { sectionGradients } from '@/constants/theme';
import HeroSlideTerminal from './hero/HeroSlideTerminal';
import HeroSlideEditor from './hero/HeroSlideEditor';
import HeroSlideAPI from './hero/HeroSlideAPI';
import { AnimatePresence, motion } from 'framer-motion';

export default function HeroLanding() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3; // Terminal, Editor, API

    // Auto-advance slideshow
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 10000); // 8 seconds per slide

        return () => clearTimeout(timer);
    }, [currentSlide, totalSlides]);

    const setSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section id="launch" className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${sectionGradients.hero}`}>

            {/* Slides Container */}
            <div className="relative w-full h-full min-h-[90vh] flex items-center">
                <AnimatePresence mode="wait">
                    {currentSlide === 0 && (
                        <motion.div
                            key="slide-terminal"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <HeroSlideTerminal isActive={currentSlide === 0} />
                        </motion.div>
                    )}
                    {currentSlide === 1 && (
                        <motion.div
                            key="slide-editor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <HeroSlideEditor isActive={currentSlide === 1} />
                        </motion.div>
                    )}
                    {currentSlide === 2 && (
                        <motion.div
                            key="slide-api"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <HeroSlideAPI isActive={currentSlide === 2} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setSlide(index)}
                        className={`relative h-2 rounded-full overflow-hidden transition-all duration-500 ${currentSlide === index
                            ? 'w-16 bg-white/30 backdrop-blur-sm'
                            : 'w-2 bg-gray-400/50 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {currentSlide === index && (
                            <motion.div
                                key={`progress-${currentSlide}`}
                                className="absolute inset-y-0 left-0 bg-blue-500 rounded-full origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 8, ease: "linear" }}
                                style={{ width: '100%' }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Scroll Indicator (Global) */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 cursor-pointer"
                onClick={() => document.getElementById('origin')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-400">
                        Explore
                    </span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent relative overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 48, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-full h-4 bg-blue-500/50 blur-[1px]"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
