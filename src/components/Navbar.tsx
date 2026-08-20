import { useState, useEffect } from 'react';
import { Menu, X, Code2, Award, Briefcase } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Dispatch a custom event so other components (Certifications) can open the modal preview
  const openCertsPreview = () => {
    window.dispatchEvent(new Event('openCertsPreview'));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-rose-50/90 backdrop-blur-md border-b border-rose-200/60 shadow-sm shadow-rose-200/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-fuchsia-400 flex items-center justify-center shadow-lg shadow-rose-300/40 group-hover:shadow-rose-400/60 transition-shadow">
            <Code2 size={16} className="text-white" />
          </div>
          <span className="font-semibold text-slate-700 tracking-tight">Yolanda Mdutyana</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleNav(href)}
                className={`nav-link pb-1 ${
                  activeSection === href.slice(1) ? 'text-rose-500 after:w-full' : ''
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
              href="#certs"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium hover:bg-rose-100 transition"
              aria-label="Open certifications"
          >
              <Award size={16} className="md:hidden" />
              <span className="hidden md:inline-flex">Certifications</span>
          </a>

      <button
          onClick={() => handleNav('#contact')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-100 border border-rose-200 text-rose-500 text-sm font-medium hover:bg-rose-200 hover:border-rose-300 transition-all duration-200"
          aria-label="Hire me"
      >
          <Briefcase size={16} className="md:hidden" />
          <span className="hidden md:inline-flex">Hire Me</span>
       </button>
</div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-100 transition"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-rose-50/95 backdrop-blur-md border-b border-rose-200`}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {links.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleNav(href)}
                className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:text-rose-500 hover:bg-rose-100 transition text-sm font-medium"
              >
                {label}
              </button>
            </li>
          ))}
          <li>
              <a
                  href="#certs"
                  className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:text-rose-500 hover:bg-rose-100 transition text-sm font-medium"
                >
                      Certifications
              </a>
              </li>
          <li className="mt-2">
            <button
              onClick={() => handleNav('#contact')}
              className="w-full px-4 py-3 rounded-lg bg-rose-100 border border-rose-200 text-rose-500 text-sm font-medium hover:bg-rose-200 transition"
            >
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
