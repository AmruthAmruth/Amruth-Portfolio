'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Origin', href: '#origin' },
    { name: 'Work', href: '#work' },
    { name: 'Stack', href: '#stack' },
    { name: 'Collaborate', href: '#collaborate' },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const sections = navLinks.map(link => link.href.substring(1));

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Adjust offset for better accuracy
                    if (rect.top <= 300 && rect.bottom >= 300) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.getElementById(href.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <motion.nav
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out max-w-[90vw] md:max-w-3xl rounded-full overflow-hidden ${isScrolled
                    ? 'py-2 px-3 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
                    : 'py-2.5 px-4 bg-white/10 backdrop-blur-sm border border-black/5 shadow-sm'
                    }`}
                initial={{ y: -100, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Gradient Top Border Highlight */}
                {isScrolled && (
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-100 transition-opacity duration-500" />
                )}

                <div className="relative flex items-center justify-between gap-4">

                    {/* Prefix: ~/portfolio */}
                    <div className="hidden md:flex items-center gap-2 pl-2 opacity-80 hover:opacity-100 transition-opacity">
                        <span className="text-blue-500 font-mono text-sm font-bold">~</span>
                        <span className={`font-mono text-sm transition-colors duration-300 ${isScrolled ? 'text-gray-500' : 'text-gray-400'}`}>/</span>
                        <span className={`font-mono text-sm font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-200' : 'text-gray-800'}`}>Amruth</span>
                    </div>

                    {/* Desktop Navigation - Array Style */}
                    <div className={`hidden md:flex items-center gap-0.5 px-3 py-1.5 rounded-full ${isScrolled ? 'bg-white/5 ring-1 ring-white/5' : 'bg-black/5 ring-1 ring-black/5'} transition-all duration-300`}>
                        <span className={`font-mono text-lg font-light select-none mr-1 transition-colors duration-300 ${isScrolled ? 'text-yellow-600/80' : 'text-yellow-700/80'}`}>{'['}</span>

                        {navLinks.map((link, index) => {
                            const isActive = activeSection === link.href.substring(1);
                            const isHovered = hoveredIndex === index;

                            return (
                                <div key={link.name} className="flex items-center group relative">
                                    <a
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        className="relative px-3 py-1 rounded-md text-sm transition-all duration-200 cursor-pointer"
                                    >
                                        {/* Active State - Glow/Cursor Interaction */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-glow"
                                                className={`absolute inset-0 rounded-md shadow-sm border-b ${isScrolled
                                                    ? 'bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] border-white/40'
                                                    : 'bg-black/5 border-black/20'}`}
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        {/* Hover State */}
                                        {!isActive && isHovered && (
                                            <div className={`absolute inset-0 rounded-md ${isScrolled ? 'bg-white/5' : 'bg-black/5'}`} />
                                        )}

                                        <span className={`relative z-10 font-mono text-[13px] tracking-tight transition-colors duration-300 ${isActive
                                            ? (isScrolled ? 'text-white font-semibold text-shadow-sm' : 'text-black font-semibold')
                                            : (isScrolled ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-black')
                                            }`}>
                                            "{link.name}"
                                        </span>
                                    </a>

                                    {/* Comma */}
                                    {index < navLinks.length - 1 && (
                                        <span className={`font-mono mx-0.5 select-none opacity-50 transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-gray-400'}`}>,</span>
                                    )}
                                </div>
                            );
                        })}

                        <span className={`font-mono text-lg font-light select-none ml-1 transition-colors duration-300 ${isScrolled ? 'text-yellow-600/80' : 'text-yellow-700/80'}`}>{']'}</span>
                    </div>

                    {/* Mobile View - Terminal Style Toggle */}
                    <div className="md:hidden flex items-center justify-between w-full">
                        <div className="flex items-center gap-1.5">
                            <span className="text-green-600 font-mono text-sm">➜</span>
                            <span className="text-blue-500 font-mono text-sm">~</span>
                            <span className={`font-mono text-sm ${isScrolled ? 'text-gray-400' : 'text-gray-500'}`}>/</span>
                            <span className={`font-mono text-sm font-medium ${isScrolled ? 'text-white' : 'text-gray-900'}`}>nav</span>
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 hover:opacity-80 transition-opacity ${isScrolled ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
                            aria-label="Toggle menu"
                        >
                            <span className="font-mono text-yellow-600 text-sm">{isMobileMenuOpen ? 'exit()' : 'ls -a'}</span>
                        </button>
                    </div>

                </div>
            </motion.nav>

            {/* Mobile Menu Overlay - JSON/Code Editor Style */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-x-4 top-20 z-40 md:hidden"
                    >
                        <div className="bg-[#0f0f0f]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono text-sm">

                            {/* Editor Header / Tab */}
                            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="ml-2 text-xs text-gray-400">navigation.json</span>
                            </div>

                            <div className="flex relative p-4">
                                {/* Line Numbers */}
                                <div className="flex flex-col gap-1 text-gray-700 text-xs select-none border-r border-white/5 pr-3 text-right min-w-[24px]">
                                    {Array.from({ length: 14 }).map((_, i) => (
                                        <span key={i}>{i + 1}</span>
                                    ))}
                                </div>

                                {/* Code Content */}
                                <div className="flex-1 pl-4 overflow-x-auto">
                                    <div className="text-yellow-500">{"{"}</div>
                                    <div className="pl-4">
                                        <span className="text-blue-400">"current_loc"</span>: <span className="text-green-400">"{activeSection}"</span><span className="text-gray-500">,</span>
                                    </div>
                                    <div className="pl-4">
                                        <span className="text-blue-400">"links"</span>: <span className="text-yellow-500">{"["}</span>

                                        <div className="flex flex-col gap-1 pl-4 my-1">
                                            {navLinks.map((link, index) => {
                                                const isActive = activeSection === link.href.substring(1);
                                                return (
                                                    <motion.div
                                                        key={link.name}
                                                        initial={{ x: -10, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: index * 0.05 + 0.1 }}
                                                    >
                                                        <a
                                                            href={link.href}
                                                            onClick={(e) => scrollToSection(e, link.href)}
                                                            className={`flex items-center gap-2 group transition-colors duration-200`}
                                                        >
                                                            <span className={`${isActive ? 'text-green-400 font-bold' : 'text-orange-300 group-hover:text-orange-200'}`}>
                                                                "{link.name}"
                                                            </span>
                                                            {index < navLinks.length - 1 && <span className="text-gray-600">,</span>}

                                                            {isActive && (
                                                                <span className="ml-2 text-xs text-gray-500 hidden sm:inline-block">// current</span>
                                                            )}
                                                        </a>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        <span className="text-yellow-500">{"]"}</span>
                                    </div>
                                    <div className="text-yellow-500">{"}"}</div>
                                </div>
                            </div>

                            {/* Status Bar */}
                            <div className="flex items-center justify-between px-3 py-1 bg-blue-500/10 border-t border-white/5 text-[10px] text-blue-200/80">
                                <div className="flex gap-3">
                                    <span>master*</span>
                                    <span>Ln {navLinks.findIndex(l => activeSection === l.href.substring(1)) + 5}, Col 1</span>
                                </div>
                                <div>UTF-8</div>
                                <div>JSON</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
