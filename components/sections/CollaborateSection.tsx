'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { containerVariants } from '@/constants/animations';
import { blobColors, sectionGradients, accentGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import ContactForm from '@/components/shared/ContactForm';
import DecorativeDots from '@/components/shared/DecorativeDots';
import SectionDivider from '@/components/shared/SectionDivider';

export default function CollaborateSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="collaborate" className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${sectionGradients.collaborate} py-24 md:py-32`}>
            {/* Floating Blobs */}
            <FloatingBlobs colors={blobColors.collaborate} />

            {/* Wave Divider Top */}
            <SectionDivider position="top" color="#fff" />

            {/* Main Content */}
            <div ref={sectionRef} className="relative z-10 max-w-2xl mx-auto px-6 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Section Title */}
                    <SectionHeader
                        title="Let's Collaborate"
                        subtitle="I'm always open to exciting projects — feel free to reach out."
                        gradient={accentGradients.purplePink}
                        className="mb-12"
                    />

                    {/* Contact Form */}
                    <ContactForm />

                    {/* Decorative Element */}
                    <motion.div
                        className="flex justify-center pt-12"
                    >
                        <DecorativeDots colors={['bg-purple-400', 'bg-pink-400', 'bg-purple-400']} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
