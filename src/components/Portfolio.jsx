import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt, FaPlay, FaTimes } from 'react-icons/fa';

import { useProjects } from '../projects/data';

const ProjectCard = ({ project, onClick, isFeatured = false }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${isFeatured ? 'md:col-span-2 md:row-span-2 min-h-[500px]' : 'min-h-[300px]'}`}
            onClick={() => onClick(project)}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            </div>

            {/* Content Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Category Badge */}
                <div className="self-start mb-auto transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="px-3 py-1 text-xs font-mono font-bold tracking-wider text-black bg-white rounded-full">
                        {project.category}
                    </span>
                </div>

                {/* Text Content */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className={`font-bold text-white mb-2 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                        {project.title}
                    </h3>

                    {isFeatured && (
                        <p className="text-white/70 mb-4 line-clamp-2 max-w-xl">
                            {t('projects.smf.intro')}
                        </p>
                    )}

                    <div className="flex items-center gap-2 text-white/50 text-sm group-hover:text-white transition-colors">
                        <span className="uppercase tracking-widest text-xs font-bold border-b border-transparent group-hover:border-white pb-0.5">
                            {t('portfolio.view_details')}
                        </span>
                        <FaExternalLinkAlt className="text-xs opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Portfolio = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null);
    const projects = useProjects();

    const handleProjectClick = (project) => {
        if (project.link) {
            navigate(project.link);
        } else {
            setSelectedProject(project);
        }
    };

    // Split projects for featured layout
    const featuredProject = projects[0];
    const otherProjects = projects.slice(1);

    return (
        <section id="portfolio" className="py-32 relative">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            {t('portfolio.title')}
                        </h2>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    </motion.div>
                </div>

                {/* Portfolio Showcase Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {/* Featured Project (SMF) - Takes 2x2 space on Desktop */}
                    {featuredProject && (
                        <ProjectCard
                            project={featuredProject}
                            onClick={handleProjectClick}
                            isFeatured={true}
                        />
                    )}

                    {/* Other Projects */}
                    {otherProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={handleProjectClick}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#0a0a0a] w-full max-w-[95vw] h-[90vh] overflow-hidden rounded-3xl border border-white/10 relative shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Scrollable Content Container */}
                            <div className="overflow-y-auto h-full custom-scrollbar">

                                {/* Close Button (Sticky) */}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="fixed top-6 right-8 z-50 p-3 bg-black/50 hover:bg-white hover:text-black rounded-full text-white transition-all duration-300 border border-white/10 backdrop-blur-sm"
                                >
                                    <FaTimes size={20} />
                                </button>

                                {/* Hero Image (Full Width, No Crop) */}
                                <div className="relative w-full">
                                    <img
                                        src={selectedProject.img}
                                        alt={selectedProject.title}
                                        className="w-full h-auto object-contain max-h-[70vh] bg-black/50"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                                </div>

                                {/* Content Section */}
                                <div className="p-8 lg:p-12 -mt-20 relative z-10">
                                    <div className="max-w-4xl mx-auto">
                                        <div className="flex items-center gap-4 mb-6">
                                            <h2 className="text-4xl md:text-5xl font-bold text-white">{selectedProject.modalTitle}</h2>
                                            <div className="px-4 py-1 text-sm font-mono font-bold tracking-wider text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20">
                                                {selectedProject.category}
                                            </div>
                                        </div>

                                        <div className="text-white/80 space-y-6 text-lg leading-relaxed mb-12">
                                            {selectedProject.richDescription || selectedProject.modalDesc}
                                        </div>

                                        {selectedProject.video && (
                                            <a
                                                href={selectedProject.video}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                            >
                                                <FaPlay size={14} />
                                                {t('portfolio.watch_video')}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
