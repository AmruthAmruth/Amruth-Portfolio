'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { projects } from '@/constants/projects';
import { containerVariants } from '@/constants/animations';
import { blobColors, sectionGradients, accentGradients } from '@/constants/theme';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';
import MacWindow from '@/components/shared/MacWindow';
import JsonViewer from '@/components/shared/JsonViewer';
import FileExplorer from '@/components/shared/FileExplorer';
import { Project } from '@/types';
import { GitBranch, Check, X, Bell } from 'lucide-react';

export default function WorkSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

    // Ensure Stratify is default active
    useEffect(() => {
        if (projects.length > 0) {
            setSelectedProject(projects[0]);
        }
    }, []);

    return (
        <section id="work" className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${sectionGradients.work} py-24 md:py-32`}>
            {/* Floating Blobs */}
            <FloatingBlobs colors={blobColors.work} />

            {/* Main Content */}
            <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Section Title */}
                    <SectionHeader
                        title="Engineering"
                        subtitle="Built with precision, scalability, and performance in mind."
                        gradient={accentGradients.blueTeal}
                        className="mb-12"
                    />

                    {/* Unified IDE Window */}
                    {/* Unified IDE Window */}
                    <div className="h-[850px] w-full max-w-[95vw] xl:max-w-[1600px] flex flex-col shadow-2xl rounded-lg overflow-hidden border border-[#333] bg-[#1e1e1e] mx-auto">

                        {/* Custom Title Bar (VS Code Style) */}
                        <div className="h-8 bg-[#3c3c3c] flex items-center justify-center relative select-none">
                            <div className="absolute left-3 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-[#ccccc7] text-xs font-sans">amruth-portfolio — {selectedProject.title.toLowerCase()}.json</span>
                        </div>


                        <div className="flex flex-1 overflow-hidden">
                            {/* Sidebar: File Explorer */}
                            <div className="hidden md:block flex-shrink-0">
                                <FileExplorer
                                    projects={projects}
                                    selectedProject={selectedProject}
                                    onSelect={setSelectedProject}
                                />
                            </div>

                            {/* Editor Area */}
                            <div className="flex-1 bg-[#1e1e1e] relative flex flex-col min-w-0">

                                {/* Editor Tabs */}
                                <div className="flex bg-[#252526] h-9 overflow-x-auto no-scrollbar scrollbar-hide">
                                    {projects.map(p => {
                                        const isActive = selectedProject.title === p.title;
                                        return (
                                            <div
                                                key={p.title}
                                                onClick={() => setSelectedProject(p)}
                                                className={`
                                                    flex items-center gap-2 px-3 min-w-[120px] max-w-[200px] cursor-pointer border-r border-[#1e1e1e] group
                                                    ${isActive ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#2a2d2e]'}
                                                `}
                                            >
                                                <span className="text-yellow-400 text-xs font-bold shrink-0 opacity-90">JS</span>
                                                <span className={`text-[13px] truncate ${!isActive && 'italic'}`}>{p.title.toLowerCase()}.json</span>
                                                <span className={`ml-auto text-gray-400 hover:text-white rounded-md p-0.5 hover:bg-[#454545] opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}>
                                                    <X className="w-3.5 h-3.5" />
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Breadcrumbs */}
                                <div className="h-6 flex items-center px-4 bg-[#1e1e1e] text-[#a9a9a9] text-xs font-sans border-b border-[#2b2b2b]">
                                    <span className="hover:text-white cursor-pointer">src</span>
                                    <span className="mx-1 text-[#6e6e6e]">&rsaquo;</span>
                                    <span className="hover:text-white cursor-pointer">work</span>
                                    <span className="mx-1 text-[#6e6e6e]">&rsaquo;</span>
                                    <div className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                                        <span className="text-yellow-400 font-bold text-[10px]">{'{ }'}</span>
                                        <span>{selectedProject.title.toLowerCase()}.json</span>
                                    </div>
                                </div>

                                {/* Editor Content */}
                                <div className="flex-1 overflow-hidden relative">
                                    <JsonViewer project={selectedProject} />
                                </div>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] font-sans select-none z-30">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer transition-colors max-w-[150px] truncate">
                                    <GitBranch className="w-3.5 h-3.5" />
                                    <span>main*</span>
                                </div>
                                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer transition-colors">
                                    <div className="flex items-center gap-1">
                                        <X className="w-3 h-3 text-white/80" /> <span className="text-white/90">0</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Bell className="w-3 h-3 text-white/80" /> <span className="text-white/90">0</span>
                                    </div>
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
                                <div className="hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">
                                    <Bell className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>

                    </div>

                </motion.div>
            </div>

            {/* Wave Divider */}
            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}
