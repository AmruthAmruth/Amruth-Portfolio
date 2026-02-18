'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageWrapperProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
}

/**
 * Wrapper for feature images with floating animation
 */
export default function ImageWrapper({
    src,
    alt,
    className = '',
    width = 500,
    height = 500,
    priority = false
}: ImageWrapperProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative ${className}`}
        >
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 1, -1, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative z-10"
            >
                <div className="relative isolate">
                    {/* Glow effect specific to the image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-400/20 blur-[60px] rounded-full -z-10" />

                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="w-full h-auto object-contain drop-shadow-xl"
                        priority={priority}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
