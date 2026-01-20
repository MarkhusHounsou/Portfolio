import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Import logos
import htmlLogo from '../assets/skills/html.png';
import jsLogo from '../assets/skills/js.png';
import sqlLogo from '../assets/skills/sql.png';
import cLogo from '../assets/skills/c.png';
import phpLogo from '../assets/skills/php.png';
import javaLogo from '../assets/skills/java.png';
import pythonLogo from '../assets/skills/python.png';
import reactLogo from '../assets/skills/react_modern.png'; // Updated to modern React logo
import dockerLogo from '../assets/skills/docker.png';     // New Docker logo

const SkillItem = ({ name, percent, color, logo }) => {
    return (
        <motion.div
            className="glass-card skill-card"
            style={{
                marginBottom: '20px',
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                borderColor: 'rgba(255,255,255,0.3)'
            }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div style={{
                width: '50px',
                height: '50px',
                padding: '8px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                <img src={logo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h4 style={{ fontWeight: 600, margin: 0 }}>{name}</h4>
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
                        <SkillItem name="HTML/CSS" percent={100} color="#e44d26" logo={htmlLogo} />
                        <SkillItem name="React" percent={85} color="#61dafb" logo={reactLogo} />
                        <SkillItem name="JavaScript" percent={82} color="#f7df1e" logo={jsLogo} />
                    </div>
                    <div className="col-md-4" style={{ flex: '1 1 300px' }}>
                        <SkillItem name="PHP" percent={97} color="#777bb4" logo={phpLogo} />
                        <SkillItem name="Python" percent={80} color="#3776ab" logo={pythonLogo} />
                        <SkillItem name="SQL" percent={75} color="#00758f" logo={sqlLogo} />
                    </div>
                    <div className="col-md-4" style={{ flex: '1 1 300px' }}>
                        <SkillItem name="C" percent={66} color="#00599c" logo={cLogo} />
                        <SkillItem name="Java" percent={45} color="#007396" logo={javaLogo} />
                        <SkillItem name="Docker" percent={55} color="#2496ed" logo={dockerLogo} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
