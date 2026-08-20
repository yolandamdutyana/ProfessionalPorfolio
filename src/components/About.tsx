import { useEffect, useRef } from 'react';
import { MapPin, Coffee, Code, Heart } from 'lucide-react';

const facts = [
  { icon: MapPin, text: 'Johannesburg, GP' },
  { icon: Coffee, text: 'Coffee-powered dev' },
  { icon: Code, text: 'TypeScript advocate' },
  { icon: Heart, text: 'Open-source fan' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding bg-white/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-4 reveal opacity-0-init">
          <span className="h-px w-8 bg-rose-400" />
          <span className="text-rose-500 text-sm font-semibold tracking-widest uppercase">About Me</span>
        </div>

        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 reveal opacity-0-init">
            Passionate about <br />
            <span className="text-gradient">great software</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-5 reveal opacity-0-init">
            Hey! I'm Yolanda — a full-stack developer based in Johannesburg with 3+ years building 
            products people actually love to use. I specialize in React, TypeScript, and Node.js, 
            and I care deeply about performance, accessibility, and thoughtful design.
          </p>
          <p className="text-slate-500 leading-relaxed mb-8 reveal opacity-0-init">
            I take on contract work, contribute to open source, and write 
            about the things I'm learning at the intersection of engineering and product.
          </p>

          {/* Fact chips */}
          <div className="flex flex-wrap gap-3 mb-8 reveal opacity-0-init">
            {facts.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 border border-rose-200 text-slate-600 text-sm"
              >
                <Icon size={14} className="text-rose-400 shrink-0" />
                {text}
              </div>
            ))}
          </div>

          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-xl bg-rose-100 border border-rose-200 text-rose-500 font-semibold hover:bg-rose-200 hover:border-rose-300 transition-all duration-200 reveal opacity-0-init"
          >
            Let's work together
          </button>
        </div>
      </div>
    </section>
  );
}
