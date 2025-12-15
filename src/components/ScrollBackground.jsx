import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollBackground = () => {
    const { scrollYProgress } = useScroll();

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transform path based on scroll position (0 to 1)
    // x: horizontal position (% of viewport width)
    // y: vertical position (% of viewport height)
    // scale: size pulsation 

    const x = useTransform(smoothProgress,
        [0, 0.25, 0.5, 0.75, 1],
        ["80%", "20%", "50%", "80%", "20%"]
    );

    const y = useTransform(smoothProgress,
        [0, 0.25, 0.5, 0.75, 1],
        ["20%", "80%", "40%", "20%", "80%"]
    );

    const scale = useTransform(smoothProgress,
        [0, 0.25, 0.5, 0.75, 1],
        [1, 1.5, 2, 1.2, 1.8]
    );

    const rotate = useTransform(smoothProgress,
        [0, 1],
        [0, 360]
    );

    // Dynamic color shift
    const background = useTransform(smoothProgress,
        [0, 0.5, 1],
        [
            "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(0,0,0,0) 70%)", // Purple
            "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%)", // Blue
            "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(0,0,0,0) 70%)"  // Pink
        ]
    );

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background,
                    filter: 'blur(80px)',
                    x: x, // We use x/y instead of top/left for better performance (GPU)
                    y: y,
                    translateX: "-50%", // Center the pivot
                    translateY: "-50%",
                    scale,
                    rotate
                }}
            />

            {/* Secondary subtle orb for depth */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(60px)',
                    left: '50%',
                    top: '50%',
                    x: useTransform(smoothProgress, [0, 1], ["-50%", "50%"]),
                    y: useTransform(smoothProgress, [0, 1], ["-50%", "50%"]),
                }}
            />
        </div>
    );
};

export default ScrollBackground;
