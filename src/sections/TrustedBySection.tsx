import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Placeholder company names for logos
const companies = [
  'Axiom Robotics',
  'Nexus Manufacturing',
  'Quantum Labs',
  'Stellar Logistics',
  'Fusion Tech',
  'Horizon Automation',
];

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

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

      // Logo tiles stagger
      const tiles = logosRef.current?.querySelectorAll('.logo-tile');
      if (tiles) {
        gsap.fromTo(
          tiles,
          { y: 20, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: logosRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[80] bg-navy py-20 lg:py-32"
    >
      <div className="relative z-10 px-6 lg:px-[8vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="font-sora font-bold text-[clamp(32px,4vw,52px)] leading-[1.05] text-text-primary mb-4">
            Trusted by <span className="text-gradient">Innovators</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Partnering with teams building the next generation of manufacturing and logistics.
          </p>
        </div>

        {/* Logo Grid */}
        <div
          ref={logosRef}
          className="flex flex-wrap justify-center gap-6 lg:gap-8"
        >
          {companies.map((company, index) => (
            <div
              key={index}
              className="logo-tile w-[140px] h-[90px] lg:w-[160px] lg:h-[100px] rounded-2xl glass flex items-center justify-center group hover:border-violet/30 transition-all duration-300"
            >
              <span className="font-sora font-semibold text-text-secondary/60 group-hover:text-text-secondary/80 transition-colors text-sm text-center px-4">
                {company}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
