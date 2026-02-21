import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scan, Gauge, Octagon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HumanCenteredSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
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

      const items = itemsRef.current?.querySelectorAll('.safety-item');
      if (items) {
        scrollTl.fromTo(
          items,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.16
        );
      }

      // SETTLE (30-70%): Card breathe animation via CSS

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { y: 0, scale: 1 },
        { y: '2vh', scale: 1.04, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-30"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/human_centered_bg.jpg)',
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
                Human‑Centered <span className="text-gradient">Design</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-lg leading-relaxed">
                Safety isn't a layer—it's the foundation. Every motion is planned around people.
              </p>
            </div>

            {/* Right Safety Card */}
            <div ref={cardRef} className="w-full lg:w-[36vw] card-glass breathe">
              <p className="text-text-secondary leading-relaxed mb-8">
                Real-time proximity sensing, force-limited actuation, and predictive stop behaviors keep workspaces safe without sacrificing throughput.
              </p>

              <div ref={itemsRef} className="space-y-4">
                <div className="safety-item flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-violet/15 flex items-center justify-center">
                    <Scan size={20} className="text-violet" />
                  </div>
                  <span className="font-sora font-medium text-text-primary">Proximity sensing</span>
                </div>

                <div className="safety-item flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-violet/15 flex items-center justify-center">
                    <Gauge size={20} className="text-violet" />
                  </div>
                  <span className="font-sora font-medium text-text-primary">Force limits</span>
                </div>

                <div className="safety-item flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-violet/15 flex items-center justify-center">
                    <Octagon size={20} className="text-violet" />
                  </div>
                  <span className="font-sora font-medium text-text-primary">Predictive stop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
