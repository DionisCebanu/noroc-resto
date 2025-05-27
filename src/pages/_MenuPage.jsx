import React, { useState, useEffect, useContext } from 'react';
    import { motion } from 'framer-motion';
    import MenuConstructorModal from '@/components/menu/MenuConstructorModal';
    import MenuContent from '@/components/menu/MenuContent';
    import { initialMenuData, categoriesData as rawCategoriesData, getAllMenuItems } from '@/data/menuData.jsx';
    import { LanguageContext } from '@/context/LanguageContext';
    import { AppContext } from '@/App';
    import { Button } from '@/components/ui/button';
    import { ChefHat, MousePointerSquare } from 'lucide-react';

    const pageVariants = {
      initial: { opacity: 0, x: "100vw" },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: "-100vw" }
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.5
    };

    const MenuPage = () => {
      const { t, language } = useContext(LanguageContext);
      const { isAuthenticated, hasReservation } = useContext(AppContext);
      
      const [categoriesData, setCategoriesData] = useState([]);
      const [selectedCategory, setSelectedCategory] = useState(null); // Initialize to null
      const [menuItems, setMenuItems] = useState([]);
      const [isConstructorOpen, setIsConstructorOpen] = useState(false);
      const [allMenuItems, setAllMenuItems] = useState([]);
      const [hasMadeInitialSelection, setHasMadeInitialSelection] = useState(false);

      useEffect(() => {
        const translatedCategories = rawCategoriesData.map(cat => ({
          ...cat,
          name: t(cat.nameKey, cat.defaultName)
        }));
        setCategoriesData(translatedCategories);

        const lastSelected = localStorage.getItem('lastSelectedCategory');
        if (lastSelected && translatedCategories.some(cat => cat.id === lastSelected)) {
          setSelectedCategory(lastSelected);
          setHasMadeInitialSelection(true); // If loaded from localStorage, consider it an initial selection
        }
        // No automatic selection of the first category if nothing in localStorage
      }, [t, language]);

      useEffect(() => {
        if (selectedCategory) {
          localStorage.setItem('lastSelectedCategory', selectedCategory);
          const itemsForCategory = initialMenuData[selectedCategory] || [];
          const translatedItems = itemsForCategory.map(item => ({
            ...item,
            name: t(item.nameKey, item.defaultName),
            description: t(item.descriptionKey, item.defaultDescription),
          }));
          setMenuItems(translatedItems);
        } else {
          setMenuItems([]); // Clear menu items if no category is selected
        }
        
        const storedMenu = localStorage.getItem('restaurantMenu');
        if (!storedMenu) {
          localStorage.setItem('restaurantMenu', JSON.stringify(initialMenuData));
        }

        const allRawItems = getAllMenuItems();
        const translatedAllItems = allRawItems.map(item => ({
          ...item,
          name: t(item.nameKey, item.defaultName),
          description: t(item.descriptionKey, item.defaultDescription),
        }));
        setAllMenuItems(translatedAllItems);

      }, [selectedCategory, t, language]);

      const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        setHasMadeInitialSelection(true);
      };

      if (categoriesData.length === 0) {
        return null; 
      }

      return (
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 sm:py-32 sm:pt-40"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl font-extrabold text-center mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-secondary"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('menuPageTitle')}
          </motion.h1>

          {isAuthenticated && hasReservation && (
            <motion.div 
              className="text-center mb-10 sm:mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                onClick={() => setIsConstructorOpen(true)} 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 text-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-accent/50"
                aria-label={t('customizeYourMealButton')}
              >
                <ChefHat size={22} className="mr-2.5" />
                {t('customizeYourMealButton')}
              </Button>
            </motion.div>
          )}

          <MenuContent
            categoriesData={categoriesData}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleSelectCategory} // Use the new handler
            menuItems={menuItems}
            language={language}
            t={t}
            hasMadeInitialSelection={hasMadeInitialSelection}
          />
          
          {!hasMadeInitialSelection && categoriesData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center mt-12 p-6 bg-slate-800/50 rounded-lg shadow-lg border border-primary/30"
            >
              <MousePointerSquare size={48} className="mx-auto mb-4 text-primary" />
              <p className="text-xl text-gray-300 font-semibold">
                {t('menuPageSelectCategoryPrompt', { defaultText: "Please select a category above to view our delicious offerings!" })}
              </p>
            </motion.div>
          )}
          
          <MenuConstructorModal 
            isOpen={isConstructorOpen} 
            setIsOpen={setIsConstructorOpen} 
            menuItems={allMenuItems} 
            categories={categoriesData}
          />
        </motion.div>
      );
    };

    export default MenuPage;