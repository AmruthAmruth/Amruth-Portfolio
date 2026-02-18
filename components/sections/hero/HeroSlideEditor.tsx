'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/constants/social';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import { blobColors } from '@/constants/theme';
import SectionDivider from '@/components/shared/SectionDivider';

interface HeroSlideEditorProps {
    isActive: boolean;
}

export default function HeroSlideEditor({ isActive }: HeroSlideEditorProps) {
    if (!isActive) return null;

    const codeSnippet = `
interface Engineer {
  name: string;
  traits: string[];
  focus: string;
}

const amruth: Engineer = {
  name: "${personalInfo.name}",
  traits: [
    "Problem Solver",
    "Clean Code Enthusiast",
    "System Architect"
  ],
  focus: "Scalable Solutions"
};
`;

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            {/* Animated Floating Blobs - Variant ensures subtle difference if needed */}
            <FloatingBlobs colors={blobColors.collaborate} variant="hero" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full h-full">

                {/* Left Column: Text & CTA */}
                <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start justify-center h-full">
                    {/* Headline */}
                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        Architecting <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Digital Reality
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Turning complex problems into elegant, scalable solutions through clean code and modern architecture.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <button
                            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3.5 bg-gray-900 text-white text-lg font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View Projects
                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </motion.div>

                </div>

                {/* Right Column: Code Editor */}
                <motion.div
                    className="order-1 lg:order-2 w-full max-w-lg mx-auto lg:max-w-none perspective-1000 flex items-center justify-center h-full"
                    initial={{ opacity: 0, x: 50, rotateY: 10 }}
                    animate={{ opacity: 1, x: 0, rotateY: 5 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    whileHover={{ rotateY: 0, scale: 1.02 }}
                >
                    <div className="relative w-full">
                        {/* Glow Effect Background */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-2xl -z-10 opacity-70 animate-pulse" />

                        {/* Editor Window */}
                        <div className="overflow-hidden rounded-xl bg-[#1e1e1e] backdrop-blur-xl border border-white/10 shadow-2xl transform transition-transform duration-500">
                            {/* Editor Header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-black/20">
                                <div className="flex gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="ml-4 text-xs text-gray-400 font-sans flex items-center gap-2">
                                    <span className="bg-[#1e1e1e] px-2 py-1 rounded text-blue-400">developer.ts</span>
                                    <span className="opacity-50">src/types</span>
                                </div>
                            </div>

                            {/* Editor Content */}
                            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                                <pre>
                                    <code className="language-typescript">
                                        {codeSnippet.trim().split('\n').map((line, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.2 + (i * 0.1) }}
                                                className="table-row"
                                            >
                                                <span className="table-cell select-none text-gray-600 text-right pr-4 w-8">{i + 1}</span>
                                                <span className="table-cell" dangerouslySetInnerHTML={{
                                                    __html: line
                                                        .replace(/([a-zA-Z0-9_]+):/g, '<span class="text-[#9cdcfe]">$1</span>:') // keys
                                                        .replace(/: ([a-zA-Z0-9_\[\]]+)/g, ': <span class="text-[#4ec9b0]">$1</span>') // types
                                                        .replace(/(".*?")/g, '<span class="text-[#ce9178]">$1</span>') // strings
                                                        .replace(/(const|interface|return)/g, '<span class="text-[#569cd6]">$1</span>') // keywords
                                                        .replace(/(\/\/.*)/g, '<span class="text-[#6a9955]">$1</span>') // comments
                                                }} />
                                            </motion.div>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                            {/* Status Bar */}
                            <div className="px-3 py-1 bg-[#007acc] text-white text-[10px] flex justify-between items-center font-sans">
                                <div className="flex gap-3">
                                    <span>main*</span>
                                    <span>0 errors, 0 warnings</span>
                                </div>
                                <div className="flex gap-3">
                                    <span>Ln 12, Col 34</span>
                                    <span>UTF-8</span>
                                    <span>TypeScript</span>
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
