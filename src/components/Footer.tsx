import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-rose-200 bg-rose-100/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-fuchsia-400 flex items-center justify-center shadow-lg shadow-rose-300/40">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-semibold text-slate-700">Yolanda Mdutyana</span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-slate-500 hover:text-rose-500 text-sm transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
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
                className="w-9 h-9 rounded-lg border border-rose-200 bg-white/60 flex items-center justify-center text-slate-500 hover:text-rose-500 hover:border-rose-300 hover:bg-rose-50 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-rose-200 pt-8 text-center">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-1.5 flex-wrap">
            Built with
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            using React & Tailwind CSS &bull; &copy; {new Date().getFullYear()} Yolanda Mdutyana
          </p>
        </div>
      </div>
    </footer>
  );
}
