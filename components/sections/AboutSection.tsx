'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { blobColors, sectionGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';
import GitLogEntry from './origin/GitLogEntry';
import { GitBranch, GitCommit, Calendar, Search, Filter } from 'lucide-react';

export default function AboutSection() {
    const containerRef = useRef(null);

    return (
        <section id="journey" ref={containerRef} className={`relative w-full min-h-[85vh] ${sectionGradients.about} py-16 sm:py-24 overflow-hidden`}>
            <FloatingBlobs colors={blobColors.about} variant="section" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
                <div className="mb-12 text-center">
                    <SectionHeader
                        title="Journey"
                        subtitle="git log --full-history"
                        description="A chronological trace of engineering milestones and system evolutions."
                        dataType="array"
                        gradient="from-blue-400 to-indigo-400"
                        alignment="center"
                    />
                </div>

                {/* ── GitHub-style commits window ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="w-full rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                >
                    {/* ── GitHub Repository Header ── */}
                    <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 sm:px-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-[#0d1117] border border-[#30363d]">
                                    <GitCommit className="w-4 h-4 text-[#8b949e]" />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-semibold text-[#e6edf3] flex items-center gap-2">
                                        Commits
                                        <span className="px-2 py-0.5 rounded-full bg-[#21262d] text-[#8b949e] text-[11px] font-medium border border-[#30363d]">
                                            {gitLogHistory.length}
                                        </span>
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-0.5 text-[12px] text-[#8b949e]">
                                        <GitBranch className="w-3 h-3" />
                                        <span className="font-mono text-[#c9d1d9] font-medium">main</span>
                                    </div>
                                </div>
                            </div>

                            {/* Search/Filter Bar */}
                            <div className="flex items-center gap-2">
                                <div className="relative group">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6e7681]" />
                                    <input 
                                        type="text" 
                                        placeholder="Filter commits..." 
                                        className="h-8 pl-8 pr-3 bg-[#0d1117] border border-[#30363d] rounded-md text-[12px] text-[#c9d1d9] placeholder-[#484f58] focus:outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd] transition-all w-full sm:w-48"
                                        readOnly
                                    />
                                </div>
                                <button className="h-8 px-3 flex items-center gap-1.5 bg-[#21262d] border border-[#30363d] rounded-md text-[12px] font-medium text-[#c9d1d9] hover:bg-[#30363d] transition-colors">
                                    <Filter className="w-3.5 h-3.5" />
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Commits Timeline ── */}
                    <div className="p-0">
                        {/* Grouped by Date Simulation */}
                        <div className="group/date">
                            <div className="flex items-center gap-3 px-6 py-2 bg-[#0d1117] border-b border-[#30363d]">
                                <Calendar className="w-3.5 h-3.5 text-[#8b949e]" />
                                <span className="text-[12px] font-semibold text-[#8b949e]">Commits on May 14, 2026</span>
                            </div>
                            
                            <div className="relative">
                                {gitLogHistory.map((commit, index) => (
                                    <GitLogEntry
                                        key={index}
                                        index={index}
                                        {...commit}
                                        isLast={index === gitLogHistory.length - 1}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Footer / Pagination Sim ── */}
                    <div className="px-6 py-4 bg-[#161b22] border-t border-[#30363d] flex items-center justify-center">
                        <button className="px-4 py-1.5 text-[12px] font-semibold text-[#58a6ff] hover:bg-[#30363d]/50 rounded-md transition-colors border border-[#30363d]">
                            Older
                        </button>
                    </div>
                </motion.div>
            </div>

            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}

/* ─────────────────── Data ─────────────────── */

interface CommitData {
    hash: string;
    author: string;
    date: string;
    type: string;
    scope: string;
    message: string;
    headline: string;
    body: string;
    tags: string[];
    avatarUrl: string;
    isLast?: boolean;
}

const gitLogHistory: CommitData[] = [
    {
        hash: '042ff09',
        author: 'amruth',
        date: '3 hours ago',
        type: 'plan',
        scope: 'vision',
        message: 'continuous evolution and mastering scale',
        headline: 'Vision: Building impactful software and exploring distributed systems.',
        body: `Looking ahead, my goal is to tackle increasingly complex architectural challenges and contribute to impactful, large-scale products. I aim to deepen my expertise in cloud infrastructure, distributed systems, and real-time processing.\n\nKey focus areas:\n- High-availability system design\n- Real-time data streaming architectures\n- Cloud-native engineering at scale`,
        tags: ['Cloud', 'Distributed Sys', 'Scale', 'Impact'],
        avatarUrl: 'https://github.com/identicons/amruth1.png',
    },
    {
        hash: '028d9ec',
        author: 'amruth',
        date: '2 days ago',
        type: 'feat',
        scope: 'systems',
        message: 'shift focus from features to reliable systems',
        headline: 'Systems: Designing robust backends and scalable architecture.',
        body: `Today, my primary focus spans beyond just writing code to designing complete systems. I specialize in backend development, crafting efficient APIs, and structuring databases that can handle real-world usage.\n\nEngineering standards:\n- Clean Architecture principles\n- Performance-first optimization\n- Test-driven development for core services`,
        tags: ['Backend', 'System Design', 'APIs', 'Architecture'],
        avatarUrl: 'https://github.com/identicons/amruth2.png',
    },
    {
        hash: '001a1f3',
        author: 'amruth',
        date: 'Sep 12, 2021',
        type: 'init',
        scope: 'learning',
        message: 'the spark that started it all',
        headline: 'Genesis: From a single HTML file to full-stack applications.',
        body: `My journey began with a simple curiosity about how the web worked. That curiosity quickly turned into a passion for building software. I spent my early days deep-diving into the MERN stack, learning how to connect frontend interfaces with backend logic.\n\nInitial Stack:\n- HTML5 & CSS3\n- Modern JavaScript (ES6+)\n- MongoDB, Express, React, Node.js`,
        tags: ['Self-Taught', 'MERN', 'Frontend', 'Growth'],
        avatarUrl: 'https://github.com/identicons/amruth4.png',
        isLast: true,
    },
];
