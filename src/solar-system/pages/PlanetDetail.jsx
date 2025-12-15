import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { planets } from '../data/planets';
import { FaArrowLeft, FaTemperatureHigh, FaRulerCombined, FaStopwatch, FaWeightHanging, FaLayerGroup, FaWind, FaMoon, FaHistory } from 'react-icons/fa';
import { IoPlanetSharp } from "react-icons/io5";

const PlanetDetail = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const planet = planets.find(p => p.id === id);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!planet) return;

        const ctx = gsap.context(() => {
            gsap.from(".header-content", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
            gsap.from(".planet-visual", { scale: 0.5, opacity: 0, duration: 1.2, delay: 0.2, ease: "elastic.out(1, 0.7)" });
            gsap.from(".bento-card", { y: 100, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.4, ease: "power2.out" });
            gsap.to(".floating-visual", { y: -10, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
        }, containerRef);

        return () => ctx.revert();
    }, [id, planet]);

    if (!planet) return <div className="text-white text-center mt-20 text-2xl">Planet not found</div>;

    const glowStyle = { boxShadow: `0 0 80px ${planet.color}40`, filter: `drop-shadow(0 0 20px ${planet.color})` };

    return (
        <div ref={containerRef} className="w-full h-full overflow-y-auto overflow-x-hidden pb-20 pt-24 px-4 md:px-8">
            <Link to="/solar" className="fixed top-6 left-6 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 group">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>{t('back', 'Back to Solar System')}</span>
            </Link>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16">
                    <div className="w-64 h-64 md:w-96 md:h-96 relative flex-shrink-0 planet-visual">
                        {planet.image ? (
                            <img src={planet.image} alt={planet.name} className="w-full h-full object-contain floating-visual" style={glowStyle} />
                        ) : (
                            <div className={`w-full h-full rounded-full floating-visual`} style={{ backgroundColor: planet.color, ...glowStyle }}></div>
                        )}
                    </div>

                    <div className="header-content flex-1 text-center md:text-left">
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4 uppercase tracking-wider">
                            {t(`planets.${planet.id}`, planet.name)}
                        </h1>
                        <p className="text-xl text-blue-200 font-light mb-6 flex items-center justify-center md:justify-start gap-2">
                            <IoPlanetSharp /> {t('planetType', 'Celestial Body')}
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl whitespace-pre-line border-l-4 border-blue-500/30 pl-6 italic">
                            "{planet.description[i18n.language]?.split('\n')[0] || planet.description.en.split('\n')[0]}"
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bento-card col-span-1 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="flex items-center gap-4 mb-2 text-orange-400">
                            <FaTemperatureHigh className="text-2xl group-hover:scale-110 transition-transform" />
                            <h3 className="uppercase tracking-widest text-sm font-semibold text-white/60">Temperature</h3>
                        </div>
                        <p className="text-2xl font-bold text-white ml-10">{planet.temp}</p>
                    </div>
                    <div className="bento-card col-span-1 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="flex items-center gap-4 mb-2 text-blue-400">
                            <FaRulerCombined className="text-2xl group-hover:scale-110 transition-transform" />
                            <h3 className="uppercase tracking-widest text-sm font-semibold text-white/60">Radius</h3>
                        </div>
                        <p className="text-2xl font-bold text-white ml-10">{planet.radius}</p>
                    </div>
                    <div className="bento-card col-span-1 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="flex items-center gap-4 mb-2 text-purple-400">
                            <FaStopwatch className="text-2xl group-hover:scale-110 transition-transform" />
                            <h3 className="uppercase tracking-widest text-sm font-semibold text-white/60">Orbit Period</h3>
                        </div>
                        <p className="text-2xl font-bold text-white ml-10">Unknown</p>
                        <div className="mt-2 text-xs text-white/40 ml-10">Speed: {planet.orbitSpeed}</div>
                    </div>
                    <div className="bento-card col-span-1 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="flex items-center gap-4 mb-2 text-green-400">
                            <FaWeightHanging className="text-2xl group-hover:scale-110 transition-transform" />
                            <h3 className="uppercase tracking-widest text-sm font-semibold text-white/60">Distance</h3>
                        </div>
                        <p className="text-2xl font-bold text-white ml-10">{planet.distance}</p>
                    </div>

                    <div className="bento-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 text-9xl text-white/5 rotate-12"><IoPlanetSharp /></div>
                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3"><IoPlanetSharp className="text-blue-400" /> {t('overview', 'Overview')}</h2>
                        <div className="prose prose-invert prose-lg max-w-none text-gray-300 whitespace-pre-line h-full overflow-y-auto pr-4 custom-scrollbar">
                            {planet.description[i18n.language] || planet.description.en}
                        </div>
                    </div>

                    <div className="bento-card col-span-1 md:col-span-2 lg:col-span-2 bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3"><FaLayerGroup className="text-yellow-400" /> {t('structure', 'Internal Structure')}</h2>
                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{planet.details.structure[i18n.language] || planet.details.structure.en}</p>
                        </div>
                        <div className="w-48 h-48 relative flex-shrink-0 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-400 bg-gray-700/50 flex items-center justify-center" title="Crust">
                                <div className="w-32 h-32 rounded-full border-4 border-orange-500 bg-orange-800/50 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]" title="Mantle">
                                    <div className="w-16 h-16 rounded-full bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.8)] animate-pulse" title="Core"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bento-card col-span-1 md:col-span-2 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3"><FaWind className="text-cyan-400" /> {t('atmosphere', 'Atmosphere')}</h2>
                        <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden mb-6 flex relative">
                            <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 w-[70%]"></div>
                            <div className="h-full bg-gradient-to-r from-purple-400 to-pink-300 w-[20%]"></div>
                            <div className="h-full bg-gray-400 w-[10%]"></div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{planet.details.atmosphere[i18n.language] || planet.details.atmosphere.en}</p>
                    </div>

                    <div className="bento-card col-span-1 md:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3"><FaMoon className="text-gray-200" /> {t('moons', 'Moons')}</h2>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{planet.details.moons[i18n.language] || planet.details.moons.en}</p>
                    </div>
                    <div className="bento-card col-span-1 md:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3"><FaHistory className="text-red-300" /> {t('history', 'History')}</h2>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line border-l-2 border-red-500/30 pl-4">{planet.details.history[i18n.language] || planet.details.history.en}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetDetail;
