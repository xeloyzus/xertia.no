import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Smartphone,
  Brain,
  Cpu,
  Layers,
  Eye,
  Bot,
  Monitor,
  Workflow,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Monitor,
    label: 'Desktop & Web Apps',
    desc: 'Full-stack applications for Windows, macOS, Linux, and the browser.',
  },
  {
    icon: Smartphone,
    label: 'Mobile Apps',
    desc: 'Native and cross-platform mobile experiences.',
  },
  {
    icon: Brain,
    label: 'ML Models & Tools',
    desc: 'Custom model training, fine-tuning, and developer tooling.',
  },
  {
    icon: Cpu,
    label: 'IoT & Embedded',
    desc: 'ESP32-based devices, firmware, and sensor integration.',
  },
  {
    icon: Eye,
    label: 'Computer Vision',
    desc: 'Detection, tracking, and vision pipelines for the real world.',
  },
  {
    icon: Bot,
    label: 'Robotics & Simulation',
    desc: 'Policy training and sim-to-real with IsaacLab, Isaac Sim, and MuJoCo.',
  },
  {
    icon: Workflow,
    label: 'Model Inference',
    desc: 'Serving, optimization, and integration into existing systems.',
  },
  {
    icon: Layers,
    label: 'Full-Stack',
    desc: 'APIs, backends, and frontends delivered end to end.',
  },
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
            stagger: 0.08,
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
          Capabilities
        </h2>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left - Approach */}
          <div className="ps5-activity-card p-6">
            <h3 className="font-sora font-bold text-2xl text-white mb-2">
              From idea to production
            </h3>
            <p className="text-white/50 mb-6">
              One engineer covering the full stack — software, ML, embedded, and robotics.
            </p>

            <p className="text-white/60 text-sm leading-relaxed mb-4">
              I take projects from first prototype to shipped product. That means
              understanding the problem, choosing the right architecture, and building
              something maintainable — not just a demo.
            </p>

            <p className="text-white/60 text-sm leading-relaxed">
              Whether it's an ESP32 device streaming sensor data, a computer-vision
              model running in production, or a robot policy trained in simulation,
              the work is designed to run reliably outside the lab.
            </p>
          </div>

          {/* Right - Capability Grid */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-3">
            {capabilities.map((cap, index) => (
              <div
                key={index}
                className="tech-card p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all group"
              >
                <cap.icon
                  size={24}
                  className="text-white/40 group-hover:text-white/70 transition-colors mb-3"
                />
                <h4 className="font-medium text-white text-sm mb-1">
                  {cap.label}
                </h4>
                <p className="text-xs text-white/40 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 ps5-activity-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-sora font-semibold text-white mb-1">
              Have a project in mind?
            </h4>
            <p className="text-sm text-white/50">
              Tell me what you're building — I'll tell you how I'd approach it.
            </p>
          </div>
          <a
            href="mailto:xertai.no@protonmail.com"
            className="px-6 py-2.5 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}