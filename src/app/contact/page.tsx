'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const CONTACT_ITEMS = [
  { icon: MapPin, title: 'Visit Us', text: 'Plot 12, Gwarinpa, Abuja, Nigeria' },
  { icon: Mail, title: 'Email', text: 'admissions@crestfieldacademy.edu.ng' },
  { icon: Phone, title: 'Call Us', text: '+234 800 123 4567' },
  { icon: Clock, title: 'Office Hours', text: 'Monday &ndash; Friday, 7:30 AM &ndash; 4:00 PM' },
];

const SUBJECTS = [
  { value: 'admissions', label: 'Admissions Inquiry' },
  { value: 'academics', label: 'Academic Programs' },
  { value: 'fees', label: 'School Fees' },
  { value: 'general', label: 'General Inquiry' },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full border border-gold/30 bg-gold/20 px-4 py-1.5 text-sm font-semibold text-gold">
              Contact Us
            </span>
            <h1 className="mt-4 mb-6 font-poppins text-4xl font-bold text-navy">Get in Touch</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Have questions about admissions, academics, or our programs? We would love to hear from
              you.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <ul className="space-y-6">
              {CONTACT_ITEMS.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-navy">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
              {!submitted ? (
                <form onSubmit={handleSubmit} aria-labelledby="contact-form-heading" className="space-y-6">
                  <h2 id="contact-form-heading" className="sr-only">
                    Send us a message
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-700">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-700">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-slate-700">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      {SUBJECTS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-700">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-navy/90"
                  >
                    Send Message <Send size={20} aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                    <CheckCircle size={24} aria-hidden="true" />
                  </div>
                  <h2 className="mb-2 font-bold text-navy">Message Sent!</h2>
                  <p className="text-sm text-slate-600">
                    Thank you for contacting Crestfield Academy. We will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData(INITIAL_FORM);
                    }}
                    className="mt-6 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
