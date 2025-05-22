import React, { useState, useContext, useEffect, useRef } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { Button } from '@/components/ui/button';
    import { LanguageContext } from '@/context/LanguageContext';
    import { useToast } from '@/components/ui/use-toast';
    import { courseTypes } from '@/data/menuData';
    import { ChefHat, Save, XCircle } from 'lucide-react';
    import CourseSection from '@/components/menu/constructor/CourseSection';
    import MealSummaryCard from '@/components/menu/constructor/MealSummaryCard';
    import DownloadButtons from '@/components/menu/constructor/DownloadButtons';

    const modalVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
      exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } }
    };

    const MenuConstructorModal = ({ isOpen, setIsOpen, menuItems }) => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const mealSummaryRef = useRef(null);

      const initialSelections = courseTypes.reduce((acc, course) => {
        acc[course.id] = []; 
        return acc;
      }, {});
      const [selectedCourses, setSelectedCourses] = useState(initialSelections);
      const [totalPrice, setTotalPrice] = useState(0);

      useEffect(() => {
        const savedMeal = localStorage.getItem('personalizedMenu');
        if (savedMeal) {
          const parsedMeal = JSON.parse(savedMeal);
          const fullSelections = { ...initialSelections };
          for (const courseId in parsedMeal) {
            if (Array.isArray(parsedMeal[courseId])) {
              fullSelections[courseId] = parsedMeal[courseId].map(item => ({ ...item, quantity: item.quantity || 1 }));
            }
          }
          setSelectedCourses(fullSelections);
        }
      }, []);

      useEffect(() => {
        let currentTotal = 0;
        Object.values(selectedCourses).forEach(itemsArray => {
          if (Array.isArray(itemsArray)) {
            itemsArray.forEach(item => {
              if (item && item.price && item.quantity) {
                currentTotal += item.price * item.quantity;
              }
            });
          }
        });
        setTotalPrice(currentTotal);
      }, [selectedCourses]);

      const handleItemSelectionChange = (courseId, item, isSelected) => {
        setSelectedCourses(prev => {
          const currentSelectionsForCourse = prev[courseId] || [];
          const existingItemIndex = currentSelectionsForCourse.findIndex(i => i.id === item.id);

          if (isSelected) {
            if (existingItemIndex === -1) { // Add new item with quantity 1
              return {
                ...prev,
                [courseId]: [...currentSelectionsForCourse, { ...item, quantity: 1 }]
              };
            } else { // Item already exists, ensure quantity is at least 1
              const updatedCourse = [...currentSelectionsForCourse];
              if (updatedCourse[existingItemIndex].quantity < 1) {
                updatedCourse[existingItemIndex] = { ...updatedCourse[existingItemIndex], quantity: 1 };
              }
              return { ...prev, [courseId]: updatedCourse };
            }
          } else { // Remove item (set quantity to 0 effectively, or filter out)
            return {
              ...prev,
              [courseId]: currentSelectionsForCourse.filter(i => i.id !== item.id)
            };
          }
        });
      };

      const handleQuantityChange = (courseId, itemId, newQuantity) => {
        const quantity = Math.max(0, parseInt(newQuantity, 10) || 0); // Ensure quantity is non-negative integer

        setSelectedCourses(prev => {
          const currentSelectionsForCourse = prev[courseId] || [];
          const itemIndex = currentSelectionsForCourse.findIndex(i => i.id === itemId);

          if (itemIndex === -1 && quantity > 0) { // Item not selected, but quantity > 0: add it
            const itemToAdd = menuItems.find(mi => mi.id === itemId);
            if (itemToAdd) {
              return {
                ...prev,
                [courseId]: [...currentSelectionsForCourse, { ...itemToAdd, quantity }]
              };
            }
            return prev;
          }
          
          if (itemIndex > -1) {
            if (quantity === 0) { // Quantity is 0, remove the item
              return {
                ...prev,
                [courseId]: currentSelectionsForCourse.filter(i => i.id !== itemId)
              };
            } else { // Update quantity for existing item
              const updatedCourse = [...currentSelectionsForCourse];
              updatedCourse[itemIndex] = { ...updatedCourse[itemIndex], quantity };
              return { ...prev, [courseId]: updatedCourse };
            }
          }
          return prev; // No change if item not found and quantity is 0
        });
      };
      
      const handleSaveMeal = () => {
        const hasSelection = Object.values(selectedCourses).some(itemsArray => itemsArray.length > 0);
        if (!hasSelection) {
          toast({
            title: t('menuConstructorErrorSaving'),
            description: t('menuConstructorSelectAtLeastOnePrompt', {defaultText: "Please select at least one item for your meal."}),
            variant: "destructive",
          });
          return;
        }

        localStorage.setItem('personalizedMenu', JSON.stringify(selectedCourses));
        toast({
          title: t('menuConstructorMealSaved'),
          description: `${t('menuConstructorTotalPrice')}: ${totalPrice.toFixed(2)}`,
        });
      };

      return (
        <AnimatePresence>
          {isOpen && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent 
                className="sm:max-w-3xl bg-slate-800 border-slate-700 text-gray-200 shadow-2xl shadow-primary/40"
                as={motion.div}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <DialogHeader className="text-center sm:text-left">
                  <div className="flex justify-center sm:justify-start items-center mb-3">
                    <ChefHat size={32} className="text-primary mr-3" />
                    <DialogTitle className="text-3xl font-bold text-primary">{t('menuConstructorTitle')}</DialogTitle>
                  </div>
                  <DialogDescription className="text-gray-400">{t('menuConstructorSubtitle')}</DialogDescription>
                </DialogHeader>

                <div className="space-y-8 py-4 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-primary/70 scrollbar-track-slate-700/50">
                  {courseTypes.map(course => (
                    <CourseSection
                      key={course.id}
                      course={course}
                      menuItems={menuItems}
                      selectedItemsForCourse={selectedCourses[course.id] || []}
                      onItemSelectionChange={handleItemSelectionChange}
                      onQuantityChange={handleQuantityChange}
                      t={t}
                    />
                  ))}
                </div>

                <MealSummaryCard
                  ref={mealSummaryRef}
                  selectedCourses={selectedCourses}
                  totalPrice={totalPrice}
                  t={t}
                />
                
                <DialogFooter className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:flex md:sm:justify-between gap-3">
                  <DownloadButtons mealSummaryRef={mealSummaryRef} t={t} toast={toast} />
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <DialogClose asChild>
                      <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-gray-100 w-full">
                         <XCircle size={18} className="mr-2"/> Close
                      </Button>
                    </DialogClose>
                    <Button 
                      onClick={handleSaveMeal} 
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold w-full"
                    >
                      <Save size={18} className="mr-2"/> {t('menuConstructorSaveMeal')}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      );
    };

    export default MenuConstructorModal;