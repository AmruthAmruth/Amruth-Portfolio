'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Github, Mail, User, MessageSquare, Tag } from 'lucide-react';
import emailjs from '@emailjs/browser';

const CONTACT_EMAIL = 'amrwth.dev@gmail.com';

// EmailJS credentials from environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

const topics = [
    'Freelance Project',
    'Full-time Role',
    'Collaboration',
    'Just saying hi 👋',
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function TransmissionForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const e: Record<string, string> = {};
        if (name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
        if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Please enter a valid email address.';
        if (!topic) e.topic = 'Please pick a topic.';
        if (message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
        return e;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        // Check if configuration is present
        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            console.error('EmailJS Error: Configuration keys are missing. Please add NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY to your .env file.');
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
            return;
        }

        setStatus('sending');

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: name,
                    email: email,
                    topic: topic,
                    message: message,
                    full_message: `[TOPIC: ${topic}]\n\n${message}`,
                    to_email: CONTACT_EMAIL,
                },
                EMAILJS_PUBLIC_KEY
            );
            setStatus('sent');
            // Reset form
            setName('');
            setEmail('');
            setTopic('');
            setMessage('');
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err) {
            console.error('EmailJS Error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* ── GitHub Issue Window ── */}
            <div className="rounded-xl overflow-hidden border border-[#30363d] shadow-2xl shadow-black/30 bg-[#0d1117]">

                {/* macOS titlebar */}
                <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-3 bg-[#161b22] border-b border-[#21262d]">
                    <div className="flex gap-1.5 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-[13px] font-sans text-[#8b949e] select-none truncate px-2">
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="text-[#58a6ff] font-semibold">amruth</span>
                        <span>/</span>
                        <span className="text-[#58a6ff] font-bold">portfolio</span>
                        <span className="text-[#8b949e] hidden xs:inline">·</span>
                        <span className="hidden xs:inline">New Issue</span>
                    </div>
                    <div className="w-12 sm:w-[72px] shrink-0" />
                </div>

                {/* Issue form header */}
                <div className="bg-[#161b22] border-b border-[#21262d] px-4 sm:px-7 py-4">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">A</div>
                        <span className="text-[#8b949e] text-[12px] font-sans">Opening an issue as <strong className="text-[#e6edf3]">guest</strong></span>
                    </div>
                    <h3 className="text-[#e6edf3] font-semibold font-sans text-sm sm:text-base mt-2">
                        👋 Say hello, propose a project, or just ask anything
                    </h3>
                    <p className="text-[#8b949e] text-[11px] sm:text-[12px] font-sans mt-1">
                        Fill in the fields below and hit <strong className="text-[#e6edf3]">Submit</strong> — your message will land directly in my inbox.
                    </p>
                </div>

                {/* ── The Form ── */}
                <form onSubmit={handleSubmit} noValidate className="font-sans">
                    <div className="px-4 sm:px-7 py-5 sm:py-6 space-y-4 sm:space-y-5 bg-[#0d1117]">

                        {/* Name */}
                        <div>
                            <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#8b949e] mb-1.5 uppercase tracking-wide">
                                <User className="w-3.5 h-3.5" /> Your Name <span className="text-[#f85149]">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                disabled={status === 'sending'}
                                onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                                placeholder="e.g. Jane Doe"
                                className={`w-full bg-[#161b22] border ${errors.name ? 'border-[#f85149]' : 'border-[#30363d]'} rounded-lg px-3.5 py-2.5 text-[#e6edf3] text-sm sm:text-base placeholder-[#484f58] outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]/40 transition-all disabled:opacity-50`}
                            />
                            {errors.name && <p className="mt-1.5 text-[11px] text-[#f85149] flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#8b949e] mb-1.5 uppercase tracking-wide">
                                <Mail className="w-3.5 h-3.5" /> Your Email <span className="text-[#f85149]">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                disabled={status === 'sending'}
                                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                                placeholder="e.g. jane@example.com"
                                className={`w-full bg-[#161b22] border ${errors.email ? 'border-[#f85149]' : 'border-[#30363d]'} rounded-lg px-3.5 py-2.5 text-[#e6edf3] text-sm placeholder-[#484f58] outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]/40 transition-all disabled:opacity-50`}
                            />
                            {errors.email && <p className="mt-1.5 text-[11px] text-[#f85149] flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                        </div>

                        {/* Topic / Label */}
                        <div>
                            <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#8b949e] mb-1.5 uppercase tracking-wide">
                                <Tag className="w-3.5 h-3.5" /> Topic <span className="text-[#f85149]">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {topics.map(t => (
                                    <button
                                        key={t}
                                        type="button"
                                        disabled={status === 'sending'}
                                        onClick={() => { setTopic(t); setErrors(p => ({ ...p, topic: '' })); }}
                                        className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all disabled:opacity-50 ${topic === t
                                                ? 'bg-[#388bfd]/20 border-[#388bfd] text-[#58a6ff]'
                                                : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:border-[#8b949e] hover:text-[#e6edf3]'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                            {errors.topic && <p className="mt-1.5 text-[11px] text-[#f85149] flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.topic}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#8b949e] mb-1.5 uppercase tracking-wide">
                                <MessageSquare className="w-3.5 h-3.5" /> Message <span className="text-[#f85149]">*</span>
                            </label>
                            <textarea
                                value={message}
                                disabled={status === 'sending'}
                                onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: '' })); }}
                                placeholder="Tell me what's on your mind..."
                                rows={5}
                                className={`w-full bg-[#161b22] border ${errors.message ? 'border-[#f85149]' : 'border-[#30363d]'} rounded-lg px-3.5 py-2.5 text-[#e6edf3] text-sm placeholder-[#484f58] outline-none focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]/40 transition-all resize-y min-h-[120px] disabled:opacity-50`}
                            />
                            <div className="flex items-center justify-between mt-1">
                                {errors.message
                                    ? <p className="text-[11px] text-[#f85149] flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>
                                    : <span />
                                }
                                <span className="text-[11px] text-[#484f58]">{message.length} chars</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Footer / Submit row ── */}
                    <div className="bg-[#161b22] border-t border-[#21262d] px-5 sm:px-7 py-4 flex items-center justify-between gap-4 flex-wrap">
                        <div className="text-[11px] text-[#8b949e] font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Sending to <span className="text-[#58a6ff]">{CONTACT_EMAIL}</span>
                        </div>

                        <AnimatePresence mode="wait">
                            {status === 'sent' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex items-center gap-2 text-[#3fb950] text-sm font-semibold"
                                >
                                    <CheckCircle className="w-4 h-4" /> Message sent successfully!
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex items-center gap-2 text-[#f85149] text-sm font-semibold"
                                >
                                    <AlertCircle className="w-4 h-4" /> Error sending message.
                                </motion.div>
                            )}
                            {status === 'idle' || status === 'sending' ? (
                                <motion.button
                                    key="submit-btn"
                                    type="submit"
                                    whileTap={{ scale: 0.97 }}
                                    disabled={status === 'sending'}
                                    className="flex items-center gap-2 px-5 py-2 bg-[#238636] hover:bg-[#2ea043] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg transition-colors border border-[#2ea043]/60 shadow-md"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-3.5 h-3.5" />
                                            Submit Issue
                                        </>
                                    )}
                                </motion.button>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </form>
            </div>
        </div>
    );
}
