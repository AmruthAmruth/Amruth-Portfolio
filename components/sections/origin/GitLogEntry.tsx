'use client';

import { motion } from 'framer-motion';

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
    dot: string;
    badgeText: string;
    badgeBg: string;
    badgeBorder: string;
}> = {
    feat: { label: 'Milestone', dot: 'bg-[#388bfd]', badgeText: 'text-[#79c0ff]', badgeBg: 'bg-[#388bfd]/10', badgeBorder: 'border-[#388bfd]/30' },
    chore: { label: 'Learning', dot: 'bg-[#a371f7]', badgeText: 'text-[#d2a8ff]', badgeBg: 'bg-[#a371f7]/10', badgeBorder: 'border-[#a371f7]/30' },
    fix: { label: 'Growth', dot: 'bg-[#f78166]', badgeText: 'text-[#ffa198]', badgeBg: 'bg-[#f78166]/10', badgeBorder: 'border-[#f78166]/30' },
    update: { label: 'Level Up', dot: 'bg-[#3fb950]', badgeText: 'text-[#7ee787]', badgeBg: 'bg-[#3fb950]/10', badgeBorder: 'border-[#3fb950]/30' },
    init: { label: 'The Spark', dot: 'bg-[#2ea043]', badgeText: 'text-[#7ee787]', badgeBg: 'bg-[#2ea043]/10', badgeBorder: 'border-[#2ea043]/30' },
    plan: { label: 'Vision', dot: 'bg-[#f2cc60]', badgeText: 'text-[#f2cc60]', badgeBg: 'bg-[#f2cc60]/10', badgeBorder: 'border-[#f2cc60]/30' },
};

export default function GitLogEntry({
    hash, author, date, type, scope, message,
    headline, body, tags, avatarUrl, isLast, index,
}: GitLogEntryProps) {
    const tc = TYPE_CONFIG[type] ?? TYPE_CONFIG['feat'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className="group relative flex gap-0"
        >
            {/* ── Graph rail ── */}
            <div className="shrink-0 relative flex flex-col items-center w-7 sm:w-12">
                {/* Colored node dot */}
                <div className={`
                    relative z-10 mt-[20px] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-[#0d1117]
                    ring-2 ring-[#30363d] group-hover:ring-[#58a6ff]/60
                    ${tc.dot} transition-all duration-300 shrink-0
                `} />
                {/* Connecting line */}
                {!isLast && (
                    <div className="absolute top-[36px] bottom-0 w-px bg-[#30363d] group-hover:bg-[#444c56] transition-colors duration-300" />
                )}
            </div>

            {/* ── Right column ── */}
            <div className="flex-1 min-w-0 pb-8">

                {/* ── Commit summary row ── */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-2 px-2.5 sm:py-2.5 sm:px-3.5 mb-3 rounded-lg bg-[#161b22] border border-[#30363d] group-hover:border-[#444c56] shadow-sm transition-all duration-200">
                    <div className="flex items-center justify-between sm:justify-start gap-2">
                        {/* Friendly pill label */}
                        <span className={`
                            text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wider
                            ${tc.badgeBg} ${tc.badgeBorder} ${tc.badgeText}
                        `}>
                            {tc.label}
                        </span>

                        {/* Hash — subtle, mobile visible */}
                        <span className="sm:hidden font-mono text-[9px] text-[#6e7681] bg-[#0d1117] border border-[#30363d] px-1.5 py-0.5 rounded shrink-0">
                            {hash}
                        </span>
                    </div>

                    {/* Human-readable commit title */}
                    <span className="text-[12px] sm:text-[14px] font-semibold text-[#e6edf3] flex-1 min-w-0 leading-snug">
                        {headline}
                    </span>

                    {/* Hash — subtle, desktop only */}
                    <span className="hidden sm:inline shrink-0 font-mono text-[11px] text-[#6e7681] bg-[#0d1117] border border-[#30363d] px-2 py-0.5 rounded">
                        {hash}
                    </span>
                </div>

                {/* ── Expanded commit card ── */}
                <div className="rounded-lg border border-[#30363d] bg-[#161b22] overflow-hidden">

                    {/* Card meta bar */}
                    <div className="flex flex-wrap items-center justify-between gap-y-1 gap-x-4 px-4 sm:px-5 py-2.5 bg-[#0d1117] border-b border-[#21262d]">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <img
                                src={avatarUrl}
                                alt={author}
                                className="w-5 h-5 rounded-full border border-[#30363d] shrink-0"
                            />
                            <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#c9d1d9] truncate">{author}</span>
                                <span className="text-[11.5px] sm:text-[12.5px] text-[#6e7681] shrink-0">committed</span>
                            </div>
                            {/* Subtle technical commit message */}
                            <span className="hidden md:inline font-mono text-[11px] text-[#6e7681] border border-[#30363d] bg-[#161b22] px-2 py-0.5 rounded ml-1 truncate">
                                {type}({scope}): {message}
                            </span>
                        </div>
                        <span className="text-[11px] sm:text-[12px] text-[#6e7681] shrink-0">{date}</span>
                    </div>

                    {/* Card body — the readable story */}
                    <div className="px-4 sm:px-6 py-5">
                        <p className="text-[15px] sm:text-[15.5px] font-normal text-[#c9d1d9] leading-[1.85] font-sans">
                            {body}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 px-4 sm:px-6 py-3 border-t border-[#21262d] bg-[#0d1117]/40">
                        <span className="text-[11px] text-[#6e7681] mr-1">Tagged:</span>
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-0.5 text-[11.5px] font-medium rounded-full border border-[#30363d] text-[#8b949e] bg-[#161b22] hover:text-[#c9d1d9] hover:border-[#6e7681] transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
