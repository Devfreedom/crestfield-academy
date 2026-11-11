'use client';

import { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const STEPS = [
  {
    number: 1,
    title: 'Apply',
    description: 'Submit the online application form with child and parent details.',
  },
  {
    number: 2,
    title: 'Entrance Exam',
    description: 'Child sits for an entrance examination in English and Mathematics.',
  },
  {
    number: 3,
    title: 'Interview',
    description: 'Parent and child interview with the admissions team.',
  },
  {
    number: 4,
    title: 'Offer',
    description: 'Receive admission offer and complete registration formalities.',
  },
];

const FEES = [
  { level: 'Junior Secondary', day: 850000, boarding: 1450000 },
  { level: 'Senior Secondary', day: 950000, boarding: 1600000 },
];

const CURRENT_CLASSES = ['Primary 6', 'JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2'];
const APPLYING_TO = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'];

const INITIAL_FORM = {
  childName: '',
  currentClass: '',
  applyingTo: '',
  parentName: '',
  phone: '',
  email: '',
};

export default function Admissions() {
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
              Admissions
            </span>
            <h1 className="mt-4 mb-6 font-poppins text-4xl font-bold text-navy">Admissions</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Join Crestfield Academy for the 2025/2026 session. We are now accepting applications
              for JSS1 to SS3. Follow our simple 4-step admission process below.
            </p>
          </div>

          <ol className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li key={step.title} className="relative text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy font-bold text-white">
                  {step.number}
                </div>
                <h2 className="font-semibold text-navy">{step.title}</h2>
                <p className="mt-1 text-xs text-slate-500">{step.description}</p>
              </li>
            ))}
          </ol>

          {!submitted ? (
            <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
              <h2 className="mb-6 font-poppins text-2xl font-bold text-navy">Application Form</h2>
              <form onSubmit={handleSubmit} aria-labelledby="application-form-heading" className="space-y-6">
                <h3 id="application-form-heading" className="sr-only">
                  Application details
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="child-name" className="mb-2 block text-sm font-medium text-slate-700">
                      Child&rsquo;s Full Name
                    </label>
                    <input
                      id="child-name"
                      name="childName"
                      type="text"
                      required
                      autoComplete="off"
                      value={formData.childName}
                      onChange={(event) => setFormData({ ...formData, childName: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="current-class" className="mb-2 block text-sm font-medium text-slate-700">
                      Current Class
                    </label>
                    <select
                      id="current-class"
                      name="currentClass"
                      required
                      value={formData.currentClass}
                      onChange={(event) => setFormData({ ...formData, currentClass: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      <option value="">Select current class</option>
                      {CURRENT_CLASSES.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="applying-to" className="mb-2 block text-sm font-medium text-slate-700">
                      Applying To
                    </label>
                    <select
                      id="applying-to"
                      name="applyingTo"
                      required
                      value={formData.applyingTo}
                      onChange={(event) => setFormData({ ...formData, applyingTo: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      <option value="">Select class applying to</option>
                      {APPLYING_TO.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="parent-name" className="mb-2 block text-sm font-medium text-slate-700">
                      Parent/Guardian Name
                    </label>
                    <input
                      id="parent-name"
                      name="parentName"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.parentName}
                      onChange={(event) => setFormData({ ...formData, parentName: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="parent-phone" className="mb-2 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>
                    <input
                      id="parent-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                      className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="parent-email" className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      id="parent-email"
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

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-4 text-lg font-bold text-white transition-colors hover:bg-navy/90"
                >
                  Submit Application <ArrowRight size={20} aria-hidden="true" />
                </button>
              </form>
            </div>
          ) : (
            <div className="mx-auto max-w-md py-20 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle size={32} aria-hidden="true" />
              </div>
              <h2 className="mb-4 font-poppins text-2xl font-bold text-navy">Application Submitted!</h2>
              <p className="mb-8 text-slate-600">
                Thank you, {formData.parentName}. We have received your application for{' '}
                {formData.childName} to {formData.applyingTo}. Our admissions team will contact you
                at {formData.phone} shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData(INITIAL_FORM);
                }}
                className="rounded-lg bg-navy px-6 py-3 font-medium text-white transition-colors hover:bg-navy/90"
              >
                Apply Again
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-poppins text-3xl font-bold text-navy">
              School Fees (2024/2025 Session)
            </h2>
            <p className="text-slate-600">Fees are payable per term.</p>
          </div>

          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <caption className="sr-only">School fees by level and mode of attendance</caption>
              <thead>
                <tr className="bg-navy text-white">
                  <th scope="col" className="px-6 py-4 text-left">Level</th>
                  <th scope="col" className="px-6 py-4 text-right">Day</th>
                  <th scope="col" className="px-6 py-4 text-right">Boarding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FEES.map((fee) => (
                  <tr key={fee.level} className="transition-colors hover:bg-slate-50">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-700">{fee.level}</th>
                    <td className="px-6 py-4 text-right text-slate-600">{formatCurrency(fee.day)}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{formatCurrency(fee.boarding)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
              <p className="text-sm text-slate-500">
                Fees include tuition, textbooks, and examination fees. Boarding fees include
                accommodation and meals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: MapPin, label: 'Address', text: 'Plot 12, Gwarinpa, Abuja, Nigeria' },
              { icon: Mail, label: 'Email', text: 'admissions@crestfieldacademy.edu.ng' },
              { icon: Phone, label: 'Phone', text: '+234 800 123 4567' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-6"
              >
                <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-navy">{item.label}</p>
                  <p className="text-sm text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
