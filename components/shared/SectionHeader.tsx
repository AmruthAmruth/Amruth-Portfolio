'use client';

import { motion } from 'framer-motion';
import { itemVariants } from '@/constants/animations';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    gradient?: string;
    className?: string;
    alignment?: 'left' | 'center' | 'right';
    dataType?: 'object' | 'array' | 'function' | 'interface';
}

/**
 * Reusable section header with a data-structure inspired design
 */
export default function SectionHeader({
    title,
    subtitle,
    description,
    gradient = 'from-blue-500 to-purple-500',
    className = '',
    alignment = 'center',
    dataType = 'object'
}: SectionHeaderProps) {
    const alignmentClasses = {
        left: 'items-start justify-start',
        center: 'items-center justify-center',
        right: 'items-end justify-end',
    };

    const textAlignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    const getBracketParams = () => {
        switch (dataType) {
            case 'array': return { open: '[', close: ']' };
            case 'interface': return { open: '{', close: '}' };
            case 'function': return { open: '() {', close: '}' };
            case 'object':
            default: return { open: '{', close: '}' };
        }
    };

    const brackets = getBracketParams();

    return (
        <motion.div
            variants={itemVariants}
            className={`flex flex-col w-full relative z-10 ${alignmentClasses[alignment]} ${textAlignmentClasses[alignment]} ${className}`}
        >
            {/* Standard Visual Header */}
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {title}
            </h2>
            <div className={`w-24 h-1 bg-gradient-to-r ${gradient} ${alignment === 'left' ? 'mr-auto' : alignment === 'right' ? 'ml-auto' : 'mx-auto'} rounded-full`} />

            {/* Data Structure Inspired Header Element */}
            <div className={`mt-6 font-mono text-xs sm:text-sm md:text-base bg-white/50 backdrop-blur-md p-4 sm:p-5 outline outline-1 outline-gray-200 shadow-sm rounded-xl max-w-3xl w-full text-left overflow-x-auto hover:shadow-md transition-shadow duration-300 ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : 'mr-auto'}`}>
                <div className="flex items-center gap-1.5 mb-3 opacity-60">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>

                <div className="text-gray-800">
                    {dataType === 'interface' ? (
                        <span className="text-pink-600 font-semibold">interface</span>
                    ) : dataType === 'function' ? (
                        <span className="text-blue-600 font-semibold">function</span>
                    ) : (
                        <span className="text-pink-600 font-semibold">const</span>
                    )}{' '}
                    <span className="text-blue-700 font-bold">{title.replace(/\s+/g, '')}</span>
                    {dataType !== 'interface' && dataType !== 'function' && <span className="text-gray-500"> = </span>}
                    {' '}
                    <span className="text-yellow-600">{brackets.open}</span>

                    <div className="pl-6 py-2 border-l border-gray-300 ml-2 my-1 space-y-2">
                        {subtitle && (
                            <div className="flex">
                                <span className="text-purple-700 shrink-0 mr-2">subtitle:</span>
                                <span className="text-green-700 font-medium">&quot;{subtitle}&quot;</span>
                                {dataType !== 'interface' && <span className="text-gray-500">,</span>}
                            </div>
                        )}
                        {description && (
                            <div className="flex">
                                <span className="text-purple-700 shrink-0 mr-2">description:</span>
                                <span className="text-green-700 font-medium">&quot;{description}&quot;</span>
                                {dataType !== 'interface' && <span className="text-gray-500">,</span>}
                            </div>
                        )}
                        <div className="flex">
                            <span className="text-purple-700 shrink-0 mr-2">status:</span>
                            <span className="text-gray-500 italic">{'// Ready for execution'}</span>
                        </div>
                    </div>

                    <span className="text-yellow-600">{brackets.close}</span>
                    {dataType !== 'interface' && dataType !== 'function' && <span className="text-gray-500">;</span>}
                </div>
            </div>
        </motion.div>
    );
}
