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
                    <MacWindow title={`amruth-portfolio - ${selectedProject.title.toLowerCase()}.json`} className="h-[700px] flex flex-col shadow-2xl">
                        <div className="flex flex-1 overflow-hidden">
                            {/* Sidebar: File Explorer */}
                            <div className="w-64 hidden md:block flex-shrink-0">
                                <FileExplorer
                                    projects={projects}
                                    selectedProject={selectedProject}
                                    onSelect={setSelectedProject}
                                />
                            </div>

                            {/* Editor Area */}
                            <div className="flex-1 bg-[#1e1e1e] relative flex flex-col min-w-0">
                                {/* Editor Tabs */}
                                <div className="flex bg-[#252526] h-9 overflow-x-auto no-scrollbar">
                                    {projects.map(p => (
                                        <div
                                            key={p.title}
                                            onClick={() => setSelectedProject(p)}
                                            className={`
                                                flex items-center gap-2 px-3 min-w-fit cursor-pointer border-r border-[#1e1e1e]
                                                ${selectedProject.title === p.title ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] text-gray-500 hover:bg-[#2a2d2e]'}
                                            `}
                                        >
                                            <span className="text-yellow-400 text-xs text-opacity-80">{"{ }"}</span>
                                            <span className="text-xs">{p.title.toLowerCase()}.json</span>
                                            {selectedProject.title === p.title && (
                                                <span className="ml-2 text-gray-400 hover:text-white">×</span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Editor Content */}
                                <div className="flex-1 overflow-hidden relative">
                                    <JsonViewer project={selectedProject} />
                                </div>
                            </div>
                        </div>
                    </MacWindow>

                </motion.div>
            </div>

            {/* Wave Divider */}
            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}
