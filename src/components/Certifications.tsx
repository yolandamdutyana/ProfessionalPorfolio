import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export interface Cert {
  title: string;
  issuer: string;
  date: string;
  id?: string;
  badgeUrl?: string;
  pdfUrl?: string;
  verifyUrl?: string;
}

export const certs: Cert[] = [
  {
    title: 'Google AI Essentials',
    issuer: 'Coursera',
    date: '2026-08',
    id: 'ABC-12345',
    badgeUrl: '/certs/aws-badge.png',
    pdfUrl: '/certs/aws-cert.pdf',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/6HUJOXU6PZN0',
  },
  {
    title: 'React Developer Certification',
    issuer: 'Front-End Academy',
    date: '2025-02',
    id: 'REACT-9876',
    badgeUrl: '/certs/react-badge.png',
    pdfUrl: '/certs/react-cert.pdf',
    verifyUrl: '',
  },
  {
    title: 'TypeScript Professional',
    issuer: 'TypeSchool',
    date: '2023-08',
    id: 'TS-555',
    badgeUrl: '/certs/ts-badge.png',
    pdfUrl: '/certs/ts-cert.pdf',
    verifyUrl: '',
  },
];

export default function Certifications() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    window.addEventListener('openCertsPreview', handleOpen as EventListener);
    return () => window.removeEventListener('openCertsPreview', handleOpen as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // focus the close button when modal opens
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, [open]);

  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-slate-800">Certifications</h2>
            <p className="text-slate-500 mt-1">Verified professional certifications and credentials.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium hover:bg-rose-100 transition"
            >
              Preview
            </button>
            <a
              href="#certifications"
              onClick={(e) => {
                // smooth scroll to the section (already here) but keep anchor semantics
                e.preventDefault();
                document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-500 transition"
            >
              View all
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c) => (
            <article key={c.title} className="flex flex-col bg-rose-50/40 rounded-lg p-4 shadow-sm">
              {c.badgeUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.badgeUrl} alt={`${c.title} badge`} className="w-full h-40 object-contain mb-4" />
              ) : (
                <div className="w-full h-40 bg-rose-100 rounded-md mb-4 flex items-center justify-center text-rose-400">Badge</div>
              )}

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{c.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{c.issuer} — {c.date}</p>
                {c.id && <p className="text-xs text-slate-400 mt-2">Credential ID: {c.id}</p>}
              </div>

              <div className="mt-4 flex gap-2">
                {c.verifyUrl ? (
                  <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-rose-600 underline">Verify</a>
                ) : null}
                {c.pdfUrl ? (
                  <a href={c.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-700">Download</a>
                ) : null}
                <button onClick={() => setOpen(true)} className="ml-auto text-sm text-rose-600">Preview</button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal preview */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Certifications preview"
            className="relative bg-white rounded-lg max-w-3xl w-full mx-6 p-6 shadow-lg z-10"
          >
            <button
              ref={closeButtonRef}
              onClick={() => setOpen(false)}
              aria-label="Close certifications preview"
              className="absolute top-3 right-3 p-1 rounded-md text-slate-500 hover:bg-rose-50"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Certifications preview</h3>
            <p className="text-sm text-slate-500 mb-4">A quick look at a few of my professional certifications. Click verify or download for more details.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certs.slice(0, 3).map((c) => (
                <div key={c.title} className="p-4 border rounded-lg bg-rose-50/40">
                  <div className="flex items-start gap-4">
                    {c.badgeUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.badgeUrl} alt={`${c.title} badge`} className="w-16 h-16 object-contain" />
                    ) : (
                      <div className="w-16 h-16 bg-rose-100 rounded-md flex items-center justify-center text-rose-400">Badge</div>
                    )}
                    <div>
                      <h4 className="font-medium text-slate-800">{c.title}</h4>
                      <p className="text-xs text-slate-500">{c.issuer} — {c.date}</p>
                      <div className="mt-3 flex gap-3">
                        {c.verifyUrl && (
                          <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-rose-600 underline">Verify</a>
                        )}
                        {c.pdfUrl && (
                          <a href={c.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-700">Download</a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <a href="#certifications" onClick={(e) => { e.preventDefault(); document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); }} className="px-4 py-2 rounded-md bg-rose-50 text-rose-600">Go to section</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
