import React, { useState, useContext, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
    import { ArrowLeft, CheckCircle, Info } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { useNavigate } from 'react-router-dom';

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.3 },
      }),
    };
    
    const EventMenuItemCard = ({ item, isSelected, onSelect, t }) => {
      return (
        <motion.div
          variants={itemVariants}
          layout
          className={`cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-primary/30 transition-all duration-300 border-2 ${isSelected ? 'border-primary scale-105 bg-primary/10' : 'border-slate-700 bg-slate-800 hover:border-primary/50'}`}
          onClick={onSelect}
        >
          {item.imageText && (
            <div className="h-40 w-full overflow-hidden">
              <img  
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={item.imageSrc}
              />
            </div>
          )}
          <div className="p-4">
            <h4 className={`text-lg font-semibold mb-1 ${isSelected ? 'text-primary' : 'text-slate-100'}`}>{item.name}</h4>
            <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
          </div>
          {isSelected && (
            <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
              <CheckCircle size={16} />
            </div>
          )}
        </motion.div>
      );
    };

    const EventMenuDetailView = ({ menu, allMenuItems, onBack, bookingId }) => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();
      const navigate = useNavigate();
      const [selectedItems, setSelectedItems] = useState({});

      useEffect(() => {
        const initialSelections = {};
        menu.groups.forEach(group => {
          initialSelections[group.groupId] = null; 
        });
        setSelectedItems(initialSelections);
      }, [menu]);

      const handleItemSelection = (groupId, itemId) => {
        setSelectedItems(prev => ({
          ...prev,
          [groupId]: itemId
        }));
      };

      const getMenuItemDetails = (itemId) => {
        return allMenuItems.find(item => item.id === itemId);
      };

      const handleConfirmSelection = () => {
        const allGroupsSelected = menu.groups.every(group => selectedItems[group.groupId] !== null);
        if (!allGroupsSelected) {
          toast({
            title: t('eventMenuErrorTitle', { defaultText: "Selection Incomplete" }),
            description: t('eventMenuErrorDesc', { defaultText: "Please select one item from each group." }),
            variant: "destructive",
          });
          return;
        }

        const finalSelectionDetails = {
          eventMenuId: menu.id,
          eventMenuTitle: menu.title,
          pricePerPerson: menu.pricePerPerson,
          choices: menu.groups.map(group => {
            const selectedItemId = selectedItems[group.groupId];
            const itemDetails = getMenuItemDetails(selectedItemId);
            return {
              groupTitle: group.groupTitle,
              selectedItemName: itemDetails ? itemDetails.name : 'N/A',
              selectedItemId: selectedItemId,
            };
          })
        };
        
        const storageKey = bookingId ? `eventMenuSelection_${bookingId}` : `eventMenuSelection_${menu.id}`;
        localStorage.setItem(storageKey, JSON.stringify(finalSelectionDetails));

        toast({
          title: t('eventMenuSuccessTitle', { defaultText: "Menu Selected!" }),
          description: t('eventMenuSuccessDesc', { menuTitle: menu.title, defaultText: `You've selected the ${menu.title}.` }),
        });

        if (bookingId) {
          navigate('/booking', { state: { bookingId: bookingId, eventMenuSelection: finalSelectionDetails } });
        } else {
          onBack(); 
        }
      };

      return (
        <motion.div
          key="eventMenuDetail"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="mt-8"
        >
          <Button variant="outline" onClick={onBack} className="mb-6 border-slate-600 text-slate-300 hover:bg-slate-700">
            <ArrowLeft size={18} className="mr-2" /> {t('backToEventMenusButton', { defaultText: "Back to Event Menus" })}
          </Button>

          <Card className="bg-slate-850 border-slate-700 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-2">
                {React.cloneElement(menu.icon, { className: "text-primary mr-3", size:32 })}
                <CardTitle className="text-3xl font-bold text-primary">{menu.title}</CardTitle>
              </div>
              <CardDescription className="text-xl text-accent">
                {t('pricePerPersonLabel', { defaultText: "Price per person" })}: ${menu.pricePerPerson.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 py-6">
              {menu.groups.map(group => (
                <div key={group.groupId} className="p-4 border border-slate-700 rounded-lg bg-slate-800/50">
                  <h3 className="text-xl font-semibold text-secondary mb-6 text-center">{group.groupTitle}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.itemIds.map((itemId, index) => {
                      const item = getMenuItemDetails(itemId);
                      if (!item) return null;
                      return (
                        <EventMenuItemCard
                          key={itemId}
                          item={item}
                          isSelected={selectedItems[group.groupId] === itemId}
                          onSelect={() => handleItemSelection(group.groupId, itemId)}
                          t={t}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end pt-6 border-t border-slate-700">
              <Button 
                size="lg" 
                onClick={handleConfirmSelection}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              >
                <CheckCircle size={20} className="mr-2" /> {t('eventMenuConfirmButton', { defaultText: "Confirm Selection" })}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default EventMenuDetailView;