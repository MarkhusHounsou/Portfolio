import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SystemMonitor from './SystemMonitor';
import SystemMonitorRadar from './SystemMonitorRadar';
import SystemMonitorStream from './SystemMonitorStream';
import SystemMonitorGlitch from './SystemMonitorGlitch';
import Terminal from './Terminal';
import Constellation from './Constellation';

const Dashboard = () => {
    const { t } = useTranslation();
    const [activeView, setActiveView] = useState('terminal');

    const [isMinimized, setIsMinimized] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [terminalKey, setTerminalKey] = useState(0);

    // Callback to switch views from the terminal interaction
    const handleLaunch = (viewId) => {
        setActiveView(viewId);
    };

    const handleReboot = () => {
        setActiveView('terminal');
        setTerminalKey(prev => prev + 1);
    };

    const handleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        if (!isFullscreen) setIsMinimized(false);
    };

    const renderBackButton = () => (
        <button
            onClick={() => setActiveView('terminal')}
            style={{
                position: 'absolute',
                top: '10px',
                right: '25px',
                zIndex: 20,
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'monospace'
            }}
        >
            &lt; return
        </button>
    );

    return (
        <motion.div
            className="glass-card"
            initial={{ height: '500px' }}
            animate={{
                height: isMinimized ? '45px' : (isFullscreen ? '90vh' : '500px'),
                width: isFullscreen ? '95vw' : '100%',
                position: isFullscreen ? 'fixed' : 'relative',
                zIndex: isFullscreen ? 1000 : 1,
                top: isFullscreen ? '5vh' : 'auto',
                left: isFullscreen ? '2.5vw' : 'auto'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                ...(isFullscreen ? { position: 'fixed', inset: '20px', width: 'auto', height: 'auto', margin: 0 } : {})
            }}
        >
            {/* Minimal Header */}
            <div style={{
                display: 'flex',
                background: 'rgba(0,0,0,0.6)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                padding: '10px 15px',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '45px',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* Reboot Button (Red) */}
                    <motion.div
                        onClick={handleReboot}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Reboot System"
                        style={{
                            width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                        }}
                    >
                        <span style={{ fontSize: '8px', color: 'rgba(0,0,0,0.6)', fontWeight: 'bold' }}>↻</span>
                    </motion.div>

                    {/* Minimize Button (Orange) */}
                    <motion.div
                        onClick={() => setIsMinimized(!isMinimized)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Minimize"
                        style={{
                            width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                        }}
                    >
                        <span style={{ fontSize: '8px', color: 'rgba(0,0,0,0.6)', fontWeight: 'bold' }}>_</span>
                    </motion.div>

                    {/* Fullscreen Button (Green) */}
                    <motion.div
                        onClick={handleFullscreen}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Toggle Fullscreen"
                        style={{
                            width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                        }}
                    >
                        <span style={{ fontSize: '8px', color: 'rgba(0,0,0,0.6)', fontWeight: 'bold' }}>{isFullscreen ? '✕' : '⤢'}</span>
                    </motion.div>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                    {activeView === 'terminal' ? 'root@dev:~' : `root@dev:~/launch/${activeView}`}
                </div>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, position: 'relative', background: 'rgba(10,10,12,0.8)' }}>
                <AnimatePresence mode="wait">
                    {!isMinimized && (
                        <motion.div
                            key={activeView}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            {activeView === 'monitor' && <div style={{ height: '100%', position: 'relative' }}>{renderBackButton()}<SystemMonitor /></div>}
                            {activeView === 'monitor-radar' && <div style={{ height: '100%', position: 'relative' }}>{renderBackButton()}<SystemMonitorRadar /></div>}
                            {activeView === 'monitor-stream' && <div style={{ height: '100%', position: 'relative' }}>{renderBackButton()}<SystemMonitorStream onExit={() => setActiveView('terminal')} /></div>}
                            {activeView === 'monitor-glitch' && <div style={{ height: '100%', position: 'relative' }}>{renderBackButton()}<SystemMonitorGlitch onRepairComplete={() => setActiveView('terminal')} /></div>}

                            {activeView === 'terminal' && <Terminal key={terminalKey} onLaunch={handleLaunch} />}

                            {activeView === 'constellation' && <div style={{ height: '100%', position: 'relative' }}>{renderBackButton()}<Constellation /></div>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Dashboard;
