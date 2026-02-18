'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { FormData } from '@/types';
import { itemVariants } from '@/constants/animations';
import { generateMailtoLink } from '@/lib/mailto';
import { contactEmail } from '@/constants/social';

/**
 * Contact form component with mailto functionality
 */
export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Generate and open mailto link
        const mailtoLink = generateMailtoLink(formData, contactEmail);
        window.location.href = mailtoLink;

        // Reset form
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
        >
            {/* Name Field */}
            <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none text-gray-900 placeholder-gray-400 bg-white"
                    placeholder="Your name"
                />
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none text-gray-900 placeholder-gray-400 bg-white"
                    placeholder="your.email@example.com"
                />
            </motion.div>

            {/* Message Field */}
            <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none text-gray-900 placeholder-gray-400 bg-white resize-none"
                    placeholder="Tell me about your project..."
                />
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
                <motion.button
                    type="submit"
                    whileHover={{
                        scale: 1.05,
                        boxShadow: '0 20px 40px -10px rgba(168, 85, 247, 0.4)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                    <span>Send Message</span>
                    <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </motion.button>
            </motion.div>
        </motion.form>
    );
}
