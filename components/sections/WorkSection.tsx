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
import { 
    GitBranch, Check, X, Bell, ExternalLink, Github, ChevronDown, 
    Search, Layout, Files, Play, Boxes, UserCircle, Settings, 
    AlertTriangle, Radio, ChevronRight 
} from 'lucide-react';

export default function WorkSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (projects.length > 0) setSelectedProject(projects[0]);
    }, []);

    // Auto-switch projects every 5 seconds unless hovered
    useEffect(() => {
        if (isHovered || projects.length === 0) return;

        const interval = setInterval(() => {
            setSelectedProject(current => {
                const currentIndex = projects.findIndex(p => p.title === current.title);
                const nextIndex = (currentIndex + 1) % projects.length;
                return projects[nextIndex];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <section id="builds" className={`relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden ${sectionGradients.work} py-12 md:py-16`}>
            <FloatingBlobs colors={blobColors.work || ['bg-cyan-200/10', 'bg-blue-200/10']} />

            {/* ── Decorative side code ── */}
            <div className="absolute top-20 right-10 text-xs font-mono text-slate-400/10 select-none pointer-events-none hidden xl:block leading-relaxed">
                {`{
  "project": "distributed-systems",
  "status": "scaling",
  "load": "99.9%",
  "latency": "12ms"
}`}
            </div>
            <div className="absolute bottom-20 left-10 text-xs font-mono text-slate-400/10 select-none pointer-events-none hidden xl:block leading-relaxed">
                {`class Architecture {
  constructor() {
    this.scalable = true;
    this.robust = true;
  }
}`}
            </div>

            <div ref={sectionRef} className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <SectionHeader
                        title="Executables"
                        subtitle="chmod +x builds"
                        description="A directory of high-performance modules and architectural solutions built with precision."
                        dataType="object"
                        gradient={accentGradients.blueTeal}
                        className="mb-8 md:mb-12"
                    />

                    {/* ── INTERACTION HINT (for non-tech users) ── */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        className="hidden md:flex items-center justify-center gap-2 mb-6 text-slate-400/60 text-xs italic font-sans"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-pulse" />
                        <span>Tip: Use the sidebar on the left to browse projects, just like a real code editor.</span>
                    </motion.div>

                    {/* ── DESKTOP IDE WINDOW (md and above) ── */}
                    <div
                        className="hidden md:flex flex-col h-[72vh] min-h-[550px] max-h-[850px] w-full max-w-7xl mx-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden border border-[#333] bg-[#1e1e1e]"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >

                        {/* Title Bar (Official VS Code Color) */}
                        <div className="h-9 bg-[#323233] flex items-center justify-between px-3 relative select-none shrink-0 border-b border-[#2b2b2b]">
                            <div className="flex items-center gap-4">
                                <div className="flex gap-2 ml-1">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-inner" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner" />
                                </div>
                                <div className="hidden lg:flex items-center gap-3 ml-2 text-[#969696] text-[11px] font-sans">
                                    {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map(item => (
                                        <span key={item} className="hover:bg-[#454545] hover:text-white px-2 py-1 rounded transition-colors cursor-default">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Centered Search Bar (Modern VS Code Look) */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-1/3 max-w-[400px]">
                                <div className="h-6 bg-[#3c3c3c] border border-[#444] rounded-md flex items-center px-4 gap-2 text-[#969696] text-[11px] cursor-text hover:bg-[#454545] transition-colors">
                                    <Search className="w-3 h-3" />
                                    <span>Amruth-Portfolio</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-[#969696] mr-2">
                                <Layout className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                                <X className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>

                        <div className="flex flex-1 overflow-hidden">
                            {/* Activity Bar (VS Code Left Sidebar) */}
                            <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-2 border-r border-[#2b2b2b] shrink-0">
                                <div className="relative group w-full flex justify-center py-3 text-white border-l-[2px] border-white transition-all">
                                    <Files className="w-[26px] h-[26px] opacity-100" />
                                    <span className="absolute left-14 bg-[#252526] text-white text-[11px] px-2 py-1 rounded border border-[#454545] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Explorer</span>
                                </div>
                                {[
                                    { icon: Search, label: 'Search' },
                                    { icon: GitBranch, label: 'Source Control' },
                                    { icon: Play, label: 'Run and Debug' },
                                    { icon: Boxes, label: 'Extensions' }
                                ].map((item, idx) => (
                                    <div key={idx} className="relative group w-full flex justify-center py-3 text-[#858585] hover:text-white cursor-pointer transition-all">
                                        <item.icon className="w-[26px] h-[26px]" />
                                        <span className="absolute left-14 bg-[#252526] text-white text-[11px] px-2 py-1 rounded border border-[#454545] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">{item.label}</span>
                                    </div>
                                ))}
                                
                                <div className="mt-auto flex flex-col gap-1 pb-2 w-full">
                                    <div className="relative group w-full flex justify-center py-3 text-[#858585] hover:text-white cursor-pointer transition-colors">
                                        <UserCircle className="w-[26px] h-[26px]" />
                                        <span className="absolute left-14 bottom-10 bg-[#252526] text-white text-[11px] px-2 py-1 rounded border border-[#454545] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Accounts</span>
                                    </div>
                                    <div className="relative group w-full flex justify-center py-3 text-[#858585] hover:text-white cursor-pointer transition-colors">
                                        <Settings className="w-[26px] h-[26px]" />
                                        <span className="absolute left-14 bottom-2 bg-[#252526] text-white text-[11px] px-2 py-1 rounded border border-[#454545] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">Settings</span>
                                    </div>
                                </div>
                            </div>

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
                                <div className="flex bg-[#252526] h-9 overflow-x-auto no-scrollbar scrollbar-hide shrink-0 border-b border-[#1e1e1e]">
                                    {projects.map(p => {
                                        const isActive = selectedProject.title === p.title;
                                        return (
                                            <div
                                                key={p.title}
                                                onClick={() => setSelectedProject(p)}
                                                className={`
                                                    flex items-center gap-2 px-3 min-w-[140px] max-w-[220px] cursor-pointer border-r border-[#1e1e1e] group shrink-0 transition-colors relative
                                                    ${isActive ? 'bg-[#1e1e1e] text-white border-t border-t-blue-500' : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2d2e]'}
                                                `}
                                            >
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    <span className="text-blue-400 text-[10px] shrink-0 font-bold">M↓</span>
                                                    <span className="text-[13px] truncate">{p.title}.md</span>
                                                </div>

                                                {/* Progress Bar for Active Tab */}
                                                {isActive && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500/20">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: isHovered ? '0%' : '100%' }}
                                                            key={p.title + (isHovered ? '-paused' : '-running')}
                                                            transition={{ duration: isHovered ? 0 : 5, ease: 'linear' }}
                                                            className="absolute inset-y-0 left-0 bg-blue-500"
                                                        />
                                                    </div>
                                                )}

                                                <X className={`ml-auto w-3 h-3 text-gray-400 hover:text-white rounded-md p-0.5 hover:bg-[#454545] transition-all ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Breadcrumbs */}
                                <div className="h-[22px] flex items-center px-4 bg-[#1e1e1e] text-[#a9a9a9] text-[11px] font-sans shrink-0">
                                    <span className="hover:text-[#cccccc] cursor-pointer transition-colors">src</span>
                                    <ChevronRight className="mx-0.5 w-3 h-3 text-[#6e6e6e]" />
                                    <span className="hover:text-[#cccccc] cursor-pointer transition-colors">components</span>
                                    <ChevronRight className="mx-0.5 w-3 h-3 text-[#6e6e6e]" />
                                    <span className="hover:text-[#cccccc] cursor-pointer transition-colors">projects</span>
                                    <ChevronRight className="mx-0.5 w-3 h-3 text-[#6e6e6e]" />
                                    <div className="flex items-center gap-1">
                                        <span className="text-blue-400 text-[10px] font-bold">M↓</span>
                                        <span className="text-white font-medium">{selectedProject.title}.md</span>
                                    </div>
                                </div>

                                {/* Editor Content */}
                                <div className="flex-1 overflow-hidden relative">
                                    <JsonViewer project={selectedProject} />
                                </div>
                            </div>
                        </div>

                        {/* Status Bar (Official VS Code Blue) */}
                        <div className="h-[22px] bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] font-sans select-none z-30 shrink-0">
                            <div className="flex items-center gap-3 h-full">
                                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1.5 h-full cursor-pointer transition-colors">
                                    <GitBranch className="w-3.5 h-3.5" />
                                    <span>main*</span>
                                </div>
                                <div className="flex items-center gap-2 hover:bg-[#1f8ad2] px-1.5 h-full cursor-pointer transition-colors">
                                    <div className="flex items-center gap-1">
                                        <X className="w-3 h-3 text-white" /> <span>0</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3 text-white" /> <span>0</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1.5 h-full cursor-pointer transition-colors">
                                    <Radio className="w-3 h-3" />
                                    <span>Go Live</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 h-full">
                                <div className="hidden sm:flex items-center gap-3 h-full">
                                    <span className="hover:bg-[#1f8ad2] px-1.5 h-full flex items-center cursor-pointer">Ln 12, Col 42</span>
                                    <span className="hover:bg-[#1f8ad2] px-1.5 h-full flex items-center cursor-pointer">Spaces: 2</span>
                                    <span className="hover:bg-[#1f8ad2] px-1.5 h-full flex items-center cursor-pointer uppercase">UTF-8</span>
                                    <span className="hover:bg-[#1f8ad2] px-1.5 h-full flex items-center cursor-pointer">LF</span>
                                </div>
                                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1.5 h-full cursor-pointer">
                                    <span className="text-blue-300 font-bold">M↓</span>
                                    <span>Markdown</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-1 hover:bg-[#1f8ad2] px-1.5 h-full cursor-pointer">
                                    <Check className="w-3 h-3" />
                                    <span>Prettier</span>
                                </div>
                                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1.5 h-full cursor-pointer">
                                    <Bell className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── MOBILE PROJECT CARDS (below md) ── */}
                    <div
                        className="md:hidden space-y-4"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onTouchStart={() => setIsHovered(true)}
                        onTouchEnd={() => setIsHovered(false)}
                    >
                        {/* Mobile Selector Tabs */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                            {projects.map(p => (
                                <button
                                    key={p.title}
                                    onClick={() => setSelectedProject(p)}
                                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border relative overflow-hidden ${selectedProject.title === p.title
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                                        : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <span className="relative z-10">{p.title}</span>

                                    {/* Progress Bar for Active Mobile Tab */}
                                    {selectedProject.title === p.title && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: isHovered ? '0%' : '100%' }}
                                            key={p.title + (isHovered ? '-paused' : '-running')}
                                            transition={{ duration: isHovered ? 0 : 5, ease: 'linear' }}
                                            className="absolute bottom-0 left-0 h-[3px] bg-white/40"
                                        />
                                    )}
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
        </section>
    );
}
