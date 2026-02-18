'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { blobColors, sectionGradients, accentGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';

export default function OriginSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section id="origin" ref={containerRef} className={`relative w-full min-h-screen ${sectionGradients.origin} py-32 overflow-hidden`}>
            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03]">
                <span className="text-[20vw] font-black tracking-tighter text-white uppercase">Journey</span>
            </div>

            {/* Floating Blobs */}
            <FloatingBlobs colors={blobColors.origin} variant="section" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Left Column: Sticky Header & Progress */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <div className="lg:sticky lg:top-32 space-y-8">
                            <SectionHeader
                                title="Origin Story"
                                subtitle="From Hello World to System Architect."
                                gradient={accentGradients.blueTeal}
                                alignment="left"
                            />

                            <p className="text-gray-600 text-lg leading-relaxed hidden lg:block">
                                Every developer has a story. Mine is built on a foundation of curiosity, resilience, and an obsession with how things work.
                            </p>

                            {/* Large Decorative Year Display */}
                            <div className="hidden lg:block relative items-center justify-center">
                                <motion.div
                                    style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }}
                                    className="w-32 h-32 rounded-full border-2 border-dashed border-blue-200 flex items-center justify-center opacity-50"
                                >
                                    <div className="w-24 h-24 rounded-full bg-blue-50/50 backdrop-blur-sm" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Scrolling Feed with Connected Timeline */}
                    <div className="lg:w-2/3 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent hidden sm:block" />

                        <div className="space-y-12">
                            {journeyChapters.map((chapter, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative pl-0 sm:pl-24"
                                >
                                    {/* Timeline Node & Connector */}
                                    <div className="absolute left-[30px] top-12 -translate-x-1/2 hidden sm:flex flex-col items-center h-full">
                                        <div className={`w-4 h-4 rounded-full bg-${chapter.color}-500 border-4 border-white shadow-[0_0_0_4px_rgba(59,130,246,0.1)] z-10`} />
                                    </div>

                                    {/* Content Card */}
                                    <div className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        {/* Featured decorative blur */}
                                        <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${chapter.color}-400/10 rounded-full blur-3xl group-hover:bg-${chapter.color}-400/20 transition-colors duration-500`} />

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow-sm text-2xl border border-gray-100`}>
                                                    {chapter.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-900 font-display">{chapter.title}</h3>
                                                    <p className={`text-sm font-semibold text-${chapter.color}-600 uppercase tracking-wider`}>{chapter.year}</p>
                                                </div>
                                            </div>

                                            <div className="text-gray-600 leading-relaxed text-lg mb-6">
                                                {chapter.content}
                                            </div>

                                            {/* Tech Stack Pills */}
                                            <div className="flex flex-wrap gap-2">
                                                {chapter.tech?.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white/80 border border-gray-200 rounded-lg shadow-sm"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}

// Updated Data Structure with Icons and Tech
const journeyChapters = [
    {
        title: "The Spark",
        year: "The Beginning",
        icon: "⚡",
        content: (
            <>
                After high school, I stood at a crossroads with <span className="font-semibold text-gray-900">no clear path</span>.
                Then, a single YouTube video about web development changed everything. Building my first static page was <span className="font-semibold text-blue-600">electrifying</span>—I knew instantly this was my calling.
            </>
        ),
        tech: ["HTML5", "CSS3", "Curiosity"],
        color: "blue"
    },
    {
        title: "The Evolution",
        year: "Growth",
        icon: "🚀",
        content: (
            <>
                I dove headfirst into the fundamentals: <span className="font-semibold text-gray-900">Javascript</span>.
                Soon, I discovered React, and the ability to build <span className="font-semibold text-cyan-600">dynamic, interactive experiences</span> hooked me completely. Every project became a stepping stone.
            </>
        ),
        tech: ["JavaScript", "React", "Tailwind"],
        color: "cyan"
    },
    {
        title: "The Climb",
        year: "Resilience",
        icon: "🏔️",
        content: (
            <>
                The journey wasn't easy. With <span className="font-semibold text-gray-900">no tech background</span>, I had to be my own teacher.
                Underconfidence struck often, but <span className="font-semibold text-teal-600">every bug fixed was a victory</span>, building the resilience that defines me today.
            </>
        ),
        tech: ["Debugging", "Self-Taught", "Grit"],
        color: "teal"
    },
    {
        title: "The Vision",
        year: "Future",
        icon: "🔭",
        content: (
            <>
                Today, I'm driven by a singular goal: to become a <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${accentGradients.blueCyanTeal}`}>Software Architect</span>.
                I want to design scalable systems that don't just function, but feel like magic.
            </>
        ),
        tech: ["Architecture", "Scalability", "Next.js"],
        color: "indigo"
    }
];
