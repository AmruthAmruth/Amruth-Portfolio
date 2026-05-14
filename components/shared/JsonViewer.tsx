'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { Globe, Github, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface JsonViewerProps {
    project: Project;
}

export default function JsonViewer({ project }: JsonViewerProps) {
    const isLive = project.status === 'Live';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={project.title}
            className="w-full h-full flex flex-col bg-[#1e1e1e] font-sans selection:bg-blue-500/30 overflow-hidden"
        >
            {/* Header: Title & Status */}
            <div className="pt-8 pb-6 px-8 border-b border-[#2b2b2b]/50 bg-gradient-to-b from-[#252526]/30 to-transparent">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-white text-3xl font-black tracking-tight mb-2">
                            {project.title}<span className="text-blue-500">.</span>
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isLive 
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                                {project.status}
                            </span>
                            <span className="text-slate-500 text-[10px] font-mono">v1.0.4</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" 
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20">
                                <ExternalLink className="w-3.5 h-3.5" /> Launch
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white border border-[#444] rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95">
                                <Github className="w-3.5 h-3.5" /> Source
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar">
                <div className="p-8 max-w-3xl space-y-8">
                    {/* Compact Overview */}
                    <section>
                        <h2 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-slate-800" /> Executive Summary
                        </h2>
                        <p className="text-slate-300 text-base leading-relaxed font-medium">
                            {project.impact}. {project.problem.split('.')[0]}.
                        </p>
                    </section>

                    {/* Features Grid */}
                    <section>
                        <h2 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-slate-800" /> Key Engineering Feats
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.features.slice(0, 4).map((f, i) => (
                                <div key={i} className="group p-3 rounded-xl bg-[#252526] border border-[#2b2b2b] hover:border-blue-500/30 transition-all">
                                    <div className="flex gap-3">
                                        <div className="mt-1 w-5 h-5 shrink-0 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 font-mono text-[10px] font-bold">
                                            {i + 1}
                                        </div>
                                        <p className="text-slate-400 text-xs leading-snug group-hover:text-slate-200 transition-colors">
                                            {f.split(':')[0]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Tech Stack - Compact Icons */}
                    <section>
                        <h2 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-slate-800" /> Modern Tech Stack
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <div key={tech.name} className="px-3 py-1.5 rounded-lg bg-[#252526] border border-[#2b2b2b] text-slate-300 text-[11px] font-bold flex items-center gap-2 hover:bg-[#2d2d2e] transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                                    {tech.name}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer / Meta */}
            <div className="px-8 py-4 bg-[#1a1a1a] border-t border-[#2b2b2b]/50 flex items-center justify-between text-[10px] text-slate-600 font-mono">
                <div className="flex items-center gap-4">
                    <span>UTF-8</span>
                    <span>TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500/20" />
                    <span>Compiled Successfully</span>
                </div>
            </div>
        </motion.div>
    );
}
