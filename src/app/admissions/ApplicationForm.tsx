'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

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

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle size={32} aria-hidden="true" />
        </div>
        <h2 className="mb-4 font-poppins text-2xl font-bold text-navy">Application Submitted!</h2>
        <p className="mb-8 text-slate-600">
          Thank you, {formData.parentName}. We have received your application for{' '}
          {formData.childName} to {formData.applyingTo}. Our admissions team will contact you at{' '}
          {formData.phone} shortly.
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
    );
  }

  return (
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
  );
}
