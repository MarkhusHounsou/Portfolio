import React from 'react';
import { useTranslation } from 'react-i18next';

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
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'white',
        margin: '0 5px',
        transition: 'all 0.3s ease'
    };

    return (
        <footer style={{
            background: '#050505',
            padding: '50px 0',
            borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div className="container">
                <div className="row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>

                    <div className="col-sm-4" style={{ textAlign: 'center', marginBottom: '20px', flex: '1' }}>
                        <div className="social-links">
                            <a href="#" style={socialLinkStyle} className="social-icon"><i className="icon-facebook"></i></a>
                            <a href="#" style={socialLinkStyle} className="social-icon"><i className="icon-twitter"></i></a>
                            <a href="#" style={socialLinkStyle} className="social-icon"><i className="icon-linkedin"></i></a>
                            <a href="#" style={socialLinkStyle} className="social-icon"><i className="icon-gplus"></i></a>
                        </div>
                    </div>

                    <div className="col-sm-4" style={{ textAlign: 'center', marginBottom: '20px', flex: '1' }}>
                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                            &copy; {currentYear} Makhus Hounsou. {t('footer.rights')}
                        </p>
                    </div>

                    <div className="col-sm-4" style={{ textAlign: 'center', flex: '1' }}>
                        <a
                            href="#hero"
                            style={{
                                display: 'inline-block',
                                padding: '10px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '50%',
                                color: 'white'
                            }}
                        >
                            <i className="icon-up"></i>
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
