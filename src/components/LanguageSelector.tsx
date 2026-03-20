import React from 'react';
import { Language } from '../translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex gap-4 mb-4">
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded transition-all ${
          currentLanguage === 'en'
            ? 'bg-vision-navy text-white'
            : 'bg-white/50 text-[#1a2b4b]/40 hover:text-vision-navy hover:bg-white'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange('af')}
        className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded transition-all ${
          currentLanguage === 'af'
            ? 'bg-vision-navy text-white'
            : 'bg-white/50 text-[#1a2b4b]/40 hover:text-vision-navy hover:bg-white'
        }`}
      >
        Afrikaans
      </button>
    </div>
  );
};

export default LanguageSelector;
