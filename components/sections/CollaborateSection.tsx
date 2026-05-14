'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { containerVariants } from '@/constants/animations';
import { blobColors, sectionGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionDivider from '@/components/shared/SectionDivider';
import SectionHeader from '@/components/shared/SectionHeader';
import TransmissionForm from '@/components/shared/TransmissionForm';

export default function CollaborateSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="connect" className={`relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden ${sectionGradients.collaborate || 'bg-white'} py-16 md:py-20`}>

            <FloatingBlobs colors={blobColors.collaborate || ['bg-purple-200/10', 'bg-pink-200/10']} />

            {/* Main Content */}
            <div ref={sectionRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex flex-col items-center"
                >
                    {/* Section Title */}
                    <SectionHeader
                        title="Transmission"
                        subtitle="await connection.sync()"
                        description="Establishing a secure data uplink for new projects, roles, and future-ready collaborations."
                        dataType="function"
                        gradient="from-blue-600 to-purple-600"
                        className="mb-12"
                    />

                    {/* Contact Form as Data Uplink */}
                    <div className="w-full relative z-20">
                        <TransmissionForm />
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
