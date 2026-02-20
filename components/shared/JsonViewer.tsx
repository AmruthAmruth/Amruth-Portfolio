'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { Globe, Github, CheckCircle, Clock } from 'lucide-react';

interface JsonViewerProps {
    project: Project;
}

export default function JsonViewer({ project }: JsonViewerProps) {
    const isLive = project.status === 'Live';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={project.title}
            className="w-full h-full overflow-auto text-gray-300 flex flex-col"
        >
            {/* ── Top Banner ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 sm:px-8 pt-5 pb-4 border-b border-[#2b2b2b] bg-[#1e1e1e] shrink-0">
                <div className="flex-1">
                    <p className="text-[10px] text-[#5a5a5a] uppercase tracking-widest font-semibold mb-0.5">
                        Project Details
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-white text-xl font-bold">{project.title}</h3>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${isLive
                                ? 'bg-green-900/30 text-green-400 border border-green-800/50'
                                : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50'
                            }`}>
                            {isLive
                                ? <CheckCircle className="w-2.5 h-2.5" />
                                : <Clock className="w-2.5 h-2.5" />}
                            {isLive ? 'Live' : 'In Development'}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 transition-colors text-white text-[11px] font-semibold"
                        >
                            <Globe className="w-3 h-3" />
                            Live Demo
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2d2d2d] hover:bg-[#3a3a3a] transition-colors text-white text-[11px] font-semibold border border-[#444]"
                        >
                            <Github className="w-3 h-3" />
                            Source Code
                        </a>
                    )}
                </div>
            </div>

            {/* ── Content Area ── */}
            <div className="flex-1 overflow-auto px-5 sm:px-8 py-6 space-y-6">

                {/* About */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#5a8a6a] font-bold mb-2">
                        About this project
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {project.problem}
                    </p>
                </div>

                <div className="border-t border-[#2b2b2b]" />

                {/* Key Highlights */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#6a6aaa] font-bold mb-3">
                        Key Features
                    </p>
                    <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.07 }}
                                className="flex items-start gap-2.5 text-sm text-gray-300"
                            >
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                {feature}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="border-t border-[#2b2b2b]" />

                {/* Tech Stack */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#8a7a3a] font-bold mb-3">
                        Built With
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech.name}
                                className="px-3 py-1 rounded-full bg-[#252525] border border-[#3a3a3a] text-yellow-300 text-xs font-semibold hover:border-yellow-600/50 transition-colors"
                            >
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="border-t border-[#2b2b2b]" />

                {/* Links */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#5a7a8a] font-bold mb-3">
                        Links
                    </p>
                    <div className="space-y-2">
                        {project.liveUrl && (
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] text-gray-500 w-24 shrink-0">Live App</span>
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors truncate"
                                >
                                    {project.liveUrl}
                                </a>
                            </div>
                        )}
                        {project.githubUrl && (
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] text-gray-500 w-24 shrink-0">Source Code</span>
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors truncate"
                                >
                                    {project.githubUrl}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
