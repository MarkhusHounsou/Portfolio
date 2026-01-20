import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ label, value, color }) => (
    <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.85rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.8)' }}>
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ height: '100%', background: color, borderRadius: '3px', boxShadow: `0 0 10px ${color}` }}
            />
        </div>
    </div>
);

const SystemMonitor = () => {
    const [uptime, setUptime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setUptime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00ff9d', boxShadow: '0 0 10px #00ff9d' }}
                    />
                    <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: '1.2rem', color: '#00ff9d' }}>SYSTEM STATUS: ONLINE</h3>
                </div>
                <div style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>
                    SESSION UPTIME: <span style={{ color: '#fff' }}>{formatTime(uptime)}</span>
                </div>
            </div>

            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6" style={{ paddingRight: '15px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', letterSpacing: '2px' }}>CORE MODULES</h4>
                        <ProgressBar label="FULL STACK ARCHITECTURE" value={100} color="#8b5cf6" />
                        <ProgressBar label="UI/UX DESIGN ENGINE" value={95} color="#ec4899" />
                        <ProgressBar label="DATABASE MANAGEMENT" value={88} color="#3b82f6" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.3)', textAlign: 'center' }}
                        >
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>15+</div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', marginTop: '5px' }}>PROJECTS DEPLOYED</div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(236, 72, 153, 0.3)', textAlign: 'center' }}
                        >
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>2+</div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', marginTop: '5px' }}>YEARS EXP</div>
                        </motion.div>
                        <div style={{ gridColumn: 'span 2', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#00ff9d' }}>
                            &gt; Analyzing portfolio traffic...<br />
                            &gt; Optimizing assets...<br />
                            &gt; Rendering complete.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemMonitor;
