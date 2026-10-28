import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import DestinationsPage from './pages/DestinationsPage';
import ToursPage from './pages/ToursPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ViewItineraryPage from './pages/ViewItineraryPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const RouteLanguageSync: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (language && language !== 'en') {
      const timer = setTimeout(() => {
        const select = document.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
        if (select) {
          select.value = language;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, language]);

  return null;
};

const AppShell: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // When inside Admin, render dedicated standalone executive command center
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    );
  }

  // When on public client pages, render public Navbar, Pages, Footer, and Floating WhatsApp
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#120F0D] text-gray-800 dark:text-[#E8E1D9] transition-colors duration-300 flex flex-col justify-between overflow-x-hidden">
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/itinerary/:tourId" element={<ViewItineraryPage />} />
            <Route path="/tour/:tourId" element={<ViewItineraryPage />} />
          </Routes>
        </main>
      </div>
      <Footer />

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/255753997777" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group ring-4 ring-white/20 dark:ring-black/40"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412 0 6.556-5.338 11.891-11.893 11.891-2.01-.001-3.98-.51-5.725-1.479L0 24zm6.75-4.057c1.466.869 3.045 1.326 4.665 1.327 5.203 0 9.437-4.234 9.44-9.435.002-2.52-.982-4.888-2.768-6.674a9.378 9.378 0 00-6.675-2.761c-5.2 0-9.433 4.233-9.436 9.434 0 1.711.465 3.384 1.346 4.866l-1.02 3.721 3.828-1.027zm11.367-5.04c-.327-.164-1.938-.955-2.239-1.065-.301-.109-.52-.164-.74.164-.219.327-.85 1.065-1.041 1.284-.191.218-.382.245-.709.082-.327-.164-1.381-.509-2.63-1.625-.971-.866-1.628-1.936-1.819-2.264-.191-.327-.02-.504.143-.666.147-.146.327-.382.492-.573.164-.191.218-.327.327-.546.109-.218.055-.41-.028-.573-.082-.164-.74-1.786-1.012-2.441-.266-.64-.537-.552-.74-.562-.191-.01-.41-.01-.628-.01s-.573.082-.876.41c-.301.327-1.15 1.12-1.15 2.731 0 1.61 1.173 3.167 1.337 3.385.164.218 2.307 3.522 5.59 4.939.78.337 1.39.539 1.86.688.783.249 1.496.214 2.059.13.628-.095 1.938-.792 2.212-1.556.274-.764.274-1.42.191-1.556-.081-.137-.301-.218-.628-.382z"/>
        </svg>
        <span className="hidden sm:inline-block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with an Expert
        </span>
      </a>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <RouteLanguageSync />
          <AppShell />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
