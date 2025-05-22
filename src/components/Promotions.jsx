
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const promotionMeals = [
  { 
    id: 1, 
    name: 'Sizzling Steak Platter', 
    description: 'Aged ribeye, garlic mashed potatoes, seasonal vegetables.', 
    rating: 5, 
    imageText: "Juicy grilled steak platter with vegetables",
    imagePath: '/images/special-meals/meat.jpg'
  },
  { id: 2, name: 'Seafood Paella', description: 'Saffron rice, shrimp, mussels, calamari, chorizo.', rating: 4, imageText: "Colorful seafood paella in a large pan",  imagePath: '/images/special-meals/mexican.jpg'},
  { id: 3, name: 'Truffle Mushroom Risotto', description: 'Creamy Arborio rice, wild mushrooms, black truffle oil.', rating: 5, imageText: "Creamy truffle mushroom risotto with parmesan", imagePath: '/images/special-meals/salad.jpg' },
  { id: 4, name: 'Spicy Chicken Ramen', description: 'Rich broth, tender chicken, soft-boiled egg, nori.', rating: 4, imageText: "Bowl of spicy chicken ramen with toppings", imagePath: '/images/special-meals/soup.jpg' },
  { id: 5, name: 'Decadent Chocolate Lava Cake', description: 'Warm chocolate cake, molten center, vanilla ice cream.', rating: 5, imageText: "Chocolate lava cake with oozing center and ice cream", imagePath: '/images/special-meals/cake.jpg' },
  { id: 6, name: 'Artisan Cheese Board', description: 'Selection of local and imported cheeses, fruits, nuts.', rating: 4, imageText: "Artisan cheese board with various cheeses and fruits", imagePath: '/images/special-meals/artisan-cheese.jpg' },
];

const Promotions = () => {
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

  React.useEffect(() => {
    const updateVisibleItems = () => setVisibleItems(itemsPerPage());
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const totalPages = Math.ceil(promotionMeals.length / visibleItems);

  const nextPromotions = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevPromotions = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const displayedMeals = promotionMeals.slice(
    currentIndex * visibleItems,
    currentIndex * visibleItems + visibleItems
  );
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 40, damping: 15, duration: 0.6 }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
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
          Chef's Specials
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
                          alt={meal.name}
                          src={meal.imagePath} />
                        <div className="absolute top-2 right-2 bg-accent text-white px-4 py-2 rounded-md text-[14px] font-bold">
                          Special
                        </div>
                      </div>
                      <CardContent className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <CardTitle className="text-2xl text-primary mb-2">{meal.name}</CardTitle>
                          <CardDescription className="text-gray-400 mb-3">{meal.description}</CardDescription>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                           <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} className={i < meal.rating ? "text-yellow-400 fill-current" : "text-gray-500"} />
                            ))}
                          </div>
                          <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-black">
                            Order Now
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
