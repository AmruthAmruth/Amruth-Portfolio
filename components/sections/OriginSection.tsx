'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import { blobColors, sectionGradients } from '@/constants/theme';
import SectionDivider from '@/components/shared/SectionDivider';

export default function OriginSection() {
    const containerRef = useRef(null);

    return (
        <section
            id="origin"
            ref={containerRef}
            className={`relative w-full min-h-[85vh] ${sectionGradients.origin || 'bg-gradient-to-br from-white via-blue-50 to-indigo-50/30'} py-16 sm:py-20 overflow-hidden`}
        >
            <FloatingBlobs colors={blobColors.origin || ['bg-blue-200/40', 'bg-indigo-200/40']} variant="section" />
            
            {/* ── Background Grid ── */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />

            {/* ── Decorative background text ── */}
            <div className="absolute top-40 left-10 text-[120px] font-black text-slate-900/[0.02] select-none pointer-events-none hidden xl:block uppercase tracking-tighter">
                Architecture
            </div>
            <div className="absolute bottom-40 right-10 text-[120px] font-black text-slate-900/[0.02] select-none pointer-events-none hidden xl:block uppercase tracking-tighter">
                Systems
            </div>

            {/* ── Centered wrapper — same width as Origin / Work ── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                {/* Section header */}
                <div className="mb-12 text-center">
                    <SectionHeader
                        title="Origin"
                        subtitle="System Profile"
                        description="A quick dive into my professional mindset and engineering philosophy."
                        dataType="object"
                        gradient="from-indigo-400 to-cyan-400"
                        alignment="center"
                    />
                </div>

                {/* ── GitHub-style README window ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                >
                    {/* ── macOS Title Bar ── */}
                    <div className="relative flex items-center px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                        {/* Traffic lights */}
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:scale-110 transition-transform" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:scale-110 transition-transform" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:scale-110 transition-transform" />
                        </div>
                        {/* Centered repo title */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                            {/* Repo book icon */}
                            <svg className="w-3.5 h-3.5 text-[#8b949e]" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                            </svg>
                            <span className="text-[12.5px] font-semibold text-[#c9d1d9]">amruth</span>
                            <span className="text-[12.5px] text-[#8b949e]/40">/</span>
                            <span className="text-[12.5px] font-semibold text-[#c9d1d9]">amruth.dev</span>
                            <span className="hidden sm:inline text-[11px] font-mono text-[#6e7681] ml-1 border border-[#30363d] bg-[#0d1117] px-1.5 py-0.5 rounded">
                                README.md
                            </span>
                        </div>
                        <div className="ml-auto w-14" />
                    </div>

                    {/* ── Repo sub-header: file path + public badge ── */}
                    <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#161b22] border-b border-[#30363d]">
                        <div className="flex items-center gap-2 text-[13px] text-[#8b949e]">
                            {/* File icon */}
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 1.75C2 .784 2.784 0 3.75 0h6.586a.25.25 0 01.177.073l2.664 2.664a.25.25 0 01.073.177V14.25A1.75 1.75 0 0111.5 16h-7.75A1.75 1.75 0 012 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h7.75a.25.25 0 00.25-.25V4.671a.25.25 0 00-.073-.177l-2.06-2.06a.25.25 0 00-.177-.073H3.75z" />
                            </svg>
                            <span className="font-mono font-semibold text-[#c9d1d9]">README.md</span>
                            <span className="text-[#8b949e]/50">·</span>
                            <span>Last updated</span>
                            <span className="font-semibold text-[#c9d1d9]">2025</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-[11.5px] font-semibold text-[#3fb950] border border-[#2ea043]/40 bg-[#2ea043]/10 rounded-full px-2.5 py-0.5">
                                Public
                            </span>
                            <span className="hidden md:inline text-[11.5px] font-semibold text-[#58a6ff] border border-[#388bfd]/40 bg-[#1f6feb]/10 rounded-full px-2.5 py-0.5">
                                Open to Hire
                            </span>
                        </div>
                    </div>

                    {/* ── Preview / Code / Blame tabs ── */}
                    <div className="flex items-center gap-0 px-4 sm:px-6 py-0 bg-[#0d1117] border-b border-[#30363d] overflow-x-auto">
                        <button className="px-4 py-2.5 text-[12.5px] font-semibold text-[#e6edf3] border-b-2 border-[#f78166] whitespace-nowrap">
                            Preview
                        </button>
                        <button className="px-4 py-2.5 text-[12.5px] font-semibold text-[#8b949e] hover:text-[#c9d1d9] transition-colors whitespace-nowrap">
                            Code
                        </button>
                        <button className="px-4 py-2.5 text-[12.5px] font-semibold text-[#8b949e] hover:text-[#c9d1d9] transition-colors whitespace-nowrap">
                            Blame
                        </button>
                    </div>

                    {/* ── Rendered Markdown Content ── */}
                    <div className="px-5 sm:px-10 lg:px-16 py-8 sm:py-10 bg-[#0d1117] font-sans text-[#c9d1d9] leading-relaxed">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="max-w-3xl mx-auto space-y-8"
                        >
                            {/* ── H1 + Badges ── */}
                            <div className="space-y-4 pb-6 border-b border-[#21262d]">
                                <h1 className="text-[28px] sm:text-[34px] font-extrabold tracking-tight text-[#e6edf3] leading-tight">
                                    Hi, I&apos;m Amruth 👋
                                </h1>
                                <div className="flex flex-wrap gap-2">
                                    <Badge color="blue">Software Engineer</Badge>
                                    <Badge color="gray">Full-Stack (MERN)</Badge>
                                    <Badge color="green">Open to Opportunities</Badge>
                                </div>
                            </div>

                            {/* ── About Me ── */}
                            <Section title="About Me">
                                <p className="text-[14.5px] sm:text-[15px] text-[#8b949e] leading-relaxed">
                                    I'm a <strong className="text-[#e6edf3] font-semibold">self-taught Full Stack Developer</strong> passionate about building reliable and scalable web applications. While I enjoy working across the entire stack, my primary focus is on <strong className="text-[#e6edf3] font-semibold">backend development</strong>—designing clean APIs, structuring robust databases, and applying clean architecture.
                                </p>
                            </Section>

                            {/* ── Current Focus ── */}
                            <Section title="Current Focus">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { icon: '⚙️', text: 'Building scalable backend APIs' },
                                        { icon: '🎨', text: 'Crafting intuitive React UIs' },
                                        { icon: '📐', text: 'Applying clean architecture' },
                                        { icon: '🚀', text: 'Optimizing app performance' },
                                    ].map(({ icon, text }) => (
                                        <li key={text} className="flex items-center gap-3 text-[14.5px] text-[#8b949e]">
                                            <span className="shrink-0 text-base">{icon}</span>
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Section>

                            {/* ── Quick Stats row ── */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[#21262d] pt-6">
                                {[
                                    { label: 'Experience', value: 'Self-taught', note: '1.5+ yrs building projects' },
                                    { label: 'Stack', value: 'MERN', note: 'React · Node.js · MongoDB' },
                                    { label: 'Focus', value: 'Backend', note: 'APIs · Database · Arch' },
                                ].map(({ label, value, note }) => (
                                    <div key={label} className="bg-[#161b22] border border-[#21262d] rounded-lg px-3.5 py-3 space-y-0.5">
                                        <p className="text-[10px] sm:text-[11px] font-mono text-[#8b949e] uppercase tracking-wider">{label}</p>
                                        <p className="text-[14px] sm:text-[15px] font-bold text-[#e6edf3]">{value}</p>
                                        <p className="text-[11px] text-[#6e7681] mt-0.5 truncate">{note}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Status Bar ── */}
                    <div className="flex items-center justify-between px-4 sm:px-6 py-2 bg-[#161b22] border-t border-[#30363d] text-[11.5px] font-mono text-[#8b949e]">
                        <span>amruth.dev / README.md</span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                            actively maintained
                        </span>
                    </div>
                </motion.div>
            </div>

            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}

/* ── Shared sub-components ─────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h2 className="text-[22px] font-bold text-[#e6edf3] border-b border-[#21262d] pb-2 flex items-center gap-2">
                {title}
            </h2>
            {children}
        </div>
    );
}

function Badge({ children, color }: { children: React.ReactNode; color: 'blue' | 'gray' | 'green' }) {
    const styles = {
        blue: 'bg-[#1f6feb]/10 text-[#58a6ff] border-[#388bfd]/40',
        gray: 'bg-[#8b949e]/10 text-[#8b949e] border-[#8b949e]/40',
        green: 'bg-[#2ea043]/10 text-[#3fb950] border-[#2ea043]/40',
    };
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-[12px] font-semibold ${styles[color]}`}>
            {children}
        </span>
    );
}
