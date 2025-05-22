import React, { useContext, useState } from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Globe, Menu, X, Utensils } from 'lucide-react';

    const navItemVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    const mobileMenuVariants = {
      closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
      open: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeInOut" } }
    };

    const dropdownVariants = {
      closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
      open: { opacity: 1, y: 0, transition: { duration: 0.2 } }
    };

    const Navbar = () => {
      const { language, cycleLanguage, t, availableLanguages, setLanguage: setGlobalLanguage } = useContext(LanguageContext);
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

      const navLinks = [
        { to: "/", textKey: "navHome" },
        { to: "/menu", textKey: "navMenu" },
        { to: "/booking", textKey: "navBooking" },
        { to: "/about", textKey: "navAbout" },
      ];

      const getLanguageName = (langCode) => {
        switch (langCode) {
          case 'en': return t('english');
          case 'fr': return t('french');
          case 'ro': return t('romanian');
          default: return langCode.toUpperCase();
        }
      };
      
      const selectLanguage = (langCode) => {
        setGlobalLanguage(langCode);
        setIsLangDropdownOpen(false);
        setIsMobileMenuOpen(false);
      };

      return (
        <motion.nav 
          className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-background to-slate-900/95 shadow-lg z-50 border-b border-primary/20 backdrop-blur-md"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 sm:h-24">
              <Link to="/" className="flex items-center space-x-2 text-2xl sm:text-3xl font-bold text-accent hover:text-primary transition-colors">
                <Utensils className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">{t('appName')}</span>
              </Link>

              <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                {navLinks.map((link, index) => (
                  <motion.div key={link.to} variants={navItemVariants} initial="hidden" animate="visible" custom={index}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
                        ${isActive 
                          ? 'bg-primary/20 text-primary shadow-md' 
                          : 'text-gray-300 hover:bg-slate-700/50 hover:text-white hover:shadow-sm'
                        }`
                      }
                    >
                      {t(link.textKey)}
                    </NavLink>
                  </motion.div>
                ))}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="text-gray-300 hover:bg-slate-700/50 hover:text-white focus:ring-2 focus:ring-primary/50"
                    aria-label={t('language')}
                  >
                    <Globe size={18} className="mr-1.5" /> {getLanguageName(language)}
                  </Button>
                  <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-36 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1 z-20"
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      {availableLanguages.map(langCode => (
                        <button
                          key={langCode}
                          onClick={() => selectLanguage(langCode)}
                          className={`block w-full text-left px-4 py-2 text-sm ${language === langCode ? 'text-primary bg-primary/10' : 'text-gray-300 hover:bg-slate-700/50'}`}
                        >
                          {getLanguageName(langCode)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="md:hidden flex items-center">
                 <div className="relative mr-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="text-gray-300 hover:bg-slate-700/50 hover:text-white"
                    aria-label={t('language')}
                  >
                    <Globe size={20} />
                  </Button>
                  <AnimatePresence>
                  {isLangDropdownOpen && (
                     <motion.div 
                      className="absolute right-0 mt-2 w-36 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1 z-20"
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      {availableLanguages.map(langCode => (
                        <button
                          key={langCode}
                          onClick={() => selectLanguage(langCode)}
                          className={`block w-full text-left px-4 py-2 text-sm ${language === langCode ? 'text-primary bg-primary/10' : 'text-gray-300 hover:bg-slate-700/50'}`}
                        >
                          {getLanguageName(langCode)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-300 hover:bg-slate-700/50 hover:text-white"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                className="md:hidden bg-slate-800/90 backdrop-blur-sm border-t border-primary/10"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLangDropdownOpen(false); // Close lang dropdown when nav link clicked on mobile
                      }}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium
                        ${isActive 
                          ? 'bg-primary/20 text-primary' 
                          : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                        }`
                      }
                    >
                      {t(link.textKey)}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      );
    };

    export default Navbar;