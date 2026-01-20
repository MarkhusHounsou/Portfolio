import React from 'react';
import { useTranslation } from 'react-i18next';
import githubLogo from '../assets/social/github.png';
import linkedinLogo from '../assets/social/linkedin.png';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const socialLinkStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        marginRight: '10px',
        transition: 'all 0.3s ease',
        background: 'rgba(255,255,255,0.05)',
        textDecoration: 'none',
        fontSize: '1.2rem'
    };

    const navLinkStyle = {
        color: 'rgba(255,255,255,0.6)',
        textDecoration: 'none',
        marginBottom: '10px',
        display: 'block',
        fontSize: '0.95rem',
        transition: 'color 0.3s ease'
    };

    return (
        <footer className="relative bg-[#050505] text-white pt-20 border-t border-white/5 font-[var(--font-primary)]">

            {/* Main Content */}
            <div className="container mx-auto px-6 pb-16">
                <div className="flex flex-col md:flex-row justify-between gap-12">

                    {/* LEFT COLUMN: Identity & Brand */}
                    <div className="w-full md:w-5/12">
                        {/* Logo / Name - Removed triangle for perfect left alignment */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold tracking-wide">MAKHUS HOUNSOU</h3>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-white/80 mb-2 font-medium">
                            {t('footer.role')}
                        </p>
                        <p className="font-mono text-sm text-white/50 mb-8">
                            {t('footer.stack')}
                        </p>

                        {/* Social Icons with Images */}
                        <div className="flex mb-8">
                            <a href="https://github.com/mhounsou" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} className="hover:bg-white hover:scale-110 transition-transform">
                                <img src={githubLogo} alt="GitHub" className="w-5 h-5 object-contain" />
                            </a>
                            <a href="https://linkedin.com/in/makhus-hounsou" target="_blank" rel="noopener noreferrer" style={socialLinkStyle} className="hover:bg-white hover:scale-110 transition-transform">
                                <img src={linkedinLogo} alt="LinkedIn" className="w-5 h-5 object-contain" />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Navigation & Contact */}
                    <div className="w-full md:w-6/12 flex flex-col md:flex-row gap-12 md:gap-24">

                        {/* Navigation Links */}
                        <div className="flex-1">
                            <h4 className="text-lg font-bold mb-6 text-white">{t('footer.nav_title')}</h4>
                            <a href="#hero" style={navLinkStyle} className="hover:text-white hover:pl-1 transition-all">Home</a>
                            <a href="#services" style={navLinkStyle} className="hover:text-white hover:pl-1 transition-all">Services</a>
                            <a href="#portfolio" style={navLinkStyle} className="hover:text-white hover:pl-1 transition-all">Portfolio</a>
                            <a href="#stats" style={navLinkStyle} className="hover:text-white hover:pl-1 transition-all">Dev Dashboard</a>
                        </div>

                        {/* Contact Info */}
                        <div className="flex-1">
                            <h4 className="text-lg font-bold mb-6 text-white">{t('footer.contact_title')}</h4>
                            <div className="mb-4">
                                <p className="text-white/40 text-xs uppercase mb-1">Phone</p>
                                <a href="tel:0658566498" className="text-white/80 text-sm hover:text-yellow-500 transition-colors">
                                    {t('footer.phone')}
                                </a>
                            </div>
                            <div className="mb-4">
                                <p className="text-white/40 text-xs uppercase mb-1">Email</p>
                                <a href="mailto:hounsoumarkhus2004@gmail.com" className="text-white/80 text-sm hover:text-yellow-500 transition-colors break-all">
                                    {t('footer.email')}
                                </a>
                            </div>
                            <div className="mt-6">
                                <a href="#contact" className="text-yellow-500 text-sm font-semibold hover:underline flex items-center gap-2">
                                    {t('footer.contact_btn')} →
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Back To Top Button - Centered Globally */}
                <div className="flex justify-center">
                    <a
                        href="#hero"
                        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white hover:underline transition-all duration-300 group"
                    >
                        <i className="icon-up group-hover:-translate-y-0.5 transition-transform mb-10"></i>
                        {t('footer.back_to_top')}
                    </a>
                </div>
            </div>

            {/* Bottom Bar - Neutral Dark */}
            <div className="bg-black/40 py-6 text-center border-t border-white/5">
                <p className="text-white/30 text-xs font-bold tracking-wider">
                    &copy; {currentYear} MAKHUS HOUNSOU. {t('footer.rights').toUpperCase()}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
