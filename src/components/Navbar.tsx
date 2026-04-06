import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/a7e1abaeef1b895c7157156ca5f0a1b9c2638b12.png';
import { useTheme } from './ThemeProvider';
import { Button as OnesazButton } from '@onesaz/ui';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#modules' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#resources' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full glass dark:glass light:bg-white light:border-b light:border-gray-100 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="flex items-center justify-between h-full w-full">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center z-50"
            >
              <img src={logo} alt="Acadhub" className="h-20 sm:h-24 md:h-32 lg:h-36 w-auto" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-white hover:text-white dark:text-white dark:hover:text-white light:text-gray-700 light:hover:text-[#6C5CE7] transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg text-white hover:text-white dark:text-white dark:hover:text-white light:text-gray-700 light:hover:text-[#4F46E5] hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-100 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <Button
                variant="ghost"
                size="default"
                className="font-medium"
              >
                Login
              </Button>
              <OnesazButton
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
                className="p-2.5 rounded-lg text-white hover:bg-white/10 dark:text-white dark:hover:bg-white/10 light:text-gray-700 light:hover:bg-gray-100 transition-all duration-300 active:scale-95"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                className="p-2.5 text-white hover:bg-white/10 dark:text-white dark:hover:bg-white/10 light:text-gray-700 light:hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95"
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
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block px-4 py-4 text-base font-medium dark:text-white light:text-gray-900 hover:bg-[#1A1147]/10 rounded-xl transition-all duration-300 active:scale-95"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </motion.a>
                  ))}
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
                  <Button className="w-full h-12 text-base">
                    Get Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}