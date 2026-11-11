'use client';

import Link from 'next/link';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

type FooterProps = {
  year: number;
};

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/contact', label: 'Contact' },
];

const CONTACT = [
  { icon: MapPin, text: 'Plot 12, Gwarinpa, Abuja, Nigeria' },
  {
    icon: Mail,
    text: 'admissions@crestfieldacademy.edu.ng',
    href: 'mailto:admissions@crestfieldacademy.edu.ng',
  },
  { icon: Phone, text: '+234 800 123 4567', href: 'tel:+2348001234567' },
  { icon: Clock, text: 'Mon–Fri 7:30am–4pm' },
];

export default function Footer({ year }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold font-bold text-navy"
              >
                CA
              </span>
              <span className="font-poppins text-xl font-bold tracking-tight">Crestfield Academy</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Crestfield Academy is a leading secondary school in Abuja, Nigeria,
              committed to academic excellence and character formation from JSS1 to SS3.
            </p>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gold">Quick Links</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gold">Contact</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              {CONTACT.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
                  <item.icon size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-white">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-gold">Enquiries</h2>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              Speak to the admissions team about applications, fees, or a visit to the campus.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-gold/90"
            >
              Contact Admissions
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-slate-400">
          &copy; {year} Crestfield Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
