'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor({ color = "blue" }: { color?: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics configuration
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Detect touch devices to avoid custom cursor on mobile
        const isTouchDevice = () => {
            return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0));
        };

        if (isTouchDevice()) return;

        setIsVisible(true);
        // Hide default cursor
        document.body.style.cursor = 'none';

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        // Add hover listeners to clickable elements
        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Dynamically attach listeners to interactive elements
        const addListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, label, [role="button"], .cursor-hover');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleLinkHover);
                el.addEventListener('mouseleave', handleLinkLeave);
            });
            return interactiveElements; // Return for cleanup
        };

        const elements = addListeners();

        // Optional: MutationObserver to handle dynamic content
        const observer = new MutationObserver(() => {
            // Re-attach listeners when DOM changes (simplified approach)
            const newElements = addListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'auto';
            observer.disconnect();

            elements.forEach((el) => {
                el.removeEventListener('mouseenter', handleLinkHover);
                el.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Main Dot - Tiny precision point */}
            <motion.div
                className={`fixed top-0 left-0 w-2 h-2 bg-${color}-500 rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.3)] z-20`}
                style={{
                    translateX: "-50%",
                    translateY: "-50%",
                    x: mouseX,
                    y: mouseY,
                }}
            />

            {/* Water Drop / Glassmorphic Bubble */}
            <motion.div
                className={`fixed top-0 left-0 rounded-full z-10`}
                style={{
                    translateX: "-50%",
                    translateY: "-50%",
                    x: cursorX,
                    y: cursorY,
                    // Glassmorphic Style
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                }}
                animate={{
                    width: isHovering ? 80 : 40,
                    height: isHovering ? 80 : 40,
                    borderRadius: "50%",
                    // Fluid squish effect could be added here if we tracked velocity, but scale is safer
                    scale: isHovering ? 1.1 : 1,
                    // Subtle color shift on hover
                    background: isHovering ? "rgba(59, 130, 246, 0.05)" : "rgba(255, 255, 255, 0.03)",
                    border: isHovering ? "1px solid rgba(59, 130, 246, 0.2)" : "1px solid rgba(255, 255, 255, 0.1)",
                }}
                transition={{
                    type: "spring",
                    // Looser spring for "floating" water feel
                    stiffness: 150,
                    damping: 15,
                    mass: 0.8
                }}
            >
                {/* Optional: Inner highlight for potential liquid feel */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1/4 bg-white/10 rounded-full blur-[2px]" />
            </motion.div>
        </div>
    );
}
