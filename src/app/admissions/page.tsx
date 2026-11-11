import { Phone, Mail, MapPin } from 'lucide-react';
import ApplicationForm from './ApplicationForm';
import AdmissionFees from './AdmissionFees';

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

export default function Admissions() {
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

          <ApplicationForm />
        </div>
      </section>

      <AdmissionFees />

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
