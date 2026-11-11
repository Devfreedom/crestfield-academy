'use client';

import { useState } from 'react';
import { ArrowRight, Calendar, Phone, Mail, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const STEPS = [
  { number: 1, title: 'Apply', description: 'Submit the online application form with child and parent details.' },
  { number: 2, title: 'Entrance Exam', description: 'Child sits for an entrance examination in English and Mathematics.' },
  { number: 3, title: 'Interview', description: 'Parent and child interview with the admissions team.' },
  { number: 4, title: 'Offer', description: 'Receive admission offer and complete registration formalities.' },
];

const FEES = [
  { level: 'JSS Day', day: '₦850,000', boarding: '₦1,450,000', term: 'per term' },
  { level: 'JSS Boarding', day: '—', boarding: '₦1,450,000', term: 'per term' },
  { level: 'SSS Day', day: '₦950,000', boarding: '₦1,600,000', term: 'per term' },
  { level: 'SSS Boarding', day: '—', boarding: '₦1,600,000', term: 'per term' },
];

export default function Admissions() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    currentClass: '',
    applyingTo: '',
    parentName: '',
    phone: '',
    email: '',
  });

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
              Admissions
            </span>
            <h1 className="font-poppins text-4xl font-bold text-navy mt-4 mb-6">Admissions</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Join Crestfield Academy for the 2025/2026 session. We are now accepting applications
              for JSS1 to SS3. Follow our simple 4-step admission process below.
            </p>
          </div>

          <div className="mb-16">
            <div className="flex justify-between mb-8">
              {STEPS.map((s) => (
                <div key={s.title} className="text-center flex-1 relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold ${
                    step >= s.number ? 'bg-navy text-white' : 'bg-slate-200 text-slate-400 border border-slate-300'
                  }`}>
                    {s.number}
                  </div>
                  {step > s.number && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full" />
                  )}
                  <h4 className={`font-semibold ${step >= s.number ? 'text-navy' : 'text-slate-400'}`}>
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-500">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {!submitted ? (
            <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 p-8 shadow-lg">
              <h2 className="font-poppins text-2xl font-bold text-navy mb-6">Application Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Child's Full Name</label>
                    <input
                      type="text"
                      required
                      autoComplete="given-name"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Class</label>
                    <select
                      required
                      autoComplete="off"
                      value={formData.currentClass}
                      onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      <option value="">Select current class</option>
                      <option value="Primary 6">Primary 6</option>
                      <option value="JSS1">JSS1</option>
                      <option value="JSS2">JSS2</option>
                      <option value="JSS3">JSS3</option>
                      <option value="SS1">SS1</option>
                      <option value="SS2">SS2</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Applying To</label>
                    <select
                      required
                      value={formData.applyingTo}
                      onChange={(e) => setFormData({ ...formData, applyingTo: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    >
                      <option value="">Select class applying to</option>
                      <option value="JSS1">JSS1</option>
                      <option value="JSS2">JSS2</option>
                      <option value="JSS3">JSS3</option>
                      <option value="SS1">SS1</option>
                      <option value="SS2">SS2</option>
                      <option value="SS3">SS3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Parent/Guardian Name</label>
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-navy text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
                >
                  Submit Application <ArrowRight size={20} />
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-20">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h2 className="font-poppins text-2xl font-bold text-navy mb-4">Application Submitted!</h2>
              <p className="text-slate-600 mb-8">
                Thank you, {formData.parentName}. We have received your application for
                {formData.childName} to {formData.applyingTo}. Our admissions team will contact you
                at {formData.phone} shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData({ childName: '', currentClass: '', applyingTo: '', parentName: '', phone: '', email: '' });
                }}
                className="bg-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-navy/90 transition-colors"
              >
                Apply Again
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-bold text-navy mb-4">School Fees (2024/2025 Session)</h2>
            <p className="text-slate-600">Fees are payable per term.</p>
          </div>
          <div className="max-w-xl mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-6 py-4 text-left">Level</th>
                  <th className="px-6 py-4 text-right">Day</th>
                  <th className="px-6 py-4 text-right">Boarding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FEES.map((fee) => (
                  <tr key={fee.level} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-700">{fee.level}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{fee.day}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{fee.boarding}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Fees include tuition, textbooks, and examination fees. Boarding fees include accommodation and meals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, label: 'Address', text: 'Plot 12, Gwarinpa, Abuja, Nigeria' },
              { icon: Mail, label: 'Email', text: 'admissions@crestfieldacademy.edu.ng' },
              { icon: Phone, label: 'Phone', text: '+234 800 123 4567' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-6 rounded-xl border border-slate-200 bg-slate-50">
                <item.icon className="w-6 h-6 text-gold mt-0.5" />
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