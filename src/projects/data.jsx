import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTicketAlt, FaUsers, FaChartLine, FaCheckCircle, FaLayerGroup, FaServer, FaMobileAlt, FaImage, FaCube, FaMobileAlt as FaTouchscreen, FaMusic } from 'react-icons/fa';

// Import images
// Import images
import smfBanner from '../assets/projects/smf-banner.jpg';
import smfVideo from '../assets/projects/smf-video.mp4';

export const useProjects = () => {
    const { t } = useTranslation();

    return [
        {
            id: 1,
            title: t('projects.smf.title'),
            category: 'Laravel / Full Stack',
            img: smfBanner,
            modalTitle: t('projects.smf.title'),
            richDescription: (
                <div className="space-y-8">
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {t('projects.smf.intro')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                                    <FaTicketAlt size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.smf.features.ticketing_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.smf.features.ticketing_desc')}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                    <FaUsers size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.smf.features.exhibitors_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.smf.features.exhibitors_desc')}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                                    <FaImage size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.smf.features.gallery_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.smf.features.gallery_desc')}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400">
                                    <FaChartLine size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.smf.features.dashboard_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.smf.features.dashboard_desc')}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <FaLayerGroup className="text-blue-400" /> {t('projects.smf.stack_title')}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {['Laravel 10', 'MySQL', 'Redis', 'TailwindCSS', 'Stripe API', 'Alpine.js'].map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm font-mono text-blue-200 border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 p-6 rounded-2xl border-l-4 border-red-500">
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <FaServer className="text-red-400" /> {t('projects.smf.challenge_title')}
                        </h3>
                        <p className="text-gray-300">
                            {t('projects.smf.challenge_desc')}
                            <br /><br />
                            <strong>{t('projects.smf.solution')}</strong> {t('projects.smf.solution_desc')}
                        </p>
                    </div>
                </div>
            ),
            modalDesc: t('projects.smf.modalDesc'),
            tech: 'Laravel',
            video: smfVideo
        },
        // Placeholders 2-6
        {
            id: 2,
            title: t('projects.coming_soon.title'),
            category: t('projects.coming_soon.category'),
            img: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Coming+Soon',
            modalTitle: t('projects.coming_soon.modalTitle'),
            modalDesc: t('projects.coming_soon.modalDesc'),
            tech: t('projects.coming_soon.tech'),
        },
        {
            id: 3,
            title: t('projects.coming_soon.title'),
            category: t('projects.coming_soon.category'),
            img: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Coming+Soon',
            modalTitle: t('projects.coming_soon.modalTitle'),
            modalDesc: t('projects.coming_soon.modalDesc'),
            tech: t('projects.coming_soon.tech'),
        },
        {
            id: 4,
            title: t('projects.coming_soon.title'),
            category: t('projects.coming_soon.category'),
            img: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Coming+Soon',
            modalTitle: t('projects.coming_soon.modalTitle'),
            modalDesc: t('projects.coming_soon.modalDesc'),
            tech: t('projects.coming_soon.tech'),
        },
        {
            id: 5,
            title: t('projects.coming_soon.title'),
            category: t('projects.coming_soon.category'),
            img: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Coming+Soon',
            modalTitle: t('projects.coming_soon.modalTitle'),
            modalDesc: t('projects.coming_soon.modalDesc'),
            tech: t('projects.coming_soon.tech'),
        },
        {
            id: 6,
            title: t('projects.coming_soon.title'),
            category: t('projects.coming_soon.category'),
            img: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Coming+Soon',
            modalTitle: t('projects.coming_soon.modalTitle'),
            modalDesc: t('projects.coming_soon.modalDesc'),
            tech: t('projects.coming_soon.tech'),
        }
    ];
};
