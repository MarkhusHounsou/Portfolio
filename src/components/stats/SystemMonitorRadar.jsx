import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SystemMonitorRadar = () => {
    const { t } = useTranslation();
    const [rotation, setRotation] = useState(0);

    const skills = [
        { name: 'React', color: '#61dafb', angle: 45, radius: 120 },
        { name: 'Python', color: '#ffd343', angle: 135, radius: 90 },
        { name: 'Laravel', color: '#ff2d20', angle: 225, radius: 130 },
        { name: 'Figma', color: '#f24e1e', angle: 315, radius: 100 },
        { name: 'Node.js', color: '#339933', angle: 90, radius: 60 },
        { name: 'SASS', color: '#c69', angle: 270, radius: 110 },
        { name: 'SQL', color: '#00758f', angle: 180, radius: 80 },
        { name: 'Git', color: '#f05032', angle: 10, radius: 140 },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 2) % 360);
        }, 16); // ~60fps
        return () => clearInterval(interval);
    }, []);

    // Helper to calculate blink opacity based on rotation
    const getOpacity = (angle) => {
        // Normalize angle difference
        let diff = Math.abs(rotation - angle);
        if (diff > 180) diff = 360 - diff;

        // If scanner is passing (within 30 degrees), full opacity, else fade
        return diff < 40 ? 1 : 0.3;
    };

    return (
        <div style={{ padding: '30px', height: '100%', position: 'relative', overflow: 'hidden', color: '#00ff9d', fontFamily: 'monospace' }}>
            {/* Top Text Area to avoid overlap */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                <h2>RADAR ACTIVE</h2>
                <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>SCANNING SECTOR 7G</p>
            </div>

            {/* Center Radar */}
            <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: '320px', height: '320px', border: '1px solid rgba(0, 255, 157, 0.2)', borderRadius: '50%' }}>

                {/* Decorative Background */}
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed rgba(0, 255, 157, 0.3)' }} />
                <div style={{ position: 'absolute', inset: '20%', borderRadius: '50%', border: '1px solid rgba(0, 255, 157, 0.1)' }} />
                <div style={{ position: 'absolute', inset: '40%', borderRadius: '50%', border: '1px dashed rgba(0, 255, 157, 0.2)' }} />
                <div style={{ position: 'absolute', inset: '60%', borderRadius: '50%', border: '1px solid rgba(0, 255, 157, 0.1)' }} />
                {/* Crosshairs */}
                <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '1px', background: 'rgba(0, 255, 157, 0.2)' }} />
                <div style={{ position: 'absolute', top: '0', bottom: '0', left: '50%', width: '1px', background: 'rgba(0, 255, 157, 0.2)' }} />

                {/* Scanner Line */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'conic-gradient(from 0deg, rgba(0, 255, 157, 0.15), transparent 60deg)',
                        transform: `rotate(${rotation}deg)`,
                        borderTop: '2px solid #00ff9d',
                        boxShadow: '0 0 15px rgba(0, 255, 157, 0.2)'
                    }}
                />

                {/* Skills Dots */}
                {skills.map((skill, i) => {
                    // Position calculations
                    const rad = (skill.angle - 90) * (Math.PI / 180);
                    // Use the skill's specific radius
                    const top = 160 + Math.sin(rad) * skill.radius;
                    const left = 160 + Math.cos(rad) * skill.radius;

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                top: `${top}px`,
                                left: `${left}px`,
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                opacity: getOpacity(skill.angle),
                                transition: 'opacity 0.2s',
                                zIndex: 5
                            }}
                        >
                            {/* Dot with ring */}
                            <div style={{ position: 'relative', width: '8px', height: '8px', background: skill.color, borderRadius: '50%', boxShadow: `0 0 8px ${skill.color}` }}>
                                <div style={{ position: 'absolute', inset: '-4px', border: `1px solid ${skill.color}`, borderRadius: '50%', opacity: 0.5 }} />
                            </div>

                            <span style={{ fontSize: '0.7rem', marginTop: '6px', textShadow: '1px 1px 2px black', fontWeight: 'bold', color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '0 4px', borderRadius: '4px' }}>{skill.name}</span>
                        </div>
                    );
                })}
            </div>

            {/* Corner Details */}
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', textAlign: 'right', fontSize: '0.7rem', opacity: 0.6 }}>
                <div>COORDS: {Math.floor(rotation)}.34, {360 - Math.floor(rotation)}.12</div>
                <div>ZOOM: 100%</div>
            </div>

            {/* User Stats Board */}
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '50px',
                transform: 'translateY(-50%)',
                width: '180px',
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(0,255,157,0.3)',
                padding: '10px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                zIndex: 20
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', borderBottom: '1px solid rgba(0,255,157,0.2)', paddingBottom: '5px' }}>
                    <div style={{ color: '#00ff9d' }}>⚡</div>
                    <div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>EXPERIENCE</div>
                        <div style={{ fontWeight: 'bold' }}>3 YEARS</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', borderBottom: '1px solid rgba(0,255,157,0.2)', paddingBottom: '5px' }}>
                    <div style={{ color: '#00ccff' }}>🎓</div>
                    <div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>DIPLOMA</div>
                        <div style={{ fontWeight: 'bold' }}>BUT 3 MMI</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', borderBottom: '1px solid rgba(0,255,157,0.2)', paddingBottom: '5px' }}>
                    <div style={{ color: '#ffae00' }}>📍</div>
                    <div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>LOCATION</div>
                        <div style={{ fontWeight: 'bold' }}>PARIS, FR</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ color: '#ff3366' }}>🎂</div>
                    <div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>AGE</div>
                        <div style={{ fontWeight: 'bold' }}>21 YEARS</div>
                    </div>
                </div>
            </div>

            {/* Motivation Graph */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50px',
                transform: 'translateY(-50%)',
                width: '200px',
                height: '100px',
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(0,255,157,0.3)',
                padding: '10px',
                borderRadius: '4px',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ fontSize: '0.7rem', color: '#00ff9d', marginBottom: '5px' }}>MOTIVATION_LEVELS</div>
                <div style={{ flex: 1, position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                    {/* Exponential Curve CSS approximation */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden'
                    }}>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,100 C 50,100 70,50 100,0" fill="none" stroke="#00ff9d" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            <path d="M0,100 L100,100 L100,0 L0,100" fill="url(#grad1)" opacity="0.3" />
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#00ff9d', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: 'black', stopOpacity: 0 }} />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Grid Overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0, 255, 157, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 157, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
        </div>
    );
};

export default SystemMonitorRadar;
