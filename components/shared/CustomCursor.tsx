'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor({ color = "blue" }: { color?: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);
    const [currentImage, setCurrentImage] = useState('/assets/images/Amruth1.jpeg');

    // Mouse position state
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics configuration
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Image rotation logic
        const interval = setInterval(() => {
            setCurrentImage(prev =>
                prev === '/assets/images/Amruth1.jpeg'
                    ? '/assets/images/Amruth2.jpeg'
                    : '/assets/images/Amruth1.jpeg'
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

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

        let lastClickTime = 0;
        const handleMouseDown = () => {
            const now = Date.now();
            if (now - lastClickTime < 300) {
                setIsExpanding(true);
            }
            lastClickTime = now;
            setIsHovering(true);
        };

        const handleMouseUp = () => {
            setIsExpanding(false);
            setIsHovering(false);
        };

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
            <motion.div
                className="fixed top-0 left-0 z-50 shadow-lg rounded-full flex items-center justify-center overflow-hidden"
                style={{
                    translateX: "-50%",
                    translateY: "-50%",
                    x: cursorX,
                    y: cursorY,
                }}
                animate={{
                    width: isExpanding ? 500 : (isHovering ? 100 : 50),
                    height: isExpanding ? 500 : (isHovering ? 100 : 50),
                    borderRadius: "50%",
                    scale: isHovering && !isExpanding ? 1.2 : 1,
                    border: isHovering || isExpanding ? "2px solid rgba(59, 130, 246, 0.5)" : "2px solid rgba(255, 255, 255, 0.2)",
                    rotate: isExpanding ? 360 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: isExpanding ? 20 : 150,
                    damping: isExpanding ? 10 : 15,
                    mass: isExpanding ? 2 : 0.8,
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)", rotateY: 90 }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", rotateY: -90 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentImage})` }}
                    />
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
