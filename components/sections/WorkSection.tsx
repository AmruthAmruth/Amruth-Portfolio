'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '@/constants/projects';
import { containerVariants, cardVariants } from '@/constants/animations';
import { blobColors, sectionGradients, accentGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import ProjectCard from '@/components/shared/ProjectCard';
import SectionDivider from '@/components/shared/SectionDivider';

export default function WorkSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="work" className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${sectionGradients.work} py-24 md:py-32`}>
            {/* Floating Blobs */}
            <FloatingBlobs colors={blobColors.work} />

            {/* Main Content */}
            <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Section Title */}
                    <SectionHeader
                        title="Work"
                        subtitle="Building scalable systems that solve real-world problems"
                        gradient={accentGradients.blueTeal}
                        className="mb-20"
                    />

                    {/* Project Cards */}
                    <div className="space-y-16">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.title} project={project} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Wave Divider */}
            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}
