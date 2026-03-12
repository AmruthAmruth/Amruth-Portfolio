'use client';

import { motion } from 'framer-motion';
import { itemVariants } from '@/constants/animations';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    gradient?: string; // Kept for backwards compatibility but unused
    className?: string;
    alignment?: 'left' | 'center' | 'right';
    dataType?: 'object' | 'array' | 'function' | 'interface' | 'command';
}

/**
 * Clean, premium minimal section header:
 * pill eyebrow → pure text title → subtle underline → description
 */
export default function SectionHeader({
    title,
    subtitle,
    description,
    className = '',
    alignment = 'center',
}: SectionHeaderProps) {
    const alignClass = {
        left: 'items-start',
        center: 'items-center',
        right: 'items-end',
    }[alignment];

    const textClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }[alignment];

    const marginClass = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
    }[alignment];

    return (
        <motion.div
            variants={itemVariants}
            className={`flex flex-col w-full relative z-10 ${alignClass} ${textClass} ${className}`}
        >
            {/* ── Eyebrow pill ── */}
            {subtitle && (
                <span
                    className={`inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-sm text-[12px] font-semibold tracking-wide text-slate-600 shadow-sm`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0`} />
                    {subtitle}
                </span>
            )}

            {/* ── Main title ── */}
            <h2
                className={`text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.15] text-slate-900`}
            >
                {title}
            </h2>

            {/* ── Accent underline ── */}
            <div
                className={`mt-6 mb-6 h-[3px] w-12 rounded-full bg-slate-800 ${marginClass}`}
            />

            {/* ── Description ── */}
            {description && (
                <p
                    className={`max-w-2xl text-[16px] sm:text-[18px] text-slate-600 leading-relaxed font-medium ${marginClass}`}
                >
                    {description}
                </p>
            )}
        </motion.div>
    );
}

