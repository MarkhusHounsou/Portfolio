import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCode, FaServer, FaPaintBrush } from 'react-icons/fa';

/**
 * Service Card Component
 * Uses Tailwind + Framer Motion for "Glassmorphic Intelligence" look
 */
const ServiceCard = ({ icon: Icon, title, desc, tags }) => {
    // Convert comma-separated string to array
    const tagList = tags ? tags.split(', ') : [];

    return (
        <motion.div
            className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
                y: -10,
                boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.15)"
            }}
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Icon Wrapper */}
            <div className="relative z-10 w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500">
                <Icon className="text-3xl text-purple-400 group-hover:text-white transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                    {title}
                </h4>
                <p className="text-white/60 mb-8 leading-relaxed">
                    {desc}
                </p>

                {/* Tech Tags - Reveal on hover/always visible but styled */}
                <div className="flex flex-wrap gap-2">
                    {tagList.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-purple-200/70 border border-white/5 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: FaCode,
            titleKey: 'services.frontend_title',
            descKey: 'services.frontend_desc',
            tagsKey: 'services.frontend_tags'
        },
        {
            icon: FaServer,
            titleKey: 'services.backend_title',
            descKey: 'services.backend_desc',
            tagsKey: 'services.backend_tags'
        },
        {
            icon: FaPaintBrush,
            titleKey: 'services.design_title',
            descKey: 'services.design_desc',
            tagsKey: 'services.design_tags'
        }
    ];

    return (
        <section id="services" className="relative py-32 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            {t('services.title')}
                        </h2>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            icon={service.icon}
                            title={t(service.titleKey)}
                            desc={t(service.descKey)}
                            tags={t(service.tagsKey)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
