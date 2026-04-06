import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Solutions', href: '#modules' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Security', href: '#security' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'Careers', href: '#careers' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#docs' },
        { name: 'Help Center', href: '#help' },
        { name: 'Case Studies', href: '#cases' },
        { name: 'API', href: '#api' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Cookie Policy', href: '#cookies' },
        { name: 'GDPR', href: '#gdpr' },
      ],
    },
  ];

  return (
    <footer className="relative border-t dark:border-[#334155] light:border-[#1E293B] light:bg-[#0F172A] dark:bg-transparent" style={{ paddingTop: 'var(--spacing-major-section)' }}>{/* Added dark background for light mode with inverted text colors */}
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        {/* Main Footer */}
        <div className="pb-8 grid sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="lg:col-span-2 sm:col-span-2">
            <div className="mb-4">
              <span className="text-2xl font-bold dark:text-[#E2E8F0] light:text-white">Acadhub</span>
            </div>
            <p className="text-sm dark:text-[#94A3B8] light:text-gray-300 mb-6 leading-relaxed">
              Transforming educational institutions with intelligent management solutions.
              Streamline operations, enhance learning, and empower educators.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#1E293B] dark:hover:bg-[#334155] light:bg-white/10 light:hover:bg-white/20 border dark:border-[#334155] light:border-white/20 flex items-center justify-center transition-all duration-300 dark:hover:border-[#818CF8] light:hover:border-white/40 active:scale-95">
                <Facebook className="w-5 h-5 dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#1E293B] dark:hover:bg-[#334155] light:bg-white/10 light:hover:bg-white/20 border dark:border-[#334155] light:border-white/20 flex items-center justify-center transition-all duration-300 dark:hover:border-[#818CF8] light:hover:border-white/40 active:scale-95">
                <Twitter className="w-5 h-5 dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#1E293B] dark:hover:bg-[#334155] light:bg-white/10 light:hover:bg-white/20 border dark:border-[#334155] light:border-white/20 flex items-center justify-center transition-all duration-300 dark:hover:border-[#818CF8] light:hover:border-white/40 active:scale-95">
                <Linkedin className="w-5 h-5 dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#1E293B] dark:hover:bg-[#334155] light:bg-white/10 light:hover:bg-white/20 border dark:border-[#334155] light:border-white/20 flex items-center justify-center transition-all duration-300 dark:hover:border-[#818CF8] light:hover:border-white/40 active:scale-95">
                <Instagram className="w-5 h-5 dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold dark:text-[#E2E8F0] light:text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.title === 'Company' && (
                  <li>
                    <Link
                      to="/about"
                      className="text-sm dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors inline-block py-1 active:scale-95"
                    >
                      About Us
                    </Link>
                  </li>
                )}
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors inline-block py-1 active:scale-95"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="py-6 border-t dark:border-[#334155] light:border-white/10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#818CF8]/10 light:bg-white/10 flex items-center justify-center flex-shrink-0 border dark:border-[#818CF8]/20 light:border-white/20">
                <Mail className="w-5 h-5 dark:text-[#818CF8] light:text-[#4F46E5]" />
              </div>
              <div>
                <div className="text-xs dark:text-[#94A3B8] light:text-gray-400">Email</div>
                <div className="text-sm font-medium dark:text-[#E2E8F0] light:text-white">support@acadhub.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#818CF8]/10 light:bg-white/10 flex items-center justify-center flex-shrink-0 border dark:border-[#818CF8]/20 light:border-white/20">
                <Phone className="w-5 h-5 dark:text-[#818CF8] light:text-[#4F46E5]" />
              </div>
              <div>
                <div className="text-xs dark:text-[#94A3B8] light:text-gray-400">Phone</div>
                <div className="text-sm font-medium dark:text-[#E2E8F0] light:text-white">+91 99123 40396</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#818CF8]/10 light:bg-white/10 flex items-center justify-center flex-shrink-0 border dark:border-[#818CF8]/20 light:border-white/20">
                <MapPin className="w-5 h-5 dark:text-[#818CF8] light:text-[#4F46E5]" />
              </div>
              <div>
                <div className="text-xs dark:text-[#94A3B8] light:text-gray-400">
                  Location
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Suvarna+Habitat,+Jai+Hind+Gandhi+Rd,+Cyber+Hills+Colony,+VIP+Hills,+Jaihind+Enclave,+Madhapur,+Hyderabad,+Telangana+500081"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium dark:text-[#E2E8F0] light:text-white hover:underline cursor-pointer"
                >
                  Suvarna Habitat, Jai Hind Gandhi Rd, Cyber Hills Colony, VIP Hills,
                  Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t dark:border-[#334155] light:border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm dark:text-[#94A3B8] light:text-gray-300">
              © {new Date().getFullYear()} Acadhub. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="#" className="text-sm dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors active:scale-95">
                Privacy Policy
              </a>
              <a href="#" className="text-sm dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors active:scale-95">
                Terms of Service
              </a>
              <a href="#" className="text-sm dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors active:scale-95">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}