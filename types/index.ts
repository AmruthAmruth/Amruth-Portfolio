/**
 * Core type definitions for the portfolio application
 */

import { Variants } from 'framer-motion';

/**
 * Project data structure
 */
export interface Project {
    title: string;
    impact: string;
    problem: string;
    features: string[];
    outcome: string;
    techStack: TechStack[];
    liveUrl: string;
    githubUrl: string;
    gradient: string;
}

/**
 * Tech stack item
 */
export interface TechStack {
    name: string;
    icon: string;
}

/**
 * Skill data structure
 */
export interface Skill {
    name: string;
    category: string;
    color: string;
}

/**
 * Social media link
 */
export interface SocialLink {
    name: string;
    url: string;
    icon: string;
    hoverColor: string;
    ariaLabel: string;
}

/**
 * Contact form data
 */
export interface FormData {
    name: string;
    email: string;
    message: string;
}

/**
 * Animation variants type
 */
export type AnimationVariants = Variants;

/**
 * Floating blob configuration
 */
export interface BlobConfig {
    className: string;
    animate: {
        x: number[];
        y: number[];
        scale: number[];
    };
    transition: {
        duration: number;
        repeat: number;
        ease: string;
    };
}
