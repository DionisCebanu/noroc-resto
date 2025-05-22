import React, { createContext, useState, useEffect, useCallback } from 'react';
    import enMessages from '@/lang/en.json';
    import frMessages from '@/lang/fr.json';
    import roMessages from '@/lang/ro.json';

    export const LanguageContext = createContext();

    const messages = {
      en: enMessages,
      fr: frMessages,
      ro: roMessages,
    };

    const availableLanguages = ['en', 'fr', 'ro'];

    export const LanguageProvider = ({ children }) => {
      const [language, setLanguage] = useState(() => {
        const storedLang = localStorage.getItem('appLanguage');
        return storedLang && availableLanguages.includes(storedLang) ? storedLang : 'en';
      });

      useEffect(() => {
        localStorage.setItem('appLanguage', language);
        document.documentElement.lang = language;
      }, [language]);

      const cycleLanguage = () => {
        setLanguage(prevLang => {
          const currentIndex = availableLanguages.indexOf(prevLang);
          const nextIndex = (currentIndex + 1) % availableLanguages.length;
          return availableLanguages[nextIndex];
        });
      };
      
      const t = useCallback((key, defaultText = '', replacements = {}) => {
        let message = messages[language]?.[key] || messages['en']?.[key] || defaultText || key;
        
        Object.keys(replacements).forEach(placeholder => {
          const regex = new RegExp(`{{${placeholder}}}`, 'g');
          message = message.replace(regex, replacements[placeholder]);
        });
        
        return message;
      }, [language]);

      return (
        <LanguageContext.Provider value={{ language, cycleLanguage, t, setLanguage, availableLanguages }}>
          {children}
        </LanguageContext.Provider>
      );
    };