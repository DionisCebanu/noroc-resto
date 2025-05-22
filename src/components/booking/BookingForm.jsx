
    import React, { useState, useEffect, useContext } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { User, Phone, Mail, Users, UtensilsCrossed, CalendarDays, Clock } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const BookingForm = ({ initialFormData, onSubmit, errors, setErrors, showFullForm, selectedTableDetails }) => {
      const { t } = useContext(LanguageContext);
      const [formData, setFormData] = useState(initialFormData);

      useEffect(() => {
        setFormData(initialFormData);
      }, [initialFormData]);

      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (errors[id]) {
          setErrors((prev) => ({ ...prev, [id]: null }));
        }
        if (id === "guests") {
          setFormData(prev => ({ ...prev, selectedTableId: null }));
        }
      };

      const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

      const today = new Date().toISOString().split('T')[0];

      return (
        <Card className="bg-slate-800/70 border-slate-700 shadow-2xl shadow-primary/30">
          <CardHeader className="text-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block p-3 bg-accent/20 rounded-full mb-3"
            >
              <UtensilsCrossed size={36} className="text-accent" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-primary">
              {t('bookingDetailsTitle')}
            </CardTitle>
            {selectedTableDetails && (
              <CardDescription className="text-accent font-semibold mt-1">
                  {t('bookingDetailsSelectedTable', { tableId: selectedTableDetails.id, capacity: selectedTableDetails.capacity })}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                      <Label htmlFor="date" className="text-gray-300 flex items-center mb-1"><CalendarDays size={16} className="mr-2 text-accent" />{t('bookingFormDate')}</Label>
                      <Input id="date" type="date" value={formData.date} onChange={handleChange} min={today} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.date ? 'border-red-500' : ''} `} />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                      <Label htmlFor="time" className="text-gray-300 flex items-center mb-1"><Clock size={16} className="mr-2 text-accent" />{t('bookingFormTime')}</Label>
                      <Input id="time" type="time" value={formData.time} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.time ? 'border-red-500' : ''}`} />
                      {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                  </div>
              </div>
                <div>
                  <Label htmlFor="guests" className="text-gray-300 flex items-center mb-1"><Users size={16} className="mr-2 text-accent" />{t('bookingFormGuests')}</Label>
                  <Input id="guests" type="number" placeholder={t('bookingFormGuestsPlaceholder')} min="1" max="20" value={formData.guests} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.guests ? 'border-red-500' : ''}`} />
                  {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
              </div>
              
              <AnimatePresence>
              {(showFullForm || formData.selectedTableId) && (formData.date && formData.time && formData.guests) && (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden space-y-5"
                  >
                      <div>
                          <Label htmlFor="name" className="text-gray-300 flex items-center mb-1"><User size={16} className="mr-2 text-accent" />{t('contactFormFullName')}</Label>
                          <Input id="name" type="text" placeholder={t('contactFormFullNamePlaceholder')} value={formData.name} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.name ? 'border-red-500' : ''}`} />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      
                      <div>
                          <Label htmlFor="phone" className="text-gray-300 flex items-center mb-1"><Phone size={16} className="mr-2 text-accent" />{t('contactFormPhone').replace(' (Optional)','').replace(' (Optionnel)','')}</Label>
                          <Input id="phone" type="tel" placeholder={t('contactFormPhonePlaceholder')} value={formData.phone} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.phone ? 'border-red-500' : ''}`} />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                
                      <div>
                          <Label htmlFor="email" className="text-gray-300 flex items-center mb-1"><Mail size={16} className="mr-2 text-accent" />{t('contactFormEmail')}</Label>
                          <Input id="email" type="email" placeholder={t('contactFormEmailPlaceholder')} value={formData.email} onChange={handleChange} className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-accent ${errors.email ? 'border-red-500' : ''}`} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                  </motion.div>
              )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 text-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-accent/50 disabled:opacity-70"
                  disabled={!(formData.selectedTableId && formData.date && formData.time && formData.guests)}
                >
                  {t('bookingFormSubmit')}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      );
    };

    export default BookingForm;
  