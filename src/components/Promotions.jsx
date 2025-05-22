
import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { LanguageContext } from '@/context/LanguageContext';

const promotionMeals = [
  { id: 1, imagePath: '/images/special-meals/meat.jpg', nameKey: "promotion1Name", descKey: "promotion1Desc" },
  { id: 2, imagePath: '/images/special-meals/mexican.jpg', nameKey: "promotion2Name", descKey: "promotion2Desc" },
  { id: 3, imagePath: '/images/special-meals/salad.jpg', nameKey: "promotion3Name", descKey: "promotion3Desc" },
  { id: 4, imagePath: '/images/special-meals/soup.jpg', nameKey: "promotion4Name", descKey: "promotion4Desc" },
  { id: 5, imagePath: '/images/special-meals/cake.jpg', nameKey: "promotion5Name", descKey: "promotion5Desc" },
  { id: 6, imagePath: '/images/special-meals/artisan-cheese.jpg', nameKey: "promotion6Name", descKey: "promotion6Desc" },
];

const ratingById = {
  1: 5, 2: 4, 3: 5, 4: 4, 5: 5, 6: 4
};

const Promotions = () => {
  const { t } = useContext(LanguageContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);

  const itemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
    }
    return 1;
  };

  const [visibleItems, setVisibleItems] = useState(itemsPerPage());

  useEffect(() => {
    const updateVisibleItems = () => setVisibleItems(itemsPerPage());
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const totalPages = Math.ceil(promotionMeals.length / visibleItems);

  const nextPromotions = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPromotions = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const displayedMeals = promotionMeals.slice(
    currentIndex * visibleItems,
    currentIndex * visibleItems + visibleItems
  );

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 40, damping: 15, duration: 0.6 }
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      transition: { type: 'spring', stiffness: 40, damping: 15, duration: 0.6 }
    }),
  };

  return (
    <section id="promotions" className="py-16 sm:py-24 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          {t('promotionsTitle')}
        </motion.h2>

        <div className="relative">
          <div ref={containerRef} className="relative overflow-hidden min-h-[450px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                style={{ minHeight: '400px', position: 'absolute', width: '100%' }}
              >
                {displayedMeals.map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                    className="h-full"
                  >
                    <Card className="h-full flex flex-col bg-slate-800/60 border-slate-700 hover:shadow-2xl hover:border-accent transition-all duration-300 overflow-hidden group">
                      <div className="relative h-60 w-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                          alt={t(meal.nameKey)}
                          src={meal.imagePath}
                        />
                        <div className="absolute top-2 right-2 bg-accent text-white px-4 py-2 rounded-md text-[14px] font-bold">
                          {t('promotionBadge')}
                        </div>
                      </div>
                      <CardContent className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <CardTitle className="text-2xl text-primary mb-2">{t(meal.nameKey)}</CardTitle>
                          <CardDescription className="text-gray-400 mb-3">{t(meal.descKey)}</CardDescription>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} className={i < ratingById[meal.id] ? "text-yellow-400 fill-current" : "text-gray-500"} />
                            ))}
                          </div>
                          <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-black">
                            {t('promotionBtn')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-slate-700/50 hover:bg-accent hover:text-black"
                onClick={prevPromotions}
                aria-label="Previous Promotion"
              >
                <ChevronLeft size={28} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-slate-700/50 hover:bg-accent hover:text-black"
                onClick={nextPromotions}
                aria-label="Next Promotion"
              >
                <ChevronRight size={28} />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};


export default Promotions;
