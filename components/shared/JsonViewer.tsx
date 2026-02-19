'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';

interface JsonViewerProps {
    project: Project;
}

export default function JsonViewer({ project }: JsonViewerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={project.title}
            className="w-full h-full p-8 md:p-12 overflow-auto font-mono text-sm text-gray-300 flex flex-col justify-center"
        >
            <div className="flex gap-2 mb-6 text-xs text-gray-500 border-b border-gray-700 pb-2 max-w-2xl mx-auto w-full">
                <span className="text-yellow-500">JSON</span>
                <span>/</span>
                <span>projects</span>
                <span>/</span>
                <span className="text-blue-400">{project.title.toLowerCase()}.json</span>
            </div>

            <div className="font-mono text-sm leading-relaxed max-w-2xl mx-auto w-full">
                <span className="text-gray-500 italic block mb-2">
                    {`/**`}
                    <br />
                    {` * Project Details: ${project.title}`}
                    <br />
                    {` * Status: ${project.status === 'Live' ? 'Production Ready' : 'In Development'}`}
                    <br />
                    {` */`}
                </span>

                <span className="text-yellow-500">{"{"}</span>

                <div className="pl-6 space-y-4 pt-2">
                    {/* Project Name */}
                    <div>
                        <span className="text-gray-500 italic inline-block mb-0.5">// The name of the project</span>
                        <br />
                        <span className="text-blue-400">"project_name"</span>: <span className="text-orange-400">"{project.title}"</span>,
                    </div>

                    {/* Links Object */}
                    <div>
                        <span className="text-gray-500 italic inline-block mb-0.5">// Clickable links to view the live app or code</span>
                        <br />
                        <span className="text-blue-400">"links"</span>: <span className="text-yellow-500">{"{"}</span>
                        <div className="pl-6">
                            <div>
                                <span className="text-blue-400">"live_demo"</span>: <span className="text-green-400 underline cursor-pointer hover:text-green-300 transition-colors"><a href={project.liveUrl} target="_blank" rel="noreferrer">"{project.liveUrl}"</a></span>,
                            </div>
                            <div>
                                <span className="text-blue-400">"github_repo"</span>: <span className="text-green-400 underline cursor-pointer hover:text-green-300 transition-colors"><a href={project.githubUrl} target="_blank" rel="noreferrer">"{project.githubUrl}"</a></span>
                            </div>
                        </div>
                        <span className="text-yellow-500">{"}"}</span>,
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <span className="text-gray-500 italic inline-block mb-0.5">// What problem does this solve?</span>
                        <div className="flex items-start">
                            <span className="text-blue-400 whitespace-nowrap">"description"</span>:
                            <span className="text-orange-400 ml-2 whitespace-pre-wrap leading-relaxed">
                                "{project.problem} {project.outcome}"
                            </span>,
                        </div>
                    </div>

                    {/* Features Array (New) */}
                    <div>
                        <span className="text-gray-500 italic inline-block mb-0.5">// Key capabilities and features</span>
                        <br />
                        <span className="text-blue-400">"key_features"</span>: <span className="text-purple-500">{"["}</span>
                        <div className="pl-6">
                            {project.features.slice(0, 3).map((feature, i) => (
                                <div key={i}>
                                    <span className="text-orange-300">"{feature}"</span>{i < 2 ? ',' : ''}
                                </div>
                            ))}
                        </div>
                        <span className="text-purple-500">{" ]"}</span>,
                    </div>

                    {/* Status */}
                    <div>
                        <span className="text-gray-500 italic inline-block mb-0.5">// Current development status</span>
                        <br />
                        <span className="text-blue-400">"status"</span>: <span className="text-green-400">"{project.status}"</span>,
                    </div>

                    {/* Tech Stack Array */}
                    <div>
                        <span className="text-gray-500 italic inline-block mb-0.5">// Technologies used to build this</span>
                        <br />
                        <span className="text-blue-400">"tech_stack"</span>: <span className="text-purple-500">{"["}</span>
                        <div className="pl-6 flex flex-wrap gap-2">
                            {project.techStack.map((tech, i) => (
                                <span key={tech.name}>
                                    <span className="text-yellow-300">"{tech.name}"</span>{i < project.techStack.length - 1 ? ',' : ''}
                                </span>
                            ))}
                        </div>
                        <span className="text-purple-500">{" ]"}</span>
                    </div>
                </div>

                <span className="text-yellow-500 mt-2 block">{"}"}</span>
            </div>
        </motion.div>
    );
}
