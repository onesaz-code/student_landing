import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'stats', label: 'Stats' },
  { id: 'features', label: 'Features' },
  { id: 'modules', label: 'Modules' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function SectionNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Dot */}
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-[#314E78] scale-125'
                  : 'bg-gray-300 hover:bg-[#4DBEFF]'
              }`}
            />
            
            {/* Label tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#314E78] text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap pointer-events-none shadow-lg"
            >
              {section.label}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-[#314E78]" />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
