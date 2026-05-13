'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { blobColors, sectionGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';
import GitLogEntry from './origin/GitLogEntry';

export default function AboutSection() {
    const containerRef = useRef(null);

    return (
        <section id="journey" ref={containerRef} className={`relative w-full min-h-[85vh] ${sectionGradients.about} py-16 sm:py-20 overflow-hidden`}>
            <FloatingBlobs colors={blobColors.about} variant="section" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                <div className="mb-12 text-center">
                    <SectionHeader
                        title="Timeline"
                        subtitle="git log --graph"
                        description="Tracing the commit history from the initial spark to complex system architectures."
                        dataType="array"
                        gradient="from-blue-400 to-green-400"
                        alignment="center"
                    />
                </div>

                {/* ── GitHub-style commits window ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                >
                    {/* ── macOS Title Bar ── */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                        {/* Traffic lights */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
                        </div>
                        {/* Centered repo title */}
                        <div className="flex items-center gap-1.5 overflow-hidden">
                            <svg className="w-3.5 h-3.5 text-[#8b949e] shrink-0" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                            </svg>
                            <div className="flex items-center gap-1 text-[11px] sm:text-[12.5px] truncate">
                                <span className="font-semibold text-[#c9d1d9]">amruth</span>
                                <span className="text-[#8b949e]/40">/</span>
                                <span className="font-semibold text-[#c9d1d9]">journey</span>
                            </div>
                            <span className="hidden sm:inline text-[11px] font-mono text-[#6e7681] ml-1 border border-[#30363d] bg-[#0d1117] px-1.5 py-0.5 rounded shrink-0">git log --oneline</span>
                        </div>
                        {/* Spacer to keep title centered on tablet/desktop */}
                        <div className="hidden sm:block w-14" />
                        {/* Mobile spacer */}
                        <div className="sm:hidden w-6" />
                    </div>

                    {/* ── Commits toolbar ── */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-2.5 bg-[#161b22] border-b border-[#30363d]">
                        {/* Branch + count */}
                        <div className="flex items-center gap-3 text-[11.5px] sm:text-[12.5px]">
                            <div className="flex items-center gap-1.5 border border-[#30363d] bg-[#0d1117] rounded-md px-2 sm:px-2.5 py-1 text-[#c9d1d9]">
                                <svg className="w-3.5 h-3.5 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" />
                                </svg>
                                <span className="font-mono font-semibold">main</span>
                                <svg className="w-3 h-3 text-[#8b949e] ml-0.5" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                                </svg>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#8b949e]">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z" />
                                </svg>
                                <span className="font-semibold text-[#e6edf3]">{gitLogHistory.length}</span>
                                <span className="hidden xs:inline">commits</span>
                            </div>
                        </div>
                        {/* Timespan */}
                        <span className="text-[10px] sm:text-[12px] text-[#8b949e] border border-[#30363d] rounded-full px-3 py-1">
                            <span className="hidden sm:inline">Timeline: </span>
                            <span className="font-semibold text-[#c9d1d9]">Past → Future</span>
                        </span>
                    </div>

                    {/* ── Commit entries ── */}
                    <div className="px-4 sm:px-6 py-6">
                        {gitLogHistory.map((commit, index) => (
                            <GitLogEntry
                                key={index}
                                index={index}
                                {...commit}
                                isLast={index === gitLogHistory.length - 1}
                            />
                        ))}
                    </div>

                    {/* ── Status bar ── */}
                    <div className="flex items-center justify-between px-4 sm:px-5 py-2 bg-[#161b22] border-t border-[#30363d] text-[10px] sm:text-[11.5px] font-mono text-[#8b949e]">
                        <span>branch: main · {gitLogHistory.length} commits</span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                            active
                        </span>
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
        hash: '001a1f3',
        author: 'amruth',
        date: 'Past',
        type: 'init',
        scope: 'learning',
        message: 'the spark that started it all',
        headline: 'From a single HTML file to full-stack applications.',
        body: `My journey began with a simple curiosity about how the web worked. That curiosity quickly turned into a passion for building software. I spent my early days deep-diving into the MERN stack, learning how to connect frontend interfaces with backend logic, and overcoming the challenges of being a self-taught developer through persistence and continuous building.`,
        tags: ['Self-Taught', 'MERN', 'Frontend', 'Growth'],
        avatarUrl: 'https://github.com/identicons/amruth4.png',
    },
    {
        hash: '028d9ec',
        author: 'amruth',
        date: 'Present',
        type: 'feat',
        scope: 'systems',
        message: 'shift focus from features to reliable systems',
        headline: 'Designing robust backends and scalable architecture.',
        body: `Today, my primary focus spans beyond just writing code to designing complete systems. I specialize in backend development, crafting efficient APIs, and structuring databases that can handle real-world usage. I prioritize clean architecture, performance optimization, and writing maintainable code that scales alongside the product.`,
        tags: ['Backend', 'System Design', 'APIs', 'Architecture'],
        avatarUrl: 'https://github.com/identicons/amruth2.png',
    },
    {
        hash: '042ff09',
        author: 'amruth',
        date: 'Future',
        type: 'plan',
        scope: 'vision',
        message: 'continuous evolution and mastering scale',
        headline: 'Building impactful software and exploring distributed systems.',
        body: `Looking ahead, my goal is to tackle increasingly complex architectural challenges and contribute to impactful, large-scale products. I aim to deepen my expertise in cloud infrastructure, distributed systems, and real-time processing, continuing to grow not just as a developer, but as an engineer who builds solutions that last.`,
        tags: ['Cloud', 'Distributed Sys', 'Scale', 'Impact'],
        avatarUrl: 'https://github.com/identicons/amruth1.png',
        isLast: true,
    },
];
