'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/types';

interface ArchitectureLayerProps {
    layerName: string;
    description: string;
    categories: {
        name: string;
        skills: Skill[];
    }[];
    index: number;
}

export default function ArchitectureLayer({ layerName, description, categories, index }: ArchitectureLayerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut"
            }}
            className="w-full max-w-5xl mx-auto"
        >
            {/* Layer Container */}
            <div className="
                relative
                flex flex-col md:flex-row
                bg-white/60 backdrop-blur-sm
                border border-gray-200
                rounded-2xl
                overflow-hidden
                shadow-sm hover:shadow-md
                transition-shadow duration-300
            ">
                {/* Left: Layer Header (Vertical on desktop) */}
                <div className="
                    flex flex-col justify-center
                    p-6 md:w-64
                    bg-gradient-to-br from-gray-50 to-white
                    border-b md:border-b-0 md:border-r border-gray-200
                ">
                    <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">
                        Layer {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {layerName}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Right: Categories & Skills */}
                <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categories.map((category) => (
                        <div key={category.name} className="flex flex-col gap-3">
                            {/* Category Header */}
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    {category.name}
                                </span>
                            </div>

                            {/* Skills List */}
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="
                                            group
                                            flex items-center gap-2
                                            px-3 py-1.5
                                            bg-white border border-gray-200
                                            rounded-lg
                                            shadow-sm
                                            hover:border-blue-300 hover:bg-blue-50/30
                                            transition-all duration-200
                                            cursor-default
                                        "
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${skill.color} group-hover:scale-125 transition-transform`} />
                                        <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Connecting Vertical Line (between layers) */}
            {index < 3 && (
                <div className="h-8 w-px bg-gray-300 mx-auto my-0 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-400 rounded-full" />
                </div>
            )}
        </motion.div>
    );
}
