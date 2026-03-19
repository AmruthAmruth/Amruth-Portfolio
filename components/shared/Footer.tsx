'use client';

import { motion } from 'framer-motion';
import { personalInfo, socialLinks, contactEmail } from '@/constants/social';
import { ArrowUp, Mail } from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full relative bg-white overflow-hidden border-t border-slate-200/60 font-sans mt-auto">
            {/* Elegant Top Divider Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative z-10">

                {/* 1. Brand & Copyright */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center md:items-start gap-1"
                >
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={scrollToTop}>
                        <span className="font-bold text-slate-800 tracking-tight text-lg group-hover:text-blue-600 transition-colors duration-300">
                            {personalInfo.name}
                        </span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                        />
                    </div>
                    <span className="text-[13px] text-slate-400 font-medium tracking-tight">
                        © {new Date().getFullYear()} · Crafting Experiences
                    </span>
                </motion.div>

                {/* 2. Compact Links & Socials (Floating Pill) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-slate-50/80 rounded-2xl px-6 py-3 border border-slate-100/50 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ring-1 ring-white/50"
                >
                    {/* Mail */}
                    <a
                        href={`mailto:${contactEmail}`}
                        className="flex items-center gap-2 text-[14px] font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-300 group"
                    >
                        <Mail className="w-[14px] h-[14px] text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="hidden sm:inline">Connect</span>
                    </a>

                    <div className="w-px h-4 bg-slate-200 hidden sm:block" />

                    {/* Socials */}
                    <div className="flex items-center gap-5">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[14px] font-semibold text-slate-500 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5"
                                aria-label={link.ariaLabel}
                            >
                                {link.name.toLowerCase()}
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* 3. Status & Back to Top */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                >
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/50 border border-emerald-100/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Available</span>
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 hover:-translate-y-1 transition-all duration-500 group"
                        aria-label="Back to top"
                    >
                        <ArrowUp className="w-4 h-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
                    </button>
                </motion.div>
            </div>
        </footer>
    );
}
