import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Shield, Activity, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BuiltToWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      const bullets = bulletsRef.current?.querySelectorAll('.bullet-item');
      if (bullets) {
        scrollTl.fromTo(
          bullets,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.14
        );
      }

      // SETTLE (30-70%): Background parallax only
      scrollTl.fromTo(
        bgRef.current,
        { y: 0 },
        { y: '-2vh', ease: 'none' },
        0.3
      );

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, x: 0, opacity: 1 },
        { y: '-10vh', x: '-8vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { y: 0, x: 0, opacity: 1 },
        { y: '10vh', x: '8vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, x: 0 },
        { scale: 1.05, x: '4vw', ease: 'power2.in' },
        0.7
      );
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
      id="technology"
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/built_to_work_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 dark-overlay" />

      {/* Violet Glow */}
      <div className="absolute inset-0 violet-glow-bg" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="w-full px-6 lg:px-[8vw]">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0">
            {/* Left Headline */}
            <div ref={headlineRef} className="max-w-[44vw]">
              <h2 className="font-sora font-bold text-[clamp(32px,4.5vw,56px)] leading-[1.05] text-text-primary mb-6">
                Built to <span className="text-gradient">Work</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-lg leading-relaxed">
                Reliable motion, consistent precision, and safe collaboration—designed for real production environments.
              </p>
            </div>

            {/* Right Feature Card */}
            <div ref={cardRef} className="w-full lg:w-[36vw] card-glass">
              <div ref={bulletsRef} className="space-y-6">
                <div className="bullet-item flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet/15 flex items-center justify-center flex-shrink-0">
                    <Target size={20} className="text-violet" />
                  </div>
                  <div>
                    <h4 className="font-sora font-semibold text-text-primary mb-1">
                      Repeatable sub-millimeter accuracy
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Precision positioning for delicate assembly tasks
                    </p>
                  </div>
                </div>

                <div className="bullet-item flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet/15 flex items-center justify-center flex-shrink-0">
                    <Shield size={20} className="text-violet" />
                  </div>
                  <div>
                    <h4 className="font-sora font-semibold text-text-primary mb-1">
                      Collision-aware motion planning
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Real-time obstacle detection and path optimization
                    </p>
                  </div>
                </div>

                <div className="bullet-item flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet/15 flex items-center justify-center flex-shrink-0">
                    <Activity size={20} className="text-violet" />
                  </div>
                  <div>
                    <h4 className="font-sora font-semibold text-text-primary mb-1">
                      24/7 operational monitoring
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Continuous health checks and predictive maintenance
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={scrollToContact}
                className="mt-8 flex items-center gap-2 text-violet hover:text-violet-300 transition-colors group"
              >
                <span className="font-medium">Explore capabilities</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
