import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const SystemMonitorGlitch = ({ onRepairComplete }) => {
    const { t } = useTranslation();
    // Game State
    const [gameState, setGameState] = useState('active');
    const [targetSequence, setTargetSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);

    // 6 Possible codes for the grid
    const codeOptions = ['A0', 'B1', 'C2', 'D3', 'E4', 'F5'];

    // Generate random 4-code sequence from the options
    useEffect(() => {
        const shuffled = [...codeOptions].sort(() => 0.5 - Math.random());
        setTargetSequence(shuffled.slice(0, 4));
    }, []);

    const handleButtonClick = (code) => {
        if (gameState !== 'active') return;

        // Check if the clicked code matches the *next* expected code
        const nextIndex = playerSequence.length;
        const expectedCode = targetSequence[nextIndex];

        if (code === expectedCode) {
            // Correct! Add to player sequence
            const newSeq = [...playerSequence, code];
            setPlayerSequence(newSeq);

            if (newSeq.length === targetSequence.length) {
                // Game Won
                setGameState('success');
                setTimeout(() => {
                    if (onRepairComplete) onRepairComplete();
                }, 1000); // Shorter delay before exit
            }
        }
        // No punishment for wrong click (as requested)
    };

    // Glitch animation variants
    const glitchVariants = {
        visible: { opacity: 1 },
        glitch: {
            x: [0, -2, 2, -1, 1, 0, 0, 0, -3, 3, 0],
            y: [0, 1, -1, 0, 0, 0, 2, -2, 0],
            opacity: [1, 0.9, 1, 0.8, 1],
            transition: {
                trigger: "loop",
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
            }
        }
    };

    if (gameState === 'success') {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', color: '#00ff9d' }}>
                <motion.h1
                    animate={{ scale: [1, 1.1, 1] }}
                    style={{ fontSize: '3rem', textShadow: '0 0 20px #00ff9d' }}
                >
                    SYSTEM RESTORED
                </motion.h1>
                <p>CLOSING CONNECTION...</p>
            </div>
        )
    }

    return (
        <motion.div
            style={{ padding: '30px', height: '100%', background: '#0a0a0a', position: 'relative', overflow: 'hidden', color: '#ff3366', fontFamily: 'monospace' }}
            variants={glitchVariants}
            animate="glitch"
        >
            {/* Scanlines Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', zIndex: 10, backgroundSize: '100% 2px, 3px 100%', pointerEvents: 'none' }} />

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.5rem', letterSpacing: '3px', textShadow: '2px 0 #00ffff', marginBottom: '5px' }}>CRITICAL ERROR</h2>
                <div style={{ fontSize: '0.8rem', color: '#fff', opacity: 0.8 }}>REPAIR SEQUENCE REQUIRED</div>
            </div>

            {/* The "Chain with Holes" - Shows progress and hint */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '4px' }}>
                {targetSequence.map((code, i) => {
                    const isRevealed = i === 0 || i < playerSequence.length; // First is always hint, or if solved
                    const isSolved = i < playerSequence.length;

                    return (
                        <div key={i} style={{
                            borderBottom: `2px solid ${isSolved ? '#00ff9d' : '#ff3366'}`,
                            padding: '5px 10px',
                            color: isSolved ? '#00ff9d' : '#fff',
                            minWidth: '40px',
                            textAlign: 'center',
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                        }}>
                            {isRevealed ? code : '??'}
                        </div>
                    );
                })}
            </div>

            {/* 3x3 Grid Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', maxWidth: '320px', margin: '0 auto' }}>
                {codeOptions.map((code) => {
                    // Visual feedback if already selected correctly
                    const isSelected = playerSequence.includes(code);

                    return (
                        <motion.button
                            key={code}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleButtonClick(code)}
                            disabled={isSelected}
                            style={{
                                padding: '15px',
                                background: isSelected ? 'rgba(0, 255, 157, 0.2)' : 'rgba(255, 51, 102, 0.1)',
                                border: `1px solid ${isSelected ? '#00ff9d' : '#ff3366'}`,
                                color: isSelected ? '#00ff9d' : '#ff3366',
                                fontSize: '1rem',
                                cursor: isSelected ? 'default' : 'pointer',
                                fontFamily: 'monospace',
                                opacity: isSelected ? 0.5 : 1
                            }}
                        >
                            {code}
                        </motion.button>
                    );
                })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
                &gt; SELECT THE CORRECT CODE TO ADVANCE_
            </div>
        </motion.div>
    );
};

export default SystemMonitorGlitch;
