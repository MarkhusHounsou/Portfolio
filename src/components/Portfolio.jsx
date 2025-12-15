import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { projects } from '../projects/data';

const Portfolio = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (project) => {
        if (project.link) {
            navigate(project.link);
        } else {
            setSelectedProject(project);
        }
    };

    return (
        <section id="portfolio" className="section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                        {t('portfolio.title')}
                    </h3>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto' }}></div>
                </div>

                <div className="w-full">
                    <motion.div
                        className="portfolio-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                className=""
                                style={{ marginBottom: '30px' }}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
                                }}
                                whileHover={{ y: -10 }}
                            >
                                <div
                                    style={{
                                        position: 'relative',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                    }}
                                    className="portfolio-item-wrapper"
                                >
                                    <img
                                        src={project.img}
                                        alt={project.title}
                                        style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                        className="portfolio-img"
                                    />

                                    {/* Language Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        background: 'rgba(139,92,246,0.85)',
                                        color: 'white',
                                        padding: '5px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        backdropFilter: 'blur(5px)',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                    }}>
                                        {project.category}
                                    </div>

                                    {/* Hover Overlay */}
                                    <motion.div
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0, width: '100%', height: '100%',
                                            background: 'rgba(10,10,10,0.85)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            opacity: 0,
                                            backdropFilter: 'blur(5px)'
                                        }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h4 style={{ color: 'white', marginBottom: '20px' }}>{project.title}</h4>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <button
                                                onClick={() => handleProjectClick(project)}
                                                className="btn-outline"
                                                style={{ padding: '8px 15px', fontSize: '14px' }}
                                            >
                                                {t('portfolio.view_details')}
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="glass-card"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            style={{
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                width: '100%',
                                position: 'relative',
                                background: 'var(--bg-dark)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>

                            <img
                                src={selectedProject.img}
                                alt=""
                                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
                            />

                            <h3 style={{ marginBottom: '15px' }}>{selectedProject.modalTitle}</h3>

                            {selectedProject.richDescription ? (
                                <div style={{ marginBottom: '20px' }}>
                                    {selectedProject.richDescription}
                                </div>
                            ) : (
                                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{selectedProject.modalDesc}</p>
                            )}

                            {selectedProject.video && (
                                <a
                                    href={selectedProject.video}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-primary"
                                >
                                    {t('portfolio.watch_video')}
                                </a>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
