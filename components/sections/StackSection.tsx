'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { skills, categories } from '@/constants/skills';
import { accentGradients } from '@/constants/theme';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';
import { Terminal, Database, Globe, Layers, Shield, Wrench, Cloud, Cpu, ChevronDown, ChevronRight, Send, Clock } from 'lucide-react';

// Category metadata
const categoryMeta: Record<string, { icon: any; accent: string; endpoint: string; description: string }> = {
    'Languages': { icon: Terminal, accent: '#f0c04a', endpoint: '/skills/languages', description: 'Core programming languages I write in daily' },
    'Frontend': { icon: Globe, accent: '#61dafb', endpoint: '/skills/frontend', description: 'UI frameworks, libraries & styling tools' },
    'Backend': { icon: Cpu, accent: '#68d391', endpoint: '/skills/backend', description: 'Server-side runtimes, frameworks & architecture patterns' },
    'Databases': { icon: Database, accent: '#4299e1', endpoint: '/skills/databases', description: 'Database systems I design and query' },
    'Real-time': { icon: Layers, accent: '#9f7aea', endpoint: '/skills/realtime', description: 'Tech for live data, sockets & event-driven systems' },
    'Security': { icon: Shield, accent: '#fc8181', endpoint: '/skills/security', description: 'Auth, access control & data protection practices' },
    'DevOps & Cloud': { icon: Cloud, accent: '#f6ad55', endpoint: '/skills/devops', description: 'Cloud platforms, deployment pipelines & infra tools' },
    'Tools': { icon: Wrench, accent: '#76e4f7', endpoint: '/skills/tools', description: 'Workflow tools, project management & productivity' },
};

