'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, Copy, Terminal, Code, CheckCircle2, ShieldCheck } from 'lucide-react';

interface GitLogEntryProps {
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
    index: number;
}

const TYPE_CONFIG: Record<string, {
    label: string;
    color: string;
}> = {
    feat: { label: 'Milestone', color: '#388bfd' },
    chore: { label: 'Learning', color: '#a371f7' },
    fix: { label: 'Growth', color: '#f78166' },
    update: { label: 'Level Up', color: '#3fb950' },
    init: { label: 'The Spark', color: '#2ea043' },
    plan: { label: 'Vision', color: '#f2cc60' },
};

export default function GitLogEntry({
    hash, author, date, type, message,
    headline, body, tags, avatarUrl, isLast, index,
}: GitLogEntryProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const tc = TYPE_CONFIG[type] ?? TYPE_CONFIG['feat'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`relative flex gap-0 ${!isLast ? 'border-b border-[#30363d]' : ''} hover:bg-[#161b22]/50 transition-colors group/row`}
        >
            {/* ── Graph Rail ── */}
            <div className="shrink-0 relative flex flex-col items-center w-10 sm:w-14">
                <div className="absolute top-0 bottom-0 w-[2px] bg-[#30363d]" />
                <div 
                    className="relative z-10 mt-5 w-3 h-3 rounded-full border-2 border-[#0d1117] ring-1 ring-[#30363d]"
                    style={{ backgroundColor: tc.color }}
                />
            </div>

            {/* ── Main Content Area ── */}
            <div className="flex-1 min-w-0 py-3 pr-4 sm:pr-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                        {/* Headline Row */}
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[14px] sm:text-[15px] font-semibold text-[#e6edf3] hover:text-[#58a6ff] cursor-pointer truncate leading-snug">
                                {headline}
                            </h4>
                            {body && (
                                <button 
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="shrink-0 flex items-center justify-center w-5 h-4 bg-[#21262d] border border-[#30363d] rounded text-[#8b949e] hover:border-[#8b949e] transition-colors mt-0.5"
                                >
                                    <span className="text-[10px] font-bold leading-none">...</span>
                                </button>
                            )}
                        </div>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-[#8b949e]">
                            <div className="flex items-center gap-1.5">
                                <img src={avatarUrl} alt={author} className="w-4 h-4 rounded-full" />
                                <span className="font-semibold text-[#c9d1d9]">{author}</span>
                            </div>
                            
                            {/* Verified Badge */}
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-[#30363d] text-[10px] font-medium text-[#3fb950] bg-[#3fb950]/5">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Verified</span>
                            </div>

                            <span>committed</span>
                            <span className="hover:text-[#58a6ff] cursor-pointer">{date}</span>
                            
                            {/* Status Check */}
                            <div className="flex items-center gap-1 text-[#3fb950]">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            
                            {/* Tags - Compact GitHub Style */}
                            <div className="hidden sm:flex items-center gap-1.5 ml-2">
                                {tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-[#30363d] bg-[#0d1117] text-[10px] font-medium text-[#8b949e]">
                                        <div className="w-1 h-1 rounded-full bg-[#8b949e]/40" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Hash & Icons */}
                    <div className="hidden sm:flex items-center gap-0 border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117] shrink-0">
                        <button className="flex items-center gap-1.5 px-3 py-1 text-[12px] font-mono text-[#c9d1d9] hover:bg-[#161b22] border-r border-[#30363d] transition-colors">
                            {hash}
                        </button>
                        <button className="p-1.5 text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22] transition-colors border-r border-[#30363d]">
                            <Code className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22] transition-colors">
                            <Copy className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Expandable Body */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden"
                        >
                            <div className="mt-3 p-4 bg-[#0d1117] border border-[#30363d] rounded-md shadow-inner">
                                <p className="text-[13px] sm:text-[14px] text-[#c9d1d9] leading-relaxed font-sans whitespace-pre-wrap">
                                    {body}
                                </p>
                                <div className="mt-3 pt-3 border-t border-[#30363d] flex items-center gap-2">
                                    <Terminal className="w-3.5 h-3.5 text-[#8b949e]" />
                                    <span className="text-[11px] font-mono text-[#6e7681]">
                                        type: {type} · {message}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
