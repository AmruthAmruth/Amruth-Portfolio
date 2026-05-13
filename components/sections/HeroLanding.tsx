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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

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

            {/* Manual Navigation Arrows */}
            <div className="absolute inset-x-4 sm:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between items-center z-40 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all pointer-events-auto"
                    aria-label="Previous slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all pointer-events-auto"
                    aria-label="Next slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
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
