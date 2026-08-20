import { useEffect, useRef } from 'react';
import { Code2, Layout, Smartphone, Database, Palette, GitBranch } from 'lucide-react';

const skillGroups = [
  {
    category: 'Languages & Programming',
    icon: Code2,
    color: 'from-rose-400 to-pink-400',
    skills: ['Java', 'Python', 'C#', 'Kotlin'],
  },
  {
    category: 'Frontend Development',
    icon: Layout,
    color: 'from-fuchsia-400 to-purple-400',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    category: 'Mobile Development',
    icon: Smartphone,
    color: 'from-violet-400 to-indigo-400',
    skills: ['Android', 'Jetpack Compose'],
  },
  {
    category: 'Databases',
    icon: Database,
    color: 'from-sky-400 to-cyan-400',
    skills: ['SQL', 'PL/SQL', 'Firebase'],
  },
  {
    category: 'UI/UX & Design',
    icon: Palette,
    color: 'from-teal-400 to-emerald-400',
    skills: ['Figma', 'Wireframing', 'Prototyping'],
  },
  {
    category: 'Tools & Version Control',
    icon: GitBranch,
    color: 'from-amber-400 to-orange-400',
    skills: ['Git', 'GitHub', 'Android Studio', 'VS Code'],
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              (el as HTMLElement).style.animationDelay = `${i * 0.08}s`;
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

  return (
    <section id="skills" className="section-padding bg-white/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4 reveal opacity-0-init">
          <span className="h-px w-8 bg-rose-400" />
          <span className="text-rose-500 text-sm font-semibold tracking-widest uppercase">Skills</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 reveal opacity-0-init">
          Tools of the <span className="text-gradient">trade</span>
        </h2>
        <p className="text-slate-500 max-w-xl mb-14 reveal opacity-0-init">
          A curated look at the technologies and tools I use day-to-day to build production-quality software.
        </p>

        {/* Skill cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="bg-white border border-rose-200 rounded-2xl p-6 reveal opacity-0-init card-hover"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center shadow-md`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-slate-700 font-semibold text-sm leading-tight">{group.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-100 text-slate-600 text-sm font-medium hover:border-rose-300 hover:text-rose-500 transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
