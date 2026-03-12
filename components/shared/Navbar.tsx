'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Launch', href: '#launch' },
    { name: 'Origin', href: '#origin' },
    { name: 'Toolkit', href: '#toolkit' },
    { name: 'Builds', href: '#builds' },
    { name: 'Journey', href: '#journey' },
    { name: 'Connect', href: '#connect' },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('launch');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);

            const sections = navLinks.map(link => link.href.substring(1));
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 300 && rect.bottom >= 300) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
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
                className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out`}
                style={{ width: 'max-content', maxWidth: '92vw' }}
                initial={{ y: -80, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    className={`relative flex items-center gap-1 rounded-[2rem] px-2 py-1.5 transition-all duration-500 overflow-hidden ${
                        isScrolled
                            ? 'bg-[#000000]/70 backdrop-blur-3xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_1px_1px_rgba(255,255,255,0.08)_inset] ring-1 ring-white/10'
                            : 'bg-white/70 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_4px_20px_rgba(0,0,0,0.08),0_1px_1px_rgba(255,255,255,0.9)_inset] ring-1 ring-black/[0.05]'
                    }`}
                >
                    {/* Inner highlight for glass reflection */}
                    <div className={`absolute inset-0 rounded-[2rem] pointer-events-none ring-1 ring-inset ${isScrolled ? 'ring-white/[0.03]' : 'ring-black/[0.02]'}`} />

                    {/* Logo / Brand */}
                    <a
                        href="#launch"
                        onClick={(e) => scrollToSection(e, '#launch')}
                        className="relative z-10 flex items-center gap-1.5 px-3 py-1 mr-1 group cursor-pointer"
                    >
                        <span className={`font-mono text-[13px] font-semibold tracking-tight transition-colors duration-300 group-hover:text-emerald-500 ${isScrolled ? 'text-white/90' : 'text-gray-800'}`}>
                            amruth
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isScrolled
                                ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                                : 'bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.6)]'
                            } group-hover:scale-125 group-hover:bg-emerald-400 group-hover:shadow-[0_0_10px_rgba(52,211,153,0.9)]`} 
                        />
                    </a>

                    {/* Separator */}
                    <div className={`relative z-10 w-px h-4 mx-1 transition-colors duration-300 ${isScrolled ? 'bg-white/10' : 'bg-black/10'}`} />

                    {/* Desktop Nav Links - Array of Strings */}
                    <div className={`hidden md:flex items-center px-1 font-mono text-[13px] tracking-tight ${isScrolled ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="mr-1.5">[</span>
                        <div className="flex items-center gap-0.5">
                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href.substring(1);
                                const isHovered = hoveredIndex === index;
                                const isLast = index === navLinks.length - 1;

                                return (
                                    <div key={link.name} className="flex items-center">
                                        <a
                                            href={link.href}
                                            onClick={(e) => scrollToSection(e, link.href)}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            className="relative px-2 py-1 rounded-md transition-all duration-300 cursor-pointer select-none group"
                                        >
                                            {/* Active state styling */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="nav-active-pill-glass"
                                                    className={`absolute inset-0 rounded-md ${isScrolled ? 'bg-white/10 ring-1 ring-white/20 shadow-[0_0_12px_rgba(255,255,255,0.05)] backdrop-blur-md' : 'bg-black/5 ring-1 ring-black/10 shadow-[0_1px_4px_rgba(0,0,0,0.04)] backdrop-blur-md'}`}
                                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}

                                            {/* Hover state styling */}
                                            {!isActive && isHovered && (
                                                <div className={`absolute inset-0 rounded-md transition-opacity ${isScrolled ? 'bg-white/5' : 'bg-black/[0.04]'}`} />
                                            )}

                                            <span className={`relative z-10 transition-colors duration-300 ${
                                                isActive
                                                    ? (isScrolled ? 'text-emerald-300 font-medium drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'text-emerald-600 font-medium')
                                                    : (isScrolled ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
                                            }`}>
                                                '{link.name}'
                                            </span>
                                        </a>
                                        {!isLast && (
                                            <span className="mx-0.5 pointer-events-none">,</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <span className="ml-1.5">]</span>
                    </div>

                    {/* Separator */}
                    <div className={`relative z-10 hidden md:block w-px h-4 mx-1 transition-colors duration-300 ${isScrolled ? 'bg-white/10' : 'bg-black/10'}`} />

                    {/* Resume CTA */}
                    <a
                        href="/assets/AmruthShyjuMERN.pdf"
                        download="AmruthShyjuMERN.pdf"
                        className={`relative z-10 hidden md:flex items-center gap-1.5 px-3 py-1.5 ml-1 rounded-full text-[12px] font-semibold font-mono transition-all duration-300 group ${
                            isScrolled
                                ? 'bg-white/5 text-gray-200 ring-1 ring-white/10 hover:bg-white/15 hover:text-white hover:ring-white/25 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                : 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 hover:bg-emerald-500/18 hover:text-emerald-600 hover:ring-emerald-500/35 hover:shadow-[0_0_14px_rgba(52,211,153,0.1)]'
                        }`}
                    >
                        <svg
                            className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-0.5"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Resume
                    </a>

                    {/* Mobile: Brand + hamburger */}
                    <div className="relative z-10 flex md:hidden items-center gap-2 pr-1 ml-2">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            className={`flex flex-col gap-[4.5px] p-2 rounded-full transition-all duration-300 ${
                                isMobileMenuOpen
                                    ? (isScrolled ? 'bg-white/15 ring-1 ring-white/20' : 'bg-black/5 ring-1 ring-black/10')
                                    : (isScrolled ? 'hover:bg-white/10' : 'hover:bg-black/5')
                            }`}
                        >
                            <span className={`block w-3.5 h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                                isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
                            } ${isScrolled ? 'bg-white/90' : 'bg-gray-800'}`} />
                            <span className={`block w-3.5 h-[1.5px] rounded-full transition-all duration-300 ${
                                isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                            } ${isScrolled ? 'bg-white/90' : 'bg-gray-800'}`} />
                            <span className={`block w-3.5 h-[1.5px] rounded-full transition-all duration-300 origin-center ${
                                isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                            } ${isScrolled ? 'bg-white/90' : 'bg-gray-800'}`} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -12, filter: 'blur(4px)', scale: 0.98 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-x-4 top-[82px] z-40 md:hidden"
                    >
                        <div className="relative bg-[#000000]/70 backdrop-blur-3xl backdrop-saturate-150 border border-white/10 rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.6),0_1px_1px_rgba(255,255,255,0.08)_inset] overflow-hidden">
                            {/* Inner highlight */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-inset ring-white/[0.02]" />

                            {/* Header */}
                            <div className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08]">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.5)]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#fdbc2c] shadow-[0_0_8px_rgba(253,188,44,0.5)]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c840] shadow-[0_0_8px_rgba(39,200,64,0.5)]" />
                                    </div>
                                    <span className="font-mono text-[11px] text-gray-400 ml-1.5">navigation Array</span>
                                </div>
                                <span className="font-mono text-[10px] text-emerald-400/80 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                    [ '{activeSection}' ]
                                </span>
                            </div>

                            {/* Nav items */}
                            <div className="relative z-10 px-3 py-3 font-mono">
                                <span className="block text-gray-500 text-[13px] ml-2 mb-2">const nav = [</span>
                                <div className="flex flex-col gap-0.5 pl-6 pr-2">
                                    {navLinks.map((link, index) => {
                                        const isActive = activeSection === link.href.substring(1);
                                        const isLast = index === navLinks.length - 1;
                                        return (
                                            <motion.div
                                                key={link.name}
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                                            >
                                                <a
                                                    href={link.href}
                                                    onClick={(e) => scrollToSection(e, link.href)}
                                                    className={`group relative flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
                                                        isActive
                                                            ? 'bg-white/10 text-emerald-300 shadow-[0_2px_10px_rgba(0,0,0,0.2)] ring-1 ring-white/10'
                                                            : 'text-gray-400 hover:bg-white/[0.06] hover:text-white'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className={`text-[14px] ${isActive ? 'font-medium drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]' : ''}`}>
                                                            '{link.name}'<span className="text-gray-600 pointer-events-none group-hover:text-gray-400 transition-colors">{!isLast ? ',' : ''}</span>
                                                        </span>
                                                    </div>
                                                    {isActive && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                                    )}
                                                </a>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                <span className="block text-gray-500 text-[13px] ml-2 mt-2">];</span>
                            </div>

                            {/* Resume */}
                            <div className="relative z-10 p-3 bg-white/[0.02] border-t border-white/[0.06] backdrop-blur-md">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 + 0.2 }}
                                >
                                    <a
                                        href="/assets/AmruthShyjuMERN.pdf"
                                        download="AmruthShyjuMERN.pdf"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-white/5 text-gray-100 ring-1 ring-white/15 hover:bg-white/10 hover:text-white hover:ring-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 group"
                                    >
                                        <svg
                                            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span className="text-[14px] font-semibold font-mono tracking-tight">Download Resume</span>
                                    </a>
                                </motion.div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

