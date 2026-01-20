import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import frFlag from '../assets/ui/france.png';
import ukFlag from '../assets/ui/united-kingdom.png';

const Header = () => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
        }
    };

    const changeLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
    };

    const navLinkStyle = {
        color: 'white',
        fontWeight: 600,
        textTransform: 'uppercase',
        padding: '10px 15px',
        fontSize: '14px',
        cursor: 'pointer'
    };

    const iconStyle = {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
        verticalAlign: 'middle'
    };

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                background: scrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                padding: scrolled ? '15px 0' : '25px 0',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'all 0.3s ease'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="site-logo">
                    <span style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>MH.</span>
                </div>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <a onClick={() => scrollToSection('hero')} className="nav-link" style={navLinkStyle}>{t('header.home')}</a>

                    {/* Section links (same-page) */}
                    <a onClick={() => scrollToSection('about')} className="nav-link" style={navLinkStyle}>{t('header.about')}</a>
                    <a onClick={() => scrollToSection('service')} className="nav-link" style={navLinkStyle}>{t('header.services')}</a>
                    <a onClick={() => scrollToSection('portfolio')} className="nav-link" style={navLinkStyle}>{t('header.portfolio')}</a>
                    <a onClick={() => scrollToSection('contact')} className="nav-link" style={navLinkStyle}>{t('header.contact')}</a>



                    {/* Language Switcher */}
                    <button
                        onClick={changeLanguage}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            padding: 0
                        }}
                        title="Switch Language"
                    >
                        <img
                            src={i18n.language === 'en' ? frFlag : ukFlag}
                            alt={i18n.language === 'en' ? "Passer en Français" : "Switch to English"}
                            style={iconStyle}
                        />
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" style={{ display: 'none', alignItems: 'center', gap: '15px' }}>
                    <button
                        onClick={changeLanguage}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '5px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src={i18n.language === 'en' ? frFlag : ukFlag}
                            alt={i18n.language === 'en' ? "Passer en Français" : "Switch to English"}
                            style={{ ...iconStyle, width: '28px', height: '28px' }}
                        />
                    </button>
                    <button
                        onClick={toggleMenu}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        ☰
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
