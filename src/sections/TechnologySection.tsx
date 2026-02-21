import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Shield, Clock, Layers, Server, Workflow } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { icon: Zap, label: 'High Performance', desc: 'Sub-50ms inference' },
  { icon: Shield, label: 'Enterprise Security', desc: 'SOC 2 compliant' },
  { icon: Clock, label: 'Real-time', desc: 'Live processing' },
  { icon: Layers, label: 'Scalable', desc: 'Cloud-native' },
  { icon: Server, label: 'API First', desc: 'REST & GraphQL' },
  { icon: Workflow, label: 'Automated', desc: 'CI/CD pipeline' },
];

const stats = [
  { value: '10k+', label: 'Sim hours' },
  { value: '99.9%', label: 'Uptime' },
  { value: '<50ms', label: 'Latency' },
  { value: '24/7', label: 'Support' },
];

export default function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.tech-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="technology"
      className="relative py-20"
    >
      <div className="px-6 lg:px-16">
        {/* Section Header */}
        <h2 className="text-lg font-semibold text-white/50 uppercase tracking-wider mb-8">
          Technology
        </h2>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left - Activity Card */}
          <div className="ps5-activity-card p-6">
            <h3 className="font-sora font-bold text-2xl text-white mb-2">
              Research & Development
            </h3>
            <p className="text-white/50 mb-6">
              Simulation-first validation. Real-world data. Continuous learning.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/5"
                >
                  <div className="font-sora font-bold text-2xl text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              We train policies in high-fidelity simulation, validate in controlled 
              environments, and deploy with live telemetry—feeding insights back into 
              the next model iteration.
            </p>
          </div>

          {/* Right - Tech Stack */}
          <div ref={cardsRef} className="grid grid-cols-2 gap-3">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="tech-card p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all group"
              >
                <tech.icon 
                  size={24} 
                  className="text-white/40 group-hover:text-white/70 transition-colors mb-3" 
                />
                <h4 className="font-medium text-white text-sm mb-1">
                  {tech.label}
                </h4>
                <p className="text-xs text-white/40">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 ps5-activity-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-sora font-semibold text-white mb-1">
              Ready to deploy?
            </h4>
            <p className="text-sm text-white/50">
              Connect to your stack in days—not months.
            </p>
          </div>
          <a
            href="mailto:hello@xertai.io"
            className="px-6 py-2.5 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}
