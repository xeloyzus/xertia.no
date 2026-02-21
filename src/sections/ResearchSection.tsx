import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Zap, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ResearchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
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

      const chips = chipsRef.current?.querySelectorAll('.metric-chip');
      if (chips) {
        scrollTl.fromTo(
          chips,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.02, ease: 'none' },
          0.16
        );
      }

      // SETTLE (30-70%): Chips gentle drift via CSS

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, x: 0 },
        { scale: 1.06, x: '-3vw', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="research"
      className="section-pinned z-40"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/research_dev_bg.jpg)',
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
                Research <span className="text-gradient">& Development</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-lg leading-relaxed">
                Simulation-first validation. Real-world data. Continuous learning.
              </p>
            </div>

            {/* Right R&D Card */}
            <div ref={cardRef} className="w-full lg:w-[36vw] card-glass">
              <p className="text-text-secondary leading-relaxed mb-8">
                We train policies in high-fidelity simulation, validate in controlled environments, and deploy with live telemetry—then feed insights back into the next model.
              </p>

              <div ref={chipsRef} className="grid grid-cols-1 gap-4">
                <div className="metric-chip flex items-center gap-4 p-4 rounded-xl bg-violet/10 border border-violet/20 float-animation">
                  <div className="w-10 h-10 rounded-lg bg-violet/20 flex items-center justify-center">
                    <Clock size={20} className="text-violet" />
                  </div>
                  <div>
                    <span className="font-sora font-bold text-violet-300 text-lg">10k+</span>
                    <p className="text-sm text-text-secondary">sim hours / model</p>
                  </div>
                </div>

                <div className="metric-chip flex items-center gap-4 p-4 rounded-xl bg-violet/10 border border-violet/20 float-animation" style={{ animationDelay: '0.5s' }}>
                  <div className="w-10 h-10 rounded-lg bg-violet/20 flex items-center justify-center">
                    <Zap size={20} className="text-violet" />
                  </div>
                  <div>
                    <span className="font-sora font-bold text-violet-300 text-lg">&lt;50ms</span>
                    <p className="text-sm text-text-secondary">inference time</p>
                  </div>
                </div>

                <div className="metric-chip flex items-center gap-4 p-4 rounded-xl bg-violet/10 border border-violet/20 float-animation" style={{ animationDelay: '1s' }}>
                  <div className="w-10 h-10 rounded-lg bg-violet/20 flex items-center justify-center">
                    <RefreshCw size={20} className="text-violet" />
                  </div>
                  <div>
                    <span className="font-sora font-bold text-violet-300 text-lg">Nightly</span>
                    <p className="text-sm text-text-secondary">retraining pipeline</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
