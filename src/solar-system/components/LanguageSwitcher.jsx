import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
            <button
                onClick={() => changeLanguage('fr')}
                className={`px-3 py-1 rounded-full border transition-all ${i18n.language === 'fr' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/50 hover:bg-white/10'}`}
            >
                FR
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1 rounded-full border transition-all ${i18n.language === 'en' ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/50 hover:bg-white/10'}`}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
