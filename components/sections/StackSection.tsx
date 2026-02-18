'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills, categories } from '@/constants/skills';
import { containerVariants, fastStaggerContainer } from '@/constants/animations';
import { blobColors, sectionGradients, accentGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import SkillBubble from '@/components/shared/SkillBubble';
import DecorativeDots from '@/components/shared/DecorativeDots';
import SectionDivider from '@/components/shared/SectionDivider';

export default function StackSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="stack" className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${sectionGradients.stack} py-24 md:py-32`}>
            {/* Floating Blobs */}
            <FloatingBlobs colors={blobColors.stack} />

            {/* Main Content */}
            <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                {/* Section Title */}
                <SectionHeader
                    title="Stack"
                    subtitle="Technologies I use to build scalable, modern applications"
                    gradient={accentGradients.blueCyan}
                    className="mb-20"
                />

                {/* Skills by Category */}
                <div className="space-y-16">
                    {categories.map((category, categoryIndex) => {
                        const categorySkills = skills.filter((skill) => skill.category === category);

                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{
                                    duration: 0.8,
                                    delay: categoryIndex * 0.15,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                                className="space-y-6"
                            >
                                {/* Category Title */}
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 text-center md:text-left">
                                    {category}
                                </h3>

                                {/* Skill Bubbles */}
                                <motion.div
                                    variants={fastStaggerContainer}
                                    initial="hidden"
                                    animate={isInView ? 'visible' : 'hidden'}
                                    className="flex flex-wrap justify-center md:justify-start gap-4"
                                >
                                    {categorySkills.map((skill, index) => (
                                        <SkillBubble key={skill.name} skill={skill} index={index} />
                                    ))}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Decorative Element */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="flex justify-center pt-16"
                >
                    <DecorativeDots />
                </motion.div>
            </div>

            {/* Wave Divider */}
            <SectionDivider position="bottom" color="#fff" />
        </section >
    );
}
