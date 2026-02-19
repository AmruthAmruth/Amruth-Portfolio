'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { FormData } from '@/types';
import { generateMailtoLink } from '@/lib/mailto';
import { contactEmail } from '@/constants/social';

type Step = 'INIT' | 'NAME' | 'EMAIL' | 'MESSAGE' | 'SENDING' | 'SENT';

interface TerminalLine {
    type: 'system' | 'user' | 'error' | 'success';
    content: string;
}

export default function TransmissionForm() {
    const [step, setStep] = useState<Step>('INIT');
    const [history, setHistory] = useState<TerminalLine[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [loginTime, setLoginTime] = useState('');
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial system boot sequence
    useEffect(() => {
        setLoginTime(new Date().toLocaleDateString());
        const bootSequence = async () => {
            await addLine('system', 'Initializing Secure Uplink v4.2...');
            await new Promise(r => setTimeout(r, 600));
            await addLine('system', 'Connecting to secure server...');
            await new Promise(r => setTimeout(r, 800));
            await addLine('success', 'Connection Established.');
            await new Promise(r => setTimeout(r, 400));
            await addLine('system', 'Please authenticate to proceed.');
            setStep('NAME');
        };
        bootSequence();
    }, []);

    // Scroll to bottom on history update
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input on click
    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    const addLine = async (type: TerminalLine['type'], content: string) => {
        setHistory(prev => [...prev, { type, content }]);
    };

    const handleCommand = async (e: FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() && step !== 'MESSAGE') return; // Message can be empty? No, let's require it.

        const value = inputValue.trim();
        setInputValue('');

        // Echo user command
        setHistory(prev => [...prev, { type: 'user', content: value }]);

        switch (step) {
            case 'NAME':
                if (value.length < 2) {
                    addLine('error', 'Error: Name must be at least 2 characters.');
                    return;
                }
                setFormData(prev => ({ ...prev, name: value }));
                setStep('EMAIL');
                break;

            case 'EMAIL':
                if (!value.includes('@') || !value.includes('.')) {
                    addLine('error', 'Error: Invalid email format.');
                    return;
                }
                setFormData(prev => ({ ...prev, email: value }));
                setStep('MESSAGE');
                break;

            case 'MESSAGE':
                if (value.length < 5) {
                    addLine('error', 'Error: Message too short.');
                    return;
                }
                setFormData(prev => ({ ...prev, message: value }));
                setStep('SENDING');
                await processTransmission({ ...formData, message: value });
                break;
        }
    };

    const processTransmission = async (finalData: FormData) => {
        await addLine('system', 'Encrypting payload...');
        await new Promise(r => setTimeout(r, 800));
        await addLine('system', 'Uploading to mail server...');
        await new Promise(r => setTimeout(r, 1500));

        const mailtoLink = generateMailtoLink(finalData, contactEmail);
        window.location.href = mailtoLink;

        await addLine('success', 'Transmission Successful.');
        await addLine('system', 'Session terminated. Reload to start new session.');
        setStep('SENT');
    };

    const getPrompt = () => {
        switch (step) {
            case 'NAME': return 'Enter Name:';
            case 'EMAIL': return 'Enter Email:';
            case 'MESSAGE': return 'Enter Message:';
            default: return '';
        }
    };

    return (
        <div
            className="w-full max-w-3xl mx-auto font-mono text-sm md:text-base bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-gray-700"
            onClick={handleContainerClick}
        >
            {/* Terminal Header */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-700 select-none">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-gray-400 text-xs">guest@portfolio:~</div>
                <div className="w-14" />
            </div>

            {/* Terminal Window */}
            <div
                ref={containerRef}
                className="p-4 md:p-6 min-h-[400px] h-[50vh] overflow-y-auto custom-scrollbar bg-[#1e1e1e]/95 cursor-text text-gray-300 font-medium"
            >
                {/* Introduction */}
                <div className="mb-4 text-gray-500">
                    Last login: {loginTime} on ttys001
                </div>

                {/* History */}
                <div className="space-y-2">
                    {history.map((line, i) => (
                        <div key={i} className={`
                            ${line.type === 'error' ? 'text-red-400' :
                                line.type === 'success' ? 'text-green-400' :
                                    line.type === 'user' ? 'text-white' : 'text-gray-300'}
                        `}>
                            {line.type === 'user' ? (
                                <div className="flex gap-2">
                                    <span className="text-green-500">➜</span>
                                    <span className="text-blue-400">~</span>
                                    <span>{line.content}</span>
                                </div>
                            ) : (
                                <span>
                                    {line.type === 'system' && <span className="text-blue-500 mr-2">[SYS]</span>}
                                    {line.content}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Active Input Line */}
                {step !== 'INIT' && step !== 'SENDING' && step !== 'SENT' && (
                    <form onSubmit={handleCommand} className="mt-2 flex gap-2 items-center">
                        <span className="text-green-500">➜</span>
                        <div className="text-blue-400 whitespace-nowrap">
                            {step === 'NAME' ? 'auth' : step === 'EMAIL' ? 'set-email' : 'payload'}
                        </div>
                        <span className="text-gray-500 mr-1">:</span>
                        <span className="text-yellow-200 whitespace-nowrap">{getPrompt()}</span>

                        <div className="flex-1 relative">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-white p-0 m-0 caret-transparent"
                                autoComplete="off"
                            />
                            {/* Custom Block Cursor */}
                            <span className="absolute left-0 pointer-events-none">
                                {inputValue}
                                <span className="inline-block w-2.5 h-5 align-middle bg-gray-400 animate-pulse ml-[1px]" />
                            </span>
                        </div>
                    </form>
                )}

                {step === 'SENDING' && (
                    <div className="mt-2 text-yellow-400">
                        Processing request<span className="animate-pulse">...</span>
                    </div>
                )}


            </div>
        </div>
    );
}
