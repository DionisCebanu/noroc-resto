
    import React, { useState, useContext, useMemo } from 'react';
    import { Routes, Route, useLocation } from 'react-router-dom';
    import Navbar from '@/components/Navbar';
    import Footer from '@/components/Footer';
    import { Toaster } from '@/components/ui/toaster';
    import LandingPage from '@/pages/LandingPage';
    import MenuPage from '@/pages/MenuPage';
    import BookingPage from '@/pages/BookingPage';
    import OurServicesPage from './pages/OurServices';
    import WeddingsPage from '@/pages/services/WeddingsPage';
    import AnniversariesPage from '@/pages/services/AnniversariesPage';
    import ChristeningsPage from '@/pages/services/ChristeningsPage';
    import AboutPage from '@/pages/AboutPage';
    import EventsPage from '@/pages/EventsPage';
    import { AnimatePresence } from 'framer-motion';
    import { LanguageContext } from '@/context/LanguageContext';

    // Simulate authentication and reservation status
    export const AppContext = React.createContext();

    function App() {
      const location = useLocation();
      const { language } = useContext(LanguageContext);
      const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulate logged-in user
      const [hasReservation, setHasReservation] = useState(true); // Simulate existing reservation

      const appContextValue = useMemo(() => ({
        isAuthenticated,
        setIsAuthenticated,
        hasReservation,
        setHasReservation,
      }), [isAuthenticated, hasReservation]);


      return (
        <AppContext.Provider value={appContextValue}>
          <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col" lang={language}>
            <Navbar />
            <main className="flex-grow pt-20 sm:pt-24">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/our-services" element={<OurServicesPage />} />
                  <Route path="/our-services/weddings" element={<WeddingsPage />} />
                  <Route path="/our-services/anniversaries" element={<AnniversariesPage />} />
                  <Route path="/our-services/christenings" element={<ChristeningsPage />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            <Toaster />
          </div>
        </AppContext.Provider>
      );
    }

    export default App;
  