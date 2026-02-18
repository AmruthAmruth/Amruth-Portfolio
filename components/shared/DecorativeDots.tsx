'use client';

import { motion } from 'framer-motion';

interface DecorativeDotsProps {
    colors?: string[];
    className?: string;
}

/**
 * Animated decorative dots used at the end of sections
 */
export default function DecorativeDots({
    colors = ['bg-blue-400', 'bg-cyan-400', 'bg-teal-400'],
    className = '',
}: DecorativeDotsProps) {
    return (
        <div className={`flex gap-2 ${className}`}>
            {colors.map((color, index) => (
                <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${color} animate-pulse`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                />
            ))}
        </div>
    );
}
