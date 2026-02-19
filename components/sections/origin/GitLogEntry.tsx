'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

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
                    <span className="text-gray-200 font-semibold">{message}</span>
                </div>

                {/* Expansion Trigger */}
                <div className="flex items-center gap-2 mt-3 text-sm hover:opacity-80 transition-opacity">
                    {isExpanded ? <ChevronDown size={16} className={colorClass} /> : <ChevronRight size={16} className={colorClass} />}
                    <span className={`${colorClass} font-bold`}>+ {subtitle}</span>
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
                        <div className="mt-4 pl-2 border-l-2 border-gray-800/50 ml-1">
                            {/* 'Code Block' Style Story */}
                            <div className="font-mono text-sm text-gray-400 bg-gray-900/50 p-3 rounded-md mb-4 border border-gray-800">
                                <span className="text-yellow-600">{'{'}</span>
                                <div className="pl-4 py-1 space-y-2">
                                    {details.map((line, i) => (
                                        <p key={i} className="text-gray-300">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                                <span className="text-yellow-600">{'}'}</span>
                            </div>

                            {/* Modules & Status */}
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-blue-400 font-semibold block mb-1">Modules Installed:</span>
                                    <div className="flex flex-wrap gap-2 text-gray-300">
                                        {modules.map((mod, i) => (
                                            <span key={i} className="bg-gray-800 px-2 py-0.5 rounded text-xs border border-gray-700">
                                                {mod}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-purple-400 font-semibold">System State:</span>
                                    <span className="text-gray-200">{systemState}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
