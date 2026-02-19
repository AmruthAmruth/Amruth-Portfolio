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
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[0.22,1,0.36,1] ${isScrolled
                    ? 'py-2 px-3 bg-white/40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] ring-1 ring-white/40'
                    : 'py-4 px-6 bg-white/20 backdrop-blur-2xl ring-1 ring-white/30'
                    } rounded-full`}
                initial={{ y: -100, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="flex items-center relative">
                    {/* The "Wire" connecting the nodes */}
                    <div className="absolute left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent top-1/2 -translate-y-1/2 hidden md:block pointer-events-none opacity-50" />

                    {/* Brand Node */}
                    <motion.a
                        href="#hero"
                        onClick={(e) => scrollToSection(e, '#hero')}
                        className="relative z-10 px-4 py-2 rounded-full font-bold text-gray-900 mr-2 flex items-center justify-center bg-white/50 shadow-sm ring-1 ring-white/50 backdrop-blur-md"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.8)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Amruth
                    </motion.a>

                    {/* Desktop Navigation Nodes */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, index) => {
                            const isActive = activeSection === link.href.substring(1);
                            const isHovered = hoveredIndex === index;

                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="relative z-10 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-500 group outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                                >
                                    {/* Active State Pill */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-black/5 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}

                                    {/* Hover State - Subtle Glass */}
                                    {!isActive && isHovered && (
                                        <motion.div
                                            layoutId="hoverTab"
                                            className="absolute inset-0 bg-white/40 ring-1 ring-white/40 rounded-full"
                                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                                        />
                                    )}

                                    {/* Text */}
                                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-gray-900'
                                        }`}>
                                        {link.name}
                                    </span>

                                    {/* Connector Dot on the Wire (visual aid) */}
                                    <span className={`absolute top-1/2 left-0 -translate-x-[2px] -translate-y-1/2 w-1 h-1 rounded-full pointer-events-none transition-all duration-500 ${isActive ? 'bg-black scale-100 opacity-100' : 'bg-gray-300 scale-75 opacity-0 group-hover:opacity-100'
                                        }`} />
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-10 p-2 ml-2 text-gray-800 bg-white/50 backdrop-blur-md rounded-full ring-1 ring-white/50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
                            <motion.span
                                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 5 : 0 }}
                                className="w-4 h-0.5 bg-gray-900 rounded-full origin-center"
                            />
                            <motion.span
                                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                                className="w-4 h-0.5 bg-gray-900 rounded-full"
                            />
                            <motion.span
                                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -5 : 0 }}
                                className="w-4 h-0.5 bg-gray-900 rounded-full origin-center"
                            />
                        </div>
                    </button>

                    {/* End Node on Wire */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-300 rounded-full hidden md:block mr-2" />
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(20px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(20px)" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-x-4 top-24 mx-auto max-w-sm z-40 bg-white/80 backdrop-blur-[40px] rounded-[32px] shadow-[0_32px_64px_rgba(0,0,0,0.12)] ring-1 ring-white/60 p-6 md:hidden overflow-hidden"
                    >
                        {/* Decorative background vibe */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 flex flex-col gap-2">
                            {/* Vertical Wire */}
                            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-gray-200 via-gray-200 to-transparent rounded-full" />

                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 + 0.1 }}
                                        className="relative group"
                                    >
                                        <a
                                            href={link.href}
                                            onClick={(e) => scrollToSection(e, link.href)}
                                            className={`relative flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white shadow-sm ring-1 ring-black/5' : 'hover:bg-white/50'
                                                }`}
                                        >
                                            {/* Node Dot */}
                                            <div className={`relative w-2 5 h-2.5 rounded-full ring-4 ring-white transition-all duration-500 z-10 ${isActive ? 'bg-black ring-white scale-125' : 'bg-gray-300 group-hover:bg-gray-400'
                                                }`} />

                                            <span className={`text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-500 group-hover:text-gray-800'
                                                }`}>
                                                {link.name}
                                            </span>
                                        </a>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
