'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { blobColors, sectionGradients, accentGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';

const journeyChapters = [
    {
        title: "The Spark",
        year: "The Beginning",
        content: (
            <>
                After high school, I stood at a crossroads with <span className="font-semibold text-gray-900">no clear path</span>.
                Then, a single YouTube video about web development changed everything. Building my first static page was <span className="font-semibold text-blue-600">electrifying</span>—I knew instantly this was my calling.
            </>
        ),
        color: "blue"
    },
    {
        title: "The Evolution",
        year: "Growth",
        content: (
            <>
                I dove headfirst into the fundamentals: <span className="font-semibold text-gray-900">HTML, CSS, and JS</span>.
                Soon, I discovered React, and the ability to build <span className="font-semibold text-cyan-600">dynamic, interactive experiences</span> hooked me completely. Every project became a stepping stone.
            </>
        ),
        color: "cyan"
    },
    {
        title: "The Climb",
        year: "Resilience",
        content: (
            <>
                The journey wasn't easy. With <span className="font-semibold text-gray-900">no tech background in the family</span>, I had to be my own teacher.
                Underconfidence struck often, but <span className="font-semibold text-teal-600">every bug fixed was a victory</span>, building the resilience that defines me today.
            </>
        ),
        color: "teal"
    },
    {
        title: "The Vision",
        year: "Future",
        content: (
            <>
                Today, I'm driven by a singular goal: to become a <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${accentGradients.blueCyanTeal}`}>Software Architect</span>.
                I want to design scalable systems that don't just function, but feel like magic to the user.
            </>
        ),
        color: "indigo"
    }
];

export default function OriginSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="origin" ref={containerRef} className={`relative w-full min-h-screen flex flex-col items-center overflow-hidden ${sectionGradients.origin} py-32`}>
            {/* Floating Blobs */}
            <FloatingBlobs colors={blobColors.origin} />

            {/* Header */}
            <div className="relative z-10 w-full px-6 mb-24">
                <SectionHeader
                    title="Origin Story"
                    subtitle="From a spark of curiosity to a burning passion for architecture."
                    gradient={accentGradients.blueTeal}
                />
            </div>

            {/* Timeline Container */}
            <div className="relative z-10 max-w-5xl w-full mx-auto px-4 md:px-0">
                {/* Vertical Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] h-full bg-gray-200/50 -translate-x-1/2 rounded-full overflow-hidden">
                    <motion.div
                        style={{ scaleY, transformOrigin: "top" }}
                        className="w-full h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500"
                    />
                </div>

                {/* Chapters */}
                <div className="space-y-24 md:space-y-32">
                    {journeyChapters.map((chapter, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`relative flex flex-col md:flex-row items-center md:justify-between ${isEven ? '' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline Node */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-blue-500 z-20 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]" />

                                {/* Content Card */}
                                <div className={`w-full md:w-[45%] ml-16 md:ml-0 p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className={`inline-block px-3 py-1 rounded-full bg-${chapter.color}-100 text-${chapter.color}-700 text-xs font-bold uppercase tracking-wider mb-4`}>
                                        {chapter.year}
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-4 font-display">{chapter.title}</h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {chapter.content}
                                    </p>
                                </div>

                                {/* Spacer for the other side */}
                                <div className="hidden md:block w-[45%]" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Wave Divider */}
            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}
