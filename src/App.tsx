/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Facilities from './pages/Facilities';
import Coaches from './pages/Coaches';
import Alumni from './pages/Alumni';
import GetQuote from './pages/GetQuote';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router basename="/pasesports-website-demo">
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-text-primary focus:rounded-md focus:font-sans focus:font-bold focus:text-sm"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/get-a-quote" element={<GetQuote />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
