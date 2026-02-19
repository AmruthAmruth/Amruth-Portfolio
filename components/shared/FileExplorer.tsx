'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';

interface FileExplorerProps {
    projects: Project[];
    selectedProject: Project;
    onSelect: (project: Project) => void;
}

export default function FileExplorer({ projects, selectedProject, onSelect }: FileExplorerProps) {
    return (
        <div className="h-full bg-[#1e1e1e] text-gray-400 font-mono text-sm border-r border-[#333] flex flex-col">
            {/* Explorer Header */}
            <div className="px-4 py-3 text-xs font-semibold tracking-wider text-gray-500 uppercase bg-[#252526]">
                Explorer
            </div>

            {/* Project Roots */}
            <div className="mt-2">
                <div className="flex items-center gap-1.5 px-3 py-1 text-gray-300 font-bold mb-1">
                    <svg className="w-4 h-4 text-gray-400 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>MY_WORK</span>
                </div>

                {/* Simplified File List */}
                <div className="pl-6">
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            onClick={() => onSelect(project)}
                            className={`
                                flex items-center gap-2 px-3 py-2 rounded-sm cursor-pointer transition-colors mb-1
                                ${selectedProject.title === project.title ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}
                            `}
                            whileHover={{ x: 2 }}
                        >
                            {/* Icon */}
                            <span className="text-yellow-400 text-xs font-bold">JS</span>
                            <span className={`${selectedProject.title === project.title ? 'font-medium' : ''}`}>
                                {project.title.toLowerCase()}.json
                            </span>
                        </motion.div>
                    ))}

                    {/* decorative files to hint at more content */}
                    <div className="flex items-center gap-2 px-3 py-2 text-gray-600 cursor-not-allowed opacity-50">
                        <span className="text-blue-400 text-xs">MD</span>
                        <span>readme.md</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
