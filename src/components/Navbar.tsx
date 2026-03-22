import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Coaches', path: '/coaches' },
    { name: 'Alumni', path: '/alumni' },
    { name: 'Get a Quote', path: '/get-a-quote' },
  ];

  const isHome = location.pathname === '/';
  const showBackground = !isHome || isScrolled;

  return (
    <>
      {/* Desktop Fixed Nav */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] hidden lg:flex items-center justify-between px-6 xl:px-[80px] h-[72px] transition-all duration-300 ease-out ${
          showBackground ? 'bg-[rgba(13,27,42,0.92)] backdrop-blur-[20px] border-b border-border' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <Link to="/" className="flex items-center shrink-0 gap-3">
          <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Pase Sports" className="h-10 xl:h-[48px] w-auto object-contain rounded-full bg-white p-1 shadow-lg" />
          <span className="font-display text-xl xl:text-2xl tracking-wide text-text-primary">PASE SPORTS</span>
        </Link>

        <div className="flex items-center gap-4 xl:gap-8">
          {navLinks.filter((link) => !(isHome && link.path === '/')).map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[13px] xl:text-[14px] font-sans transition-colors relative group whitespace-nowrap ${
                location.pathname === link.path ? 'text-bright' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-200 ease-out ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </div>

        <Link
          to="/get-a-quote"
          className="px-4 xl:px-[24px] py-[10px] text-[13px] xl:text-[14px] font-sans font-bold rounded-[6px] bg-primary text-text-primary border border-accent hover:bg-accent hover:-translate-y-[2px] transition-all duration-200 ease-out shadow-none hover:shadow-[0_0_20px_rgba(58,123,213,0.4)] whitespace-nowrap"
        >
          Host Your Event →
        </Link>
      </nav>

      {/* Mobile/Tablet Nav Bar */}
      <nav
        className={`lg:hidden fixed top-0 left-0 w-full z-[1000] flex justify-between items-center px-4 sm:px-6 h-[56px] sm:h-[64px] transition-all duration-300 ease-out ${
          showBackground ? 'bg-[rgba(13,27,42,0.92)] backdrop-blur-[20px] border-b border-border' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <Link to="/" className="flex items-center shrink-0 gap-2">
          <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Pase Sports" className="h-8 sm:h-[40px] w-auto object-contain rounded-full bg-white p-0.5 sm:p-1" />
          <span className="font-display text-lg sm:text-xl tracking-wide text-text-primary">PASE SPORTS</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-text-primary"
          aria-label="Open menu"
        >
          <Menu size={24} className="sm:w-7 sm:h-7" />
        </button>
      </nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-10px' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10px' }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[2000] bg-void flex flex-col p-4 sm:p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8 sm:mb-16 px-2">
              <div className="flex items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Pase Sports" className="h-8 sm:h-[40px] w-auto object-contain rounded-full bg-white p-0.5 sm:p-1" />
                <span className="font-display text-lg sm:text-xl tracking-wide text-text-primary">PASE SPORTS</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-text-secondary hover:text-text-primary"
                aria-label="Close menu"
              >
                <X size={28} className="sm:w-8 sm:h-8" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-5 sm:gap-8 my-auto">
              {!isHome && (
                <Link
                  to="/"
                  className="font-display text-[32px] sm:text-[40px] md:text-[48px] text-text-primary hover:text-bright transition-colors"
                >
                  Home
                </Link>
              )}
              {navLinks.filter((link) => link.path !== '/').map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-display text-[32px] sm:text-[40px] md:text-[48px] hover:text-bright transition-colors ${
                    location.pathname === link.path ? 'text-bright' : 'text-text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/get-a-quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 sm:mt-8 px-8 py-3 sm:px-[32px] sm:py-[14px] text-base sm:text-[18px] font-sans font-bold rounded-[6px] bg-primary text-text-primary border border-accent"
              >
                Host Your Event →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
