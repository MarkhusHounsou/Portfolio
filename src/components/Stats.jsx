import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Counter = ({ to, suffix = '', id, label }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            let start = 0;
            const duration = 2000;
            const increment = to / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= to) {
                    setCount(to);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [inView, to]);

    // Infinite counter logic special case
    useEffect(() => {
        if (id === 'infinity' && inView) {
            const timer = setInterval(() => {
                setCount(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [id, inView]);

    return (
        <motion.div
            ref={ref}
            className="col-sm-4"
            style={{ marginBottom: '30px' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
        >
            <div className="glass-card" style={{ textAlign: 'center', padding: '30px' }}>
                <p style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    margin: 0,
                    background: 'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {count}{suffix}
                </p>
                <h4 style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '10px' }}>{label}</h4>
            </div>
        </motion.div>
    );
};

const Stats = () => {
    const { t } = useTranslation();

    return (
        <section className="section" style={{ position: 'relative' }}>
            {/* Background Blob */}
            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '20%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(60px)',
                zIndex: -1
            }}></div>

            <div className="container">
                <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Counter to={2} label={t('stats.years_study')} />
                    <Counter to={15} label={t('stats.projects_done')} />
                    <Counter to={1} id="infinity" label={t('stats.long_time')} />
                </div>
            </div>
        </section>
    );
};

export default Stats;
