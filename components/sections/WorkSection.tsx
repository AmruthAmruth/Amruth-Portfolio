'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { projects } from '@/constants/projects';
import { containerVariants } from '@/constants/animations';
import { blobColors, sectionGradients, accentGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';
import FileExplorer from '@/components/shared/FileExplorer';
import JsonViewer from '@/components/shared/JsonViewer';
import { Project } from '@/types';
import { GitBranch, Check, X, Bell, ExternalLink, Github, ChevronDown } from 'lucide-react';

export default function WorkSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

    useEffect(() => {
        if (projects.length > 0) setSelectedProject(projects[0]);
    }, []);

    return (
        <section id="work" className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${sectionGradients.work} py-16 md:py-24`}>
            <FloatingBlobs colors={blobColors.work} />

            <div ref={sectionRef} className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <SectionHeader
                        title="Engineering"
                        subtitle="Built with precision, scalability, and performance in mind."
                        gradient={accentGradients.blueTeal}
                        className="mb-8 md:mb-12"
                    />

                    {/* ── DESKTOP IDE WINDOW (md and above) ── */}
                    <div className="hidden md:flex flex-col h-[800px] lg:h-[850px] w-full max-w-7xl mx-auto shadow-2xl rounded-lg overflow-hidden border border-[#333] bg-[#1e1e1e]">

                        {/* Title Bar */}
                        <div className="h-8 bg-[#3c3c3c] flex items-center justify-center relative select-none shrink-0">
                            <div className="absolute left-3 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-[#ccccc7] text-xs font-sans">Amruth&apos;s Portfolio — {selectedProject.title}</span>
                        </div>

                        <div className="flex flex-1 overflow-hidden">
                            {/* File Explorer */}
                            <div className="hidden md:flex shrink-0">
                                <FileExplorer
                                    projects={projects}
                                    selectedProject={selectedProject}
                                    onSelect={setSelectedProject}
                                />
                            </div>

                            {/* Editor Area */}
                            <div className="flex-1 bg-[#1e1e1e] relative flex flex-col min-w-0">

                                {/* Editor Tabs */}
                                <div className="flex bg-[#252526] h-9 overflow-x-auto no-scrollbar scrollbar-hide shrink-0">
                                    {projects.map(p => {
                                        const isActive = selectedProject.title === p.title;
                                        return (
                                            <div
                                                key={p.title}
                                                onClick={() => setSelectedProject(p)}
                                                className={`
                                                    flex items-center gap-2 px-3 min-w-[130px] max-w-[200px] cursor-pointer border-r border-[#1e1e1e] group shrink-0
                                                    ${isActive ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2d2e]'}
                                                `}
                                            >
                                                <span className="text-[13px] truncate">{p.title}</span>
                                                <span className={`ml-auto text-gray-400 hover:text-white rounded-md p-0.5 hover:bg-[#454545] opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}>
                                                    <X className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Breadcrumbs */}
                                <div className="h-6 flex items-center px-4 bg-[#1e1e1e] text-[#a9a9a9] text-xs font-sans border-b border-[#2b2b2b] shrink-0">
                                    <span className="text-[#6a6a6a]">Portfolio</span>
                                    <span className="mx-1 text-[#6e6e6e]">&rsaquo;</span>
                                    <span className="text-[#6a6a6a]">Projects</span>
                                    <span className="mx-1 text-[#6e6e6e]">&rsaquo;</span>
                                    <span className="text-white font-medium">{selectedProject.title}</span>
                                </div>

                                {/* Editor Content */}
                                <div className="flex-1 overflow-hidden relative">
                                    <JsonViewer project={selectedProject} />
                                </div>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] font-sans select-none z-30 shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer transition-colors">
                                    <GitBranch className="w-3.5 h-3.5" />
                                    <span>main*</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <X className="w-3 h-3 text-white/80" /> <span className="text-white/90">0</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-4">
                                    <span className="hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">Ln 12, Col 42</span>
                                    <span className="hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">Spaces: 2</span>
                                    <span className="hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">UTF-8</span>
                                </div>
                                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">
                                    <span className="text-yellow-400 font-bold">{'{ }'}</span>
                                    <span>JSON</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">
                                    <Check className="w-3 h-3" />
                                    <span>Prettier</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── MOBILE PROJECT CARDS (below md) ── */}
                    <div className="md:hidden space-y-4">
                        {/* Mobile Selector Tabs */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                            {projects.map(p => (
                                <button
                                    key={p.title}
                                    onClick={() => setSelectedProject(p)}
                                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${selectedProject.title === p.title
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                                        : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    {p.title}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Card */}
                        <motion.div
                            key={selectedProject.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className="bg-[#1e1e1e] rounded-xl border border-[#333] overflow-hidden shadow-xl"
                        >
                            {/* Card Header */}
                            <div className="px-5 pt-5 pb-4 border-b border-[#2b2b2b]">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-[10px] text-[#5a5a5a] uppercase tracking-widest mb-1">Currently viewing</p>
                                        <h3 className="text-white text-xl font-bold">{selectedProject.title}</h3>
                                        <span className={`inline-flex items-center gap-1 mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${selectedProject.status === 'Live'
                                            ? 'bg-green-900/30 text-green-400 border border-green-800'
                                            : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'
                                            }`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                            {selectedProject.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2 shrink-0">
                                        {selectedProject.liveUrl && (
                                            <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer"
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-semibold">
                                                <ExternalLink className="w-3 h-3" /> Live
                                            </a>
                                        )}
                                        {selectedProject.githubUrl && (
                                            <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer"
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#333] hover:bg-[#444] border border-[#555] text-white text-xs font-semibold">
                                                <Github className="w-3 h-3" /> Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="px-5 py-4 space-y-4 font-mono text-sm text-gray-300">
                                {/* About */}
                                <div>
                                    <p className="text-[10px] text-[#5a8a5a] uppercase tracking-widest mb-1">// About</p>
                                    <p className="text-gray-300 leading-relaxed text-xs">
                                        {selectedProject.problem} {selectedProject.outcome}
                                    </p>
                                </div>

                                {/* Features */}
                                <div>
                                    <p className="text-[10px] text-[#5a5a8a] uppercase tracking-widest mb-2">// Key Features</p>
                                    <ul className="space-y-1">
                                        {selectedProject.features.slice(0, 3).map((f, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                                                <span className="text-purple-400 mt-0.5 shrink-0">▸</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <p className="text-[10px] text-[#8a6a3a] uppercase tracking-widest mb-2">// Built With</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedProject.techStack.map(tech => (
                                            <span key={tech.name} className="px-2 py-0.5 rounded bg-[#2d2d2d] border border-[#3d3d3d] text-yellow-300 text-[11px] font-mono">
                                                {tech.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </motion.div>
            </div>

            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}
