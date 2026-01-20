
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SystemMonitorStream = ({ onExit }) => {
    const { t } = useTranslation();
    const [hexLines, setHexLines] = useState([]);
    const [activeModules, setActiveModules] = useState([
        { id: 1, name: "Teamwork Protocol", progress: 0, color: '#ff5f56' },
        { id: 2, name: "Problem Solving", progress: 0, color: '#ffbd2e' },
        { id: 3, name: "Adaptability Core", progress: 0, color: '#27c93f' }
    ]);
    const [finishedSkills, setFinishedSkills] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [speedMultiplier, setSpeedMultiplier] = useState(1);

    // Pool of skills - Expanded list
    const [skillPool, setSkillPool] = useState([
        { name: "Communication", color: '#00ccff' },
        { name: "Creativity", color: '#9d35ff' },
        { name: "Patience", color: '#ff3366' },
        { name: "Leadership", color: '#00ff9d' },
        { name: "Mentoring", color: '#eab308' },
        { name: "Strategy", color: '#f24e1e' },
        { name: "Analysis", color: '#339933' },
        { name: "Resilience", color: '#61dafb' },
        { name: "Critical Thinking", color: '#ff5f56' },
        { name: "Time Management", color: '#ffbd2e' },
        { name: "Debugging", color: '#27c93f' },
        { name: "Architecture", color: '#00ccff' },
        { name: "Optimization", color: '#9d35ff' },
        { name: "Testing", color: '#ff3366' },
        { name: "Deployment", color: '#00ff9d' },
        { name: "Documentation", color: '#eab308' },
        { name: "Collaboration", color: '#f24e1e' },
        { name: "Innovation", color: '#339933' },
        { name: "Empathy", color: '#61dafb' },
        { name: "Organization", color: '#ff5f56' }
    ]);

    // Hex Stream Effect - Multicolor
    useEffect(() => {
        const colors = ['#00ccff', '#ff3366', '#00ff9d', '#eab308', '#9d35ff', '#fff'];
        const interval = setInterval(() => {
            const hex = Array(4).fill(0).map(() => `0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`).join(' ');
            const color = colors[Math.floor(Math.random() * colors.length)];
            setHexLines(prev => [{ text: hex, color }, ...prev.slice(0, 20)]);
        }, 80 / speedMultiplier); // React to speed multiplier
        return () => clearInterval(interval);
    }, [speedMultiplier]);

    // Module Progress Logic
    useEffect(() => {
        if (isFinished) return;

        const interval = setInterval(() => {
            // Check if all work is done
            if (activeModules.length === 0 && skillPool.length === 0) {
                setIsFinished(true);
                return;
            }

            setActiveModules(prev => {
                let nextModules = [...prev];
                let hasChanges = false;

                nextModules = nextModules.map(mod => {
                    // Increased base speed from 4 to 8 (2x faster per module)
                    const baseIncrement = Math.random() * 8;
                    const newProgress = mod.progress + (baseIncrement * speedMultiplier); // Apply multiplier
                    if (newProgress >= 100) {
                        hasChanges = true;
                        // Finished
                        return { ...mod, progress: 100, done: true };
                    }
                    return { ...mod, progress: newProgress };
                });

                if (hasChanges) {
                    // Filter out done modules and add to finished list
                    const doneModules = nextModules.filter(m => m.done);
                    const remainingModules = nextModules.filter(m => !m.done);

                    if (doneModules.length > 0) {
                        setFinishedSkills(prevFinished => {
                            // Ensure no duplicates based on name match
                            const newFinished = [...prevFinished];
                            doneModules.forEach(dm => {
                                if (!newFinished.some(fs => fs.name === dm.name)) {
                                    newFinished.push(dm);
                                }
                            });
                            return newFinished;
                        });

                        // Try to replenish from pool
                        let replenishments = [];
                        if (skillPool.length > 0) {
                            const needed = 3 - remainingModules.length;
                            const take = Math.min(needed, skillPool.length);
                            replenishments = skillPool.slice(0, take).map((s, i) => ({
                                id: Date.now() + i,
                                name: s.name,
                                progress: 0,
                                color: s.color
                            }));
                            setSkillPool(pool => pool.slice(take));
                        }

                        return [...remainingModules, ...replenishments];
                    }
                }

                return nextModules;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [skillPool, isFinished, activeModules]);

    // Check for auto-finish
    useEffect(() => {
        if (activeModules.length === 0 && skillPool.length === 0 && finishedSkills.length > 0) {
            setIsFinished(true);
        }
    }, [activeModules, skillPool, finishedSkills]);

    // Turbo Button Function
    const toggleTurbo = () => {
        setSpeedMultiplier(prev => prev === 1 ? 5 : 1);
    };


    if (isFinished) {
        return (
            <div style={{ padding: '30px', height: '100%', fontFamily: 'monospace', color: '#fff', overflowY: 'auto' }}>
                <div style={{ border: '1px solid #00ff9d', padding: '20px', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,255,157,0.1)', background: 'rgba(0,0,0,0.4)' }}>
                    <h3 style={{ borderBottom: '1px solid #00ff9d', paddingBottom: '15px', marginBottom: '20px', textAlign: 'center', color: '#00ff9d', letterSpacing: '2px' }}>
                        PROCESS COMPLETE
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px' }}>
                        {finishedSkills.map((s, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '10px',
                                borderLeft: `3px solid ${s.color}`,
                                fontSize: '0.85rem'
                            }}>
                                <div style={{ fontWeight: 'bold' }}>{s.name}</div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '2px' }}>VERIFIED</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <button
                            onClick={() => {
                                if (onExit) onExit();
                            }}
                            style={{
                                background: 'rgba(0, 255, 157, 0.1)',
                                border: '1px solid #00ff9d',
                                color: '#00ff9d',
                                padding: '12px 30px',
                                cursor: 'pointer',
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                        >
                            RETURN TO TERMINAL
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ padding: '30px', height: '100%', display: 'flex', gap: '20px', color: '#00ccff', fontFamily: 'monospace', overflow: 'hidden' }}>
            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '20px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ textShadow: '0 0 10px #00ccff', marginBottom: '20px', fontSize: '1.2rem' }}>DATA_STREAM_V4</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', flex: 1 }}>
                    {activeModules.map((mod) => (
                        <div key={mod.id}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, color: '#fff', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{mod.name}...</span>
                                <span style={{ color: mod.color }}>{Math.floor(mod.progress)}%</span>
                            </div>
                            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', width: '100%', borderRadius: '2px' }}>
                                <motion.div
                                    animate={{ width: `${mod.progress}%` }}
                                    transition={{ ease: "linear", duration: 0.1 }} // faster updates
                                    style={{ height: '100%', background: mod.color, borderRadius: '2px' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                        QUEUED: {skillPool.length} MODULES
                    </div>
                    <button
                        onClick={toggleTurbo}
                        title="TOGGLE TURBO MODE"
                        style={{
                            marginLeft: 'auto',
                            background: speedMultiplier > 1 ? '#ff3366' : '#eab308',
                            color: '#000',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            boxShadow: `0 0 10px ${speedMultiplier > 1 ? '#ff3366' : '#eab308'}`
                        }}
                    >
                        <span>⚡</span> FAST_FWD {speedMultiplier > 1 ? 'ON' : ''}
                    </button>
                </div>
            </div>

            <div style={{ flex: 0.8, opacity: 0.8, fontSize: '0.85rem', lineHeight: '1.4' }}>
                {hexLines.map((line, i) => (
                    <div key={i} style={{ opacity: 1 - i / 20, color: line.color, textShadow: `0 0 5px ${line.color}` }}>
                        {line.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemMonitorStream;
