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
                        gradient="from-blue-400 to-green-400"
                        alignment="center"
                    />
                </div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-800 shadow-2xl font-mono relative"
                >
                    {/* Terminal Toolbar (MacOS Style) */}
                    <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-gray-800">
                        {/* Traffic Lights */}
                        <div className="flex gap-2 mr-4">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors shadow-sm" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors shadow-sm" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors shadow-sm" />
                        </div>
                        {/* Title - Sans Serif for native look */}
                        <div className="flex-1 text-center text-xs font-sans font-medium text-gray-400 select-none">
                            amruth@portfolio — -zsh
                        </div>
                        <div className="w-14" /> {/* Spacer for centering */}
                    </div>

                    {/* Terminal Content */}
                    <div className="p-4 sm:p-8 text-sm sm:text-base bg-opacity-90 bg-[#1e1e1e]">
                        {/* Visual Command Input */}
                        <div className="mb-6 text-gray-300 font-mono">
                            <span className="text-green-400 mr-2">➜</span>
                            <span className="text-blue-400 mr-2">~</span>
                            <span className="typing-effect">git log --stat</span>
                        </div>

                        <div className="flex flex-col gap-6">
                            {gitLogHistory.map((commit, index) => (
                                <GitLogEntry
                                    key={index}
                                    {...commit}
                                />
                            ))}

                            {/* Future Commits Indicator */}
                            <div className="mt-8 pt-4 border-t border-gray-800 text-gray-500 italic animate-pulse font-mono">
                                &gt; Future commits loading...
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
