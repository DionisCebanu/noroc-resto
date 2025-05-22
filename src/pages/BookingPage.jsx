import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import TableLayout from '@/components/booking/TableLayout';
    import BookingForm from '@/components/booking/BookingForm';
    import BookingConfirmationDialog from '@/components/booking/BookingConfirmationDialog';
    import { useToast } from '@/components/ui/use-toast';
    import { LanguageContext } from '@/context/LanguageContext';
    import { validateBookingForm } from '@/utils/validation';
    import useBookingManagement from '../hooks/useBookingManagement'

    const pageVariants = {
      initial: { opacity: 0, y: 50 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -50 },
    };

    const pageTransition = {
      type: 'tween',
      ease: 'anticipate',
      duration: 0.6,
    };

    const BookingPage = () => {
      const { t, language } = useContext(LanguageContext);
      const { toast } = useToast();
      const {
        formData,
        setFormData,
        errors,
        setErrors,
        showFullForm,
        setShowFullForm,
        currentTables,
        selectedTableDetails,
        isLayoutDisabled,
        guestCount,
        handleTableSelect,
        handleCriteriaInputChange,
        isConfirmationDialogOpen,
        setIsConfirmationDialogOpen,
        confirmedBookingDetails,
        setConfirmedBookingDetails,
        initialTablesData,
        setHasInteractedWithCriteria,
      } = useBookingManagement();

      const handleFormSubmit = (submittedData) => {
        setHasInteractedWithCriteria(true);
        const formErrors = validateBookingForm(submittedData, t, true);
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          toast({
            title: t('bookingErrorTitle'),
            description: Object.values(formErrors).join(' '),
            variant: 'destructive',
          });
          return;
        }

        if (!submittedData.selectedTableId) {
          setErrors(prev => ({ ...prev, selectedTableId: t('bookingErrorSelectTable') }));
          toast({
            title: t('bookingErrorTitle'),
            description: t('bookingErrorSelectTable'),
            variant: 'destructive',
          });
          return;
        }

        console.log('Booking submitted:', submittedData);
        const bookings = JSON.parse(localStorage.getItem('restaurantBookings')) || [];
        bookings.push({ ...submittedData, bookingId: new Date().toISOString() });
        localStorage.setItem('restaurantBookings', JSON.stringify(bookings));
        
        setConfirmedBookingDetails(submittedData);
        setIsConfirmationDialogOpen(true);

        toast({
          title: t('bookingToastedSuccessTitle'),
          description: t('bookingToastedSuccessMessage'),
          duration: 3000, 
        });
        
        setFormData({ date: '', time: '', guests: '', name: '', phone: '', email: '', selectedTableId: null });
        setErrors({});
        setShowFullForm(false);
        // Reset currentTables to initial state, respecting originally booked tables
        // This part of logic is now inside useBookingManagement's useEffect when criteria are cleared
        setHasInteractedWithCriteria(false);
      };

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
                onFormDataChange={handleCriteriaInputChange}
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
          <BookingConfirmationDialog
            isOpen={isConfirmationDialogOpen}
            onOpenChange={setIsConfirmationDialogOpen}
            bookingDetails={confirmedBookingDetails}
            language={language}
          />
        </motion.div>
      );
    };

    export default BookingPage;