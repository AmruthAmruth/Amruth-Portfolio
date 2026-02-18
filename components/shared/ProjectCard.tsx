'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { cardVariants } from '@/constants/animations';

interface ProjectCardProps {
    project: Project;
    index: number;
}

/**
 * Project card component displaying project details
 */
export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200"
        >
            {/* Gradient Accent */}
            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${project.gradient} rounded-l-3xl`} />

            {/* Project Header */}
            <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {project.title}
                </h3>
                <p className={`text-xl md:text-2xl font-medium bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent leading-relaxed`}>
                    {project.impact}
                </p>
            </div>

            {/* Problem → Features → Outcome */}
            <div className="space-y-6 mb-8">
                {/* Problem */}
                <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Problem
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                        {project.problem}
                    </p>
                </div>

                {/* Features */}
                <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                        Key Features
                    </h4>
                    <ul className="space-y-2">
                        {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
                                <span className="leading-relaxed">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Outcome */}
                <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Outcome
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                        {project.outcome}
                    </p>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Tech Stack
                </h4>
                <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech) => (
                        <motion.div
                            key={tech.name}
                            className={`px-4 py-2 rounded-full bg-gradient-to-r ${project.gradient} text-white font-medium text-sm shadow-md`}
                            whileHover={{
                                scale: 1.05,
                                y: -2,
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            {tech.name}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/btn px-6 py-3 rounded-full bg-gradient-to-r ${project.gradient} text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2`}
                >
                    <span>Live Demo</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-medium transition-all duration-300 hover:border-gray-900 hover:text-gray-900 hover:shadow-md hover:scale-105 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                </a>
            </div>
        </motion.div>
    );
}
