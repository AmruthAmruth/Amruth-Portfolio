'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/constants/social';
import {
    Code2, TerminalSquare, Database, Layers, Cpu,
    Copy, Check, RotateCcw, ChevronRight
} from 'lucide-react';
import FloatingBlobs from '@/components/shared/FloatingBlobs';
import { blobColors } from '@/constants/theme';
import SectionDivider from '@/components/shared/SectionDivider';

interface TerminalLine {
    id: string;
    type: 'command' | 'output';
    text: string | React.ReactNode;
}

interface CommandSequenceItem {
    command: string;
    output: React.ReactNode;
}

export default function HeroSlideTerminal() {
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
    const [currentTypedText, setCurrentTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [copied, setCopied] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const sequence: CommandSequenceItem[] = [
        {
            command: 'whoami',
            output: (
                <div className="pl-4 py-1 text-sm font-mono leading-relaxed select-text space-y-1">
                    <div>
                        <span className="text-neutral-400">Name:</span> <span className="text-emerald-400 font-bold">Amruth Shyju</span>
                    </div>
                    <div>
                        <span className="text-neutral-400">Role:</span> <span className="text-sky-300 font-semibold">Full Stack Developer</span>
                    </div>
                </div>
            )
        },
        {
            command: 'cat tagline.txt',
            output: (
                <div className="pl-4 py-1 text-sm font-mono leading-relaxed select-text">
                    <span className="text-emerald-400 font-semibold">&ldquo;Engineering Ideas Into Reality.&rdquo;</span>
                </div>
            )
        }
    ];

    // Sequence playback
    useEffect(() => {
        if (currentSequenceIndex >= sequence.length) return;

        const nextCmdItem = sequence[currentSequenceIndex];
        setIsTyping(true);
        setCurrentTypedText('');
        let charIndex = 0;

        const interval = setInterval(() => {
            if (charIndex < nextCmdItem.command.length) {
                setCurrentTypedText(nextCmdItem.command.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setHistory((prev) => [
                        ...prev,
                        { id: `cmd-${currentSequenceIndex}-${Date.now()}`, type: 'command', text: nextCmdItem.command },
                        { id: `out-${currentSequenceIndex}-${Date.now()}`, type: 'output', text: nextCmdItem.output }
                    ]);
                    setCurrentTypedText('');
                    setIsTyping(false);
                    setTimeout(() => {
                        setCurrentSequenceIndex((prev) => prev + 1);
                    }, 600);
                }, 200);
            }
        }, 45);

        return () => clearInterval(interval);
    }, [currentSequenceIndex]);

    const restartSequence = () => {
        setHistory([]);
        setCurrentSequenceIndex(0);
        setCurrentTypedText('');
        setIsTyping(false);
    };

    const handleRunManualCommand = (cmdText: string) => {
        if (isTyping) return;

        if (cmdText === 'clear') {
            setHistory([]);
            return;
        }

        let actualCommand = cmdText;
        let matchedOutput: React.ReactNode = null;

        if (cmdText === 'whoami') {
            actualCommand = 'whoami';
            matchedOutput = sequence[0].output;
        } else if (cmdText === 'tagline') {
            actualCommand = 'cat tagline.txt';
            matchedOutput = sequence[1].output;
        }

        setIsTyping(true);
        setCurrentTypedText('');
        let charIndex = 0;

        const interval = setInterval(() => {
            if (charIndex < actualCommand.length) {
                setCurrentTypedText(actualCommand.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setHistory((prev) => [
                        ...prev,
                        { id: `manual-cmd-${Date.now()}`, type: 'command', text: actualCommand },
                        { id: `manual-out-${Date.now()}`, type: 'output', text: matchedOutput }
                    ]);
                    setCurrentTypedText('');
                    setIsTyping(false);
                }, 200);
            }
        }, 40);
    };

    const handleCopy = () => {
        const textToCopy = "Amruth Shyju - Full Stack Developer | Engineering Ideas Into Reality.";
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isInitialSequenceDone = currentSequenceIndex >= sequence.length;

    const renderHighlightCommand = (cmdText: string) => {
        const parts = cmdText.split(' ');
        if (parts.length === 0) return null;
        const mainCmd = parts[0];
        const args = parts.slice(1).join(' ');

        return (
            <>
                <span className="text-[#a7f3d0] font-semibold">{mainCmd}</span>
                {args && <span className="text-white"> {args}</span>}
            </>
        );
    };

    // Authentic macOS Terminal zsh prompt
    const renderPrompt = () => (
        <div className="flex items-center gap-1 select-none font-mono text-sm">
            <span className="text-[#34d399] font-bold">amruth@shyju-mbp</span>
            <span className="text-neutral-400">:</span>
            <span className="text-[#38bdf8] font-bold">~</span>
            <span className="text-white font-semibold">%</span>
        </div>
    );

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden" id="launch">
            {/* Animated Floating Blobs background */}
            <FloatingBlobs colors={blobColors.hero} variant="hero" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-16 items-center pt-24 pb-16 lg:py-20">

                {/* Left Column: Simple, Clean & Meaningful Intro */}
                <div className="text-center lg:text-left flex flex-col items-center lg:items-start justify-center h-full max-w-xl lg:max-w-none mx-auto lg:mx-0">
                    
                    {/* Status Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-800 mb-6 shadow-sm"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="font-mono text-xs font-semibold tracking-wide text-gray-700">
                            Amruth Shyju • Full Stack Developer
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.15]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Building High-Performance <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                            Web & Backend Systems.
                        </span>
                    </motion.h1>

                    {/* Short Description */}
                    <motion.p
                        className="text-base sm:text-lg text-gray-600 mb-8 font-normal leading-relaxed max-w-lg px-2 sm:px-0"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Full Stack Developer building clean, scalable, and resilient digital applications with modern tools and an engineering-first mindset.
                    </motion.p>

                    {/* CTAs and Social Links */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-10 w-full sm:w-auto"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <button
                            onClick={() => document.getElementById('origin')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative w-full sm:w-auto px-7 py-3.5 bg-gray-900 text-white text-base font-medium rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Explore My Work
                                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        <div className="flex items-center justify-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 hover:scale-110"
                                    aria-label={social.ariaLabel}
                                >
                                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Powered By Stack Icons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="hidden sm:block"
                    >
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 text-center lg:text-left">
                            Built With Modern Tools
                        </p>
                        <div className="flex justify-center lg:justify-start gap-4 text-gray-400">
                            <div className="group relative">
                                <Code2 className="w-5 h-5 hover:text-[#61DAFB] transition-colors duration-300 cursor-pointer" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono whitespace-nowrap">React</span>
                            </div>
                            <div className="group relative">
                                <Cpu className="w-5 h-5 hover:text-[#000000] transition-colors duration-300 cursor-pointer" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono whitespace-nowrap">Next.js</span>
                            </div>
                            <div className="group relative">
                                <Layers className="w-5 h-5 hover:text-[#3178C6] transition-colors duration-300 cursor-pointer" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono whitespace-nowrap">TypeScript</span>
                            </div>
                            <div className="group relative">
                                <TerminalSquare className="w-5 h-5 hover:text-[#339933] transition-colors duration-300 cursor-pointer" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono whitespace-nowrap">Node.js</span>
                            </div>
                            <div className="group relative">
                                <Database className="w-5 h-5 hover:text-[#4169E1] transition-colors duration-300 cursor-pointer" />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-mono whitespace-nowrap">PostgreSQL</span>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Right Column: Authentic & Natural macOS Terminal View Model */}
                <motion.div
                    className="w-full flex items-center justify-center font-mono"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative w-full max-w-xl lg:max-w-2xl">
                        {/* Soft Ambient Window Shadow */}
                        <div className="absolute -inset-2 bg-black/5 rounded-2xl blur-lg -z-20" />
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10 opacity-50" />

                        {/* macOS Terminal Window Frame */}
                        <div className="overflow-hidden rounded-xl bg-[#1c1c1e] border border-neutral-800 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.65)] flex flex-col min-h-[300px]">
                            
                            {/* Window Titlebar */}
                            <div className="flex items-center px-4 h-10 bg-[#2d2d30] border-b border-neutral-900/50 flex-shrink-0 select-none">
                                {/* Window Traffic Light Buttons */}
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#ff5f56]/10 cursor-pointer" onClick={() => setHistory([])} title="Clear" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#ffbd2e]/10 cursor-pointer" onClick={restartSequence} title="Restart" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#27c93f]/10 cursor-pointer" onClick={restartSequence} title="Replay" />
                                </div>
                                {/* Window Title */}
                                <div className="flex-1 text-center text-xs text-neutral-400 font-sans font-medium pr-10">
                                    amruth — zsh — 80×24
                                </div>
                                {/* Header Tools */}
                                <div className="flex items-center gap-2 text-neutral-400">
                                    <button
                                        onClick={handleCopy}
                                        className="p-1 hover:text-white transition-colors duration-150 rounded"
                                        title="Copy"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    <button
                                        onClick={restartSequence}
                                        className="p-1 hover:text-white transition-colors duration-150 rounded"
                                        title="Replay"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Shell Terminal Body */}
                            <div 
                                ref={containerRef}
                                className="flex-1 p-6 text-sm text-[#e4e4e7] space-y-3 font-mono overflow-hidden"
                            >
                                {/* macOS Terminal Login Banner */}
                                <div className="text-neutral-500 text-xs select-none mb-2">
                                    Last login: {new Date().toDateString()} on ttys001
                                </div>

                                {/* History Lines */}
                                {history.map((line) => (
                                    <div key={line.id} className="space-y-1">
                                        {line.type === 'command' ? (
                                            <div className="flex items-start gap-2 select-none">
                                                {renderPrompt()}
                                                <span className="font-medium text-white">{renderHighlightCommand(line.text as string)}</span>
                                            </div>
                                        ) : (
                                            <div>{line.text}</div>
                                        )}
                                    </div>
                                ))}

                                {/* Live typing input line */}
                                {isTyping && currentTypedText && (
                                    <div className="flex items-start gap-2 select-none">
                                        {renderPrompt()}
                                        <span className="font-medium text-white">
                                            {renderHighlightCommand(currentTypedText)}
                                            <span className="inline-block w-[8px] h-[15px] ml-0.5 bg-[#38bdf8] animate-pulse align-middle" />
                                        </span>
                                    </div>
                                )}

                                {/* zsh autocompletion menu suggestions */}
                                {!isTyping && isInitialSequenceDone && (
                                    <div className="space-y-2 pt-1 border-t border-neutral-800/40">
                                        {/* Blank Prompt with blinking cursor */}
                                        <div className="flex items-start gap-2 select-none">
                                            {renderPrompt()}
                                            <span className="inline-block w-[8px] h-[15px] bg-neutral-400 animate-pulse align-middle" />
                                        </div>

                                        {/* zsh Tab completions listing */}
                                        <div className="pl-2 text-xs select-none">
                                            <div className="text-neutral-500 mb-1 text-[10px] uppercase tracking-wider font-semibold">
                                                zsh completions: (click to execute)
                                            </div>
                                            <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-2 text-neutral-400">
                                                {[
                                                    { label: 'whoami', cmd: 'whoami' },
                                                    { label: 'cat tagline.txt', cmd: 'tagline' },
                                                    { label: 'clear', cmd: 'clear' }
                                                ].map((item) => (
                                                    <button
                                                        key={item.label}
                                                        disabled={isTyping}
                                                        onClick={() => handleRunManualCommand(item.cmd)}
                                                        className="hover:text-[#34d399] hover:underline transition-colors duration-150 py-0.5 cursor-pointer font-mono text-xs font-semibold"
                                                    >
                                                        {item.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Bottom Section Divider */}
            <SectionDivider position="bottom" color="#ffffff" />
        </div>
    );
}
