'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MacWindowProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export default function MacWindow({ children, className = '', title = 'portfolio-deployments' }: MacWindowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col ${className}`}
        >
            {/* Window Header */}
            <div className="bg-gray-50/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
                {/* Traffic Lights */}
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>

                {/* Title */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 opacity-70">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        {title}
                    </span>
                </div>

                {/* Empty right side for balance */}
                <div className="w-14" />
            </div>

            {/* Window Content */}
            <div className="bg-white flex-1 overflow-auto">
                {children}
            </div>
        </motion.div>
    );
}
