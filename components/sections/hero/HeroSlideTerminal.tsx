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
            {/* Animated Floating Blobs - Kept consistent */}
            <FloatingBlobs colors={blobColors.hero} variant="hero" />

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
                        Defining My <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Engineering Identity.
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        A Full Stack Engineer driven by a simple philosophy: good code works, but great systems last.
                    </motion.p>

                    {/* CTA & Socials Row */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 sm:mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <button
                            onClick={() => document.getElementById('origin')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3.5 bg-gray-900 text-white text-lg font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Begin Journey
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
                                    className={`p-3 rounded-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 hover:scale-110`}
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
                    >
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Powered By</p>
                        <div className="flex gap-4 text-gray-400">
                            <Code2 className="w-5 h-5 hover:text-[#61DAFB] transition-colors duration-300 cursor-pointer" />
                            <TerminalSquare className="w-5 h-5 hover:text-black transition-colors duration-300 cursor-pointer" />
                            <Layers className="w-5 h-5 hover:text-[#3178C6] transition-colors duration-300 cursor-pointer" />
                            <Cpu className="w-5 h-5 hover:text-[#06B6D4] transition-colors duration-300 cursor-pointer" />
                            <Database className="w-5 h-5 hover:text-[#339933] transition-colors duration-300 cursor-pointer" />
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Terminal — hidden on xs, shown on sm+ */}
                <motion.div
                    className="order-1 sm:order-2 hidden sm:flex w-full max-w-sm sm:max-w-none perspective-1000 items-center justify-center h-full"
                    initial={{ opacity: 0, x: 50, rotateY: -10 }}
                    animate={{ opacity: 1, x: 0, rotateY: -5 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    whileHover={{ rotateY: 0, scale: 1.02 }}
                >
                    <div className="relative w-full">
                        {/* Glow Effect Background */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-2xl -z-10 opacity-70 animate-pulse" />

                        {/* Terminal Window */}
                        <div className="overflow-hidden rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl transform transition-transform duration-500">
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div className="ml-auto text-xs text-gray-500 font-mono">zsh — 80x24</div>
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
                                        {personalInfo.name}
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
                                            role
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2.4 }}
                                        className="pl-4 text-purple-300"
                                    >
                                        Full Stack Engineer
                                    </motion.div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }}>
                                    <div className="flex gap-2 text-green-400">
                                        <span>$</span>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.6, delay: 3.2, ease: "linear" }}
                                            className="overflow-hidden whitespace-nowrap text-white"
                                        >
                                            philosophy
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 3.6 }}
                                        className="pl-4 text-gray-300 italic"
                                    >
                                        &quot;Good code works. Great systems last. I build the latter.&quot;
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
