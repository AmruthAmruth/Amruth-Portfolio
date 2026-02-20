'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
    // Simulated System Stats
    const [stats, setStats] = useState({
        cpu: 12,
        memory: 42,
        network: 'IDLE',
        uptime: '0h 0m 0s',
        time: ''
    });

    const [inputCmd, setInputCmd] = useState('');
    const [cmdOutput, setCmdOutput] = useState<string | null>(null);

    // Update stats simulation
    useEffect(() => {
        const startTime = Date.now();

        const interval = setInterval(() => {
            const now = new Date();
            const uptimeDiff = now.getTime() - startTime;
            const hours = Math.floor(uptimeDiff / 3600000);
            const minutes = Math.floor((uptimeDiff % 3600000) / 60000);
            const seconds = Math.floor((uptimeDiff % 60000) / 1000);

            // Time string
            const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

            setStats(prev => ({
                cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() * 10 - 5))).toFixed(1) as any,
                memory: Math.max(20, Math.min(80, prev.memory + (Math.random() * 4 - 2))).toFixed(1) as any,
                network: Math.random() > 0.8 ? 'RX_PACKET' : 'IDLE',
                uptime: `${hours}h ${minutes}m ${seconds}s`,
                time: timeString
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = inputCmd.trim().toLowerCase();

        if (cmd === 'help') {
            setCmdOutput('Available commands: home, work, stack, contact, clear');
        } else if (['home', 'hero'].includes(cmd)) {
            scrollToSection('hero');
            setCmdOutput('Navigating to HOME...');
        } else if (['work', 'projects'].includes(cmd)) {
            scrollToSection('work');
            setCmdOutput('Navigating to WORK...');
        } else if (['stack', 'skills'].includes(cmd)) {
            scrollToSection('stack');
            setCmdOutput('Navigating to STACK...');
        } else if (['contact', 'email'].includes(cmd)) {
            scrollToSection('collaborate');
            setCmdOutput('Navigating to CONTACT...');
        } else if (cmd === 'clear') {
            setCmdOutput(null);
        } else {
            setCmdOutput(`Command not found: ${cmd}. Try "help".`);
        }
        setInputCmd('');

        // Clear output after delay
        if (cmd !== 'clear') {
            setTimeout(() => setCmdOutput(null), 3000);
        }
    };

    const navLinks = [
        { name: '/HOME', id: 'hero' },
        { name: '/ORIGIN', id: 'origin' },
        { name: '/WORK', id: 'work' },
        { name: '/STACK', id: 'stack' },
        { name: '/CONTACT', id: 'collaborate' },
    ];

    const socialLinks = [
        { name: 'GITHUB', port: '22', status: 'OPEN', url: 'https://github.com/amruth-amruth' },
        { name: 'LINKEDIN', port: '443', status: 'SECURE', url: 'https://linkedin.com/in/amruth-k-b-560641238' },
        { name: 'MAIL', port: '25', status: 'READY', url: 'mailto:amruthkb10@gmail.com' }
    ];

    return (
        <footer className="w-full bg-[#050505] border-t border-gray-800 text-gray-400 font-mono select-none relative z-50">

            {/* Command Center / Main Dashboard */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-b border-gray-800">

                {/* Column 1: Identity Module */}
                <div className="p-6 sm:p-8 border-b sm:border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                    <div>
                        <div className="text-xs text-blue-400 font-bold tracking-widest mb-2">ID_MODULE</div>
                        <h3 className="text-3xl text-white font-bold tracking-tighter mb-1">AMRUTH</h3>
                        <p className="text-sm text-gray-400">FULL_STACK_DEV</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-green-400 bg-green-900/10 px-2 py-1 rounded w-fit border border-green-900/30">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            STATUS: AVAILABLE
                        </div>
                        <div className="text-xs text-gray-500">LOC: BENGALURU, IN</div>
                    </div>
                </div>

                {/* Column 2: System Navigation (Interactive CLI) */}
                <div className="p-6 sm:p-8 border-b sm:border-b md:border-b-0 md:border-r border-gray-800 hover:bg-white/[0.02] transition-colors flex flex-col">
                    <div className="text-xs text-purple-400 font-bold tracking-widest mb-6">SYS_NAVIGATION</div>

                    <ul className="space-y-2 mb-6 flex-1">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-xs text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
                                >
                                    <span className="text-purple-500 opacity-50 group-hover:opacity-100">{`>`}</span>
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* CLI Input */}
                    <form onSubmit={handleCommand} className="relative mt-auto">
                        <div className="absolute -top-6 left-0 text-xs text-purple-300 h-4">
                            {cmdOutput && <span className="animate-pulse">{cmdOutput}</span>}
                        </div>
                        <div className="flex items-center gap-2 bg-gray-900/50 border border-gray-700 px-2 py-1.5 rounded focus-within:border-purple-500 focus-within:bg-gray-900 transition-colors">
                            <span className="text-green-500 text-xs">admin@portfolio:~$</span>
                            <input
                                type="text"
                                value={inputCmd}
                                onChange={(e) => setInputCmd(e.target.value)}
                                className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-gray-600"
                                placeholder="type 'help'..."
                            />
                        </div>
                    </form>
                </div>

                {/* Column 3: External Uplinks */}
                <div className="p-6 sm:p-8 border-b sm:border-b md:border-b-0 md:border-r border-gray-800 hover:bg-white/[0.02] transition-colors flex flex-col">
                    <div className="text-xs text-yellow-500 font-bold tracking-widest mb-6">EXT_UPLINKS</div>
                    <div className="flex flex-col gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-3 border border-gray-800 bg-gray-900/30 hover:bg-gray-800 hover:border-gray-600 transition-all group"
                            >
                                <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{link.name}</span>
                                <span className="text-[10px] text-gray-500 group-hover:text-yellow-400 transition-colors font-mono">
                                    :{link.port} ↗
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Column 4: Local Session Info */}
                <div className="p-6 sm:p-8 hover:bg-white/[0.02] transition-colors flex flex-col justify-between">
                    <div className="text-xs text-cyan-500 font-bold tracking-widest mb-2">SESSION_DATA</div>

                    <div className="font-mono">
                        <div className="text-4xl text-white font-bold tracking-tighter">{stats.time.split(' ')[0]}</div>
                        <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Local_Server_Time</div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="flex justify-between text-[10px] text-gray-400 border-b border-gray-800 pb-2">
                            <span>PROTOCOL</span>
                            <span className="text-cyan-400">HTTPS/2 [SECURE]</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400 border-b border-gray-800 pb-2">
                            <span>ENCRYPTION</span>
                            <span className="text-cyan-400">TLS_1.3</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-400">
                            <span>CLIENT</span>
                            <span className="text-gray-300">UNKNOWN_AGENT</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom System Status Bar */}
            <div className="w-full bg-black py-2.5 text-[10px] border-t border-gray-800 flex flex-wrap overflow-hidden items-center justify-between px-4 md:px-8 gap-2">

                {/* Left: Quick Status */}
                <div className="flex items-center gap-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${stats.network === 'RX_PACKET' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                        <span className="text-gray-500 font-bold">SYS:</span>
                        <span className="text-green-500 font-mono">ONLINE</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-gray-600">UPTIME:</span>
                        <span className="text-gray-400 tabular-nums font-mono">{stats.uptime}</span>
                    </div>
                </div>

                {/* Center: Copyright */}
                <div className="text-gray-600 hidden md:block whitespace-nowrap font-mono">
                    © 2026 ROOT_USER // ALL SYSTEMS NOMINAL
                </div>

                {/* Right: Resource Monitor */}
                <div className="flex items-center gap-6 whitespace-nowrap font-mono">
                    <div className="flex items-center gap-2">
                        <span className="text-blue-500">CPU:</span>
                        <span className="text-gray-300 tabular-nums w-8 text-right">{stats.cpu}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-purple-500">MEM:</span>
                        <span className="text-gray-300 tabular-nums w-8 text-right">{stats.memory}%</span>
                    </div>
                </div>
            </div>

        </footer>
    );
}
