'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TypingTextProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    cursor?: boolean;
}

export default function TypingText({
    text,
    speed = 30, // ms per char
    delay = 0, // ms before starting
    className = '',
    cursor = true
}: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [started, setStarted] = useState(false);
    const elementRef = useRef(null);
    const isInView = useInView(elementRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView && !started) {
            const startTimeout = setTimeout(() => {
                setStarted(true);
            }, delay);
            return () => clearTimeout(startTimeout);
        }
    }, [isInView, delay, started]);

    useEffect(() => {
        if (!started) return;

        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [started, text, speed]);

    return (
        <span ref={elementRef} className={className}>
            {displayedText}
            {cursor && started && displayedText.length < text.length && (
                <span className="animate-pulse">|</span>
            )}
        </span>
    );
}
