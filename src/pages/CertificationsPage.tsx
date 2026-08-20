import React from 'react';
import { certs } from '@/components/Certifications';

export default function CertificationsPage() {
  // normalize badge/pdf paths: strip leading slash so links work both at root and repo subpath
  const normalize = (p?: string) => (p ? p.replace(/^\//, '') : '');

  return (
    <div className="min-h-screen bg-white text-slate-700 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Certifications</h1>
          <a href="/" className="text-sm text-rose-600">← Back to home</a>
        </header>

        <p className="text-sm text-slate-500 mb-6">Browse certificates stored in public/certs. Click an image to open it or use download for original file.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c) => (
            <article key={c.title} className="bg-rose-50/40 rounded-lg p-4 shadow-sm flex flex-col">
              {c.badgeUrl ? (
                <a href={normalize(c.badgeUrl)} target="_blank" rel="noopener noreferrer" className="mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={normalize(c.badgeUrl)} alt={`${c.title} badge`} className="w-full h-40 object-contain" />
                </a>
              ) : (
                <div className="w-full h-40 bg-rose-100 rounded-md mb-4 flex items-center justify-center text-rose-400">Badge</div>
              )}

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{c.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{c.issuer} — {c.date}</p>
                {c.id && <p className="text-xs text-slate-400 mt-1">Credential ID: {c.id}</p>}
              </div>

              <div className="mt-4 flex items-center">
                <div className="flex gap-3">
                  {c.verifyUrl && (
                    <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-rose-600 underline">Verify</a>
                  )}
                  {c.pdfUrl && (
                    <a href={normalize(c.pdfUrl)} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-700">Download</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
