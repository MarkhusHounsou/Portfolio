import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Terminal = ({ onLaunch }) => {
    // const { t } = useTranslation(); // Disabled for English-only terminal
    const [lines, setLines] = useState([
        { text: "Initializing kernel...", type: "cmd" },
    ]);
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        // Hardcoded English Script
        const script = [
            { text: "loading modules...", delay: 300 },
            { text: "[OK] REACT_CORE loaded", delay: 150 },
            { text: "[OK] LARAVEL_BRIDGE established", delay: 150 },
            { text: "> analysing skills...", delay: 400 },
            { text: "  - JavaScript: EXPERT", delay: 50 },
            { text: "  - PHP/Laravel: ADVANCED", delay: 50 },
            { text: "BUILD SUCCESSFUL in 1.42s", delay: 200, color: "#00ff9d" },
            { text: "Select visualization mode:", delay: 500, type: "prompt" }
        ];

        let currentIndex = 0;
        let timeout;

        const runScript = () => {
            if (currentIndex >= script.length) {
                setIsComplete(true);
                return;
            }

            const step = script[currentIndex];
            timeout = setTimeout(() => {
                setLines(prev => [...prev, { text: step.text, color: step.color }]);
                currentIndex++;
                runScript();
            }, step.delay);
        };

        runScript();

        return () => clearTimeout(timeout);
    }, []);

    // Auto-scroll logic: use specific container and ensure scroll moves
    useEffect(() => {
        if (containerRef.current) {
            // Force scroll to very bottom
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    const handleChoice = (view, cmd) => {
        setLines(prev => [...prev, { text: `> ${cmd}`, color: '#fff' }]);
        setLines(prev => [...prev, { text: `Launch ${view}...`, color: '#eab308' }]);
        setTimeout(() => {
            onLaunch(view);
        }, 800);
    };

    const [systemFreq, setSystemFreq] = useState(1.72);
    useEffect(() => {
        if (!isComplete) return;
        const interval = setInterval(() => {
            setSystemFreq(prev => {
                const change = (Math.random() * 0.1) - 0.05;
                const next = prev + change;
                return Math.max(1.5, Math.min(1.9, next));
            });
        }, 1500);
        return () => clearInterval(interval);
    }, [isComplete]);

    return (
        <div
            ref={containerRef}
            style={{
                padding: '20px',
                height: '100%',
                minHeight: 0,
                flex: 1,
                fontFamily: "'Courier New', Courier, monospace",
                overflowY: 'auto',
                color: '#ccc',
                fontSize: '0.95rem',
                scrollBehavior: 'smooth',
                position: 'relative'
            }}
        >
            {/* System Activity Monitor (Top Right) */}
            {isComplete && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '25px',
                    textAlign: 'right',
                    color: '#00ff9d',
                    zIndex: 10,
                    padding: '15px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,255,157,0.2)',
                    boxShadow: '0 0 30px rgba(0,255,157,0.1)',
                    pointerEvents: 'none'
                }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', opacity: 0.7, marginBottom: '8px', letterSpacing: '2px' }}>SYSTEM_ACTIVITY</div>
                    <div style={{ width: '200px', height: '60px', overflow: 'hidden', position: 'relative' }}>
                        <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                            {[10, 20, 30].map(y => (
                                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(0,255,157,0.05)" strokeWidth="0.5" />
                            ))}
                            <path d="M0,20 L100,20" stroke="rgba(0,255,157,0.1)" strokeWidth="0.5" />

                            {/* Static Pulse Layer */}
                            <motion.path
                                d="M0,20 L10,20 L15,18 L18,22 L20,5 L23,35 L26,20 L30,20 L45,20 L50,15 L52,25 L55,20 L70,20 L75,5 L80,35 L85,20 L100,20"
                                fill="none"
                                stroke="#00ff9d"
                                strokeWidth="0.5"
                                opacity="0.1"
                                animate={{ x: [0, 100] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Main Active Motif - reacts to systemFreq */}
                            <motion.path
                                d="M0,20 L10,20 L15,18 L18,22 L20,5 L23,35 L26,20 L30,20 L45,20 L50,15 L52,25 L55,20 L70,20 L75,5 L80,35 L85,20 L100,20"
                                fill="none"
                                stroke="#00ff9d"
                                strokeWidth="2.5"
                                initial={{ pathLength: 0 }}
                                animate={{
                                    pathLength: [0, 1],
                                    opacity: [0.4, 1, 0.4],
                                    x: [-100, 0],
                                    // Motif changes: more aggressive spikes at higher GHZ
                                    scaleY: [1, systemFreq - 0.5, 1],
                                }}
                                style={{ transformOrigin: 'center' }}
                                transition={{
                                    pathLength: { duration: 2 / systemFreq, repeat: Infinity, ease: "linear" },
                                    opacity: { duration: 2 / systemFreq, repeat: Infinity, ease: "linear" },
                                    x: { duration: 2 / systemFreq, repeat: Infinity, ease: "linear" },
                                    scaleY: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                }}
                            />
                        </svg>
                    </div>
                    <div style={{ fontSize: '0.9rem', marginTop: '10px', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>CPU_CLOCK:</span>
                        <motion.span
                            key={systemFreq}
                            initial={{ scale: 0.9, opacity: 0.7 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ fontWeight: 'bold' }}
                        >
                            {systemFreq.toFixed(3)} GHz
                        </motion.span>
                    </div>
                </div>
            )}

            <div style={{ position: 'relative', zIndex: 1, paddingRight: isComplete ? '20px' : '0' }}>
                <div style={{ maxWidth: isComplete ? 'calc(100% - 240px)' : '100%' }}>
                    {lines.map((line, i) => (
                        <div key={i} style={{ marginBottom: '5px', color: line.color || (line.text.startsWith('>') ? '#fff' : '#ccc') }}>
                            {line.text.startsWith('[OK]') ? (
                                <span><span style={{ color: '#00ff9d' }}>[OK]</span> {line.text.substring(4)}</span>
                            ) : (
                                line.text
                            )}
                        </div>
                    ))}
                </div>

                {isComplete && (
                    <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', paddingBottom: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div onClick={() => handleChoice('monitor-radar', 'SCAN RADAR GRID')} style={{ cursor: 'pointer', color: '#00ff9d', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '10px', width: 'fit-content' }}>
                            <span style={{ opacity: 0.5 }}>[1]</span> SCAN RADAR GRID
                        </div>
                        <div onClick={() => handleChoice('monitor-stream', 'SYNC DATA STREAM')} style={{ cursor: 'pointer', color: '#00ccff', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '10px', width: 'fit-content' }}>
                            <span style={{ opacity: 0.5 }}>[2]</span> SYNC DATA STREAM
                        </div>
                        <div onClick={() => handleChoice('monitor-glitch', 'RESOLVE BUFFER GLITCH')} style={{ cursor: 'pointer', color: '#ff3366', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '10px', width: 'fit-content' }}>
                            <span style={{ opacity: 0.5 }}>[3]</span> RESOLVE BUFFER GLITCH
                        </div>
                        <div onClick={() => handleChoice('constellation', 'INIT NEURAL NET')} style={{ cursor: 'pointer', color: '#8b5cf6', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '10px', width: 'fit-content' }}>
                            <span style={{ opacity: 0.5 }}>[4]</span> INIT NEURAL NET
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Terminal;
