import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';

const roles = ['Full-Stack Developer', 'UI/UX Enthusiast', 'Open Source Contributor', 'Problem Solver'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const current = roles[roleIndex];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-600 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-800 mb-4 animate-fade-in-up opacity-0-init" style={{ animationFillMode: 'forwards' }}>
          Yolanda
          <span className="text-gradient"> Mdutyana</span>
        </h1>

        {/* Typewriter role */}
        <div className="h-10 md:h-12 flex items-center justify-center mb-6 animate-fade-in-up opacity-0-init delay-200" style={{ animationFillMode: 'forwards' }}>
          <span className="text-xl md:text-2xl text-slate-500 font-light">
            {displayed}
            <span className="animate-blink text-rose-400">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed mb-10 animate-fade-in-up opacity-0-init delay-300" style={{ animationFillMode: 'forwards' }}>
          I craft fast, accessible, and beautifully designed digital experiences — 
          from pixel-perfect interfaces to robust backend systems.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up opacity-0-init delay-400" style={{ animationFillMode: 'forwards' }}>
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-400 to-fuchsia-400 text-white font-semibold hover:from-rose-300 hover:to-fuchsia-300 shadow-lg shadow-rose-300/40 hover:shadow-rose-400/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            View My Work
          </button>
          <a
            href="/resume.pdf"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-rose-200 text-slate-600 font-semibold hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 animate-fade-in-up opacity-0-init delay-500" style={{ animationFillMode: 'forwards' }}>
          {[
            { icon: Github, href: 'https://github.com', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Mail, href: '#contact', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-11 h-11 rounded-xl border border-rose-200 bg-white/60 flex items-center justify-center text-slate-500 hover:text-rose-500 hover:border-rose-300 hover:bg-rose-50 transition-all duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-rose-500 transition animate-bounce"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </button>
    </section>
  );
}
