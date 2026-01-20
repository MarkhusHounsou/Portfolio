import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import cvPdf from '../assets/docs/CVFINAL.pdf';

// Import Assets
import franceFlag from '../assets/ui/france.png';
import ukFlag from '../assets/ui/united-kingdom.png';
import spainFlag from '../assets/ui/spain.png';

import figmaIcon from '../assets/skills/figma.png';
import psIcon from '../assets/skills/photoshop.png';
import aiIcon from '../assets/skills/illustrator.png';
import prIcon from '../assets/skills/premiere.png';
import blenderIcon from '../assets/skills/blender.png';
import vscodeIcon from '../assets/skills/vscode.png';
import githubIcon from '../assets/social/github.png';
import dockerIcon from '../assets/skills/docker.png';

const About = () => {
    const { t } = useTranslation();
    const timelineRef = useRef(null);

    // Scroll animation for the timeline ball
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });

    const scrollY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const ballY = useTransform(scrollY, [0, 1], ["0%", "100%"]);

    // Combined and ordered events for the timeline
    const timelineEvents = [
        {
            type: 'exp',
            title: t('about.exp1.title'),
            place: t('about.exp1.place'),
            date: t('about.exp1.date'),
            desc: [t('about.exp1.desc1'), t('about.exp1.desc2'), t('about.exp1.desc3')],
            color: 'text-purple-400'
        },
        {
            type: 'edu',
            title: t('about.edu1.title'),
            place: t('about.edu1.place'),
            date: t('about.edu1.date'),
            desc: [t('about.edu1.desc1')],
            color: 'text-blue-400'
        },
        {
            type: 'exp',
            title: t('about.exp2.title'),
            place: t('about.exp2.place'),
            date: t('about.exp2.date'),
            desc: [t('about.exp2.desc1'), t('about.exp2.desc2'), t('about.exp2.desc3')],
            color: 'text-purple-400'
        },
        {
            type: 'edu',
            title: t('about.edu2.title'),
            place: t('about.edu2.place'),
            date: t('about.edu2.date'),
            desc: [t('about.edu2.desc1')],
            color: 'text-blue-400'
        },
        {
            type: 'exp',
            title: t('about.exp3.title'),
            place: t('about.exp3.place'),
            date: t('about.exp3.date'),
            desc: [t('about.exp3.desc1'), t('about.exp3.desc2'), t('about.exp3.desc3')],
            color: 'text-purple-400'
        },
        {
            type: 'edu',
            title: t('about.edu3.title'),
            place: t('about.edu3.place'),
            date: t('about.edu3.date'),
            desc: [t('about.edu3.desc1')],
            color: 'text-blue-400'
        }
    ];

    const tools = [
        { name: 'Figma', icon: figmaIcon },
        { name: 'Photoshop', icon: psIcon },
        { name: 'Illustrator', icon: aiIcon },
        { name: 'Premiere Pro', icon: prIcon },
        { name: 'Blender', icon: blenderIcon },
        { name: 'VS Code', icon: vscodeIcon },
        { name: 'Git', icon: githubIcon },
        { name: 'Docker', icon: dockerIcon }
    ];

    const languages = [
        { name: 'Français', level: t('about.lang_level.native'), percent: 100, flag: franceFlag },
        { name: 'English', level: t('about.lang_level.professional'), percent: 85, flag: ukFlag },
        { name: 'Español', level: t('about.lang_level.academic'), percent: 60, flag: spainFlag }
    ];

    return (
        <section id="about" className="section" style={{ background: 'transparent' }}>
            <div className="container mx-auto px-6">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {t('about.title')}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"></div>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                        {t('about.description')}
                    </p>
                    <motion.a
                        href={cvPdf}
                        download
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-bold text-white shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
                    >
                        {t('about.cv_button')}
                    </motion.a>
                </motion.div>

                {/* Experience & Education Section (Timeline) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h3 className="text-3xl font-bold text-center mb-16 text-white">
                        {t('about.exp_title')}
                    </h3>

                    <div className="relative" ref={timelineRef}>
                        {/* Central Vertical Line (Visible only on md+) */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white/10 hidden md:block" />

                        {/* Scrolling Ball */}
                        <motion.div
                            style={{ top: ballY }}
                            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 -mt-2"
                        />

                        <div className="space-y-12">
                            {timelineEvents.map((event, index) => (
                                <div key={index} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                    {/* Event Card */}
                                    <div className="w-full md:w-[45%]">
                                        <motion.div
                                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="glass-card p-8 hover:border-white/20 transition-all duration-300 group relative"
                                        >
                                            {/* Date */}
                                            <div className="text-sm font-bold text-white/90 mb-3 tracking-wider">
                                                {event.date}
                                            </div>

                                            {/* Title */}
                                            <h4 className="text-2xl font-black text-white mb-1 group-hover:text-purple-400 transition-colors">
                                                {event.title}
                                            </h4>

                                            {/* Place */}
                                            <p className="text-lg italic text-white/60 mb-4">
                                                {event.place}
                                            </p>

                                            {/* Description */}
                                            <ul className="space-y-2">
                                                {event.desc.map((item, i) => (
                                                    <li key={i} className="text-sm text-white/50 leading-relaxed flex items-start">
                                                        <span className="mr-2 text-white/30">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>

                                    {/* Timeline Dot (Static Reference) */}
                                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-4 h-4 rounded-full bg-zinc-950 border-2 border-white/20 z-10 scale-125">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    </div>

                                    {/* Empty Space for the other side on desktop */}
                                    <div className="hidden md:block w-[45%]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Software/Tools Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-20"
                >
                    <h3 className="text-3xl font-bold text-center mb-12 text-white">
                        {t('about.tools_title')}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-card p-6 text-center hover:border-purple-500/50 transition-all duration-150 flex flex-col items-center justify-center min-h-[160px] group"
                            >
                                <div className="w-16 h-16 mb-4 flex items-center justify-center p-2 bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-150">
                                    <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain filter drop-shadow-lg" />
                                </div>
                                <p className="text-white font-semibold">{tool.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Languages Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="text-3xl font-bold text-center mb-12 text-white">
                        {t('about.languages_title')}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {languages.map((lang, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 text-center group"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 overflow-hidden rounded-full shadow-lg border border-white/10 group-hover:scale-110 transition-transform">
                                    <img src={lang.flag} alt={lang.name} className="w-full h-full object-contain" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">{lang.name}</h4>
                                <p className="text-sm text-white/60 mb-4">{lang.level}</p>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${lang.percent}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
