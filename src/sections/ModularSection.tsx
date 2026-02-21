import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Grip, Radio, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ModularSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
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
        { y: '60vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        cardRef.current,
        { y: '-60vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.06
      );

      const tags = tagsRef.current?.querySelectorAll('.module-tag');
      if (tags) {
        scrollTl.fromTo(
          tags,
          { x: 18, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.16
        );
      }

      // SETTLE (30-70%): Tags glow via CSS

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.05, y: '1vh', ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-50"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/modular_arch_bg.jpg)',
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
            <div ref={headlineRef} className="max-w-[42vw]">
              <h2 className="font-sora font-bold text-[clamp(32px,4.5vw,56px)] leading-[1.05] text-text-primary mb-6">
                Modular <span className="text-gradient">Architecture</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-lg leading-relaxed">
                Swap end-effectors, add sensors, and integrate with your stack—without rebuilding the core.
              </p>
            </div>

            {/* Right Modules Card */}
            <div ref={cardRef} className="w-full lg:w-[36vw] card-glass">
              <p className="text-text-secondary leading-relaxed mb-8">
                A message-based control layer and well-defined APIs let your team extend capabilities in days, not months.
              </p>

              <div ref={tagsRef} className="flex flex-wrap gap-3">
                <div className="module-tag flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-violet/40 transition-colors cursor-default">
                  <Grip size={18} className="text-violet" />
                  <span className="font-medium text-text-primary">Gripper SDK</span>
                </div>

                <div className="module-tag flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-violet/40 transition-colors cursor-default">
                  <Radio size={18} className="text-violet" />
                  <span className="font-medium text-text-primary">Sensor bridge</span>
                </div>

                <div className="module-tag flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-violet/40 transition-colors cursor-default">
                  <Server size={18} className="text-violet" />
                  <span className="font-medium text-text-primary">Fleet API</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
