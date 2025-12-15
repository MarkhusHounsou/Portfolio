import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { planets } from '../data/planets';

const SolarSystem = () => {
    const { t } = useTranslation();
    const systemRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate planets orbiting (exclude Sun)
            planets.filter(p => p.id !== 'sun').forEach((planet, index) => {
                const orbit = document.getElementById(`orbit-${planet.id}`);
                const planetEl = document.getElementById(`planet-${planet.id}`);

                // Randomize start position
                gsap.set(orbit, { rotation: Math.random() * 360 });

                // Orbit animation
                gsap.to(orbit, {
                    rotation: "+=360",
                    duration: 20 + index * 10, // Farther planets move slower
                    repeat: -1,
                    ease: "none"
                });

                // Counter-rotate planet so it stays upright (optional, but good for labels)
                gsap.to(planetEl, {
                    rotation: "-=360",
                    duration: 20 + index * 10,
                    repeat: -1,
                    ease: "none"
                });
            });

            // Reveal animation
            gsap.from(".planet-system", {
                scale: 0,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "elastic.out(1, 0.5)"
            });
        }, systemRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={systemRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <h1 className="absolute top-8 left-1/2 transform -translate-x-1/2 text-4xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-500 z-10 pointer-events-none">
                {t('solarSystem', 'Solar System')}
            </h1>

            <Link to="/solar/planet/sun" className="absolute w-24 h-24 planet-sphere planet-sun z-10 cursor-pointer hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-[0_0_50px_#FDB813]">
            </Link>

            {planets.filter(p => p.id !== 'sun').map((planet, index) => {
                const orbitSize = 200 + index * 70; // Diameter
                const planetSize = Math.max(15, 40 - index * 2);

                return (
                    <div
                        key={planet.id}
                        id={`orbit-${planet.id}`}
                        className="planet-system absolute rounded-full border border-white/10 pointer-events-none"
                        style={{
                            width: `${orbitSize}px`,
                            height: `${orbitSize}px`
                        }}
                    >
                        <Link
                            to={`/solar/planet/${planet.id}`}
                            id={`planet-${planet.id}`}
                            className="absolute top-1/2 -right-[10px] transform -translate-y-1/2 pointer-events-auto group cursor-pointer"
                            style={{ width: `${planetSize}px`, height: `${planetSize}px` }}
                        >
                            <div
                                className={`w-full h-full planet-sphere planet-${planet.id} group-hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300`}
                            ></div>

                            {planet.id === 'saturn' && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] saturn-ring pointer-events-none opacity-80"></div>
                            )}

                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {t(`planets.${planet.id}`, planet.name)}
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default SolarSystem;
