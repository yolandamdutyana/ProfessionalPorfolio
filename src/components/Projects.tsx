import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live: string;
  featured?: boolean;
  category: string;
};

const projects: Project[] = [
  {
    title: 'FinTrack Dashboard',
    description:
      'A real-time personal finance tracker with interactive charts, budget goals, and spending insights. Built with React, Supabase, and Recharts.',
    tags: ['React', 'TypeScript', 'Supabase', 'Recharts'],
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    category: 'Web App',
  },
  {
    title: 'Taskly – Team Kanban',
    description:
      'A collaborative Kanban board with drag-and-drop, real-time sync, role-based access, and file attachments. Handles 50+ daily active users.',
    tags: ['Next.js', 'PostgreSQL', 'WebSockets', 'Tailwind'],
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    category: 'SaaS',
  },
  {
    title: 'Artfolio CMS',
    description:
      'A headless CMS + portfolio builder for artists and designers. Custom rich-text editor, image galleries, and one-click Vercel deploys.',
    tags: ['Node.js', 'React', 'S3', 'REST API'],
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
    category: 'Tool',
  },
];

const filters = ['All', 'Web App', 'SaaS', 'Tool'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

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

  return (
    <section id="projects" className="section-padding bg-rose-100/40" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4 reveal opacity-0-init">
          <span className="h-px w-8 bg-rose-400" />
          <span className="text-rose-500 text-sm font-semibold tracking-widest uppercase">Projects</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 reveal opacity-0-init">
            Things I've <span className="text-gradient">built</span>
          </h2>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 reveal opacity-0-init">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-rose-400 text-white shadow-lg shadow-rose-300/40'
                    : 'bg-white text-slate-500 hover:text-rose-500 hover:bg-rose-50 border border-rose-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <article
              key={project.title}
              className="group bg-white border border-rose-200 rounded-2xl overflow-hidden card-hover reveal opacity-0-init flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />
                {project.featured && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-rose-400/20 border border-rose-300/50 text-rose-500 text-xs font-semibold rounded-full backdrop-blur-sm">
                    Featured
                  </span>
                )}
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/70 text-slate-600 text-xs rounded-full backdrop-blur-sm border border-rose-200">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-rose-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-rose-50 border border-rose-100 text-slate-500 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-rose-100">
                  <a
                    href={project.github}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={15} />
                    Code
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-rose-500 text-sm transition-colors ml-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all on GitHub */}
        <div className="text-center mt-12 reveal opacity-0-init">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-rose-500 font-medium transition-colors group"
          >
            View all projects on GitHub
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
