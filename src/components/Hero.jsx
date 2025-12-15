import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section id="hero" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '80px'
        }}>

            <div className="container">
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <motion.div
                        className="col-md-6"
                        style={{ flex: '1', minWidth: '300px' }}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1
                            variants={itemVariants}
                            style={{
                                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                                fontWeight: 700,
                                marginBottom: '20px',
                                lineHeight: 1.1
                            }}
                        >
                            Makhus <span className="text-gradient">Hounsou</span>
                        </motion.h1>

                        <div className="page-scroll">
                            <motion.p
                                variants={itemVariants}
                                style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '40px',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                {t('hero.role')}
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                style={{ display: 'flex', gap: '20px' }}
                            >
                                <motion.a
                                    href="#contact"
                                    className="btn-primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {t('hero.contact_me')}
                                </motion.a>
                                <motion.a
                                    href="#portfolio"
                                    className="btn-outline"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {t('hero.discover_me')}
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="col-md-6"
                        style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div style={{
                            position: 'relative',
                            display: 'inline-block',
                            marginTop: '20px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'linear-gradient(to bottom, transparent, var(--bg-dark))',
                                zIndex: 1,
                                borderRadius: '80px'
                            }}></div>
                            <img
                                src="/assets/img/Moi.webp"
                                alt="Makhus Hounsou"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    maxHeight: '500px',
                                    borderRadius: '80px',
                                    border: '2px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 0 50px rgba(139,92,246,0.2)'
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
