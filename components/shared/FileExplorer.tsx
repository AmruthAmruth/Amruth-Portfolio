'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ChevronRight, ChevronDown, Folder, FileJson, FileCode, FileText } from 'lucide-react';
import { useState } from 'react';

interface FileExplorerProps {
    projects: Project[];
    selectedProject: Project;
    onSelect: (project: Project) => void;
}

export default function FileExplorer({ projects, selectedProject, onSelect }: FileExplorerProps) {
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);

    return (
        <div className="h-full flex flex-col font-sans bg-[#252526] text-[#cccccc] border-r border-[#1e1e1e]">
            {/* Explorer Header */}
            <div className="px-5 py-3 text-[11px] font-medium tracking-wide text-[#bbbbbb] uppercase flex items-center justify-between">
                <span>PROJECT EXPLORER</span>
                <span className="text-[#6f6f6f]">...</span>
            </div>

            {/* Main Tree */}
            <div className="flex flex-col mt-2">
                {/* Root Folder */}
                <button
                    onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                    className="flex items-center px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer text-[#bbbbbb] font-bold text-[13px] sticky top-0"
                >
                    {isPortfolioOpen ? <ChevronDown className="w-4 h-4 mr-1.5" /> : <ChevronRight className="w-4 h-4 mr-1.5" />}
                    <span className="truncate">MY_PORTFOLIO</span>
                </button>

                {isPortfolioOpen && (
                    <div className="flex flex-col font-sans text-[14px]">
                        {/* Standard Folders (Decorative) */}
                        {['.github', 'components', 'styles'].map((folder) => (
                            <div key={folder} className="flex items-center gap-1.5 px-8 py-1.5 opacity-60 hover:opacity-100 hover:bg-[#2a2d2e] cursor-default transition-opacity">
                                <ChevronRight className="w-4 h-4 text-[#858585]" />
                                <Folder className="w-4 h-4 text-[#8b949e]" />
                                <span className="text-[#8b949e]">{folder}</span>
                            </div>
                        ))}

                        {/* The "Work" Folder (Active) */}
                        <div className="flex items-center gap-1.5 px-8 py-1.5 hover:bg-[#2a2d2e] cursor-pointer">
                            <ChevronDown className="w-4 h-4 text-[#cccccc]" />
                            <Folder className="w-4 h-4 text-[#dcb67a]" />
                            <span className="text-[#cccccc] font-medium">projects</span>
                        </div>

                        {/* Project Files */}
                        <div className="pl-3 border-l border-[#404040] ml-[38px]">
                            {projects.map((project) => (
                                <motion.div
                                    key={project.title}
                                    onClick={() => onSelect(project)}
                                    className={`
                                        group flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-all rounded-sm mb-0.5
                                        ${selectedProject.title === project.title
                                            ? 'bg-[#37373d] text-white font-medium'
                                            : 'text-[#969696] hover:bg-[#2a2d2e] hover:text-[#e0e0e0]'}
                                    `}
                                >
                                    <span className="text-yellow-400 text-xs font-bold shrink-0 w-4 text-center">JS</span>
                                    <span className="truncate">{project.title.toLowerCase()}.json</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Extra Files */}
                        <div className="flex items-center gap-2 px-8 py-1.5 text-[#cccccc] hover:bg-[#2a2d2e] cursor-pointer opacity-70 mt-2">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span>README.md</span>
                        </div>
                        <div className="flex items-center gap-2 px-8 py-1.5 text-[#cccccc] hover:bg-[#2a2d2e] cursor-pointer opacity-70">
                            <FileJson className="w-4 h-4 text-yellow-400" />
                            <span>package.json</span>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
