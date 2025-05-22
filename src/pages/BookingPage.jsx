import React, { useState, useEffect, useContext, useMemo } from 'react';
    import { motion } from 'framer-motion';
    import TableLayout from '@/components/booking/TableLayout';
    import BookingForm from '@/components/booking/BookingForm';
    import { Button } from '@/components/ui/button';
    import { useToast } from '@/components/ui/use-toast';
    import { LanguageContext } from '@/context/LanguageContext';
    import { validateBookingForm } from '@/utils/validation'; 

    const pageVariants = {
      initial: { opacity: 0, y: 50 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -50 }
    };

    const pageTransition = {
      type: "tween",
      ease: "anticipate",
      duration: 0.6
    };
    
    const initialTablesData = [
      { id: 'T1', capacity: 2, type: '2-seater', position: { x: '15%', y: '15%' }, status: 'available' },
      { id: 'T2', capacity: 4, type: '4-seater', position: { x: '35%', y: '15%' }, status: 'available' },
      { id: 'T3', capacity: 4, type: '4-seater', position: { x: '55%', y: '15%' }, status: 'booked' },
      { id: 'T4', capacity: 2, type: '2-seater', position: { x: '75%', y: '15%' }, status: 'available' },
      
      { id: 'B1', capacity: 6, type: 'booth', position: { x: '20%', y: '40%' }, status: 'available' },
      { id: 'B2', capacity: 6, type: 'booth', position: { x: '70%', y: '40%' }, status: 'available' },

      { id: 'R1', capacity: 6, type: '6-seater-round', position: { x: '45%', y: '60%' }, status: 'available' },
      
      { id: 'T5', capacity: 2, type: '2-seater', position: { x: '15%', y: '80%' }, status: 'booked' },
      { id: 'T6', capacity: 4, type: '4-seater', position: { x: '35%', y: '80%' }, status: 'available' },
      { id: 'T7', capacity: 2, type: '2-seater', position: { x: '75%', y: '80%' }, status: 'available' },
    ];


    const BookingPage = () => {
      const { t, language } = useContext(LanguageContext);
      const { toast } = useToast();
      const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: '',
        name: '',
        phone: '',
        email: '',
        selectedTableId: null
      });
      const [errors, setErrors] = useState({});
      const [showFullForm, setShowFullForm] = useState(false);
      const [currentTables, setCurrentTables] = useState(initialTablesData);
      const [selectedTableDetails, setSelectedTableDetails] = useState(null);
      const [isLayoutDisabled, setIsLayoutDisabled] = useState(true);


      const guestCount = useMemo(() => parseInt(formData.guests, 10) || 0, [formData.guests]);

      // Simulate fetching/filtering available tables
      useEffect(() => {
        if (formData.date && formData.time && formData.guests) {
          setIsLayoutDisabled(false);
          // Simulate API call and update table statuses randomly for demo
          const updatedTables = initialTablesData.map(table => ({
            ...table,
            status: Math.random() > 0.7 ? 'booked' : 'available' // Simulate some tables being booked
          }));
          setCurrentTables(updatedTables);
          // If a selected table becomes unavailable or too small, reset it
          if (formData.selectedTableId) {
            const currentSelected = updatedTables.find(t => t.id === formData.selectedTableId);
            if (!currentSelected || currentSelected.status === 'booked' || currentSelected.capacity < guestCount) {
              setFormData(prev => ({ ...prev, selectedTableId: null }));
              setSelectedTableDetails(null);
              setShowFullForm(false);
              toast({
                title: t('bookingErrorTitle'),
                description: t('bookingErrorSelectedTableUnavailable'),
                variant: "destructive",
              });
            } else {
                setSelectedTableDetails(currentSelected);
            }
          } else {
            setSelectedTableDetails(null);
          }
        } else {
          setIsLayoutDisabled(true);
          setCurrentTables(initialTablesData.map(t => ({...t, status: 'available'}))); // Reset to initial visual state
          setFormData(prev => ({ ...prev, selectedTableId: null }));
          setSelectedTableDetails(null);
          setShowFullForm(false);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formData.date, formData.time, formData.guests, t]);
      
      const handleTableSelect = (table) => {
        if (table.status === 'booked' || table.capacity < guestCount) {
          return; 
        }
        setFormData(prev => ({ ...prev, selectedTableId: table.id }));
        setSelectedTableDetails(table);
        setShowFullForm(true); 
      };

      const handleFormSubmit = (submittedData) => {
        const formErrors = validateBookingForm(submittedData, t, showFullForm);
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          toast({
            title: t('bookingErrorTitle'),
            description: Object.values(formErrors).join(' '),
            variant: "destructive",
          });
          return;
        }

        if (!submittedData.selectedTableId) {
          setErrors(prev => ({...prev, selectedTableId: t('bookingErrorSelectTable')}));
           toast({
            title: t('bookingErrorTitle'),
            description: t('bookingErrorSelectTable'),
            variant: "destructive",
          });
          return;
        }
        
        console.log("Booking submitted:", submittedData);
        const bookings = JSON.parse(localStorage.getItem('restaurantBookings')) || [];
        bookings.push({ ...submittedData, bookingId: new Date().toISOString() });
        localStorage.setItem('restaurantBookings', JSON.stringify(bookings));

        toast({
          title: t('bookingConfirmationTitle'),
          description: t('bookingConfirmationMessage', {
            guests: submittedData.guests,
            date: new Date(submittedData.date).toLocaleDateString(language),
            time: submittedData.time,
            tableId: submittedData.selectedTableId
          }),
          duration: 7000,
        });

        setFormData({ date: '', time: '', guests: '', name: '', phone: '', email: '', selectedTableId: null });
        setErrors({});
        setShowFullForm(false);
        setIsLayoutDisabled(true);
        setCurrentTables(initialTablesData.map(t => ({...t, status: 'available'})));
        setSelectedTableDetails(null);
      };
      
      const handleCriteriaChange = () => {
        const { date, time, guests } = formData;
        const criteriaErrors = {};
        if (!date) criteriaErrors.date = t('validationErrorDate');
        if (!time) criteriaErrors.time = t('validationErrorTime');
        if (!guests || parseInt(guests) < 1 || parseInt(guests) > 20) criteriaErrors.guests = t('validationErrorGuests');
        
        setErrors(criteriaErrors);

        if (Object.keys(criteriaErrors).length === 0) {
            // Table fetching/filtering is handled by useEffect
            setShowFullForm(false); 
        } else {
           toast({
            title: t('bookingErrorTitle'),
            description: Object.values(criteriaErrors).join(' '),
            variant: "destructive",
          });
        }
      };

      useEffect(() => {
        // This effect ensures that when criteria (date, time, guests) change,
        // the layout updates, and if a table was previously selected, it's re-evaluated.
        handleCriteriaChange();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formData.date, formData.time, formData.guests]);


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
            className="text-5xl sm:text-6xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent via-primary to-secondary"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t('bookingPageTitle')}
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-center text-gray-400 mb-12 sm:mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('bookingPageSubtitle')}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <motion.div 
              className="lg:col-span-1 sticky top-28"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <BookingForm 
                initialFormData={formData} 
                onSubmit={handleFormSubmit}
                errors={errors}
                setErrors={setErrors}
                showFullForm={showFullForm}
                selectedTableDetails={selectedTableDetails}
              />
            </motion.div>
            
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TableLayout 
                  tables={currentTables} 
                  selectedTableId={formData.selectedTableId} 
                  onTableSelect={handleTableSelect}
                  guestCount={guestCount}
                  disabled={isLayoutDisabled}
              />
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default BookingPage;