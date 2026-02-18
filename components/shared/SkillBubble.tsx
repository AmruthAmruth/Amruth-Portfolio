'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/types';
import { bubbleVariants } from '@/constants/animations';

interface SkillBubbleProps {
  skill: Skill;
  index: number;
}

/**
 * Animated skill bubble component
 */
export default function SkillBubble({ skill, index }: SkillBubbleProps) {
  return (
    <motion.div
      variants={bubbleVariants}
      whileHover={{
        scale: 1.1,
        rotate: [0, -2, 2, -2, 0],
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
      }}
      className={`group relative px-6 py-3 rounded-full bg-gradient-to-r ${skill.color} text-white font-medium text-sm md:text-base shadow-lg cursor-pointer overflow-hidden`}
      style={{
        animation: `float ${10 + index * 1.5}s ease-in-out infinite`,
        animationDelay: `${index * 0.2}s`,
      }}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

      {/* Skill Name */}
      <span className="relative z-10">{skill.name}</span>

      {/* CSS for Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </motion.div>
  );
}
