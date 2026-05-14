'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from '@/components/shared/SectionHeader';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import { blobColors, sectionGradients } from '@/constants/theme';
import SectionDivider from '@/components/shared/SectionDivider';
import { Book, FileText, Clock, Shield, Briefcase, Cpu, Code2, Sparkles, Layout, Database, GitBranch, Github as GithubIcon, Terminal } from 'lucide-react';

export default function OriginSection() {
    const containerRef = useRef(null);

    return (
        <section
            id="origin"
            ref={containerRef}
            className={`relative w-full min-h-[85vh] ${sectionGradients.origin || 'bg-white'} py-16 sm:py-20 overflow-hidden`}
        >
            <FloatingBlobs colors={blobColors.origin || ['bg-blue-200/20', 'bg-indigo-200/20']} variant="section" />

            {/* ── Decorative background text ── */}
            <div className="absolute top-40 left-10 text-[120px] font-black text-slate-900/[0.02] select-none pointer-events-none hidden xl:block uppercase tracking-tighter">
                Logic
            </div>
            <div className="absolute bottom-40 right-10 text-[120px] font-black text-slate-900/[0.02] select-none pointer-events-none hidden xl:block uppercase tracking-tighter">
                Abstract
            </div>

            {/* ── Centered wrapper — same width as Origin / Work ── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                {/* Section header */}
                <div className="mb-12 text-center">
                    <SectionHeader
                        title="whoami"
                        subtitle="system_profile.sh"
                        description="Booting up the engineering mindset and architectural logic behind the developer."
                        dataType="command"
                        gradient="from-indigo-400 to-cyan-400"
                        alignment="center"
                    />
                </div>

                {/* ── GitHub-style README window ── */}
                <div className="relative group">
                    {/* Ambient Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-cyan-500/20 rounded-[22px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
                    >
                        {/* ── macOS Title Bar ── */}
                        <div className="relative flex items-center px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                            {/* Traffic lights */}
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10 hover:brightness-110 transition-all" />
                                <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/10 hover:brightness-110 transition-all" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10 hover:brightness-110 transition-all" />
                            </div>
                            
                            {/* Centered repo title */}
                            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                                <Book className="w-3.5 h-3.5 text-[#8b949e]" />
                                <div className="flex items-center gap-1">
                                    <span className="text-[12.5px] font-semibold text-[#c9d1d9] hover:text-[#58a6ff] transition-colors cursor-pointer">amruth</span>
                                    <span className="text-[12.5px] text-[#8b949e]/40">/</span>
                                    <span className="text-[12.5px] font-semibold text-[#c9d1d9] hover:text-[#58a6ff] transition-colors cursor-pointer">amruth.dev</span>
                                </div>
                                <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-[#6e7681] border border-[#30363d] bg-[#0d1117] px-1.5 py-0.5 rounded leading-none">
                                    README.md
                                </span>
                            </div>
                            <div className="ml-auto flex items-center gap-3">
                                <div className="flex items-center gap-1 text-[#8b949e] hover:text-[#c9d1d9] transition-colors cursor-pointer">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span className="text-[11px] font-medium hidden xs:inline">Featured</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Repo sub-header: file path + public badge ── */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0d1117] border-b border-[#30363d]">
                            <div className="flex items-center gap-2 text-[13px] text-[#8b949e]">
                                <FileText className="w-4 h-4 shrink-0 text-[#8b949e]" />
                                <span className="font-mono font-medium text-[#c9d1d9]">README.md</span>
                                <span className="text-[#8b949e]/30">|</span>
                                <div className="flex items-center gap-1.5 group/update cursor-help">
                                    <Clock className="w-3.5 h-3.5 group-hover/update:text-[#58a6ff] transition-colors" />
                                    <span className="text-[12px]">Last updated</span>
                                    <span className="font-semibold text-[#c9d1d9]">2h ago</span>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#3fb950]/30 bg-[#3fb950]/5 group/public cursor-help transition-all hover:bg-[#3fb950]/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                                    <span className="text-[11px] font-semibold text-[#3fb950]">Live</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#58a6ff]/30 bg-[#58a6ff]/5 group/hire cursor-help transition-all hover:bg-[#58a6ff]/10">
                                    <GithubIcon className="w-3 h-3 text-[#58a6ff]" />
                                    <span className="text-[11px] font-semibold text-[#58a6ff]">Public Repository</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Tabs Container ── */}
                        <div className="flex items-center gap-1 px-4 sm:px-6 bg-[#0d1117] border-b border-[#30363d] overflow-x-auto no-scrollbar">
                            <div className="relative">
                                <button className="px-4 py-3 text-[13px] font-semibold text-[#e6edf3] whitespace-nowrap flex items-center gap-2">
                                    <Layout className="w-3.5 h-3.5" />
                                    Preview
                                </button>
                                <motion.div 
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f78166] rounded-t-full"
                                />
                            </div>
                            <button className="px-4 py-3 text-[13px] font-medium text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22] transition-all whitespace-nowrap flex items-center gap-2 rounded-t-md">
                                <Terminal className="w-3.5 h-3.5" />
                                Code
                            </button>
                            <button className="px-4 py-3 text-[13px] font-medium text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22] transition-all whitespace-nowrap flex items-center gap-2 rounded-t-md">
                                <GitBranch className="w-3.5 h-3.5" />
                                Blame
                            </button>
                        </div>

                    {/* ── Rendered Markdown Content ── */}
                    <div className="px-4 sm:px-10 lg:px-16 py-8 sm:py-12 bg-[#0d1117] font-sans text-[#c9d1d9] leading-relaxed">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="max-w-4xl mx-auto space-y-8 sm:space-y-12"
                        >
                            {/* ── H1 + Badges ── */}
                            <div className="space-y-6 pb-8 border-b border-[#21262d]">
                                <div className="space-y-2">
                                    <h1 className="text-[32px] sm:text-[42px] font-extrabold tracking-tight text-[#e6edf3] leading-tight flex items-center flex-wrap gap-x-4">
                                        Hi, I&apos;m Amruth
                                        <motion.span 
                                            animate={{ rotate: [0, 20, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                            className="origin-bottom-right inline-block"
                                        >
                                            👋
                                        </motion.span>
                                        <motion.span
                                            animate={{ opacity: [1, 1, 0, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
                                            className="inline-block w-[3px] h-[32px] sm:h-[42px] bg-[#58a6ff] ml-1"
                                        />
                                    </h1>
                                    <p className="text-[16px] text-[#8b949e] font-medium max-w-xl">
                                        Software Engineer focused on building systems that stay reliable, maintainable, and easy to grow over time.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    <Badge icon={<Shield className="w-3 h-3" />} color="blue">Backend Systems</Badge>
                                    <Badge icon={<Cpu className="w-3 h-3" />} color="gray">MERN Stack</Badge>
                                    <Badge icon={<Sparkles className="w-3 h-3" />} color="green">Open to Roles</Badge>
                                </div>
                            </div>

                            {/* ── About Me ── */}
                            <Section title="Philosophy">
                                <p className="text-[15px] sm:text-[16px] text-[#8b949e] leading-relaxed">
                                    I believe engineering is about more than just solving immediate problems—it&apos;s about <strong className="text-[#e6edf3] font-semibold">architecting for the long-term</strong>. I value clarity, intentionality, and systems that are as simple as possible but no simpler.
                                </p>
                                <p className="text-[15px] sm:text-[16px] text-[#8b949e] leading-relaxed">
                                    My approach is rooted in <strong className="text-[#e6edf3] font-semibold">clean architecture</strong> and type-safe systems, ensuring that every piece of code contributes to a stable and scalable ecosystem.
                                </p>
                            </Section>

                            {/* ── Focus Areas ── */}
                            <Section title="Engineering Focus">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                    {[
                                        { icon: <Database className="w-4 h-4" />, text: 'Resilient Backend Systems', detail: 'Distributed architecture & APIs' },
                                        { icon: <Layout className="w-4 h-4" />, text: 'Modular UI Architecture', detail: 'Type-safe & reusable components' },
                                        { icon: <Shield className="w-4 h-4" />, text: 'System Security & Auth', detail: 'Encryption & access control' },
                                        { icon: <Sparkles className="w-4 h-4" />, text: 'Performance Engineering', detail: 'Latency & resource optimization' },
                                    ].map(({ icon, text, detail }, i) => (
                                        <motion.div 
                                            key={text} 
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i }}
                                            className="group/focus flex items-start gap-4"
                                        >
                                            <div className="mt-1 p-2 rounded-md bg-[#161b22] border border-[#30363d] group-hover/focus:border-[#58a6ff]/50 transition-colors">
                                                <span className="text-[#8b949e] group-hover/focus:text-[#58a6ff] transition-colors">{icon}</span>
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-[14.5px] font-semibold text-[#e6edf3]">{text}</p>
                                                <p className="text-[12px] text-[#8b949e]">{detail}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Section>

                            {/* ── Quick Stats row ── */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#21262d] pt-8">
                                {[
                                    { label: 'System Uptime', value: '1.5+ Years', note: 'Project consistency', icon: <Clock className="w-3 h-3" /> },
                                    { label: 'Current Version', value: 'v2.4.0-stable', note: 'Continuous evolution', icon: <GitBranch className="w-3 h-3" /> },
                                    { label: 'Environment', value: 'Full-Stack', note: 'Production ready', icon: <Briefcase className="w-3 h-3" /> },
                                ].map(({ label, value, note, icon }) => (
                                    <div key={label} className="group/stat bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-4 space-y-1.5 transition-all hover:bg-[#1c2128] hover:border-[#58a6ff]/30">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#8b949e] group-hover/stat:text-[#58a6ff] transition-colors">{icon}</span>
                                            <p className="text-[10px] font-mono text-[#8b949e] uppercase tracking-widest">{label}</p>
                                        </div>
                                        <p className="text-[16px] font-bold text-[#e6edf3] tracking-tight">{value}</p>
                                        <p className="text-[11px] text-[#6e7681] group-hover/stat:text-[#8b949e] transition-colors">{note}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Status Bar ── */}
                    <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#161b22] border-t border-[#30363d] text-[11px] font-mono text-[#8b949e]">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                                main
                            </span>
                            <span className="text-[#30363d]">/</span>
                            <span>amruth.dev</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden xs:inline">UTF-8</span>
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#3fb950] opacity-50" />
                                production
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
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

function Badge({ children, color, icon }: { children: React.ReactNode; color: 'blue' | 'gray' | 'green'; icon?: React.ReactNode }) {
    const styles = {
        blue: 'bg-[#1f6feb]/10 text-[#58a6ff] border-[#388bfd]/40',
        gray: 'bg-[#8b949e]/10 text-[#8b949e] border-[#8b949e]/40',
        green: 'bg-[#2ea043]/10 text-[#3fb950] border-[#2ea043]/40',
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-semibold transition-all hover:bg-white/5 cursor-default ${styles[color]}`}>
            {icon && <span className="opacity-80">{icon}</span>}
            {children}
        </span>
    );
}
