'use client';

import { useState, useEffect } from 'react';
import { sectionGradients } from '@/constants/theme';
import HeroSlideTerminal from './hero/HeroSlideTerminal';
import HeroSlideEditor from './hero/HeroSlideEditor';
import { AnimatePresence, motion } from 'framer-motion';

export default function HeroLanding() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 2; // Terminal, Editor

    // Auto-advance slideshow
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 8000); // 8 seconds per slide

        return () => clearInterval(timer);
    }, []);



    const setSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section id="hero" className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${sectionGradients.hero}`}>

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
                </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                            ? 'bg-blue-500 w-8'
                            : 'bg-gray-400 hover:bg-gray-300'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator (Global) */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                onClick={() => document.getElementById('origin')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.5 }}
            >
                {/* Optional: Add scroll indicator back if needed, currently simplistic */}
            </motion.div>
        </section>
    );
}
