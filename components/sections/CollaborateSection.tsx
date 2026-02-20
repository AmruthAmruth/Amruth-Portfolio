'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { containerVariants } from '@/constants/animations';
import SectionDivider from '@/components/shared/SectionDivider';
import TransmissionForm from '@/components/shared/TransmissionForm';

export default function CollaborateSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section id="collaborate" className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 py-24 md:py-32`}>

            {/* Ambient Glows (Subtle for light mode) */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Perspective Grid Background (Dark lines on light bg) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                     `,
                    backgroundSize: '50px 50px',
                    maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)'
                }}
            />
            {/* Floor Perspective (Retro Synthwave Style but subtle) */}
            <div className="absolute bottom-0 w-full h-[50vh] bg-gradient-to-t from-blue-100/40 to-transparent opacity-50 pointer-events-none" />


            {/* Wave Divider Top (White to match previous section) */}
            <SectionDivider position="top" color="#f8fafc" />

            {/* Main Content */}
            <div ref={sectionRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex flex-col items-center"
                >
                    {/* Section Title */}
                    <div className="mb-12 text-center space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase mb-2"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                            Open to opportunities
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight break-words">
                            Let&apos;s build something{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">together</span>
                        </h2>

                        <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
                            Have a project in mind, a role to fill, or just want to say hello?
                            Drop me a message — I read every one.
                        </p>
                    </div>

                    {/* Contact Form as Data Uplink */}
                    <div className="w-full relative z-20">
                        <TransmissionForm />
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
