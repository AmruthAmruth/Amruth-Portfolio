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

    // Handle scroll effect for navbar style and active section
    useEffect(() => {
        const handleScroll = () => {
            // Update navbar style on scroll
            setIsScrolled(window.scrollY > 20);

            // Determine active section
            const sections = navLinks.map(link => link.href.substring(1));

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If section is in view (approx middle of screen or near top)
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
                className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl rounded-full transition-all duration-300 ${isScrolled
                    ? 'bg-white/70 backdrop-blur-xl shadow-lg border border-white/20 py-3'
                    : 'bg-white/40 backdrop-blur-md border border-white/10 py-3'
                    }`}
                initial={{ y: -100, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => scrollToSection(e, '#hero')}
                        className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                            Amruth
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'text-white'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/40'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gray-900 rounded-full"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            style={{ zIndex: -1 }}
                                        />
                                    )}
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-700 hover:bg-black/5 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-40 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={`px-4 py-3 rounded-xl text-center font-medium transition-colors ${activeSection === link.href.substring(1)
                                            ? 'bg-gray-100/50 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50/50 hover:text-gray-900'
                                        }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
