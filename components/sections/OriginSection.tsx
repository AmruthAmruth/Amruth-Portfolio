'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { blobColors, sectionGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';
import GitLogEntry from './origin/GitLogEntry';

export default function OriginSection() {
    const containerRef = useRef(null);

    return (
        <section id="origin" ref={containerRef} className={`relative w-full min-h-screen ${sectionGradients.origin} py-24 sm:py-32 overflow-hidden`}>
            {/* Floating Blobs for consistent background */}
            <FloatingBlobs colors={blobColors.origin} variant="section" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">

                <div className="mb-12 text-center">
                    <SectionHeader
                        title="Origin Story"
                        subtitle="Commit History"
                        description="Where the journey began, tracing the evolution from static pages to distributed systems."
                        dataType="array"
                        gradient="from-blue-400 to-green-400"
                        alignment="center"
                    />
                </div>

                {/* ── GitHub-style Repo Window ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full rounded-xl overflow-hidden border border-[#30363d] shadow-2xl shadow-black/50 font-mono relative"
                >
                    {/* ── macOS traffic lights + repo path ── */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#161b22] border-b border-[#21262d]">
                        <div className="flex gap-1.5 shrink-0">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-sm" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-sm" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-sm" />
                        </div>
                        {/* Repo breadcrumb — centered */}
                        <div className="flex-1 flex items-center justify-center gap-1.5 text-[13px] select-none">
                            <span className="text-[#58a6ff] hover:underline cursor-pointer font-semibold">amruth</span>
                            <span className="text-[#8b949e]">/</span>
                            <span className="text-[#58a6ff] hover:underline cursor-pointer font-bold">journey</span>
                            <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full border border-[#388bfd]/40 text-[#58a6ff] bg-[#388bfd]/10 font-sans font-medium">Public</span>
                        </div>
                        {/* Filler for balance */}
                        <div className="w-[72px] hidden sm:block" />
                    </div>

                    {/* ── Repo meta (stars, watches) ── */}
                    <div className="bg-[#161b22] border-b border-[#21262d] px-4 sm:px-6 py-2.5 flex items-center gap-4 text-[11px] text-[#8b949e] font-sans flex-wrap">
                        <span className="flex items-center gap-1 hover:text-[#e6edf3] cursor-pointer">⭐ <strong className="text-[#e6edf3]">4</strong> years in the making</span>
                        <span className="text-[#21262d]">·</span>
                        <span className="flex items-center gap-1">🔀 <strong className="text-[#e6edf3]">{gitLogHistory.length}</strong> commits</span>
                        <span className="text-[#21262d]">·</span>
                        <span className="flex items-center gap-1">🌿 Branch: <strong className="text-[#3fb950]">main</strong></span>
                    </div>

                    {/* ── Nav Tabs ── */}
                    <div className="bg-[#161b22] border-b border-[#30363d] px-4 sm:px-6 flex gap-0 overflow-x-auto no-scrollbar font-sans">
                        {[
                            { label: '📄 Code', active: false },
                            { label: '🕐 Commits', active: true, count: gitLogHistory.length },
                            { label: '🌿 Branches', active: false, count: 1 },
                            { label: '🏷️ Tags', active: false, count: 4 },
                        ].map((tab) => (
                            <div key={tab.label} className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 text-[12px] font-medium whitespace-nowrap cursor-pointer border-b-2 transition-colors ${tab.active
                                ? 'text-[#e6edf3] border-[#f78166]'
                                : 'text-[#8b949e] border-transparent hover:text-[#e6edf3]'
                                }`}>
                                {tab.label}
                                {tab.count !== undefined && (
                                    <span className="bg-[#30363d] text-[#e6edf3] text-[9px] px-1.5 py-0.5 rounded-full font-bold">{tab.count}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ── Branch + commit range bar ── */}
                    <div className="bg-[#161b22] border-b border-[#21262d] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 font-sans flex-wrap">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-[12px] text-[#e6edf3] cursor-pointer hover:bg-[#30363d] transition-colors">
                                <span>🌿</span>
                                <span className="font-semibold">main</span>
                                <span className="text-[#8b949e] text-[10px]">▾</span>
                            </div>
                            <span className="text-[#8b949e] text-[12px] hidden sm:block">
                                Showing <strong className="text-[#e6edf3]">{gitLogHistory.length} commits</strong>
                            </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#8b949e]">001a1f..042ff0</span>
                    </div>

                    {/* ── git log command line ── */}
                    <div className="bg-[#0d1117] px-4 sm:px-8 py-3 border-b border-[#21262d] flex items-center gap-2 text-[13px]">
                        <span className="text-[#3fb950]">➜</span>
                        <span className="text-[#58a6ff]">amruth/journey</span>
                        <span className="text-[#e6edf3]">git log --stat</span>
                        <span className="inline-block w-2 h-[14px] bg-[#e6edf3] animate-pulse ml-0.5" />
                    </div>

                    {/* ── Git log entries ── */}
                    <div className="p-4 sm:p-8 bg-[#0d1117]">
                        <div className="flex flex-col gap-6">
                            {gitLogHistory.map((commit, index) => (
                                <GitLogEntry
                                    key={index}
                                    {...commit}
                                />
                            ))}

                            {/* Future commit */}
                            <div className="pt-4 border-t border-[#21262d] flex items-center gap-2 text-[#484f58] text-[12px] italic">
                                <span className="animate-pulse">▋</span>
                                <span>Next commit in progress...</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}

// Data: The Story encoded as Git Commits (Specific User Request)
interface CommitData {
    hash: string;
    author: string;
    date: string;
    message: string;
    subtitle: string;
    details: string[];
    modules: string[];
    systemState: string;
    color: 'blue' | 'yellow' | 'purple' | 'green';
}

const gitLogHistory: CommitData[] = [
    {
        hash: "001a1f",
        author: "Amruth",
        date: "Year 0",
        message: "Initialized developer journey",
        subtitle: "The Spark",
        details: [
            "Discovered web development through a single YouTube video",
            "Built first static webpage",
            "Experienced the thrill of turning ideas into something visible"
        ],
        modules: ["HTML5", "CSS3"],
        systemState: "Curiosity Activated",
        color: "green"
    },
    {
        hash: "014b7c",
        author: "Amruth",
        date: "Year 1",
        message: "Upgraded from static to dynamic systems",
        subtitle: "The Evolution",
        details: [
            "Deep-dived into core JavaScript fundamentals",
            "Discovered component-driven architecture with React",
            "Began building interactive, user-focused applications"
        ],
        modules: ["JavaScript", "React", "Tailwind CSS"],
        systemState: "Builder Mode Enabled",
        color: "yellow"
    },
    {
        hash: "028d9e",
        author: "Amruth",
        date: "Year 2",
        message: "Patched confidence errors and strengthened core resilience",
        subtitle: "The Climb",
        details: [
            "Self-taught without a traditional tech background",
            "Faced and resolved recurring “underconfidence” exceptions",
            "Learned that debugging is not just code — it’s mindset"
        ],
        modules: ["Debugging", "Self-Learning", "Grit"],
        systemState: "Resilience Stable",
        color: "purple"
    },
    {
        hash: "042ff0",
        author: "Amruth",
        date: "Present",
        message: "Defined long-term architectural vision",
        subtitle: "The Vision",
        details: [
            "Studying system design and scalable architectures",
            "Building applications with long-term maintainability in mind",
            "Transitioning from feature builder → system thinker"
        ],
        modules: ["Architecture", "Scalability", "Distributed Thinking"],
        systemState: "Evolving…",
        color: "blue"
    }
];
