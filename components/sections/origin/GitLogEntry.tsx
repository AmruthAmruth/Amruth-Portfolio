'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import TypingText from '@/components/shared/TypingText';

interface GitLogEntryProps {
    hash: string;
    author: string;
    date: string;
    message: string;
    subtitle: string;
    details: string[];
    modules: string[];
    systemState: string;
    isLast?: boolean;
    color: 'blue' | 'yellow' | 'purple' | 'green';
}

const colorStyles = {
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
    green: 'text-green-400'
};

export default function GitLogEntry({
    hash,
    author,
    date,
    message,
    subtitle,
    details,
    modules,
    systemState,
    isLast = false,
    color,
}: GitLogEntryProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const colorClass = colorStyles[color] || colorStyles.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            className="group relative font-mono mb-8 last:mb-0 border-l border-gray-800 hover:border-gray-600 transition-colors pl-4"
        >
            {/* Header: Commit Meta Info */}
            <div
                className="cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-500 font-bold">commit {hash}</span>
                    <span className="text-gray-500 text-xs">(origin/main)</span>
                </div>

                <div className="text-gray-400 text-sm mb-1">
                    Author: <span className="text-gray-300">{author}</span>
                </div>

                <div className="text-gray-400 text-sm mb-1">
                    Date: <span className="text-gray-300">{date}</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <span className="text-gray-400 text-sm">Message:</span>
                    <span className="text-gray-200 font-semibold">
                        <TypingText text={message} speed={20} delay={100} />
                    </span>
                </div>

                {/* Expansion Trigger */}
                <div className="flex items-center gap-2 mt-3 text-sm hover:opacity-80 transition-opacity">
                    {isExpanded ? <ChevronDown size={16} className={colorClass} /> : <ChevronRight size={16} className={colorClass} />}
                    <span className={`${colorClass} font-bold flex items-center`}>
                        + <TypingText text={` ${subtitle}`} speed={30} delay={600} cursor={false} />
                    </span>
                    {!isExpanded && <span className="text-gray-600 text-xs ml-2 italic hidden sm:inline">...click to view details</span>}
                </div>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 ml-1 space-y-4">

                            {/* Story / detail lines */}
                            <div className="space-y-2">
                                {details.map((line, i) => (
                                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${colorClass.replace('text-', 'bg-')}`} />
                                        <p className="leading-relaxed">{line}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-800/60" />

                            {/* Modules + System State row */}
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-2">
                                    {modules.map((mod, i) => (
                                        <span
                                            key={i}
                                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${color === 'green' ? 'bg-green-900/20 text-green-400 border-green-800/40' :
                                                    color === 'yellow' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-800/40' :
                                                        color === 'purple' ? 'bg-purple-900/20 text-purple-400 border-purple-800/40' :
                                                            'bg-blue-900/20 text-blue-400 border-blue-800/40'
                                                }`}
                                        >
                                            {mod}
                                        </span>
                                    ))}
                                </div>
                                <span className="flex items-center gap-1.5 text-[11px] text-gray-400 bg-gray-800/50 border border-gray-700/50 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${colorClass.replace('text-', 'bg-')}`} />
                                    {systemState}
                                </span>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
