import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ClaimForm from './pages/ClaimForm';
import ReturnForm from './pages/ReturnForm';
import ClaimStatus from './pages/ClaimStatus';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import LanguageSelector from './components/LanguageSelector';
import { AuthProvider } from './context/AuthContext';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam) {
      i18n.changeLanguage(langParam);
    }
  }, [i18n]);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="container mx-auto px-4 py-2 flex justify-end">
            <LanguageSelector />
          </div>
          <main className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{t('supportPortal')}</h1>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/claim" element={<ClaimForm />} />
              <Route path="/return" element={<ReturnForm />} />
              <Route path="/status" element={<ClaimStatus />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;