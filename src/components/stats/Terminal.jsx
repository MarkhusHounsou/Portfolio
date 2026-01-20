import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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

    return (
        <div
            ref={containerRef}
            style={{
                padding: '20px',
                height: '100%',
                // CRITICAL: Flex container needs this to handle overflow correctly
                minHeight: 0,
                flex: 1,
                fontFamily: "'Courier New', Courier, monospace",
                overflowY: 'auto',
                color: '#ccc',
                fontSize: '0.95rem',
                scrollBehavior: 'smooth'
            }}
        >
            {lines.map((line, i) => (
                <div key={i} style={{ marginBottom: '5px', color: line.color || (line.text.startsWith('>') ? '#fff' : '#ccc') }}>
                    {line.text.startsWith('[OK]') ? (
                        <span><span style={{ color: '#00ff9d' }}>[OK]</span> {line.text.substring(4)}</span>
                    ) : (
                        line.text
                    )}
                </div>
            ))}

            {isComplete && (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div onClick={() => handleChoice('monitor-radar', 'launch radar_monitor')} style={{ cursor: 'pointer', color: '#00ff9d', fontFamily: 'monospace' }}>[1] MONITOR: RADAR</div>
                    <div onClick={() => handleChoice('monitor-stream', 'launch stream_monitor')} style={{ cursor: 'pointer', color: '#00ccff', fontFamily: 'monospace' }}>[2] MONITOR: STREAM</div>
                    <div onClick={() => handleChoice('monitor-glitch', 'launch glitch_monitor')} style={{ cursor: 'pointer', color: '#ff3366', fontFamily: 'monospace' }}>[3] MONITOR: GLITCH</div>
                    <div onClick={() => handleChoice('constellation', 'init neural_net')} style={{ cursor: 'pointer', color: '#8b5cf6', fontFamily: 'monospace' }}>[4] INIT NEURAL_NET</div>
                </div>
            )}
        </div>
    );
};

export default Terminal;
