import { AnimationVariants } from '@/types';

/**
 * Reusable animation variants for Framer Motion
 */

/**
 * Container variant with staggered children
 */
export const containerVariants: AnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

/**
 * Fast stagger container for multiple items
 */
export const fastStaggerContainer: AnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

/**
 * Item fade-in from bottom
 */
export const itemVariants: AnimationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

/**
 * Card variant with larger movement
 */
export const cardVariants: AnimationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

/**
 * Bubble/badge variant with scale
 */
export const bubbleVariants: AnimationVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
};

/**
 * Custom easing function for smooth animations
 */
export const customEase = [0.25, 0.1, 0.25, 1] as const;
