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
        // Image rotation logic with recursive timeout
        const timeout = setTimeout(() => {
            setCurrentImage((prev) =>
                prev === '/assets/images/Amruth1.jpeg'
                    ? '/assets/images/Amruth2.jpeg'
                    : '/assets/images/Amruth1.jpeg'
            );
        }, 5000);

        return () => clearTimeout(timeout);
    }, [currentImage]);

    useEffect(() => {
        const isTouch = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia('(hover: none)').matches);
        
        if (isTouch) {
            setIsVisible(false);
            return;
        }

        setIsVisible(true);
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

        // Mobile touch handlers
        let lastTouchTime = 0;
        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            mouseX.set(touch.clientX);
            mouseY.set(touch.clientY);
            
            const now = Date.now();
            if (now - lastTouchTime < 300) {
                // Secondary tap of a double tap
                setIsExpanding(true);
            }
            lastTouchTime = now;
            setIsHovering(true);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            mouseX.set(touch.clientX);
            mouseY.set(touch.clientY);
        };

        const handleTouchEnd = () => {
            setIsExpanding(false);
            setIsHovering(false);
        };

        // Desktop Only Listeners
        if (!isTouch) {
            window.addEventListener('mousemove', moveCursor);
            window.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            // Mobile Only Listeners
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);
        }

        // Add hover listeners to clickable elements (Desktop Only)
        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        let elements: NodeListOf<Element> = [] as any;
        let observer: MutationObserver | null = null;

        if (!isTouch) {
            const addListeners = () => {
                const interactiveElements = document.querySelectorAll('a, button, input, textarea, label, [role="button"], .cursor-hover');
                interactiveElements.forEach((el) => {
                    el.addEventListener('mouseenter', handleLinkHover);
                    el.addEventListener('mouseleave', handleLinkLeave);
                });
                return interactiveElements;
            };

            elements = addListeners();

            observer = new MutationObserver(() => {
                addListeners();
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }

        return () => {
            if (!isTouch) {
                window.removeEventListener('mousemove', moveCursor);
                window.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mouseup', handleMouseUp);
                document.body.style.cursor = 'auto';
                if (observer) observer.disconnect();
                elements.forEach((el) => {
                    el.removeEventListener('mouseenter', handleLinkHover);
                    el.removeEventListener('mouseleave', handleLinkLeave);
                });
            } else {
                window.removeEventListener('touchstart', handleTouchStart);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    // Detect if we are on touch to hide the default small dot
    const isTouchDevice = (typeof window !== 'undefined') && (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));

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
                    width: isExpanding ? (isTouchDevice ? 300 : 500) : (isTouchDevice ? (isHovering ? 0 : 0) : (isHovering ? 100 : 50)),
                    height: isExpanding ? (isTouchDevice ? 300 : 500) : (isTouchDevice ? (isHovering ? 0 : 0) : (isHovering ? 100 : 50)),
                    opacity: isTouchDevice ? (isExpanding ? 1 : 0) : 1,
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
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentImage})` }}
                    />
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
