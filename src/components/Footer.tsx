import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Text, Caption, Separator } from '@onesaz/ui';
import { useActiveSolution } from '../context/ActiveSolutionContext';
import { mdmBrand, mdmFooterCopyrightLinks, mdmFooterSections } from '../data/mdmSiteContent';

const GDPR_ROUTE = '/gdpr';

function FooterAnchor({ to, href, label }: { to?: string; href?: string; label: string }) {
  const cls = 'text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors inline-block py-1 active:scale-95';
  if (to) return <Link to={to} className={cls}>{label}</Link>;
  return <a href={href} className={cls}>{label}</a>;
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
    <footer
      className="relative border-t border-[var(--border)] bg-[var(--background)]"
      style={{ paddingTop: '48px' }}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 sm:px-6">

        {/* Main grid */}
        <div className="pb-6 grid sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-5">

          {/* Brand column */}
          <div className="lg:col-span-2 sm:col-span-2">
            <div className="mb-3">
              <span className="gradient-text text-2xl sm:text-3xl font-bold">
                {mdmBrand.brandWordmark}
              </span>
              <Text fontWeight="semibold" className="!text-sm text-[var(--foreground)] mt-1.5">
                {mdmBrand.taglineOneStop}
              </Text>
            </div>
            <Text color="muted" className="!text-sm mb-4 leading-relaxed">
              {mdmBrand.footerBlurb}
            </Text>
            <div className="flex gap-3">
              {[
                { href: mdmBrand.social.facebook, label: 'Facebook', Icon: Facebook },
                { href: mdmBrand.social.twitter, label: 'X (Twitter)', Icon: Twitter },
                { href: mdmBrand.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
                { href: mdmBrand.social.instagram, label: 'Instagram', Icon: Instagram },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 min-w-[2.25rem] rounded-lg bg-[var(--muted)] hover:bg-[var(--accent-bg)] border border-[var(--border)] hover:border-[var(--accent)]/40 flex items-center justify-center transition-all duration-300 active:scale-95"
                >
                  <Icon className="w-4 h-4 text-[var(--muted-foreground)] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <Caption fontWeight="bold" className="!text-xs uppercase tracking-wider text-[var(--foreground)] mb-3 block">
                {section.title}
              </Caption>
              <ul className="space-y-1.5">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <FooterAnchor label={link.label} to={link.to} href={link.href} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-[var(--border)]" />

        {/* Contact bar */}
        <div className="py-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Mail,   label: 'Email',    value: mdmBrand.emailSupport,          href: `mailto:${mdmBrand.emailSupport}` },
              { Icon: Phone,  label: 'Phone',    value: mdmBrand.phone,                 href: `tel:${mdmBrand.phoneTel}` },
              { Icon: MapPin, label: 'Location', value: mdmBrand.addressLines.join(' '), href: `https://www.google.com/maps/search/?api=1&query=${mdmBrand.mapsQuery}`, external: true },
            ].map(({ Icon, label, value, href, external }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 min-w-[2.25rem] rounded-lg bg-[var(--accent-bg)] flex items-center justify-center flex-shrink-0 border border-[var(--accent)]/20 mt-0.5">
                  <Icon className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--muted-foreground)] mb-0.5">{label}</p>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--accent)] hover:underline underline-offset-2 transition-colors break-words"
                  >
                    {value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-[var(--border)]" />

        {/* Copyright */}
        <div className="py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <Caption className="!text-xs text-[var(--muted-foreground)]">
              © {new Date().getFullYear()} {mdmBrand.company}. All rights reserved.
            </Caption>
            <div className="flex flex-wrap justify-center gap-4 md:gap-5">
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
