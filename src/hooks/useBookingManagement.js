import { useState, useEffect, useMemo, useContext } from 'react';
    import { useToast } from '@/components/ui/use-toast';
    import { LanguageContext } from '@/context/LanguageContext';

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

    const useBookingManagement = () => {
      const { t } = useContext(LanguageContext);
      const { toast } = useToast();

      const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: '',
        name: '',
        phone: '',
        email: '',
        selectedTableId: null,
      });
      const [errors, setErrors] = useState({});
      const [showFullForm, setShowFullForm] = useState(false);
      const [currentTables, setCurrentTables] = useState(
        initialTablesData.map(t => ({ ...t, status: t.status === 'booked' ? 'booked' : 'available' }))
      );
      const [selectedTableDetails, setSelectedTableDetails] = useState(null);
      const [isLayoutDisabled, setIsLayoutDisabled] = useState(false);
      const [hasInteractedWithCriteria, setHasInteractedWithCriteria] = useState(false);
      const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
      const [confirmedBookingDetails, setConfirmedBookingDetails] = useState(null);

      const guestCount = useMemo(() => parseInt(formData.guests, 10) || 0, [formData.guests]);

      useEffect(() => {
        const criteriaAreSet = formData.date && formData.time && formData.guests;

        if (criteriaAreSet) {
          setIsLayoutDisabled(false);
          const updatedTables = initialTablesData.map(table => {
            if (table.status === 'booked') return table;
            return { ...table, status: Math.random() > 0.7 ? 'booked' : 'available' };
          });
          setCurrentTables(updatedTables);

          if (formData.selectedTableId) {
            const currentSelected = updatedTables.find(t => t.id === formData.selectedTableId);
            if (!currentSelected || currentSelected.status === 'booked' || currentSelected.capacity < guestCount) {
              setFormData(prev => ({ ...prev, selectedTableId: null, guests: prev.guests })); // Keep guests if table becomes invalid
              setSelectedTableDetails(null);
              setShowFullForm(false);
              if (hasInteractedWithCriteria) {
                toast({
                  title: t('bookingErrorTitle'),
                  description: t('bookingErrorSelectedTableUnavailable'),
                  variant: 'destructive',
                });
              }
            } else {
              setSelectedTableDetails(currentSelected);
              setShowFullForm(true);
            }
          } else {
            setSelectedTableDetails(null);
            setShowFullForm(false);
          }
        } else {
          setCurrentTables(initialTablesData.map(t => ({ ...t, status: t.status === 'booked' ? 'booked' : 'available' })));
          // Don't reset selectedTableId or guests here if only one criterion is missing,
          // allow user to complete the form.
          // Only reset selectedTable if it becomes invalid due to guest count change.
          if (formData.selectedTableId && selectedTableDetails && selectedTableDetails.capacity < guestCount) {
             setFormData(prev => ({ ...prev, selectedTableId: null }));
             setSelectedTableDetails(null);
             setShowFullForm(false);
          } else if (!formData.selectedTableId) {
            setSelectedTableDetails(null);
            setShowFullForm(false);
          }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [formData.date, formData.time, formData.guests, t, hasInteractedWithCriteria]);


      const handleTableSelect = (table) => {
        if (table.status === 'booked') {
             toast({
                title: t('bookingErrorTitle'),
                description: t('bookingErrorTableBooked'),
                variant: "destructive",
            });
            return;
        }
        
        // If criteria not set, prompt user
        if (!formData.date || !formData.time) {
             toast({
                title: t('bookingErrorTitle'),
                description: t('bookingErrorDateTimeFirst'),
                variant: "destructive",
            });
            return;
        }

        // If guest count is set and table is too small
        if (guestCount > 0 && table.capacity < guestCount) {
            toast({
                title: t('bookingErrorTitle'),
                description: t('bookingErrorTableTooSmall'),
                variant: "destructive",
            });
            return;
        }
        
        // If guest count is not set, or table is suitable, update guests to table capacity
        // and select the table.
        setFormData(prev => ({
          ...prev,
          selectedTableId: table.id,
          guests: String(table.capacity), // Update guest count to table capacity
        }));
        setSelectedTableDetails(table);
        setShowFullForm(true);
        setHasInteractedWithCriteria(true); // Selecting a table implies interaction
      };
      
      const handleCriteriaInputChange = (newFormData) => {
        setHasInteractedWithCriteria(true);
        
        const updatedFormData = { ...formData, ...newFormData };
        setFormData(updatedFormData);
        
        const tempErrors = { ...errors };
        if (newFormData.date !== formData.date && tempErrors.date) delete tempErrors.date;
        if (newFormData.time !== formData.time && tempErrors.time) delete tempErrors.time;
        if (newFormData.guests !== formData.guests && tempErrors.guests) delete tempErrors.guests;
        setErrors(tempErrors);
      };

      return {
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
        initialTablesData, // Exporting for reset if needed elsewhere
        setHasInteractedWithCriteria, // To control interaction state from parent if needed
      };
    };

    export default useBookingManagement;