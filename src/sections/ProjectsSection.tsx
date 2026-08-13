import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Folder, Github } from 'lucide-react';
import projectsData from '../data/projects.json';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  name: string;
  description: string;
  url: string;
  tags?: string[];
};

const projects = projectsData.projects as Project[];

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
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white/50 uppercase tracking-wider">
            Projects
          </h2>
        </div>

        {projects.length === 0 ? (
          <div className="ps5-activity-card p-10 text-center">
            <Folder size={28} className="text-white/30 mx-auto mb-4" />
            <p className="text-white/60 mb-2">
              Projects are coming soon.
            </p>
            <p className="text-sm text-white/40">
              Add repositories to <code className="text-white/60">src/data/projects.json</code> to display them here.
            </p>
          </div>
        ) : (
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card group relative flex flex-col p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <Folder
                    size={20}
                    className="text-white/30 group-hover:text-white/70 transition-colors"
                  />
                  <Github
                    size={16}
                    className="text-white/30 group-hover:text-white/70 transition-colors"
                  />
                </div>

                <h3 className="font-sora font-bold text-lg text-white mb-1 group-hover:translate-x-1 transition-transform">
                  {project.name}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/5 text-white/50 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}