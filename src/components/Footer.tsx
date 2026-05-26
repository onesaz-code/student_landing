import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useActiveSolution } from '../context/ActiveSolutionContext';
import { mdmBrand, mdmFooterCopyrightLinks, mdmFooterSections } from '../data/mdmSiteContent';

const GDPR_ROUTE = '/gdpr';

function FooterAnchor({ to, href, label }: { to?: string; href?: string; label: string }) {
  const className =
    'text-sm dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors inline-block py-1 active:scale-95';
  if (to) {
    return (
      <Link to={to} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export function Footer() {
  const { activeSolution } = useActiveSolution();
  const hideGdpr = activeSolution === 'mdm';

  const footerSections = React.useMemo(() => {
    if (!hideGdpr) return mdmFooterSections;
    return mdmFooterSections.map((section) => ({
      ...section,
      links: section.links.filter((link) => link.to !== GDPR_ROUTE),
    }));
  }, [hideGdpr]);

  const copyrightLinks = React.useMemo(() => {
    if (!hideGdpr) return mdmFooterCopyrightLinks;
    return mdmFooterCopyrightLinks.filter((link) => link.to !== GDPR_ROUTE);
  }, [hideGdpr]);

  return (
    <footer className="relative border-t dark:border-[#334155] light:border-[#1E293B] light:bg-[#0F172A] dark:bg-transparent" style={{ paddingTop: 'var(--spacing-major-section)' }}>{/* Added dark background for light mode with inverted text colors */}
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">
        {/* Main Footer */}
        <div className="pb-8 grid sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="lg:col-span-2 sm:col-span-2">
        <div className="mb-4">
        <span className="gradient-text text-3xl sm:text-4xl lg:text-5xl font-bold">
         {mdmBrand.brandWordmark}
        </span>
        <p className="font-semibold mt-2">{mdmBrand.taglineOneStop}</p>
        </div>

            <p className="text-sm dark:text-[#94A3B8] light:text-gray-300 mb-6 leading-relaxed max-w-xl mx-auto mb-8 text-muted-foreground font-semibold">
              {mdmBrand.footerBlurb}
            </p>
            <div className="flex gap-3">
              <a
                href={mdmBrand.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#1E293B] dark:hover:bg-[#334155] light:bg-white/10 light:hover:bg-white/20 border dark:border-[#334155] light:border-white/20 flex items-center justify-center transition-all duration-300 dark:hover:border-[#818CF8] light:hover:border-white/40 active:scale-95"
              >
                <Facebook className="w-5 h-5 dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors" />
              </a>
              <a
                href={mdmBrand.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#1E293B] dark:hover:bg-[#334155] light:bg-white/10 light:hover:bg-white/20 border dark:border-[#334155] light:border-white/20 flex items-center justify-center transition-all duration-300 dark:hover:border-[#818CF8] light:hover:border-white/40 active:scale-95"
              >
                <Twitter className="w-5 h-5 dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors" />
              </a>
              <a
                href={mdmBrand.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#1E293B] dark:hover:bg-[#334155] light:bg-white/10 light:hover:bg-white/20 border dark:border-[#334155] light:border-white/20 flex items-center justify-center transition-all duration-300 dark:hover:border-[#818CF8] light:hover:border-white/40 active:scale-95"
              >
                <Linkedin className="w-5 h-5 dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors" />
              </a>
              <a
                href={mdmBrand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#1E293B] dark:hover:bg-[#334155] light:bg-white/10 light:hover:bg-white/20 border dark:border-[#334155] light:border-white/20 flex items-center justify-center transition-all duration-300 dark:hover:border-[#818CF8] light:hover:border-white/40 active:scale-95"
              >
                <Instagram className="w-5 h-5 dark:text-[#94A3B8] dark:hover:text-[#818CF8] light:text-gray-300 light:hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold dark:text-[#E2E8F0] light:text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <FooterAnchor label={link.label} to={link.to} href={link.href} />
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
                <a href={`mailto:${mdmBrand.emailSupport}`} className="text-sm font-medium dark:text-[#E2E8F0] light:text-white hover:underline">{mdmBrand.emailSupport}</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 min-w-[2.5rem] rounded-lg dark:bg-[#818CF8]/10 light:bg-white/10 flex items-center justify-center flex-shrink-0 border dark:border-[#818CF8]/20 light:border-white/20">
                <Phone className="w-5 h-5 dark:text-[#818CF8] light:text-[#4F46E5]" />
              </div>
              <div>
                <div className="text-xs dark:text-[#94A3B8] light:text-gray-400">Phone</div>
                <a href={`tel:${mdmBrand.phoneTel}`} className="text-sm font-medium dark:text-[#E2E8F0] light:text-white hover:underline">{mdmBrand.phone}</a>
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
                  href={`https://www.google.com/maps/search/?api=1&query=${mdmBrand.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium dark:text-[#E2E8F0] light:text-white hover:underline cursor-pointer"
                >
                  {mdmBrand.addressLines.join(' ')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t dark:border-[#334155] light:border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm dark:text-[#94A3B8] light:text-gray-300">
              © {new Date().getFullYear()} {mdmBrand.company}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {copyrightLinks.map((link, i) => (
                <FooterAnchor key={i} label={link.label} to={link.to} href={link.href} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
