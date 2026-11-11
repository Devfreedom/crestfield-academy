'use client';

import { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col flex-1">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-semibold border border-gold/30">
              Contact Us
            </span>
            <h1 className="font-poppins text-4xl font-bold text-navy mt-4 mb-6">Get in Touch</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about admissions, academics, or our programs? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  text: 'Plot 12, Gwarinpa, Abuja, Nigeria',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  text: 'admissions@crestfieldacademy.edu.ng',
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  text: '+234 800 123 4567',
                },
                {
                  icon: Clock,
                  title: 'Office Hours',
                  text: 'Monday – Friday, 7:30 AM – 4:00 PM',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <item.icon className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-lg">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="academics">Academic Programs</option>
                      <option value="fees">School Fees</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      autoComplete="off"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-navy text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Send Message <Send size={20} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-4">
                    <CheckCircle size={24} />
                  </div>
                  <h3 className="font-bold text-navy mb-2">Message Sent!</h3>
                  <p className="text-sm text-slate-600">
                    Thank you for contacting Crestfield Academy. We will get back to you shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}