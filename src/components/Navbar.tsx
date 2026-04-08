import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/a7e1abaeef1b895c7157156ca5f0a1b9c2638b12.png';
import { useTheme } from './ThemeProvider';
import { Button as OnesazButton } from '@onesaz/ui';
import { useNavigate, useLocation } from 'react-router-dom';

const ACTIVE_COLOR = '#6933d3';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Navigate to home page then scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Store target section so HomePage can scroll after mount
      sessionStorage.setItem('scrollToSection', sectionId);
      navigate('/');
    }
  };

  // On home page: check if we need to scroll to a section after navigating from another page
  useEffect(() => {
    if (!isHomePage) return;
    const target = sessionStorage.getItem('scrollToSection');
    if (!target) return;
    sessionStorage.removeItem('scrollToSection');

    // Poll until the element is in the DOM (React may still be rendering)
    let attempts = 0;
    const interval = setInterval(() => {
      const el = document.getElementById(target);
      if (el) {
        clearInterval(interval);
        el.scrollIntoView({ behavior: 'smooth' });
      }
      if (++attempts > 20) clearInterval(interval); // give up after 2s
    }, 100);

    return () => clearInterval(interval);
  }, [isHomePage]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!isHomePage) return;
    const sectionIds = ['hero', 'features', 'modules', 'pricing', 'resources'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHomePage]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero', section: 'hero' },
    { name: 'Features', href: '#features', section: 'features' },
    { name: 'Solutions', href: '#modules', section: 'modules' },
    { name: 'Pricing', href: '#pricing', section: 'pricing' },
    { name: 'Resources', href: '#resources', section: 'resources' },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-500"
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="flex items-center justify-between h-full w-full">
            {/* Logo */}
            <a 
              href="#"
              className="flex items-center z-50"
            >
              <img src={logo} alt="Acadhub" className="h-28 sm:h-32 md:h-40 lg:h-48 w-auto" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = isHomePage && activeSection === link.section;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.section)}
                    className="text-lg font-semibold transition-colors duration-300 cursor-pointer"
                    style={{ color: isActive ? ACTIVE_COLOR : '#374151' }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = ACTIVE_COLOR; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#374151'; }}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg text-gray-700 hover:text-[#4F46E5] hover:bg-gray-100 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              
              <OnesazButton 
                variant="secondary" 
                size="default"
                className="bg-[#6933d3] text-white"

              >
                Login
              </OnesazButton>
              <OnesazButton 
                variant="secondary"
                size="default"
                
              >
                Get Demo
              </OnesazButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2 z-50">
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              
              <button
                className="p-2.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85vw] max-w-sm z-50 md:hidden dark:bg-[#1E293B] light:bg-white shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b dark:border-white/10 light:border-gray-200">
                  <img src={logo} alt="Acadhub" className="h-16 w-auto" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg dark:text-white light:text-gray-700 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-100 transition-all active:scale-95"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8 space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = isHomePage && activeSection === link.section;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="block px-4 py-4 text-base font-semibold rounded-xl transition-all duration-300 active:scale-95 cursor-pointer"
                        style={{
                          color: isActive ? ACTIVE_COLOR : '#111827',
                          backgroundColor: isActive ? '#f3f2ff' : undefined,
                        }}
                        onClick={(e) => handleNavClick(e, link.section)}
                      >
                        {link.name}
                      </motion.a>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 space-y-3 border-t dark:border-white/10 light:border-gray-200"
                >
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-base font-medium dark:border-white/20 dark:text-white dark:hover:bg-white/10 light:border-gray-300 light:text-gray-900 light:hover:bg-gray-100 active:scale-95 transition-transform"
                  >
                    Login
                  </Button>
                  <OnesazButton className="w-full h-12 text-base">
                    Get Demo
                  </OnesazButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}