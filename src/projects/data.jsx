import React from 'react';
import { FaTicketAlt, FaUsers, FaChartLine, FaCheckCircle, FaLayerGroup, FaServer, FaMobileAlt, FaImage } from 'react-icons/fa';

export const projects = [
    {
        id: 1,
        title: 'Summer Motor Fest',
        category: 'Laravel / Full Stack',
        img: '/assets/img/Banniere copie_page-0001.jpg',
        modalTitle: 'Summer Motor Fest',
        // Rich Description using JSX
        richDescription: (
            <div className="space-y-8">
                {/* Intro */}
                <p className="text-gray-300 leading-relaxed text-lg">
                    Le **Summer Motor Fest** est bien plus qu'un simple site web : c'est le cœur numérique d'un festival automobile d'envergure. Conçue pour absorber un trafic intense, cette plateforme gère l'intégralité de l'expérience, de la vente de billets à l'inscription des exposants, en passant par la gestion administrative.
                </p>

                {/* Key Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                                <FaTicketAlt size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white">Billetterie Intelligente</h4>
                        </div>
                        <p className="text-sm text-gray-400">
                            Système complet avec génération de QR Codes sécurisés, envoi automatique par email et scan à l'entrée via une application dédiée.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                <FaUsers size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white">Espace Exposants</h4>
                        </div>
                        <p className="text-sm text-gray-400">
                            Workflow complet d'inscription : soumission de dossier, validation par les admins, paiement en ligne et attribution d'emplacement.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-green-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                                <FaImage size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white">Galerie Interactive</h4>
                        </div>
                        <p className="text-sm text-gray-400">
                            Upload massif de photos avec compression automatique et affichage optimisé (Lazy Loading) pour une expérience fluide sur mobile.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400">
                                <FaChartLine size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-white">Dashboard Admin</h4>
                        </div>
                        <p className="text-sm text-gray-400">
                            Vue d'aigle sur l'événement : CA en temps réel, nombre d'entrées, gestion des bénévoles et outils de modération.
                        </p>
                    </div>
                </div>

                {/* Tech Stack Chips */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <FaLayerGroup className="text-blue-400" /> Stack Technique
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {['Laravel 10', 'MySQL', 'Redis', 'TailwindCSS', 'Stripe API', 'Alpine.js'].map((tech) => (
                            <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm font-mono text-blue-200 border border-white/5">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Challenges Section */}
                <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 p-6 rounded-2xl border-l-4 border-red-500">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <FaServer className="text-red-400" /> Challenge Majeur : La Charge
                    </h3>
                    <p className="text-gray-300">
                        Le plus grand défi a été de gérer l'ouverture de la billetterie. Avec des milliers de connexions simultanées, la base de données était sous pression.
                        <br /><br />
                        <strong>Solution :</strong> Mise en place d'un système de <em>Queues</em> (Files d'attente) pour le traitement des emails et paiements, couplé à un cache <strong>Redis</strong> agressif pour les requêtes de lecture. Résultat : 0 downtime.
                    </p>
                </div>
            </div>
        ),
        modalDesc: 'Plateforme événementielle complète (Billetterie, Exposants, Admin).', // Fallback
        tech: 'Laravel',
        video: '/assets/img/video promotionnelle réseaux sociaux_smf.mp4'
    },
    {
        id: 2,
        title: 'Système Solaire 3D',
        category: 'React / GSAP / 3D',
        img: '/solar-system/jupiter.png', // Using Jupiter image as cover or I should use a generic one? I'll use Jupiter for now as it looks cool.
        modalTitle: 'Système Solaire Interactif',
        richDescription: (
            <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg">
                    Une exploration interactive de notre système solaire. Découvrez les planètes en 3D, leurs caractéristiques détaillées et des animations fluides grâce à GSAP.
                    Ce projet met en avant l'utilisation d'animations complexes et de transitions fluides pour une expérience utilisateur immersive.
                </p>
                <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-mono border border-blue-500/30">React</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-mono border border-green-500/30">GSAP</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-mono border border-purple-500/30">TailwindCSS</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-mono border border-yellow-500/30">React Router</span>
                </div>
            </div>
        ),
        tech: 'React & GSAP',
        link: '/solar'
    },
    {
        id: 3,
        title: 'Projet à venir',
        category: 'Coming Soon',
        img: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Coming+Soon',
        modalTitle: 'Projet en cours de développement',
        modalDesc: 'Ce projet est actuellement en phase de conception. Plus de détails seront disponibles prochainement.',
        tech: 'In Progress',
    },
    {
        id: 4,
        title: 'Projet à venir',
        category: 'Coming Soon',
        img: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Coming+Soon',
        modalTitle: 'Projet en cours de développement',
        modalDesc: 'Ce projet est actuellement en phase de conception. Plus de détails seront disponibles prochainement.',
        tech: 'In Progress',
    },
    {
        id: 5,
        title: 'Projet à venir',
        category: 'Coming Soon',
        img: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Coming+Soon',
        modalTitle: 'Projet en cours de développement',
        modalDesc: 'Ce projet est actuellement en phase de conception. Plus de détails seront disponibles prochainement.',
        tech: 'In Progress',
    },
    {
        id: 6,
        title: 'Projet à venir',
        category: 'Coming Soon',
        img: 'https://placehold.co/600x400/101010/FFFFFF/png?text=Coming+Soon',
        modalTitle: 'Projet en cours de développement',
        modalDesc: 'Ce projet est actuellement en phase de conception. Plus de détails seront disponibles prochainement.',
        tech: 'In Progress',
    }
];
