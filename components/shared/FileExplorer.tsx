'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, FileJson } from 'lucide-react';
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

    return (
        <div className="h-full flex flex-col font-sans bg-[#252526] text-[#cccccc] border-r border-[#1e1e1e] w-[240px] shrink-0 select-none">
            {/* Explorer Header */}
            <div className="px-4 py-3 text-[10px] font-semibold tracking-widest text-[#bbbbbb] uppercase border-b border-[#1e1e1e]">
                Projects
            </div>

            {/* Helper hint */}
            <div className="px-4 py-2 text-[10px] text-[#6a6a6a] italic border-b border-[#1e1e1e]">
                ← Click a project to view details
            </div>

            {/* Main Tree */}
            <div className="flex flex-col mt-1 overflow-y-auto flex-1">
                {/* Root Folder Toggle */}
                <button
                    onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                    className="flex items-center px-3 py-1.5 hover:bg-[#2a2d2e] cursor-pointer text-[#bbbbbb] font-semibold text-[12px] w-full text-left"
                >
                    {isPortfolioOpen
                        ? <ChevronDown className="w-3.5 h-3.5 mr-1 shrink-0" />
                        : <ChevronRight className="w-3.5 h-3.5 mr-1 shrink-0" />}
                    {isPortfolioOpen
                        ? <FolderOpen className="w-4 h-4 mr-2 text-[#dcb67a] shrink-0" />
                        : <Folder className="w-4 h-4 mr-2 text-[#dcb67a] shrink-0" />}
                    <span className="truncate">My Portfolio</span>
                </button>

                {isPortfolioOpen && (
                    <div className="flex flex-col text-[13px]">
                        {/* Decorative sub-folders (non-interactive, human-friendly names) */}
                        {[
                            { label: 'About Me', icon: '👤' },
                            { label: 'Skills', icon: '⚡' },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2 pl-8 pr-3 py-1 opacity-50 cursor-default"
                            >
                                <ChevronRight className="w-3 h-3 text-[#858585] shrink-0" />
                                <Folder className="w-3.5 h-3.5 text-[#8b949e] shrink-0" />
                                <span className="text-[#8b949e] truncate">{item.icon} {item.label}</span>
                            </div>
                        ))}

                        {/* "Projects" sub-folder (active) */}
                        <div className="flex items-center gap-2 pl-8 pr-3 py-1 text-[#cccccc]">
                            <ChevronDown className="w-3 h-3 shrink-0" />
                            <FolderOpen className="w-3.5 h-3.5 text-[#dcb67a] shrink-0" />
                            <span className="font-semibold truncate">🗂️ Projects</span>
                        </div>

                        {/* Project Files */}
                        <div className="pl-2 border-l border-[#404040] ml-[52px]">
                            {projects.map((project) => {
                                const isActive = selectedProject.title === project.title;
                                const dotColor = statusDot[project.status] ?? 'bg-gray-400';
                                return (
                                    <motion.button
                                        key={project.title}
                                        onClick={() => onSelect(project)}
                                        whileTap={{ scale: 0.97 }}
                                        className={`
                                            group flex items-center gap-2 px-2 py-1.5 cursor-pointer transition-all rounded-sm mb-0.5 w-full text-left
                                            ${isActive
                                                ? 'bg-[#37373d] text-white font-semibold'
                                                : 'text-[#969696] hover:bg-[#2a2d2e] hover:text-[#e0e0e0]'}
                                        `}
                                    >
                                        <FileJson className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-yellow-400' : 'text-[#858585]'}`} />
                                        <span className="truncate flex-1">{project.title}</span>
                                        {/* Live status dot */}
                                        <span
                                            title={project.status}
                                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`}
                                        />
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Extra decorative files */}
                        <div className="mt-2 border-t border-[#333] pt-2">
                            <div className="flex items-center gap-2 pl-8 pr-3 py-1 text-[#cccccc] hover:bg-[#2a2d2e] cursor-default opacity-60">
                                <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                <span className="truncate">README.md</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="px-4 py-3 border-t border-[#1e1e1e] space-y-1">
                <p className="text-[9px] text-[#555] uppercase tracking-widest font-semibold mb-1">Status</p>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                    <span className="text-[10px] text-[#888]">Live</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                    <span className="text-[10px] text-[#888]">In Development</span>
                </div>
            </div>
        </div>
    );
}
