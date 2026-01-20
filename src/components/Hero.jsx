import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import moiImg from '../assets/ui/Moi.webp';

const Hero = () => {
    const { t } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 50,
                y: (e.clientY - window.innerHeight / 2) / 50
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Simplified looping typewriter effect
    const [displayedRole, setDisplayedRole] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const roles = [t('hero.role'), "Frontend Enthusiast", "UI/UX Designer"]; // You can add more or keep as is

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setDisplayedRole(
                isDeleting
                    ? fullText.substring(0, displayedRole.length - 1)
                    : fullText.substring(0, displayedRole.length + 1)
            );

            setTypingSpeed(isDeleting ? 80 : 150);

            if (!isDeleting && displayedRole === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayedRole === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedRole, isDeleting]);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{
                            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                        }}
                    >
                        {/* Name with 3D Effect */}
                        <motion.h1
                            className="text-6xl md:text-8xl font-black mb-6 leading-none"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            <span className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                Makhus
                            </span>
                            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(139,92,246,0.5)]">
                                Hounsou
                            </span>
                        </motion.h1>

                        {/* Typewriter Role */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mb-12"
                        >
                            <div className="text-2xl md:text-3xl text-white/80 font-light flex items-center h-10">
                                <span>{displayedRole}</span>
                                <span className="inline-block w-[3px] h-[1em] bg-purple-400 ml-1 animate-pulse self-center" />
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 }}
                            className="flex flex-wrap gap-6"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-bold text-lg text-white overflow-hidden shadow-lg shadow-purple-500/50"
                            >
                                <span className="relative z-10">{t('hero.contact_me')}</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>

                            <motion.a
                                href="#portfolio"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-white/30 rounded-full font-bold text-lg text-white hover:bg-white/10 hover:border-white transition-all"
                            >
                                {t('hero.discover_me')}
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <motion.div
                            whileHover={{
                                rotateY: 5,
                                rotateX: 5,
                                scale: 1.05
                            }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            style={{
                                transform: `translate(${-mousePosition.x * 2}px, ${-mousePosition.y * 2}px)`,
                                perspective: 1000
                            }}
                            className="relative"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-[80px] blur-3xl scale-110" />

                            {/* Image */}
                            <img
                                src={moiImg}
                                alt="Makhus Hounsou"
                                className="relative z-10 w-full max-w-md h-auto rounded-[80px] border-2 border-white/10 shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-white/50 cursor-pointer"
                    onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <span className="text-sm uppercase tracking-widest">Scroll</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
