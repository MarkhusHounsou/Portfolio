import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTicketAlt, FaUsers, FaChartLine, FaCheckCircle, FaLayerGroup, FaServer, FaMobileAlt, FaImage, FaCube, FaMobileAlt as FaTouchscreen, FaMusic, FaSearch, FaFilter, FaInfoCircle, FaCalculator, FaFilm, FaStar } from 'react-icons/fa';

// Import images
import smfThumbnail from '../assets/projects/Banniere.jpg';
import smfAffiche from '../assets/projects/Affiche du SMF officielle.jpg';
import smfCharte from '../assets/projects/Charte graphique SMF.png';
import smfVideo from '../assets/projects/smf-video.mp4';
import sushifastBanner from '../assets/projects/Sushifast.png';

// Cinescope image - using external URL for now
const cinescopeBanner = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1280&h=720&fit=crop&q=80';

export const useProjects = () => {
    const { t } = useTranslation();

    return [
        {
            id: 1,
            title: t('projects.smf.title'),
            category: 'Laravel / Full Stack',
            img: smfThumbnail,
            modalImage: smfAffiche,
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

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FaImage className="text-pink-400" /> {t('projects.smf.visuals_title')}
                        </h3>
                        <div className="space-y-4">
                            <img src={smfThumbnail} alt="Bannière SMF" className="rounded-2xl border border-white/10 w-full shadow-2xl" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <img src={smfCharte} alt="Charte Graphique" className="rounded-xl border border-white/10 w-full" />
                                <img src={smfAffiche} alt="Affiche Officielle" className="rounded-xl border border-white/10 w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            ),
            modalDesc: t('projects.smf.modalDesc'),
            tech: 'Laravel',
            video: smfVideo
        },
        {
            id: 2,
            title: t('projects.sushifast.title'),
            category: 'React / Vite / Bootstrap',
            img: sushifastBanner,
            modalTitle: t('projects.sushifast.title'),
            richDescription: (
                <div className="space-y-8">
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {t('projects.sushifast.intro')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400">
                                    <FaLayerGroup size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.sushifast.features.catalog_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.sushifast.features.catalog_desc')}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                    <FaSearch size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.sushifast.features.filter_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.sushifast.features.filter_desc')}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-green-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                                    <FaInfoCircle size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.sushifast.features.details_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.sushifast.features.details_desc')}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                                    <FaCalculator size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.sushifast.features.analysis_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.sushifast.features.analysis_desc')}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <FaLayerGroup className="text-blue-400" /> {t('projects.sushifast.stack_title')}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {['React 18', 'Vite.js', 'Bootstrap 5', 'React Router DOM', 'Context API', 'JSON Data'].map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm font-mono text-blue-200 border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-2xl border-l-4 border-blue-500">
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <FaServer className="text-blue-400" /> {t('projects.sushifast.deployment_title')}
                        </h3>
                        <p className="text-gray-300">
                            {t('projects.sushifast.deployment_desc')}
                        </p>
                    </div>
                </div>
            ),
            modalDesc: t('projects.sushifast.modalDesc'),
            tech: 'React',
            url: 'https://markhushounsou.github.io/sushifast/'
        },
        {
            id: 3,
            title: t('projects.cinescope.title'),
            category: 'React / Vite / API Rest',
            img: cinescopeBanner,
            modalTitle: t('projects.cinescope.title'),
            richDescription: (
                <div className="space-y-8">
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {t('projects.cinescope.intro')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-red-500/20 rounded-lg text-red-400">
                                    <FaFilm size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.cinescope.features.catalog_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.cinescope.features.catalog_desc')}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400">
                                    <FaStar size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.cinescope.features.ratings_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.cinescope.features.ratings_desc')}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                    <FaSearch size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.cinescope.features.search_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.cinescope.features.search_desc')}
                            </p>
                        </div>

                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-colors">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                                    <FaInfoCircle size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-white">{t('projects.cinescope.features.details_title')}</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                                {t('projects.cinescope.features.details_desc')}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <FaLayerGroup className="text-red-400" /> {t('projects.cinescope.stack_title')}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {['React 18', 'Vite.js', 'TailwindCSS', 'TMDB API', 'React Router', 'Axios'].map((tech) => (
                                <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm font-mono text-red-200 border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-900/20 to-blue-900/20 p-6 rounded-2xl border-l-4 border-red-500">
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <FaServer className="text-red-400" /> {t('projects.cinescope.api_title')}
                        </h3>
                        <p className="text-gray-300">
                            {t('projects.cinescope.api_desc')}
                        </p>
                    </div>
                </div>
            ),
            modalDesc: t('projects.cinescope.modalDesc'),
            tech: 'React',
            url: 'https://markhushounsou.github.io/Cinescope/'
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
