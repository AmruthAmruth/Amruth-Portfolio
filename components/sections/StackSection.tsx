'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '@/constants/skills';
import { accentGradients } from '@/constants/theme';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';
import ArchitectureLayer from '@/components/shared/ArchitectureLayer';

export default function StackSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    // Helper to get skills for a category
    const getSkills = (categoryName: string) => skills.filter(s => s.category === categoryName);

    // Define the Architectural Layers
    const layers = [
        {
            name: "Presentation Layer",
            description: "User Interface, Interactivity via Modern Web Standards.",
            categories: [
                { name: "Languages", skills: getSkills("Languages") },
                { name: "Frontend", skills: getSkills("Frontend") },
            ]
        },
        {
            name: "Application Layer",
            description: "Business Logic, API Handling, Security & Real-time Communication.",
            categories: [
                { name: "Backend", skills: getSkills("Backend") },
                { name: "Real-time", skills: getSkills("Real-time") },
                { name: "Security", skills: getSkills("Security") },
            ]
        },
        {
            name: "Infrastructure Layer",
            description: "Data Persistence, Cloud Deployment & Orchestration.",
            categories: [
                { name: "Databases", skills: getSkills("Databases") },
                { name: "DevOps & Cloud", skills: getSkills("DevOps & Cloud") },
            ]
        },
        {
            name: "Development Ecosystem",
            description: "Tools & Methodologies for Efficient Delivery.",
            categories: [
                { name: "Tools", skills: getSkills("Tools") },
            ]
        },
    ];

    return (
        <section id="stack" className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-50/50 py-24 md:py-32`}>

            {/* Background Texture (Dot Pattern) */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Main Content */}
            <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                {/* Section Title */}
                <SectionHeader
                    title="System Architecture"
                    subtitle="A structured view of my technical competencies"
                    gradient={accentGradients.blueCyan}
                    className="mb-16"
                />

                {/* Architectural Stack */}
                <div className="flex flex-col items-center w-full">
                    {layers.map((layer, index) => (
                        <ArchitectureLayer
                            key={layer.name}
                            layerName={layer.name}
                            description={layer.description}
                            categories={layer.categories}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom Decorative Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex justify-center mt-16"
                >
                    <div className="text-xs font-mono text-gray-400 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                        ARCHITECTURE_VERIFIED_V1.0
                    </div>
                </motion.div>
            </div>

            {/* Wave Divider */}
            <SectionDivider position="bottom" color="#fff" />
        </section >
    );
}
