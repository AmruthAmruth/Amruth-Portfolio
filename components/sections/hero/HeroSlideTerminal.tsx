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

interface HistoryItem {
    id: string;
    command: string;
    line1?: string;
    line2?: string;
}

export default function HeroSlideTerminal() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    
    // Active typing state for typewriter effect
    const [currentCommandText, setCurrentCommandText] = useState('');
    const [currentLine1Text, setCurrentLine1Text] = useState('');
    const [currentLine2Text, setCurrentLine2Text] = useState('');
    const [typingStage, setTypingStage] = useState<'cmd' | 'line1' | 'line2' | 'idle'>('cmd');
    
    const [currentSeq, setCurrentSeq] = useState(0); // 0 = whoami, 1 = tagline, 2 = done
    const [isAnimating, setIsAnimating] = useState(true);
    const [copied, setCopied] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Initial sequential typewriter playback
    useEffect(() => {
        if (!isAnimating) return;

        if (currentSeq === 0) {
            const cmdTarget = 'whoami';
            const line1Target = 'Name: Amruth Shyju';
            const line2Target = 'Role: Full Stack Developer';

            let cmdIdx = 0;
            let l1Idx = 0;
            let l2Idx = 0;

            setTypingStage('cmd');
            setCurrentCommandText('');

            const cmdInterval = setInterval(() => {
                if (cmdIdx < cmdTarget.length) {
                    setCurrentCommandText(cmdTarget.substring(0, cmdIdx + 1));
                    cmdIdx++;
                } else {
                    clearInterval(cmdInterval);
                    setTimeout(() => {
                        setTypingStage('line1');
                        setCurrentLine1Text('');

                        const l1Interval = setInterval(() => {
                            if (l1Idx < line1Target.length) {
                                setCurrentLine1Text(line1Target.substring(0, l1Idx + 1));
                                l1Idx++;
                            } else {
                                clearInterval(l1Interval);
                                setTimeout(() => {
                                    setTypingStage('line2');
                                    setCurrentLine2Text('');

                                    const l2Interval = setInterval(() => {
                                        if (l2Idx < line2Target.length) {
                                            setCurrentLine2Text(line2Target.substring(0, l2Idx + 1));
                                            l2Idx++;
                                        } else {
                                            clearInterval(l2Interval);
                                            setTimeout(() => {
                                                setHistory(prev => [
                                                    ...prev,
                                                    { id: `seq-0-${Date.now()}`, command: cmdTarget, line1: line1Target, line2: line2Target }
                                                ]);
                                                setCurrentCommandText('');
                                                setCurrentLine1Text('');
                                                setCurrentLine2Text('');
                                                setTypingStage('idle');
                                                setTimeout(() => setCurrentSeq(1), 400);
                                            }, 200);
                                        }
                                    }, 20);
                                }, 150);
                            }
                        }, 20);
                    }, 200);
                }
            }, 45);

            return () => clearInterval(cmdInterval);

        } else if (currentSeq === 1) {
            const cmdTarget = 'cat tagline.txt';
            const line1Target = '"Engineering Ideas Into Reality."';

            let cmdIdx = 0;
            let l1Idx = 0;

            setTypingStage('cmd');
            setCurrentCommandText('');

            const cmdInterval = setInterval(() => {
                if (cmdIdx < cmdTarget.length) {
                    setCurrentCommandText(cmdTarget.substring(0, cmdIdx + 1));
                    cmdIdx++;
                } else {
                    clearInterval(cmdInterval);
                    setTimeout(() => {
                        setTypingStage('line1');
                        setCurrentLine1Text('');

                        const l1Interval = setInterval(() => {
                            if (l1Idx < line1Target.length) {
                                setCurrentLine1Text(line1Target.substring(0, l1Idx + 1));
                                l1Idx++;
                            } else {
                                clearInterval(l1Interval);
                                setTimeout(() => {
                                    setHistory(prev => [
                                        ...prev,
                                        { id: `seq-1-${Date.now()}`, command: cmdTarget, line1: line1Target }
                                    ]);
                                    setCurrentCommandText('');
                                    setCurrentLine1Text('');
                                    setTypingStage('idle');
                                    setIsAnimating(false);
                                    setCurrentSeq(2);
                                }, 200);
                            }
                        }, 20);
                    }, 200);
                }
            }, 40);

            return () => clearInterval(cmdInterval);
        }
    }, [currentSeq, isAnimating]);

    const restartSequence = () => {
        setHistory([]);
        setCurrentCommandText('');
        setCurrentLine1Text('');
        setCurrentLine2Text('');
        setTypingStage('idle');
        setCurrentSeq(0);
        setIsAnimating(true);
    };

    const handleRunManualCommand = (cmdKey: string) => {
        if (typingStage !== 'idle' || isAnimating) return;

        if (cmdKey === 'clear') {
            setHistory([]);
            return;
        }

        let cmdTarget = '';
        let line1Target = '';
        let line2Target: string | undefined = undefined;

        if (cmdKey === 'whoami') {
            cmdTarget = 'whoami';
            line1Target = 'Name: Amruth Shyju';
            line2Target = 'Role: Full Stack Developer';
        } else if (cmdKey === 'tagline') {
            cmdTarget = 'cat tagline.txt';
            line1Target = '"Engineering Ideas Into Reality."';
        }

        setTypingStage('cmd');
        setCurrentCommandText('');

        let cmdIdx = 0;
        let l1Idx = 0;
        let l2Idx = 0;

        const cmdInterval = setInterval(() => {
            if (cmdIdx < cmdTarget.length) {
                setCurrentCommandText(cmdTarget.substring(0, cmdIdx + 1));
                cmdIdx++;
            } else {
                clearInterval(cmdInterval);
                setTimeout(() => {
                    setTypingStage('line1');
                    setCurrentLine1Text('');

                    const l1Interval = setInterval(() => {
                        if (l1Idx < line1Target.length) {
                            setCurrentLine1Text(line1Target.substring(0, l1Idx + 1));
                            l1Idx++;
                        } else {
                            clearInterval(l1Interval);
                            if (line2Target) {
                                setTimeout(() => {
                                    setTypingStage('line2');
                                    setCurrentLine2Text('');

                                    const l2Interval = setInterval(() => {
                                        if (l2Idx < line2Target.length) {
                                            setCurrentLine2Text(line2Target.substring(0, l2Idx + 1));
                                            l2Idx++;
                                        } else {
                                            clearInterval(l2Interval);
                                            setTimeout(() => {
                                                setHistory(prev => [
                                                    ...prev,
                                                    { id: `manual-${Date.now()}`, command: cmdTarget, line1: line1Target, line2: line2Target }
                                                ]);
                                                setCurrentCommandText('');
                                                setCurrentLine1Text('');
                                                setCurrentLine2Text('');
                                                setTypingStage('idle');
                                            }, 150);
                                        }
                                    }, 20);
                                }, 100);
                            } else {
                                setTimeout(() => {
                                    setHistory(prev => [
                                        ...prev,
                                        { id: `manual-${Date.now()}`, command: cmdTarget, line1: line1Target }
                                    ]);
                                    setCurrentCommandText('');
                                    setCurrentLine1Text('');
                                    setTypingStage('idle');
                                }, 150);
                            }
                        }
                    }, 20);
                }, 150);
            }
        }, 35);
    };

    const handleCopy = () => {
        const textToCopy = "Amruth Shyju - Full Stack Developer | Engineering Ideas Into Reality.";
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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

    const renderFormattedOutputLine = (lineStr: string) => {
        if (lineStr.startsWith('Name:')) {
            const val = lineStr.replace('Name:', '');
            return (
                <div>
                    <span className="text-neutral-400">Name:</span>
                    <span className="text-emerald-400 font-bold">{val}</span>
                </div>
            );
        } else if (lineStr.startsWith('Role:')) {
            const val = lineStr.replace('Role:', '');
            return (
                <div>
                    <span className="text-neutral-400">Role:</span>
                    <span className="text-sky-300 font-semibold">{val}</span>
                </div>
            );
        } else if (lineStr.startsWith('"Engineering')) {
            return (
                <div>
                    <span className="text-emerald-400 font-semibold">{lineStr}</span>
                </div>
            );
        }
        return <div>{lineStr}</div>;
    };

    const renderPrompt = () => (
        <div className="flex items-center gap-1 select-none font-mono text-xs sm:text-sm shrink-0">
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
                        className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.15]"
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
                            <div className="flex items-center px-3 sm:px-4 h-10 bg-[#2d2d30] border-b border-neutral-900/50 flex-shrink-0 select-none justify-between">
                                {/* Window Traffic Light Buttons */}
                                <div className="flex gap-2 shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#ff5f56]/10 cursor-pointer" onClick={() => setHistory([])} title="Clear" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#ffbd2e]/10 cursor-pointer" onClick={restartSequence} title="Restart" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#27c93f]/10 cursor-pointer" onClick={restartSequence} title="Replay" />
                                </div>
                                {/* Window Title */}
                                <div className="text-center text-[11px] sm:text-xs text-neutral-400 font-sans font-medium truncate px-2">
                                    amruth — zsh
                                </div>
                                {/* Header Tools */}
                                <div className="flex items-center gap-2 text-neutral-400 shrink-0">
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
                                className="flex-1 p-4 sm:p-6 text-xs sm:text-sm text-[#e4e4e7] space-y-3 font-mono overflow-x-auto custom-scrollbar"
                            >
                                {/* macOS Terminal Login Banner */}
                                <div className="text-neutral-500 text-xs select-none mb-2">
                                    Last login: {new Date().toDateString()} on ttys001
                                </div>

                                {/* History Lines (Completed typed outputs) */}
                                {history.map((item) => (
                                    <div key={item.id} className="space-y-1">
                                        <div className="flex items-start gap-2 select-none">
                                            {renderPrompt()}
                                            <span className="font-medium text-white">{renderHighlightCommand(item.command)}</span>
                                        </div>
                                        {item.line1 && (
                                            <div className="pl-4 py-0.5">
                                                {renderFormattedOutputLine(item.line1)}
                                            </div>
                                        )}
                                        {item.line2 && (
                                            <div className="pl-4 py-0.5">
                                                {renderFormattedOutputLine(item.line2)}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Live Typewriter Animation Line */}
                                {typingStage !== 'idle' && (
                                    <div className="space-y-1">
                                        {/* Typing Command */}
                                        {typingStage === 'cmd' && (
                                            <div className="flex items-start gap-2 select-none">
                                                {renderPrompt()}
                                                <span className="font-medium text-white">
                                                    {renderHighlightCommand(currentCommandText)}
                                                    <span className="inline-block w-[8px] h-[15px] ml-0.5 bg-[#38bdf8] animate-pulse align-middle" />
                                                </span>
                                            </div>
                                        )}

                                        {/* Command finished, typing line 1 */}
                                        {typingStage === 'line1' && (
                                            <>
                                                <div className="flex items-start gap-2 select-none">
                                                    {renderPrompt()}
                                                    <span className="font-medium text-white">{renderHighlightCommand(currentCommandText || (currentSeq === 0 ? 'whoami' : 'cat tagline.txt'))}</span>
                                                </div>
                                                <div className="pl-4 py-0.5">
                                                    {renderFormattedOutputLine(currentLine1Text)}
                                                    <span className="inline-block w-[8px] h-[15px] ml-0.5 bg-[#34d399] animate-pulse align-middle" />
                                                </div>
                                            </>
                                        )}

                                        {/* Line 1 finished, typing line 2 */}
                                        {typingStage === 'line2' && (
                                            <>
                                                <div className="flex items-start gap-2 select-none">
                                                    {renderPrompt()}
                                                    <span className="font-medium text-white">{renderHighlightCommand(currentCommandText || 'whoami')}</span>
                                                </div>
                                                <div className="pl-4 py-0.5">
                                                    {renderFormattedOutputLine(currentLine1Text || 'Name: Amruth Shyju')}
                                                </div>
                                                <div className="pl-4 py-0.5">
                                                    {renderFormattedOutputLine(currentLine2Text)}
                                                    <span className="inline-block w-[8px] h-[15px] ml-0.5 bg-[#38bdf8] animate-pulse align-middle" />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* zsh autocompletion menu suggestions */}
                                {typingStage === 'idle' && !isAnimating && (
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
                                                        disabled={typingStage !== 'idle'}
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
