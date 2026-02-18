'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingBlobsProps {
    colors: string[];
    variant?: 'hero' | 'section';
}

/**
 * Floating animated background blobs
 * Reusable component for consistent background animations across sections
 */
export default function FloatingBlobs({ colors, variant = 'section' }: FloatingBlobsProps) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
    const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

    const blobConfigs = variant === 'hero'
        ? [
            {
                className: `absolute -top-20 -left-20 w-96 h-96 ${colors[0]} rounded-full blur-3xl opacity-70`,
                animate: { x: [0, 50, 0], scale: [1, 1.1, 1] },
                transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' as const },
                y: y1
            },
            {
                className: `absolute -bottom-20 -right-20 w-[500px] h-[500px] ${colors[1]} rounded-full blur-3xl opacity-70`,
                animate: { x: [0, -40, 0], scale: [1, 1.15, 1] },
                transition: { duration: 25, repeat: Infinity, ease: 'easeInOut' as const },
                y: y2
            },
            {
                className: `absolute top-1/3 right-1/4 w-80 h-80 ${colors[2]} rounded-full blur-3xl opacity-60`,
                animate: { x: [0, -30, 0], scale: [1, 1.2, 1] },
                transition: { duration: 22, repeat: Infinity, ease: 'easeInOut' as const },
                y: y3
            },
        ]
        : [
            {
                className: `absolute top-20 left-10 w-72 h-72 ${colors[0]} rounded-full blur-3xl opacity-50`,
                animate: { x: [0, 30, 0], scale: [1, 1.1, 1] },
                transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' as const },
                y: y1
            },
            {
                className: `absolute bottom-20 right-10 w-96 h-96 ${colors[1]} rounded-full blur-3xl opacity-50`,
                animate: { x: [0, -25, 0], scale: [1, 1.15, 1] },
                transition: { duration: 22, repeat: Infinity, ease: 'easeInOut' as const },
                y: y2
            },
        ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {blobConfigs.map((config, index) => (
                <motion.div
                    key={index}
                    className={config.className}
                    animate={config.animate}
                    style={{ y: config.y }}
                    transition={config.transition}
                />
            ))}
        </div>
    );
}
