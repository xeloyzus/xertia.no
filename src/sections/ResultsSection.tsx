import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, CheckCircle, Clock, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: TrendingUp, value: '40%', label: 'faster cycle times', suffix: 'Up to' },
  { icon: CheckCircle, value: '99.7%', label: 'pick accuracy', suffix: '' },
  { icon: Clock, value: '<0.3%', label: 'downtime / shift', suffix: '' },
  { icon: Calendar, value: '2-week', label: 'deployment', suffix: '' },
];

export default function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      // Stats panel animation
      gsap.fromTo(
        statsRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Stat items stagger
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards[0],
          { x: '-8vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          cards[1],
          { x: '8vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: true,
            },
          }
        );
      }

      // Paragraph animation
      gsap.fromTo(
        paragraphRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[60] bg-navy py-20 lg:py-32"
    >
      {/* Faint top glow */}
      <div className="absolute top-0 left-0 right-0 h-64 violet-glow-bg pointer-events-none" />

      <div className="relative z-10 px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {/* Left Heading */}
          <div ref={headingRef} className="lg:max-w-[52vw]">
            <h2 className="font-sora font-bold text-[clamp(32px,4vw,52px)] leading-[1.05] text-text-primary mb-6">
              Real‑World <span className="text-gradient">Results</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
              Deployed across logistics, assembly, and inspection—measurable gains in speed, accuracy, and uptime.
            </p>
          </div>

          {/* Right Stats Panel */}
          <div ref={statsRef} className="lg:ml-auto lg:w-[34vw]">
            <div className="card-glass-sm space-y-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet/15 flex items-center justify-center flex-shrink-0">
                    <stat.icon size={20} className="text-violet" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      {stat.suffix && (
                        <span className="text-sm text-text-secondary">{stat.suffix}</span>
                      )}
                      <span className="font-sora font-bold text-xl text-violet-300">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="feature-card card-glass-sm">
            <div className="w-12 h-12 rounded-xl bg-violet/15 flex items-center justify-center mb-4">
              <TrendingUp size={24} className="text-violet" />
            </div>
            <h3 className="font-sora font-semibold text-xl text-text-primary mb-2">
              Precision Assembly
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Tight-tolerance insertion with real-time force feedback for delicate components.
            </p>
          </div>

          <div className="feature-card card-glass-sm">
            <div className="w-12 h-12 rounded-xl bg-violet/15 flex items-center justify-center mb-4">
              <CheckCircle size={24} className="text-violet" />
            </div>
            <h3 className="font-sora font-semibold text-xl text-text-primary mb-2">
              Adaptive Handling
            </h3>
            <p className="text-text-secondary leading-relaxed">
              Handle mixed SKUs without re-teaching waypoints. AI-powered object recognition.
            </p>
          </div>
        </div>

        {/* Paragraph */}
        <p
          ref={paragraphRef}
          className="mt-12 text-text-secondary max-w-2xl leading-relaxed"
        >
          Xertai's control stack adapts to variation in lighting, placement, and part geometry—so your line keeps moving.
        </p>
      </div>
    </section>
  );
}
