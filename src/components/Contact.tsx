import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.1}s`;
              el.classList.add('animate-fade-in-up');
              el.classList.remove('opacity-0-init');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  const inputClass =
    'w-full bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-300 transition-colors duration-200';

  return (
    <section id="contact" className="section-padding bg-rose-100/40" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4 reveal opacity-0-init">
          <span className="h-px w-8 bg-rose-400" />
          <span className="text-rose-500 text-sm font-semibold tracking-widest uppercase">Contact</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 reveal opacity-0-init">
          Let's <span className="text-gradient">get in touch</span>
        </h2>
        <p className="text-slate-500 max-w-xl mb-14 reveal opacity-0-init">
          Have a project in mind, or just want to say hello? Fill out the form or reach me directly — 
          I typically respond within 24 hours.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info panel */}
          <div className="space-y-8">
            {/* Contact details */}
            <div className="space-y-4 reveal opacity-0-init">
              {[
                { icon: Mail, label: 'Email', value: 'yolandamdutyana06@gmail.com', href: 'mailto:yolandamdutyana06@gmail.com' },
                { icon: MapPin, label: 'Location', value: 'Johannesburg, GP (open to remote)', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 p-4 bg-white border border-rose-200 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-rose-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-slate-700 text-sm hover:text-rose-500 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-700 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="reveal opacity-0-init">
              <p className="text-slate-400 text-sm mb-3">Find me on</p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:hello@yolandamdutyana.dev', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-rose-200 bg-white flex items-center justify-center text-slate-500 hover:text-rose-500 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-100 to-fuchsia-100 border border-rose-200 reveal opacity-0-init">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-600 font-semibold text-sm">Available for work</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Currently taking on freelance contracts and open to full-time junior software development roles. Let's build something great together.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="reveal opacity-0-init">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-rose-200 rounded-2xl p-7 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 text-xs font-medium mb-1.5">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-xs font-medium mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@example.com"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 text-xs font-medium mb-1.5">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project inquiry"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-slate-500 text-xs font-medium mb-1.5">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              {/* Status feedback */}
              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm">
                  <CheckCircle size={16} />
                  Message sent! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-rose-400 to-fuchsia-400 text-white font-semibold hover:from-rose-300 hover:to-fuchsia-300 shadow-lg shadow-rose-300/40 hover:shadow-rose-400/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
