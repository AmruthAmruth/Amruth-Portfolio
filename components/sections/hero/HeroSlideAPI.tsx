'use client';

import { motion } from 'framer-motion';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import { blobColors } from '@/constants/theme';
import SectionDivider from '@/components/shared/SectionDivider';

interface HeroSlideAPIProps {
    isActive: boolean;
}

export default function HeroSlideAPI({ isActive }: HeroSlideAPIProps) {
    if (!isActive) return null;

    const jsonResponse = `
{
  "status": "optimal",
  "system": {
    "latency": "14ms",
    "uptime": "99.99%",
    "scalability": "auto-scaling"
  },
  "architecture": [
    "Microservices",
    "Event-Driven",
    "Cloud-Native"
  ]
}`;

    return (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            {/* Animated Floating Blobs - Variant ensures subtle difference if needed */}
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
                        Engineered for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
                            Global Scale
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl font-light leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Building robust, high-performance backends that power seamless digital experiences.
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

                {/* Right Column: API Client — hidden on xs, shown sm+ */}
                <motion.div
                    className="order-1 sm:order-2 hidden sm:flex w-full max-w-sm sm:max-w-none perspective-1000 items-center justify-center h-full"
                    initial={{ opacity: 0, x: 50, rotateY: 10 }}
                    animate={{ opacity: 1, x: 0, rotateY: 5 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    whileHover={{ rotateY: 0, scale: 1.02 }}
                >
                    <div className="relative w-full">
                        {/* Glow Effect Background */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-2xl blur-2xl -z-10 opacity-70 animate-pulse" />

                        {/* API Client Window */}
                        <div className="overflow-hidden rounded-xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl transform transition-transform duration-500">
                            {/* Header / URL Bar */}
                            <div className="flex flex-col gap-3 px-4 py-4 bg-gray-50/80 border-b border-gray-100">
                                {/* Window Controls */}
                                <div className="flex gap-1.5 opacity-40">
                                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                                </div>

                                {/* URL Input Simulation */}
                                <div className="flex items-center gap-2">
                                    <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase tracking-wider">GET</div>
                                    <div className="flex-1 bg-white border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-500 font-mono shadow-sm">
                                        https://api.amruth.dev/v1/system-status
                                    </div>
                                    <div className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded shadow-md">SEND</div>
                                </div>
                            </div>

                            {/* Response Area */}
                            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-white min-h-[200px]">
                                <div className="text-xs text-gray-400 mb-2 flex justify-between">
                                    <span>Status: 200 OK</span>
                                    <span>Time: 45ms</span>
                                </div>
                                <pre>
                                    <code className="language-json">
                                        {jsonResponse.trim().split('\n').map((line, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.2 + (i * 0.1) }}
                                                className="table-row"
                                            >
                                                <span className="table-cell select-none text-gray-300 text-right pr-4 w-6 border-r border-gray-100 mr-2">{i + 1}</span>
                                                <span className="table-cell pl-4" dangerouslySetInnerHTML={{
                                                    __html: line
                                                        .replace(/"(.*?)":/g, '<span class="text-purple-600">"$1"</span>:') // keys
                                                        .replace(/: "(.*?)"/g, ': <span class="text-green-600">"$1"</span>') // string values
                                                        .replace(/: (\[|\{)/g, ': <span class="text-gray-600">$1</span>') // braces
                                                }} />
                                            </motion.div>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                            {/* Footer Status Bar */}
                            <div className="px-3 py-2 bg-gray-50 text-gray-400 text-[10px] flex justify-between items-center font-sans border-t border-gray-100">
                                <div>JSON</div>
                                <div>243 B</div>
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
