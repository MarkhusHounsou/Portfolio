import React from 'react';
import { useTranslation } from 'react-i18next';
import Dashboard from './stats/Dashboard';

const Stats = () => {
    const { t } = useTranslation();

    return (
        <section id="stats" className="section" style={{ position: 'relative', padding: '100px 0' }}>
            {/* Background Blob */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '800px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(80px)',
                zIndex: -1
            }}></div>

            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{t('stats.title')}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>{t('stats.subtitle')}</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <Dashboard />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
