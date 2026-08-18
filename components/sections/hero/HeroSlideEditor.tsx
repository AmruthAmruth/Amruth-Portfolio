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
const systemConfig = {
  core: "Clean Architecture",

  modules: [
    "Scalable",
    "Robust",
    "Secure"
  ],

  deployment: "Continuous Excellence"
}
`;

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            {/* Animated Floating Blobs - Subtle for white theme */}
            <FloatingBlobs colors={blobColors.collaborate} variant="hero" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20 items-center w-full h-full pt-20 pb-10 sm:py-0">

                {/* Left Column: Text & CTA */}
                <div className="text-center sm:text-left order-2 lg:order-1 flex flex-col items-center sm:items-start justify-center h-full">
                    {/* Headline */}
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <span className="sr-only">Amruth Shyju | </span>
                        Engineering with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            Absolute Precision.
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl font-light leading-relaxed px-4 sm:px-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Writing clean, modular code that evolves seamlessly with complex product requirements and system growth.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <button
                            onClick={() => document.getElementById('builds')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-8 py-3.5 bg-gray-900 text-white text-base sm:text-lg font-medium rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
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
                    className="order-1 lg:order-2 flex w-full max-w-sm sm:max-w-none perspective-1000 items-center justify-center h-full scale-90 sm:scale-100"
                    initial={{ opacity: 0, x: 50, rotateY: 10 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        rotateY: 5,
                        y: [0, -10, 0]
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
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-3xl -z-10 opacity-70 animate-pulse" />

                        {/* Editor Window */}
                        <div className="overflow-hidden rounded-xl bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 shadow-2xl transform transition-transform duration-500">
                            {/* Editor Header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-black/20">
                                <div className="flex gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="ml-4 text-[10px] text-gray-400 font-sans flex items-center gap-2">
                                    <span className="bg-[#1e1e1e] px-2 py-0.5 rounded text-blue-400 border border-white/5">engineering.ts</span>
                                    <span className="opacity-40 tracking-wider">src/core</span>
                                </div>
                            </div>

                            {/* Editor Content */}
                            <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[360px] sm:min-h-[380px]">
                                <pre>
                                    <code>
                                        {codeSnippet.trim().split('\n').map((line, i, arr) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 1.2 + (i * 0.1), ease: "easeOut" }}
                                                className="table-row whitespace-nowrap"
                                            >
                                                <span className="table-cell select-none text-gray-600 text-right pr-6 w-8 opacity-40">{i + 1}</span>
                                                <span className="table-cell" dangerouslySetInnerHTML={{
                                                    __html: line.replace(
                                                        /(".*?")|(\bconst\b)|(\bengineeringPrinciples\b)|(\b[a-zA-Z0-9_]+\b:)|([\[\]{}()])|(\/\/.*)/g,
                                                        (match, str, kw, varName, key, bracket, comment) => {
                                                            if (str) return `<span style="color: #ce9178">${str}</span>`;
                                                            if (kw) return `<span style="color: #569cd6">${kw}</span>`;
                                                            if (varName) return `<span style="color: #9cdcfe">${varName}</span>`;
                                                            if (key) return `<span style="color: #9cdcfe">${key.slice(0, -1)}</span>:`;
                                                            if (bracket) return `<span style="color: #d4d4d4">${bracket}</span>`;
                                                            if (comment) return `<span style="color: #6a9955">${comment}</span>`;
                                                            return match;
                                                        }
                                                    )
                                                }} />
                                                {/* Blinking Cursor on last line */}
                                                {i === arr.length - 1 && (
                                                    <motion.span
                                                        animate={{ opacity: [1, 0, 1] }}
                                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                        className="inline-block w-[2px] h-[1.2em] bg-blue-500 ml-1 align-middle"
                                                    />
                                                )}
                                            </motion.div>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                            {/* Status Bar */}
                            <div className="px-3 py-1 bg-[#007acc] text-white text-[9px] flex justify-between items-center font-sans">
                                <div className="flex gap-3 opacity-90">
                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white/20" /> main*</span>
                                    <span>0 errors</span>
                                </div>
                                <div className="flex gap-3 opacity-90">
                                    <span>Ln {codeSnippet.trim().split('\n').length}, Col 1</span>
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
