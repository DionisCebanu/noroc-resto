
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { 
    id: 1, 
    title: "A Cozy Atmosphere", 
    alt: "Restaurant Interior", 
    src: "/images/restaurant/restaurant-interior.png",
    description: "Step into a warm, inviting space where delicious flavors meet a stylish ambiance. Perfect for a night out with loved ones or a casual dining experience..",
  },
  { 
    id: 2, 
    title: "Savor Every Bite in Comfort", 
    alt: "Gourmet Dish", 
    src: "/images/restaurant/restaurant-interior2.png",
    description: "Indulge in our expertly crafted dishes while enjoying the relaxed, intimate setting that makes every meal special. A dining experience that feels like home.",
  },
  { id: 3, 
    title: "Nestled in Nature's Embrace", 
    alt: "Cozy Ambiance", 
    src: "/images/restaurant/restaurant-outside.png",
    description: "Discover the serenity of our quiet location, where you can dine surrounded by peaceful views. An idyllic outdoor setting for those who crave a break from the hustle and bustle.",
  },
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //Typing animation state
  const [typedTitle, setTypedTitle] = useState("");


  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setTimeout(nextSlide, 7000); // Auto-slide every 7 seconds
    return () => clearTimeout(timer);
  }, [currentImageIndex]);
  
  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50, damping: 20, duration: 0.8 },
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { type: 'spring', stiffness: 50, damping: 20, duration: 0.8 },
    }),
  };

  // Typing animation useEffect
  useEffect(() => {
    const fullText = images[currentImageIndex].title;
    let index = 0;
    let typedText = '';
  
    // Clear immediately
    setTypedTitle('');
  
    const intervalId = setInterval(() => {
      typedText += fullText.charAt(index);
      setTypedTitle(typedText);
      index++;
  
      if (index >= fullText.length) {
        clearInterval(intervalId);
      }
    }, 60);
  
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);
  
  
  
  


  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} custom={currentImageIndex}>
        <motion.div
          key={images[currentImageIndex].id}
          className="absolute inset-0 w-full h-full"
          custom={1} 
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <img  
            className="w-full h-full object-cover" 
            alt={images[currentImageIndex].alt}
            src={images[currentImageIndex].src}
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="relative z-10 text-center p-6 md:p-10 rounded-xl bg-slate-800/70 backdrop-blur-sm shadow-2xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-secondary">
          {typedTitle}
        </h1>
        <p className="text-base sm:text-lg text-gray-400 italic mb-4">
          {images[currentImageIndex].description}
        </p>
        <Button 
          size="lg" 
          variant="secondary" 
          className="text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={() => document.getElementById('promotions')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View Our Menu
        </Button>
      </motion.div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <ChevronRight size={32} />
      </Button>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentImageIndex === index ? 'bg-accent' : 'bg-gray-400/50 hover:bg-gray-300/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
