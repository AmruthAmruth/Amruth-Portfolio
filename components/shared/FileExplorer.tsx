'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, FileJson, MoreHorizontal, X } from 'lucide-react';
import { useState } from 'react';

interface FileExplorerProps {
    projects: Project[];
    selectedProject: Project;
    onSelect: (project: Project) => void;
}

// Maps project status to a small badge color
const statusDot: Record<string, string> = {
    Live: 'bg-green-400',
    'In Development': 'bg-yellow-400',
    Archived: 'bg-gray-400',
};

export default function FileExplorer({ projects, selectedProject, onSelect }: FileExplorerProps) {
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
    const [isOpenEditorsOpen, setIsOpenEditorsOpen] = useState(true);

    return (
        <div className="h-full flex flex-col font-sans bg-[#252526] text-[#cccccc] border-r border-[#1e1e1e] w-[260px] shrink-0 select-none">
            {/* Explorer Header */}
            <div className="px-5 py-2.5 flex items-center justify-between text-[11px] font-medium tracking-wider text-[#bbbbbb] uppercase">
                <span>Explorer</span>
                <MoreHorizontal className="w-4 h-4 text-[#858585] cursor-pointer hover:text-white" />
            </div>

            {/* Main Tree */}
            <div className="flex flex-col overflow-y-auto flex-1 custom-scrollbar">
                
                {/* OPEN EDITORS SECTION */}
                <div className="mb-0.5">
                    <button
                        onClick={() => setIsOpenEditorsOpen(!isOpenEditorsOpen)}
                        className="flex items-center px-1 py-0.5 hover:bg-[#2a2d2e] cursor-pointer text-[#bbbbbb] font-bold text-[11px] w-full text-left"
                    >
                        {isOpenEditorsOpen
                            ? <ChevronDown className="w-4 h-4 mr-1 shrink-0" />
                            : <ChevronRight className="w-4 h-4 mr-1 shrink-0" />}
                        <span className="truncate uppercase">Open Editors</span>
                    </button>
                    
                    {isOpenEditorsOpen && (
                        <div className="flex flex-col text-[13px] mt-0.5">
                            <div className="flex items-center gap-2 pl-6 pr-4 py-1 bg-[#37373d] text-white cursor-pointer">
                                <span className="text-blue-400 text-[10px] shrink-0 font-bold">M↓</span>
                                <span className="truncate">{selectedProject.title}.md</span>
                                <X className="w-3.5 h-3.5 ml-auto text-white/50 hover:text-white" />
                            </div>
                        </div>
                    )}
                </div>

                {/* PROJECT TREE SECTION */}
                <button
                    onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                    className="flex items-center px-1 py-0.5 hover:bg-[#2a2d2e] cursor-pointer text-[#bbbbbb] font-bold text-[11px] w-full text-left border-t border-[#1e1e1e]"
                >
                    {isPortfolioOpen
                        ? <ChevronDown className="w-4 h-4 mr-1 shrink-0" />
                        : <ChevronRight className="w-4 h-4 mr-1 shrink-0" />}
                    <span className="truncate uppercase">Portfolio [Amruth]</span>
                </button>

                {isPortfolioOpen && (
                    <div className="flex flex-col text-[13px] mt-0.5">
                        {/* src folder */}
                        <div className="flex items-center gap-1 pl-2 pr-3 py-0.5 text-[#cccccc] cursor-pointer hover:bg-[#2a2d2e]">
                            <ChevronDown className="w-4 h-4 shrink-0 text-[#858585]" />
                            <span className="truncate">src</span>
                        </div>

                        {/* components folder */}
                        <div className="flex items-center gap-1 pl-6 pr-3 py-0.5 text-[#cccccc] cursor-pointer hover:bg-[#2a2d2e]">
                            <ChevronDown className="w-4 h-4 shrink-0 text-[#858585]" />
                            <span className="truncate">components</span>
                        </div>

                        {/* projects folder */}
                        <div className="flex items-center gap-1 pl-10 pr-3 py-0.5 text-[#cccccc] cursor-pointer hover:bg-[#2a2d2e]">
                            <ChevronDown className="w-4 h-4 shrink-0 text-[#858585]" />
                            <FolderOpen className="w-4 h-4 text-[#dcb67a] shrink-0" />
                            <span className="truncate font-medium">projects</span>
                        </div>

                        {/* Project Files */}
                        <div className="flex flex-col">
                            {projects.map((project) => {
                                const isActive = selectedProject.title === project.title;
                                return (
                                    <motion.button
                                        key={project.title}
                                        onClick={() => onSelect(project)}
                                        className={`
                                            group flex items-center gap-2 pl-[60px] pr-4 py-0.5 cursor-pointer transition-all w-full text-left
                                            ${isActive
                                                ? 'bg-[#37373d] text-[#ffffff]'
                                                : 'text-[#cccccc]/70 hover:bg-[#2a2d2e] hover:text-[#e0e0e0]'}
                                        `}
                                    >
                                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                            <span className="text-blue-400 text-[10px] shrink-0 font-bold">M↓</span>
                                            <span className="truncate text-[13px]">{project.title}.md</span>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Extra decorative files */}
                        <div className="mt-2 border-t border-[#1e1e1e] pt-1 opacity-60">
                             <div className="flex items-center gap-2 pl-6 pr-3 py-0.5 text-[#cccccc] hover:bg-[#2a2d2e] cursor-default group">
                                <ChevronRight className="w-3.5 h-3.5 text-[#858585] shrink-0" />
                                <span className="truncate">constants</span>
                            </div>
                            <div className="flex items-center gap-2 pl-6 pr-3 py-0.5 text-[#cccccc] hover:bg-[#2a2d2e] cursor-default group">
                                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                                <span className="truncate text-[13px]">README.md</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Collapsible Sections (Realistic VS Code) */}
            <div className="mt-auto border-t border-[#1e1e1e]">
                {['Outline', 'Timeline', 'Scripts'].map((section) => (
                    <button key={section} className="flex items-center px-1 py-0.5 hover:bg-[#2a2d2e] cursor-pointer text-[#bbbbbb] font-bold text-[11px] w-full text-left border-b border-[#1e1e1e]/50">
                        <ChevronRight className="w-4 h-4 mr-1 shrink-0 text-[#858585]" />
                        <span className="truncate uppercase">{section}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