export default function StackSection() {
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
    const [openSections, setOpenSections] = useState<Set<string>>(new Set(['My Skills']));
    const [sentAt, setSentAt] = useState<string>('');
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setSentAt(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, []);

    // Auto-switch categories every 5 seconds unless hovered
    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setActiveCategory(current => {
                const currentIndex = categories.indexOf(current);
                const nextIndex = (currentIndex + 1) % categories.length;
                return categories[nextIndex];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [activeCategory, isHovered]);

    const meta = categoryMeta[activeCategory] ?? { icon: Layers, accent: '#a0aec0', endpoint: '/skills', description: '' };
    const ActiveIcon = meta.icon;
    const activeSkills = skills.filter(s => s.category === activeCategory);

    const toggleSection = (name: string) => {
        setOpenSections(prev => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name); else next.add(name);
            return next;
        });
    };

    return (
        <section id="toolkit" className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-white py-12 md:py-16">

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col">
                <SectionHeader
                    title="Environment"
                    subtitle="package.json"
                    description="The modern runtime dependencies and dev-tools I leverage to compile vision into production-ready reality."
                    dataType="interface"
                    gradient={accentGradients.blueCyan}
                    className="mb-10"
                />

                {/* ── Postman Window ── */}
                <div
                    className="w-full rounded-xl overflow-hidden border border-[#2d2d2d] shadow-2xl flex flex-col bg-[#242424]"
                    style={{ minHeight: '500px', maxHeight: '750px' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >

                    {/* ── Titlebar ── */}
                    <div className="h-9 bg-[#1a1a1a] flex items-center px-4 gap-3 shrink-0 border-b border-[#333]">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <span className="text-[#888] text-[11px] font-medium tracking-wide">Postman — amruth.dev API</span>
                        </div>
                    </div>

                    {/* ── Top Nav Bar (Postman-style tabs) ── */}
                    <div className="h-8 bg-[#1f1f1f] flex items-center px-4 gap-6 text-[11px] text-[#888] border-b border-[#333] shrink-0 font-medium select-none">
                        {['Collections', 'Environments', 'History'].map((tab, i) => (
                            <span key={tab} className={i === 0 ? 'text-[#e8692c] border-b-2 border-[#e8692c] pb-0.5' : 'hover:text-[#ccc] cursor-pointer'}>
                                {tab}
                            </span>
                        ))}
                    </div>

                    {/* ── Main Body ── */}
                    <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

                        {/* ── Left Sidebar (Desktop) ── */}
                        <div className="hidden md:flex w-[220px] shrink-0 bg-[#1f1f1f] border-r border-[#333] flex-col overflow-y-auto">

                            {/* Search bar */}
                            <div className="px-3 py-2.5 border-b border-[#2d2d2d]">
                                <div className="bg-[#2a2a2a] rounded px-2.5 py-1.5 text-[11px] text-[#666] flex items-center gap-1.5">
                                    <span>🔍</span>
                                    <span>Search</span>
                                </div>
                            </div>

                            {/* Collection: My Skills */}
                            <div className="flex-1 py-1">
                                <button
                                    onClick={() => toggleSection('My Skills')}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#e8692c] font-bold hover:bg-[#2a2a2a] transition-colors"
                                >
                                    {openSections.has('My Skills')
                                        ? <ChevronDown className="w-3 h-3 shrink-0" />
                                        : <ChevronRight className="w-3 h-3 shrink-0" />}
                                    <span>📁</span>
                                    <span className="truncate">My Skills</span>
                                </button>

                                {openSections.has('My Skills') && (
                                    <div className="pl-2">
                                        {categories.map((cat) => {
                                            const m = categoryMeta[cat] ?? { icon: Layers, accent: '#a0aec0', endpoint: '/skills', description: '' };
                                            const CatIcon = m.icon;
                                            const isActive = activeCategory === cat;
                                            const count = skills.filter(s => s.category === cat).length;

                                            return (
                                                <button
                                                    key={cat}
                                                    onClick={() => setActiveCategory(cat)}
                                                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] rounded transition-all ${isActive
                                                        ? 'bg-[#2d2d2d] text-white'
                                                        : 'text-[#888] hover:bg-[#262626] hover:text-[#ccc]'
                                                        }`}
                                                >
                                                    <span className="text-[10px] font-bold px-1 py-0.5 rounded bg-[#e8692c]/20 text-[#e8692c] shrink-0">GET</span>
                                                    <CatIcon className="w-3 h-3 shrink-0" style={{ color: m.accent }} />
                                                    <span className="truncate flex-1">{cat}</span>
                                                    <span className="text-[#444] text-[10px] tabular-nums shrink-0">{count}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Environment indicator */}
                            <div className="px-3 py-2.5 border-t border-[#2d2d2d]">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] text-[#666]">Production</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Mobile Categories (Horizontal Scroll) ── */}
                        <div className="flex w-full min-w-0 md:hidden overflow-x-auto border-b border-[#333] bg-[#1a1a1a] px-3 py-2.5 gap-2 shrink-0 no-scrollbar">
                            {categories.map((cat) => {
                                const m = categoryMeta[cat] ?? { icon: Layers, accent: '#a0aec0', endpoint: '/skills', description: '' };
                                const CatIcon = m.icon;
                                const isActive = activeCategory === cat;

                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap border shrink-0 ${isActive
                                            ? 'bg-[#2d2d2d] border-[#444] text-[#e8692c]'
                                            : 'bg-transparent border-transparent text-[#888] hover:bg-[#262626] hover:text-[#ccc]'
                                            }`}
                                    >
                                        <CatIcon className="w-3.5 h-3.5" style={{ color: isActive ? m.accent : '#888' }} />
                                        <span>{cat}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── Right Panel: Request + Response ── */}
                        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-[#242424]">

                            {/* Request Bar */}
                            <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-[#333] shrink-0">
                                <div className="flex items-center gap-2">
                                    {/* GET badge */}
                                    <div className="shrink-0 px-2 py-1.5 sm:px-2.5 sm:py-1.5 bg-[#2d2d2d] rounded text-[#e8692c] text-[10px] sm:text-[11px] font-bold border border-[#3d3d3d]">
                                        GET
                                    </div>

                                    {/* URL */}
                                    <div className="flex-1 flex items-center bg-[#1a1a1a] border border-[#3a3a3a] rounded px-2 sm:px-3 py-1.5 font-mono text-[10px] sm:text-[12px] overflow-x-auto whitespace-nowrap no-scrollbar">
                                        <span className="text-[#666] shrink-0">https://</span>
                                        <span className="text-[#e8692c] shrink-0">amruth.dev</span>
                                        <span className="text-[#ccc] shrink-0">{meta.endpoint}</span>
                                    </div>

                                    {/* Send button */}
                                    <button className="shrink-0 flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-1.5 bg-[#e8692c] hover:bg-[#d4601e] text-white rounded text-[11px] sm:text-[12px] font-semibold transition-colors">
                                        <Send className="w-3 h-3" />
                                        <span className="hidden sm:inline">Send</span>
                                    </button>
                                </div>
                            </div>

                            {/* Tabs (Params / Headers / Body) */}
                            <div className="px-4 py-0 border-b border-[#333] flex gap-4 text-[11px] text-[#666] font-medium shrink-0">
                                {['Params', 'Headers', 'Body', 'Pre-req'].map((tab, i) => (
                                    <span key={tab} className={`py-2 cursor-pointer transition-colors ${i === 2 ? 'text-[#e8692c] border-b-2 border-[#e8692c] -mb-px' : 'hover:text-[#aaa]'}`}>
                                        {tab}
                                    </span>
                                ))}
                            </div>

                            {/* Response Area */}
                            <div className="flex-1 flex flex-col overflow-hidden">
                                {/* Response Status Bar */}
                                <div className="px-3 sm:px-4 py-2 border-b border-[#2d2d2d] flex items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] shrink-0 overflow-x-auto whitespace-nowrap no-scrollbar">
                                    <span className="flex items-center gap-1.5 shrink-0">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-green-400 font-bold">200 OK</span>
                                    </span>
                                    <span className="text-[#555] shrink-0">·</span>
                                    <span className="text-[#666] flex items-center gap-1 shrink-0">
                                        <Clock className="w-3 h-3" />{' '}
                                        <span className="tabular-nums">12ms</span>
                                    </span>
                                    <span className="text-[#555] shrink-0">·</span>
                                    <span className="text-[#666] shrink-0">{activeSkills.length} items</span>
                                    <span className="ml-auto text-[#555] pl-4 shrink-0">Body · {sentAt || '--:--:--'}</span>
                                </div>

                                {/* Response Tabs */}
                                <div className="px-4 flex gap-3 text-[11px] text-[#666] border-b border-[#2d2d2d] shrink-0">
                                    {['Pretty', 'Raw', 'Preview'].map((t, i) => (
                                        <span key={t} className={`py-1.5 ${i === 0 ? 'text-[#ccc] border-b border-[#ccc] -mb-px' : 'hover:text-[#aaa] cursor-pointer'}`}>{t}</span>
                                    ))}
                                    <span className="ml-auto py-1.5 text-[#666]">JSON</span>
                                </div>

                                {/* JSON Response Body */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeCategory}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex-1 overflow-auto"
                                    >
                                        {/* Line numbers + content */}
                                        <div className="flex h-full">
                                            {/* Line numbers */}
                                            <div className="shrink-0 select-none text-[11px] font-mono text-[#444] text-right px-3 pt-4 leading-[22px] hidden sm:block min-w-[36px]">
                                                {Array.from({ length: activeSkills.length + 12 }, (_, i) => (
                                                    <div key={i}>{i + 1}</div>
                                                ))}
                                            </div>

                                            {/* JSON Content */}
                                            <div className="flex-1 p-3 sm:p-5 font-mono text-[11px] sm:text-[13px] leading-[20px] sm:leading-[24px] overflow-x-auto">
                                                <span className="text-[#ffd700]">{'{'}</span>
                                                <div className="pl-5 space-y-0">
                                                    {/* category field */}
                                                    <div>
                                                        <span className="text-[#9cdcfe]">&quot;category&quot;</span>
                                                        <span className="text-gray-500">: </span>
                                                        <span className="text-[#ce9178]">&quot;{activeCategory}&quot;</span>
                                                        <span className="text-gray-600">,</span>
                                                    </div>

                                                    {/* description */}
                                                    <div>
                                                        <span className="text-[#9cdcfe]">&quot;description&quot;</span>
                                                        <span className="text-gray-500">: </span>
                                                        <span className="text-[#ce9178]">&quot;{meta.description}&quot;</span>
                                                        <span className="text-gray-600">,</span>
                                                    </div>

                                                    {/* total */}
                                                    <div>
                                                        <span className="text-[#9cdcfe]">&quot;total_skills&quot;</span>
                                                        <span className="text-gray-500">: </span>
                                                        <span className="text-[#b5cea8]">{activeSkills.length}</span>
                                                        <span className="text-gray-600">,</span>
                                                    </div>

                                                    {/* proficiency */}
                                                    <div>
                                                        <span className="text-[#9cdcfe]">&quot;proficiency&quot;</span>
                                                        <span className="text-gray-500">: </span>
                                                        <span className="text-[#ce9178]">&quot;Production-ready&quot;</span>
                                                        <span className="text-gray-600">,</span>
                                                    </div>

                                                    {/* skills array */}
                                                    <div className="mt-1">
                                                        <span className="text-[#9cdcfe]">&quot;skills&quot;</span>
                                                        <span className="text-gray-500">: </span>
                                                        <span className="text-[#ffd700]">{'['}</span>
                                                    </div>

                                                    <div className="pl-5">
                                                        {activeSkills.map((skill, i) => (
                                                            <motion.div
                                                                key={skill.name}
                                                                initial={{ opacity: 0, x: -6 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.035 }}
                                                                className="flex items-center gap-2 group"
                                                            >
                                                                {/* Accent color dot */}
                                                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-b ${skill.color} shrink-0 opacity-90 group-hover:scale-125 transition-transform`} />
                                                                <span className="text-[#ce9178]">
                                                                    &quot;{skill.name}&quot;
                                                                </span>
                                                                {i < activeSkills.length - 1 && (
                                                                    <span className="text-gray-600">,</span>
                                                                )}
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    <div>
                                                        <span className="text-[#ffd700]">{']'}</span>
                                                    </div>
                                                </div>
                                                <span className="text-[#ffd700]">{'}'}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom Status Bar (Postman-style) ── */}
                    <div className="h-6 bg-[#1a1a1a] border-t border-[#333] flex items-center justify-between px-3 sm:px-4 text-[9px] sm:text-[10px] text-[#555] font-mono shrink-0 select-none overflow-x-auto whitespace-nowrap no-scrollbar">
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Connected
                            </span>
                            <span>amruth.dev API v1</span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-4">
                            <span>{skills.length} total skills</span>
                            <span>UTF-8</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
