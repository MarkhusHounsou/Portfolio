import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ img, title, desc }) => {
    return (
        <motion.div
            className="col-sm-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ marginBottom: '30px', perspective: 1000 }}
        >
            <div className="glass-card" style={{ height: '100%', textAlign: 'center', transition: 'all 0.3s ease' }}>
                <motion.img
                    src={img}
                    alt={title}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        width: '80px',
                        height: '80px',
                        marginBottom: '20px',
                        filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))'
                    }}
                />
                <h4 style={{ marginBottom: '15px', fontWeight: 700 }}>{title}</h4>
                <p style={{ color: 'var(--text-muted)' }}>{desc}</p>
            </div>
        </motion.div>
    );
};

const Services = () => {
    const { t } = useTranslation();

    return (
        <section id="service" className="section" style={{ position: 'relative' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                        {t('services.title')}
                    </h3>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto' }}></div>
                </div>

                <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <ServiceCard
                        img="/assets/img/front-end.svg"
                        title={t('services.frontend_title')}
                        desc={t('services.frontend_desc')}
                    />
                    <ServiceCard
                        img="/assets/img/back-end.svg"
                        title={t('services.backend_title')}
                        desc={t('services.backend_desc')}
                    />
                    <ServiceCard
                        img="/assets/img/adobe.png"
                        title={t('services.design_title')}
                        desc={t('services.design_desc')}
                    />
                </div>
            </div>
        </section>
    );
};

export default Services;
