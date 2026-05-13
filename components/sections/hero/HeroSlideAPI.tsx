'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import { blobColors } from '@/constants/theme';
import SectionDivider from '@/components/shared/SectionDivider';

interface HeroSlideAPIProps {
    isActive: boolean;
}

export default function HeroSlideAPI({ isActive }: HeroSlideAPIProps) {
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (isActive) {
            setIsFetching(true);
            const timer = setTimeout(() => {
                setIsFetching(false);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [isActive]);

    if (!isActive) return null;

    const jsonResponse = `
{
  "status": "Production Ready",

  "capabilities": [
    "Secure APIs",
    "Real-Time Systems",
    "Reliable Architecture"
  ],

  "focus": "Building products that stay fast, stable, and scalable."
}`;

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            {/* Animated Floating Blobs */}
            <FloatingBlobs colors={blobColors.work} variant="section" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 gap-8 lg:gap-20 items-center w-full h-full">

                {/* Left Column: Text & CTA */}
                <div className="text-center sm:text-left order-2 sm:order-1 flex flex-col items-center sm:items-start justify-center h-full pt-16 sm:pt-0">
                    {/* Headline */}
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <span className="sr-only">Amruth Shyju | </span>
                        Building Products <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                            People Can Depend On.
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Creating secure and reliable systems designed for performance, stability, and real-world usage.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3.5 bg-gray-900 text-white text-lg font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/20"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Collaborating
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </motion.div>

                </div>

                {/* Right Column: API Client */}
                <motion.div
                    className="order-1 sm:order-2 hidden sm:flex w-full max-w-sm sm:max-w-none perspective-1000 items-center justify-center h-full"
                    initial={{ opacity: 0, x: 50, rotateY: 10 }}
                    animate={{ 
                        opacity: 1, 
                        x: 0, 
                        rotateY: -5,
                        y: [0, 10, 0]
                    }}
                    transition={{ 
                        opacity: { duration: 1, delay: 0.4 },
                        x: { duration: 1, delay: 0.4 },
                        rotateY: { duration: 1, delay: 0.4 },
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{ rotateY: 0, scale: 1.02 }}
                >
                    <div className="relative w-full">
                        {/* Glow Effect Background */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-2xl blur-3xl -z-10 opacity-70 animate-pulse" />

                        {/* Postman-style Window */}
                        <div className="overflow-hidden rounded-xl bg-[#1c1c1c] border border-[#333] shadow-2xl transform transition-transform duration-500">
                            {/* Postman Header / Tab Bar */}
                            <div className="bg-[#2b2b2b] px-4 py-2 flex items-center gap-2 border-b border-[#333]">
                                <div className="flex gap-1.5 pr-2 border-r border-[#444] mr-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="flex items-center gap-2 bg-[#1c1c1c] px-3 py-1.5 rounded-t-lg border-t border-x border-[#333] -mb-[9px] relative z-10">
                                    <span className="text-[10px] text-[#ff6c37] font-bold">GET</span>
                                    <span className="text-[10px] text-gray-300 font-medium">amruth.api/status</span>
                                    <span className="text-[10px] text-gray-500 ml-1">×</span>
                                </div>
                                <div className="text-gray-600 text-xl ml-2 font-light">+</div>
                            </div>

                            {/* Postman URL Bar */}
                            <div className="p-4 bg-[#212121] border-b border-[#333] flex items-center gap-3">
                                <div className="flex items-center flex-1 bg-[#1c1c1c] border border-[#333] rounded overflow-hidden">
                                    <div className="px-3 py-2 text-[10px] font-bold text-green-500 border-r border-[#333]">GET</div>
                                    <div className="px-3 py-2 text-[10px] text-gray-400 font-mono flex-1 overflow-hidden whitespace-nowrap">
                                        https://api.amruth.dev/v1/production/status
                                    </div>
                                </div>
                                <button className="bg-[#097bed] hover:bg-[#0b8fff] text-white text-[10px] font-bold px-5 py-2 rounded transition-colors shadow-lg shadow-blue-500/20">
                                    SEND
                                </button>
                            </div>

                            {/* Postman Response Section */}
                            <div className="bg-[#1c1c1c] min-h-[300px] flex flex-col">
                                {/* Response Metadata */}
                                <div className="px-4 py-2 border-b border-[#333] flex gap-4 text-[10px]">
                                    <div className="flex gap-4">
                                        <span className="text-gray-500 uppercase tracking-wider font-bold border-b-2 border-[#ff6c37] pb-1 cursor-pointer">Body</span>
                                        <span className="text-gray-500 uppercase tracking-wider font-bold pb-1 cursor-pointer hover:text-gray-300">Headers</span>
                                        <span className="text-gray-500 uppercase tracking-wider font-bold pb-1 cursor-pointer hover:text-gray-300">Test Results</span>
                                    </div>
                                    <div className="ml-auto flex gap-3 text-gray-400">
                                        <span>Status: <span className="text-green-500 font-bold">200 OK</span></span>
                                        <span>Time: <span className="text-green-500 font-bold">42 ms</span></span>
                                        <span>Size: <span className="text-green-500 font-bold">248 B</span></span>
                                    </div>
                                </div>

                                {/* Response Content */}
                                <div className="relative p-6 font-mono text-[11px] leading-relaxed overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        {isFetching ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 flex flex-col items-center justify-center bg-[#1c1c1c]"
                                            >
                                                <div className="w-6 h-6 border-2 border-[#ff6c37] border-t-transparent rounded-full animate-spin mb-3" />
                                                <p className="text-gray-500 text-[10px] font-sans tracking-widest uppercase">Connecting...</p>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="response"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.4 }}
                                                className="whitespace-pre-wrap break-words"
                                            >
                                                <code>
                                                    {jsonResponse.trim().split('\n').map((line, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: -5 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 + (i * 0.05) }}
                                                            className="flex mb-1"
                                                        >
                                                            <span className="select-none text-gray-700 text-right pr-4 w-8 border-r border-[#333] opacity-50 shrink-0 font-sans">{i + 1}</span>
                                                            <span className="pl-4 break-words" dangerouslySetInnerHTML={{
                                                                __html: line.replace(
                                                                    /("(.*?)":)|("(.*?)")|([\[\]{}])|(\/\/.*)/g,
                                                                    (match, key, keyContent, str, strContent, bracket, comment) => {
                                                                        if (key) return `<span style="color: #f8f8f2">${key}</span>`; // Postman keys are white/off-white
                                                                        if (str) return `<span style="color: #a6e22e">${str}</span>`; // Postman values are greenish
                                                                        if (bracket) return `<span style="color: #f8f8f2">${bracket}</span>`;
                                                                        if (comment) return `<span style="color: #75715e">${comment}</span>`;
                                                                        return match;
                                                                    }
                                                                )
                                                            }} />
                                                        </motion.div>
                                                    ))}
                                                </code>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            {/* Postman Footer Status Bar */}
                            <div className="px-3 py-1 bg-[#2b2b2b] text-gray-500 text-[9px] flex justify-between items-center font-sans border-t border-[#333]">
                                <div className="flex gap-3">
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online</span>
                                    <span>Cloud Agent</span>
                                </div>
                                <div className="flex gap-3">
                                    <span>JSON</span>
                                    <span>Auto</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* Wave Divider */}
            <SectionDivider position="bottom" color="#fff" />
        </div>
    );
}
