'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-navy text-white pt-12 pb-8 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-navy font-bold">
                CA
              </div>
              <span className="font-bold text-xl tracking-tight">Crestfield Academy</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Crestfield Academy is a leading secondary school in Abuja, Nigeria,
              committed to academic excellence and character formation from JSS1 to SS3.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/academics" className="hover:text-white transition-colors">Academics</Link></li>
              <li><Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-gold">📍</span>
                Plot 12, Gwarinpa, Abuja, Nigeria
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold">✉️</span>
                admissions@crestfieldacademy.edu.ng
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold">📞</span>
                +234 800 123 4567
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold">🕒</span>
                Mon–Fri 7:30am–4pm
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-xs text-slate-500">
          &copy; {year || 2025} Crestfield Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}