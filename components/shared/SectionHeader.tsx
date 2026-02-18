'use client';

import { motion } from 'framer-motion';
import { itemVariants } from '@/constants/animations';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    gradient: string;
    className?: string;
    alignment?: 'left' | 'center' | 'right';
}

/**
 * Reusable section header with title, divider, and optional subtitle
 */
export default function SectionHeader({
    title,
    subtitle,
    gradient,
    className = '',
    alignment = 'center',
}: SectionHeaderProps) {
    const alignmentClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    };

    const dividerClasses = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
    };

    return (
        <motion.div
            variants={itemVariants}
            className={`flex flex-col ${alignmentClasses[alignment]} ${className}`}
        >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                {title}
            </h2>
            <div className={`w-24 h-1 bg-gradient-to-r ${gradient} ${dividerClasses[alignment]} rounded-full mb-6`} />
            {subtitle && (
                <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
