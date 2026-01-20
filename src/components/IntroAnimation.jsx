import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const IntroAnimation = ({ onComplete }) => {
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        // Complete animation after logo reaches header position
        const timer = setTimeout(() => {
            setAnimationComplete(true);
            onComplete();
        }, 3500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <>
            {/* Black overlay that fades out to reveal site */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="fixed inset-0 z-[9998] bg-black pointer-events-none"
            />

            {/* MH Logo - starts big center, moves to header position */}
            <motion.div
                initial={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                    scale: 1,
                    zIndex: 9999
                }}
                animate={{
                    top: '32px',
                    left: '6%',
                    x: 0,
                    y: 0,
                    scale: 0.18,
                    transition: {
                        duration: 1.5,
                        delay: 1.5,
                        ease: [0.43, 0.13, 0.23, 0.96]
                    }
                }}
                onAnimationComplete={() => {
                    // Logo has reached header, let it fade into actual header logo
                    setTimeout(() => setAnimationComplete(true), 500);
                }}
                className="pointer-events-none"
                style={{
                    opacity: animationComplete ? 0 : 1,
                    transition: animationComplete ? 'opacity 0.3s' : 'none'
                }}
            >
                <div className="relative">
                    {/* Glow Effect */}
                    <motion.div
                        className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 scale-150"
                        animate={{ opacity: [0.3, 0.1] }}
                        transition={{ duration: 1.5, delay: 1.5 }}
                    />

                    {/* Logo Text */}
                    <div className="relative text-[20vw] md:text-[15vw] font-black tracking-tighter whitespace-nowrap">
                        <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            MH
                        </span>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default IntroAnimation;
