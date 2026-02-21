import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Cpu, Cloud, ArrowRight, ClipboardCheck, Shield, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const integrations = [
  { icon: Code, label: 'REST + gRPC APIs' },
  { icon: Cpu, label: 'ROS 2 native nodes' },
  { icon: Cloud, label: 'On-prem or cloud' },
];

const checklist = [
  { icon: ClipboardCheck, title: 'Site survey', desc: 'Assess workspace and requirements' },
  { icon: Shield, title: 'Safety validation', desc: 'Test all safety systems' },
  { icon: Rocket, title: 'Production pilot', desc: 'Gradual rollout with monitoring' },
];

export default function DeploymentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const integrationRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Integration card animation
      gsap.fromTo(
        integrationRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: integrationRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Checklist card animation
      gsap.fromTo(
        checklistRef.current,
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: checklistRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Checklist items stagger
      const items = checklistRef.current?.querySelectorAll('.checklist-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: checklistRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-[70] bg-navy py-20 lg:py-32"
    >
      {/* Faint bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 violet-glow-bg pointer-events-none" />

      <div className="relative z-10 px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {/* Left Heading */}
          <div ref={headingRef} className="lg:max-w-[50vw]">
            <h2 className="font-sora font-bold text-[clamp(32px,4vw,52px)] leading-[1.05] text-text-primary mb-6">
              Deployment‑<span className="text-gradient">Ready</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
              Connect to your WMS, MES, or fleet manager in days—secure, observable, and maintainable.
            </p>
          </div>

          {/* Right Integration Card */}
          <div ref={integrationRef} className="lg:ml-auto lg:w-[34vw]">
            <div className="card-glass-sm space-y-4">
              {integrations.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet/15 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-violet" />
                  </div>
                  <span className="font-medium text-text-primary">{item.label}</span>
                </div>
              ))}
              <button
                onClick={scrollToContact}
                className="mt-4 flex items-center gap-2 text-violet hover:text-violet-300 transition-colors group"
              >
                <span className="font-medium">View integration docs</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Checklist Card */}
        <div
          ref={checklistRef}
          className="mt-12 card-glass"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {checklist.map((item, index) => (
              <div key={index} className="checklist-item text-center">
                <div className="w-14 h-14 rounded-2xl bg-violet/15 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-violet" />
                </div>
                <h4 className="font-sora font-semibold text-text-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
