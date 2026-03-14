'use client';

import { motion } from 'framer-motion';
import { personalInfo, socialLinks, contactEmail } from '@/constants/social';
import { ArrowUp, Mail } from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const internalNav = [
        { name: 'Launch', id: 'launch' },
        { name: 'Origin', id: 'origin' },
        { name: 'Toolkit', id: 'toolkit' },
        { name: 'Builds', id: 'builds' },
        { name: 'Journey', id: 'journey' },
        { name: 'Connect', id: 'connect' },
    ];

    return (
        <footer className="w-full bg-[#0a0a0a] border-t border-white/5 py-12 md:py-16 relative overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/[0.02] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
                    {/* Identity & Tagline */}
                    <div className="max-w-sm space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-tighter mb-2">
                                {personalInfo.name.toUpperCase()}<span className="text-blue-500">.</span>
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-mono">
                                {personalInfo.tagline}
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <a 
                                href={`mailto:${contactEmail}`}
                                className="inline-flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors group"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span>{contactEmail}</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-4 font-mono">
                        <div className="contents">
                            {internalNav.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-[11px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors text-left"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Social Uplinks */}
                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all flex items-center justify-center text-gray-400 hover:text-white"
                                aria-label={link.ariaLabel}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={link.icon} />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                        <span>© 2026 {personalInfo.name.split(' ')[0]}</span>
                        <span className="w-1 h-1 bg-gray-800 rounded-full" />
                        <span>System Stable</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <button 
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
                        >
                            <span>Origin Point</span>
                            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
