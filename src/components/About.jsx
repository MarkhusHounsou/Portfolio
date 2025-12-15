import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TypewriterText = ({ text }) => {
    // A simple typewriter effect
    const letters = Array.from(text);
    return (
        <motion.span>
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.05, delay: index * 0.02 }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

const TimelineItem = ({ year, title, place, desc, side }) => {
    return (
        <motion.div
            className={`timeline-item ${side}`}
            style={{
                display: 'flex',
                justifyContent: side === 'left' ? 'flex-end' : 'flex-start',
                marginBottom: '40px',
                width: '50%',
                position: 'relative',
                marginLeft: side === 'right' ? '50%' : '0',
                paddingRight: side === 'left' ? '30px' : '0',
                paddingLeft: side === 'right' ? '30px' : '0',
            }}
            initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="glass-card" style={{ padding: '20px', textAlign: side === 'left' ? 'right' : 'left', maxWidth: '400px', width: '100%' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{year}</span>
                <h4 style={{ margin: '5px 0', fontSize: '1.2rem' }}>{title}</h4>
                <p style={{ fontStyle: 'italic', marginBottom: '10px', color: '#ccc' }}>{place}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {desc.map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
            </div>
            {/* Dot */}
            <div style={{
                position: 'absolute',
                top: '20px',
                [side === 'left' ? 'right' : 'left']: '-6px',
                width: '12px',
                height: '12px',
                background: 'var(--accent)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--accent)'
            }}></div>
        </motion.div>
    );
};

const About = () => {
    const { t } = useTranslation();

    const experience = [
        {
            year: "Juillet 2025 - En cours",
            title: "Assistant Front Desk",
            place: "Insead, Fontainebleau",
            desc: ["Accueil et orientation visiteurs internationaux", "Gestion logistique et badges", "Support événements"]
        },
        {
            year: "Avril - Juin 2025",
            title: "Stagiaire Dev Web",
            place: "Léa Solidarité Femmes, Montgeron",
            desc: ["Diaporama Canva", "Maintenance WordPress", "Optimisation ergonomie"]
        },
        {
            year: "Juillet - Août 2023",
            title: "Employé E-commerce",
            place: "E.Leclerc, Varennes-sur-Seine",
            desc: ["Préparation commandes", "Gestion logistique", "Travail d'équipe"]
        }
    ];

    const education = [
        {
            year: "2023 - 2026",
            title: "BUT MMI",
            place: "IUT D'Artois / Meaux",
            desc: ["Spécialité Développement Web"]
        },
        {
            year: "2022 - 2023",
            title: "BUT Informatique",
            place: "UPEC Fontainebleau",
            desc: ["Fondamentaux informatiques"]
        },
        {
            year: "2019 - 2022",
            title: "Baccalauréat Technologique",
            place: "Lycée André Malraux",
            desc: ["Mention Bien"]
        }
    ];

    const tools = ["Photoshop", "Illustrator", "Premiere Pro", "Blender", "InDesign", "After Effects", "Canva"];
    const languages = [
        { lang: "Français", level: "Langue maternelle", icon: "🇫🇷" },
        { lang: "Anglais", level: "Niveau professionnel", icon: "🇬🇧" },
        { lang: "Espagnol", level: "Niveau scolaire", icon: "🇪🇸" }
    ];

    return (
        <section id="about" className="section" style={{ overflow: 'hidden' }}>
            <div className="container">
                {/* Profile Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: '30px', display: 'inline-block' }}
                    >
                        <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px' }}>
                            <span className="text-gradient">PROFIL</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}
                    >
                        <TypewriterText text="Étudiant en BUT 3 MMI (option Web), je recherche un stage pour avril 2026 orienté data ou dev ops. Créatif et curieux, je maîtrise HTML, CSS, JavaScript, PHP, React, et d'autres encore avec pour objectif d'apporter des solutions innovantes à vos projets digitaux." />
                    </motion.p>
                </div>

                {/* Timeline Section */}
                <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto 100px' }}>
                    {/* Center Line */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateX(-50%)'
                    }}></div>

                    <h3 style={{ textAlign: 'center', marginBottom: '50px', color: 'var(--accent)' }}>Expériences & Formation</h3>

                    {/* Interleave items just for visual balance or list sequentially? The CV separates them. 
                        Let's put Experience on Left, Education on Right visually? 
                        Or just a mixed timeline sorted by date? 
                        The CV has 2 columns. Let's do 2 columns: Exp Left, Edu Right could be messy on mobile.
                        Let's do a classic timeline where items alternate sides.
                    */}

                    {/* We will mix them for the timeline flow */}
                    <TimelineItem side="left" {...experience[0]} />
                    <TimelineItem side="right" {...education[0]} />
                    <TimelineItem side="left" {...experience[1]} />
                    <TimelineItem side="right" {...education[1]} />
                    <TimelineItem side="left" {...experience[2]} />
                    <TimelineItem side="right" {...education[2]} />
                </div>

                {/* Tools & Languages Grid */}
                <div className="row">
                    <div className="col-md-6" style={{ marginBottom: '40px' }}>
                        <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>Logiciels Maîtrisés</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                            {tools.map((tool, i) => (
                                <motion.div
                                    key={i}
                                    className="glass-card"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.1, background: 'rgba(139,92,246,0.3)' }}
                                    style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'default' }}
                                >
                                    {tool}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>Langues</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: '0 auto' }}>
                            {languages.map((lang, i) => (
                                <motion.div
                                    key={i}
                                    className="glass-card"
                                    initial={{ x: 50, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    style={{ display: 'flex', alignItems: 'center', padding: '15px 20px' }}
                                >
                                    <span style={{ fontSize: '2rem', marginRight: '20px' }}>{lang.icon}</span>
                                    <div>
                                        <h4 style={{ margin: 0 }}>{lang.lang}</h4>
                                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{lang.level}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
