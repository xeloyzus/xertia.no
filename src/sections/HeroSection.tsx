import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronRight, Play } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-end pb-20 overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/logo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-black/35" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full px-6 lg:px-16">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/70">
              STARTUP
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/70">
              AI & AUTOMATION
            </span>
          </div>

          {/* Title */}
          <h1 className="font-sora font-bold text-5xl sm:text-6xl lg:text-7xl text-white mb-4 leading-tight">
            Xertai
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/70 mb-2 font-light">
            Code. Apps. AI Models. MCP.
          </p>

          {/* Description */}
          <p className="text-base text-white/50 mb-8 max-w-lg leading-relaxed">
            Building the future of intelligent automation. From cutting-edge AI models 
            to seamless applications, we craft technology that works for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToServices}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all hover:scale-105"
            >
              <Play size={18} fill="currentColor" />
              <span>Explore</span>
            </button>
            <a
              href="mailto:hello@xertai.io"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all"
            >
              <span>Contact</span>
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[2]" />
    </section>
  );
}
