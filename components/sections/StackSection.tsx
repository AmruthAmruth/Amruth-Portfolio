'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { skills, categories } from '@/constants/skills';
import { accentGradients } from '@/constants/theme';
import SectionHeader from '@/components/shared/SectionHeader';
import SectionDivider from '@/components/shared/SectionDivider';
import { Cpu, ChevronRight, Terminal, Database, Globe, Layers, Shield, Wrench, Cloud } from 'lucide-react';

// Map categories to icons
const categoryIcons: Record<string, any> = {
    'Languages': Terminal,
    'Frontend': Globe,
    'Backend': ServerIcon,
    'Databases': Database,
    'Real-time': WifiIcon,
    'Security': Shield,
    'DevOps & Cloud': Cloud,
    'Tools': Wrench
};

// Custom Icons wrapper to avoid build errors if lucide icons are missing
function ServerIcon(props: any) { return <Cpu {...props} /> } // Fallback/Alias
function WifiIcon(props: any) { return <Layers {...props} /> } // Fallback/Alias

export default function StackSection() {
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
    const [isMobile, setIsMobile] = useState(false);

    // Handle resize for responsive layout changes
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const activeSkills = skills.filter(s => s.category === activeCategory);

    return (
        <section id="stack" className={`relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50/50 py-24 md:py-32`}>

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex flex-col">
                <SectionHeader
                    title="Skill Dependency Graph"
                    subtitle="Interactive Technical Proficiency Tree"
                    gradient={accentGradients.blueCyan}
                    className="mb-16"
                />

                {/* Tree Container */}
                <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-0 w-full min-h-[500px]">

                    {/* Desktop: Connected Lines Logic would go here (SVG Overlay) - 
                        For simplicity and robustness in this iteration, we use CSS borders/connectors 
                        relative to the Flex layout which mimic the tree structure perfectly without 
                        fragile absolute coordinate calculations.
                    */}

                    {/* COLUMN 1: ROOT */}
                    <div className="flex flex-col justify-center items-center lg:w-1/6 shrink-0 relative">
                        <div className="hidden lg:block absolute right-0 top-1/2 w-8 h-0.5 bg-slate-300 -translate-y-1/2 z-0" />

                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            className="z-10 w-20 h-20 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-900/20 border-2 border-slate-700 relative group cursor-default"
                        >
                            <Terminal className="w-8 h-8" />
                            <div className="absolute -bottom-8 whitespace-nowrap text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                                ROOT: ME
                            </div>
                        </motion.div>
                    </div>

                    {/* COLUMN 2: CATEGORIES (BRANCHES) */}
                    <div className="flex flex-col justify-center items-center lg:w-1/4 shrink-0 relative">
                        {/* Vertical Trunk Line (Desktop) */}
                        <div className="hidden lg:block absolute left-0 top-8 bottom-8 w-0.5 bg-slate-200 -translate-x-[1px]" />

                        <div className="flex flex-row lg:flex-col gap-3 lg:gap-2 overflow-x-auto lg:overflow-visible w-full py-4 px-2 lg:p-0 no-scrollbar items-start lg:items-center">
                            {categories.map((cat, idx) => {
                                const Icon = categoryIcons[cat] || Layers;
                                const isActive = activeCategory === cat;

                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`relative group flex items-center gap-3 w-full p-3 rounded-lg text-left transition-all duration-300 border
                                            ${isActive
                                                ? 'bg-white border-blue-200 shadow-md shadow-blue-100/50 -translate-y-0.5 lg:translate-x-2'
                                                : 'bg-white/50 border-transparent hover:bg-white hover:border-slate-200 text-slate-500 opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        {/* Connector Line to Root (Desktop) */}
                                        <div className={`hidden lg:block absolute right-full top-1/2 w-8 h-0.5 -mr-0.5 transition-colors duration-300 ${isActive ? 'bg-blue-400' : 'bg-transparent group-hover:bg-slate-200'}`} />

                                        {/* Connector Line to Skills (Desktop) */}
                                        {isActive && (
                                            <div className="hidden lg:block absolute left-full top-1/2 w-8 h-0.5 bg-blue-400 -ml-0.5 z-20" />
                                        )}

                                        <div className={`p-2 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className={`text-sm font-semibold truncate ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                                            {cat}
                                        </span>
                                        {isActive && <ChevronRight className="w-4 h-4 ml-auto text-blue-400 hidden lg:block" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* COLUMN 3: SKILLS (LEAVES) */}
                    <div className="flex flex-col justify-center lg:w-1/2 relative min-h-[300px] lg:pl-12">
                        {/* Desktop Vertical Trunk for Skills */}
                        <div className="hidden lg:block absolute left-0 top-12 bottom-12 w-0.5 bg-blue-100/50" />

                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, staggerChildren: 0.05 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
                        >
                            {activeSkills.map((skill, index) => {
                                const skillColor = skill.color.split(' ')[1].replace('to-', ''); // Extract main color approximation

                                return (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="relative group bg-white p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex items-center gap-4 overflow-hidden"
                                    >
                                        {/* Connector Line (Desktop) */}
                                        <div className="hidden lg:block absolute right-full top-1/2 w-12 h-0.5 bg-blue-100 -mr-4 group-hover:bg-blue-300 transition-colors" />

                                        {/* Node Point */}
                                        <div className="hidden lg:block absolute -left-[5px] top-1/2 -mt-[3px] w-1.5 h-1.5 rounded-full bg-blue-200 group-hover:bg-blue-500 transition-colors" />

                                        {/* Skill Content */}
                                        <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${skill.color} opacity-80`} />

                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800 text-sm">{skill.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] uppercase font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                                                    NODE_ID: {index + 1}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hover Tech Effect */}
                                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                </div>

                {/* Tech Footer */}
                <div className="mt-16 flex justify-center w-full">
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border border-slate-200 px-4 py-2 rounded-full bg-white/50">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-slate-800 rounded-full animate-pulse" />
                            ROOT_ACCESS: GRANTED
                        </span>
                        <span className="text-slate-300">|</span>
                        <span>NODES_LOADED: {skills.length}</span>
                        <span className="text-slate-300">|</span>
                        <span>TREE_DEPTH: 3</span>
                    </div>
                </div>

            </div>

            <SectionDivider position="bottom" color="#fff" />
        </section>
    );
}
