import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SkillItem = ({ name, percent, color }) => {
    return (
        <motion.div
            className="glass-card"
            style={{ marginBottom: '20px', padding: '15px' }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ fontWeight: 600 }}>{name}</h4>
                <span style={{ color: color, fontWeight: 700 }}>{percent}%</span>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div
                    style={{ height: '100%', background: color, borderRadius: '4px' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const { t } = useTranslation();

    return (
        <section id="skills" className="section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                        {t('skills.title')}
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto' }}></div>
                </div>

                <div className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    <div className="col-md-4" style={{ flex: '1 1 300px' }}>
                        <SkillItem name="HTML/CSS" percent={100} color="#e44d26" />
                        <SkillItem name="SQL" percent={75} color="#00758f" />
                    </div>
                    <div className="col-md-4" style={{ flex: '1 1 300px' }}>
                        <SkillItem name="JavaScript" percent={82} color="#f7df1e" />
                        <SkillItem name="C" percent={66} color="#00599c" />
                    </div>
                    <div className="col-md-4" style={{ flex: '1 1 300px' }}>
                        <SkillItem name="PHP" percent={97} color="#777bb4" />
                        <SkillItem name="Java" percent={45} color="#007396" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
