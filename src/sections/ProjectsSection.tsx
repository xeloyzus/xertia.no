import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'NeuralFlow',
    category: 'AI Framework',
    description: 'Real-time neural network optimization engine.',
    status: 'Live',
    progress: 100,
    color: '#3B82F6',
  },
  {
    id: 2,
    title: 'ContextOS',
    category: 'MCP Platform',
    description: 'Advanced model context protocol implementation.',
    status: 'Beta',
    progress: 85,
    color: '#8B5CF6',
  },
  {
    id: 3,
    title: 'AutoDeploy',
    category: 'DevOps Tool',
    description: 'Automated deployment pipeline for ML models.',
    status: 'Live',
    progress: 100,
    color: '#10B981',
  },
  {
    id: 4,
    title: 'VisionX',
    category: 'Computer Vision',
    description: 'Industrial inspection and quality control.',
    status: 'Alpha',
    progress: 60,
    color: '#F59E0B',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20"
    >
      <div className="px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-white/50 uppercase tracking-wider">
            Projects
          </h2>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <Github size={18} />
            <span className="hidden sm:inline">View on GitHub</span>
          </a>
        </div>

        {/* Projects Grid - PS5 Style Cards */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/15 transition-all cursor-pointer"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="px-2.5 py-1 text-xs font-medium rounded-full"
                  style={{ 
                    backgroundColor: `${project.color}20`,
                    color: project.color 
                  }}
                >
                  {project.status}
                </span>
                <ExternalLink 
                  size={16} 
                  className="text-white/30 group-hover:text-white/70 transition-colors" 
                />
              </div>

              {/* Content */}
              <h3 className="font-sora font-bold text-lg text-white mb-1 group-hover:translate-x-1 transition-transform">
                {project.title}
              </h3>
              <p className="text-sm text-white/40 mb-3">{project.category}</p>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-white/30 mb-1.5">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: project.color 
                    }}
                  />
                </div>
              </div>

              {/* Hover Glow */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${project.color}40, 0 0 30px ${project.color}10`
                }}
              />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-8 text-center">
          <a
            href="mailto:hello@xertai.io"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <span>Explore all projects</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
