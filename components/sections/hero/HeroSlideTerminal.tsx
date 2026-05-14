'use client';

import { motion } from 'framer-motion';
import { personalInfo, socialLinks } from '@/constants/social';
import { Code2, TerminalSquare, Database, Layers, Cpu } from 'lucide-react';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import { blobColors } from '@/constants/theme';
import SectionDivider from '@/components/shared/SectionDivider';

interface HeroSlideTerminalProps {
    isActive: boolean;
}

export default function HeroSlideTerminal({ isActive }: HeroSlideTerminalProps) {
    if (!isActive) return null;

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            {/* Animated Floating Blobs - Very subtle for white theme */}
            <FloatingBlobs colors={blobColors.hero} variant="hero" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:grid lg:grid-cols-[0.9fr_1.1fr] md:grid-cols-2 gap-8 lg:gap-12 items-center w-full h-full pt-20 pb-10 sm:py-0">

                {/* Left Column: Text & CTA */}
                <div className="text-center sm:text-left order-2 lg:order-1 flex flex-col items-center sm:items-start justify-center h-full lg:pr-8">
                    {/* Headline */}
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <span className="sr-only">Amruth Shyju | </span>
                        Architecting <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Scalable Systems.
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl font-light leading-relaxed px-4 sm:px-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Full Stack Engineer crafting high-performance, maintainable digital solutions with an engineering-first mindset.
                    </motion.p>

                    {/* CTA & Socials Row */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 sm:mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <button
                            onClick={() => document.getElementById('builds')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3.5 bg-gray-900 text-white text-base sm:text-lg font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Explore My Work
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2.5 sm:p-3 rounded-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 hover:scale-110`}
                                    aria-label={social.ariaLabel}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tech Stack Mini Row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="hidden xs:block"
                    >
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Powered By</p>
                        <div className="flex gap-4 text-gray-400">
                            <Code2 className="w-5 h-5 hover:text-[#61DAFB] transition-colors duration-300 cursor-pointer" />
                            <TerminalSquare className="w-5 h-5 hover:text-black transition-colors duration-300 cursor-pointer" />
                            <Layers className="w-5 h-5 hover:text-[#3178C6] transition-colors duration-300 cursor-pointer" />
                            <Cpu className="w-5 h-5 hover:text-[#06B6D4] transition-colors duration-300 cursor-pointer" />
                            <Database className="w-5 h-5 hover:text-[#339933] transition-colors duration-300 cursor-pointer" />
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Terminal */}
                <motion.div
                    className="order-1 lg:order-2 flex w-full perspective-1000 items-center justify-center h-full scale-90 sm:scale-100"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ 
                        opacity: 1, 
                        x: 0,
                        y: [0, -10, 0]
                    }}
                    transition={{ 
                        opacity: { duration: 1, delay: 0.4 },
                        x: { duration: 1, delay: 0.4 },
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="relative w-full">
                        {/* Glow Effect Background */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-2xl -z-10 opacity-70 animate-pulse" />

                        {/* Terminal Window */}
                        <div className="overflow-hidden rounded-xl bg-[#0d1117]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform transition-transform duration-500">
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22]/50 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                                </div>
                                <div className="ml-auto flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                                    <TerminalSquare className="w-3 h-3" />
                                    <span>zsh — 120x40</span>
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 font-mono text-sm space-y-4 text-gray-300">
                                <div>
                                    <div className="flex gap-2 text-green-400">
                                        <span>$</span>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.4, delay: 0.8, ease: "linear" }}
                                            className="overflow-hidden whitespace-nowrap text-white"
                                        >
                                            whoami
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                        className="pl-4 text-blue-300 font-bold"
                                    >
                                        Amruth Shyju
                                    </motion.div>
                                </div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                                    <div className="flex gap-2 text-green-400">
                                        <span>$</span>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.4, delay: 2.0, ease: "linear" }}
                                            className="overflow-hidden whitespace-nowrap text-white"
                                        >
                                            env
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2.4 }}
                                        className="pl-4 text-purple-300"
                                    >
                                        Full Stack & Systems
                                    </motion.div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }}>
                                    <div className="flex gap-2 text-green-400">
                                        <span>$</span>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.4, delay: 3.2, ease: "linear" }}
                                            className="overflow-hidden whitespace-nowrap text-white"
                                        >
                                            focus
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 3.6 }}
                                        className="pl-4 text-gray-300"
                                    >
                                        Backend Architecture & Scalability
                                    </motion.div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2 }}>
                                    <div className="flex gap-2 text-green-400">
                                        <span>$</span>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.6, delay: 4.4, ease: "linear" }}
                                            className="overflow-hidden whitespace-nowrap text-white"
                                        >
                                            philosophy
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 4.8 }}
                                        className="pl-4 text-gray-300 italic"
                                    >
                                        &quot;Logic is the beginning of wisdom, not the end.&quot;
                                        <motion.span
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                            className="inline-block w-2 h-4 ml-1 bg-gray-400 align-middle"
                                        />
                                    </motion.div>
                                </motion.div>
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
