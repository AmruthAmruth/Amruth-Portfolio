'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/constants/social';
import {
    Code2, TerminalSquare, Database, Layers, Cpu,
    Copy, Check, RotateCcw, ChevronRight, GitBranch, Terminal as TerminalIcon
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

    const terminalEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const sequence: CommandSequenceItem[] = [
        {
            command: 'whoami',
            output: (
                <div className="text-neutral-200 pl-3 sm:pl-4 py-2 font-mono text-xs sm:text-sm leading-relaxed select-text space-y-2 bg-[#17181c]/80 rounded-lg border border-neutral-800/80 p-3 my-1">
                    <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-semibold w-14">Name:</span>
                        <span className="text-emerald-400 font-bold text-sm sm:text-base tracking-wide">Amruth Shyju</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-semibold w-14">Role:</span>
                        <span className="text-sky-300 font-semibold text-sm sm:text-base">Full Stack Developer</span>
                    </div>
                </div>
            )
        },
        {
            command: 'cat workflow.txt',
            output: (
                <div className="pl-3 sm:pl-4 py-2.5 font-mono text-xs sm:text-sm leading-relaxed select-text my-1.5 bg-[#17181c]/80 p-3.5 rounded-lg border border-neutral-800/80 flex items-center justify-start gap-2.5 sm:gap-3 flex-wrap">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Design
                    </span>
                    <span className="text-neutral-500 font-bold text-sm">➔</span>
                    <span className="px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 font-bold border border-sky-500/20 shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                        Build
                    </span>
                    <span className="text-neutral-500 font-bold text-sm">➔</span>
                    <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20 shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                        Deploy
                    </span>
                </div>
            )
        }
    ];

    // Scroll handling
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, currentTypedText, isTyping]);

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
        } else if (cmdText === 'workflow') {
            actualCommand = 'cat workflow.txt';
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
        const textToCopy = "Amruth Shyju - Full Stack Developer | Design ➔ Build ➔ Deploy";
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
                <span className="text-[#34d399] font-bold">{mainCmd}</span>
                {args && <span className="text-[#38bdf8]"> {args}</span>}
            </>
        );
    };

    // Authentic Starship / Powerline ZSH Prompt
    const renderPrompt = () => (
        <div className="flex items-center gap-1.5 select-none font-mono text-xs sm:text-sm">
            <span className="text-emerald-400 font-bold">➜</span>
            <span className="text-sky-400 font-bold">~</span>
            <span className="text-neutral-300 font-semibold">amruth@shyju-mbp</span>
            <span className="text-purple-400 flex items-center gap-0.5 text-[11px] font-mono bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                <GitBranch className="w-3 h-3 inline text-purple-400" />
                <span>main</span>
            </span>
        </div>
    );

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden" id="launch">
            {/* Animated Floating Blobs background */}
            <FloatingBlobs colors={blobColors.hero} variant="hero" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center pt-24 pb-16 lg:py-20">

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

                {/* Right Column: Ultra-Realistic Developer Terminal View Model */}
                <motion.div
                    className="w-full flex items-center justify-center font-mono"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative w-full max-w-lg lg:max-w-xl">
                        {/* Glow & Backdrop Shadow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-sky-500/10 to-purple-500/20 rounded-2xl blur-xl -z-10 opacity-75 animate-pulse" />

                        {/* macOS / iTerm2 Style Terminal Frame */}
                        <div className="overflow-hidden rounded-xl bg-[#0f1015] border border-neutral-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] flex flex-col h-[360px]">
                            
                            {/* Terminal Window Titlebar */}
                            <div className="flex items-center justify-between px-4 h-10 bg-[#181920] border-b border-neutral-800/80 flex-shrink-0 select-none">
                                {/* Traffic Lights controls with inner light reflection */}
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#ff5f56]/30 cursor-pointer hover:brightness-110 shadow-[0_0_8px_rgba(255,95,86,0.4)]" onClick={() => setHistory([])} title="Clear Terminal" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#ffbd2e]/30 cursor-pointer hover:brightness-110 shadow-[0_0_8px_rgba(255,189,46,0.4)]" onClick={restartSequence} title="Restart Sequence" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#27c93f]/30 cursor-pointer hover:brightness-110 shadow-[0_0_8px_rgba(39,201,63,0.4)]" onClick={restartSequence} title="Replay" />
                                </div>

                                {/* Active Tab Header */}
                                <div className="flex items-center gap-2 text-xs text-neutral-300 font-mono font-medium bg-[#0f1015] px-3 py-1 rounded-t-md border-t border-x border-neutral-800 -mb-2">
                                    <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>zsh — amruth@shyju-mbp</span>
                                </div>

                                {/* Top Right Header Tools */}
                                <div className="flex items-center gap-2.5 text-neutral-400">
                                    <button
                                        onClick={handleCopy}
                                        className="p-1 hover:text-white transition-colors duration-150 rounded hover:bg-neutral-800"
                                        title="Copy Output"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    <button
                                        onClick={restartSequence}
                                        className="p-1 hover:text-white transition-colors duration-150 rounded hover:bg-neutral-800"
                                        title="Replay Execution"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Shell Terminal Body */}
                            <div 
                                ref={containerRef}
                                className="flex-1 overflow-y-auto p-5 text-xs sm:text-sm text-[#e4e4e7] custom-scrollbar space-y-3.5 font-mono bg-[#0f1015]"
                            >
                                {/* Login banner */}
                                <div className="text-neutral-500 text-[11px] select-none flex items-center justify-between border-b border-neutral-800/40 pb-2 mb-1">
                                    <span>Last login: {new Date().toDateString()} on ttys001</span>
                                    <span className="text-neutral-600 text-[10px]">zsh 5.9 (x86_64-apple-darwin22.0)</span>
                                </div>

                                {/* Command Output History */}
                                {history.map((line) => (
                                    <div key={line.id} className="space-y-1.5">
                                        {line.type === 'command' ? (
                                            <div className="flex items-start gap-2 select-none pt-1">
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
                                    <div className="flex items-start gap-2 select-none pt-1">
                                        {renderPrompt()}
                                        <span className="font-medium text-white">
                                            {renderHighlightCommand(currentTypedText)}
                                            <span className="inline-block w-[8px] h-[15px] ml-0.5 bg-[#38bdf8] animate-pulse align-middle" />
                                        </span>
                                    </div>
                                )}

                                {/* Interactive Completion Chips */}
                                {!isTyping && isInitialSequenceDone && (
                                    <div className="space-y-2 pt-2 border-t border-neutral-800/60">
                                        <div className="flex items-start gap-2 select-none">
                                            {renderPrompt()}
                                            <span className="inline-block w-[8px] h-[15px] bg-emerald-400 animate-pulse align-middle" />
                                        </div>

                                        <div className="pl-1 text-xs select-none">
                                            <div className="text-neutral-500 mb-1 text-[10px] uppercase tracking-wider font-bold">
                                                zsh completions (click to execute):
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-1.5">
                                                {[
                                                    { label: 'whoami', cmd: 'whoami' },
                                                    { label: 'cat workflow.txt', cmd: 'workflow' },
                                                    { label: 'clear', cmd: 'clear' }
                                                ].map((item) => (
                                                    <button
                                                        key={item.label}
                                                        disabled={isTyping}
                                                        onClick={() => handleRunManualCommand(item.cmd)}
                                                        className="px-2.5 py-1 rounded bg-[#181920] hover:bg-[#22242e] text-neutral-300 hover:text-emerald-400 transition-colors duration-150 font-mono text-[11px] font-semibold border border-neutral-800 flex items-center gap-1 cursor-pointer shadow-sm"
                                                    >
                                                        <span className="text-neutral-500">$</span>
                                                        <span>{item.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={terminalEndRef} />
                            </div>

                            {/* Tmux / Warp Status Footer Line */}
                            <div className="px-4 py-1.5 bg-[#14151b] border-t border-neutral-800/80 flex items-center justify-between text-[10px] text-neutral-400 font-mono select-none flex-shrink-0">
                                <div className="flex items-center gap-3">
                                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">NORMAL</span>
                                    <span>zsh 5.9</span>
                                    <span className="hidden sm:inline text-neutral-500">UTF-8</span>
                                </div>
                                <div className="flex items-center gap-3 text-neutral-400">
                                    <span className="text-sky-400">⚡ 100% online</span>
                                </div>
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
