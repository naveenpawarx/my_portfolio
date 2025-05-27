
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
// ResumePage import removed by Naveen on May 28, 2025
import OSINTPage from './pages/OSINTPage'; // Added by Naveen on May 28, 2025
import HashSearchPage from './pages/HashSearchPage';
import NumberConverterPage from './pages/NumberConverterPage';
import ImageExifPage from './pages/ImageExifPage';
import CompromisedCheckPage from './pages/CompromisedCheckPage';
import ContactMePage from './pages/ContactMePage';
import SimulatedOSPage from './pages/SimulatedOSPage';
import { NAV_LINKS } from './constants';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-green-400 font-mono">
      <Navbar navLinks={NAV_LINKS} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* ResumePage route removed by Naveen on May 28, 2025 */}
          <Route path="/osint" element={<OSINTPage />} /> {/* Added by Naveen on May 28, 2025 */}
          <Route path="/hash-search" element={<HashSearchPage />} />
          <Route path="/converter" element={<NumberConverterPage />} />
          <Route path="/image-exif" element={<ImageExifPage />} />
          <Route path="/compromised-check" element={<CompromisedCheckPage />} />
          <Route path="/contact-me" element={<ContactMePage />} />
          <Route path="/simulated-os" element={<SimulatedOSPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;